/* @flow */

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
        logos:  { gold: 'blue', silver: 'blue', blue: 'white' },
        label: true,
        logo: true,
        tagline: true
    },

    pay: {
        colors: [ 'gold', 'blue', 'silver' ],
        sizes:  [ 'small', 'medium', 'large', 'responsive' ],
        shapes: [ 'pill', 'rect' ],
        logos:  { gold: 'blue', silver: 'blue', blue: 'white' },
        tagline: false
    },

    credit: {
        contentText: '${pp}${paypal}${credit}',
        colors: [ 'creditblue' ],
        sizes:  [ 'small', 'medium', 'large', 'responsive' ],
        shapes: [ 'pill', 'rect' ],
        logos:  { creditblue: 'white' },
        tagline: true
    },

    buynow: {
        colors: [ 'gold' ],
        sizes:  [ 'small', 'medium', 'large', 'responsive' ],
        shapes: [ 'pill', 'rect' ],
        tagline: false
    }
};

export function componentTemplate({ props } : { props : Object }) : string {

    if (!props.locale) {
        throw new Error(`Expected props.locale to be set`);
    }

    let [ lang, country ] = props.locale.split('_');

    let style   = props.style || {};
    let label   = style.label || defaultLabel;
    let conf    = buttonConfig[label];

    if (!conf) {
        throw new Error(`Unexpected button label: ${label}`);
    }

    let content = componentContentJSON[country][lang];

    if (!content) {
        throw new Error(`Could not find content for ${label} for ${lang}_${country}`);
    }

    let contentText = conf.contentText || content[label];

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

    let logoColor = conf.logos[color];

    let labelText = contentText.replace(/\$\{([a-zA-Z_-]+)\}|([^${}]+)/g, (match, name, text) => {
        if (name) {
            return componentLogos[name][logoColor];
        } else if (text) {
            return `<span class="text">${text}</span>`;
        }
    });

    let labelTag = conf.tagline && content[`${label}_tag`] ? content[`${label}_tag`] : '';

    console.warn(conf.tagline, `${label}_tag`, content, content[`${label}_tag`]);

    return `

        <head>
            <style type="text/css">
                ${ componentStyle }
            </style>
        </head>

        <body>
            <div id="paypal-button-container">
                <div class="paypal-button paypal-style-${ label } paypal-color-${ color } paypal-logo-color-${logoColor} paypal-size-${ size } paypal-shape-${ shape }" type="submit">
                    <div class="paypal-button-content">
                        ${ labelText }
                    </div>
                    <div class="paypal-button-tag-content">
                        ${ labelTag }
                    </div>
                </div>
            </div>

            <script>
                (${ componentScript.toString() })();
            </script>
        </body>
    `;
}
