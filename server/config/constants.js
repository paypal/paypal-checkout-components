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
    ERROR:      'error'
};

export const AUTH_ERROR_CODE = {
    INVALID_CLIENT: 'invalid_client'
};

export const ERROR_CODE = {
    VALIDATION_ERROR: 'validation_error'
};
