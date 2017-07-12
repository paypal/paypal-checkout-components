/* @flow */

import { componentLogos } from './logos';
import { componentStyle } from './style';
import { componentScript } from './script';
import { componentContent } from './content';
import { getButtonConfig } from './config';
import { validateButtonProps } from './validate';
import { btoa } from 'Base64';

function expandContentText(contentText : string, { color, logoColor } : { color : string, logoColor : string }) : string {
    return contentText.replace(/\$\{([a-zA-Z_-]+)\}|([^${}]+)/g, (match, name, text) => {
        if (name) {
            return `<img class="logo logo-${name} logo-${name}-${color}"
                        src="data:image/svg+xml;base64,${btoa(componentLogos[name][logoColor])}"
                        alt="${name}">`;
        } else if (text && text.trim()) {
            return `<span class="text">${text}</span>`;
        } else {
            return text;
        }
    });
}

function removeBranding(contentText : string) : string {
    return contentText.replace('${pp}', '').trim().replace('${paypal}', '').replace(/ +/g, ' ');
}

export function componentTemplate({ props } : { props : Object }) : string {

    validateButtonProps(props);

    let { locale = getButtonConfig('defaultLocale'), style = {} } = props;

    let [ lang, country ] = locale.split('_');
    let content = componentContent[country][lang];

    let label = style.label || getButtonConfig('default', 'defaultLabel');

    let {
        color        = getButtonConfig(label, 'defaultColor'),
        shape        = getButtonConfig(label, 'defaultShape'),
        size         = getButtonConfig(label, 'defaultSize'),
        branding     = getButtonConfig(label, 'defaultBranding'),
        fundingicons = getButtonConfig(label, 'defaultFundingIcons')
    } = style;

    let contentText = getButtonConfig(label, 'label') || content[label];
    let logoColor   = getButtonConfig(label, 'logoColors')[color];

    let allowTagline = (branding && !fundingicons);
    let tagline      = allowTagline ? getButtonConfig(label, 'tagline') : false;
    let tagcontent   = content[getButtonConfig(label, 'tagkey')] || '';

    if (!branding) {
        contentText = removeBranding(contentText);
    }

    let labelText = expandContentText(contentText, { color, logoColor });

    return `
        <div id="paypal-button-container">

            <style type="text/css">
                ${ componentStyle }
            </style>

            <div id="paypal-button" class="paypal-button paypal-style-${ label } paypal-branding-${ branding ? 'true' : 'false' }  paypal-color-${ color } paypal-logo-color-${logoColor} paypal-size-${ size } paypal-shape-${ shape }" type="submit" role="button" tabindex="0">
                <div class="paypal-button-content">
                    ${ labelText }
                </div>
                <div class="paypal-button-tag-content">
                    ${ tagline ? tagcontent : '' }
                </div>
            </div>

            <script>
                (${ componentScript.toString() })();
            </script>
        </div>
    `;
}
