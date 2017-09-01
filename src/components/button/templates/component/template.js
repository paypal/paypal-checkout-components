/* @flow */

import { btoa } from 'Base64';

import { BRANDING, LAYOUT } from '../../constants';

import { componentLogos } from './logos';
import { componentStyle } from './style';
import { componentScript } from './script';
import { componentContent } from './content';
import { getButtonConfig } from './config';

function expandContentText(contentText : string, { color, logoColor } : { color : string, logoColor : string }) : string {
    return contentText.replace(/\$\{([a-zA-Z_-]+)\}|([^${}]+)/g, (match, name, text) => {
        if (name) {
            return `<img class="logo logo-${ name } logo-${ name }-${ color }"
                        src="data:image/svg+xml;base64,${ btoa(componentLogos[name][logoColor]) }"
                        alt="${ name }">`;
        } else if (text && text.trim()) {
            return `<span class="text">${ text }</span>`;
        } else {
            return text;
        }
    });
}

function removeBranding(contentText : string) : string {
    return contentText.replace('${pp}', '').trim().replace('${paypal}', '').replace(/ +/g, ' '); // eslint-disable-line no-template-curly-in-string
}

function parseLocale(locale : string) : { country : string, lang : string } {
    let [ lang, country ] = locale.split('_');
    return { country, lang };
}

function getLocaleContent(locale : { country : string, lang : string }) : Object {
    let { country, lang } = locale;
    return componentContent[country][lang];
}

function normalizeProps(props : Object) : Object {

    let {
        locale = getButtonConfig('default', 'defaultLocale'),
        style = {}
    } = props;

    locale = parseLocale(locale);

    let label = style.label || getButtonConfig('default', 'defaultLabel');

    let {
        color        = getButtonConfig(label, 'defaultColor'),
        shape        = getButtonConfig(label, 'defaultShape'),
        branding     = getButtonConfig(label, 'defaultBranding'),
        fundingicons = getButtonConfig(label, 'defaultFundingIcons'),
        tagline      = getButtonConfig(label, 'defaultTagline'),
        dual         = getButtonConfig(label, 'defaultDual')
    } = style;

    // Remove this once xo-buttonjs is pushed
    if (dual === true) {
        dual = 'venmo';
    }

    if (dual && !branding && !getButtonConfig(dual, 'allowUnbranded')) {
        dual = '';
    }

    return { label, locale, color, shape,
        branding, fundingicons, tagline, dual };
}

function determineButtons({ label, color, dual } : { label : string, color : string, dual : string }) : Array<{ label : string, color : string }> {

    let buttons = [];

    buttons.push({
        label,
        color
    });

    if (dual) {
        buttons.push({
            label: dual,
            color: getButtonConfig(dual, 'dualColors')[color]
        });
    }

    return buttons;
}

function buttonTemplate({ label, color, isDual, locale, branding } : { label : string, color : string, isDual : boolean, branding : boolean, locale : Object }) : string {

    let logoColor = getButtonConfig(label, 'logoColors')[color];

    let content = getLocaleContent(locale);

    let contentText = isDual
        ? getButtonConfig(label, 'dualLabel', content[label])
        : getButtonConfig(label, 'label', content[label]);

    if (!branding) {
        contentText = removeBranding(contentText);
    }

    contentText = expandContentText(contentText, { color, logoColor });

    return `
        <div class="paypal-button-content paypal-label-${ label } paypal-color-${ color } paypal-logo-color-${ logoColor }" role="button" tabindex="0">
            ${ contentText }
        </div>
    `;
}

function enableTagline({ tagline, branding, fundingicons }) : boolean {
    return Boolean(tagline && branding && !fundingicons);
}

function taglineTemplate({ label, tagline, branding, fundingicons, color, dual, locale }) : string {

    let enabled = enableTagline({ tagline, branding, fundingicons });

    if (!enabled) {
        return '';
    }

    let key = dual
        ? getButtonConfig(label, 'dualTagKey')
        : getButtonConfig(label, 'tagKey');

    let content = getLocaleContent(locale);
    let text    = content[key];

    if (!text) {
        return '';
    }

    let tagColor = getButtonConfig(label, 'tagLineColors')[color];

    return `
        <div class="paypal-tagline paypal-tagline-color-${ tagColor }">
            ${ text }
        </div>
    `;
}

export function componentTemplate({ props } : { props : Object }) : string {

    let { label, locale, color, shape, branding,
        fundingicons, tagline, dual } = normalizeProps(props);

    let buttonHTML = determineButtons({ label, color, dual }).map(button => {
        return buttonTemplate({
            label:  button.label,
            color:  button.color,
            isDual: Boolean(dual),
            locale,
            branding
        });
    }).join('\n');

    let taglineHTML = taglineTemplate({
        label, tagline, branding,
        fundingicons, color, dual, locale
    });

    return `
        <style type="text/css">
            ${ componentStyle }
        </style>

        <div id="paypal-button" class="paypal-button paypal-branding-${ branding ? BRANDING.BRANDED : BRANDING.UNBRANDED } paypal-layout-${ dual ? LAYOUT.DUAL : LAYOUT.SINGLE } paypal-shape-${ shape }">
            ${ buttonHTML }
            ${ taglineHTML }
        </div>

        <script>
            (${ componentScript.toString() })();
        </script>
    `;
}
