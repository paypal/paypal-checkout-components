/* @flow */
/* eslint import/unambiguous: 0 */

import { FUNDING } from 'paypal-sdk-constants/src';

import type { FundingEligibilityType } from './types';

declare var __PAYPAL_CHECKOUT__ : {
    __REMEMBERED_FUNDING__ : $ReadOnlyArray<$Values<typeof FUNDING>>
};

declare var __paypal_checkout__ : {
    serverConfig : {
        fundingEligibility : FundingEligibilityType
    }
};
