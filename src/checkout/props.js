/* @flow */

import type { ZalgoPromise } from 'zalgo-promise/src';
import type { CrossDomainWindowType } from 'cross-domain-utils/src';
import { FUNDING, ENV, type LocaleType } from '@paypal/sdk-constants/src';

export type CheckoutPropsType = {|
    payment? : () => ZalgoPromise<string>,
    onAuthorize : ({ returnUrl : string }, { redirect : (?CrossDomainWindowType, ?string) => ZalgoPromise<void> }) => ?ZalgoPromise<void>,
    onCancel? : ({ cancelUrl : string }, { redirect : (?CrossDomainWindowType, ?string) => ZalgoPromise<void> }) => ?ZalgoPromise<void>,
    fundingSource : $Values<typeof FUNDING>,
    env? : $Values<typeof ENV>,
    stage? : string,
    stageUrl? : string,
    locale : LocaleType,
    style : {|
    
    |},
    nonce? : string
|};
