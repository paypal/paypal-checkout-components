/* @flow */

import { COUNTRY, LANG } from '@paypal/sdk-constants';


export type ExpressRequest = express$Request; // eslint-disable-line no-undef
export type ExpressResponse = express$Response; // eslint-disable-line no-undef

export type LoggerType = {|
    +debug : Function,
    +info : Function,
    +warn : Function,
    +error : Function
|};

type VaultedInstrument = {|

|};

type VaultedInstruments = $ReadOnlyArray<VaultedInstrument>;

export type FundingEligibility = {|
    paypal : {
        eligible : boolean,
        vaultedInstruments ? : VaultedInstruments
    },
    venmo? : {
        eligible : boolean,
        vaultedInstruments ? : VaultedInstruments
    },
    itau? : {
        eligible : boolean,
        vaultedInstruments ? : VaultedInstruments
    },
    card : {
        vendors : {
            visa : {
                vaultedInstruments ? : VaultedInstruments
            },
            mastercard : {
                vaultedInstruments ? : VaultedInstruments
            },
            amex : {
                vaultedInstruments ? : VaultedInstruments
            },
            discover? : {
                vaultedInstruments ? : VaultedInstruments
            }
        }
    }
|};

export type LocaleType = {|
    country : $Values<typeof COUNTRY>,
    lang : $Values<typeof LANG>
|};
