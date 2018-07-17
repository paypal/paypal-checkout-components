/* @flow */
/* @jsx jsxToHTML */

import { btoa } from 'Base64';

import { BUTTON_NUMBER, BUTTON_LOGO_COLOR, BUTTON_LABEL, BUTTON_LAYOUT, ENV, ATTRIBUTE, FUNDING } from '../../constants';
import { getButtonConfig, labelToFunding, fundingToDefaultLabel } from '../config';
import { normalizeProps } from '../props';
import { jsxToHTML, type JsxHTMLNode, jsxRender } from '../../lib/jsx'; // eslint-disable-line no-unused-vars
import { fundingLogos, cardLogos } from '../../resources';
import { validateButtonProps } from '../validate';
import type { LocaleType, FundingSource, FundingSelection, FundingList } from '../../types';

import { componentStyle, CLASS } from './componentStyle';
import { getComponentScript } from './componentScript';
import { componentContent } from './content';

function getCommonButtonClasses({ layout, shape, multiple, env }) : string {
    return [
        `${ CLASS.LAYOUT }-${ layout }`,
        `${ CLASS.SHAPE }-${ shape }`,
        `${ CLASS.NUMBER }-${ multiple ? BUTTON_NUMBER.MULTIPLE : BUTTON_NUMBER.SINGLE }`,
        `${ CLASS.ENV }-${ env }`
    ].join(' ');
}

function getButtonClasses({ label, color, logoColor }) : string {
    return [
        `${ CLASS.LABEL }-${ label }`,
        `${ CLASS.COLOR }-${ color }`,
        `${ CLASS.LOGO_COLOR }-${ logoColor }`
    ].join(' ');
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

function renderCards({ cards, button } : { cards : Array<string>, button : ?boolean }) : Array<JsxHTMLNode> {

    return cards.map(name => {
        let logo = cardLogos[name];

        return (
            <img
                { ...{ [ATTRIBUTE.BUTTON]: (button || false), [ATTRIBUTE.FUNDING_SOURCE]: `${ FUNDING.CARD }`, [ATTRIBUTE.CARD]: `${ name }` } }
                class={ `${ CLASS.CARD } ${ CLASS.CARD }-${ name } ${ button ? CLASS.BUTTON : '' }` }
                src={ `data:image/svg+xml;base64,${ btoa(logo) }` }
                alt={ name } />
        );
    });
}

function renderFundingIcons({ cards, fundingicons } :
    { cards : Array<string>, fundingicons : boolean }) : ?JsxHTMLNode {

    if (!fundingicons) {
        return;
    }

    return <div class={ `${ CLASS.FUNDINGICONS }` }>{ renderCards({ cards, button: true }) }</div>;
}

function renderContent(text : string, { label, locale, color, logoColor, funding, env, cards, dynamicContent } :
    { label? : string, locale : LocaleType, color : string, logoColor? : string, funding? : FundingSelection, env : string, cards : Array<string>, dynamicContent? : Object }) : JsxHTMLNode {

    let content = componentContent[locale.country][locale.lang];

    return jsxRender(text, {

        text(value : string) : JsxHTMLNode {
            let className = `${ CLASS.TEXT }`;
            return <span class={ className }>{ value }</span>;
        },

        logo(name : string) : ?JsxHTMLNode {

            if (!logoColor) {
                throw new Error(`Can not determine logo without logo color`);
            }
            
            let logo = (typeof fundingLogos[name] === 'function')
                ? fundingLogos[name]({ label, locale, color, logoColor, funding, env, cards })
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

            return renderContent(contentString || '', { label, locale, color, logoColor, funding, env, cards });        },

        cards() : Array<JsxHTMLNode> {
            if (!funding) {
                throw new Error(`Can not determine card types without funding`);
            }

            return renderCards({ cards, button: false });
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

function renderButton({ label, color, locale, multiple, layout, shape, source, funding, i, env, cards, installmentperiod } :
    { label : $Values<typeof BUTTON_LABEL>, color : string, locale : Object, multiple : boolean, layout : $Values<typeof BUTTON_LAYOUT>, shape : string, funding : FundingSelection, source : FundingSource, i : number, env : string, cards : Array<string>, installmentperiod : number }) : JsxHTMLNode {

    let logoColor = getButtonConfig(label, 'logoColors')[color];

    let buttonLabel = determineLabel({ label, source, multiple, layout });

    // If the determined button label matches up with the label passed by the merchant, use
    // the label template, otherwise use the logo template.
    let contentText = (buttonLabel === label)
        ? getButtonConfig(label, 'label')
        : getButtonConfig(label, 'logoLabel');


    // Add all the variables in dynamic content required to be plugged in content
    let dynamicContent = {
        installmentperiod
    };

    contentText = typeof contentText === 'function' ? contentText(dynamicContent) : contentText;
    contentText = renderContent(contentText, { label, locale, color, logoColor, funding, env, cards, dynamicContent });

    return (
        <div
            { ...{ [ ATTRIBUTE.FUNDING_SOURCE ]: source, [ ATTRIBUTE.BUTTON ]: true } }
            class={ `${ CLASS.BUTTON } ${ CLASS.NUMBER }-${ i } ${ getCommonButtonClasses({ layout, shape, multiple, env }) } ${ getButtonClasses({ label, color, logoColor }) }` }
            role='button'
            aria-label={ source }
            tabindex='0'>
            
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

export function componentTemplate({ props } : { props : Object }) : string {

    validateButtonProps(props);

    let { label, locale, color, shape,
        tagline, funding, layout, sources, multiple,
        fundingicons, env, height, cards, installmentperiod } = normalizeProps(props);

    let buttonNodes = determineButtons({ label, color, sources, multiple, layout })
        .map((button, i) => renderButton({
            label:   button.label,
            color:   button.color,
            source:  button.source,
            env,
            i,
            funding,
            multiple,
            locale,
            layout,
            shape,
            cards,
            installmentperiod
        }));

    let taglineNode     = renderTagline({ label, tagline, color, locale, multiple, env, cards });
    let fundingiconNode = renderFundingIcons({ cards, fundingicons });

    let styleNode  = renderStyle({ height, cardNumber: cards.length });
    let scriptNode = renderScript();

    return (
        <div { ...{ [ ATTRIBUTE.VERSION ]: __PAYPAL_CHECKOUT__.__MINOR_VERSION__ } } class={ `${ CLASS.CONTAINER } ${ getCommonButtonClasses({ layout, shape, multiple, env }) }` }>
            { styleNode }

            { buttonNodes }
            { taglineNode || fundingiconNode }

            { scriptNode }
        </div>
    ).toString();
}
