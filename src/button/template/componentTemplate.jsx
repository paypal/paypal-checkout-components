/* @flow */
/** @jsx jsxToHTML */

import { base64encode } from 'belter/src';

import { BUTTON_SIZE, BUTTON_BRANDING, BUTTON_NUMBER, BUTTON_LOGO_COLOR, BUTTON_LABEL, BUTTON_LAYOUT, ENV, ATTRIBUTE, FUNDING } from '../../constants';
import { getButtonConfig, labelToFunding, fundingToDefaultLabel } from '../config';
import { normalizeProps } from '../props';
import { jsxToHTML, type JsxHTMLNode, type ChildType, jsxRender } from '../../lib/jsx';
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

function getButtonClasses({ label, color, logoColor }) : string {
    return [
        `${ CLASS.LABEL }-${ label }`,
        `${ CLASS.COLOR }-${ color }`,
        `${ CLASS.LOGO_COLOR }-${ logoColor }`
    ].join(' ');
}

function getLocaleContent(locale : LocaleType) : Object {
    const { country, lang } = locale;
    return componentContent[country][lang];
}

function determineLabel({ label, source, multiple, layout } : { label : $Values<typeof BUTTON_LABEL>, source : FundingSource, multiple : boolean,  layout : $Values<typeof BUTTON_LAYOUT> }) : $Values<typeof BUTTON_LABEL> {

    const defaultLabel = fundingToDefaultLabel(source);
    const labelMatchesFunding = (labelToFunding(label) === source);

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
    $ReadOnlyArray<{ label : $Values<typeof BUTTON_LABEL>, color : string, source : FundingSource }> {

    return sources.map((source, i) => {

        const buttonLabel = determineLabel({ label, source, multiple, layout });

        const buttonColor = (multiple && i > 0)
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
  { cards : $ReadOnlyArray<string>, button : ?boolean, layout? : string, size? : string }) : $ReadOnlyArray<JsxHTMLNode> {
    return cards.map(name => {
        const logo = cardLogos[name];

        return (
            <div
                { ...{ [ATTRIBUTE.LAYOUT]: layout ? layout : '' } }
                { ...{ [ATTRIBUTE.SIZE]: size ? size : '' } }
                { ...{ [ATTRIBUTE.BUTTON]: (button || false), [ATTRIBUTE.FUNDING_SOURCE]: `${ FUNDING.CARD }`, [ATTRIBUTE.CARD]: `${ name }` } }
                class={ `${ button ? CLASS.BUTTON : '' } ${ CLASS.CARD } ${ CLASS.CARD }-${ name }` }
                tabindex='0'>
                <img
                    style={ ` display: block; ` }
                    src={ `data:image/svg+xml;base64,${ base64encode(logo.toString()) }` }
                    alt={ name } />
            </div>
        );
    });
}

function renderFundingIcons({ cards, fundingicons, size, layout } :
    { cards : $ReadOnlyArray<string>, fundingicons : boolean, layout : string, size : string }) : ?JsxHTMLNode {

    if (!fundingicons) {
        return;
    }

    return <div class={ `${ CLASS.FUNDINGICONS }` }>{ renderCards({ cards, button: true, size, layout }) }</div>;
}

function renderContent(text : string, { label, locale, color, branding, logoColor, funding, env, cards, dynamicContent, layout, size } :
    { layout? : $Values<typeof BUTTON_LAYOUT>, size? : $Values<typeof BUTTON_SIZE>, label? : string, locale : LocaleType, color : string, branding? : boolean, logoColor? : string, funding? : FundingSelection, env : string, cards : $ReadOnlyArray<string>, dynamicContent? : Object }) : JsxHTMLNode {

    const content = getLocaleContent(locale);

    return jsxRender(text, {

        text(value : string) : JsxHTMLNode {
            const className = `${ CLASS.TEXT }`;
            return <span class={ className }>{ value }</span>;
        },

        logo(name : string) : ?JsxHTMLNode {

            if (!branding) {
                return;
            }

            if (!logoColor) {
                throw new Error(`Can not determine logo without logo color`);
            }
            
            const logo = (typeof fundingLogos[name] === 'function')
                ? fundingLogos[name]({ label, locale, color, branding, logoColor, funding, env, cards })
                : fundingLogos[name][logoColor] || fundingLogos[name][BUTTON_LOGO_COLOR.ANY];
                
            return (
                <img
                    class={ `${ CLASS.LOGO } ${ CLASS.LOGO }-${ name } ${ CLASS.LOGO }-${ color }` }
                    src={ `data:image/svg+xml;base64,${ base64encode(logo.toString()) }` }
                    alt={ name } />
            );
        },

        content(name : string) : JsxHTMLNode {
            let contentString;

            for (const key of name.split('|')) {
                if (content[key]) {
                    contentString = content[key];
                    break;
                }
            }

            const regex = /\[([a-z]+)\]/g;
            contentString = contentString && contentString.replace(regex, (match, contentVariable) => {
                if (match && contentVariable) {
                    return dynamicContent && dynamicContent[contentVariable];
                }
            });


            if (!contentString && env === ENV.TEST) {
                throw new Error(`Could not find content ${ name } for ${ locale.lang }_${ locale.country }`);
            }

            return renderContent(contentString || '', { label, locale, color, branding, logoColor, funding, env, cards });
        },

        cards() : $ReadOnlyArray<JsxHTMLNode> {
            if (!funding) {
                throw new Error(`Can not determine card types without funding`);
            }

            return renderCards({ cards, button: false, layout, size });
        },

        separator() : JsxHTMLNode {
            return <span class={ CLASS.SEPARATOR } />;
        },

        break(value : string) : JsxHTMLNode {
            const className = `${ CLASS.TEXT }`;
            return <span class={ className }>{ value.split('<br>')[0] }<br />{ value.split('<br>')[1] }</span>;
        }
    });
}

function renderButton({ size, label, color, locale, branding, multiple, layout, shape, source, funding, i, env, cards, installmentperiod } :
    { size : $Values<typeof BUTTON_SIZE>, label : $Values<typeof BUTTON_LABEL>, color : string, branding : boolean, locale : Object, multiple : boolean, layout : $Values<typeof BUTTON_LAYOUT>, shape : string, funding : FundingSelection, source : FundingSource, i : number, env : string, cards : $ReadOnlyArray<string>, installmentperiod : number }) : JsxHTMLNode {

    const logoColor = getButtonConfig(label, 'logoColors')[color];

    const buttonLabel = determineLabel({ label, source, multiple, layout });

    // If the determined button label matches up with the label passed by the merchant, use
    // the label template, otherwise use the logo template.
    let contentText = (buttonLabel === label)
        ? getButtonConfig(label, 'label')
        : getButtonConfig(label, 'logoLabel');


    // Add all the variables in dynamic content required to be plugged in content
    const dynamicContent = {
        installmentperiod,
        locale
    };

    contentText = typeof contentText === 'function' ? contentText(dynamicContent) : contentText;
    contentText = renderContent(contentText, { label, locale, color, branding, logoColor, funding, env, cards, dynamicContent, layout, size });

    // Define a list of funding options that will not need a tabindex
    const hasTabIndex = [
        FUNDING.CARD
    ].indexOf(source) === -1;

    return (
        <div
            { ...{ [ATTRIBUTE.LAYOUT]: layout ? layout : '' } }
            { ...{ [ATTRIBUTE.SIZE]: size ? size : '' } }
            { ...{ [ ATTRIBUTE.FUNDING_SOURCE ]: source, [ ATTRIBUTE.BUTTON ]: true } }
            class={ `${ CLASS.BUTTON } ${ CLASS.NUMBER }-${ i } ${ getCommonButtonClasses({ layout, shape, branding, multiple, env }) } ${ getButtonClasses({ label, color, logoColor }) }` }
            role='button'
            aria-label={ source }
            tabindex={ hasTabIndex && 0 }>
            
            { contentText }
        </div>
    );
}

function renderTagline({ label, tagline, color, locale, multiple, env, cards } : { label : string, color : string, tagline : boolean, locale : LocaleType, multiple : boolean, env : string, cards : $ReadOnlyArray<string> }) : ?JsxHTMLNode {

    if (!tagline) {
        return;
    }

    const tag = multiple
        ? (getButtonConfig(label, 'dualTag') || getButtonConfig(label, 'tag'))
        : getButtonConfig(label, 'tag');

    const text = renderContent(tag, { locale, color, env, cards });

    if (!text) {
        return;
    }

    const tagColor = getButtonConfig(label, 'tagLineColors')[color];

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

    const { layout, sources = [] } = props;

    if (!(layout === BUTTON_LAYOUT.VERTICAL)) {
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
        const style = props.style;

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

    const { label, locale, color, shape, branding,
        tagline, funding, layout, sources, multiple,
        env, height, cards, installmentperiod, fundingicons, size } = normalizeProps(props);

    const buttonNodes = determineButtons({ label, color, sources, multiple, layout })
        .map((button, i) => renderButton({
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
            size
        }));

    const taglineNode     = renderTagline({ label, tagline, color, locale, multiple, env, cards });
    const fundingiconNode = renderFundingIcons({ cards, fundingicons, size, layout });

    const styleNode  = renderStyle({ height, cardNumber: cards.length });
    const scriptNode = renderScript();
    const labelPowerByPayPal = cards.length > 0 ? renderPowerByPaypalLogo(normalizeProps(props)) : null;

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
