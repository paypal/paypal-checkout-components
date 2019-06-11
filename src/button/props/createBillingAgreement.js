/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';
import { memoize } from 'belter/src';

import type { XProps } from './types';

export type XCreateBillingAgreementDataType = {|
    
|};

export type XCreateBillingAgreementActionsType = {|

|};

export type XCreateBillingAgreement = (?XCreateBillingAgreementDataType, ?XCreateBillingAgreementActionsType) => ZalgoPromise<string>;

export function buildXCreateBillingAgreementData() : XCreateBillingAgreementDataType {
    // $FlowFixMe
    return {};
}

export function buildXCreateBillingAgreementActions() : XCreateBillingAgreementActionsType {
    // $FlowFixMe
    return {};
}

export type CreateBillingAgreement = XCreateBillingAgreement;

export function getCreateBillingAgreement(xprops : XProps) : ?CreateBillingAgreement {
    const { createBillingAgreement } = xprops;

    if (createBillingAgreement) {
        return memoize(() => {
            return createBillingAgreement(buildXCreateBillingAgreementData(), buildXCreateBillingAgreementActions()).then(billingToken => {
                if (!billingToken || typeof billingToken !== 'string') {
                    throw new Error(`Expected a billing token to be passed to createBillingAgreement`);
                }

                return billingToken;
            });
        });
    }
}
