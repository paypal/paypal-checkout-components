/* @flow */

import { type ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { FUNDING } from '@paypal/sdk-constants/src';

export type XCreateBillingAgreementDataType = {|
    paymentSource : $Values<typeof FUNDING> | null
|};

export type XCreateBillingAgreementActionsType = {|

|};

export type XCreateBillingAgreement = (?XCreateBillingAgreementDataType, ?XCreateBillingAgreementActionsType) => ZalgoPromise<string>;

export function buildXCreateBillingAgreementData({ paymentSource } : {| paymentSource : $Values<typeof FUNDING> | null |}) : XCreateBillingAgreementDataType {
    return { paymentSource };
}

export function buildXCreateBillingAgreementActions() : XCreateBillingAgreementActionsType {
    // $FlowFixMe
    return {};
}

export type CreateBillingAgreement = XCreateBillingAgreement;

export function getCreateBillingAgreement({ createBillingAgreement, paymentSource } : {| createBillingAgreement : ?XCreateBillingAgreement, paymentSource : $Values<typeof FUNDING> | null |}) : ?CreateBillingAgreement {
    if (createBillingAgreement) {
        return () => {
            return createBillingAgreement(buildXCreateBillingAgreementData({ paymentSource }), buildXCreateBillingAgreementActions()).then(billingToken => {
                if (!billingToken || typeof billingToken !== 'string') {
                    throw new Error(`Expected a billing token to be passed to createBillingAgreement`);
                }

                return billingToken;
            });
        };
    }
}
