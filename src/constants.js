/* @flow */
import { FUNDING } from '@paypal/sdk-constants/src';

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
    PAYPAL_DEBUG_ID:        'paypal-debug-id',
    PAYPAL_REQUEST_ID:      'paypal-request-id'
};

export const DATA_ATTRIBUTES = {
    FUNDING_SOURCE:      'data-funding-source',
    CARD:                'data-card',
    PAYMENT_METHOD_ID:   'data-payment-method-id',
    INSTRUMENT_ID:       'data-instrument-id',
    INSTRUMENT_TYPE:     'data-instrument-type',
    MENU:                'data-menu',
    NONCE:               'data-nonce',
    RENDER_VERSION:      'data-render-version',
    CLIENT_VERSION:      'data-client-version',
    PAY_NOW:             'data-pay-now',
    RESPONSE_START_TIME: 'data-response-start-time'
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
    PAYER_ACTION_REQUIRED: 'PAYER_ACTION_REQUIRED',
    DUPLICATE_INVOICE_ID:  'DUPLICATE_INVOICE_ID'
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
    CONFIRM_ORDER:             ('process_confirm_order' : 'process_confirm_order'),
    RECEIVE_ORDER:            ('process_receive_order' : 'process_receive_order'),
    CREATE_PAYMENT:           ('process_create_payment' : 'process_create_payment'),
    CAPTURE_AUTHORIZATION:    ('process_capture_authorization' : 'process_capture_authorization'),

    CHECKOUT_SHIPPING_CHANGE:         ('process_checkout_shipping_change' : 'process_checkout_shipping_change'),
    CHECKOUT_SHIPPING_ADDRESS_CHANGE: ('process_checkout_shipping_address_change' : 'process_checkout_shipping_address_change'),
    CHECKOUT_SHIPPING_OPTIONS_CHANGE: ('process_checkout_shipping_options_change' : 'process_checkout_shipping_options_change'),
    CHECKOUT_APPROVE:                 ('process_checkout_approve' : 'process_checkout_approve'),
    CHECKOUT_COMPLETE:                ('process_checkout_complete' : 'process_checkout_complete'),
    CHECKOUT_CANCEL:                  ('process_checkout_cancel' : 'process_checkout_cancel'),
    CHECKOUT_ERROR:                   ('process_checkout_error' : 'process_checkout_error'),

    TOKENIZE_APPROVE:         ('process_tokenize_approve' : 'process_tokenize_approve'),

    CONNECT_REDIRECT:         ('process_connect_redirect' : 'process_connect_redirect'),

    FIREBASE_CONNECTION_OPENED:     ('firebase_connection_opened' : 'firebase_connection_opened'),
    FIREBASE_CONNECTION_ERRORED:    ('firebase_connection_errored' : 'firebase_connection_errored'),

    APPLEPAY_EVENT:                                     ('applepay_event' : 'applepay_event'),
    APPLEPAY_FLOW_ERROR:                                ('applepay_flow_error' : 'applepay_flow_error'),
    APPLEPAY_ON_CLICK_INVALID:                          ('applepay_onclick_invalid' : 'applepay_onclick_invalid'),
    APPLEPAY_MERCHANT_VALIDATION_COMPLETION_ERROR:      ('applepay_merchant_validation_completion_error' : 'applepay_merchant_validation_completion_error'),
    APPLEPAY_MERCHANT_VALIDATION_ERROR:                 ('applepay_merchant_validation_error' : 'applepay_merchant_validation_error'),
    APPLEPAY_CREATE_ORDER_ERROR:                        ('applepay_create_order_error' : 'applepay_create_order_error'),
    APPLEPAY_GET_DETAILS_ERROR:                         ('applepay_get_details_error' : 'applepay_get_details_error'),
    APPLEPAY_PAYMENT_ERROR:                             ('applepay_payment_error' : 'applepay_payment_error'),

    NATIVE_DETECT_POSSIBLE_APP_SWITCH:      ('native_detect_possible_app_switch' : 'native_detect_possible_app_switch'),
    NATIVE_DETECT_APP_SWITCH:               ('native_detect_app_switch' : 'native_detect_app_switch'),
    NATIVE_DETECT_WEB_SWITCH:               ('native_detect_web_switch' : 'native_detect_web_switch'),
    NATIVE_APP_SWITCH_ACK:                  ('native_app_switch_ack' : 'native_app_switch_ack'),
    NATIVE_ERROR:                           ('native_app_switch_ack' : 'native_app_switch_ack'),
    NATIVE_APP_INSTALLED:                   ('native_app_installed' : 'native_app_installed'),
    NATIVE_APP_SWITCH_INELIGIBLE:           ('app_switch_ineligible' : 'app_switch_ineligible'),
    NATIVE_ATTEMPT_APP_SWITCH:              ('app_switch_attempted' : 'app_switch_attempted'),
    NATIVE_ATTEMPT_APP_SWITCH_ERRORED:      ('app_switch_attempted_errored' : 'app_switch_attempted_errored'),
    NATIVE_CLOSING_POPUP:                   ('native_closing_popup' : 'native_closing_popup'),
    NATIVE_POPUP_CLOSED:                    ('popup_closed' : 'popup_closed'),
    NATIVE_POPUP_HASHCHANGE:                ('popup_hashchange' : 'popup_hashchange'),
    NATIVE_POPUP_NO_OPENER:                 ('popup_no_opener' : 'popup_no_opener'),
    NATIVE_POPUP_ANDROID_APP_ERROR:         ('native_popup_android_app_installed_error' : 'native_popup_android_app_installed_error'),
    NATIVE_POPUP_FALLBACK:                  ('popup_fallback' : 'popup_fallback'),
    NATIVE_FALLBACK_RETRY_VENMO_APP_SWITCH: ('native_fallback_retry_venmo_app_switch', 'native_fallback_retry_venmo_app_switch'),
    NATIVE_POPUP_SHOWN:                     ('popup_shown' : 'popup_shown'),
    NATIVE_ON_APPROVE:                      ('native_onapprove' : 'native_onapprove'),
    NATIVE_ON_APPROVE_ERROR:                ('native_onapprove_error' : 'native_onapprove_error'),
    NATIVE_ON_CANCEL:                       ('native_oncancel' : 'native_oncancel'),
    NATIVE_ON_CLICK_INVALID:                ('native_onclick_invalid' : 'native_onclick_invalid'),
    NATIVE_ON_COMPLETE:                     ('native_oncomplete' : 'native_oncomplete'),
    NATIVE_ON_ERROR:                        ('native_onerror' : 'native_onerror'),
    NATIVE_ON_SHIPPING_CHANGE:              ('native_onshippingchange' : 'native_onshippingchange'),
    NATIVE_ON_FALLBACK:                     ('native_onfallback' : 'native_onfallback'),
    NATIVE_POPUP_INIT:                      ('native_popup_init' : 'native_popup_init'),
    NATIVE_POPUP_UNLOAD:                    ('native_popup_unload' : 'native_popup_unload'),
    NATIVE_POPUP_BEFORE_UNLOAD:             ('native_popup_beforeunload' : 'native_popup_beforeunload'),
    NATIVE_POPUP_PAGEHIDE:                  ('native_popup_pagehide' : 'native_popup_pagehide'),
    NATIVE_POPUP_OPENER_DETECT_CLOSE:       ('native_popup_opener_detect_close' : 'native_popup_opener_detect_close'),
    NATIVE_OPT_OUT:                         ('native_opt_out' : 'native_opt_out'),
    NATIVE_FALLBACK:                        ('native_fallback' : 'native_fallback'),
    
    QR_LOAD:                                ('qr_load' : 'qr_load'),
    QR_SHOWN:                               ('qr_shown' : 'qr_shown'),
    QR_CLOSING:                             ('qr_closing' : 'qr_closing'),
    QR_SURVEY:                              ('desktop_exit_survey_selection_submitted' : 'desktop_exit_survey_selection_submitted'),
    QR_PREPARE_PAY:                         ('qr_prepare_pay' : 'qr_prepare_pay'),
    QR_PROCESS_PAY_WITH:                    ('qr_process_pay_with' : 'qr_process_pay_with'),
    
    HONEY_IDENTIFY:                         ('honey_identify' : 'honey_identify'),
    
    CALL_REST_API:                          ('call_rest_api' : 'call_rest_api')
};

export const FPTI_MENU_OPTION = {
    CHOOSE_FUNDING:     ('pay_with_different_payment_method' : 'pay_with_different_payment_method'),
    CHOOSE_ACCOUNT:     ('pay_with_different_account' : 'pay_with_different_account'),
    UNLINK_ACCOUNT:     ('unlink_account' : 'unlink_account')
};

export const FPTI_BUTTON_TYPE = {
    IFRAME: ('iframe' : 'iframe')
};

export const FPTI_CUSTOM_KEY = {
    ERR_DESC:                   ('int_error_desc' : 'int_error_desc'),
    EXPERIENCE:                 ('experience' : 'experience'),
    HONEY_DEVICE_ID:            ('honey_device_id' : 'honey_device_id'),
    HONEY_SESSION_ID:           ('honey_session_id' : 'honey_session_id'),
    INTEGRATION_ISSUE:          ('integration_issue' : 'integration_issue'),
    INTEGRATION_WHITELIST:      ('whitelist' : 'whitelist'),
    INFO_MSG:                   ('info_msg' : 'info_msg'),
    PMT_TOKEN:                  ('pmt_token' : 'pmt_token'),
    TRANSITION_TYPE:            ('transition_type' : 'transition_type'),
    TRANSITION_REASON:          ('transition_reason' : 'transition_reason'),
    SHIPPING_CALLBACK_PASSED:   ('shipping_callback_passed' : 'shipping_callback_passed'),
    SHIPPING_CALLBACK_INVOKED:  ('shipping_callback_invoked' : 'shipping_callback_invoked'),
    DESKTOP_EXIT_SURVEY_REASON: ('desktop_exit_survey_reason' : 'desktop_exit_survey_reason')
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
    RAMP:      100
};

export const FRAME_NAME = {
    SMART_FIELDS:      'smart-fields',
    CARD_FIELD:        'card-field',
    CARD_NUMBER_FIELD: 'card-number-field',
    CARD_CVV_FIELD:    'card-cvv-field',
    CARD_EXPIRY_FIELD: 'card-expiry-field',
    CARD_NAME_FIELD:   'card-name-field'
};

export const AMPLITUDE_KEY = {
    TIME:    'time',
    USER_ID: 'user_id'
};

export const VENMO_BLUE : string = '#3D93CE';

export const QRCODE_STATE = {
    ERROR:      'qr_error',
    SCANNED:    'qr_scanned',
    AUTHORIZED: 'qr_authorized',
    DEFAULT:    'qr_default'
};

export const LSAT_UPGRADE_EXCLUDED_MERCHANTS = [
    'AQipcJ1uXz50maKgYx49lKUB8MlSOXP573M6cpsFpHqDZOqnopsJpfYY7bQC_9CtQJsEhGlk8HLs2oZz',
    'Aco-yrRKihknb5vDBbDOdtYywjYMEPaM7mQg6kev8VDAz01lLA88J4oAUnF4UV9F_InqkqX7K62_jOjx',
    'AeAiB9K2rRsTXsFKZt4FMAQ8a6VEu4hijducis3a8NcIjV2J_c5I2H2PYhT3qCOwxT8P4l17skqgBlmg',
    'AXKrWRqEvxiDoUIZQaD1tFi2QhtmhWve3yTDBi58bxWjieYJ9j73My-yJmM7hP00JvOXu4YD6L2eaI5O',
    'AfRTnXv_QcuVyalbUxThtgk1xTygygsdevlBUTz36dDgD6XZNHp3Ym99a-mjMaokXyTTiI8VJ9mRgaFB',
    'AejlsIlg_KjKjmLKqxJqFIAwn3ZP02emx41Z2It4IfirQ-nNgZgzWk1CU-Q1QDbYUXjWoYJZ4dq1S2pK',
    'AQXD7-m_2yMo-5AxJ1fQaPeEWYDE7NZ9XrLzEXeiPLTHDu9vfe_T0foF8BoX8K5cMfXuRDysUEmhw-8Z'
];

export const ITEM_CATEGORY = {
    DIGITAL:  'DIGITAL',
    DONATION: 'DONATION',
    PHYSICAL: 'PHYSICAL'
};

export const BUTTON_LABEL = {
    DONATE: 'donate'
};

export const STATUS_CODES = {
    TOO_MANY_REQUESTS: 429
};

export const APM_LIST = [
    FUNDING.IDEAL,
    FUNDING.BANCONTACT,
    FUNDING.GIROPAY,
    FUNDING.SOFORT,
    FUNDING.EPS,
    FUNDING.MYBANK,
    FUNDING.P24,
    FUNDING.PAYU,
    FUNDING.BLIK,
    FUNDING.TRUSTLY,
    FUNDING.ZIMPLER,
    FUNDING.MAXIMA,
    FUNDING.OXXO,
    FUNDING.BOLETO,
    FUNDING.BOLETOBANCARIO,
    FUNDING.WECHATPAY,
    FUNDING.MERCADOPAGO,
    FUNDING.MULTIBANCO
];
