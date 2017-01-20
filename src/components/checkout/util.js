/* @flow */

import $logger from 'beaver-logger/client';
import { SyncPromise } from 'sync-browser-mocks/src/promise';

import { match, urlWillRedirectPage } from '../../lib';
import { config } from '../../config';

export function determineParameterFromToken(token : string) : string {
    return token.indexOf('BA-') === 0 ? 'ba_token' : 'token';
}

export function determineUrlFromToken(env : string, token : string) : string {

    if (token.indexOf('BA-') === 0) {
        $logger.info(`url_billing`);
        return config.billingUrls[env];
    }

    if (token.indexOf('PAY-') === 0) {
        $logger.info(`url_payment`);
        return config.checkoutUrls[env];
    }

    if (token.indexOf('EC-') === 0) {
        $logger.info(`url_checkout`);
        return config.checkoutUrls[env];
    }

    $logger.info(`url_default`);
    return config.checkoutUrls[env];
}

export function parseParamsFromUrl(url : string) : { [key : string] : ?string } {
    return {
        paymentToken: match(url, /token=((EC-)?[A-Z0-9]+)/),
        billingToken: match(url, /ba_token=((BA-)?[A-Z0-9]+)/),
        payerID:      match(url, /PayerID=([A-Z0-9]+)/),
        paymentID:    match(url, /paymentId=((PAY-)?[A-Z0-9]+)/)
    };
}

export function redirect(win : typeof window = window, url : string) : SyncPromise<void> {
    return new SyncPromise(resolve => {
        setTimeout(() => {
            win.location = url;
            if (!urlWillRedirectPage(url)) {
                resolve();
            }
        }, 1);
    });
}
