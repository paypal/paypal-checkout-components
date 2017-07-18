import assert from 'assert';
import context from '../index';
import { locales } from '../config/locales';

let labels = [ 'checkout', 'credit', 'pay', 'generic' ];

let sizes = [ 'tiny', 'small', 'medium', 'large', 'responsive' ];

let colors = [ 'blue', 'gold', 'silver', 'creditblue', 'black' ];

let shapes = [ 'rect', 'pill' ];


describe('Button Configurations before rendering', () => {

    for (let country of Object.keys(locales)) {
        for (let lang of locales[country]) {
            for (let label of labels) {
                for (let size of sizes) {
                    for (let color of colors) {
                        for (let shape of shapes) {

                            let logoColor = {
                                gold: 'blue',
                                silver: 'blue',
                                blue: 'white',
                                creditblue: 'white',
                                black: 'white'
                            }[color];

                            let locale = (lang && country) ? `${lang}_${country}` : undefined;

                            if (label === 'credit') {

                                if (size === 'tiny') {
                                    continue;
                                }

                                if (color !== 'creditblue') {
                                    continue;
                                }

                            } else if (color === 'creditblue') {
                                continue;
                            }

                            if (label === 'pay' || label === 'generic') {
                                if (size === 'tiny') {
                                    continue;
                                }
                            }

                            it(`Should render the button for ${locale} / ${size} / ${color} / ${shape} / ${label}`, async () => { // eslint-disable-line

                                let req = {
                                    query: {
                                        'style.size': size,
                                        'style.color': color,
                                        'style.shape': shape,
                                        'style.label': label,
                                        'locale.x': locale
                                    },
                                    cookies: ''
                                };

                                let html = context(req).buttonHTML;

                                let expected =
                                    `<div id="paypal-button" class="paypal-button paypal-style-${label} paypal-branding-true paypal-dual-false paypal-shape-${shape}" type="submit" role="button" tabindex="0">`;

                                let expectedColor =
                                    `<div class="paypal-button-content paypal-color-${ color } paypal-logo-color-${logoColor}">`;


                                assert(html.indexOf(expected) > -1, 'Expected label, shape and locale to be set correctly in the template');
                                // assert(html.indexOf(expected) > -1, `Expected ${expected}' but got ${html}`);
                                assert(html.indexOf(expectedColor) > -1, 'Expected color to be set correctly in the template');

                                if (label !== 'credit' && label !== 'generic') {
                                    assert(html.match(`<span class="text">.+</span>`, 'Button should have text'));
                                }


                                if (label !== 'buynow') {
                                    assert(html.indexOf(`<img class="logo logo-paypal logo-paypal-${color}"`, 'Button should have a logo'));
                                }
                            });
                        }
                    }
                }
            }
            break;
        }
    }

});
