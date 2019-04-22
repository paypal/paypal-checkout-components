/* @flow */

export const SMART_BUTTONS = 'smart_buttons';
export const SMART_PAYMENT_BUTTONS = 'smart-payment-buttons';

export const ACCESS_TOKEN_HEADER = 'x-paypal-internal-euat';

export const HEADERS = {
    ACCESS_TOKEN: 'x-paypal-internal-euat',
    CSRF_TOKEN:   'x-csrf-jwt',
    SOURCE:       'x-source',
    REQUESTED_BY: 'x-requested-by'
};

export const ORDER_API_ERROR = {
    INSTRUMENT_DECLINED:   'INSTRUMENT_DECLINED'
};

export const CONTEXT = {
    IFRAME: 'iframe',
    POPUP:  'popup'
};

export const TARGET_ELEMENT = {
    BODY: 'body'
};

export const ERROR_URL = 'https://www.paypal.com/checkoutnow/error';

export const ORDER_ID_PATTERN = /^(EC-)?[A-Z0-9]+$/;

export const INTEGRATION_ARTIFACT = {
    PAYPAL_JS_SDK: 'PAYPAL_JS_SDK'
};

export const USER_EXPERIENCE_FLOW = {
    INCONTEXT: 'INCONTEXT',
    INLINE:    'INLINE'
};

export const PRODUCT_FLOW = {
    SMART_PAYMENT_BUTTONS: 'SMART_PAYMENT_BUTTONS'
};
