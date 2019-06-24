/* @flow */

import { COUNTRY, LANG } from '@paypal/sdk-constants/src';
import type { ZalgoPromise } from 'zalgo-promise/src';

export type ProxyWindow = {|
    close : () => ZalgoPromise<void>
|};

export type LocaleType = {|
    country : $Values<typeof COUNTRY>,
    lang : $Values<typeof LANG>
|};

export type FundingEligibilityType = {|
    bancontact? : {
        eligible : boolean,
        vaultable? : boolean
    },
    card? : {
        eligible : boolean,
        branded? : boolean,
        vaultable? : boolean,
        vendors : {
            visa? : {
                eligible : boolean,
                vaultedInstruments ? : $ReadOnlyArray<{
                    id : string,
                    label : {
                        description : string
                    }
                }>
            },
            mastercard? : {
                eligible : boolean,
                vaultedInstruments ? : $ReadOnlyArray<{
                    id : string,
                    label : {
                        description : string
                    }
                }>
            },
            amex? : {
                eligible : boolean,
                vaultedInstruments ? : $ReadOnlyArray<{
                    id : string,
                    label : {
                        description : string
                    }
                }>
            },
            discover? : {
                eligible : boolean,
                vaultedInstruments ? : $ReadOnlyArray<{
                    id : string,
                    label : {
                        description : string
                    }
                }>
            },
            hiper? : {
                eligible : boolean,
                vaultedInstruments ? : $ReadOnlyArray<{
                    id : string,
                    label : {
                        description : string
                    }
                }>
            },
            elo? : {
                eligible : boolean,
                vaultedInstruments ? : $ReadOnlyArray<{
                    id : string,
                    label : {
                        description : string
                    }
                }>
            },
            jcb? : {
                eligible : boolean,
                vaultedInstruments ? : $ReadOnlyArray<{
                    id : string,
                    label : {
                        description : string
                    }
                }>
            },
            cup? : {
                eligible : boolean,
                vaultedInstruments ? : $ReadOnlyArray<{
                    id : string,
                    label : {
                        description : string
                    }
                }>
            }
        }
    },
    credit? : {
        eligible : boolean,
        vaultable? : boolean
    },
    sepa? : {
        eligible : boolean,
        vaultable? : boolean
    },
    eps? : {
        eligible : boolean,
        vaultable? : boolean
    },
    giropay? : {
        eligible : boolean,
        vaultable? : boolean
    },
    ideal? : {
        eligible : boolean,
        vaultable? : boolean
    },
    mybank? : {
        eligible : boolean,
        vaultable? : boolean
    },
    p24? : {
        eligible : boolean,
        vaultable? : boolean
    },
    paypal? : {
        eligible : boolean,
        vaultable? : boolean,
        vaultedInstruments? : $ReadOnlyArray<{
            id : string,
            label : {
                description : string
            }
        }>
    },
    sofort? : {
        eligible : boolean,
        vaultable? : boolean
    },
    venmo? : {
        eligible : boolean,
        vaultable? : boolean
    },
    wechatpay? : {
        eligible : boolean,
        vaultable? : boolean
    },
    zimpler? : {
        eligible : boolean,
        vaultable? : boolean
    },
    itau? : {
        eligible : boolean,
        vaultable? : boolean
    }
|};
