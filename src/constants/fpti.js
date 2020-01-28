/* @flow */

import { PAYMENT_TYPE } from './misc';

export const FPTI = {

    KEY: {
        FEED:                   'feed_name',
        STATE:                  'state_name',
        TRANSITION:             'transition_name',
        BUTTON_TYPE:            'button_type',
        SESSION_UID:            'page_session_id',
        BUTTON_SESSION_UID:     'button_session_id',
        TOKEN:                  'token',
        CONTEXT_ID:             'context_id',
        CONTEXT_TYPE:           'context_type',
        REFERER:                'referer_url',
        PAY_ID:                 'pay_id',
        SELLER_ID:              'seller_id',
        DATA_SOURCE:            'serverside_data_source',
        BUTTON_SOURCE:          'button_source',
        ERROR_CODE:             'ext_error_code',
        ERROR_DESC:             'ext_error_desc',
        PAGE_LOAD_TIME:         'page_load_time',
        EXPERIMENT_NAME:        'pxp_exp_id',
        TREATMENT_NAME:         'pxp_trtmnt_id',
        TRANSITION_TIME:        'transition_time',
        FUNDING_LIST:           'eligible_payment_methods',
        FUNDING_COUNT:          'eligible_payment_count',
        CHOSEN_FUNDING:         'selected_payment_method',
        BUTTON_LAYOUT:          'button_layout',
        BUTTON_COLOR:           'button_color',
        BUTTON_SIZE:            'button_size',
        BUTTON_SHAPE:           'button_shape',
        BUTTON_LABEL:           'button_label',
        BUTTON_WIDTH:           'button_width',
        VERSION:                'checkoutjs_version',
        MAX_BUTTONS:            'max_buttons',
        FUNDING_REMEMBERED:     'funding_remembered',
        BUTTON_TAGLINE_ENABLED: 'button_tagline_enabled',
        RESPONSE_DURATION:      'response_duration',
        PAYMENT_FLOW:           'payment_flow',
        BUTTON_VERSION:         'button_version'
    },

    BUTTON_TYPE: {
        IFRAME: 'iframe',
        HTML:   'html',
        CUSTOM: 'custom'
    },

    DATA_SOURCE: {
        CHECKOUT: 'checkout'
    },

    CONTEXT_TYPE: {
        BUTTON_SESSION_ID:         'button_session_id',
        [ PAYMENT_TYPE.PAY_ID ]:   'Pay-ID',
        [ PAYMENT_TYPE.EC_TOKEN ]: 'EC-Token',
        [ PAYMENT_TYPE.BA_TOKEN ]: 'EC-Token'
    },

    FEED: {
        CHECKOUTJS: 'checkoutjs'
    },

    STATE: {
        LOAD:     'checkoutjs_load',
        BUTTON:   'checkoutjs_button',
        CHECKOUT: 'checkoutjs_checkout',
        PPTM:     'checkoutjs_pptm'
    },

    TRANSITION: {
        SCRIPT_LOAD: 'process_script_load',

        BUTTON_RENDER:   'process_button_render',
        BUTTON_LOAD:     'process_button_load',
        BUTTON_CLICK:    'process_button_click',

        BUTTON_RENDER_INTRANET_MODE: 'process_button_render_intranet_mode',
        BUTTON_CLICK_INTRANET_MODE:  'process_button_click_intranet_mode',

        CREATE_PAYMENT:  'process_create_payment',
        RECIEVE_PAYMENT: 'process_recieve_payment',

        CHECKOUT_INIT:            'process_checkout_init',
        CHECKOUT_APPROVE:         'process_checkout_approve',
        CHECKOUT_SHIPPING_CHANGE: 'process_checkout_shipping_change',
        CHECKOUT_CANCEL:          'process_checkout_cancel',
        CHECKOUT_ERROR:           'process_checkout_error',

        EXTERNAL_EXPERIMENT:          'process_external_experiment',
        EXTERNAL_EXPERIMENT_COMPLETE: 'process_external_experiment_complete',

        PPTM_LOAD:   'process_pptm_load',
        PPTM_LOADED: 'process_pptm_loaded'
    }
};
