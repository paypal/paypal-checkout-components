/* @flow */

import { noop } from 'belter/src';
import type { ZalgoPromise } from 'zalgo-promise/src';
import { isPayPalDomain } from '@paypal/sdk-client/src';
import { PopupOpenError as _PopupOpenError } from 'zoid/src';

import { setupLogger } from '../lib';
import { Buttons as ButtonsComponent } from '../buttons';
import type { ButtonProps } from '../buttons/props';
import { Checkout as _Checkout } from '../checkout';

export let Checkout;
export let PopupOpenError;

if (isPayPalDomain()) {
    Checkout = _Checkout;
    PopupOpenError = _PopupOpenError;
}

// $FlowFixMe
export function Buttons(props : ButtonProps = {}) : { render : (string | HTMLElement) => ZalgoPromise<void> } {
    return {
        render: (container) => {
            // $FlowFixMe
            return ButtonsComponent.render(props, container).then(noop);
        }
    };
}

export function setupButtons() {
    if (__TEST__) {
        Buttons.driver = (name, deps) => ButtonsComponent.driver(name, deps);
    }

    setupLogger();
}
