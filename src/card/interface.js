/* @flow */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { INTENT } from '@paypal/sdk-constants';
import { getAllFramesInWindow, isSameDomain } from '@krakenjs/cross-domain-utils/src';
import { uniqueID } from '@krakenjs/belter/src';

import { FRAME_NAME } from '../constants';
import { tokenizeCard, approveCardPayment } from '../api';
import { getLogger } from '../lib';

import { getCardProps } from './props';
import type { Card, ExtraFields } from './types';
import { type CardExports, type ExportsOptions, parseGQLErrors } from './lib';

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


function getCardFrames() : {| cardFrame : ?ExportsOptions,  cardNumberFrame : ?ExportsOptions, cardCVVFrame : ?ExportsOptions, cardExpiryFrame : ?ExportsOptions, cardNameFrame : ?ExportsOptions |} {

    const cardFrame = getExportsByFrameName(FRAME_NAME.CARD_FIELD);
    const cardNumberFrame = getExportsByFrameName(FRAME_NAME.CARD_NUMBER_FIELD);
    const cardCVVFrame = getExportsByFrameName(FRAME_NAME.CARD_CVV_FIELD);
    const cardExpiryFrame = getExportsByFrameName(FRAME_NAME.CARD_EXPIRY_FIELD);
    const cardNameFrame = getExportsByFrameName(FRAME_NAME.CARD_NAME_FIELD);

    return {
        cardFrame,
        cardNumberFrame,
        cardCVVFrame,
        cardExpiryFrame,
        cardNameFrame
    };
}


export function hasCardFields() : boolean {
    const { cardFrame, cardNumberFrame, cardCVVFrame, cardExpiryFrame } = getCardFrames();

    if (cardFrame || (cardNumberFrame && cardCVVFrame && cardExpiryFrame)) {
        return true;
    }

    return false;
}

export function getCardFields() : ?Card {
    const cardFrame = getExportsByFrameName(FRAME_NAME.CARD_FIELD);

    if (cardFrame && cardFrame.isFieldValid()) {
        return cardFrame.getFieldValue();
    }

    const { cardNumberFrame, cardCVVFrame, cardExpiryFrame, cardNameFrame } = getCardFrames();

    if (
        cardNumberFrame && cardNumberFrame.isFieldValid() &&
        cardCVVFrame && cardCVVFrame.isFieldValid() &&
        cardExpiryFrame && cardExpiryFrame.isFieldValid() &&
        (cardNameFrame ? cardNameFrame.isFieldValid() : true)
    ) {
        return {
            number: cardNumberFrame.getFieldValue(),
            cvv:    cardCVVFrame.getFieldValue(),
            expiry: cardExpiryFrame.getFieldValue(),
            name:   cardNameFrame?.getFieldValue() || ''
        };
    }

    throw new Error(`Card fields not available to submit`);
}

export function emitGqlErrors(errorsMap : Object) : void {
    const { cardFrame, cardNumberFrame, cardExpiryFrame, cardCVVFrame } = getCardFrames();

    const { number, expiry, security_code } = errorsMap;

    if (cardFrame) {
        let cardFieldError = { field: '', errors: [] };

        if (number) {
            cardFieldError = { field: 'number', errors: number };
        }

        if (expiry) {
            cardFieldError = { field: 'expiry', errors: expiry };
        }

        if (security_code) {
            cardFieldError = { field: 'cvv', errors: security_code };
        }

        cardFrame.setGqlErrors(cardFieldError);
    }

    if (cardNumberFrame && number) {
        cardNumberFrame.setGqlErrors({ field: 'number', errors: number });
    }

    if (cardExpiryFrame && expiry) {
        cardExpiryFrame.setGqlErrors({ field: 'expiry', errors: expiry });
    }

    if (cardCVVFrame && security_code) {
        cardCVVFrame.setGqlErrors({ field: 'cvv', errors: security_code });
    }
}

export function resetGQLErrors() : void {
    const { cardFrame, cardNumberFrame, cardExpiryFrame, cardCVVFrame } = getCardFrames();

    if (cardFrame) {
        cardFrame.resetGQLErrors();
    }

    if (cardNumberFrame) {
        cardNumberFrame.resetGQLErrors();
    }

    if (cardExpiryFrame) {
        cardExpiryFrame.resetGQLErrors();
    }

    if (cardCVVFrame) {
        cardCVVFrame.resetGQLErrors();
    }
}

type SubmitCardFieldsOptions = {|
    facilitatorAccessToken : string,
    extraFields? : {|
        billingAddress? : string
    |}
|};

type CardValues = {|
    cardNumber : string,
    expirationDate? : string,
    securityCode? : string,
    postalCode? : string,
    name? : string,
    ...ExtraFields
|};

export function submitCardFields({ facilitatorAccessToken, extraFields } : SubmitCardFieldsOptions) : ZalgoPromise<void> {
    const { intent, branded, vault, createOrder, onApprove, clientID } = getCardProps({ facilitatorAccessToken });

    resetGQLErrors();

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

                const cardObject : CardValues = {
                    cardNumber:     card.number,
                    expirationDate: card.expiry,
                    securityCode:   card.cvv,
                    ...extraFields
                };

                if (card.name) {
                    cardObject.name = card.name;
                }

                return approveCardPayment({ card: cardObject, orderID, vault, branded, clientID }).catch((error) => {

                    const { errorsMap, parsedErrors, errors } = parseGQLErrors(error);

                    if (errorsMap) {
                        emitGqlErrors(errorsMap);
                    }

                    getLogger().info('card_fields_payment_failed');

                    const errorObject = { parsedErrors, errors };

                    throw errorObject;
                });
            }).then(() => {
                return onApprove({ payerID: uniqueID(), buyerAccessToken: uniqueID() }, { restart });
            });
        }
    });
}
