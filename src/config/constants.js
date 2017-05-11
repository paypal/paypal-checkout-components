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
        FEED: 'feed_name',
        STATE: 'state_name',
        TRANSITION: 'transition_name',
        BUTTON_TYPE: 'button_type',
        UID: 'user_guid',
        TOKEN: 'token',
        CONTEXT_ID: 'context_id',
        REFERER: 'referer_url',
        PAY_ID: 'pay_id',
        DATA_SOURCE: 'serverside_data_source'
    },

    BUTTON_TYPE: {
        IFRAME: 'iframe',
        HTML: 'html',
        CUSTOM: 'custom'
    },

    DATA_SOURCE: {
        CHECKOUT: 'checkout'
    },

    FEED: {
        CHECKOUTJS: 'checkoutjs'
    },

    STATE: {
        LOAD: 'checkoutjs_load',
        BUTTON: 'checkoutjs_button',
        CHECKOUT: 'checkoutjs_checkout'
    },

    TRANSITION: {
        SCRIPT_LOAD: 'process_script_load',
        BUTTON_RENDER: 'process_button_render',
        BUTTON_CLICK: 'process_button_click',
        CREATE_PAYMENT: 'process_create_payment',
        CHECKOUT_INIT: 'process_checkout_init'
    }
};
