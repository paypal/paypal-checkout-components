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
        eligible : boolean
    },
    card? : {
        eligible : boolean,
        branded? : boolean,
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
        eligible : boolean
    },
    sepa? : {
        eligible : boolean
    },
    eps? : {
        eligible : boolean
    },
    giropay? : {
        eligible : boolean
    },
    ideal? : {
        eligible : boolean
    },
    mybank? : {
        eligible : boolean
    },
    p24? : {
        eligible : boolean
    },
    paypal? : {
        eligible : boolean,
        vaultedInstruments? : $ReadOnlyArray<{
            id : string,
            label : {
                description : string
            }
        }>
    },
    sofort? : {
        eligible : boolean
    },
    venmo? : {
        eligible : boolean
    },
    wechatpay? : {
        eligible : boolean
    },
    zimpler? : {
        eligible : boolean
    }
|};
