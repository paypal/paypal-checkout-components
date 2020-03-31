/* @flow */

import { FUNDING, CARD } from '@paypal/sdk-constants/src';
import { querySelectorAll } from 'belter/src';

import { DATA_ATTRIBUTES, CLASS } from '../constants';

export function getButtons() : $ReadOnlyArray<HTMLElement> {
    return querySelectorAll(`[ ${ DATA_ATTRIBUTES.FUNDING_SOURCE } ]`);
}

export function getSelectedFunding(button : HTMLElement) : {| fundingSource : $Values<typeof FUNDING>, card : $Values<typeof CARD>, paymentMethodID : ?string |} {
    const fundingSource = button.getAttribute(DATA_ATTRIBUTES.FUNDING_SOURCE);
    const paymentMethodID = button.getAttribute(DATA_ATTRIBUTES.PAYMENT_METHOD_ID);
    const card = button.getAttribute(DATA_ATTRIBUTES.CARD);

    // $FlowFixMe
    return { fundingSource, card, paymentMethodID };
}

export function enableLoadingSpinner(button : HTMLElement) {
    button.classList.add(CLASS.LOADING);
}

export function disableLoadingSpinner(button : HTMLElement) {
    button.classList.remove(CLASS.LOADING);
}
