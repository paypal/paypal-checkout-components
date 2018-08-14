/* @flow */
/* @jsx jsxToHTML */

import { ENV, type LocaleType } from 'paypal-braintree-web-client';
import { jsxToHTML, type JsxHTMLNode, jsxRender, Fragment } from 'belter/src'; // eslint-disable-line no-unused-vars

import { BUTTON_NUMBER, BUTTON_LABEL, ATTRIBUTE, CLASS, FUNDING,
    BUTTON_COLOR, LOGO_COLOR } from '../../constants';
import { FUNDING_CONFIG, determineEligibleFunding } from '../../funding';
import type { FundingEligibilityType } from '../../types';
import { normalizeButtonProps, type ButtonStyle, type ButtonPropsInputs } from '../props';

import { componentStyle } from './componentStyle';
import { getComponentScript } from './componentScript';


function getCommonClasses({ style, multiple, env } :
    {| style : ButtonStyle, multiple : boolean, env : $Values<typeof ENV> |}) : string {

    let { layout, shape } = style;
    
    return [
        `${ CLASS.LAYOUT }-${ layout }`,
        `${ CLASS.SHAPE }-${ shape }`,
        `${ CLASS.NUMBER }-${ multiple ? BUTTON_NUMBER.MULTIPLE : BUTTON_NUMBER.SINGLE }`,
        `${ CLASS.ENV }-${ env }`
    ].join(' ');
}

function getButtonClasses({ label, color, logoColor } :
    {| label : $Values<typeof BUTTON_LABEL>, color : $Values<typeof BUTTON_COLOR>, logoColor : $Values<typeof LOGO_COLOR> |}) : string {
    
    return [
        `${ CLASS.LABEL }-${ label }`,
        `${ CLASS.COLOR }-${ color }`,
        `${ CLASS.LOGO_COLOR }-${ logoColor }`
    ].join(' ');
}

function determineLabel({ source, style } :
    {| source : $Values<typeof FUNDING>, style : ButtonStyle |}) : $Values<typeof BUTTON_LABEL> {

    let fundingConfig = FUNDING_CONFIG[source];

    if (!fundingConfig) {
        throw new Error(`Can not find config for ${ source }`);
    }

    let labelsConfig = fundingConfig.labels;
    let { label } = style;

    if (labelsConfig[label]) {
        return label;
    }

    if (fundingConfig.defaultLabel) {
        return fundingConfig.defaultLabel;
    }

    throw new Error(`Could not determine label for ${ source }`);
}

function Button({ source, style, multiple, locale, env, fundingEligibility, i } :
    {| style : ButtonStyle, source : $Values<typeof FUNDING>, multiple : boolean, locale : LocaleType,
      env : $Values<typeof ENV>, fundingEligibility : FundingEligibilityType, i : number |}) : JsxHTMLNode {

    let { color, period } = style;

    let buttonLabel = determineLabel({ source, style });
    
    let fundingConfig = FUNDING_CONFIG[source];
    let labelConfig = fundingConfig.labels[buttonLabel];

    let secondaryColors = labelConfig.secondaryColors;

    if (multiple && i > 0) {
        color = secondaryColors[color];
    }

    let logoColors = labelConfig.logoColors;
    let logoColor = logoColors[color];

    let { Label } = labelConfig;

    return (
        <div
            { ...{ [ATTRIBUTE.FUNDING_SOURCE]: source, [ATTRIBUTE.BUTTON]: true } }
            class={ `${ CLASS.BUTTON } ${ CLASS.NUMBER }-${ i } ${ getCommonClasses({ style, multiple, env }) } ${ getButtonClasses({ label: buttonLabel, color, logoColor }) }` }
            role='button'
            aria-label={ source }
            tabindex='0'>

            <Label
                locale={ locale }
                color={ color }
                logoColor={ logoColor }
                period={ period }
                fundingEligibility={ fundingEligibility }
            />
        </div>
    );
}

function TagLine({ source, style, locale, multiple } :
    {| source : $Values<typeof FUNDING>, style : ButtonStyle, locale : LocaleType, multiple : boolean |}) : ?JsxHTMLNode {

    let { tagline, label, color } = style;

    if (!tagline) {
        return;
    }

    let fundingConfig = FUNDING_CONFIG[source];

    if (!fundingConfig) {
        throw new Error(`Can not get config for ${ source }`);
    }

    let labelConfig = fundingConfig.labels[label];

    if (!labelConfig.tag) {
        return;
    }

    let tagColors = labelConfig.tagLineColors;
    let tagColor = tagColors[color];

    let { Tag } = labelConfig;

    if (!Tag) {
        return;
    }

    return (
        <div class={ `${ CLASS.TAGLINE } ${ CLASS.TAGLINE_COLOR }-${ tagColor }` }>
            <Tag locale={ locale } multiple={ multiple } />
        </div>
    );
}

function Script() : JsxHTMLNode {
    let script = getComponentScript().toString();

    script = script.replace(/\{\s*CLASS\.([A-Z0-9_]+)\s*\}/g, (match, name) => {
        return CLASS[name];
    });

    return (
        <script innerHTML={ `(${ script })();` } />
    );
}

function Style({ style, cardNumber } :
    {| style : ButtonStyle, cardNumber? : number |}) : JsxHTMLNode {

    let { height } = style;

    return (
        <style innerHTML={ componentStyle({ height, cardNumber }) } />
    );
}

function getCardNumber() : number {
    let cardConfig = FUNDING_CONFIG[FUNDING.CARD];

    if (cardConfig) {
        let numCards = Object.keys(cardConfig.vendors).length;
        let maxCards = cardConfig.maxCards;
        return Math.min(numCards, maxCards);
    } else {
        return 4;
    }
}

export function Buttons(props : ButtonPropsInputs) : JsxHTMLNode {
    let { style, locale, remembered, env, fundingEligibility, version, platform } = normalizeButtonProps(props);

    let sources  = determineEligibleFunding({ style, remembered, platform, fundingEligibility });
    let multiple = sources.length > 1;

    return (
        <div
            { ...{ [ ATTRIBUTE.VERSION ]: version } }
            class={ `${ CLASS.CONTAINER } ${ getCommonClasses({ style, multiple, env }) }` }
        >

            <Style
                style={ style }
                cardNumber={ getCardNumber() }
            />

            {
                sources.map((source, i) => (
                    <Button
                        i={ i }
                        style={ style }
                        source={ source }
                        multiple={ multiple }
                        env={ env }
                        locale={ locale }
                        fundingEligibility={ fundingEligibility }
                    />
                ))
            }
            
            <TagLine
                source={ sources[0] }
                style={ style }
                locale={ locale }
                multiple={ multiple }
                env={ env }
            />

            <Script />
        </div>
    );
}
