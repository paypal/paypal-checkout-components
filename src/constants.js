/* @flow */

export const SMART_PAYMENT_BUTTONS = 'smart-payment-buttons';

export const BUYER_INTENT = {
    PAY:                                 'pay',
    PAY_WITH_DIFFERENT_ACCOUNT:          'pay_with_different_account',
    PAY_WITH_DIFFERENT_FUNDING_SHIPPING: 'pay_with_different_funding_shipping'
};

export const HEADERS = {
    AUTHORIZATION: 'authorization',
    CONTENT_TYPE:  'content-type',

    ACCESS_TOKEN:   'x-paypal-internal-euat',
    CSRF_TOKEN:     'x-csrf-jwt',
    SOURCE:         'x-source',
    REQUESTED_BY:   'x-requested-by',
    CLIENT_CONTEXT: 'paypal-client-context',

    PARTNER_ATTRIBUTION_ID: 'paypal-partner-attribution-id',
    CLIENT_METADATA_ID:     'paypal-client-metadata-id',
    PAYPAL_DEBUG_ID:        'paypal-debug-id'
};

export const DATA_ATTRIBUTES = {
    FUNDING_SOURCE:    'data-funding-source',
    CARD:              'data-card',
    PAYMENT_METHOD_ID: 'data-payment-method-id',
    INSTRUMENT_ID:     'data-instrument-id',
    MENU:              'data-menu',
    NONCE:             'data-nonce'
};

export const CLASS = {
    LOADING: 'paypal-button-loading',
    CLICKED: 'paypal-button-clicked'
};

export const ORDER_API_ERROR = {
    INSTRUMENT_DECLINED:   'INSTRUMENT_DECLINED',
    PAYER_ACTION_REQUIRED: 'PAYER_ACTION_REQUIRED'
};

export const CONTEXT = {
    IFRAME: 'iframe',
    POPUP:  'popup'
};

export const TARGET_ELEMENT = {
    BODY: 'body'
};

export const INTEGRATION_ARTIFACT = {
    PAYPAL_JS_SDK: 'PAYPAL_JS_SDK'
};

export const USER_EXPERIENCE_FLOW = {
    INCONTEXT: 'INCONTEXT',
    INLINE:    'INLINE'
};

export const DOM_EVENT = {
    MOUSEDOWN: 'mousedown',
    HOVER:     'hover'
};

export const PRODUCT_FLOW = {
    SMART_PAYMENT_BUTTONS: 'SMART_PAYMENT_BUTTONS'
};

export const FPTI_CONTEXT_TYPE = {
    BUTTON_SESSION_ID: ('button_session_id' : 'button_session_id'),
    WALLET_SESSION_ID: ('wallet_session_id' : 'wallet_session_id'),
    ORDER_ID:          ('EC-Token' : 'EC-Token'),
    PAYMENT_ID:        ('Pay-ID' : 'Pay-ID')
};

export const FPTI_STATE = {
    BUTTON:   ('smart_button' : 'smart_button'),
    WALLET:   ('smart_wallet' : 'smart_wallet')
};

export const FPTI_TRANSITION = {
    BUTTON_LOAD:              ('process_button_load' : 'process_button_load'),
    BUTTON_CLICK:             ('process_button_click' : 'process_button_click'),

    WALLET_LOAD:              ('process_wallet_load' : 'process_wallet_load'),

    CREATE_ORDER:             ('process_create_order' : 'process_create_order'),
    RECEIVE_ORDER:            ('process_receive_order' : 'process_receive_order'),
    CREATE_PAYMENT:           ('process_create_payment' : 'process_create_payment'),

    CHECKOUT_SHIPPING_CHANGE: ('process_checkout_shipping_change' : 'process_checkout_shipping_change'),
    CHECKOUT_APPROVE:         ('process_checkout_approve' : 'process_checkout_approve'),
    CHECKOUT_CANCEL:          ('process_checkout_cancel' : 'process_checkout_cancel'),

    NATIVE_DETECT_APP_SWITCH: ('native_detect_app_switch' : 'native_detect_app_switch'),
    NATIVE_DETECT_WEB_SWITCH: ('native_detect_web_switch' : 'native_detect_web_switch'),
    NATIVE_APP_SWITCH_ACK:    ('native_app_switch_ack' : 'native_app_switch_ack'),
    NATIVE_ERROR:             ('native_app_switch_ack' : 'native_app_switch_ack'),

    HONEY_IDENTIFY:           ('honey_identify')
};

export const FPTI_BUTTON_TYPE = {
    IFRAME: ('iframe' : 'iframe')
};

export const FTPI_CUSTOM_KEY = {
    HONEY_DEVICE_ID:       ('honey_device_id' : 'honey_device_id'),
    HONEY_SESSION_ID:      ('honey_session_id' : 'honey_session_id'),
    INTEGRATION_ISSUE:     ('integration_issue' : 'integration_issue'),
    INTEGRATION_WHITELIST: ('whitelist' : 'whitelist')
};

export const FTPI_BUTTON_KEY = {
    BUTTON_LAYOUT:          ('button_layout' : 'button_layout'),
    BUTTON_COLOR:           ('button_color' : 'button_color'),
    BUTTON_SIZE:            ('button_size' : 'button_size'),
    BUTTON_SHAPE:           ('button_shape' : 'button_shape'),
    BUTTON_LABEL:           ('button_label' : 'button_label'),
    BUTTON_WIDTH:           ('button_width' : 'button_width'),
    BUTTON_TYPE:            ('button_type' : 'button_type'),
    BUTTON_TAGLINE_ENABLED: ('button_tagline_enabled' : 'button_tagline_enabled')
};

export const FTPI_WALLET_KEY = {
    WALLET_SESSION_UID: ('wallet_session_id' : 'wallet_session_id'),
    WALLET_VERSION:     ('wallet_version' : 'wallet_version')
};

export const USER_ACTION = {
    COMMIT:   'commit',
    CONTINUE: 'continue'
};
