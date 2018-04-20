/* @flow */

declare var __MAJOR_VERSION__ : string;
declare var __MINOR_VERSION__ : string;
declare var __FILE_NAME__ : string;
declare var __TEST__ : string;
declare var __DEFAULT_LOG_LEVEL__ : string;
declare var __LEGACY_SUPPORT__ : boolean;
declare var __IE_POPUP_SUPPORT__ : boolean;
declare var __ALLOW_POSTMESSAGE_POPUP__ : boolean;
declare var __MAJOR__ : boolean;
declare var __MINIFIED__: boolean;

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
