/* @flow */
/* eslint max-depth: off */

import { ENV, DEFAULT_COUNTRY, COUNTRY_LANGS, COUNTRY, ERROR_CODE } from '@paypal/sdk-constants';

import type { ExpressRequest, ExpressResponse, LocaleType } from '../../types';
import { getCSPNonce, makeError } from '../../lib';
import { HTTP_HEADER } from '../../config';

import { CHANNEL } from './constants';

export type NativePopupInputParams = {|
    debug? : boolean,
    parentDomain : string,
    clientID : string,
    sessionID : string,
    buttonSessionID : string,
    sdkCorrelationID : string,
    env : $Values<typeof ENV>,
    sdkMeta? : string,
    channel : $Values<typeof CHANNEL>,
    buyerCountry : $Values<typeof COUNTRY>
|};

type NativePopupParams = {|
    cspNonce : string,
    debug : boolean,
    parentDomain : string,
    sessionID : string,
    buttonSessionID : string,
    sdkCorrelationID : string,
    clientID : string,
    locale : LocaleType,
    env : $Values<typeof ENV>,
    buyerCountry : $Values<typeof COUNTRY>
|};

function getParentDomain(params : NativePopupInputParams) : string {
    const { parentDomain } = params;

    if (!parentDomain) {
        throw new makeError(ERROR_CODE.VALIDATION_ERROR, `Parent domain not passed`);
    }

    if (typeof parentDomain !== 'string') {
        throw new makeError(ERROR_CODE.VALIDATION_ERROR, `Expected parentDomain param to be a string`);
    }

    // eslint-disable-next-line security/detect-unsafe-regex
    if (process.env.NODE_ENV !== 'development' && !parentDomain.match(/\.paypal\.com(:\d{1,4})?$/)) {
        throw new makeError(ERROR_CODE.VALIDATION_ERROR, `Expected paypal parentDomain`);
    }

    return parentDomain;
}

function getLocale(params : NativePopupInputParams) : LocaleType {
    let {
        locale: {
            country = DEFAULT_COUNTRY,
            lang
        } = {}
    } = params;

    const langs = COUNTRY_LANGS[country];

    if (!langs) {
        throw makeError(ERROR_CODE.VALIDATION_ERROR, `Invalid locale country: ${ country }`);
    }

    lang = lang || langs[0];

    if (langs.indexOf(lang) === -1) {
        throw makeError(ERROR_CODE.VALIDATION_ERROR, `Invalid locale language: ${ lang }`);
    }

    return {
        country,
        lang
    };
}

function getBuyerCountry(req : ExpressRequest, params : NativePopupInputParams) : $Values<typeof COUNTRY> {
    return params.buyerCountry || req.get(HTTP_HEADER.PP_GEO_LOC) || COUNTRY.US;
}

export function getNativePopupParams(params : NativePopupInputParams, req : ExpressRequest, res : ExpressResponse) : NativePopupParams {
    const {
        debug = false,
        clientID,
        buttonSessionID,
        sessionID,
        sdkCorrelationID,
        env
    } = params;

    const cspNonce = getCSPNonce(res);
    const parentDomain = getParentDomain(params);
    const locale = getLocale(params);
    const buyerCountry = getBuyerCountry(req, params);

    return {
        cspNonce,
        parentDomain,
        debug: Boolean(debug),
        locale,
        buttonSessionID,
        sessionID,
        clientID,
        sdkCorrelationID,
        env,
        buyerCountry
    };
}

type NativeFallbackInputParams = {|
    debug? : boolean
|};

type NativeFallbackParams = {|
    cspNonce : string,
    debug : boolean
|};

export function getNativeFallbackParams(params : NativeFallbackInputParams, req : ExpressRequest, res : ExpressResponse) : NativeFallbackParams {
    const {
        debug = false
    } = params;

    const cspNonce = getCSPNonce(res);

    return {
        cspNonce,
        debug: Boolean(debug)
    };
}
