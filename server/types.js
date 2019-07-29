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

export type LocaleType = {|
    country : $Values<typeof COUNTRY>,
    lang : $Values<typeof LANG>
|};

export type ClientIDToMerchantID = (ExpressRequest, string) => Promise<string>;
