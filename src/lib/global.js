/* @flow */

import { getGlobalNameSpace } from 'belter/src';

export let global = getGlobalNameSpace({ name: 'paypal', version: __PAYPAL_CHECKOUT__.__MINOR_VERSION__ });

