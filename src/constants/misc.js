/* @flow */

export const ATTRIBUTE = {
    BUTTON:            ('data-button' : 'data-button'),
    FUNDING_SOURCE:    ('data-funding-source' : 'data-funding-source'),
    PAYMENT_METHOD_ID: ('data-payment-method-id' : 'data-payment-method-id'),
    INSTRUMENT_ID:     ('data-instrument-id' : 'data-instrument-id'),
    INSTRUMENT_TYPE:   ('data-instrument-type' : 'data-instrument-type'),
    VERSION:           ('data-paypal-smart-button-version' : 'data-paypal-smart-button-version'),
    CARD:              ('data-card' : 'data-card'),
    MENU:              ('data-menu' : 'data-menu'),
    OPTIONAL:          ('optional' : 'optional'),
    PAY_NOW:           ('data-pay-now' : 'data-pay-now')
};

export const FPTI_CPL_KEY = {
    PAGE_NAME:              ('page_name' : 'page_name'),
    CPL_COMP_METRICS:       ('cpl_comp_metrics' : 'cpl_comp_metrics'),
    CPL_CHUNK_METRICS:      ('cpl_chunk_metrics' : 'cpl_chunk_metrics'),
    CPL_QUERY_METRICS:      ('cpl_query_metrics' : 'cpl_query_metrics')
};

export const DEFAULT = ('default' : 'default');
