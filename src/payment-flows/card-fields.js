/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING, CARD, COUNTRY } from '@paypal/sdk-constants/src';
import { memoize, querySelectorAll } from 'belter/src';

import { CONTEXT, DATA_ATTRIBUTES } from '../constants';
import type { LocaleType, FundingEligibilityType, ProxyWindow } from '../types';
import { unresolvedPromise, promiseNoop } from '../lib';
import type {
    CreateOrder,
    OnApprove,
    OnCancel,
    OnAuth,
    OnShippingChange,
    OnError,
    CreateBillingAgreement,
    CreateSubscription
} from '../button/props';

import { initCheckout } from './checkout';

let cardFieldsOpen = false;

type CardFieldsProps = {|
    buttonSessionID : string,
    fundingSource : $Values<typeof FUNDING>,
    card : ?$Values<typeof CARD>,
    buyerCountry : $Values<typeof COUNTRY>,
    createOrder : CreateOrder,
    createBillingAgreement : ?CreateBillingAgreement,
    createSubscription : ?CreateSubscription,
    onApprove : OnApprove,
    onCancel : OnCancel,
    onAuth : OnAuth,
    onShippingChange : ?OnShippingChange,
    cspNonce : ?string,
    locale : LocaleType,
    commit : boolean,
    onError : OnError,
    vault : boolean,
    clientAccessToken : ?string,
    fundingEligibility : FundingEligibilityType
|};

type CardFieldsInstance = {|
    start : () => ZalgoPromise<void>,
    close : () => ZalgoPromise<void>,
    triggerError : (mixed) => ZalgoPromise<void>
|};

type CardFieldsEligibleProps = {|
    win : ?ProxyWindow,
    vault : boolean,
    fundingSource : $Values<typeof FUNDING>,
    onShippingChange : ?OnShippingChange
|};

export function isCardFieldsEligible({ win, vault, onShippingChange, fundingSource } : CardFieldsEligibleProps) : boolean {
    if (win) {
        return false;
    }

    if (!window.xprops.enableInlineGuest) {
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

    return true;
}

function highlightCard(card : $Values<typeof CARD>) {
    querySelectorAll(`[${ DATA_ATTRIBUTES.CARD }]`).forEach(el => {
        el.style.opacity = (el.getAttribute(DATA_ATTRIBUTES.CARD) === card) ? '1' : '0.1';
    });
}

const openCardFields = () => {
    const buttonsContainer = document.querySelector('#buttons-container');
    const cardButtonsContainer = document.querySelector(`[data-funding-source="${ FUNDING.CARD }"]`);
    const cardFieldsContainer = document.querySelector('#card-fields-container');

    if (!buttonsContainer || !cardButtonsContainer || !cardFieldsContainer) {
        throw new Error(`Required elements not found`);
    }

    cardFieldsContainer.style.display = 'block';

    const recalculateMargin = () => {
        const margin = -(buttonsContainer.offsetHeight - cardButtonsContainer.offsetHeight);
        buttonsContainer.style.marginTop = `${ margin }px`;
    };

    window.addEventListener('resize', () => {
        buttonsContainer.style.transitionDuration = '0s';
        recalculateMargin();
    });

    recalculateMargin();
};

export function initCardFields(props : CardFieldsProps) : CardFieldsInstance {
    const { fundingSource, card, buyerCountry, createOrder, onApprove, onCancel,
        onAuth, onShippingChange, cspNonce, locale, commit, onError, buttonSessionID } = props;

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
        initCheckout({ ...props, context: CONTEXT.IFRAME }).start().finally(unresolvedPromise));

    const onClose = () => {
        cardFieldsOpen = false;
        return onCancel();
    };

    const onCardTypeChange = ({ card: cardType }) => {
        highlightCard(cardType);
    };

    const { render, close, onError: triggerError } = window.paypal.CardFields({
        createOrder,

        fundingSource,
        card,

        onApprove: ({ payerID, paymentID, billingToken }) => {
            return close().then(() => {
                return onApprove({ payerID, paymentID, billingToken }, { restart });
            });
        },

        onCancel,
        onError,
        onAuth,
        onClose,
        onShippingChange,
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
        openCardFields();
        highlightCard(card);
        return renderPromise;
    };

    return { start, close, triggerError };
}
