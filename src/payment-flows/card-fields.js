/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING, CARD } from '@paypal/sdk-constants/src';
import { memoize, querySelectorAll, debounce } from 'belter/src';

import type { Props, Config, ServiceData, Components } from '../button/props';
import { DATA_ATTRIBUTES } from '../constants';
import { unresolvedPromise, promiseNoop } from '../lib';
import { createAccessToken } from '../api';

import type { Payment, PaymentFlow, PaymentFlowInstance } from './types';
import { checkout } from './checkout';

function setupCardFields() {
    // pass
}

let cardFieldsOpen = false;

function isCardFieldsEligible({ props, payment, serviceData } : { props : Props, payment : Payment, serviceData : ServiceData }) : boolean {
    const { vault, onShippingChange, enableStandardCardFields } = props;
    const { win, fundingSource } = payment;
    const { experiments } = serviceData;

    if (win) {
        return false;
    }

    if (fundingSource !== FUNDING.CARD) {
        return false;
    }

    if (vault) {
        return false;
    }

    if (onShippingChange) {
        return false;
    }

    // if merchant opt-in inline guest, they will ALWAYS see inline guest guest
    if (enableStandardCardFields === true) {
        return true;
    }

    // if merchant doesn't pass the inline guest flag, they will in the ramp
    if (!enableStandardCardFields) {
        if (!experiments.cardFields) {
            return false;
        } else {
            return true;
        }
    }

    return true;
}

function highlightCard(card : $Values<typeof CARD>) {
    querySelectorAll(`[${ DATA_ATTRIBUTES.CARD }]`).forEach(el => {
        el.style.opacity = (el.getAttribute(DATA_ATTRIBUTES.CARD) === card) ? '1' : '0.1';
    });
}

function unhighlightCards() {
    querySelectorAll(`[${ DATA_ATTRIBUTES.CARD }]`).forEach(el => {
        el.style.opacity = '1';
    });
}

const getElements = () : { buttonsContainer : HTMLElement, cardButtonsContainer : HTMLElement, cardFieldsContainer : HTMLElement } => {
    const buttonsContainer = document.querySelector('#buttons-container');
    const cardButtonsContainer = document.querySelector(`[data-funding-source="${ FUNDING.CARD }"]`);
    const cardFieldsContainer = document.querySelector('#card-fields-container');

    if (!buttonsContainer || !cardButtonsContainer || !cardFieldsContainer) {
        throw new Error(`Did not find card fields elements`);
    }

    return { buttonsContainer, cardButtonsContainer, cardFieldsContainer };
};

const slideUpButtons = () => {
    const { buttonsContainer, cardButtonsContainer, cardFieldsContainer } = getElements();

    if (!buttonsContainer || !cardButtonsContainer || !cardFieldsContainer) {
        throw new Error(`Required elements not found`);
    }

    cardFieldsContainer.style.minHeight = '0px';
    cardFieldsContainer.style.display = 'block';

    const recalculateMargin = () => {
        buttonsContainer.style.marginTop = `${ buttonsContainer.offsetTop - cardButtonsContainer.offsetTop }px`;
    };

    window.addEventListener('resize', debounce(() => {
        buttonsContainer.style.transitionDuration = '0s';
        recalculateMargin();
    }));

    recalculateMargin();
};

const slideDownButtons = () => {
    const { buttonsContainer } = getElements();

    unhighlightCards();
    buttonsContainer.style.marginTop = `0px`;
};

function initCardFields({ props, components, payment, serviceData, config } : { props : Props, config : Config, components : Components, payment : Payment, serviceData : ServiceData }) : PaymentFlowInstance {
    const { createOrder, onApprove, onCancel,
        locale, commit, onError, buttonSessionID, clientID } = props;
    const { CardFields } = components;
    const { fundingSource, card } = payment;
    const { cspNonce } = config;
    const { buyerCountry } = serviceData;

    if (!card) {
        throw new Error(`Card required to render card fields`);
    }

    if (cardFieldsOpen) {
        highlightCard(card);
        return {
            start:        promiseNoop,
            close:        promiseNoop,
            triggerError: promiseNoop
        };
    }

    const restart = memoize(() : ZalgoPromise<void> =>
        checkout.init({ props, components, payment: { ...payment, isClick: false }, serviceData, config })
            .start().finally(unresolvedPromise));

    const onClose = () => {
        cardFieldsOpen = false;
    };

    const onCardTypeChange = ({ card: cardType }) => {
        highlightCard(cardType);
    };

    const facilitatorAccessTokenPromise = createAccessToken(clientID);
    let buyerAccessToken;

    const { render, close: closeCardFields, onError: triggerError } = CardFields({
        createOrder,

        fundingSource,
        card,

        onApprove: ({ payerID, paymentID, billingToken }) => {
            return ZalgoPromise.hash({
                facilitatorAccessToken: facilitatorAccessTokenPromise,
                close:                  close() // eslint-disable-line no-use-before-define
            }).then(({ facilitatorAccessToken }) => {
                return onApprove({ payerID, paymentID, billingToken, facilitatorAccessToken, buyerAccessToken }, { restart });
            });
        },

        onAuth: ({ accessToken }) => {
            buyerAccessToken = accessToken;
        },

        onCancel,
        onError,
        onClose,
        onCardTypeChange,

        buttonSessionID,
        buyerCountry,
        locale,
        commit,
        cspNonce
    });

    cardFieldsOpen = true;

    const start = () => {
        cardFieldsOpen = true;
        const renderPromise = render('#card-fields-container');
        slideUpButtons();
        highlightCard(card);
        return renderPromise;
    };

    const close = () => {
        slideDownButtons();
        return closeCardFields();
    };

    return { start, close, triggerError };
}

export const cardFields : PaymentFlow = {
    setup:      setupCardFields,
    isEligible: isCardFieldsEligible,
    init:       initCardFields,
    spinner:    true,
    inline:     true
};
