/* @flow */

import { track, info } from 'beaver-logger/client';

import { config } from '../config';
import { FPTI, PPTM_ID } from '../constants';
import { stringifyError, extendUrl, loadScript, getElement, isPayPalDomain } from '../lib';


function shouldCreateInitialPptmScript() : boolean {
    const id = window.location.hostname;

    if (!id) {
        return false;
    }

    if (isPayPalDomain()) {
        return false;
    }

    const existingScript = getElement(PPTM_ID);
    const alreadyDownloaded = Boolean(existingScript);

    if (alreadyDownloaded) {
        info('pptm_tried_loading_twice');
        return false;
    }

    return true;
}

function removePptm() {
    const script = getElement(PPTM_ID);

    if (script) {
        // $FlowFixMe
        script.parentNode.removeChild(script);
    }
}

export function pptmFactory() : Object {
    let noContentFoundInContainer = false;
    const callback = `__pptmLoadedWithNoContent`;
    let listener;

    const obj = {
        /*
        In the button component, we set up a global window[callback] that will be called in pptm `onload` attribute.
        Button.render calls `reloadPptmScript`, which checks if window[callback] has been called yet (meaning, it checks
        if pptm.js was loaded before Button.render was called). If so, we'll check to see if we should reload PPTM
        now that we might have a client ID from the Button.render method.
        If pptm.js hasn't loaded yet, then we'll set up a listener to the same logic above to defer it until
        pptm.js actually loads.
        */
        reloadPptmScript(clientId : ?string) {
            const tryCreatePptmScript = () => {
                if (obj.shouldReloadPptmScript(clientId)) {
                    obj.removePptm();
                    obj.createPptmScript(clientId);
                } else {
                    // Defer until later, since reloadPptmScript might have been called
                    // before pptm loaded, so we'll still want to hook into the script load.
                    listener = tryCreatePptmScript;
                }
            };

            tryCreatePptmScript();
        },
        listenForLoadWithNoContent() {
            window[callback] = () => {
                noContentFoundInContainer = true;

                if (listener) {
                    listener();
                    listener = undefined;
                }
            };
        },
        listenForButtonRender() {
            window.paypalDDL = window.paypalDDL || [];
            const buttonRenderEvent = window.paypalDDL.filter(e => e.event === 'paypalButtonRender');
            if (buttonRenderEvent.length === 0) {
                window.paypalDDL.push({ event: 'paypalButtonRender' });
            }
        },
        get callback() : string {
            return callback;
        },
        get noContentFoundInContainer() : boolean {
            return noContentFoundInContainer;
        },
        createPptmScript: (clientId : ?string) => {
            track({
                [ FPTI.KEY.STATE ]:      FPTI.STATE.PPTM,
                [ FPTI.KEY.TRANSITION ]: FPTI.TRANSITION.PPTM_LOAD
            });
        
            const params = {
                t:         'xo',
                id:        window.location.hostname,
                mrid:      config.merchantID,
                client_id: '',
                v:         config.version,
                source:    'checkoutjs'
            };
        
            if (clientId) {
                params.client_id = clientId;
            } else {
                delete params.client_id;
            }
        
            const fullUrl = extendUrl(config.pptmUrl, params);
        
            loadScript(fullUrl, 0, {
                async:  true,
                id:     PPTM_ID
            }).then(() => {
                // If the snippet is empty, then fire the callback.
                // We assume non-empty pptm.js bundles with init the paypalDDL and push an event called
                // `snippetRun` to it.
                if (!(window.paypalDDL && window.paypalDDL[0] && window.paypalDDL[0].event === 'snippetRun')) {
                    window[callback]();
                }

                track({
                    [ FPTI.KEY.STATE ]:      FPTI.STATE.PPTM,
                    [ FPTI.KEY.TRANSITION ]: FPTI.TRANSITION.PPTM_LOADED
                });
            }).catch(err => {
                info('pptm_script_error', { error: stringifyError(err) });
            });
        },
        shouldCreateInitialPptmScript,
        /*
        During Button render if a client ID was provided, we'll want to refresh the
        pptm script to try to pull down a container by that value.
        We'll only do this if we're not on the PayPal domain, or if
        a merchant ID wasn't already provided (since container look-up can
        also happen by merchant ID). Note that this will only happen
        if there was no content found in the container that was pulled down
        in the `setup` script. This is important because we don't want
        to pull down multiple containers that actually contain content,
        otherwise we'll be firing duplicate tags.
        */
        shouldReloadPptmScript(clientId : ?string) : boolean {
            if (noContentFoundInContainer === false) {
                return false;
            }

            if (isPayPalDomain()) {
                return false;
            }
        
            // If a merchant ID was already provided, then that meant we initially
            // loaded the pptm script with that value as the main container
            // look-up value, so in this case we don't want to reload pptm.
            if (config.merchantID) {
                return false;
            }
        
            if (clientId) {
                return true;
            }
        
            return false;
        },
        removePptm
    };

    return obj;
}
