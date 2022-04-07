/* @flow */

import { FUNDING, CARD, WALLET_INSTRUMENT } from '@paypal/sdk-constants/src';
import { querySelectorAll } from '@krakenjs/belter/src';

import { DATA_ATTRIBUTES, CLASS } from '../constants';

export function getButtons() : $ReadOnlyArray<HTMLElement> {
    return querySelectorAll(`[ ${ DATA_ATTRIBUTES.FUNDING_SOURCE } ]`);
}

export function getMenuButton(button : HTMLElement) : ?HTMLElement {
    let menu = button.querySelector(`[${ DATA_ATTRIBUTES.MENU }]`);

    if (menu) {
        return menu;
    }

    const parent = button.parentNode;
    if (parent) {
        // $FlowFixMe
        menu = parent.querySelector(`[${ DATA_ATTRIBUTES.MENU }]`);
    }

    if (menu) {
        return menu;
    }
}

export function getSelectedFunding(button : HTMLElement) : {| fundingSource : $Values<typeof FUNDING>, card : $Values<typeof CARD>, paymentMethodID : ?string, instrumentID : ?string, instrumentType : ?$Values<typeof WALLET_INSTRUMENT> |} {
    const fundingSource = button.getAttribute(DATA_ATTRIBUTES.FUNDING_SOURCE);
    const paymentMethodID = button.getAttribute(DATA_ATTRIBUTES.PAYMENT_METHOD_ID);
    const instrumentID = button.getAttribute(DATA_ATTRIBUTES.INSTRUMENT_ID);
    const instrumentType = button.getAttribute(DATA_ATTRIBUTES.INSTRUMENT_TYPE);
    const card = button.getAttribute(DATA_ATTRIBUTES.CARD);

    // $FlowFixMe
    return { fundingSource, card, paymentMethodID, instrumentID, instrumentType };
}

export function enableLoadingSpinner(button : HTMLElement) {
    button.classList.add(CLASS.LOADING);
}

export function disableLoadingSpinner(button : HTMLElement) {
    button.classList.remove(CLASS.LOADING);
}
