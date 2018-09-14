/* @flow */

export const USERS = {
    ALL:        ('all' : 'all'),
    REMEMBERED: ('remembered' : 'remembered')
};

export const SOURCE = {
    MANUAL:         ('manual' : 'manual'),
    BUTTON_FACTORY: ('button_factory' : 'button_factory')
};

export const LOG_LEVEL = {
    DEBUG: ('debug' : 'debug'),
    INFO:  ('info' : 'info'),
    WARN:  ('warn' : 'warn'),
    ERROR: ('error' : 'error')
};

export const ATTRIBUTE = {
    BUTTON:         ('data-button' : 'data-button'),
    FUNDING_SOURCE: 'data-funding-source',
    CARD:           ('data-card' : 'data-card')
};

export const PLATFORM = {
    DESKTOP: ('desktop' : 'desktop'),
    MOBILE:  ('mobile' : 'mobile')
};

export const INTENT = {
    SALE:    'sale',
    CAPTURE: 'capture',
    AUTH:    'auth',
    ORDER:   'order'
};

export const COMMIT = {
    TRUE:  true,
    FALSE: false
};

export const VAULT = {
    TRUE:  true,
    FALSE: false
};

export const DEFAULT = ('default' : 'default');


