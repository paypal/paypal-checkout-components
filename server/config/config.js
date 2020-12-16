/* @flow */

import { join } from 'path';

import pkg from '../../package.json';

import { getEnv } from './env';

export const MODULE_POLL_INTERVAL = 5 * 60;

export const FNCLS = 'fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99';
export const FRAUDNET_ID = 'SMART_PAYMENT_BUTTONS';

export const WEBPACK_CONFIG = 'webpack.config';

export const MODULE_DIR : string = join(__dirname, '..');

export const BUTTON_RENDER_MODULE = '@paypal/sdk-release';
export const BUTTON_RENDER_CHILD_MODULE = '@paypal/checkout-components';

export const CLIENT_MODULE = pkg.name;

export const BUTTON_RENDER_JS = 'dist/button.js';

export const BUTTON_CLIENT_JS = 'dist/smart-payment-buttons.js';
export const BUTTON_CLIENT_MIN_JS = 'dist/smart-payment-buttons.min.js';

export const MENU_CLIENT_JS = 'dist/smart-menu.js';
export const MENU_CLIENT_MIN_JS = 'dist/smart-menu.min.js';

export const NATIVE_POPUP_CLIENT_JS = 'dist/smart-payment-buttons.js';
export const NATIVE_POPUP_CLIENT_MIN_JS = 'dist/smart-payment-buttons.min.js';

export const NATIVE_FALLBACK_CLIENT_JS = 'dist/smart-payment-buttons.js';
export const NATIVE_FALLBACK_CLIENT_MIN_JS = 'dist/smart-payment-buttons.min.js';

export const BROWSER_CACHE_TIME = 6 * 60 * 60;

export const SDK_CDN_NAMESPACE = 'https://www.paypalobjects.com/js-sdk-release';
export const SMART_BUTTONS_CDN_NAMESPACE = 'https://www.paypalobjects.com/smart-payment-buttons';

export const FUNDING_ELIGIBILITY_TIMEOUT = 200;
export const WALLET_TIMEOUT = 2000;
export const EXPERIMENT_TIMEOUT = 100;

export const LATEST_TAG = 'latest';
export const ACTIVE_TAG = `active-${ getEnv() }`;
