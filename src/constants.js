/* @flow */

export const SMART_BUTTONS = 'smart_buttons';

export const ACCESS_TOKEN_HEADER = 'x-paypal-internal-euat';

export const HEADERS = {
    CSRF_TOKEN: 'x-csrf-jwt',
    SOURCE:     'x-source'
};

export const ORDER_API_ERROR = {
    CC_PROCESSOR_DECLINED: 'CC_PROCESSOR_DECLINED',
    INSTRUMENT_DECLINED:   'INSTRUMENT_DECLINED'
};
