/* @flow */

import { ENV, DEFAULT_COUNTRY, COUNTRY_LANGS } from '@paypal/sdk-constants';

import type { ExpressRequest, ExpressResponse, LocaleType } from '../../types';
import { getCSPNonce } from '../../lib';

type ParamsType = {|
    env : $Values<typeof ENV>,
    clientID : string,
    locale? : LocaleType,
    debug? : boolean
|};

type RequestParams = {|
    env : $Values<typeof ENV>,
    clientID : ?string,
    cspNonce : string,
    locale : LocaleType,
    debug : boolean
|};

export function getParams(params : ParamsType, req : ExpressRequest, res : ExpressResponse) : RequestParams {
    const {
        env,
        clientID,
        locale = {},
        debug = false
    } = params;

    const {
        country = DEFAULT_COUNTRY,
        lang = COUNTRY_LANGS[country][0]
    } = locale;

    const cspNonce = getCSPNonce(res);

    return {
        env,
        clientID,
        cspNonce,
        debug:  Boolean(debug),
        locale: { country, lang }
    };
}
