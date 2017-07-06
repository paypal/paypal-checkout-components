/* @flow */

import { componentLogos } from './logos';
import { componentStyle } from './style';
import { componentScript } from './script';
import { componentContent } from './content';
import { getButtonConfig } from './config';
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

function getSecondBtnHtml (color : string) : string {

    let colormapper = {
        gold: 'blue',
        blue: 'silver',
        silver: 'blue',
        black: 'blue'
    };

    let logocolormapper = {
        gold: 'white',
        blue: 'blue',
        silver: 'white',
        black: 'white'
    };

    let contentText = '${venmo}';
    let venmoBtnColor = colormapper[color];
    let venmoLogoColor = logocolormapper[color];
    let labelText = expandContentText(contentText, { color: venmoBtnColor, logoColor: venmoLogoColor });

    return `
    <div class="paypal-button-content paypal-color-${venmoBtnColor} venmo-logo-color-${venmoLogoColor}">
        ${ labelText }
    </div>
    `;
}

function removeBranding(contentText : string) : string {
    return contentText.replace('${pp}', '').trim().replace('${paypal}', '').replace(/ +/g, ' ');
}

export function componentTemplate({ props } : { props : Object }) : string {

    let dual = props.style.dual;

    let { locale = getButtonConfig('defaultLocale'), style = {} } = props;

    let [ lang, country ] = locale.split('_');
    let content = componentContent[country][lang];

    let label = style.label || getButtonConfig('default', 'defaultLabel');



    let {
        color        = getButtonConfig(label, 'defaultColor'),
        shape        = getButtonConfig(label, 'defaultShape'),
        branding     = getButtonConfig(label, 'defaultBranding'),
        fundingicons = getButtonConfig(label, 'defaultFundingIcons')
    } = style;

    let enableDualBtn = dual ? getButtonConfig(label, 'allowDualButton') : false;
    enableDualBtn = !branding ? false : enableDualBtn;


    let logoColor   = getButtonConfig(label, 'logoColors')[color];
    let taglineColor = getButtonConfig(label, 'tagLineColors')[color];


    let contentText = enableDualBtn ? getButtonConfig(label, 'defaultDualLabel') : (getButtonConfig(label, 'label') || content[label]);

    let allowTagline = (branding && !fundingicons);
    let taglineKey = enableDualBtn ? 'dual_tagline' : 'tagline';
    let tagline =  allowTagline ? getButtonConfig(label, taglineKey) : false;
    let tagcontent   = enableDualBtn ? (content[getButtonConfig(label, 'defaultDualTagKey')] || '') : (content[getButtonConfig(label, 'tagkey')] || '');

    if (!branding) {
        contentText = removeBranding(contentText);
    }

    let labelText = expandContentText(contentText, { color, logoColor });

    let secondButtonHtml = enableDualBtn ? getSecondBtnHtml(color) : '';

    return `
        <div id="paypal-button-container">

            <style type="text/css">
                ${ componentStyle }
            </style>

            <div id="paypal-button" class="paypal-button paypal-style-${ label } paypal-branding-${ branding ? 'true' : 'false' } paypal-dual-${ enableDualBtn ? 'true' : 'false' } paypal-shape-${ shape }" type="submit" role="button" tabindex="0">
                <div class="paypal-button-content paypal-color-${ color } paypal-logo-color-${logoColor}">
                    ${ labelText }
                </div>
                
                ${ secondButtonHtml }
                
                <div class="paypal-button-tag-content paypal-tagline-color-${taglineColor}">
                    ${ tagline ? tagcontent : '' }
                </div>

            </div>
        

            <script>
                (${ componentScript.toString() })();
            </script>
        </div>
    `;
}
