/* @flow */
/** @jsx node */

import { type FundingEligibilityType } from 'paypal-braintree-web-client/src';
import { FUNDING, ENV, type LocaleType } from 'paypal-sdk-constants/src';
import { node, html, type ElementNode } from 'jsx-pragmatic/src';

import { BUTTON_NUMBER, BUTTON_LABEL, ATTRIBUTE, CLASS,
    BUTTON_COLOR, LOGO_COLOR } from '../../constants';
import { FUNDING_CONFIG, determineEligibleFunding } from '../../funding';
import { normalizeButtonProps, type ButtonStyle, type ButtonPropsInputs } from '../props';

import { componentStyle } from './componentStyle';
import { getComponentScript } from './componentScript';

export { DEFAULT_PROPS } from '../props';


function getCommonClasses({ style, multiple, env } :
    {| style : ButtonStyle, multiple : boolean, env : $Values<typeof ENV> |}) : string {

    const { layout, shape } = style;
    
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

    const fundingConfig = FUNDING_CONFIG[source];

    if (!fundingConfig) {
        throw new Error(`Can not find config for ${ source }`);
    }

    const labelsConfig = fundingConfig.labels;
    const { label } = style;

    if (labelsConfig[label]) {
        return label;
    }

    if (fundingConfig.defaultLabel) {
        return fundingConfig.defaultLabel;
    }

    throw new Error(`Could not determine label for ${ source }`);
}

function Button({ source, style, multiple, locale, env, fundingEligibility, i, nonce } :
    {| style : ButtonStyle, source : $Values<typeof FUNDING>, multiple : boolean, locale : LocaleType,
      env : $Values<typeof ENV>, fundingEligibility : FundingEligibilityType, i : number, nonce : string |}) : ElementNode {

    let { color, period } = style;

    const buttonLabel = determineLabel({ source, style });
    
    const fundingConfig = FUNDING_CONFIG[source];

    if (!fundingConfig) {
        throw new Error(`Can not find funding config for ${ source }`);
    }

    const labelConfig = fundingConfig.labels[buttonLabel];

    if (!labelConfig) {
        throw new Error(`Can not find label config for ${ buttonLabel }`);
    }

    const secondaryColors = labelConfig.secondaryColors;

    if (multiple && i > 0) {
        color = secondaryColors[color];
    }

    const logoColors = labelConfig.logoColors;
    const logoColor = logoColors[color];

    const { Label } = labelConfig;

    return (
        <div
            { ...{ [ATTRIBUTE.FUNDING_SOURCE]: source, [ATTRIBUTE.BUTTON]: true } }
            class={ `${ CLASS.BUTTON } ${ CLASS.NUMBER }-${ i } ${ getCommonClasses({ style, multiple, env }) } ${ getButtonClasses({ label: buttonLabel, color, logoColor }) }` }
            role='button'
            aria-label={ source }
            tabindex='0'>

            <Label
                nonce={ nonce }
                locale={ locale }
                logoColor={ logoColor }
                period={ period }
                multiple={ multiple }
                fundingEligibility={ fundingEligibility }
            />
        </div>
    );
}

function TagLine({ source, style, locale, multiple, nonce } :
    {| source : $Values<typeof FUNDING>, style : ButtonStyle, locale : LocaleType, multiple : boolean, nonce : string |}) : ?ElementNode {

    const { tagline, label, color } = style;

    if (!tagline) {
        return;
    }

    const fundingConfig = FUNDING_CONFIG[source];

    if (!fundingConfig) {
        throw new Error(`Can not get config for ${ source }`);
    }

    const labelConfig = fundingConfig.labels[label];

    if (!labelConfig) {
        throw new Error(`Can not find label config for ${ label }`);
    }

    const tagColors = labelConfig.tagLineColors;
    const tagColor = tagColors[color];

    const { Tag } = labelConfig;

    if (!Tag) {
        return;
    }

    return (
        <div class={ `${ CLASS.TAGLINE } ${ CLASS.TAGLINE_COLOR }-${ tagColor }` }>
            <Tag
                nonce={ nonce }
                locale={ locale }
                multiple={ multiple }
            />
        </div>
    );
}

function Script({ nonce }) : ElementNode {
    let script = getComponentScript().toString();

    script = script.replace(/\{\s*CLASS\.([A-Z0-9_]+)\s*\}/g, (match, name) => {
        return CLASS[name];
    });

    return (
        <script nonce={ nonce }>
            { `(${ script })();` }
        </script>
    );
}

function Style({ style, cardNumber, nonce } :
    {| style : ButtonStyle, cardNumber? : number, nonce : string |}) : ElementNode {

    const { height } = style;

    return (
        <style nonce={ nonce }>
            { componentStyle({ height, cardNumber }) }
        </style>
    );
}

function getCardNumber(locale : LocaleType) : number {
    const cardConfig = FUNDING_CONFIG[FUNDING.CARD];
    const vendors = cardConfig && cardConfig.vendors;
    let maxCards = 4;

    if (cardConfig && cardConfig.maxCards && cardConfig.maxCards[locale.country]) {
        maxCards = cardConfig.maxCards[locale.country];
    }

    if (vendors) {
        const numCards = Object.keys(vendors).length;
        return Math.min(numCards, maxCards);
    } else {
        return maxCards;
    }
}

export function Buttons(props : ButtonPropsInputs) : ElementNode {
    const { style, locale, remembered, env, fundingEligibility, platform, nonce } = normalizeButtonProps(props);

    const sources  = determineEligibleFunding({ style, remembered, platform, fundingEligibility });
    const multiple = sources.length > 1;

    if (!sources.length) {
        throw new Error(`No eligible funding sources found to render buttons:\n\n${ JSON.stringify(fundingEligibility, null, 4) }`);
    }

    const buttonsNode = (
        <div class={ `${ CLASS.CONTAINER } ${ getCommonClasses({ style, multiple, env }) }` }>

            <Style
                nonce={ nonce }
                style={ style }
                cardNumber={ getCardNumber(locale) }
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
                        nonce={ nonce }
                        fundingEligibility={ fundingEligibility }
                    />
                ))
            }
            
            <TagLine
                source={ sources[0] }
                style={ style }
                locale={ locale }
                multiple={ multiple }
                nonce={ nonce }
            />

            <Script
                nonce={ nonce }
            />
        </div>
    );

    buttonsNode.toString = () => buttonsNode.render(html());

    return buttonsNode;
}
