/* @flow */

import { poll } from 'grabthar';

import type { CacheType } from './types';
import type { LoggerBufferType } from './lib';
import { SDK_RELEASE_MODULE, SMART_BUTTONS_MODULE, MODULE_POLL_INTERVAL, SDK_CDN_NAMESPACE, SMART_BUTTONS_CDN_NAMESPACE,
    CHECKOUT_COMPONENTS_MODULE, LATEST_TAG, ACTIVE_TAG } from './config';

let paypalSDKWatcher;
let paypalSmartButtonsWatcher;

type Watcher = {|
    get : (tag? : string) => Promise<{|
        version : string
    |}>,
    // eslint-disable-next-line no-undef
    import : <T>(string, string) => Promise<T>,
    // eslint-disable-next-line no-undef
    importDependency : <T>(string, string, string) => Promise<T>,
    read : (string, string) => Promise<string>
|};

export function getPayPalSDKWatcher({ logBuffer, cache } : {| logBuffer : ?LoggerBufferType, cache : ?CacheType |}) : Watcher {
    if (!cache || !logBuffer) {
        throw new Error(`Cache and logBuffer required`);
    }

    paypalSDKWatcher = paypalSDKWatcher || poll({
        cdnRegistry:  SDK_CDN_NAMESPACE,
        name:         SDK_RELEASE_MODULE,
        tags:         [ LATEST_TAG, ACTIVE_TAG ],
        period:       MODULE_POLL_INTERVAL,
        childModules: [ CHECKOUT_COMPONENTS_MODULE ],
        flat:         true,
        dependencies: true,
        logger:       logBuffer,
        cache
    });

    return paypalSDKWatcher;
}

export function getPayPalSmartPaymentButtonsWatcher({ logBuffer, cache } : {| logBuffer : ?LoggerBufferType, cache : ?CacheType |}) : Watcher {
    if (!cache || !logBuffer) {
        throw new Error(`Cache and logBuffer required`);
    }

    paypalSmartButtonsWatcher = paypalSmartButtonsWatcher || poll({
        cdnRegistry:  SMART_BUTTONS_CDN_NAMESPACE,
        name:         SMART_BUTTONS_MODULE,
        tags:         [ LATEST_TAG, ACTIVE_TAG ],
        period:       MODULE_POLL_INTERVAL,
        flat:         true,
        dependencies: false,
        logger:       logBuffer,
        cache
    });
    
    return paypalSmartButtonsWatcher;
}

export function startWatchers({ logBuffer, cache } : {| logBuffer : ?LoggerBufferType, cache : ?CacheType |} = {}) {
    getPayPalSDKWatcher({ logBuffer, cache });
    getPayPalSmartPaymentButtonsWatcher({ logBuffer, cache });
}

export function cancelWatchers() {
    if (paypalSDKWatcher) {
        paypalSDKWatcher.cancel();
        paypalSDKWatcher = null;
    }

    if (paypalSmartButtonsWatcher) {
        paypalSmartButtonsWatcher.cancel();
        paypalSmartButtonsWatcher = null;
    }
}
