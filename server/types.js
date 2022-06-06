/* @flow */

import { COUNTRY, LANG } from '@paypal/sdk-constants';

export class SDKVersionManager {
    getLiveVersion: () => string

    getOrInstallSDK: ({|
        cdnRegistry:  string,
        childModules: $ReadOnlyArray<string>,
        flat:         boolean,
        dependencies: boolean,
        logger:       Object,
        cache: Object
    |}) => {|
        nodeModulesPath : string,
        modulePath : string,
        version : string,
        dependencies : {
            [string] : {|
                version : string,
                path : string
            |}
        }
    |}
}

export type ExpressRequest = express$Request & {| // eslint-disable-line no-undef
    correlationId? : string,
    model? : {|
        rootTxn? : {|
            name? : string,
            data : mixed
        |}
    |}
|};

export type ExpressResponse = express$Response; // eslint-disable-line no-undef

export type LoggerPayload = {
    [ string ] : string | number | null | void
};

export type LoggerType = {|
    debug : (req : ExpressRequest, event : string, payload : ?LoggerPayload) => void,
    info : (req : ExpressRequest, event : string, payload : ?LoggerPayload) => void,
    warn : (req : ExpressRequest, event : string, payload : ?LoggerPayload) => void,
    error : (req : ExpressRequest, event : string, payload : ?LoggerPayload) => void,
    track : (req : ExpressRequest, payload : LoggerPayload, meta : ?Object) => void
|};

export type CacheType = {|
    get : (string) => Promise<string | void>,
    set : (string, string) => Promise<string>
|};

export type LocaleType = {|
    country : $Values<typeof COUNTRY>,
    lang : $Values<typeof LANG>
|};

export type FirebaseConfig = {|
    apiKey : string,
    authDomain : string,
    databaseURL : string,
    projectId : string,
    storageBucket : string,
    messagingSenderId : string,
    appId : string,
    measurementId : string
|};

export type RiskData = {|
    
|};

export type InstanceLocationInformation = {|
    cdnHostName : string,
    paypalDomain : string
|};

export type SDKLocationInformation = {|
    sdkCDNRegistry : ?string,
    sdkActiveTag : ?string
|};

export type SDKMeta = {|
    getSDKLoader : ({| nonce? : ?string |}) => string
|};

export type ErrorArgument = {|
    res : ExpressResponse,
    meta : SDKMeta,
    errorMessage : string
|};
