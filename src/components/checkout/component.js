/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';
import { info, track, warn, flush as flushLogs, immediateFlush } from 'beaver-logger/client';
import { create, CONSTANTS, PopupOpenError } from 'xcomponent/src';
import { type Component } from 'xcomponent/src/component/component';
import { getParent, isSameDomain } from 'cross-domain-utils/src';

import { isDevice, request, getQueryParam, redirect as redir, patchMethod,
    setLogLevel, getSessionID, getBrowserLocale, supportsPopups, memoize,
    extend, getDomainSetting, documentReady, getThrottle, getScriptVersion,
    getButtonSessionID, isPayPalDomain } from '../../lib';
import { config, ENV, FPTI, PAYMENT_TYPE } from '../../config';
import { onLegacyPaymentAuthorize } from '../../compat';

import { containerTemplate, componentTemplate } from './templates';
import { determineParameterFromToken, determineUrl } from './util';
import { setupPopupBridgeProxy, getPopupBridgeOpener, awaitPopupBridgeOpener } from './popupBridge';
import { CHECKOUT_OVERLAY_COLOR } from './constants';


function addHeader(name, value) : void {

    if (!window.$Api) {
        return;
    }

    if (window.$Api.addHeader) {
        return window.$Api.addHeader(name, value);
    }
}

export function allowIframe() : boolean {

    if (!supportsPopups()) {
        return true;
    }

    let parentWindow = getParent(window);
    if (parentWindow && isSameDomain(parentWindow)) {
        return true;
    }

    let parentComponentWindow = window.xchild && window.xchild.getParentComponentWindow();
    if (parentComponentWindow && isSameDomain(parentComponentWindow)) {
        return true;
    }

    if (__TEST__) {
        return true;
    }

    return false;
}

function forceIframe() : boolean {

    if (!supportsPopups()) {
        return true;
    }

    return false;
}

type CheckoutPropsType = {
    payment? : () => ZalgoPromise<string>,
    onAuthorize : ({ returnUrl : string }, { redirect : (?CrossDomainWindowType, ?string) => ZalgoPromise<void> }) => ?ZalgoPromise<void>,
    onCancel? : ({ cancelUrl : string }, { redirect : (?CrossDomainWindowType, ?string) => ZalgoPromise<void> }) => ?ZalgoPromise<void>,
    fallback? : (string) => ?ZalgoPromise<void>,
    fundingSource? : string
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
        iframe: forceIframe(),
        popup:  true
    },

    get version() : string {
        return getScriptVersion();
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

            decorate(original) : ?Function {
                if (original) {
                    return function decorateOnAuthorize(data, actions = {}) : ZalgoPromise<void> {

                        if (data && !data.intent) {
                            warn(`checkout_authorize_no_intent`, { paymentID: data.paymentID, token: data.paymentToken });
                        }

                        Checkout.contexts.iframe = false;

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
                                        url:    '/webapps/hermes/api/auth'
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

        onAuth: {
            type:       'function',
            required:   false,
            sameDomain: true
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

            decorate(original) : ?Function {
                return function decorateOnCancel(data, actions = {}) : ZalgoPromise<void> {

                    Checkout.contexts.iframe = false;

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

                    let hasDetails =
                        this.paymentToken &&
                        this.cancelUrl;

                    if (shouldCancel && !hasDetails) {
                        warn(`close_no_token_cancelurl`);
                        return onClose;
                    }

                    if (shouldCancel) {
                        info(`close_trigger_cancel`);
                        return ZalgoPromise.all([
                            onClose,
                            this.props.onCancel({
                                paymentToken: this.paymentToken,
                                cancelUrl:    this.cancelUrl
                            })
                        ]).then(() => {
                            return onClose;
                        });
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

        popupBridge: {
            type:     'object',
            required: false,
            get value() : Object {
                return {
                    open:        getPopupBridgeOpener(),
                    awaitOpener: awaitPopupBridgeOpener
                };
            }
        },

        test: {
            type:     'object',
            required: false,
            def() : Object {
                return { action: 'checkout' };
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

setupPopupBridgeProxy(Checkout);

export function enableCheckoutIframe() {
    delete Checkout.contexts.iframe;
    Checkout.contexts.iframe = true;
}

if (Checkout.isChild()) {

    if (window.xprops.logLevel) {
        setLogLevel(window.xprops.logLevel);
    }

    awaitPopupBridgeOpener();

    window.xchild.onProps(() => {
        patchMethod(window.xprops, 'onAuthorize', ({ callOriginal, args: [ data ] }) => {
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

    if (!Object.assign) {
        try {
            // $FlowFixMe
            Object.assign = extend;
        } catch (err) {
            // pass
        }
    }

    // eslint-disable-next-line promise/catch-or-return
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

                let throttle = getThrottle('top_pay_button', 5000);

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

