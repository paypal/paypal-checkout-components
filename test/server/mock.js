/* @flow */
/* eslint no-restricted-globals: off, promise/no-native: off, compat/compat: off */

import type { ExpressRequest, InstanceLocationInformation, SDKLocationInformation } from '../../server/types';

type MockReq = {|
    query : { [string] : string }
|};

export function mockReq(opts : Object = {}) : MockReq {
    return {
        url:     '/',
        query:   {},
        headers: {
            'user-agent': 'xyz'
        },
        get:   () => undefined,
        ...opts
    };
}

type MockRes = {|
    _status : number,
    _headers : { [string] : string },
    _body? : string,

    status : (number) => MockRes,
    header : (string, string) => MockRes,
    send : (string) => MockRes,

    getStatus : () => number,
    removeHeader : (string) => void,
    getHeader : (string) => ?string,
    getBody : () => ?string
|};

export function mockRes(opts : Object = {}) : MockRes {
    const res = {
        _status:  200,
        _headers: {},

        status(status : number) : MockRes {
            res._status = status;
            return res;
        },
        header(key : string, value : string) : MockRes {
            res._headers[key] = value;
            return res;
        },
        send(str : string) : MockRes {
            res.body = str;
            return res;
        },
        getStatus() : number {
            return res._status;
        },
        getHeader(name : string) : ?string {
            return res._headers[name];
        },
        removeHeader(name : string) {
            delete res._headers[name];
        },
        getBody() : ?string {
            return res.body;
        },
        ...opts
    };

    return res;
}

export async function getWallet() : Promise<Object> {
    return await {
        'payer': {
            'email_address': 'foo@bar.com'
        },
        'funding_options': [
            {
                'funding_sources': [
                    {
                        'credit':             {
                            'id':   'BC-YMBX4GJLEKMQW'
                        }
                    }
                ],
                'one_click_eligibility': {
                    eligible: false
                }
            }
        ]
    };
}

export async function graphQL(req : ExpressRequest, payload : $ReadOnlyArray<{| query : string, variables : Object |}>) : Promise<Object> {
    return await Promise.resolve(payload.map(request => {
        if (request.query.match(/checkoutCustomization/)) {
            if (req.query.simulatePersonalizationError) {
                return { error: 'Internal Error' };
            }
            return {
                result: {
                    checkoutCustomization: {
                        buttonText: {
                            text: 'foobar'
                        },
                        tagline: {
                            text: 'foobar'
                        }
                    }
                }
            };
        }
        if (request.query.match(/FundingEligibility/)) {
            return {
                fundingEligibility: {
                    bancontact: {
                        eligible: false
                    },
                    card: {
                        eligible: true,
                        branded:  true,

                        vendors: {
                            visa: {
                                eligible: true
                            },
                            mastercard: {
                                eligible: true
                            },
                            amex: {
                                eligible: true
                            },
                            discover: {
                                eligible: true
                            },
                            hiper: {
                                eligible: false
                            },
                            elo: {
                                eligible: false
                            },
                            jcb: {
                                eligible: false
                            }
                        }
                    },
                    credit: {
                        eligible: false
                    },
                    paylater: {
                        eligible: false
                    },
                    sepa: {
                        eligible: false
                    },
                    eps: {
                        eligible: false
                    },
                    giropay: {
                        eligible: false
                    },
                    ideal: {
                        eligible: false
                    },
                    mybank: {
                        eligible: false
                    },
                    p24: {
                        eligible: false
                    },
                    paypal: {
                        eligible: true
                    },
                    sofort: {
                        eligible: false
                    },
                    venmo: {
                        eligible: false
                    },
                    wechatpay: {
                        eligible: false
                    },
                    zimpler: {
                        eligible: false
                    },
                    payu: {
                        eligible: false
                    },
                    blik: {
                        eligible: false
                    },
                    trustly: {
                        eligible: false
                    },
                    oxxo: {
                        eligible: false
                    },
                    maxima: {
                        eligible: false
                    },
                    boleto: {
                        eligible: false
                    },
                    mercadopago: {
                        eligible: false
                    }
                }
            };
        }

        if (request.query.match(/NativeEligibility/)) {
            return {
                mobileSDKEligibility: {
                    eligible: true
                }
            };
        }

        throw new Error(`Unmatched query: ${ request.query }`);
    }));
}

export function getAccessToken() : Promise<string> {
    return Promise.resolve('ABCDEF12345');
}

export function getMerchantID() : Promise<string> {
    return Promise.resolve('ABCDEF12345');
}

export function transportRiskData() : Promise<void> {
    return Promise.resolve();
}

export function getPersonalizationEnabled() : boolean {
    return true;
}

export function getInstanceLocationInformation() : InstanceLocationInformation {
    return {
        cdnHostName:  'paypal.com',
        paypalDomain: 'paypal.com'
    };
}

export function getSDKLocationInformation() : Promise<SDKLocationInformation> {
    return Promise.resolve({
        sdkActiveTag:   'abc',
        sdkCDNRegistry: 'paypal.com'
    });
}

export const mockContent = {
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

/* eslint-disable-next-line no-empty-function */
export const tracking = () => {};
