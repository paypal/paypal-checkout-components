/* @flow */

export const FPTI_CONTEXT_TYPE = {
    BUTTON_SESSION_ID: ('button_session_id' : 'button_session_id'),
    ORDER_ID:          ('EC-Token' : 'EC-Token')
};

export const FPTI_STATE = {
    BUTTON:   ('smart_button' : 'smart_button'),
    CHECKOUT: ('smart_checkout' : 'smart_checkout')
};

export const FPTI_TRANSITION = {
    BUTTON_RENDER:  ('process_button_render' : 'process_button_render'),
    BUTTON_LOAD:    ('process_button_load' : 'process_button_load'),
    BUTTON_CLICK:   ('process_button_click' : 'process_button_click'),

    RECIEVE_ORDER: ('process_recieve_order' : 'process_recieve_order'),

    CHECKOUT_INIT:            ('process_checkout_init' : 'process_checkout_init'),
    CHECKOUT_AUTHORIZE:       ('process_checkout_authorize' : 'process_checkout_authorize'),
    CHECKOUT_SHIPPING_CHANGE: ('process_checkout_shipping_change' : 'process_checkout_shipping_change'),
    CHECKOUT_CANCEL:          ('process_checkout_cancel' : 'process_checkout_cancel'),
    CHECKOUT_ERROR:           ('process_checkout_error' : 'process_checkout_error'),

    EXTERNAL_EXPERIMENT:          ('process_external_experiment' : 'process_external_experiment'),
    EXTERNAL_EXPERIMENT_COMPLETE: ('process_external_experiment_complete' : 'process_external_experiment_complete')
};
