/* @flow */
/* eslint max-depth: off */

import type { ExpressRequest, ExpressResponse } from '../../types';
import { getCSPNonce, makeError } from '../../lib';
import { ERROR_CODE } from '../../config';

type NativePopupInputParams = {|
    debug? : boolean,
    parentDomain? : string
|};

type NativePopupParams = {|
    cspNonce : string,
    debug : boolean,
    parentDomain : string
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
    if (!parentDomain.match(/\.paypal\.com(:\d{1,4})?$/)) {
        throw new makeError(ERROR_CODE.VALIDATION_ERROR, `Expected paypal parentDomain`);
    }

    return parentDomain;
}

export function getNativePopupParams(params : NativePopupInputParams, req : ExpressRequest, res : ExpressResponse) : NativePopupParams {
    const {
        debug = false
    } = params;

    const cspNonce = getCSPNonce(res);
    const parentDomain = getParentDomain(params);

    return {
        cspNonce,
        parentDomain,
        debug: Boolean(debug)
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
