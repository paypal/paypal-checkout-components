/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { noop } from '@krakenjs/belter/src';

import { createTestContainer, destroyTestContainer } from '../common';

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
                valid: true
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
            },

            {
                label: `subscribe`,
                valid: true
            },

            {
                label: `donate`,
                valid: true
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
                valid:  true
            },

            {
                period: 6,
                valid:  true
            },

            {
                period: 6,
                valid:  true
            },

            {
                period: 6,
                valid:  true
            }

        ].map(({ period, valid }) => ({

            desc: `label: installment, period: ${ period }`,

            valid,

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
                valid: true
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
                valid: true
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
                valid: true
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
                valid: true
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
                valid: true
            },

            {
                label: `buynow`,
                color: `blue`,
                valid: true
            },

            {
                label: `buynow`,
                color: `silver`,
                valid: true
            },

            {
                label: `buynow`,
                color: `black`,
                valid: true
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
            },

            {
                label: `subscribe`,
                color: `gold`,
                valid: true
            },

            {
                label: `subscribe`,
                color: `blue`,
                valid: true
            },

            {
                label: `subscribe`,
                color: `silver`,
                valid: true
            },

            {
                label: `subscribe`,
                color: `black`,
                valid: true
            },

            {
                label: `subscribe`,
                color: `creditblue`,
                valid: false
            },

            {
                label: `subscribe`,
                color: `darkblue`,
                valid: false
            },

            {
                label: `subscribe`,
                color: `blerf`,
                valid: false
            },

            {
                label: `donate`,
                color: `gold`,
                valid: true
            },

            {
                label: `donate`,
                color: `blue`,
                valid: true
            },

            {
                label: `donate`,
                color: `silver`,
                valid: true
            },

            {
                label: `donate`,
                color: `black`,
                valid: true
            },

            {
                label: `donate`,
                color: `creditblue`,
                valid: false
            },

            {
                label: `donate`,
                color: `darkblue`,
                valid: false
            },

            {
                label: `donate`,
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
                valid:  true
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
                label:  `oxxo`,
                commit: true,
                valid:  false
            },

            {
                layout: `vertical`,
                label:  `boleto`,
                commit: true,
                valid:  false
            },

            {
                layout: `vertical`,
                label:  `multibanco`,
                commit: true,
                valid:  false
            },

            {
                layout: `vertical`,
                label:  `maxima`,
                commit: true,
                valid:  false
            },

            {
                layout: `vertical`,
                label:  `card`,
                valid:  false
            },

            {
                layout: `vertical`,
                label:  `payu`,
                commit: true,
                valid:  false
            },

            {
                layout: `vertical`,
                label:  `verkkopankki`,
                commit: true,
                valid:  false
            },

            {
                layout: `vertical`,
                label:  `blik`,
                commit: true,
                valid:  false
            },

            {
                layout: `vertical`,
                label:  `trustly`,
                commit: true,
                valid:  false
            },

            {
                layout: `vertical`,
                label:  `mercadopage`,
                commit: true,
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
                tagline: 'false',
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
                });
            });
        }
    });
}
