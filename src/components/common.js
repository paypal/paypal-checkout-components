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

let bridgeOpen;

export function getBridgeOpen(bridge : ?Object = window.popupBridge) : ?Function {

    if (bridgeOpen) {
        return bridgeOpen;
    }

    if (bridge) {
        bridgeOpen = (url, callback) => {
            if (bridge) {
                bridge.onComplete = callback;
                bridge.open(extendUrl(url, { redirect_uri: window.popupBridge.getReturnUrlPrefix() }));
            } else {
                throw new Error('Bridge not available');
            }
        };

    } else if (window.xprops && window.xprops.bridge && window.xprops.bridge.open) {
        bridgeOpen = window.xprops.bridge.open;
    }

    return bridgeOpen;
}

export function clearBridge() {
    bridgeOpen = null;
}

export function awaitBridgeOpen() : SyncPromise<Function> {
    if (window.xprops && window.xprops.bridge && window.xprops.bridge.get) {
        return window.xprops.bridge.get().then(open => {
            bridgeOpen = open;
            return open;
        });
    }

    return awaitKey(window, 'popupBridge').then(bridge => {
        return getBridgeOpen(bridge);
    });
}

awaitBridgeOpen().then(open => {
    bridgeOpen = open;
});
