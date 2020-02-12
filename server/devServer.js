/* @flow */

import { randomBytes } from 'crypto';

import express from 'express';

import type { ExpressRequest, ExpressResponse } from './types';
import { getButtonMiddleware, getMenuMiddleware, getWalletMiddleware } from './components';

const app = express();
const PORT = process.env.PORT || 8003;

const buttonMiddleware = getButtonMiddleware({
    graphQL: (req, payload) => {
        // $FlowFixMe
        return Promise.resolve(payload.map(({ query }) => {
            if (query.match(/query GetFundingEligibility/)) {
                return {
                    fundingEligibility: {
                        paypal: {
                            eligible: true
                        }
                    }
                };
            }

            if (query.match(/query GetPersonalization/)) {
                return {
                    checkoutCustomization: {
                        tagline: {
                            text:     'Get $5 off your order!',
                            tracking: {
                                impression: 'http://www.paypal.com/tracking?foo=bar',
                                click:      'http://www.paypal.com/tracking?foo=bar'
                            }
                        },
                        buttonText: {
                            text:     'PAY! {logo:pp} {logo:paypal} {logo:pp}',
                            tracking: {
                                impression: 'http://www.paypal.com/tracking?foo=bar',
                                click:      'http://www.paypal.com/tracking?foo=bar'
                            }
                        }
                    }
                };
            }

            if (query.match(/query NativeEligibility/)) {
                return {
                    mobileSDKEligibility: {
                        eligible: true
                    }
                };
            }

            return {
                data: {}
            };
        }));
    },
    getAccessToken: () => {
        return Promise.resolve('XYZ12345');
    },
    getMerchantID: () => {
        return Promise.resolve('XYZ12345');
    },
    content: {
        US: {
            en: {
                instantlyPayWith:     'Pay instantly with',
                poweredBy:            'Powered by PayPal',
                chooseCardOrShipping: 'Choose card or shipping',
                useDifferentAccount:  'Use different account',
                deleteVaultedAccount: 'Forget this account',
                deleteVaultedCard:    'Forget this card'
            }
        }
    }
});
const walletMiddleware = getWalletMiddleware({
    graphQL: (req, payload) => {
        // $FlowFixMe
        return Promise.resolve(payload.map(({ query }) => {
            if (query.match(/query CreateCheckoutSession/)) {
                return {
                    result: {
                        checkoutSession: {
                            declinedInstruments: [],
                            fundingOptions:      [
                                {
                                    'id':                'CC-ABC12345',
                                    'fundingInstrument': {
                                        'id':                       'CC-ABC12345',
                                        'name':                     'VISA',
                                        'issuerProductDescription': 'The Bank Card Platinum Rewards',
                                        'type':                     'CREDIT_CARD',
                                        'instrumentSubType':        'CREDIT',
                                        'lastDigits':               '1234',
                                        'image':                    {
                                            'url': {
                                                'href': ''
                                            },
                                            'width':  '96',
                                            'height': '96'
                                        },
                                        'isPreferred': false
                                    }
                                },
                                {
                                    'id':                'CC-ABC56789',
                                    'fundingInstrument': {
                                        'id':                       'CC-ABC56789',
                                        'name':                     'AMEX',
                                        'issuerProductDescription': 'The Amex Rewards Card',
                                        'type':                     'CREDIT_CARD',
                                        'instrumentSubType':        'CREDIT',
                                        'lastDigits':               '8654',
                                        'image':                    {
                                            'url': {
                                                'href': ''
                                            },
                                            'width':  '96',
                                            'height': '96'
                                        },
                                        'isPreferred': false
                                    }
                                }
                            ]
                        }
                    }
                };
            }
            return {
                data: {}
            };
        }));
    }
});

const menuMiddleware = getMenuMiddleware({});


app.get('/smart/buttons', (req : ExpressRequest, res : ExpressResponse) => {
    const nonce = randomBytes(16).toString('base64').replace(/[^a-zA-Z0-9_]/g, '');

    res.locals = res.locals || {};
    res.locals.nonce = nonce;

    res.header('content-security-policy', `style-src self 'nonce-${ nonce }'; script-src self 'nonce-${ nonce }';`);
    
    return buttonMiddleware(req, res);
});

app.get('/smart/menu', (req : ExpressRequest, res : ExpressResponse) => {
    const nonce = randomBytes(16).toString('base64').replace(/[^a-zA-Z0-9_]/g, '');

    res.locals = res.locals || {};
    res.locals.nonce = nonce;

    res.header('content-security-policy', `style-src self 'nonce-${ nonce }'; script-src self 'nonce-${ nonce }';`);

    return menuMiddleware(req, res);
});

app.get('/smart/wallet', (req : ExpressRequest, res : ExpressResponse) => {
    const nonce = randomBytes(16).toString('base64').replace(/[^a-zA-Z0-9_]/g, '');
    
    res.locals = res.locals || {};
    res.locals.nonce = nonce;
    
    res.header('content-security-policy', `style-src self 'nonce-${ nonce }'; script-src self 'nonce-${ nonce }';`);
    
    return walletMiddleware(req, res);
});

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`
        Smart Button server listening
          - http://localhost.paypal.com:${ PORT }/smart/buttons?clientID=alc_client1
          - http://localhost.paypal.com:${ PORT }/smart/menu?clientID=alc_client1
          - http://localhost.paypal.com:${ PORT }/smart/wallet?clientID=alc_client1&orderID=ORDER123&accessToken=access1234&style.height=40
    
    `);
});
