/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { INTENT } from '@paypal/sdk-constants';
import { getAllFramesInWindow, isSameDomain } from 'cross-domain-utils/src';
import { uniqueID } from 'belter/src';

import { FRAME_NAME } from '../constants';
import { tokenizeCard, approveCardPayment } from '../api';
import { getLogger } from '../lib';

import { getCardProps } from './props';
import type { Card } from './types';
import type { CardExports } from './lib';

function getExportsByFrameName<T>(name : $Values<typeof FRAME_NAME>) : ?CardExports<T> {
    try {
        for (const win of getAllFramesInWindow(window)) {

            if (
                isSameDomain(win) &&
                // $FlowFixMe
                win.exports &&
                win.exports.name === name
            ) {
                return win.exports;
            }
        }
    } catch (err) {
        // pass
    }
}

export function hasCardFields() : boolean {
    const cardFrame = getExportsByFrameName(FRAME_NAME.CARD_FIELD);

    if (cardFrame) {
        return true;
    }

    const cardNumberFrame = getExportsByFrameName(FRAME_NAME.CARD_NUMBER_FIELD);
    const cardCVVFrame = getExportsByFrameName(FRAME_NAME.CARD_CVV_FIELD);
    const cardExpiryFrame = getExportsByFrameName(FRAME_NAME.CARD_EXPIRY_FIELD);

    if (cardNumberFrame && cardCVVFrame && cardExpiryFrame) {
        return true;
    }

    return false;
}

export function getCardFields() : ?Card {
    const cardFrame = getExportsByFrameName(FRAME_NAME.CARD_FIELD);

    if (cardFrame) {
        return cardFrame.getFieldValue();
    }

    const cardNumberFrame = getExportsByFrameName(FRAME_NAME.CARD_NUMBER_FIELD);
    const cardCVVFrame = getExportsByFrameName(FRAME_NAME.CARD_CVV_FIELD);
    const cardExpiryFrame = getExportsByFrameName(FRAME_NAME.CARD_EXPIRY_FIELD);

    if (
        cardNumberFrame && cardNumberFrame.isFieldValid() &&
        cardCVVFrame && cardCVVFrame.isFieldValid() &&
        cardExpiryFrame && cardExpiryFrame.isFieldValid()
    ) {
        return {
            number: cardNumberFrame.getFieldValue(),
            cvv:    cardCVVFrame.getFieldValue(),
            expiry: cardExpiryFrame.getFieldValue()
        };
    }
}

type SubmitCardFieldsOptions = {|
    facilitatorAccessToken : string
|};

export function submitCardFields({ facilitatorAccessToken } : SubmitCardFieldsOptions) : ZalgoPromise<void> {
    const { intent, branded, vault, createOrder, onApprove, clientID } = getCardProps({ facilitatorAccessToken });
    
    return ZalgoPromise.try(() => {
        if (!hasCardFields()) {
            throw new Error(`Card fields not available to submit`);
        }

        const card = getCardFields();

        if (!card) {
            return;
        }

        const restart = () => {
            throw new Error(`Restart not implemented for card fields flow`);
        };
    
        if (intent === INTENT.TOKENIZE) {
            return tokenizeCard({ card }).then(({ paymentMethodToken }) => {
                return onApprove({ paymentMethodToken }, { restart });
            });
        }

        if (intent === INTENT.CAPTURE || intent === INTENT.AUTHORIZE) {
            return createOrder().then(orderID => {

                const cardObject = {
                    cardNumber:     card.number,
                    expirationDate: card.expiry,
                    cvv:            card.cvv,
                    postalCode:     '48007'
                };

                return approveCardPayment({ card: cardObject, orderID, vault, branded, clientID }).catch((error) => {
                    getLogger().info('card_fields_payment_failed');
                    throw error;
                });
            }).then(() => {
                return onApprove({ payerID: uniqueID() }, { restart });
            });
        }
    });
}
