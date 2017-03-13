/* @flow */

import { config } from '../config';
import { awaitKey, extendUrl } from '../lib';

export function validateProps(props : Object, required : boolean = true) {

    if (!required) {
        return;
    }

    if (props.env && !config.paypalUrls[props.env]) {
        throw new Error(`Invalid env: ${props.env}`);
    }

    if (!props.payment) {
        throw new Error(`Must specify payment method`);
    }

    if (!props.onAuthorize) {
        throw new Error(`Must specify onAuthorize callback`);
    }
    
    if (props.style && props.style.size) {
        if (config.buttonSizes.indexOf(props.style.size) === -1) {
            throw new Error(`Invalid button size: ${props.style.size}`);
        }
    }

    if (props.style && props.style.label) {
        if (props.style.label !== 'checkout' && props.style.label !== 'credit') {
            throw new Error(`Invalid label for button: ${props.style.label}`);
        }
    }

    // Tiny size for credit button is not supported 
    if (props.style && props.style.label === 'credit' && props.style.size === 'tiny') {
        throw new Error(`Invalid credit button size: ${props.style.size}`);
    }

    // Custom colors for credit buttons are not supported 
    if (props.style && props.style.label === 'credit' && props.style.color) {
        throw new Error(`Custom colors for credit button are not supported`);
    }

    let env = props.env || config.env;

    if (props.client) {
        let clientID = props.client[env];

        if (!clientID) {
            throw new Error(`Client ID not found for env: ${env}`);
        }

        if (clientID.match(/^(.)\1+$/)) {
            throw new Error(`Invalid client ID: ${clientID}`);
        }
    }
}

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
