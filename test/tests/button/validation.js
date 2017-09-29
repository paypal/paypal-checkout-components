/* @flow */
/* eslint max-lines: 0 */

import { assert } from 'chai';

import { createTestContainer, destroyTestContainer, noop } from '../common';

let buttonConfigs = [

    {
        name: 'callbacks',

        cases: [
            {
                desc: `both payment and onAuthorize`,

                valid: true,

                conf: {
                    payment:     noop,
                    onAuthorize: noop
                }
            },

            {
                desc: `just payment, no onAuthorize`,

                valid: false,

                conf: {
                    payment: noop
                }
            },

            {
                desc: `just onAuthorize, no payment`,

                valid: false,

                conf: {
                    onAuthorize: noop
                }
            },


            {
                desc: `commit true`,

                valid: true,

                conf: {
                    payment:     noop,
                    onAuthorize: noop,
                    commit:      true
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
                valid: true
            },

            {
                label: `credit`,
                valid: true
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
                label: `elv`,
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
                payment:     noop,
                onAuthorize: noop,
                style:       { label }
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
                payment:     noop,
                onAuthorize: noop,
                style:       { shape }
            }
        }))
    },

    {
        name: 'sizes',

        cases: [

            {
                size:  `tiny`,
                valid: true
            },

            {
                size:  `small`,
                valid: true
            },

            {
                size:  `medium`,
                valid: true
            },

            {
                size:  `large`,
                valid: true
            },

            {
                size:  `responsive`,
                valid: true
            },

            {
                size:  `huge`,
                valid: false
            },

            {
                size:  `blerf`,
                valid: false
            }

        ].map(({ size, valid }) => ({

            desc: `size ${ size }`,

            valid,

            conf: {
                payment:     noop,
                onAuthorize: noop,
                style:       { size }
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
                valid: true
            },

            {
                label: `credit`,
                color: `creditblue`,
                valid: true
            },

            {
                label: `credit`,
                color: `darkblue`,
                valid: true
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
                valid: true
            },

            {
                label: `venmo`,
                color: `silver`,
                valid: true
            },

            {
                label: `venmo`,
                color: `black`,
                valid: true
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

            desc: `color ${ color } with label ${ label || 'default' }`,

            valid,

            conf: {
                payment:     noop,
                onAuthorize: noop,
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
                layout:       `vertical`,
                fundingicons: true,
                valid:        false
            },

            {
                layout:   `vertical`,
                branding: false,
                valid:    false
            },

            {
                layout:  `vertical`,
                size:    'small',
                valid:   false
            },

            {
                layout:  `vertical`,
                size:    'medium',
                valid:   true
            },

            {
                layout:  `vertical`,
                size:    'large',
                valid:   true
            },

            {
                layout:  `vertical`,
                size:    'responsive',
                valid:   true
            },

            {
                layout:  `vertical`,
                size:    'wgeewg',
                valid:   false
            }

        // $FlowFixMe
        ].map(({ layout, tagline, fundingicons, branding, size, valid }) => ({

            desc: `layout ${ layout } with tagline ${ tagline ? tagline.toString() : 'default' }, fundingicons ${ fundingicons ? fundingicons.toString() : 'default' }, branding ${ branding || 'default' }, size ${ size || 'default' }`,

            valid,

            conf: {
                payment:     noop,
                onAuthorize: noop,
                style:       { layout, tagline, fundingicons, branding, size }
            }
        }))
    },

    {
        name: 'max',

        cases: [

            {
                max:    0,
                valid:  false
            },

            {
                max:    1,
                valid:  true
            },

            {
                max:    2,
                valid:  true
            },

            {
                max:    3,
                valid:  false
            },

            {
                max:    4,
                valid:  false
            },

            {
                max:    5,
                valid:  false
            },

            {
                layout: `horizontal`,
                max:    0,
                valid:  false
            },

            {
                layout: `horizontal`,
                max:    1,
                valid:  true
            },

            {
                layout: `horizontal`,
                max:    2,
                valid:  true
            },

            {
                layout: `horizontal`,
                max:    3,
                valid:  false
            },

            {
                layout: `horizontal`,
                max:    4,
                valid:  false
            },

            {
                layout: `horizontal`,
                max:    5,
                valid:  false
            },

            {
                layout: `vertical`,
                max:    0,
                valid:  false
            },

            {
                layout: `vertical`,
                max:    1,
                valid:  false
            },

            {
                layout: `vertical`,
                max:    2,
                valid:  true
            },

            {
                layout: `vertical`,
                max:    3,
                valid:  true
            },

            {
                layout: `vertical`,
                max:    4,
                valid:  true
            },

            {
                layout: `vertical`,
                max:    5,
                valid:  false
            },

            {
                max:    '1',
                valid:  false
            },

            {
                max:    'sdbsdbdsb',
                valid:  false
            }

        // $FlowFixMe
        ].map(({ max, layout, valid }) => ({

            desc: `max ${ max } and layout ${ layout || 'default' }`,

            valid,

            conf: {
                payment:     noop,
                onAuthorize: noop,
                style:       { max, layout }
            }
        }))
    },

    {
        name: 'fundingicons',

        cases: [

            {
                fundingicons: true,
                valid:        true
            },

            {
                fundingicons: false,
                valid:        true
            },

            {
                label:        `checkout`,
                fundingicons: true,
                valid:        true
            },

            {
                label:        `checkout`,
                fundingicons: false,
                valid:        true
            },

            {
                label:        `pay`,
                fundingicons: true,
                valid:        true
            },

            {
                label:        `pay`,
                fundingicons: false,
                valid:        true
            },

            {
                label:        `buynow`,
                fundingicons: true,
                valid:        true
            },

            {
                label:        `buynow`,
                fundingicons: false,
                valid:        true
            },

            {
                label:        `paypal`,
                fundingicons: true,
                valid:        true
            },

            {
                label:        `paypal`,
                fundingicons: false,
                valid:        true
            },

            {
                label:        `credit`,
                fundingicons: true,
                valid:        false
            },

            {
                label:        `credit`,
                fundingicons: false,
                valid:        true
            },

            {
                label:        `venmo`,
                fundingicons: true,
                valid:        true
            },

            {
                label:        `venmo`,
                fundingicons: false,
                valid:        true
            }

        // $FlowFixMe
        ].map(({ label, fundingicons, valid }) => ({

            desc: `fundingicons ${ fundingicons.toString() } with label ${ label || 'default' }`,

            valid,

            conf: {
                payment:     noop,
                onAuthorize: noop,
                style:       { label, fundingicons }
            }
        }))
    },

    {
        name: 'branding',

        cases: [

            {
                branding: true,
                valid:    true
            },

            {
                branding: false,
                valid:    false
            },

            {
                label:    `checkout`,
                branding: true,
                valid:    true
            },

            {
                label:    `checkout`,
                branding: false,
                valid:    false
            },

            {
                label:    `pay`,
                branding: true,
                valid:    true
            },

            {
                label:    `pay`,
                branding: false,
                valid:    false
            },

            {
                label:    `buynow`,
                branding: true,
                valid:    true
            },

            {
                label:    `buynow`,
                branding: false,
                valid:    false
            },

            {
                label:    `paypal`,
                branding: true,
                valid:    true
            },

            {
                label:    `paypal`,
                branding: false,
                valid:    false
            },

            {
                label:    `credit`,
                branding: true,
                valid:    true
            },

            {
                label:    `credit`,
                branding: false,
                valid:    false
            },

            {
                label:    `venmo`,
                branding: true,
                valid:    true
            },

            {
                label:    `venmo`,
                branding: false,
                valid:    false
            }

        // $FlowFixMe
        ].map(({ label, branding, valid }) => ({

            desc: `branding ${ branding.toString() } with label ${ label || 'default' }`,

            valid,

            conf: {
                payment:     noop,
                onAuthorize: noop,
                style:       { label, branding }
            }
        }))
    },

    {
        name: 'tagline',

        cases: [

            {
                tagline: true,
                valid:   false
            },

            {
                tagline: false,
                valid:   true
            }

        ].map(({ tagline, valid }) => ({

            desc: `branding ${ tagline.toString() }`,

            valid,

            conf: {
                payment:     noop,
                onAuthorize: noop,
                style:       { tagline }
            }
        }))
    },

    {
        name: 'locale',

        cases: [

            {
                locale: 'en_US',
                valid:  true
            },

            {
                locale: 'en_GB',
                valid:  true
            },

            {
                locale: 'fr_FR',
                valid:  true
            },

            {
                locale: 'es_ES',
                valid:  true
            },

            {
                locale: 'de_DE',
                valid:  true
            },

            {
                locale: 'zh_C2',
                valid:  true
            },

            {
                locale: 'zh_C2',
                valid:  true
            },

            {
                locale: 'de_GB',
                valid:  false
            },

            {
                locale: 'xx_XX',
                valid:  false
            },

            {
                locale: 'foobarbaz',
                valid:  false
            }

        ].map(({ locale, valid }) => ({

            desc: `locale ${ locale }`,

            valid,

            conf: {
                payment:     noop,
                onAuthorize: noop,
                locale
            }
        }))
    },

    {
        name: 'env',

        cases: [

            {
                env:   'test',
                valid: true
            },

            {
                env:   'moo',
                valid: false
            }

        ].map(({ env, valid }) => ({

            desc: `env ${ env }`,

            valid,

            conf: {
                payment:     noop,
                onAuthorize: noop,
                env
            }
        }))
    },

    {
        name: 'client',

        cases: [

            {
                desc: `client id for env`,

                valid: true,

                conf: {
                    payment:     noop,
                    onAuthorize: noop,

                    env:    'test',
                    client: {
                        test: 'abc123'
                    }
                }
            },

            {
                desc: `client id for multiple envs`,

                valid: true,

                conf: {
                    payment:     noop,
                    onAuthorize: noop,

                    env:    'test',
                    client: {
                        test:    'abc123',
                        sandbox: 'xyz456',
                        stage:   'efwegwerg'
                    }
                }
            },

            {
                desc: `client id for wrong env`,

                valid: false,

                conf: {
                    payment:     noop,
                    onAuthorize: noop,

                    env:    'test',
                    client: {
                        production: 'abc123'
                    }
                }
            },

            {
                desc: `no client ids`,

                valid: false,

                conf: {
                    payment:     noop,
                    onAuthorize: noop,

                    env:    'test',
                    client: {}
                }
            },

            {
                desc: `no client ids and no env`,

                valid: false,

                conf: {
                    payment:     noop,
                    onAuthorize: noop,

                    client: {}
                }
            }
        ]
    },

    {
        name: 'funding',

        cases: [

            {
                desc: `opt-in to venmo`,

                valid: true,

                conf: {
                    payment:     noop,
                    onAuthorize: noop,

                    funding: {
                        allowed: [ window.paypal.FUNDING.VENMO ]
                    }
                }
            },

            {
                desc: `opt-out of venmo`,

                valid: false,

                conf: {
                    payment:     noop,
                    onAuthorize: noop,

                    funding: {
                        disallowed: [ window.paypal.FUNDING.VENMO ]
                    }
                }
            },

            {
                desc: `opt-in to credit`,

                valid: true,

                conf: {
                    payment:     noop,
                    onAuthorize: noop,

                    funding: {
                        allowed: [ window.paypal.FUNDING.CREDIT ]
                    }
                }
            },

            {
                desc: `opt-out of credit`,

                valid: true,

                conf: {
                    payment:     noop,
                    onAuthorize: noop,

                    funding: {
                        disallowed: [ window.paypal.FUNDING.CREDIT ]
                    }
                }
            },

            {
                desc: `opt-in to paypal`,

                valid: false,

                conf: {
                    payment:     noop,
                    onAuthorize: noop,

                    funding: {
                        allowed: [ window.paypal.FUNDING.PAYPAL ]
                    }
                }
            },

            {
                desc: `opt-out of paypal`,

                valid: false,

                conf: {
                    payment:     noop,
                    onAuthorize: noop,

                    funding: {
                        disallowed: [ window.paypal.FUNDING.PAYPAL ]
                    }
                }
            },

            {
                desc: `opt-in to ideal`,

                valid: true,

                conf: {
                    payment:     noop,
                    onAuthorize: noop,

                    funding: {
                        allowed: [ window.paypal.FUNDING.IDEAL ]
                    }
                }
            },

            {
                desc: `opt-out of ideal`,

                valid: true,

                conf: {
                    payment:     noop,
                    onAuthorize: noop,

                    funding: {
                        disallowed: [ window.paypal.FUNDING.IDEAL ]
                    }
                }
            },

            {
                desc: `opt-in to elv`,

                valid: true,

                conf: {
                    payment:     noop,
                    onAuthorize: noop,

                    funding: {
                        allowed: [ window.paypal.FUNDING.ELV ]
                    }
                }
            },

            {
                desc: `opt-out of elv`,

                valid: true,

                conf: {
                    payment:     noop,
                    onAuthorize: noop,

                    funding: {
                        disallowed: [ window.paypal.FUNDING.ELV ]
                    }
                }
            },

            {
                desc: `opt-in to card`,

                valid: true,

                conf: {
                    payment:     noop,
                    onAuthorize: noop,

                    funding: {
                        allowed: [ window.paypal.FUNDING.CARD ]
                    }
                }
            },

            {
                desc: `opt-out of card`,

                valid: true,

                conf: {
                    payment:     noop,
                    onAuthorize: noop,

                    funding: {
                        disallowed: [ window.paypal.FUNDING.CARD ]
                    }
                }
            }
        ]
    }
];

for (let group of buttonConfigs) {
    describe(`paypal button ${ group.name } validation`, () => {

        beforeEach(() => {
            createTestContainer();
        });

        afterEach(() => {
            destroyTestContainer();
        });

        for (let useCase of group.cases) {
            if (useCase.valid) {
                it(`should attempt to render a button with ${ useCase.desc } and succeed`, () => {
                    return window.paypal.Button.render({
                        test: {
                            action: `none`
                        },

                        ...useCase.conf
                    }, `body`);
                });
            } else {
                it(`should attempt to render a button with ${ useCase.desc } and error out`, () => {

                    return window.paypal.Button.render(useCase.conf, `body`).then(() => {
                        throw new Error(`Expected error to be thrown`);
                    }, err => {
                        assert.isOk(err instanceof Error, `Expected error object to be thrown`);
                    });
                });
            }
        }
    });
}
