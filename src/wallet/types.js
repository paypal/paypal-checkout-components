/* @flow */

export type FundingInstrumentType = {|
    id : string,
    name : string,
    issuerProductDescription : string,
    instrumentSubType : string,
    lastDigits : string,
    isPreferred : boolean,
    image : {|
        url : {|
            href : string
        |},
        width : string,
        height : string
    |}
|};

export type PlanType = {|
    id : string
|};

export type FundingOptionType = {|
    id : string,
    fundingInstrument : FundingInstrumentType,
    isPreferred : boolean,
    allPlans : $ReadOnlyArray<PlanType>
|};


export type CheckoutSessionType = {|
    declinedInstruments : [],
    fundingOptions : $ReadOnlyArray<FundingOptionType>
|};

export type CheckoutSession = {|
    declinedInstruments : $ReadOnlyArray<{||}>,
    fundingOptions : $ReadOnlyArray<{|
        allPlans : $ReadOnlyArray<{|
            id : string
        |}>
    |}>
|};
