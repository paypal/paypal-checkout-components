/* @flow */

export const HTTP_HEADER = {
    CONTENT_TYPE:        'content-type',
    CONTENT_DISPOSITION: 'Content-Disposition',
    X_FRAME_OPTIONS:     'X-Frame-Options',
    PP_GEO_LOC:          'pp_geo_loc',
    CACHE_CONTROL:       'cache-control',
    EXPIRES:             'expires',
    CLIENT_METADATA_ID:  'PayPal-Client-Metadata-Id'
};

export const HTTP_CONTENT_TYPE = {
    TEXT:       'text/plain',
    HTML:       'text/html',
    JAVASCRIPT: 'application/javascript'
};

export const HTTP_CONTENT_DISPOSITION = {
    INLINE: 'inline'
};

export const HTTP_STATUS_CODE = {
    SUCCESS:      200,
    CLIENT_ERROR: 400,
    SERVER_ERROR: 500
};

export const EVENT = {
    RENDER:     'render',
    VALIDATION: 'validation',
    ERROR:      'error',
    HTML_ERROR: 'html_error'
};

export const AUTH_ERROR_CODE = {
    INVALID_CLIENT: 'invalid_client'
};

export const TIMEOUT_ERROR_MESSAGE = 'Timed out after';

export const FPTI_STATE = {
    BUTTON:   ('smart_button' : 'smart_button'),
    WALLET:   ('smart_wallet' : 'smart_wallet'),
    PXP:      ('PXP_CHECK' : 'PXP_CHECK')
};
