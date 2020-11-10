/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { stringifyError } from 'belter/src';

import { upgradeFacilitatorAccessToken } from '../api';
import { getLogger } from '../lib';

import type { CreateOrder } from './createOrder';

export type XOnAuthDataType = {|
    accessToken : ?string
|};

export type OnAuth = (params : XOnAuthDataType) => ZalgoPromise<string | void>;

export function getOnAuth({ facilitatorAccessToken, createOrder, upgradeLSAT } : {| facilitatorAccessToken : string, createOrder : CreateOrder, upgradeLSAT : boolean |}) : OnAuth {

    return ({ accessToken } : XOnAuthDataType) => {
        getLogger().info(`spb_onauth_access_token_${ accessToken ? 'present' : 'not_present' }`);

        return ZalgoPromise.try(() => {
            if (accessToken) {
                if (upgradeLSAT) {
                    return createOrder()
                        .then(orderID => upgradeFacilitatorAccessToken(facilitatorAccessToken, { buyerAccessToken: accessToken, orderID }))
                        .then(() => {
                            getLogger().info('upgrade_lsat_success');

                            return accessToken;
                        })
                        .catch(err => {
                            getLogger().warn('upgrade_lsat_failure', { error: stringifyError(err) });

                            return accessToken;
                        });
                }
                return accessToken;
            }
        });
    };
}
