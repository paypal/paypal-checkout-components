/* @flow */

export const ENV = {
    LOCAL:      'local',
    STAGE:      'stage',
    SANDBOX:    'sandbox',
    PRODUCTION: 'production',
    TEST:       'test'
};


export const USERS = {
    ALL:        'all',
    REMEMBERED: 'remembered'
};

export const LOG_LEVEL = {
    DEBUG: 'debug',
    INFO:  'info',
    WARN:  'warn',
    ERROR: 'error'
};

export const FPTI = {

    KEY: {
        STATE: 'state_name',
        TRANSITION: 'transition_name',
        UID: 'user_session_guid',
        TOKEN: 'token',
        CONTEXT_ID: 'context_id'
    },

    STATE: {
        LOAD: 'checkoutjs_load',
        BUTTON: 'checkoutjs_button',
        CHECKOUT: 'checkoutjs_checkout'
    },

    TRANSITION: {
        SCRIPT_LOAD: 'process_script_load',

        IFRAME_BUTTON_RENDER: 'process_iframe_button_render',
        IFRAME_BUTTON_CLICK: 'process_iframe_button_click',

        HTML_BUTTON_RENDER: 'process_html_button_render',
        HTML_BUTTON_CLICK: 'process_html_button_click',

        CUSTOM_BUTTON_RENDER: 'process_custom_button_render',
        CUSTOM_BUTTON_CLICK: 'process_custom_button_click',

        CREATE_PAYMENT: 'process_create_payment',

        CHECKOUT_INIT: 'process_checkout_init'
    }
};
