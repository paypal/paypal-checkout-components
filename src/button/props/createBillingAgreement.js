/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';

export type XCreateBillingAgreementDataType = {|
    
|};

export type XCreateBillingAgreementActionsType = {|

|};

export type XCreateBillingAgreement = (XCreateBillingAgreementDataType, XCreateBillingAgreementActionsType) => ZalgoPromise<string>;

export function buildXCreateBillingAgreementData() : XCreateBillingAgreementDataType {
    // $FlowFixMe
    return {};
}

export function buildXCreateBillingAgreementActions() : XCreateBillingAgreementActionsType {
    // $FlowFixMe
    return {};
}
