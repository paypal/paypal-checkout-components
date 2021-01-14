/* @flow */

import { randomBytes } from 'crypto';

import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import { noop } from 'belter';
import { FUNDING } from '@paypal/sdk-constants';

import { WEBPACK_CONFIG_BUTTONS_LOCAL_DEBUG } from '../webpack.config';
import { getButtonMiddleware, getMenuMiddleware, getNativePopupMiddleware, getNativeFallbackMiddleware } from '../index';

import type { GraphQL } from './lib/graphql';
import type { ExpressRequest, ExpressResponse } from './types';

const app = express();
const PORT = process.env.PORT || 8003;

const cache = {
    // eslint-disable-next-line no-unused-vars
    get: (key) => Promise.resolve(),
    set: (key, value) => Promise.resolve(value)
};

const logger = {
    debug: noop,
    info:  noop,
    warn:  noop,
    error: noop
};

const graphQL : GraphQL = (req, payload) => {
    return Promise.resolve(payload.map(({ query }) => {
        if (query.match(/query GetFundingEligibility/)) {
            return {
                result: {
                    fundingEligibility: {
                        paypal: {
                            eligible: true
                        }
                    }
                }
            };
        }

        if (query.match(/query GetPersonalization/)) {
            return {
                result: {
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
                }
            };
        }

        if (query.match(/query NativeEligibility/)) {
            return {
                result: {
                    mobileSDKEligibility: {
                        eligible: true
                    }
                }
            };
        }

        if (query.match(/query CreateCheckoutSession/)) {
            return {
                result: {
                    checkoutSession: {
                        declinedInstruments: [],
                        fundingOptions:      [
                            {
                                'id':                'BA-XH7B6GNDFFJV2',
                                'fundingInstrument': {
                                    'id':                       'BA-XH7B6GNDFFJV2',
                                    'name':                     'WELLS FARGO BANK NA',
                                    'issuerProductDescription': null,
                                    'type':                     'BANK_ACCOUNT',
                                    'instrumentSubType':        'CHECKING',
                                    'lastDigits':               '9673',
                                    'image':                    null,
                                    'institutionImages':        [],
                                    'isPreferred':              true,
                                    'attribution':              null,
                                    'rewards':                  null,
                                    '__typename':               'FundingInstrument',
                                    'creditFIAdditionalData':   null,
                                    'payerDisclaimer':          null
                                }
                            }, {
                                'id':                'BC-5932XGYM5Y3QC',
                                'fundingInstrument': {
                                    'id':                       'BC-5932XGYM5Y3QC',
                                    'name':                     'BILL_ME_LATER',
                                    'issuerProductDescription': null,
                                    'type':                     'PAYPAL_CREDIT',
                                    'instrumentSubType':        'PAYPAL',
                                    'lastDigits':               null,
                                    'image':                    null,
                                    'institutionImages':        [],
                                    'isPreferred':              false,
                                    'attribution':              null,
                                    'rewards':                  null,
                                    '__typename':               'FundingInstrument',
                                    'creditFIAdditionalData':   null,
                                    'payerDisclaimer':          null
                                }
                            }, {
                                'id':                'CC-J327ZUEUDE8QL',
                                'fundingInstrument': {
                                    'id':                       'CC-J327ZUEUDE8QL',
                                    'name':                     'VISA',
                                    'issuerProductDescription': 'Wells Fargo Bank',
                                    'type':                     'CREDIT_CARD',
                                    'instrumentSubType':        'DEBIT',
                                    'lastDigits':               '8558',
                                    'image':                    {
                                        'url': {
                                            'href':       'https://pics.paypal.com//00/s/OTY5WDE1MzZYUE5H/p/ZTkxNjMyNjAtOTZiYy00YzllLTlmMDQtNDM5MmVkYjJkYjFk/image_0.png',
                                            '__typename': 'GenericURL'
                                        },
                                        'width':      '96',
                                        'height':     '96',
                                        '__typename': 'CardImage'
                                    },
                                    'institutionImages':      [],
                                    'isPreferred':            false,
                                    'attribution':            null,
                                    'rewards':                null,
                                    '__typename':             'FundingInstrument',
                                    'creditFIAdditionalData': null,
                                    'payerDisclaimer':        null
                                }
                            }, {
                                'id':                'CC-WXS325L2PS75E',
                                'fundingInstrument': {
                                    'id':                       'CC-WXS325L2PS75E',
                                    'name':                     'VISA',
                                    'issuerProductDescription': 'Wells Fargo Platinum Visa Credit Card',
                                    'type':                     'CREDIT_CARD',
                                    'instrumentSubType':        'CREDIT',
                                    'lastDigits':               '5335',
                                    'image':                    {
                                        'url': {
                                            'href':       'https://pics.paypal.com//00/s/OTY5WDE1MzhYUE5H/p/Y2IwMTk0Y2YtOTY4OS00ZWMwLWI1NjgtZmI5MDQzOWUyMmZk/image_0.png',
                                            '__typename': 'GenericURL'
                                        },
                                        'width':      '96',
                                        'height':     '96',
                                        '__typename': 'CardImage'
                                    },
                                    'institutionImages':      [],
                                    'isPreferred':            false,
                                    'attribution':            null,
                                    'rewards':                null,
                                    '__typename':             'FundingInstrument',
                                    'creditFIAdditionalData': null,
                                    'payerDisclaimer':        null
                                }
                            }, {
                                'id':                'CC-ATXCFBG3VN2GQ',
                                'fundingInstrument': {
                                    'id':                       'CC-ATXCFBG3VN2GQ',
                                    'name':                     'VISA',
                                    'issuerProductDescription': 'Barclaycard with Apple Rewards',
                                    'type':                     'CREDIT_CARD',
                                    'instrumentSubType':        'CREDIT',
                                    'lastDigits':               '3817',
                                    'image':                    {
                                        'url': {
                                            'href':       'https://pics.paypal.com//00/s/OTY5WDE1MzZYUE5H/p/MjA5YzU0OTUtM2JjNi00OGE5LTg3ZjgtMWM0MzA0YjM1NWJk/image_0.png',
                                            '__typename': 'GenericURL'
                                        },
                                        'width':      '96',
                                        'height':     '96',
                                        '__typename': 'CardImage'
                                    },
                                    'institutionImages':      [],
                                    'isPreferred':            false,
                                    'attribution':            null,
                                    'rewards':                null,
                                    '__typename':             'FundingInstrument',
                                    'creditFIAdditionalData': null,
                                    'payerDisclaimer':        null
                                }
                            }
                        ]
                    }
                }
            };
        }

        return {
            result: {}
        };
    }));
};

/* eslint-disable-next-line no-empty-function */
const tracking = () => {};

const getAccessToken = () => {
    return Promise.resolve('XYZ12345');
};

const getMerchantID = () => {
    return Promise.resolve('XYZ12345');
};

const content = {
    US: {
        en: {
            instantlyPayWith:        'Pay instantly with',
            poweredBy:               'Powered by PayPal',
            chooseCardOrShipping:    'Choose card or shipping',
            useDifferentAccount:     'Use different account',
            deleteVaultedAccount:    'Forget this account',
            deleteVaultedCard:       'Forget this card',
            chooseCard:              'Choose card',
            balance:                 'Balance',
            payWithDifferentAccount: 'Pay with a different account',
            payWithDifferentMethod:  'Pay with a different funding method'
        }
    }
};

const defaultMiddleware = (req : ExpressRequest, res : ExpressResponse, next) => {
    const nonce = randomBytes(16).toString('base64').replace(/[^a-zA-Z0-9_]/g, '');

    res.locals = res.locals || {};
    res.locals.nonce = nonce;

    res.header('content-security-policy', `style-src self 'nonce-${ nonce }'; script-src self 'nonce-${ nonce }';`);
    
    next();
};

const buttonMiddleware = getButtonMiddleware({
    cache,
    logger,
    graphQL,
    getAccessToken,
    getMerchantID,
    content,
    tracking
});

const menuMiddleware = getMenuMiddleware({
    cache,
    logger
});

const nativePopupMiddleware = getNativePopupMiddleware({
    cache,
    logger,
    graphQL,
    tracking,
    fundingSource: FUNDING.PAYPAL
});

const nativeFallbackMiddleware = getNativeFallbackMiddleware({
    cache,
    logger,
    graphQL,
    tracking,
    fundingSource: FUNDING.PAYPAL
});

const venmoPopupMiddleware = getNativePopupMiddleware({
    cache,
    logger,
    graphQL,
    tracking,
    fundingSource: FUNDING.VENMO
});

const venmoFallbackMiddleware = getNativeFallbackMiddleware({
    cache,
    logger,
    graphQL,
    tracking,
    fundingSource: FUNDING.VENMO
});

const buttonsScriptMiddleware = webpackDevMiddleware(webpack(WEBPACK_CONFIG_BUTTONS_LOCAL_DEBUG), { serverSideRender: true });

app.use('/smart/buttons', defaultMiddleware, buttonsScriptMiddleware, buttonMiddleware);
app.use('/smart/menu', defaultMiddleware, menuMiddleware);
app.use('/smart/checkout/native/popup', defaultMiddleware, nativePopupMiddleware);
app.use('/smart/checkout/venmo/popup', defaultMiddleware, venmoPopupMiddleware);
app.use('/smart/checkout/native/fallback', defaultMiddleware, nativeFallbackMiddleware);
app.use('/smart/checkout/venmo/fallback', defaultMiddleware, venmoFallbackMiddleware);
app.use('/smart/checkout/native', defaultMiddleware, nativeFallbackMiddleware);
app.use('/smart/checkout/venmo', defaultMiddleware, venmoFallbackMiddleware);

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`
        Smart Button server listening
          - http://localhost.paypal.com:${ PORT }/smart/buttons?clientID=alc_client1
          - http://localhost.paypal.com:${ PORT }/smart/menu?clientID=alc_client1
    `);
});
