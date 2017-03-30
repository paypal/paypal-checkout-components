/* @flow */

import { config } from '../../../../config';

import { componentLogos } from './logos';
import { componentStyle } from './style';
import { componentScript } from './script';
import componentContent from './content.json';

let componentContentJSON = JSON.parse(componentContent);

let defaultLabel = 'checkout';

let buttonConfig = {

    checkout: {
        colors: [ 'gold', 'blue', 'silver' ],
        sizes:  [ 'small', 'medium', 'large', 'tiny', 'responsive' ],
        shapes: [ 'pill', 'rect' ],
        logos:   { gold: 'blue', silver: 'blue', blue: 'white' },
        label: true,
        logo: true,
        tagline: true
    },

    pay: {
        colors: [ 'gold', 'blue', 'silver' ],
        sizes:  [ 'small', 'medium', 'large', 'tiny', 'responsive' ],
        shapes: [ 'pill', 'rect' ],
        logos:   { gold: 'blue', silver: 'blue', blue: 'white' },
        label: true,
        logo: true,
        tagline: false
    },

    credit: {
        colors: [ 'creditblue' ],
        sizes:  [ 'small', 'medium', 'large', 'responsive' ],
        shapes: [ 'pill', 'rect' ],
        logos:   { creditblue: 'credit' },
        label: false,
        logo: true,
        tagline: true
    },

    buynow: {
        colors: [ 'gold' ],
        sizes:  [ 'small', 'medium', 'large', 'responsive' ],
        shapes: [ 'pill', 'rect' ],
        label: true,
        logo: false,
        tagline: false
    }
};

export function componentTemplate({ props } : { props : Object }) {

    let { country, lang } = config.locale;
    let content = componentContentJSON[country][lang];

    let style = props.style || {};
    let label = style.label || defaultLabel;
    let conf  = buttonConfig[label];

    if (!conf) {
        throw new Error(`Unexpected button label: ${label}`);
    }

    let {
        color = conf.colors[0],
        shape = conf.shapes[0],
        size  = conf.sizes[0]
    } = style;

    if (conf.colors.indexOf(color) === -1) {
        throw new Error(`Unexpected color for ${label} button: ${color}`);
    }

    if (conf.shapes.indexOf(shape) === -1) {
        throw new Error(`Unexpected shape for ${label} button: ${shape}`);
    }

    if (conf.sizes.indexOf(size) === -1) {
        throw new Error(`Unexpected size for ${label} button: ${size}`);
    }

    let logo = conf.logos && componentLogos[conf.logos[color]];

    let hasLabel = Boolean(content[label]);
    let hasLogo = hasLabel && content[label].indexOf('$wordmark$') !== -1;

    if (conf.label && !hasLabel) {
        throw new Error(`Expected to have label for ${label} button for ${lang}_${country}`);
    }

    if (conf.label && !hasLogo) {
        throw new Error(`Expected to have logo placeholder for ${label} button for ${lang}_${country}`);
    }

    let labelText;

    if (conf.label) {
        labelText = content[label].split('$').map(segment => {
            if (segment === 'wordmark') {
                return `<img src="data:image/svg+xml;base64,${logo}" alt="PayPal">`;
            } else if (segment) {
                return `<span class="text">${segment}</span>`;
            }
        }).join('');
    } else if (conf.logo) {
        labelText = `<img src="data:image/svg+xml;base64,${logo}" alt="PayPal">`;
    } else {
        throw new Error(`Could not build content for button`);
    }

    let labelTag = conf.tagline ? content[`${label}_tag`] : '';

    return `

        <head>
            <style type="text/css">
                ${ componentStyle }
            </style>
        </head>

        <body>
            <div id="paypal-button-container">
                <button class="paypal-button paypal-style-${ label } paypal-color-${ color } paypal-size-${ size } paypal-shape-${ shape }" type="submit">
                    <div class="paypal-button-content">
                        ${ labelText }
                    </div>
                    <div class="paypal-button-tag-content">
                        ${ labelTag }
                    </div>
                </button>
            </div>

            <script>
                (${ componentScript.toString() })();
            </script>
        </body>
    `;
}
