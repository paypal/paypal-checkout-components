/* @flow */

import type { Enum } from '../types';

export const ENV = {
    LOCAL:      'local',
    STAGE:      'stage',
    SANDBOX:    'sandbox',
    PRODUCTION: 'production',
    TEST:       'test',
    DEMO:       'demo'
};

export const USERS = {
    ALL:        'all',
    REMEMBERED: 'remembered'
};

export const SOURCE = {
    MANUAL:         'manual',
    BUTTON_FACTORY: 'button_factory'
};

export const LOG_LEVEL = {
    DEBUG: 'debug',
    INFO:  'info',
    WARN:  'warn',
    ERROR: 'error'
};

export const PAYMENT_TYPE = {
    EC_TOKEN: 'ec_token'
};

export const ATTRIBUTE = {
    BUTTON:         'data-button',
    FUNDING_SOURCE: 'data-funding-source',
    CARD:           'data-card',
    VERSION:        'data-version'
};

type PLATFORM_ENUM = Enum<'desktop' | 'mobile'>;

export const PLATFORM : PLATFORM_ENUM = {
    DESKTOP: 'desktop',
    MOBILE:  'mobile'
};

export const DEFAULT = 'default';


