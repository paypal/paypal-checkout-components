/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { noop, experiment, isAndroid, isIos, isChrome, isSafari, type Experiment } from 'belter/src';
import { FPTI_KEY } from '@paypal/sdk-constants/src';

import { FPTI_STATE, FPTI_TRANSITION } from '../constants';

import { getLogger } from './logger';

export function unresolvedPromise<T>() : ZalgoPromise<T> {
    return new ZalgoPromise(noop);
}

export function promiseNoop<T>(...args : $ReadOnlyArray<T>) : ZalgoPromise<void> { // eslint-disable-line no-unused-vars
    return ZalgoPromise.resolve();
}

export function getBody() : HTMLBodyElement {
    const body = document.body;

    if (!body) {
        throw new Error(`Document body not found`);
    }

    return body;
}

export function sendBeacon(url : string) {
    const img = document.createElement('img');
    img.src = url;
    img.style.visibility = 'hidden';
    img.style.position = 'absolute';
    if (document.body) {
        document.body.appendChild(img);
    }
}

export function sleep(time : number) : ZalgoPromise<void> {
    return new ZalgoPromise(resolve => {
        setTimeout(resolve, time);
    });
}

export function redirectTop(url : string) {
    if (__TEST__) {
        window.location.hash = url;
    } else {
        window.top.location = url;
    }
}

export function loadScript(url : string) : ZalgoPromise<HTMLScriptElement> {
    return new ZalgoPromise((resolve, reject) => {
        const container = document.body || document.head;

        if (!container) {
            return reject(new Error(`Can not find container for script: ${ url }`));
        }

        const script = document.createElement('script');
        script.setAttribute('src', url);
        script.addEventListener('load', () => resolve(script));
        // $FlowFixMe
        script.addEventListener('error', (err) => reject(err));
        container.appendChild(script);
    });
}

export function promiseOne<T>(promises : $ReadOnlyArray<ZalgoPromise<T>>) : ZalgoPromise<T> {
    return new ZalgoPromise((resolve, reject) => {
        for (const promise of promises) {
            promise.then(resolve, reject);
        }
    });
}

export function isServer() : boolean {
    return (typeof window === 'undefined');
}

export function isClient() : boolean {
    return (typeof window !== 'undefined');
}

export function isEmailAddress(str : string) : boolean {
    return Boolean(str.match(/^.+@.+\..+$/));
}

export function createExperiment(name : string, sample : number) : Experiment {
    const logger = getLogger();

    return experiment({
        name,
        sample,

        logTreatment({ treatment, payload }) {

            // $FlowFixMe
            const fullPayload = {
                [FPTI_KEY.STATE]:           FPTI_STATE.PXP,
                [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.PXP,
                [FPTI_KEY.EXPERIMENT_NAME]: name,
                [FPTI_KEY.TREATMENT_NAME]:  treatment,
                ...payload
            };

            logger.track(fullPayload);
            logger.flush();
        },

        logCheckpoint({ treatment, checkpoint, payload }) {
            logger.info(`${ name }_${ treatment }_${ checkpoint }`, payload);
            logger.flush();
        }
    });
}

export function isIOSSafari() : boolean {
    return isIos() && isSafari();
}

export function isAndroidChrome() : boolean {
    return isAndroid() && isChrome();
}
