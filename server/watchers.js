/* @flow */

import { poll } from 'grabthar';

import type { CacheType } from './types';
import type { LoggerBufferType } from './lib';
import { BUTTON_RENDER_MODULE, BUTTON_CLIENT_MODULE, MODULE_POLL_INTERVAL, SDK_CDN_NAMESPACE, SMART_BUTTONS_CDN_NAMESPACE,
    BUTTON_RENDER_CHILD_MODULE, LATEST_TAG, ACTIVE_TAG } from './config';

let paypalSDKWatcher;
let paypalSmartButtonsWatcher;

type Watcher = {|
    get : (tag? : string) => Promise<{|
        version : string
    |}>,
    // eslint-disable-next-line no-undef
    importDependency : <T>(string, string) => Promise<T>,
    read : (string) => Promise<string>
|};

export function getPayPalSDKWatcher({ logBuffer, cache } : {| logBuffer : ?LoggerBufferType, cache : ?CacheType |}) : Watcher {
    if (!cache || !logBuffer) {
        throw new Error(`Cache and logBuffer required`);
    }

    paypalSDKWatcher = paypalSDKWatcher || poll({
        cdnRegistry:  SDK_CDN_NAMESPACE,
        name:         BUTTON_RENDER_MODULE,
        tags:         [ LATEST_TAG, ACTIVE_TAG ],
        period:       MODULE_POLL_INTERVAL,
        childModules: [ BUTTON_RENDER_CHILD_MODULE ],
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
        name:         BUTTON_CLIENT_MODULE,
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
    }

    if (paypalSmartButtonsWatcher) {
        paypalSmartButtonsWatcher.cancel();
    }
}
