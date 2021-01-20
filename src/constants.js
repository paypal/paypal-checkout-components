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
    PREFER:        'prefer',

    ACCESS_TOKEN:   'x-paypal-internal-euat',
    CSRF_TOKEN:     'x-csrf-jwt',
    SOURCE:         'x-source',
    REQUESTED_BY:   'x-requested-by',
    APP_NAME:       'x-app-name',
    APP_VERSION:    'x-app-version',
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
    INSTRUMENT_TYPE:   'data-instrument-type',
    MENU:              'data-menu',
    NONCE:             'data-nonce',
    RENDER_VERSION:    'data-render-version',
    CLIENT_VERSION:    'data-client-version',
    PAY_NOW:           'data-pay-now'
};

export const CLASS = {
    LOADING: 'paypal-button-loading',
    CLICKED: 'paypal-button-clicked'
};

export const PREFER = {
    REPRESENTATION: 'return=representation'
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
    WALLET:   ('smart_wallet' : 'smart_wallet'),
    PXP:      ('PXP_CHECK' : 'PXP_CHECK')
};

export const FPTI_TRANSITION = {
    BUTTON_LOAD:              ('process_button_load' : 'process_button_load'),
    BUTTON_CLICK:             ('process_button_click' : 'process_button_click'),
    PXP:                      ('process_pxp_check' : 'process_pxp_check'),

    WALLET_LOAD:              ('process_wallet_load' : 'process_wallet_load'),

    MENU_CLICK:               ('process_menu_click' : 'process_menu_click'),
    CLICK_CHOOSE_FUNDING:     ('process_click_pay_with_different_payment_method' : 'process_click_pay_with_different_payment_method'),
    CLICK_CHOOSE_ACCOUNT:     ('process_click_pay_with_different_account' : 'process_click_pay_with_different_account'),
    CLICK_UNLINK_ACCOUNT:     ('process_click_unlink_account' : 'process_click_unlink_account'),

    INSTALLMENTS_ELIGIBLE:    ('installments_eligible' : 'installments_eligible'),
    INSTALLMENTS_INELIGIBLE:  ('installments_ineligible' : 'installments_ineligible'),

    CREATE_ORDER:             ('process_create_order' : 'process_create_order'),
    RECEIVE_ORDER:            ('process_receive_order' : 'process_receive_order'),
    CREATE_PAYMENT:           ('process_create_payment' : 'process_create_payment'),

    CHECKOUT_SHIPPING_CHANGE: ('process_checkout_shipping_change' : 'process_checkout_shipping_change'),
    CHECKOUT_APPROVE:         ('process_checkout_approve' : 'process_checkout_approve'),
    CHECKOUT_CANCEL:          ('process_checkout_cancel' : 'process_checkout_cancel'),

    CONNECT_REDIRECT:         ('process_connect_redirect' : 'process_connect_redirect'),

    FIREBASE_CONNECTION_OPENED:     ('firebase_connection_opened' : 'firebase_connection_opened'),
    FIREBASE_CONNECTION_ERRORED:    ('firebase_connection_errored' : 'firebase_connection_errored'),

    NATIVE_DETECT_APP_SWITCH:           ('native_detect_app_switch' : 'native_detect_app_switch'),
    NATIVE_DETECT_WEB_SWITCH:           ('native_detect_web_switch' : 'native_detect_web_switch'),
    NATIVE_APP_SWITCH_ACK:              ('native_app_switch_ack' : 'native_app_switch_ack'),
    NATIVE_ERROR:                       ('native_app_switch_ack' : 'native_app_switch_ack'),
    NATIVE_SET_PROPS_ATTEMPT:           ('process_set_props_attempt' : 'process_set_props_attempt'),
    NATIVE_APP_SWITCH_INELIGIBLE:       ('app_switch_ineligible' : 'app_switch_ineligible'),
    NATIVE_ATTEMPT_APP_SWITCH:          ('app_switch_attempted' : 'app_switch_attempted'),
    NATIVE_ATTEMPT_APP_SWITCH_ERRORED:  ('app_switch_attempted_errored' : 'app_switch_attempted_errored'),
    NATIVE_CLOSING_POPUP:               ('native_closing_popup' : 'native_closing_popup'),
    NATIVE_POPUP_CLOSED:                ('popup_closed' : 'popup_closed'),
    NATIVE_POPUP_HASHCHANGE:            ('popup_hashchange' : 'popup_hashchange'),
    NATIVE_POPUP_NO_OPENER:             ('popup_no_opener' : 'popup_no_opener'),
    NATIVE_POPUP_FALLBACK:              ('popup_fallback' : 'popup_fallback'),
    NATIVE_POPUP_SHOWN:                 ('popup_shown' : 'popup_shown'),
    NATIVE_ON_APPROVE:                  ('native_onapprove' : 'native_onapprove'),
    NATIVE_ON_CANCEL:                   ('native_oncancel' : 'native_oncancel'),
    NATIVE_ON_CLICK_INVALID:            ('native_onclick_invalid' : 'native_onclick_invalid'),
    NATIVE_ON_COMPLETE:                 ('native_oncomplete' : 'native_oncomplete'),
    NATIVE_ON_ERROR:                    ('native_onerror' : 'native_onerror'),
    NATIVE_ON_SHIPPING_CHANGE:          ('native_onshippingchange' : 'native_onshippingchange'),

    HONEY_IDENTIFY:                     ('honey_identify')
};

export const FPTI_BUTTON_TYPE = {
    IFRAME: ('iframe' : 'iframe')
};

export const FPTI_CUSTOM_KEY = {
    ERR_DESC:              ('int_error_desc' : 'int_error_desc'),
    HONEY_DEVICE_ID:       ('honey_device_id' : 'honey_device_id'),
    HONEY_SESSION_ID:      ('honey_session_id' : 'honey_session_id'),
    INTEGRATION_ISSUE:     ('integration_issue' : 'integration_issue'),
    INTEGRATION_WHITELIST: ('whitelist' : 'whitelist'),
    INFO_MSG:              ('info_msg' : 'info_msg')
};

export const FPTI_BUTTON_KEY = {
    BUTTON_LAYOUT:          ('button_layout' : 'button_layout'),
    BUTTON_COLOR:           ('button_color' : 'button_color'),
    BUTTON_SIZE:            ('button_size' : 'button_size'),
    BUTTON_SHAPE:           ('button_shape' : 'button_shape'),
    BUTTON_LABEL:           ('button_label' : 'button_label'),
    BUTTON_WIDTH:           ('button_width' : 'button_width'),
    BUTTON_TYPE:            ('button_type' : 'button_type'),
    BUTTON_TAGLINE_ENABLED: ('button_tagline_enabled' : 'button_tagline_enabled'),
    BUTTON_CORRELATION_ID:  ('button_correlation_id' : 'button_correlation_id')
};

export const FTPI_WALLET_KEY = {
    WALLET_SESSION_UID: ('wallet_session_id' : 'wallet_session_id'),
    WALLET_VERSION:     ('wallet_version' : 'wallet_version')
};

export const USER_ACTION = {
    COMMIT:   'commit',
    CONTINUE: 'continue'
};

export const UPGRADE_LSAT_RAMP = {
    EXP_NAME: 'UPGRADE_LSAT_EXPERIMENT',
    RAMP:      1
};

export const FRAME_NAME = {
    SMART_FIELDS: 'smart-fields'
};
