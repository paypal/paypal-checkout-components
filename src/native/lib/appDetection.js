/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { ENV, FUNDING } from '@paypal/sdk-constants/src';

import { isIOSSafari } from '../../lib';

const ANDROID_PAYPAL_APP_ID = 'com.paypal.android.p2pmobile';
const ANDROID_VENMO_APP_ID  = 'com.venmo';
const ANDROID_VENMO_DEBUG_APP_ID = 'com.venmo.fifa';

type AndroidApp = {|
    id? : string,
    version? : string
|};

function isAndroidAppInstalled(appId : string) : ZalgoPromise<?AndroidApp> {
    // assume true unless we can prove false
    if (window.navigator && window.navigator.getInstalledRelatedApps) {
        return window.navigator.getInstalledRelatedApps()
            .then(apps => {
                if (apps && apps.length) {
                    const foundApp = apps.find(app => app.id === appId);
                    if (foundApp) {
                        const id = foundApp.id;
                        const version = foundApp.version;

                        return ZalgoPromise.resolve({ id, installed: true, version });
                    } else {
                        return ZalgoPromise.resolve({ installed: false });
                    }
                }
                
                return ZalgoPromise.resolve(null);
            });
    }

    return ZalgoPromise.resolve(null);
}

function isAndroidPayPalAppInstalled() : ZalgoPromise<?AndroidApp> {
    return isAndroidAppInstalled(ANDROID_PAYPAL_APP_ID).then(app => {
        if (app) {
            return { ...app };
        }

        return null;
    });
}

function isAndroidVenmoAppInstalled({ env }) : ZalgoPromise<?AndroidApp> {
    if (env === ENV.PRODUCTION) {
        return isAndroidAppInstalled(ANDROID_VENMO_APP_ID).then(app => {
            if (app) {
                return { ...app };
            }

            return null;
        });
    } else {
        return isAndroidAppInstalled(ANDROID_VENMO_DEBUG_APP_ID).then(app => {
            if (app) {
                return { ...app };
            }

            return null;
        });
    }
}

export function isAppInstalled({ fundingSource, env } : {| fundingSource : $Values<typeof FUNDING>, env : $Values<typeof ENV> |}) : ZalgoPromise<?AndroidApp> {
    if (isIOSSafari()) {
        return ZalgoPromise.resolve(null);
    }

    switch (fundingSource) {
    case FUNDING.PAYPAL:
        return isAndroidPayPalAppInstalled();

    case FUNDING.VENMO:
        return isAndroidVenmoAppInstalled({ env });

    default:
        return ZalgoPromise.reject(`App detection not supported for ${ fundingSource } apps.`);
    }
}
