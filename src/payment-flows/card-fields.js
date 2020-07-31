/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING, CARD } from '@paypal/sdk-constants/src';
import { memoize, querySelectorAll, debounce, noop } from 'belter/src';

import { DATA_ATTRIBUTES } from '../constants';
import { unresolvedPromise, promiseNoop } from '../lib';

import type { PaymentFlow, PaymentFlowInstance, IsEligibleOptions, IsPaymentEligibleOptions, InitOptions } from './types';
import { checkout } from './checkout';

function setupCardFields() {
    // pass
}

let cardFieldsOpen = false;

function isCardFieldsEligible({ props, serviceData } : IsEligibleOptions) : boolean {
    const { vault, onShippingChange, enableStandardCardFields } = props;
    const { eligibility } = serviceData;

    if (vault) {
        return false;
    }

    if (onShippingChange) {
        return false;
    }

    // if merchant opt-in inline guest, they will ALWAYS see inline guest guest
    if (enableStandardCardFields) {
        return true;
    }

    return eligibility.cardFields;
}

function isCardFieldsPaymentEligible({ payment } : IsPaymentEligibleOptions) : boolean {
    const { win, fundingSource } = payment || {};

    if (win) {
        return false;
    }

    if (fundingSource && fundingSource !== FUNDING.CARD) {
        return false;
    }

    return true;
}

function highlightCard(card : ?$Values<typeof CARD>) {
    if (!card) {
        return;
    }
    querySelectorAll(`[${ DATA_ATTRIBUTES.CARD }]`).forEach(el => {
        el.style.opacity = (el.getAttribute(DATA_ATTRIBUTES.CARD) === card) ? '1' : '0.1';
    });
}

function unhighlightCards() {
    querySelectorAll(`[${ DATA_ATTRIBUTES.CARD }]`).forEach(el => {
        el.style.opacity = '1';
    });
}

const getElements = () : {| buttonsContainer : HTMLElement, cardButtonsContainer : HTMLElement, cardFieldsContainer : HTMLElement |} => {
    const buttonsContainer = document.querySelector('#buttons-container');
    const cardButtonsContainer = document.querySelector(`[${ DATA_ATTRIBUTES.FUNDING_SOURCE }="${ FUNDING.CARD }"]`);
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

function initCardFields({ props, components, payment, serviceData, config } : InitOptions) : PaymentFlowInstance {
    const { createOrder, onApprove, onCancel,
        locale, commit, onError, sessionID, buttonSessionID } = props;
    const { CardFields } = components;
    const { fundingSource, card } = payment;
    const { cspNonce } = config;
    const { buyerCountry } = serviceData;

    if (cardFieldsOpen) {
        highlightCard(card);
        return {
            start: promiseNoop,
            close: promiseNoop
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

    let buyerAccessToken;

    const { render, close: closeCardFields } = CardFields({
        createOrder,

        fundingSource,
        card,

        onApprove: ({ payerID, paymentID, billingToken }) => {
            // eslint-disable-next-line no-use-before-define
            return close().then(() => {
                return onApprove({ payerID, paymentID, billingToken, buyerAccessToken }, { restart }).catch(noop);
            });
        },

        onAuth: ({ accessToken }) => {
            buyerAccessToken = accessToken;
        },

        onCancel,
        onError,
        onClose,
        onCardTypeChange,

        sessionID,
        buttonSessionID,
        buyerCountry,
        locale,
        commit,
        cspNonce
    });

    const start = () => {
        cardFieldsOpen = true;
        const renderPromise = render('#card-fields-container');
        slideUpButtons();
        highlightCard(card);
        return renderPromise;
    };

    const close = () => {
        slideDownButtons();
        return closeCardFields().then(() => {
            cardFieldsOpen = false;
        });
    };

    return { start, close };
}

export const cardFields : PaymentFlow = {
    name:              'card_fields',
    setup:             setupCardFields,
    isEligible:        isCardFieldsEligible,
    isPaymentEligible: isCardFieldsPaymentEligible,
    init:              initCardFields,
    inline:            true
};
