/* @flow */

import { getter, memoize, once, noop } from 'xcomponent/src/lib';

import { extendUrl } from '../../lib';
import { determineParameterFromToken, determineUrlFromToken, parseParamsFromUrl, redirect } from './util';
import { config } from '../../config';

export function setupNativeProxy(Checkout : Object) {

    let render = Checkout.render;

    Checkout.render = function(props) : SyncPromise<void> {

        if (!window.ppnativexo) {
            return render.apply(this, arguments);
        }

        if (!props.payment) {
            throw new Error(`Expected props.payment to be passed`);
        }

        if (!props.onAuthorize) {
            throw new Error(`Expected props.onAuthorize to be passed`);
        }

        if (props.env && !config.checkoutUrls[props.env]) {
            throw new Error(`Invalid props.env: ${props.env}`);
        }

        let env = props.env || config.env;

        let payment = memoize(getter(props.payment.bind({ props })));
        let onAuthorize = once(props.onAuthorize);
        let onCancel = once(props.onCancel || noop);

        return payment().then(token => {

            let url = extendUrl(determineUrlFromToken(env, token), {
                [ determineParameterFromToken(token) ]: token,
                useraction: props.commit ? 'commit' : ''
            });

            window.ppnativexo.start(url, {

                onAuthorize(returnUrl : string) {

                    let data = parseParamsFromUrl(returnUrl);
                    data.returnUrl = returnUrl;

                    onAuthorize(data, {
                        redirect(win : typeof window = window, redirectUrl : string = returnUrl) : SyncPromise<void> {
                            return redirect(win, redirectUrl);
                        }
                    });
                },

                onCancel(cancelUrl : string) {

                    let data = parseParamsFromUrl(cancelUrl);
                    data.cancelUrl = cancelUrl;

                    onCancel(data, {
                        redirect(win : typeof window = window, redirectUrl : string = cancelUrl) : SyncPromise<void> {
                            return redirect(win, redirectUrl);
                        }
                    });
                }
            });
        });
    };
}
