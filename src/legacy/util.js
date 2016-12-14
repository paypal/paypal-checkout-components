
import logger from 'beaver-logger/client';

import { config, ENV } from '../config';
import { checkpoint, urlWillRedirectPage } from '../lib';

import { REDIRECT_DELAY } from './config';
import { LOG_PREFIX } from './constants';

let $logger = logger.prefix(LOG_PREFIX);

let redirected = false;

export function logRedirect(location) {

    if (redirected) {
        logger.warn(`multiple_redirects`);
    }

    if (location && (location.match(/PayerID=/) || location.match(/ba_token=/))) {
        checkpoint('flow_complete');
    }

    $logger.flush();
}

export function redirect(url) {

    if (config.env === ENV.TEST && urlWillRedirectPage(url)) {
        return setTimeout(() => {
            window.location = `#fullpageRedirect?url=${url}`;
        }, REDIRECT_DELAY);
    }

    logRedirect(url);

    redirected = true;

    setTimeout(() => {
        $logger.info(`redirect`, { url });
        window.location = url;
    }, REDIRECT_DELAY);
}

/*  Parse Token
    -----------

    We are passed either a token, or a url containing the token. In order to run the new checkout component we need to
    strip out the token from the url in order to pass it down as a prop
*/

export function parseToken(token) {

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
