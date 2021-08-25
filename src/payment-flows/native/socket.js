/* @flow */

import { memoize, stringifyError, noop } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FPTI_KEY } from '@paypal/sdk-constants/src';

import type { Config } from '../../button/props';
import { firebaseSocket, type MessageSocket, type FirebaseConfig } from '../../api';
import { getLogger } from '../../lib';
import { FPTI_STATE, FPTI_TRANSITION, FPTI_CUSTOM_KEY } from '../../constants';
import { type OnShippingChangeData } from '../../props/onShippingChange';

const SOURCE_APP = 'paypal_smart_payment_buttons';
const TARGET_APP = 'paypal_native_checkout';

const SOCKET_MESSAGE = {
    ON_INIT:            'onInit',
    ON_SHIPPING_CHANGE: 'onShippingChange',
    ON_APPROVE:         'onApprove',
    ON_CANCEL:          'onCancel',
    ON_ERROR:           'onError',
    ON_FALLBACK:        'onFallback'
};

type NativeSocketOptions = {|
    sessionUID : string,
    firebaseConfig : FirebaseConfig,
    version : string
|};

type NativeConnection = {|
    cancel : () => ZalgoPromise<void>
|};

const getNativeSocket = memoize(({ sessionUID, firebaseConfig, version } : NativeSocketOptions) : MessageSocket => {
    const nativeSocket = firebaseSocket({
        sessionUID,
        sourceApp:        SOURCE_APP,
        sourceAppVersion: version,
        targetApp:        TARGET_APP,
        config:           firebaseConfig
    });
    
    nativeSocket.onError(err => {
        const stringifiedError = stringifyError(err);
        if (stringifiedError && stringifiedError.toLowerCase().indexOf('permission_denied') === -1) {
            getLogger().error('native_socket_error', { err: stringifiedError })
                .track({
                    [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                    [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_APP_SWITCH_ACK,
                    [FPTI_CUSTOM_KEY.ERR_DESC]: `[Native Socket Error] ${ stringifiedError }`
                }).flush();
        }
    });

    return nativeSocket;
});

type ConnectNativeOptions = {|
    sessionUID : string,
    config : Config,
    callbacks : {|
        onInit : () => ZalgoPromise<{|
            buttonSessionID : string
        |}>,
        onApprove : ({|
            data : {|
                payerID : string,
                paymentID? : string,
                billingToken? : string
            |}
        |}) => ZalgoPromise<{|
            buttonSessionID : string
        |}>,
        onCancel : () => ZalgoPromise<{|
            buttonSessionID : string
        |}>,
        onShippingChange : ({|
            data : OnShippingChangeData
        |}) => ZalgoPromise<{|
            resolved : boolean
        |}>,
        onError : ({|
            data : {|
                message : string
            |}
        |}) => ZalgoPromise<{|
            buttonSessionID : string
        |}>,
        onFallback : ({|
            data? : {|
                type? : string,
                skip_native_duration? : number,
                fallback_reason? : string
            |}
        |}) => ZalgoPromise<{|
            buttonSessionID : string
        |}>
    |}
|};

export function connectNative({ config, sessionUID, callbacks } : ConnectNativeOptions) : NativeConnection {
    const { onInit, onApprove, onCancel, onShippingChange, onError, onFallback } = callbacks;
    const { firebase: firebaseConfig, sdkVersion } = config;

    if (!firebaseConfig) {
        throw new Error(`Firebase config not found`);
    }

    const socket = getNativeSocket({
        sessionUID, firebaseConfig, version: sdkVersion
    });

    const onInitListener = socket.on(SOCKET_MESSAGE.ON_INIT, onInit);
    const onShippingChangeListener = socket.on(SOCKET_MESSAGE.ON_SHIPPING_CHANGE, onShippingChange);
    const onApproveListener = socket.on(SOCKET_MESSAGE.ON_APPROVE, onApprove);
    const onCancelListener = socket.on(SOCKET_MESSAGE.ON_CANCEL, onCancel);
    const onErrorListener = socket.on(SOCKET_MESSAGE.ON_ERROR, onError);
    const onFallbackListener = socket.on(SOCKET_MESSAGE.ON_FALLBACK, onFallback);

    const cancel = () => {
        return ZalgoPromise.all([
            onInitListener.cancel(),
            onShippingChangeListener.cancel(),
            onApproveListener.cancel(),
            onCancelListener.cancel(),
            onErrorListener.cancel(),
            onFallbackListener.cancel()
        ]).then(noop);
    };

    return {
        cancel
    };
}
