/* @flow */


export const FPTI_BUTTON_TYPE = {
    IFRAME: ('iframe' : 'iframe')
};

export const FPTI_CONTEXT_TYPE = {
    BUTTON_SESSION_ID: 'button_session_id',
    ORDER_ID:          'EC-Token'
};

export const FPTI_STATE = {
    LOAD:     ('checkoutjs_load' : 'checkoutjs_load'),
    BUTTON:   ('checkoutjs_button' : 'checkoutjs_button'),
    CHECKOUT: ('checkoutjs_checkout' : 'checkoutjs_checkout'),
    PPTM:     ('checkoutjs_pptm' : 'checkoutjs_pptm'),
    PXP:      ('PXP_CHECK' : 'PXP_CHECK')
};

export const FPTI_TRANSITION = {
    SCRIPT_LOAD: 'process_script_load',

    BUTTON_RENDER:   'process_button_render',
    BUTTON_LOAD:     'process_button_load',
    BUTTON_CLICK:    'process_button_click',

    CREATE_ORDER:  'process_create_order',
    RECIEVE_ORDER: 'process_recieve_order',

    CHECKOUT_INIT:      'process_checkout_init',
    CHECKOUT_AUTHORIZE: 'process_checkout_authorize',
    CHECKOUT_CANCEL:    'process_checkout_cancel',
    CHECKOUT_ERROR:     'process_checkout_error',

    EXTERNAL_EXPERIMENT:          'process_external_experiment',
    EXTERNAL_EXPERIMENT_COMPLETE: 'process_external_experiment_complete',

    PPTM_LOAD:   'process_pptm_load',
    PPTM_LOADED: 'process_pptm_loaded',

    PXP: ('process_pxp_check' : 'process_pxp_check')
};
