/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';
import { info, track, warn, flush as flushLogs, immediateFlush } from 'beaver-logger/client';
import { create, CONSTANTS, PopupOpenError } from 'xcomponent/src';
import { type Component } from 'xcomponent/src/component/component';
import type { CrossDomainWindowType } from 'cross-domain-utils/src';

import { isDevice, request, getQueryParam, redirect as redir, patchMethod,
    setLogLevel, getSessionID, getBrowserLocale, supportsPopups, memoize,
    getDomainSetting, documentReady, getThrottle, getScriptVersion,
    getButtonSessionID, isPayPalDomain, isIEIntranet, isEligible } from '../lib';
import { config } from '../config';
import { ENV, FPTI, PAYMENT_TYPE, CHECKOUT_OVERLAY_COLOR } from '../constants';
import { onLegacyPaymentAuthorize } from '../compat';
import { determineParameterFromToken, determineUrl } from '../integrations';

import { containerTemplate, componentTemplate } from './template';

function addHeader(name, value) : void {

    if (!window.$Api) {
        return;
    }

    if (window.$Api.addHeader) {
        return window.$Api.addHeader(name, value);
    }
}

type CheckoutPropsType = {
    payment? : () => ZalgoPromise<string>,
    onAuthorize : ({ returnUrl : string }, { redirect : (?CrossDomainWindowType, ?string) => ZalgoPromise<void> }) => ?ZalgoPromise<void>,
    onShippingChange? : (address : {}) => ?ZalgoPromise<void>,
    onCancel? : ({ cancelUrl : string }, { redirect : (?CrossDomainWindowType, ?string) => ZalgoPromise<void> }) => ?ZalgoPromise<void>,
    fallback? : (string) => ?ZalgoPromise<void>,
    fundingSource? : string,
    logLevel? : string,
    env? : string,
    stage? : string,
    stageUrl? : string,
    supplement? : {
        getPaymentOptions : Function,
        addPaymentDetails : Function
    }
};

export let Checkout : Component<CheckoutPropsType> = create({

    tag:  'paypal-checkout',
    name: 'ppcheckout',

    scrolling: true,

    buildUrl(props) : ZalgoPromise<string> {
        let env = props.env || config.env;

        if (!props.payment) {
            throw new Error(`Can not build url without payment prop`);
        }

        return props.payment().then(token => {
            if (!token) {
                throw new Error(`Expected payment id or token to be passed, got ${ token }`);
            }

            return determineUrl(env, props.fundingSource, token);
        });
    },

    get unsafeRenderTo() : boolean {
        return config.env === ENV.LOCAL;
    },

    get domain() : Object {
        return {
            ...config.paypalDomains,
            [ ENV.LOCAL ]: /^http:\/\/localhost.paypal.com:\d+$/
        };
    },

    get bridgeUrl() : Object {
        return config.metaFrameUrls;
    },

    get bridgeDomain() : Object {
        return config.paypalDomains;
    },

    contexts: {
        iframe: (!supportsPopups()),
        popup:  true
    },

    get version() : string {
        return getScriptVersion();
    },

    validate() {
        if (isIEIntranet()) {
            throw new Error(`Can not render button in IE Intranet mode.  https://github.com/paypal/paypal-checkout/blob/master/docs/debugging/ie-intranet.md`);
        }

        if (!isEligible()) {
            warn('checkout_render_ineligible');
        }
    },

    prerenderTemplate: componentTemplate,
    containerTemplate,

    props: {

        sessionID: {
            type:     'string',
            required: false,
            def() : string {
                return getSessionID();
            },
            queryParam: true
        },

        buttonSessionID: {
            type:     'string',
            required: false,
            def() : ?string {
                return getButtonSessionID();
            },
            queryParam: true
        },

        env: {
            type:       'string',
            required:   false,
            queryParam: true,

            def() : string {
                return config.env;
            },

            validate(env) {
                if (!config.paypalUrls[env]) {
                    throw new Error(`Invalid env: ${ env }`);
                }
            }
        },

        meta: {
            type:     'object',
            required: false,
            def() : Object {
                let meta = window.xprops && window.xprops.meta;
                return meta || {};
            }
        },

        stage: {
            type:       'string',
            required:   false,
            queryParam: true,

            def(props) : ?string {
                let env = props.env || config.env;

                if (env === ENV.STAGE || env === ENV.LOCAL) {
                    return config.stage;
                }
            }
        },

        stageUrl: {
            type:       'string',
            required:   false,
            queryParam: true,

            def(props) : ?string {
                let env = props.env || config.env;

                if (env === ENV.STAGE || env === ENV.LOCAL) {
                    return config.stageUrl;
                }
            }
        },

        locale: {
            type:          'string',
            required:      false,
            queryParam:    'locale.x',
            allowDelegate: true,

            def() : string {
                let { lang, country } = getBrowserLocale();
                return `${ lang }_${ country }`;
            }
        },


        client: {
            type:     'object',
            required: false,
            def() : { [string] : string } {
                return {};
            },
            sendToChild: false,

            validate(client, props) {
                let env = props.env || config.env;

                if (!client[env]) {
                    throw new Error(`Client ID not found for env: ${ env }`);
                }

                if (client[env].match(/^(.)\1+$/)) {
                    throw new Error(`Invalid client ID: ${ client[env] }`);
                }
            }
        },

        payment: {
            type:      'function',
            required:  false,
            memoize:   true,
            promisify: true,
            queryParam(payment) : ZalgoPromise<string> {
                return payment().then(token => {
                    return determineParameterFromToken(token);
                });
            },
            queryValue(payment) : ZalgoPromise<string> {
                return payment();
            },
            childDecorate(payment) : () => ZalgoPromise<string> {
                let token = getQueryParam('token');

                return token
                    ? memoize(() => ZalgoPromise.resolve(token))
                    : payment;
            },
            validate(payment, props) {
                if (!payment && !props.url) {
                    throw new Error(`Expected either props.payment or props.url to be passed`);
                }
            },
            alias: 'billingAgreement'
        },

        style: {
            type:          'object',
            required:      false,
            allowDelegate: true,
            def() : Object {
                return {};
            },
            validate(style) {
                if (style.overlayColor && style.overlayColor !== CHECKOUT_OVERLAY_COLOR.BLACK && style.overlayColor !== CHECKOUT_OVERLAY_COLOR.WHITE) {
                    throw new Error(`Invalid background color: ${ style.overlayColor }`);
                }
            }
        },

        commit: {
            type:     'boolean',
            required: false
        },

        experience: {
            type:     'object',
            required: false,
            def() : Object {
                return {};
            }
        },

        fundingSource: {
            type:       'string',
            required:   false,
            queryParam: true
        },

        onAuthorize: {
            type:     'function',
            required: true,
            once:     true,

            childDecorate(original) : Function {
                return function childDecorateOnAuthorize() : ZalgoPromise<void> {

                    (() => {
                        try {
                            if (!window.paypal) {
                                warn(`child_window_paypal_not_found`);
                                flushLogs();
                            }

                            let AuthModel = window.injector && window.injector.get('$AuthModel');
                            let buyerCountry = AuthModel && AuthModel.instance() && AuthModel.instance().country;
                            let geoCountry = window.meta && window.meta.geolocation;
                            let { country: browserCountry } = getBrowserLocale();

                            if (!buyerCountry || !geoCountry || !browserCountry) {
                                info(`buyer_country_match_data_not_found`, { buyerCountry, geoCountry, browserCountry });
                                return;
                            }

                            info(`buyer_country_data`, { buyerCountry, geoCountry, browserCountry });
                            
                            if (buyerCountry === geoCountry) {
                                info(`buyer_country_geo_country_match`);
                            } else {
                                info(`buyer_country_geo_country_mismatch`);
                            }

                            if (buyerCountry === browserCountry) {
                                info(`buyer_country_browser_country_match`);
                            } else {
                                info(`buyer_country_browser_country_mismatch`);
                            }

                            flushLogs();

                        } catch (err) {
                            // pass
                        }
                    })();
                    
                    return original.apply(this, arguments);
                };
            },

            decorate(original) : Function | void {
                if (original) {
                    return function decorateOnAuthorize(data, actions = {}) : ZalgoPromise<void> {

                        if (data && !data.intent) {
                            warn(`checkout_authorize_no_intent`, { paymentID: data.paymentID, token: data.paymentToken });
                        }

                        let close = () => {
                            return ZalgoPromise.try(() => {
                                if (actions.close) {
                                    return actions.close();
                                }
                            }).then(() => {
                                return this.closeComponent();
                            });
                        };

                        let redirect = (win, url) => {
                            return ZalgoPromise.all([
                                redir(win || window.top, url || data.returnUrl),
                                close()
                            ]);
                        };

                        return ZalgoPromise.try(() => {

                            try {
                                let isButton = window.location.href.indexOf('/webapps/hermes/button') !== -1;
                                let isGuest  = this.window.location.href.indexOf('/webapps/xoonboarding') !== -1;

                                if (isButton && isGuest) {
                                    return request({
                                        win:    this.window,
                                        method: 'get',
                                        url:    '/webapps/xoonboarding/api/auth'
                                    }).then(result => {
                                        if (result && result.data && result.data.access_token) {
                                            addHeader('x-paypal-internal-euat', result.data.access_token);
                                        }
                                    }).catch(() => {
                                        // pass
                                    });
                                }

                            } catch (err) {
                                // pass
                            }

                        }).then(() => {
                            return original.call(this, data, { ...actions, close, redirect });
                        }).catch(err => {
                            return this.error(err);
                        }).finally(() => {
                            return this.close();
                        });
                    };
                }
            }
        },

        onShippingChange: {
            type:     'function',
            required: false
        },

        onAuth: {
            type:       'function',
            required:   false,
            sameDomain: true,
            childDecorate(original : Function) : ?Function {
                if (original) {
                    return function wrapOnAuth(data : string | Object) : Object {
                        if (typeof data === 'string') {
                            data = { accessToken: data };
                        }
                        return original(data);
                    };
                }
            }
        },

        accessToken: {
            type:     'function',
            required: false
        },

        onCancel: {
            type:     'function',
            required: false,
            once:     true,
            noop:     true,

            decorate(original) : Function {
                return function decorateOnCancel(data, actions = {}) : ZalgoPromise<void> {

                    let close = () => {
                        return ZalgoPromise.try(() => {
                            if (actions.close) {
                                return actions.close();
                            }
                        }).then(() => {
                            return this.closeComponent();
                        });
                    };

                    let redirect = (win, url) => {
                        return ZalgoPromise.all([
                            redir(win || window.top, url || data.cancelUrl),
                            close()
                        ]);
                    };

                    return ZalgoPromise.try(() => {
                        return original.call(this, data, { ...actions, close, redirect });
                    }).finally(() => {
                        this.close();
                    });
                };
            }
        },

        init: {
            type:     'function',
            required: false,
            once:     true,
            noop:     true,

            decorate(original) : Function {
                return function decorateInit(data) : void {
                    info('checkout_init');

                    track({
                        [ FPTI.KEY.STATE ]:        FPTI.STATE.CHECKOUT,
                        [ FPTI.KEY.TRANSITION ]:   FPTI.TRANSITION.CHECKOUT_INIT,
                        [ FPTI.KEY.CONTEXT_TYPE ]: FPTI.CONTEXT_TYPE[PAYMENT_TYPE.EC_TOKEN],
                        [ FPTI.KEY.TOKEN ]:        data.paymentToken,
                        [ FPTI.KEY.SELLER_ID ]:    data.merchantID,
                        [ FPTI.KEY.CONTEXT_ID ]:   data.paymentToken
                    });

                    flushLogs();

                    this.paymentToken = data.paymentToken;
                    this.cancelUrl    = data.cancelUrl;

                    return original.apply(this, arguments);
                };
            }
        },

        onClose: {
            type:      'function',
            required:  false,
            once:      true,
            promisify: true,
            noop:      true,

            decorate(original) : Function {
                return function decorateOnClose(reason) : ZalgoPromise<void> {

                    let onClose = original.apply(this, arguments);

                    let CLOSE_REASONS = CONSTANTS.CLOSE_REASONS;

                    let shouldCancel =
                        this.props.onCancel &&
                        [ CLOSE_REASONS.CLOSE_DETECTED, CLOSE_REASONS.USER_CLOSED ].indexOf(reason) !== -1;

                    if (shouldCancel) {
                        info(`close_trigger_cancel`);
                        return this.props.onCancel({
                            paymentToken: this.paymentToken,
                            cancelUrl:    this.cancelUrl
                        }).then(() => onClose);
                    }

                    return onClose;
                };
            }
        },

        onError: {
            type:      'function',
            required:  false,
            promisify: true,
            noop:      true,
            once:      true
        },

        fallback: {
            type:     'function',
            required: false,
            once:     true,

            def() : Function {
                return function defaultFallback(url) : ZalgoPromise<void> {
                    warn('fallback', { url });

                    if (getDomainSetting('allow_full_page_fallback')) {
                        window.top.location = url;
                        return this.close();
                    }

                    return onLegacyPaymentAuthorize(this.props.onAuthorize);
                };
            }
        },

        logLevel: {
            type:     'string',
            required: false,
            get value() : string {
                return config.logLevel;
            }
        },

        supplement: {
            type:     'object',
            required: false,
            get value() : Object {
                // $FlowFixMe
                let value : Object = window.xprops && window.xprops.supplement;
                return value;
            }
        },

        test: {
            type:     'object',
            required: false,
            def() : Object {
                return window.__test__ || { action: 'checkout' };
            }
        }
    },

    autoResize: {
        width:  false,
        height: false
    },

    get dimensions() : { width : string, height : string } {

        if (isDevice()) {
            return {
                width:  '100%',
                height: '535px'
            };
        }

        return {
            width:  '450px',
            height: '535px'
        };
    }
});

if (Checkout.isChild() && Checkout.xchild && Checkout.xprops) {

    if (Checkout.xprops && Checkout.xprops.logLevel) {
        setLogLevel(Checkout.xprops.logLevel);
    }

    Checkout.xchild.onProps(xprops => {
        patchMethod(xprops, 'onAuthorize', ({ callOriginal, args: [ data ] }) => {
            if (data && !data.intent) {
                warn(`hermes_authorize_no_intent`, { paymentID: data.paymentID, token: data.paymentToken });

                try {
                    let intent = window.injector.get('$CheckoutCartModel').instance(data.paymentToken).payment_action;
                    warn(`hermes_intent`, { paymentID: data.paymentID, token: data.paymentToken, intent });
                } catch (err) {
                    // pass
                }

                immediateFlush();
            }
            return callOriginal();
        });
    });

    documentReady.then(() => {

        if (!window.injector) {
            return;
        }

        let $event = window.injector.get('$event');

        if (!$event) {
            return;
        }

        let experimentActive = false;
        let loggedComplete = false;

        $event.on('allLoaded', () => {
            setTimeout(() => {
                let payButton = document.querySelector('.buttons.reviewButton');
                let topPayButton = document.querySelector('.buttons.reviewButton.topReviewButton');
                let reviewSection = document.querySelector('section.review');

                let throttle = getThrottle('top_pay_button', 0);

                let hash = window.location.hash;
                
                let logComplete = () => {
                    if (experimentActive && !loggedComplete && hash && hash.indexOf('checkout/review') !== -1) {
                        throttle.logComplete({ [ FPTI.KEY.FEED ]: 'hermesnodeweb' });
                        loggedComplete = true;
                    }
                };

                if (payButton) {
                    payButton.addEventListener('click', logComplete);
                }

                if (!reviewSection || !reviewSection.firstChild || !payButton || topPayButton) {
                    return;
                }

                if (payButton.getBoundingClientRect().bottom < window.innerHeight) {
                    return;
                }

                experimentActive = true;
                throttle.logStart({ [ FPTI.KEY.FEED ]: 'hermesnodeweb' });

                if (!throttle.isEnabled()) {
                    return;
                }

                topPayButton = payButton.cloneNode(true);
                topPayButton.className += ' topReviewButton';
                reviewSection.insertBefore(topPayButton, reviewSection.firstChild);

                topPayButton.addEventListener('click', () => {
                    logComplete();
                    let button = payButton && payButton.querySelector('button, input');
                    if (button) {
                        button.click();
                    }
                });
            }, 200);
        });
    });
}

patchMethod(Checkout, 'init', ({ args: [ props, _context ], original, context }) => {
    return original.call(context, props, _context, 'body');
});

patchMethod(Checkout, 'render', ({ args: [ props ], original, context }) => {
    return original.call(context, props, 'body');
});

patchMethod(Checkout, 'renderTo', ({ args: [ win, props ], original, context }) => {

    let payment = props.payment();
    props.payment = () => payment;

    return original.call(context, win, props, 'body').catch(err => {
        if (err instanceof PopupOpenError && isPayPalDomain()) {
            Checkout.contexts.iframe = true;
            return original.call(context, win, props, 'body');
        }
        throw err;
    });
});

