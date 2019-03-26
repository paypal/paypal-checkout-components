/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING, CARD, COUNTRY } from '@paypal/sdk-constants/src';
import { memoize, noop } from 'belter/src';

import { persistAccessToken, type OrderResponse } from './api';
import { getNonce } from './util';
import { buildApproveActions, buildShippingChangeActions } from './orders';
import { initCheckout } from './checkout';
import { CONTEXT } from './constants';

let cardFieldsOpen = false;

type CardPropsOverride = {|
    fundingSource : $Values<typeof FUNDING>,
    createOrder : () => ZalgoPromise<string>,
    card : ?$Values<typeof CARD>,
    buyerCountry : $Values<typeof COUNTRY>
|};

type CardFieldsInstance = {|
    instance : {
        close : () => ZalgoPromise<void>,
        onError : (mixed) => ZalgoPromise<void>
    },
    render : () => ZalgoPromise<mixed>
|};

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

export function initCardFields(props : CardPropsOverride) : CardFieldsInstance {

    if (cardFieldsOpen) {
        throw new Error(`Checkout already rendered`);
    }

    const { createOrder, fundingSource, buyerCountry } = props;

    const restart = memoize(() : ZalgoPromise<OrderResponse> => {
        return ZalgoPromise.try(() => {
            // eslint-disable-next-line no-use-before-define
            return instance.close();
        }).then(() => {
            return initCheckout({
                fundingSource,
                createOrder,
                buyerCountry
            }).render(CONTEXT.IFRAME);
        }).catch(noop).then(() => {
            return new ZalgoPromise(noop);
        });
    });

    let approved = false;
    const onApprove = ({ orderID, payerID, paymentID, billingToken }) => {
        approved = true;

        const actions = buildApproveActions(orderID, fundingSource, restart);

        return window.xprops.onApprove({ orderID, payerID, paymentID, billingToken }, actions).catch(err => {
            return window.xprops.onError(err);
        });
    };

    const onCancel = () => {
        return ZalgoPromise.try(() => {
            if (approved) {
                return;
            }

            return createOrder().then(orderID => {
                return window.xprops.onCancel({ orderID });
            }).catch(err => {
                return window.xprops.onError(err);
            });
        });
    };

    const onAuth = ({ accessToken }) : ZalgoPromise<void> => {
        return persistAccessToken(accessToken);
    };

    const onClose = () => {
        cardFieldsOpen = false;
        return onCancel();
    };

    const onShippingChange = window.xprops.onShippingChange
        && ((data, actions) => {
            return window.xprops.onShippingChange(data, {
                ...actions,
                ...buildShippingChangeActions(data.orderID)
            });
        });

    const nonce = getNonce();
    const { locale, commit, onError } = window.xprops;

    const instance = window.paypal.CardFields({
        ...props,

        cspNonce: getNonce(),

        createOrder,

        onApprove,
        onCancel,
        onError,
        onAuth,
        onClose,
        onShippingChange,

        buyerCountry,
        locale,
        commit,
        nonce
    });

    return {
        instance,
        render: () => {
            cardFieldsOpen = true;
            const renderPromise = instance.render('#card-fields-container');
            openCardFields();
            return renderPromise;
        }
    };
}
