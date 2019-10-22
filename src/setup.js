/* @flow */

import { info, track, debug, warn, error, flush as flushLogs } from 'beaver-logger/client';
import { ZalgoPromise } from 'zalgo-promise/src';

import { config } from './config';
import { FPTI } from './constants';
import { initLogger, checkForCommonErrors, setLogLevel, stringifyError,
    stringifyErrorMessage, getResourceLoadTime, isPayPalDomain, isEligible,
    getDomainSetting, once, openMetaFrame, precacheRememberedFunding,
    getCurrentScript, getRememberedFunding } from './lib';
import { Button } from './button';
import { Checkout } from './checkout';
import { pptm } from './external';

function domainToEnv(domain : string) : ?string {
    for (const env of Object.keys(config.paypalUrls)) {
        if (config.paypalUrls[env] === domain) {
            return env;
        }
    }
}

function setDomainEnv(domain : string) {
    const currentDomainEnv = domainToEnv(domain);

    if (currentDomainEnv && currentDomainEnv !== 'test') {
        config.env = currentDomainEnv;
    }
}

setDomainEnv(`${ window.location.protocol }//${ window.location.host }`);

ZalgoPromise.onPossiblyUnhandledException(err => {

    error('unhandled_error', {
        stack:   stringifyError(err),
        errtype: ({}).toString.call(err)
    });

    track({
        [ FPTI.KEY.ERROR_CODE ]: 'checkoutjs_error',
        [ FPTI.KEY.ERROR_DESC ]: stringifyErrorMessage(err)
    });

    return flushLogs().catch(err2 => {
        if (window.console) {
            try {
                if (window.console.error) {
                    window.console.error('Error flushing:', stringifyError(err2));
                } else if (window.console.log) {
                    window.console.log('Error flushing:', stringifyError(err2));
                }
            } catch (err3) {
                setTimeout(() => {
                    throw err3;
                }, 1);
            }
        }
    });
});

const currentScript = getCurrentScript();
const currentProtocol = window.location.protocol.split(':')[0];


type ConfigOptions = {|
    env? : ?string,
    stage? : ?string,
    apiStage? : ?string,
    stageUrl? : ?string,
    localhostUrl? : ?string,
    checkoutUri? : ?string,
    state? : ?string,
    logLevel? : ?string,
    merchantID? : ?string,
    precacheRemembered? : boolean,
    authCode? : ?string
|};

function configure({ env, stage, stageUrl, apiStage, localhostUrl, checkoutUri, state, logLevel, merchantID, authCode } : ConfigOptions = {}) {

    if (env) {
        if (!config.paypalUrls[env]) {
            throw new Error(`Invalid env: ${ env }`);
        }

        delete config.env;
        config.env = env;
    } else if (Button.xprops && Button.xprops.env) {
        delete config.env;
        // $FlowFixMe
        config.env = Button.xprops.env;
    } else if (Checkout.xprops && Checkout.xprops.env) {
        delete config.env;
        // $FlowFixMe
        config.env = Checkout.xprops.env;
    }

    if (stage) {
        delete config.stage;
        config.stage = stage;
    } else if (Button.xprops && Button.xprops.stage) {
        delete config.stage;
        // $FlowFixMe
        config.stage = Button.xprops.stage;
    } else if (Checkout.xprops && Checkout.xprops.stage) {
        delete config.stage;
        // $FlowFixMe
        config.stage = Checkout.xprops.stage;
    }

    if (stageUrl) {
        delete config.stageUrl;
        // $FlowFixMe
        config.stageUrl = stageUrl;
    } else if (Button.xprops && Button.xprops.stageUrl) {
        delete config.stageUrl;
        // $FlowFixMe
        config.stageUrl = Button.xprops.stageUrl;
    } else if (Checkout.xprops && Checkout.xprops.stageUrl) {
        delete config.stageUrl;
        // $FlowFixMe
        config.stageUrl = Checkout.xprops.stageUrl;
    }

    authCode = authCode || (Button.xprops && Button.xprops.authCode) || (Checkout.xprops && Checkout.xprops.authCode);

    if (authCode) {
        delete config.authCode;
        config.authCode = authCode;
    }

    if (apiStage) {
        delete config.apiStage;
        config.apiStage = apiStage;
    }

    localhostUrl = localhostUrl || (Button.xprops && Button.xprops.localhostUrl) || (Checkout.xprops && Checkout.xprops.localhostUrl);
    if (localhostUrl) {
        config.localhostUrl = localhostUrl;
    }

    checkoutUri = checkoutUri || (Button.xprops && Button.xprops.checkoutUri) || (Checkout.xprops && Checkout.xprops.checkoutUri);
    if (checkoutUri) {
        config.checkoutUri = checkoutUri;
    }

    if (state) {
        delete config.state;
        config.state = state;
    }

    if (merchantID) {
        config.merchantID = merchantID;
    }

    if (logLevel) {
        setLogLevel(logLevel);
    } else {
        setLogLevel(config.logLevel);
    }
}

export const init = once(({ precacheRemembered }) => {

    if (!isEligible()) {
        warn('ineligible');
    }

    checkForCommonErrors();

    initLogger();

    if (pptm.shouldCreateInitialPptmScript()) {
        pptm.createPptmScript();
    }

    if (precacheRemembered) {
        precacheRememberedFunding();
    }

    if (getDomainSetting('force_bridge') && !isPayPalDomain()) {
        openMetaFrame(config.env);
    }

    info(`setup_${ config.env }`);

    debug(`current_protocol_${ currentProtocol }`);
});

// $FlowFixMe
export function setup(options : ConfigOptions = {}) {
    configure(options);
    init(options);
}

if (currentScript) {
    setup({
        env:                currentScript.getAttribute('data-env'),
        stage:              currentScript.getAttribute('data-stage'),
        apiStage:           currentScript.getAttribute('data-api-stage'),
        stageUrl:           currentScript.getAttribute('data-stage-url'),
        localhostUrl:       isPayPalDomain() ? currentScript.getAttribute('data-localhost-url') : undefined,
        checkoutUri:        isPayPalDomain() ? currentScript.getAttribute('data-checkout-uri') : undefined,
        state:              currentScript.getAttribute('data-state'),
        logLevel:           currentScript.getAttribute('data-log-level'),
        merchantID:         currentScript.getAttribute('data-merchant-id'),
        authCode:           currentScript.getAttribute('data-auth-code'),
        precacheRemembered: currentScript.hasAttribute('data-precache-remembered-funding')
    });

} else {
    setup();
}

if (!isPayPalDomain()) {

    if (currentScript) {

        const scriptProtocol = currentScript.src.split(':')[0];
        const loadTime = getResourceLoadTime(currentScript.src);

        debug(`current_script_protocol_${ scriptProtocol }`);
        debug(`current_script_protocol_${ currentProtocol === scriptProtocol ? 'match' : 'mismatch' }`);
        debug(`current_script_version_${ config.version.replace(/[^0-9a-zA-Z]+/g, '_') }`);

        if (loadTime) {
            debug(`current_script_time`, { loadTime });
            debug(`current_script_time_${ Math.floor(loadTime / 1000) }`);
        }

        track({
            [ FPTI.KEY.STATE ]:              FPTI.STATE.LOAD,
            [ FPTI.KEY.TRANSITION ]:         FPTI.TRANSITION.SCRIPT_LOAD,
            [ FPTI.KEY.TRANSITION_TIME ]:    loadTime,
            [ FPTI.KEY.FUNDING_REMEMBERED ]: getRememberedFunding().join(',')
        });

    } else {

        debug(`no_current_script`);
        debug(`no_current_script_version_${ config.version.replace(/[^0-9a-zA-Z]+/g, '_') }`);

        if (document.currentScript) {  // eslint-disable-line compat/compat
            debug(`current_script_not_recognized`, { src: document.currentScript.src });  // eslint-disable-line compat/compat
        }

        track({
            [ FPTI.KEY.STATE ]:      FPTI.STATE.LOAD,
            [ FPTI.KEY.TRANSITION ]: FPTI.TRANSITION.SCRIPT_LOAD
        });
    }
}
