/* @flow */

import { FUNDING } from '@paypal/sdk-constants';

import type { Wallet, InlinePaymentFieldsEligibility } from '../../src/types';

export type GetExperimentsParams = {|
    merchantID : string,
    buttonSessionID : string,
    clientID : string,
    fundingSource : ?$Values<typeof FUNDING>,
    wallet : Wallet,
    locale : {|
        lang : string,
        country : string
    |},
    buyerCountry : string
|};

export type GetExperimentsType = {|
    enableVenmoAppLabel : boolean,
    isFundingSourceBranded : boolean,
    isCardFieldsExperimentEnabled : boolean,
    isInlinePaymentFieldsEligibleExperiment: InlinePaymentFieldsEligibility
|};

export function getDefaultExperiments() : Promise<GetExperimentsType> {
    return Promise.resolve({
        enableVenmoAppLabel:           false,
        isFundingSourceBranded:        false,
        isCardFieldsExperimentEnabled: false,
        isInlinePaymentFieldsEligibleExperiment: {
            inlineEligibleAPMs : [],
            isInlineEnabled : false
        }
    });
}
