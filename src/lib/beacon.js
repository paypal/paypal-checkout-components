/* @flow weak */

const BEACON_URL = 'https://www.paypal.com/webapps/hermes/api/logger';

export function beacon(event, payload = {}) {
    try {

        payload.event = `ppxo_${event}`;
        payload.version = __MINOR_VERSION__;
        payload.host = window.location.host;
        payload.uid = window.pp_uid;

        let query = [];

        for (let key in payload) {
            if (payload.hasOwnProperty(key)) {
                query.push(`${encodeURIComponent(key)}=${encodeURIComponent(payload[key])}`);
            }
        }

        query = query.join('&');

        if (!__TEST__) {
            let beaconImage = new window.Image();
            beaconImage.src = `${BEACON_URL}?${query}`;
        }

    } catch (err) {
        // pass
    }
}

let loggedCheckpoints = [];

export function checkpoint(name, payload = {}) {
    try {

        let version = __MINOR_VERSION__.replace(/[^0-9]+/g, '_');
        let checkpointName = `${version}_${name}`;
        let logged = (loggedCheckpoints.indexOf(checkpointName) !== -1);

        loggedCheckpoints.push(checkpointName);

        if (logged) {
            checkpointName = `${checkpointName}_dupe`;
        }

        return beacon(checkpointName, payload);

    } catch (err) {

        // pass
    }
}


const FPTI_URL = 'https://t.paypal.com/ts';

function buildPayload() {
    return {
        v:     `checkout.js.${__MINOR_VERSION__}`,
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

export function fpti(payload = {}) {

    let query = [];

    payload = { ...buildPayload(), ...payload };

    for (let key in payload) {
        if (payload.hasOwnProperty(key)) {
            query.push(`${encodeURIComponent(key)}=${encodeURIComponent(payload[key])}`);
        }
    }

    query = query.join('&');

    try {
        let beaconImage = new window.Image();
        beaconImage.src = `${FPTI_URL}?${query}`;
    } catch (err) {
        // pass
    }
}
