/* @flow */

import { awaitKey, extendUrl } from '../lib';

let popupBridgeOpener;

export function getPopupBridgeOpener(popupBridge : ?Object = window.popupBridge) : ?Function {

    if (popupBridgeOpener) {
        return popupBridgeOpener;
    }

    if (popupBridge) {
        popupBridgeOpener = (url, callback) => {

            if (!popupBridge) {
                throw new Error('Popup Bridge not available');
            }

            popupBridge.onComplete = callback;
            popupBridge.open(extendUrl(url, { redirect_uri: popupBridge.getReturnUrlPrefix() }));
        };

        return popupBridgeOpener;
    }


    if (window.xprops && window.xprops.popupBridge && window.xprops.popupBridge.open) {
        popupBridgeOpener = window.xprops.popupBridge.open;

        return popupBridgeOpener;
    }
}

export function clearPopupBridgeOpener() {
    popupBridgeOpener = null;
}

export function awaitPopupBridgeOpener() : SyncPromise<Function> {

    if (window.xprops && window.xprops.popupBridge) {
        return window.xprops.popupBridge.awaitOpener().then(opener => {
            popupBridgeOpener = opener;
            return opener;
        });
    }

    return awaitKey(window, 'popupBridge').then(popupBridge => {
        return getPopupBridgeOpener(popupBridge);
    });
}
