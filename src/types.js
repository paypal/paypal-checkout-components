/* @flow */

declare var __FILE_VERSION__ : string;
declare var __MINOR_VERSION__ : string;
declare var __FILE_NAME__ : string;
declare var __TEST__ : string;
declare var __DEFAULT_LOG_LEVEL__ : string;
declare var __LEGACY_SUPPORT__ : boolean;
declare var __IE_POPUP_SUPPORT__ : boolean;

export type CrossDomainWindowType = {|
    location : string | Object,
    self : CrossDomainWindowType,
    closed : boolean,
    open : (string, string, string) => CrossDomainWindowType,
    close : () => void
|};

export type SameDomainWindowType = Object & {
    location : string | Object,
    self : CrossDomainWindowType,
    closed : boolean,
    open : (string, string, string) => CrossDomainWindowType,
    close : () => void,
    XMLHttpRequest : typeof XMLHttpRequest,
    document : Document
};
