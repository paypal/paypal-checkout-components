/* @flow */
/** @jsx node */

import { FUNDING, ENV, type LocaleType } from '@paypal/sdk-constants/src';
import { node, html, type ElementNode } from 'jsx-pragmatic/src';
import { LOGO_COLOR, LOGO_CLASS } from '@paypal/sdk-logos/src';
import { noop } from 'belter/src';

import { BUTTON_NUMBER, BUTTON_LABEL, ATTRIBUTE, CLASS, BUTTON_COLOR, BUTTON_TAGLINE_COLOR } from '../../constants';
import { getFundingConfig, determineEligibleFunding } from '../../funding';
import { normalizeButtonProps, type ButtonStyle, type ButtonPropsInputs } from '../props';
import type { FundingEligibilityType } from '../../types';

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
        `${ LOGO_CLASS.LOGO_COLOR }-${ logoColor }`
    ].join(' ');
}

function determineLabel({ fundingSource, style } :
    {| fundingSource : $Values<typeof FUNDING>, style : ButtonStyle |}) : $Values<typeof BUTTON_LABEL> {

    const fundingConfig = getFundingConfig()[fundingSource];

    if (!fundingConfig) {
        throw new Error(`Can not find config for ${ fundingSource }`);
    }

    const labelsConfig = fundingConfig.labels;
    const { label } = style;

    if (labelsConfig[label]) {
        return label;
    }

    if (fundingConfig.defaultLabel) {
        return fundingConfig.defaultLabel;
    }

    throw new Error(`Could not determine label for ${ fundingSource }`);
}

type ButtonProps = {|
    style : ButtonStyle,
    fundingSource : $Values<typeof FUNDING>,
    multiple : boolean,
    locale : LocaleType,
    onClick? : Function,
    env : $Values<typeof ENV>,
    fundingEligibility : FundingEligibilityType,
    i : number,
    nonce : string
|};

function Button({ fundingSource, style, multiple, locale, env, fundingEligibility, i, nonce, onClick = noop } : ButtonProps) : ElementNode {

    let { color, period } = style;

    const buttonLabel = determineLabel({ fundingSource, style });
    
    const fundingConfig = getFundingConfig()[fundingSource];

    if (!fundingConfig) {
        throw new Error(`Can not find funding config for ${ fundingSource }`);
    }

    const labelConfig = fundingConfig.labels[buttonLabel];

    if (!labelConfig) {
        throw new Error(`Can not find label config for ${ buttonLabel }`);
    }

    const colors = labelConfig.colors;
    const secondaryColors = labelConfig.secondaryColors || {};

    if (multiple && i > 0) {
        color = secondaryColors[color] || secondaryColors[BUTTON_COLOR.DEFAULT] || colors[0];
    }

    const logoColors = labelConfig.logoColors || {};
    const logoColor = logoColors[color] || logoColors[LOGO_COLOR.DEFAULT] || LOGO_COLOR.DEFAULT;

    const { Label } = labelConfig;

    const clickHandler = (event, { card } = {}) => {
        event.preventDefault();
        event.stopPropagation();

        if (fundingSource === FUNDING.CARD && !card) {
            return;
        }

        onClick({ fundingSource, card });
    };

    return (
        <div
            { ...{ [ATTRIBUTE.FUNDING_SOURCE]: fundingSource, [ATTRIBUTE.BUTTON]: true } }
            class={ `${ CLASS.BUTTON } ${ CLASS.NUMBER }-${ i } ${ getCommonClasses({ style, multiple, env }) } ${ getButtonClasses({ label: buttonLabel, color, logoColor }) }` }
            role='button'
            aria-label={ fundingSource }
            onClick={ clickHandler }
            tabindex='0'>

            <Label
                nonce={ nonce }
                locale={ locale }
                logoColor={ logoColor }
                period={ period }
                multiple={ multiple }
                fundingEligibility={ fundingEligibility }
                onClick={ clickHandler }
            />
        </div>
    );
}

function TagLine({ fundingSource, style, locale, multiple, nonce } :
    {| fundingSource : $Values<typeof FUNDING>, style : ButtonStyle, locale : LocaleType, multiple : boolean, nonce : string |}) : ?ElementNode {

    const { tagline, label } = style;

    if (!tagline) {
        return;
    }

    const fundingConfig = getFundingConfig()[fundingSource];

    if (!fundingConfig) {
        throw new Error(`Can not get config for ${ fundingSource }`);
    }

    const labelConfig = fundingConfig.labels[label];

    if (!labelConfig) {
        throw new Error(`Can not find label config for ${ label }`);
    }

    const tagColor = BUTTON_TAGLINE_COLOR.BLACK;

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

type ScriptProps = {|
    nonce : ?string
|};

function Script({ nonce } : ScriptProps) : ElementNode {
    let script = getComponentScript().toString();

    script = script.replace(/\{\s*CLASS\.([A-Z0-9_]+)\s*\}/g, (match, name) => {
        return CLASS[name];
    });

    script = script.replace(/\{\s*LOGO_CLASS\.([A-Z0-9_]+)\s*\}/g, (match, name) => {
        return LOGO_CLASS[name];
    });

    return (
        <script nonce={ nonce } innerHTML={ `(${ script })()` } />
    );
}

type StyleProps = {|
    style : ButtonStyle,
    cardNumber? : number,
    nonce : string
|};

function Style({ style, cardNumber, nonce } : StyleProps) : ElementNode {

    const { height } = style;
    const css = componentStyle({ height, cardNumber });

    const styleTag = (
        <style nonce={ nonce } innerHTML={ css } />
    );

    try {
        styleTag.render(html());
        return styleTag;

    } catch (err) {
        return (
            <style nonce={ nonce }>{ css }</style>
        );
    }
}

function getCardNumber(locale : LocaleType) : number {
    const cardConfig = getFundingConfig()[FUNDING.CARD];
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

type ButtonsProps = ButtonPropsInputs & {|
    onClick? : Function
|};

export function Buttons(props : ButtonsProps) : ElementNode {
    const { onClick } = props;
    const { style, locale, remembered, env, fundingEligibility, platform, nonce, components } = normalizeButtonProps(props);

    const fundingSources = determineEligibleFunding({ style, remembered, platform, fundingEligibility, components });
    const multiple = fundingSources.length > 1;

    if (!fundingSources.length) {
        throw new Error(`No eligible funding fundingSources found to render buttons:\n\n${ JSON.stringify(fundingEligibility, null, 4) }`);
    }

    const buttonsNode = (
        <div class={ `${ CLASS.CONTAINER } ${ getCommonClasses({ style, multiple, env }) }` }>

            <Style
                nonce={ nonce }
                style={ style }
                cardNumber={ getCardNumber(locale) }
            />

            {
                fundingSources.map((fundingSource, i) => (
                    <Button
                        i={ i }
                        style={ style }
                        fundingSource={ fundingSource }
                        multiple={ multiple }
                        env={ env }
                        locale={ locale }
                        nonce={ nonce }
                        fundingEligibility={ fundingEligibility }
                        onClick={ onClick }
                    />
                ))
            }
            
            <TagLine
                fundingSource={ fundingSources[0] }
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

    // $FlowFixMe
    buttonsNode.toString = () => buttonsNode.render(html());

    const render = buttonsNode.render;
    // $FlowFixMe
    buttonsNode.render = (renderer) => {
        if (renderer.length === 3 && typeof window === 'undefined') {
            return render.call(buttonsNode, html());
        }
        return render.call(buttonsNode, renderer);
    };

    return buttonsNode;
}
