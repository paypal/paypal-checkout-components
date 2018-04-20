/* @flow */

export type Enum<T> = {
    [string] : T
};

export type DimensionsType = {
    width : number,
    height : number
};

export type LocaleType = {
    country : string,
    lang : string
};

export type FundingSource = string;
export type FundingList = Array<FundingSource>;
export type FundingSelection = {
    allowed : FundingList,
    disallowed : FundingList,
    remembered : FundingList
};
