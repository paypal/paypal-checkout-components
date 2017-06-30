
let { Promise } = window.paypal;
import { $Api } from 'squid-core/dist/api';
import { $cookies } from 'squid-core/dist/config';

import { getAuth } from './api';
import { ACCESS_TOKEN_HEADER } from './constants';

export function isLoggedIn() {
    return getAuth().then(auth => {

        if (auth.guest) {
            return false;
        }

        if (auth.logged_in || auth.remembered || auth.refresh_token) {
            return true;
        }

        return false;
    });
}

export function isCookied() {
    return Boolean($cookies.login_email);
}

export function isRemembered() {

    return Promise.resolve().then(() => {

        if (isCookied()) {
            return true;
        }

        return isLoggedIn();
    });
}

export function persistAccessToken(accessToken) {
    $Api.addHeader(ACCESS_TOKEN_HEADER, accessToken);
}
