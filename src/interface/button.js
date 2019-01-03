/* @flow */

import { isPayPalDomain } from '@paypal/sdk-client/src';
import { PopupOpenError as _PopupOpenError } from 'zoid/src';

import { setupLogger } from '../lib';
import { Checkout as _Checkout } from '../checkout';

export { Buttons } from '../buttons';

export let Checkout;
export let PopupOpenError;

if (isPayPalDomain()) {
    Checkout = _Checkout;
    PopupOpenError = _PopupOpenError;
}

export function setupButtons() {
    setupLogger();
}
