/* @flow */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { stringifyError } from '@krakenjs/belter/src';
import { FPTI_KEY } from '@paypal/sdk-constants/src';

import { confirmOrderAPI, type ConfirmData } from '../api';
import { FPTI_STATE, FPTI_TRANSITION, FPTI_CONTEXT_TYPE } from '../constants';
import { getLogger } from '../lib';

type ConfirmPaload = {|
    orderID : string,
    payload : ConfirmData
|};

export type ConfirmOrder = (payload : ConfirmPaload) => ZalgoPromise<void>;

type ConfirmOrderXProps = {|
    orderID : string,
    payload : ConfirmData,
    partnerAttributionID : ?string
|};

export function getConfirmOrder({ orderID, payload, partnerAttributionID } : ConfirmOrderXProps, { facilitatorAccessToken } : {| facilitatorAccessToken : string |}) : ZalgoPromise<void> {
    const startTime = Date.now();

    return ZalgoPromise.try(() => {
        return confirmOrderAPI(orderID, payload, { facilitatorAccessToken, partnerAttributionID });
    })
        .catch(err => {
            getLogger().error('confirm_order_error', { err: stringifyError(err) });
            throw err;
        })
        .then(() => {
            const duration = Date.now() - startTime;

            getLogger().track({
                [FPTI_KEY.STATE]:              FPTI_STATE.BUTTON,
                [FPTI_KEY.TRANSITION]:         FPTI_TRANSITION.CONFIRM_ORDER,
                [FPTI_KEY.CONTEXT_TYPE]:       FPTI_CONTEXT_TYPE.ORDER_ID,
                [FPTI_KEY.CONTEXT_ID]:         orderID,
                [FPTI_KEY.TOKEN]:              orderID,
                [FPTI_KEY.RESPONSE_DURATION]:  duration.toString()
            }).flush();
        });
}
