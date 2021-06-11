/* @flow */

import { getUserAgent, memoize, stringifyError, noop } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { ENV, FPTI_KEY, FUNDING } from '@paypal/sdk-constants/src';

import type { ButtonProps, ServiceData, Config } from '../../button/props';
import { firebaseSocket, type MessageSocket, type FirebaseConfig } from '../../api';
import { getLogger } from '../../lib';
import { FPTI_STATE, FPTI_TRANSITION, FPTI_CUSTOM_KEY } from '../../constants';
import { type OnShippingChangeData } from '../../props/onShippingChange';

import { getWebCheckoutUrl } from './url';
import { isNativeOptedIn } from './eligibility';

const SOURCE_APP = 'paypal_smart_payment_buttons';
const TARGET_APP = 'paypal_native_checkout';

const SOCKET_MESSAGE = {
    SET_PROPS:          'setProps',
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

type NativeSDKSocketProps = {|
    orderID : string,
    facilitatorAccessToken : string,
    pageUrl : string,
    commit : boolean,
    userAgent : string,
    buttonSessionID : string,
    env : $Values<typeof ENV>,
    webCheckoutUrl : string,
    stageHost : ?string,
    apiStageHost : ?string,
    forceEligible : boolean
|};

type NativeConnection = {|
    setProps : () => ZalgoPromise<void>,
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

type GetSDKSocketPropsOptions = {|
    props : ButtonProps,
    serviceData : ServiceData,
    fundingSource : $Values<typeof FUNDING>
|};

function getSDKSocketProps({ props, serviceData, fundingSource } : GetSDKSocketPropsOptions) : ZalgoPromise<NativeSDKSocketProps> {
    const { createOrder, commit, buttonSessionID, env, stageHost, apiStageHost } = props;
    const { facilitatorAccessToken } = serviceData;

    return createOrder().then(orderID => {
        const userAgent = getUserAgent();
        const webCheckoutUrl = getWebCheckoutUrl({ orderID, props, fundingSource, facilitatorAccessToken });
        const forceEligible = isNativeOptedIn({ props });
        const pageUrl = '';

        return {
            orderID, facilitatorAccessToken, pageUrl, commit, webCheckoutUrl,
            userAgent, buttonSessionID, env, stageHost, apiStageHost, forceEligible
        };
    });
}

function instrumentNativeSDKProps(props : NativeSDKSocketProps) {
    const sanitizedProps = {
        ...props,
        facilitatorAccessToken: props.facilitatorAccessToken ? '********************' : ''
    };

    getLogger().info('native_setprops_request', sanitizedProps).track({
        [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_SET_PROPS_ATTEMPT
    }).flush();
}

type ConnectNativeOptions = {|
    props : ButtonProps,
    serviceData : ServiceData,
    fundingSource : $Values<typeof FUNDING>,
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
        onFallback : () => ZalgoPromise<{|
            buttonSessionID : string
        |}>
    |}
|};

export function connectNative({ props, serviceData, config, fundingSource, sessionUID, callbacks } : ConnectNativeOptions) : NativeConnection {
    const { onInit, onApprove, onCancel, onShippingChange, onError, onFallback } = callbacks;
    const { firebase: firebaseConfig, sdkVersion } = config;

    if (!firebaseConfig) {
        throw new Error(`Firebase config not found`);
    }

    const socket = getNativeSocket({
        sessionUID, firebaseConfig, version: sdkVersion
    });

    const setNativeProps = () => {
        return getSDKSocketProps({ props, serviceData, fundingSource }).then(sdkProps => {
            getLogger().info(`native_message_setprops`).flush();
            instrumentNativeSDKProps(sdkProps);
            return socket.send(SOCKET_MESSAGE.SET_PROPS, sdkProps);
        }).then(() => {
            getLogger().info(`native_response_setprops`).track({
                [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_APP_SWITCH_ACK
            }).flush();
        }).catch(err => {
            getLogger().info(`native_response_setprops_error`).track({
                [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                [FPTI_CUSTOM_KEY.ERR_DESC]: stringifyError(err)
            }).flush();
        });
    };

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

    socket.reconnect();

    return {
        setProps: setNativeProps,
        cancel
    };
}
