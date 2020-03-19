/* @flow */

import { FPTI_KEY } from '@paypal/sdk-constants/src';
import { stringifyError } from 'belter/src';

import { getLogger } from '../lib';
import { FPTI_TRANSITION, FTPI_CUSTOM_KEY } from '../constants';

import type { PaymentFlow, PaymentFlowInstance } from './types';

const MESSAGE_SOURCE = {
    SMART_BUTTON:    'smart_payment_buttons',
    HONEY_EXTENSION: 'honey_extension'
};

const MESSAGE_NAME = {
    IDENTIFY_EXTENSION: 'identify_extension'
};

function setupHoney() {
    try {
        window.top.postMessage(JSON.stringify({
            message_source: MESSAGE_SOURCE.SMART_BUTTON,
            message_name:   MESSAGE_NAME.IDENTIFY_EXTENSION
        }), '*');
    } catch (err) {
        getLogger().warn('honey_postmessage_failed', { err: stringifyError(err) });
    }

    window.addEventListener('message', ({ data }) => {
        try {
            data = JSON.parse(data);
        } catch (err) {
            return;
        }

        if (!data) {
            return;
        }

        const {
            message_source,
            message_name,
            message_data
        } = data;

        if (message_source !== MESSAGE_SOURCE.HONEY_EXTENSION) {
            return;
        }

        if (message_name === MESSAGE_NAME.IDENTIFY_EXTENSION) {
            const { device_id, session_id } = message_data;

            getLogger().addTrackingBuilder(() => {
                return {
                    [ FTPI_CUSTOM_KEY.HONEY_DEVICE_ID ]:  device_id,
                    [ FTPI_CUSTOM_KEY.HONEY_SESSION_ID ]: session_id
                };
            });

            getLogger().info('identify_honey').track({
                [ FPTI_KEY.TRANSITION ]: FPTI_TRANSITION.HONEY_IDENTIFY
            }).flush();
        }
    });
}

function isHoneyEligible() : boolean {
    return true;
}

function isHoneyPaymentEligible() : boolean {
    return false;
}

function initHoney() : PaymentFlowInstance {
    throw new Error(`Not Implemented`);
}

export const honey : PaymentFlow = {
    name:              'honey',
    setup:             setupHoney,
    isEligible:        isHoneyEligible,
    isPaymentEligible: isHoneyPaymentEligible,
    init:              initHoney,
    inline:            true
};
