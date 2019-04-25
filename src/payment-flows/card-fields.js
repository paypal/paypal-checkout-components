/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING, CARD, COUNTRY } from '@paypal/sdk-constants/src';
import { memoize } from 'belter/src';

import { CONTEXT } from '../constants';
import { INLINE_GUEST_ENABLED } from '../config';
import type { LocaleType, FundingEligibilityType } from '../types';
import { unresolvedPromise } from '../lib';
import type { CreateOrder, OnApprove, OnCancel, OnAuth, OnShippingChange, OnError } from '../button/props';

import { initCheckout } from './checkout';

let cardFieldsOpen = false;

type CardFieldsProps = {|
    fundingSource : $Values<typeof FUNDING>,
    card : ?$Values<typeof CARD>,
    buyerCountry : $Values<typeof COUNTRY>,
    createOrder : CreateOrder,
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
    start : () => ZalgoPromise<mixed>,
    close : () => ZalgoPromise<void>,
    triggerError : (mixed) => ZalgoPromise<void>
|};

type CardFieldsEligibleProps = {|
    vault : boolean,
    fundingSource : $Values<typeof FUNDING>,
    onShippingChange : ?OnShippingChange
|};

export function isCardFieldsEligible({ vault, onShippingChange, fundingSource } : CardFieldsEligibleProps) : boolean {
    if (!INLINE_GUEST_ENABLED) {
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
        onAuth, onShippingChange, cspNonce, locale, commit, onError } = props;

    if (!card) {
        throw new Error(`Card required to render card fields`);
    }

    if (cardFieldsOpen) {
        throw new Error(`Card fields already rendered`);
    }

    const restart = memoize(() : ZalgoPromise<void> =>
        initCheckout({ ...props, context: CONTEXT.IFRAME }).start().finally(unresolvedPromise));

    const onClose = () => {
        cardFieldsOpen = false;
        return onCancel();
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
        return renderPromise;
    };

    return { start, close, triggerError };
}
