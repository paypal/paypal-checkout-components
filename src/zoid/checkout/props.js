/* @flow */

import type { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING, ENV, type LocaleType } from '@paypal/sdk-constants/src';

export type OnApproveData = {|
    orderID : string,
    payerID : string,
    paymentID? : string
|};

export type OnApproveActions = {|
    
|};

export type OnCancelData = {|
    orderID : string,
    paymentID? : string
|};

export type OnCancelActions = {|
    
|};

export type CheckoutPropsType = {|
    createOrder : () => ZalgoPromise<string>,
    createAuthCode : () => ZalgoPromise<string>,
    onApprove : (OnApproveData, OnApproveActions) => ?ZalgoPromise<void>,
    onCancel? : (OnCancelData, OnCancelActions) => ?ZalgoPromise<void>,
    fundingSource : $Values<typeof FUNDING>,
    env : $Values<typeof ENV>,
    stage? : string,
    stageUrl? : string,
    locale : LocaleType,
    style : {|
    
    |},
    nonce : string,
    csp : {|
        nonce : string
    |},
    inlinexo : boolean
|};
