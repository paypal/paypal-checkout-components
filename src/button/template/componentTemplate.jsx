/* @flow */
/* @jsx jsxToHTML */

import { btoa } from 'Base64';

import { BUTTON_SIZE, BUTTON_BRANDING, BUTTON_NUMBER, BUTTON_LOGO_COLOR, BUTTON_LABEL, BUTTON_LAYOUT, ENV, ATTRIBUTE, FUNDING, BUTTON_LOGO, BUTTON_COLOR } from '../../constants';
import { getButtonConfig, labelToFunding, fundingToDefaultLabel } from '../config';
import { normalizeProps } from '../props';
import { jsxToHTML, type JsxHTMLNode, type ChildType, jsxRender } from '../../lib/jsx'; // eslint-disable-line no-unused-vars
import { fundingLogos, cardLogos } from '../../resources';
import { validateButtonProps } from '../validate';
import type { LocaleType, FundingSource, FundingSelection, FundingList } from '../../types';

import { componentStyle, CLASS } from './componentStyle';
import { getComponentScript } from './componentScript';
import { componentContent } from './content';

function getCommonButtonClasses({ layout, shape, branding, multiple, env }) : string {
    return [
        `${ CLASS.LAYOUT }-${ layout }`,
        `${ CLASS.SHAPE }-${ shape }`,
        `${ CLASS.BRANDING }-${ branding ? BUTTON_BRANDING.BRANDED : BUTTON_BRANDING.UNBRANDED }`,
        `${ CLASS.NUMBER }-${ multiple ? BUTTON_NUMBER.MULTIPLE : BUTTON_NUMBER.SINGLE }`,
        `${ CLASS.ENV }-${ env }`,
        `${ CLASS.SHOULD_FOCUS }`
    ].join(' ');
}

function getButtonClasses({ label, color, logoColor, isFundingThrottleEnabled }) : string {
    if (isFundingThrottleEnabled && label === BUTTON_LABEL.CREDIT) {
        color = BUTTON_COLOR.SILVER;
    }

    return [
        `${ CLASS.LABEL }-${ label }`,
        `${ CLASS.COLOR }-${ color }`,
        `${ CLASS.LOGO_COLOR }-${ logoColor }`
    ].join(' ');
}

function getLocaleContent(locale : LocaleType) : Object {
    let { country, lang } = locale;
    return componentContent[country][lang];
}

function determineLabel({ label, source, multiple, layout } : { label : $Values<typeof BUTTON_LABEL>, source : FundingSource, multiple : boolean,  layout : $Values<typeof BUTTON_LAYOUT> }) : $Values<typeof BUTTON_LABEL> {

    let defaultLabel = fundingToDefaultLabel(source);
    let labelMatchesFunding = (labelToFunding(label) === source);

    // If chosen label is not for this funding source, display the default label
    if (!labelMatchesFunding) {
        return defaultLabel;
    }

    // If there are multiple horizontal buttons, display the default label
    if (multiple && layout === BUTTON_LAYOUT.HORIZONTAL) {
        return defaultLabel;
    }

    return label;
}

function determineButtons({ label, color, sources, multiple, layout } : { label : $Values<typeof BUTTON_LABEL>, color : string, sources : FundingList, multiple : boolean, layout : $Values<typeof BUTTON_LAYOUT> }) :
    Array<{ label : $Values<typeof BUTTON_LABEL>, color : string, source : FundingSource }> {

    return sources.map((source, i) => {

        let buttonLabel = determineLabel({ label, source, multiple, layout });

        let buttonColor = (multiple && i > 0)
            ? getButtonConfig(buttonLabel, 'secondaryColors')[color]
            : color;

        return {
            source,
            label: buttonLabel,
            color: buttonColor
        };
    });
}

function renderCards({ cards, button, layout, size } :
  { cards : Array<string>, button : ?boolean, layout? : string, size? : string }) : Array<JsxHTMLNode> {
    return cards.map(name => {
        let logo = cardLogos[name];

        return (
            <div
                { ...{ [ATTRIBUTE.LAYOUT]: layout ? layout : '' } }
                { ...{ [ATTRIBUTE.SIZE]: size ? size : '' } }
                { ...{ [ATTRIBUTE.BUTTON]: (button || false), [ATTRIBUTE.FUNDING_SOURCE]: `${ FUNDING.CARD }`, [ATTRIBUTE.CARD]: `${ name }` } }
                class={ `${ button ? CLASS.BUTTON : '' } ${ CLASS.CARD } ${ CLASS.CARD }-${ name }` }
                tabindex='0'>
                <img
                    { ...{ [ATTRIBUTE.LAYOUT]: layout ? layout : '' } }
                    { ...{ [ATTRIBUTE.SIZE]: size ? size : '' } }
                    { ...{ [ATTRIBUTE.BUTTON]: (button || false), [ATTRIBUTE.FUNDING_SOURCE]: `${ FUNDING.CARD }`, [ATTRIBUTE.CARD]: `${ name }` } }
                    style={ ` display: block; ` }
                    src={ `data:image/svg+xml;base64,${ btoa(logo) }` }
                    alt={ name } />
            </div>
        );
    });
}

function renderFundingIcons({ cards, fundingicons, size, layout } :
    { cards : Array<string>, fundingicons : boolean, layout : string, size : string }) : ?JsxHTMLNode {

    if (!fundingicons) {
        return;
    }

    return <div class={ `${ CLASS.FUNDINGICONS }` }>{ renderCards({ cards, button: true, size, layout }) }</div>;
}

function renderContent(text : string, { label, locale, color, branding, logoColor, funding, env, cards, dynamicContent, layout, size, isFundingThrottleEnabled } :
    { layout? : $Values<typeof BUTTON_LAYOUT>, size? : $Values<typeof BUTTON_SIZE>, label? : string, locale : LocaleType, color : string, branding? : boolean, logoColor? : string, funding? : FundingSelection, env : string, cards : Array<string>, dynamicContent? : Object, isFundingThrottleEnabled? : boolean }) : JsxHTMLNode {

    let content = getLocaleContent(locale);

    return jsxRender(text, {

        text(value : string) : JsxHTMLNode {
            let className = `${ CLASS.TEXT }`;
            return <span class={ className }>{ value }</span>;
        },

        logo(name : string) : ?JsxHTMLNode {

            if (!branding) {
                return;
            }

            if (!logoColor && !isFundingThrottleEnabled) {
                throw new Error(`Can not determine logo without logo color`);
            }

            if (isFundingThrottleEnabled && layout !== BUTTON_LAYOUT.VERTICAL) {
                if (label === BUTTON_LABEL.CREDIT && (name === BUTTON_LOGO.PAYPAL || name === BUTTON_LOGO.PP)) {
                    return;
                }

                if (name === BUTTON_LOGO.CREDIT) {
                    color = BUTTON_COLOR.SILVER;
                    logoColor = BUTTON_COLOR.BLUE;
                }
            }
            
            let logo = (typeof fundingLogos[name] === 'function')
                ? fundingLogos[name]({ label, locale, color, branding, logoColor, funding, env, cards, isFundingThrottleEnabled })
                : fundingLogos[name][logoColor] || fundingLogos[name][BUTTON_LOGO_COLOR.ANY];
            

            return (
                <img
                    class={ `${ CLASS.LOGO } ${ CLASS.LOGO }-${ name } ${ CLASS.LOGO }-${ color }` }
                    src={ `data:image/svg+xml;base64,${ btoa(logo) }` }
                    alt={ name } />
            );
        },

        content(name : string) : JsxHTMLNode {
            let contentString;

            for (let key of name.split('|')) {
                if (content[key]) {
                    contentString = content[key];
                    break;
                }
            }

            let regex = /\[([a-z]+)\]/g;
            contentString = contentString && contentString.replace(regex, (match, contentVariable) => {
                if (match && contentVariable) {
                    return dynamicContent && dynamicContent[contentVariable];
                }
            });


            if (!contentString && env === ENV.TEST) {
                throw new Error(`Could not find content ${ name } for ${ locale.lang }_${ locale.country }`);
            }

            return renderContent(contentString || '', { label, locale, color, branding, logoColor, funding, env, cards, isFundingThrottleEnabled });
        },

        cards() : Array<JsxHTMLNode> {
            if (!funding) {
                throw new Error(`Can not determine card types without funding`);
            }

            return renderCards({ cards, button: false, layout, size });
        },

        separator() : JsxHTMLNode {
            return <span class={ CLASS.SEPARATOR }></span>;
        },

        break(value : string) : JsxHTMLNode {
            let className = `${ CLASS.TEXT }`;
            return <span class={ className }>{ value.split('<br>')[0] }<br>{ value.split('<br>')[1] }</br></span>;
        }
    });
}

function renderButton({ size, label, color, locale, branding, multiple, layout, shape, source, funding, i, env, cards, installmentperiod, isFundingThrottleEnabled } :
    { size : $Values<typeof BUTTON_SIZE>, label : $Values<typeof BUTTON_LABEL>, color : string, branding : boolean, locale : Object, multiple : boolean, layout : $Values<typeof BUTTON_LAYOUT>, shape : string, funding : FundingSelection, source : FundingSource, i : number, env : string, cards : Array<string>, installmentperiod : number, isFundingThrottleEnabled? : boolean }) : JsxHTMLNode {

    let logoColor = getButtonConfig(label, 'logoColors')[color];

    let buttonLabel = determineLabel({ label, source, multiple, layout });

    // If the determined button label matches up with the label passed by the merchant, use
    // the label template, otherwise use the logo template.
    let contentText = (buttonLabel === label)
        ? getButtonConfig(label, 'label')
        : getButtonConfig(label, 'logoLabel');


    // Add all the variables in dynamic content required to be plugged in content
    let dynamicContent = {
        installmentperiod,
        locale
    };

    contentText = typeof contentText === 'function' ? contentText(dynamicContent) : contentText;
    contentText = renderContent(contentText, { label, locale, color, branding, logoColor, funding, env, cards, dynamicContent, layout, size, isFundingThrottleEnabled });

    // Define a list of funding options that will not need a tabindex
    const hasTabIndex = [
        FUNDING.CARD
    ].indexOf(source) === -1;

    return (
        <div
            { ...{ [ATTRIBUTE.LAYOUT]: layout ? layout : '' } }
            { ...{ [ATTRIBUTE.SIZE]: size ? size : '' } }
            { ...{ [ ATTRIBUTE.FUNDING_SOURCE ]: source, [ ATTRIBUTE.BUTTON ]: true } }
            class={ `${ CLASS.BUTTON } ${ CLASS.NUMBER }-${ i } ${ getCommonButtonClasses({ layout, shape, branding, multiple, env }) } ${ getButtonClasses({ label, color, logoColor, isFundingThrottleEnabled }) }` }
            role='button'
            aria-label={ source }
            tabindex={ hasTabIndex && 0 }>
            
            { contentText }
        </div>
    );
}

function renderTagline({ label, tagline, color, locale, multiple, env, cards } : { label : string, color : string, tagline : boolean, locale : LocaleType, multiple : boolean, env : string, cards : Array<string> }) : ?JsxHTMLNode {

    if (!tagline) {
        return;
    }

    let tag = multiple
        ? (getButtonConfig(label, 'dualTag') || getButtonConfig(label, 'tag'))
        : getButtonConfig(label, 'tag');

    let text = renderContent(tag, { locale, color, env, cards });

    if (!text) {
        return;
    }

    let tagColor = getButtonConfig(label, 'tagLineColors')[color];

    return (
        <div class={ `${ CLASS.TAGLINE } ${ CLASS.TAGLINE_COLOR }-${ tagColor }` }>
            { text }
        </div>
    );
}

function renderScript() : JsxHTMLNode {

    let script = getComponentScript().toString();

    script = script.replace(/\{\s*CLASS\.([A-Z0-9_]+)\s*\}/g, (match, name) => {
        return CLASS[name];
    });

    return (
        <script innerHTML={ `(${ script })();` } />
    );
}

function renderStyle({ height, cardNumber } : { height? : ?number, cardNumber? : number }) : JsxHTMLNode {
    return (
        <style innerHTML={ componentStyle({ height, cardNumber }) } />
    );
}

function renderPowerByPaypalLogo(props) : ChildType {

    if (!props) {
        return null;
    }

    const { layout, size, sources = [] } = props;

    if (!(layout === BUTTON_LAYOUT.VERTICAL && (size === BUTTON_SIZE.MEDIUM || size === BUTTON_SIZE.LARGE || size === BUTTON_SIZE.HUGE))) {
        return null;
    }

    const isCardDisallowed = sources.indexOf(FUNDING.CARD) === -1;

    if (isCardDisallowed) {
        return null;
    }

    return (
        <div
            class="powered-by-paypal"
            style={ `
                text-align: center;
                margin: 10px auto;
                height: 14px;
                font-family: PayPal-Sans, HelveticaNeue, sans-serif;
                font-size: 11px;
                font-weight: normal;
                font-style: italic;
                font-stretch: normal;
                color: #7b8388;
                position: relative;
                margin-right: 3px;
                bottom: 3px;
            ` }>
            { renderContent('{ content: poweredBy }', { ...props, logoColor: 'blue' }) }
        </div>
    );
}

export function componentTemplate({ props } : { props : Object }) : string {

    if (props && props.style) {
        let style = props.style;

        if (style.label === 'generic') {
            style.label = 'paypal';
        }

        if (style.color === 'creditblue') {
            delete style.color;
        }

        if (style.maxbuttons === 1 && style.tagline === false &&
            style.size === 'responsive' && style.layout === 'horizontal' &&
            !style.height) {

            style.height = 44;
        }
    }
    
    validateButtonProps(props);

    let { label, locale, color, shape, branding,
        tagline, funding, layout, sources, multiple,
        env, height, cards, installmentperiod, fundingicons, size, isFundingThrottleEnabled } = normalizeProps(props);

    let buttonNodes = determineButtons({ label, color, sources, multiple, layout })
        .map((button, i) => {
            return renderButton({
                label:   button.label,
                color:   button.color,
                source:  button.source,
                env,
                i,
                funding,
                multiple,
                locale,
                branding,
                layout,
                shape,
                cards,
                installmentperiod,
                size,
                isFundingThrottleEnabled
            });
        });

    let taglineNode     = renderTagline({ label, tagline, color, locale, multiple, env, cards });
    let fundingiconNode = renderFundingIcons({ cards, fundingicons, size, layout });

    let styleNode  = renderStyle({ height, cardNumber: cards.length });
    let scriptNode = renderScript();
    let labelPowerByPayPal = cards.length > 0 ? renderPowerByPaypalLogo(normalizeProps(props)) : null;

    return (
        <div { ...{ [ ATTRIBUTE.VERSION ]: __PAYPAL_CHECKOUT__.__MINOR_VERSION__ } } class={ `${ CLASS.CONTAINER } ${ getCommonButtonClasses({ layout, shape, branding, multiple, env }) }` }>
            { styleNode }

            { buttonNodes }
            { taglineNode || fundingiconNode }

            { labelPowerByPayPal }

            { scriptNode }
        </div>
    ).toString();
}
