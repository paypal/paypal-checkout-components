import assert from 'assert';
import context from '../index';
import { locales } from '../config/locales';

let sizes = [ 'small', 'medium', 'large', 'responsive' ];

let colors = [ 'blue', 'gold', 'silver', 'black' ];

let shapes = [ 'rect', 'pill' ];

let brand = ['true', 'false'];


describe('Buy Now button Configurations before rendering', () => {

    for (let country of Object.keys(locales)) {
        for (let lang of locales[country]) {
            for (let size of sizes) {
                for (let color of colors) {
                    for (let shape of shapes) {
                        for (let branding of brand) {

                            let logoColor = {
                                gold: 'blue',
                                silver: 'blue',
                                blue: 'white',
                                black: 'white'
                            }[color];

                            let locale = (lang && country) ? `${lang}_${country}` : undefined;

                            it(`Should render the button for ${locale} / ${size} / ${color} / ${shape} / buynow / branding = ${branding}`, async () => { // eslint-disable-line

                                let req = {
                                    query: {
                                        'style.size': size,
                                        'style.color': color,
                                        'style.shape': shape,
                                        'style.label': 'buynow',
                                        'locale.x': locale
                                    },
                                    cookies: ''
                                };

                                if (branding === 'true') {
                                    req.query['style.branding'] = 'true';
                                }

                                let html = context(req).buttonHTML;

                                let expected =
                                    `<div id="paypal-button" class="paypal-button paypal-style-buynow paypal-branding-${branding} paypal-dual-false paypal-shape-${shape}" type="submit" role="button" tabindex="0">`;

                                let expectedColor =
                                    `<div class="paypal-button-content paypal-color-${ color } paypal-logo-color-${logoColor}">`;


                                assert(html.indexOf(expected) > -1, `Expected branding option, shape and locale to be set correctly in the template`);
                                assert(html.indexOf(expectedColor) > -1, 'Expected color to be set correctly in the template');

                            });
                        }
                    }
                }
            }
            break;
        }
    }

});

