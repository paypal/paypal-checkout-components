/* @flow */

import { poll } from 'grabthar';

import type { CacheType } from './types';
import type { LoggerBufferType } from './lib';
import { SDK_RELEASE_MODULE, SMART_BUTTONS_MODULE, MODULE_POLL_INTERVAL, SDK_CDN_NAMESPACE, SMART_BUTTONS_CDN_NAMESPACE,
    CHECKOUT_COMPONENTS_MODULE, LATEST_TAG, ACTIVE_TAG } from './config';

let paypalSDKWatcher;
let paypalSmartButtonsWatcher;

type ModuleDetails = {|
    nodeModulesPath : string,
    modulePath : string,
    version : string,
    previousVersion : string,
    dependencies : {
        [string] : {|
            version : string,
            path : string
        |}
    }
|};

type Watcher = {|
    get : (tag? : string) => Promise<ModuleDetails>,
    getTag : () => Promise<ModuleDetails>,
    getDeployTag : () => Promise<ModuleDetails>,
    // eslint-disable-next-line no-undef
    import : <T>(string, string) => Promise<T>,
    // eslint-disable-next-line no-undef
    importDependency : <T>(string, string, string) => Promise<T>,
    read : (string, string) => Promise<string>
|};

function logInfo(logBuffer : LoggerBufferType, name : string, moduleDetails : ModuleDetails) {
    const {
        modulePath,
        nodeModulesPath,
        version,
        previousVersion
    } = moduleDetails;

    logBuffer.info(`${ name }_tag_fetched`, { modulePath, nodeModulesPath, version, previousVersion });
    logBuffer.info(`${ name }_version_${ version.replace(/[^0-9]+/g, '_') }`, {});
}

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

    const { get } = paypalSDKWatcher;

    const getTag = () => {
        return get(ACTIVE_TAG).then(tag => {
            if (logBuffer) {
                logInfo(logBuffer, 'render', tag);
            }
            return tag;
        });
    };

    const getDeployTag = () => {
        return get(LATEST_TAG).then(tag => {
            if (logBuffer) {
                logInfo(logBuffer, 'deploy_render', tag);
            }
            return tag;
        });
    };

    return {
        ...paypalSDKWatcher,
        getTag,
        getDeployTag
    };
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

    const { get } = paypalSmartButtonsWatcher;

    const getTag = () => {
        return get(ACTIVE_TAG).then(tag => {
            if (logBuffer) {
                logInfo(logBuffer, 'client', tag);
            }
            return tag;
        });
    };

    const getDeployTag = () => {
        return get(LATEST_TAG).then(tag => {
            if (logBuffer) {
                logInfo(logBuffer, 'deploy_client', tag);
            }
            return tag;
        });
    };

    return {
        ...paypalSmartButtonsWatcher,
        getTag,
        getDeployTag
    };
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
