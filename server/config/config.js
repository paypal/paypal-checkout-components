/* @flow */

import { join } from 'path';

import { ENV } from '@paypal/sdk-constants';

import pkg from '../../package.json';

import { getEnv } from './env';

export const MODULE_POLL_INTERVAL = 5 * 60;

export const WEBPACK_CONFIG = 'webpack.config';

export const MODULE_DIR : string = join(__dirname, '..');

export const SDK_RELEASE_MODULE = '@paypal/sdk-release';
export const CHECKOUT_COMPONENTS_MODULE = '@paypal/checkout-components';
export const SMART_BUTTONS_MODULE = pkg.name;

export const BUTTON_RENDER_JS = 'dist/button.js';

export const BUTTON_CLIENT_JS = 'dist/smart-payment-buttons.js';
export const BUTTON_CLIENT_MIN_JS = 'dist/smart-payment-buttons.min.js';

export const MENU_CLIENT_JS = 'dist/smart-menu.js';
export const MENU_CLIENT_MIN_JS = 'dist/smart-menu.min.js';

export const CARD_CLIENT_JS = 'dist/smart-card.js';
export const CARD_CLIENT_MIN_JS = 'dist/smart-card.min.js';

export const QRCODE_CLIENT_JS : string = 'dist/smart-qrcode.js';
export const QRCODE_CLIENT_MIN_JS : string = 'dist/smart-qrcode.min.js';

export const NATIVE_POPUP_CLIENT_JS = 'dist/smart-native-popup.js';
export const NATIVE_POPUP_CLIENT_MIN_JS = 'dist/smart-native-popup.min.js';

export const NATIVE_FALLBACK_CLIENT_JS = 'dist/smart-native-fallback.js';
export const NATIVE_FALLBACK_CLIENT_MIN_JS = 'dist/smart-native-fallback.min.js';

export const BROWSER_CACHE_TIME = 6 * 60 * 60;

export const SDK_CDN_NAMESPACE = 'js-sdk-release';
export const SMART_BUTTONS_CDN_NAMESPACE = 'smart-payment-buttons';

export const FUNDING_ELIGIBILITY_TIMEOUT = 200;
export const WALLET_TIMEOUT : number = {
    [ENV.PRODUCTION]:       2000,
    [ENV.LOCAL]:            10000,
    [ENV.STAGE]:            10000,
    [ENV.SANDBOX]:          10000,
    [ENV.TEST]:             10000
}[getEnv()];
export const EXPERIMENT_TIMEOUT : number = {
    [ENV.PRODUCTION]: 100,
    [ENV.LOCAL]:      10000,
    [ENV.STAGE]:      10000,
    [ENV.SANDBOX]:    10000,
    [ENV.TEST]:       10000
}[getEnv()];
export const PERSONALIZATION_TIMEOUT = 100;

export const LATEST_TAG = 'latest';
export const ACTIVE_TAG = `active-${ getEnv() }`;
