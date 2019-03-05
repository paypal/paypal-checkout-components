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

export const CONTEXT = {
    IFRAME: 'iframe',
    POPUP:  'popup'
};

export const TARGET_ELEMENT = {
    BODY: 'body'
};

export const ORDER_ID_PATTERN = /^(EC-)?[A-Z0-9]+$/;

export const ERROR_URL = 'https://www.paypal.com/checkoutnow/error';

export const CLIENT_CONFIG = {
    INTEGRATION_ARTIFACT: 'JS_SDK',
    PRODUCT_FLOW:         'SMART_PAYMENT_BUTTONS',
    USER_EXPERIENCE_FLOW: 'INCONTEXT',
    ENTRY_POINT:          'PAY_WITH'
};
