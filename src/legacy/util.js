/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { flush as flushLogs, prefix } from 'beaver-logger/client';

import { config } from '../config';
import { ENV } from '../constants';
import { urlWillRedirectPage, redirect as redir } from '../lib';

import { LOG_PREFIX } from './constants';

const { warn } = prefix(LOG_PREFIX);

let redirected = false;

export function logRedirect(location : string) {

    if (redirected) {
        warn(`multiple_redirects`);
    }

    if (urlWillRedirectPage(location)) {
        redirected = true;
    }

    flushLogs();
}

export function redirect(url : string) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {

        if (!url) {
            throw new Error(`Redirect url undefined`);
        }

        if (config.env === ENV.TEST && urlWillRedirectPage(url)) {
            return redir(window, `#fullpageRedirect?url=${ url }`);
        }

        logRedirect(url);

        return redir(window, url);
    });
}

export function isToken(item : string) : boolean {
    return Boolean(item && item.match(/^(EC-)?[A-Z0-9]{17}$/));
}


/*  Parse Token
    -----------

    We are passed either a token, or a url containing the token. In order to run the new checkout component we need to
    strip out the token from the url in order to pass it down as a prop
*/

export function parseToken(token : string) : ?string {

    if (!token) {
        return;
    }

    token = decodeURIComponent(decodeURIComponent(token));

    // We may get lucky and be passed a token straight off the bar

    if (token.match(/^(EC-)?[A-Z0-9]{17}$/)) {
        return token;
    }

    // Otherwise strip the token from the url we're sent

    let match = token.match(/token=((EC-)?[A-Z0-9]{17})/);

    if (match) {
        return match[1];
    }

    match = token.match(/(EC-[A-Z0-9]{17})/);

    if (match) {
        return match[1];
    }
}

export function hasToken(item : string) : boolean {
    return Boolean(parseToken(item));
}
