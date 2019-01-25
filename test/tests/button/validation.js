/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';
import { noop } from 'belter/src';

import { createTestContainer, destroyTestContainer, mockProp } from '../common';

const buttonConfigs = [

    {
        name: 'callbacks',

        cases: [
            {
                desc: `both createOrder and onApprove`,

                valid: true,

                conf: {
                    createOrder:     noop,
                    onApprove:   noop
                }
            }
        ]
    },

    {
        name: 'labels',

        cases: [

            {
                label: `checkout`,
                valid: true
            },

            {
                label: `paypal`,
                valid: true
            },

            {
                label: `pay`,
                valid: true
            },

            {
                label: `buynow`,
                valid: false
            },

            {
                label: `venmo`,
                valid: false
            },

            {
                label: `credit`,
                valid: false
            },

            {
                label: `card`,
                valid: false
            },

            {
                label: `ideal`,
                valid: false
            },

            {
                label: `sepa`,
                valid: false
            },

            {
                label: `gnorf`,
                valid: false
            }

        ].map(({ label, valid }) => ({

            desc: `label ${ label }`,

            valid,

            conf: {
                createOrder:     noop,
                onApprove:   noop,
                style:       { label }
            }
        }))
    },

    {
        name: 'installment button',

        cases: [

            {
                period: 4,
                locale:            { country: 'BR', lang: 'pt' },
                valid:             true
            },

            {
                period: 6,
                locale:            { country: 'BR', lang: 'en' },
                valid:             true
            },

            {
                period: 6,
                locale:            { country: 'MX', lang: 'es' },
                valid:             true
            },

            {
                period: 6,
                locale: { country: 'MX', lang: 'en' },
                valid:  true
            }

        ].map(({ period, locale, valid }) => ({
            
            desc: `label: installment, locale: ${ locale.lang }_${ locale.country } and period: ${ period }`,

            valid,

            locale,

            conf: {
                createOrder:     noop,
                onApprove:   noop,
                style:       { period, label: 'installment' }
            }
        }))
    },

    {
        name: 'shapes',

        cases: [

            {
                shape: `pill`,
                valid: true
            },

            {
                shape: `rect`,
                valid: true
            },

            {
                shape: `zomg`,
                valid: false
            }

        ].map(({ shape, valid }) => ({

            desc: `shape ${ shape }`,

            valid,

            conf: {
                createOrder:     noop,
                onApprove:   noop,
                style:       { shape }
            }
        }))
    },

    {
        name: 'colors',

        cases: [

            {
                color: `gold`,
                valid: true
            },

            {
                color: `blue`,
                valid: true
            },

            {
                color: `silver`,
                valid: true
            },

            {
                color: `black`,
                valid: false
            },

            {
                color: `creditblue`,
                valid: false
            },

            {
                color: `darkblue`,
                valid: false
            },

            {
                color: `blerf`,
                valid: false
            },

            {
                label: `checkout`,
                color: `gold`,
                valid: true
            },

            {
                label: `checkout`,
                color: `blue`,
                valid: true
            },

            {
                label: `checkout`,
                color: `silver`,
                valid: true
            },

            {
                label: `checkout`,
                color: `black`,
                valid: false
            },

            {
                label: `checkout`,
                color: `creditblue`,
                valid: false
            },

            {
                label: `checkout`,
                color: `darkblue`,
                valid: false
            },

            {
                label: `checkout`,
                color: `blerf`,
                valid: false
            },

            {
                label: `paypal`,
                color: `gold`,
                valid: true
            },

            {
                label: `paypal`,
                color: `blue`,
                valid: true
            },

            {
                label: `paypal`,
                color: `silver`,
                valid: true
            },

            {
                label: `paypal`,
                color: `black`,
                valid: false
            },

            {
                label: `paypal`,
                color: `creditblue`,
                valid: false
            },

            {
                label: `paypal`,
                color: `darkblue`,
                valid: false
            },

            {
                label: `paypal`,
                color: `blerf`,
                valid: false
            },

            {
                label: `pay`,
                color: `gold`,
                valid: true
            },

            {
                label: `pay`,
                color: `blue`,
                valid: true
            },

            {
                label: `pay`,
                color: `silver`,
                valid: true
            },

            {
                label: `pay`,
                color: `black`,
                valid: false
            },

            {
                label: `pay`,
                color: `creditblue`,
                valid: false
            },

            {
                label: `pay`,
                color: `darkblue`,
                valid: false
            },

            {
                label: `pay`,
                color: `blerf`,
                valid: false
            },

            {
                label: `buynow`,
                color: `gold`,
                valid: false
            },

            {
                label: `buynow`,
                color: `blue`,
                valid: false
            },

            {
                label: `buynow`,
                color: `silver`,
                valid: false
            },

            {
                label: `buynow`,
                color: `black`,
                valid: false
            },

            {
                label: `buynow`,
                color: `creditblue`,
                valid: false
            },

            {
                label: `buynow`,
                color: `darkblue`,
                valid: false
            },

            {
                label: `buynow`,
                color: `blerf`,
                valid: false
            },

            {
                label: `credit`,
                color: `gold`,
                valid: false
            },

            {
                label: `credit`,
                color: `blue`,
                valid: false
            },

            {
                label: `credit`,
                color: `silver`,
                valid: false
            },

            {
                label: `credit`,
                color: `black`,
                valid: false
            },

            {
                label: `credit`,
                color: `creditblue`,
                valid: false
            },

            {
                label: `credit`,
                color: `darkblue`,
                valid: false
            },

            {
                label: `credit`,
                color: `blerf`,
                valid: false
            },

            {
                label: `venmo`,
                color: `gold`,
                valid: false
            },

            {
                label: `venmo`,
                color: `blue`,
                valid: false
            },

            {
                label: `venmo`,
                color: `silver`,
                valid: false
            },

            {
                label: `venmo`,
                color: `black`,
                valid: false
            },

            {
                label: `venmo`,
                color: `creditblue`,
                valid: false
            },

            {
                label: `venmo`,
                color: `darkblue`,
                valid: false
            },

            {
                label: `credit`,
                color: `blerf`,
                valid: false
            }

        // $FlowFixMe
        ].map(({ label, color, valid }) => ({

            desc: `color ${ color } with label ${ (label !== undefined) ? label : 'default' }`,

            valid,

            conf: {
                createOrder:     noop,
                onApprove:   noop,
                style:       { label, color }
            }
        }))
    },

    {
        name: 'layouts',

        cases: [

            {
                layout: `horizontal`,
                valid:  true
            },

            {
                layout: `vertical`,
                valid:  true
            },

            {
                layout: `ffggh`,
                valid:  false
            },

            {
                layout:  `vertical`,
                tagline: true,
                valid:   false
            },

            {
                layout: `vertical`,
                label:  `paypal`,
                valid:  true
            },

            {
                layout: `vertical`,
                label:  `checkout`,
                valid:  true
            },

            {
                layout: `vertical`,
                label:  `pay`,
                valid:  true
            },

            {
                layout: `vertical`,
                label:  `buynow`,
                valid:  false
            },

            {
                layout: `vertical`,
                label:  `venmo`,
                valid:  false
            },

            {
                layout: `vertical`,
                label:  `credit`,
                valid:  false
            },

            {
                layout: `vertical`,
                label:  `sepa`,
                valid:  false
            },

            {
                layout: `vertical`,
                label:  `ideal`,
                commit: true,
                valid:  false
            },

            {
                layout: `vertical`,
                label:  `bancontact`,
                commit: true,
                valid:  false
            },

            {
                layout: `vertical`,
                label:  `giropay`,
                commit: true,
                valid:  false
            },

            {
                layout: `vertical`,
                label:  `sofort`,
                commit: true,
                valid:  false
            },

            {
                layout: `vertical`,
                label:  `eps`,
                commit: true,
                valid:  false
            },

            {
                layout: `vertical`,
                label:  `mybank`,
                commit: true,
                valid:  false
            },

            {
                layout: `vertical`,
                label:  `p24`,
                commit: true,
                valid:  false
            },

            {
                layout: `vertical`,
                label:  `zimpler`,
                commit: true,
                valid:  false
            },

            {
                layout: `vertical`,
                label:  `wechatpay`,
                commit: true,
                valid:  false
            },

            {
                layout: `vertical`,
                label:  `card`,
                valid:  false
            }

        // $FlowFixMe
        ].map(({ layout, label, tagline, fundingicons, size, valid, commit }) => ({

            desc: `layout ${ layout } with label ${ (label !== undefined) ? label.toString() : 'default' }, tagline ${ (tagline !== undefined) ? tagline.toString() : 'default' }, fundingicons ${ (fundingicons !== undefined) ? fundingicons.toString() : 'default' }, size ${ (size !== undefined) ? size : 'default' }`,

            valid,

            conf: {
                createOrder:     noop,
                onApprove:   noop,
                commit,
                style:       { label, layout, tagline, fundingicons, size }
            }
        }))
    },

    {
        name: 'tagline',

        cases: [

            {
                tagline: true,
                layout:  'horizontal',
                valid:   true
            },

            {
                tagline: false,
                valid:   true,
                layout:  'vertical'
            },

            {
                tagline: false,
                layout:  'horizontal',
                valid:   true
            },

            {
                tagline: true,
                valid:   false,
                layout:  'vertical'
            }


        ].map(({ tagline, valid, layout }) => ({

            desc: `tagline ${ tagline.toString() }`,

            valid,

            conf: {
                createOrder:     noop,
                onApprove:   noop,
                style:       { tagline, layout }
            }
        }))
    },

    {
        name: 'height',

        cases: [

            {
                height: 45,
                valid:  true
            },

            {
                height: 60,
                valid:  false
            },

            {
                height: 25,
                valid:  true
            },

            {
                height: 20,
                valid:  false
            }

        // $FlowFixMe
        ].map(({ height, size, valid }) => ({

            desc: `height ${ height } with size ${ (size !== undefined) ? size : 'default' }`,

            valid,

            conf: {
                style:       { height, size },
                createOrder:     noop,
                onApprove:   noop
            }
        }))
    }
];

for (const group of buttonConfigs) {
    describe(`paypal button ${ group.name } validation`, () => {

        beforeEach(() => {
            createTestContainer();
        });

        afterEach(() => {
            destroyTestContainer();
        });

        for (const useCase of group.cases) {
            it(`should attempt to render a button with ${ useCase.desc } and ${ useCase.valid ? `succeed` : `fail` }`, () => {

                let mockCountry;
                let mockLang;

                if (useCase.locale) {
                    mockCountry = mockProp(window, '__TEST_LOCALE_COUNTRY__', useCase.locale.country);
                    mockLang = mockProp(window, '__TEST_LOCALE_LANG__', useCase.locale.lang);
                }

                return ZalgoPromise.try(() => {

                    if (useCase.valid) {
                        return window.paypal.Buttons({
                            test: {
                                action: `none`
                            },

                            ...useCase.conf
                        }).render(`body`);
                    } else {
                        let error;

                        try {
                            window.paypal.Buttons(useCase.conf);
                        } catch (err) {
                            error = err;
                        }

                        if (!error) {
                            throw new Error(`Expected error to be thrown`);
                        }
                    }

                }).then(() => {

                    if (mockCountry) {
                        mockCountry.cancel();
                    }

                    if (mockLang) {
                        mockLang.cancel();
                    }
                });
            });
        }
    });
}
