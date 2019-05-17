/* @flow */

import { config } from '../config';
import { LOG_LEVEL } from '../constants';

import { getSessionID, getSessionState } from './session';

const BEACON_URL = config.loggerUrl;
const APP_NAME = 'checkoutjs';

export function beacon(event : string, payload : Object = {}) {
    try {

        payload.event = `ppxo_${ event }`;
        payload.version = __PAYPAL_CHECKOUT__.__MINOR_VERSION__;
        payload.host = window.location.host;
        payload.uid = getSessionID();
        payload.appName = APP_NAME;

        let query = [];

        for (const key in payload) {
            if (payload.hasOwnProperty(key)) {
                query.push(`${ encodeURIComponent(key) }=${ encodeURIComponent(payload[key]) }`);
            }
        }

        query = query.join('&');

        if (!__TEST__) {
            const beaconImage = new window.Image();
            beaconImage.src = `${ BEACON_URL }?${ query }`;
        }

        setTimeout(() => {
            if (config.logLevel === LOG_LEVEL.DEBUG) {
                if (window.console && window.console.log) {
                    window.console.log('*', event, payload);
                }
            }
        }, 1);

    } catch (err) {
        // pass
    }
}

function isCheckpointUnique(name : string) : boolean {
    return getSessionState(state => {
        state.loggedBeacons = state.loggedBeacons || [];

        if (state.loggedBeacons.indexOf(name) === -1) {
            state.loggedBeacons.push(name);
            return true;
        }

        return false;
    });
}

export function checkpoint(name : string, payload : Object = {}, options : Object = {}) : void {
    try {
        let checkpointName = name;

        if (options.version) {
            const version = __PAYPAL_CHECKOUT__.__MINOR_VERSION__.replace(/[^0-9]+/g, '_');
            checkpointName = `${ version }_${ checkpointName }`;
        }

        if (!isCheckpointUnique(checkpointName)) {
            return;
        }

        return beacon(checkpointName, payload);

    } catch (err) {

        // pass
    }
}


const FPTI_URL = 'https://t.paypal.com/ts';

function buildPayload() : Object {
    return {
        v:     `checkout.js.${ __PAYPAL_CHECKOUT__.__MINOR_VERSION__ }`,
        t:     Date.now(),
        g:     new Date().getTimezoneOffset(),
        flnm: 'ec:hermes:',
        shir: 'main_ec_hermes_',
        pgrp: 'main:ec:hermes::incontext-merchant',
        page: 'main:ec:hermes::incontext-merchant',
        vers: 'member:hermes:',
        qual: 'incontext',
        tmpl: 'merchant:incontext'
    };
}

export function fpti(payload : Object = {}) {

    let query = [];

    payload = { ...buildPayload(), ...payload };

    for (const key in payload) {
        if (payload.hasOwnProperty(key)) {
            query.push(`${ encodeURIComponent(key) }=${ encodeURIComponent(payload[key]) }`);
        }
    }

    query = query.join('&');

    try {
        const beaconImage = new window.Image();
        beaconImage.src = `${ FPTI_URL }?${ query }`;
    } catch (err) {
        // pass
    }
}
