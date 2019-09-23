/* @flow */

export type Enum<T> = {
    [string] : T
};

export type DimensionsType = {|
    width : number,
    height : number
|};

export type LocaleType = {|
    country : string,
    lang : string
|};

export type FundingSource = string;
// eslint-disable-next-line flowtype/no-mutable-array
export type FundingList = Array<FundingSource>;
export type FundingSelection = {|
    allowed : FundingList,
    disallowed : FundingList,
    remembered : FundingList
|};

export type CheckoutCustomizationType = {|
    tagline : {
        text : string,
        tracking : {
            impression : string,
            click : string
        }
    },
    buttonText : ?{
        text : string,
        tracking : {
            impression : string,
            click : string
        }
    }
|};
