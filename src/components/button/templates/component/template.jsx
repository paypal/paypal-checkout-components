/* @flow */
/* @jsx jsxToHTML */

import { btoa } from 'Base64';

import { BUTTON_BRANDING, BUTTON_NUMBER, BUTTON_LOGO_COLOR } from '../../constants';
import { getButtonConfig, fundingToDefaultLabel } from '../config';
import { determineEligibleCards, type FundingSource, type FundingList, type FundingSelection } from '../funding';
import { normalizeProps } from '../props';

import { componentLogos } from './logos';
import { componentStyle } from './style';
import { getComponentScript } from './script';
import { componentContent } from './content';
import { CLASS } from './style/class';
import { render, jsxToHTML, type JsxHTMLNode } from './util'; // eslint-disable-line no-unused-vars
import { validateButtonProps } from './validate';

function getCommonButtonClasses({ layout, shape, branding, multiple }) : string {
    return [
        `${ CLASS.LAYOUT }-${ layout }`,
        `${ CLASS.SHAPE }-${ shape }`,
        `${ CLASS.BRANDING }-${ branding ? BUTTON_BRANDING.BRANDED : BUTTON_BRANDING.UNBRANDED }`,
        `${ CLASS.NUMBER }-${ multiple ? BUTTON_NUMBER.MULTIPLE : BUTTON_NUMBER.SINGLE }`
    ].join(' ');
}

function getButtonClasses({ label, color, logoColor }) : string {
    return [
        `${ CLASS.LABEL }-${ label }`,
        `${ CLASS.COLOR }-${ color }`,
        `${ CLASS.LOGO_COLOR }-${ logoColor }`
    ].join(' ');
}

function getLocaleContent(locale : { country : string, lang : string }) : Object {
    let { country, lang } = locale;
    return componentContent[country][lang];
}

function determineButtons({ label, color, sources, multiple } : { label : string, color : string, sources : FundingList, multiple : boolean }) :
    Array<{ label : string, color : string, source : FundingSource }> {

    return sources.map((source, i) => {

        let buttonLabel = multiple
            ? fundingToDefaultLabel(source)
            : label;

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

function renderCards({ funding } : { funding : FundingSelection }) : Array<JsxHTMLNode> {

    return determineEligibleCards({ funding, count: 4 }).map(name =>
        <span class={ `${ CLASS.CARD } ${ CLASS.CARD }-${ name }` }></span>
    );
}

function renderFundingIcons({ funding, fundingicons } : { funding : FundingSelection, fundingicons : boolean }) : ?JsxHTMLNode {

    if (!fundingicons) {
        return;
    }

    return <div class={ `${ CLASS.FUNDINGICONS }` }>{ renderCards({ funding }) }</div>;
}

function renderContent(text : string, { locale, color, branding, logoColor, funding } :
    { locale : { country : string, lang : string }, color : string, branding? : boolean, logoColor? : string, funding? : FundingSelection }) : JsxHTMLNode {

    let content = getLocaleContent(locale);

    return render(text, {

        text(value : string) : JsxHTMLNode {
            return <span class={ CLASS.TEXT }>{ value }</span>;
        },

        logo(name : string) : ?JsxHTMLNode {

            if (!branding) {
                return;
            }

            if (!logoColor) {
                throw new Error(`Can not determine logo without logo color`);
            }

            let logo = componentLogos[name][logoColor] || componentLogos[name][BUTTON_LOGO_COLOR.ANY];

            return <img
                class={ `${ CLASS.LOGO } ${ CLASS.LOGO }-${ name } ${ CLASS.LOGO }-${ color }` }
                src={ `data:image/svg+xml;base64,${ btoa(logo) }` }
                alt={ name } />;
        },

        content(name : string) : JsxHTMLNode {
            return renderContent(content[name], { locale, color, branding, logoColor, funding });
        },

        cards() : Array<JsxHTMLNode> {
            if (!funding) {
                throw new Error(`Can not determine card types without funding`);
            }

            return renderCards({ funding });
        },

        separator() : JsxHTMLNode {
            return <span class={ CLASS.SEPARATOR }></span>;
        }
    });
}

function renderButton({ label, color, locale, branding, multiple, layout, shape, source, funding, i } :
    { label : string, color : string, branding : boolean, locale : Object, multiple : boolean, layout : string, shape : string, funding : FundingSelection, source : FundingSource, i : number }) : JsxHTMLNode {

    let logoColor = getButtonConfig(label, 'logoColors')[color];

    let contentText = multiple
        ? getButtonConfig(label, 'logoLabel')
        : getButtonConfig(label, 'label');

    contentText = renderContent(contentText, { locale, color, branding, logoColor, funding });

    return (
        <div data-funding-source={ source } class={ `${ CLASS.BUTTON } ${ CLASS.NUMBER }-${ i } ${ getCommonButtonClasses({ layout, shape, branding, multiple }) } ${ getButtonClasses({ label, color, logoColor }) }` } role='button' tabindex='0'>
            { contentText }
        </div>
    );
}

function renderTagline({ label, tagline, color, locale, multiple }) : ?JsxHTMLNode {

    if (!tagline) {
        return;
    }

    let tag = multiple
        ? getButtonConfig(label, 'dualTag')
        : getButtonConfig(label, 'tag');

    let text = renderContent(tag, { locale, color });

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

function renderStyle() : JsxHTMLNode {
    return (
        <style innerHTML={ componentStyle } />
    );
}

export function componentTemplate({ props } : { props : Object }) : string {
    validateButtonProps(props);

    let { label, locale, color, shape, branding, tagline, funding,
        layout, sources, multiple, fundingicons } = normalizeProps(props);

    let buttonNodes = determineButtons({ label, color, sources, multiple })
        .map((button, i) => renderButton({
            label:   button.label,
            color:   button.color,
            source:  button.source,
            i,
            funding,
            multiple,
            locale,
            branding,
            layout,
            shape
        }));

    let taglineNode     = renderTagline({ label, tagline, color, locale, multiple });
    let fundingiconNode = renderFundingIcons({ funding, fundingicons });

    let styleNode  = renderStyle();
    let scriptNode = renderScript();

    return (
        <div class={ `${ CLASS.CONTAINER } ${ getCommonButtonClasses({ layout, shape, branding, multiple }) }` }>
            { styleNode }

            { buttonNodes }
            { taglineNode || fundingiconNode }

            { scriptNode }
        </div>
    ).toString();
}
