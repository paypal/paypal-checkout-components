/* @flow */

export type ExpressRequest = express$Request; // eslint-disable-line no-undef
export type ExpressResponse = express$Response; // eslint-disable-line no-undef

export type LoggerType = {|
    +debug : Function,
    +info : Function,
    +warn : Function,
    +error : Function
|};
