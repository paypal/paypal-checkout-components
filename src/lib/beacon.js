
const BEACON_URL = 'https://www.paypal.com/webapps/hermes/api/logger';

export function uniqueID() {

    let chars = '0123456789abcdef';

    return 'xxxxxxxxxx'.replace(/./g, () => {
        return chars.charAt(Math.floor(Math.random() * chars.length));
    });
}

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

export function checkpoint(name) {
    try {

        let version = __MINOR_VERSION__.replace(/[^0-9]+/g, '_');
        let checkpointName = `${version}_${name}`;
        let logged = (loggedCheckpoints.indexOf(checkpointName) !== -1);

        loggedCheckpoints.push(checkpointName);

        if (logged) {
            checkpointName = `${checkpointName}_dupe`;
        }

        return beacon(checkpointName);

    } catch (err) {

        // pass
    }
}
