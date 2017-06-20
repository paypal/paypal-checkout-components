/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';
import { assert } from 'chai';

import { generateECToken, createTestContainer, destroyTestContainer, getElement } from '../common';

let validButtonConfigs = [

    {
        desc: 'both payment and onAuthorize',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ }
        }
    },

    {
        desc: 'commit true',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            commit: true
        }
    },

    {
        desc: 'shape rect',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                shape: 'rect'
            }
        }
    },

    {
        desc: 'shape pill',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                shape: 'pill'
            }
        }
    },

    {
        desc: 'checkout en_US',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            locale: 'en_US',
            style: {
                label: 'checkout'
            }
        }
    },

    {
        desc: 'checkout en_GB',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            locale: 'en_GB',
            style: {
                label: 'checkout'
            }
        }
    },

    {
        desc: 'checkout fr_FR',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            locale: 'fr_FR',
            style: {
                label: 'checkout'
            }
        }
    },

    {
        desc: 'checkout de_DE',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            locale: 'de_DE',
            style: {
                label: 'checkout'
            }
        }
    },

    {
        desc: 'checkout es_ES',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            locale: 'es_ES',
            style: {
                label: 'checkout'
            }
        }
    },

    {
        desc: 'checkout zh_C2',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            locale: 'zh_C2',
            style: {
                label: 'checkout'
            }
        }
    },

    {
        desc: 'credit en_US',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            locale: 'en_US',
            style: {
                label: 'credit'
            }
        }
    },

    {
        desc: 'credit en_GB',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            locale: 'en_GB',
            style: {
                label: 'credit'
            }
        }
    },

    {
        desc: 'credit fr_FR',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            locale: 'fr_FR',
            style: {
                label: 'credit'
            }
        }
    },

    {
        desc: 'credit de_DE',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            locale: 'de_DE',
            style: {
                label: 'credit'
            }
        }
    },

    {
        desc: 'credit es_ES',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            locale: 'es_ES',
            style: {
                label: 'credit'
            }
        }
    },

    {
        desc: 'credit zh_C2',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            locale: 'zh_C2',
            style: {
                label: 'credit'
            }
        }
    },

    {
        desc: 'buynow en_US',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            locale: 'en_US',
            style: {
                label: 'buynow'
            }
        }
    },

    {
        desc: 'buynow en_GB',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            locale: 'en_GB',
            style: {
                label: 'buynow'
            }
        }
    },

    {
        desc: 'buynow fr_FR',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            locale: 'fr_FR',
            style: {
                label: 'buynow'
            }
        }
    },

    {
        desc: 'buynow de_DE',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            locale: 'de_DE',
            style: {
                label: 'buynow'
            }
        }
    },

    {
        desc: 'buynow es_ES',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            locale: 'es_ES',
            style: {
                label: 'buynow'
            }
        }
    },

    {
        desc: 'buynow zh_C2',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            locale: 'zh_C2',
            style: {
                label: 'buynow'
            }
        }
    },

    {
        desc: 'pay en_US',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            locale: 'en_US',
            style: {
                label: 'pay'
            }
        }
    },

    {
        desc: 'pay en_GB',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            locale: 'en_GB',
            style: {
                label: 'pay'
            }
        }
    },

    {
        desc: 'pay fr_FR',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            locale: 'fr_FR',
            style: {
                label: 'pay'
            }
        }
    },

    {
        desc: 'pay de_DE',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            locale: 'de_DE',
            style: {
                label: 'pay'
            }
        }
    },

    {
        desc: 'pay es_ES',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            locale: 'es_ES',
            style: {
                label: 'pay'
            }
        }
    },

    {
        desc: 'pay zh_C2',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            locale: 'zh_C2',
            style: {
                label: 'pay'
            }
        }
    },

    {
        desc: 'checkout tiny',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'checkout',
                size: 'tiny'
            }
        }
    },

    {
        desc: 'checkout small',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'checkout',
                size: 'small'
            }
        }
    },

    {
        desc: 'checkout medium',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'checkout',
                size: 'medium'
            }
        }
    },

    {
        desc: 'checkout large',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'checkout',
                size: 'large'
            }
        }
    },

    {
        desc: 'checkout responsive',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'checkout',
                size: 'responsive'
            }
        }
    },

    {
        desc: 'credit small',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'checkout',
                size: 'small'
            }
        }
    },

    {
        desc: 'credit medium',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'checkout',
                size: 'medium'
            }
        }
    },

    {
        desc: 'credit large',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'checkout',
                size: 'large'
            }
        }
    },

    {
        desc: 'credit responsive',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'credit',
                size: 'responsive'
            }
        }
    },

    {
        desc: 'checkout label',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'checkout'
            }
        }
    },

    {
        desc: 'credit label',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'credit'
            }
        }
    },

    {
        desc: 'pay label',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'pay'
            }
        }
    },

    {
        desc: 'buynow label',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'buynow'
            }
        }
    },

    {
        desc: 'checkout label blue',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'checkout',
                color: 'blue'
            }
        }
    },

    {
        desc: 'checkout label gold',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'checkout',
                color: 'gold'
            }
        }
    },

    {
        desc: 'checkout label silver',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'checkout',
                color: 'silver'
            }
        }
    },

    {
        desc: 'pay label blue',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'pay',
                color: 'blue'
            }
        }
    },

    {
        desc: 'pay label gold',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'pay',
                color: 'gold'
            }
        }
    },

    {
        desc: 'pay label silver',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'pay',
                color: 'silver'
            }
        }
    },

    {
        desc: 'buynow label blue',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'buynow',
                color: 'blue'
            }
        }
    },

    {
        desc: 'buynow label gold',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'buynow',
                color: 'gold'
            }
        }
    },

    {
        desc: 'buynow label silver',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'buynow',
                color: 'silver'
            }
        }
    },

    {
        desc: 'credit label creditblue',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'credit',
                color: 'creditblue'
            }
        }
    },

    {
        desc: 'checkout label with fundingicons',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'checkout',
                fundingicons: true
            }
        }
    },

    {
        desc: 'pay label with fundingicons',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'pay',
                fundingicons: true
            }
        }
    },


    {
        desc: 'buynow label with fundingicons',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'buynow',
                fundingicons: true
            }
        }
    },

    {
        desc: 'buynow label without fundingicons',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'buynow',
                fundingicons: false
            }
        }
    },

    {
        desc: 'buynow label with branding',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'buynow',
                branding: true
            }
        }
    },

    {
        desc: 'buynow label without branding',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'buynow'
            }
        }
    }
];

let invalidButtonConfigs = [

    {
        desc: 'invalid env',

        conf: {
            env: 'moo',
            payment() { /* pass */ },
            onAuthorize() { /* pass */ }
        }
    },

    {
        desc: 'no onAuthorize',

        conf: {
            payment() { /* pass */ }
        }
    },

    {
        desc: 'no payment',

        conf: {
            onAuthorize() { /* pass */ }
        }
    },

    {
        desc: 'invalid size',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                size: 'moo'
            }
        }
    },

    {
        desc: 'no client ids',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            client: {}
        }
    },

    {
        desc: 'invalid client id',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            client: {
                test: 'xxxxxxxxxx'
            }
        }
    },

    {
        desc: 'invalid label',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'moo'
            }
        }
    },

    {
        desc: 'invalid shape',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                shape: 'moo'
            }
        }
    },

    {
        desc: 'credit tiny style',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'credit',
                size: 'tiny'
            }
        }
    },

    {
        desc: 'pay tiny style',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'pay',
                size: 'tiny'
            }
        }
    },

    {
        desc: 'buynow tiny style',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'buynow',
                size: 'tiny'
            }
        }
    },

    {
        desc: 'credit gold style',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'credit',
                color: 'gold'
            }
        }
    },

    {
        desc: 'invalid locale',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            locale: 'xx_YY'
        }
    },

    {
        desc: 'invalid locale format',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            locale: 'xx-YY'
        }
    },

    {
        desc: 'checkout unbranded',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'checkout',
                branding: null
            }
        }
    },

    {
        desc: 'checkout branding false',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'checkout',
                branding: false
            }
        }
    },

    {
        desc: 'buynow branding false',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'checkout',
                branding: false
            }
        }
    },

    {
        desc: 'credit with fundingicons',

        conf: {
            payment() { /* pass */ },
            onAuthorize() { /* pass */ },
            style: {
                label: 'credit',
                fundingicons: true
            }
        }
    }
];

describe(`paypal button component validation`, () => {

    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
    });

    for (let invalidConfig of invalidButtonConfigs) {
        it(`should attempt to render a button with ${invalidConfig.desc} and error out`, () => {

            return window.paypal.Button.render(invalidConfig.conf, 'body').then(() => {
                throw new Error('Expected error to be thrown');
            }, err => {
                assert.isOk(err instanceof Error, 'Expected error object to be thrown');
            });
        });
    }

    for (let validConfig of validButtonConfigs) {
        it(`should attempt to render a button with ${validConfig.desc} and succeed`, () => {
            return window.paypal.Button.render({
                test: {
                    action: 'none'
                },

                ...validConfig.conf
            }, 'body');
        });
    }

    it('should render a button into a container, then disable the button, then click on the button, then complete the payment', (done) => {

        let input = document.createElement('input');
        input.type = 'checkbox';

        getElement('#testContainer').appendChild(input);

        let clicks = 0;

        window.paypal.Button.render({

            test: {
                onRender(actions) {
                    actions.click();

                    input.addEventListener('change', () => {
                        setTimeout(() => {
                            actions.click();
                        }, 200);
                    });
                }
            },

            payment() : string | ZalgoPromise<string> {
                return generateECToken();
            },

            validate(actions) {
                actions.disable();

                input.addEventListener('change', () => {
                    if (input.checked) {
                        actions.enable();
                    } else {
                        actions.disable();
                    }
                });
            },

            onClick() {
                clicks += 1;

                if (clicks === 1) {

                    if (input.checked) {
                        throw new Error('Expected checkbox to be unchecked');
                    }

                    input.click();

                } else if (clicks === 2) {

                    if (!input.checked) {
                        throw new Error('Expected checkbox to be checked');
                    }
                }
            },

            onAuthorize() : void {

                if (clicks !== 2) {
                    throw new Error('Expected onClick to have been called twice');
                }

                return done();
            },

            onCancel() : void {
                return done(new Error('Expected onCancel to not be called'));
            }

        }, '#testContainer');
    });
});
