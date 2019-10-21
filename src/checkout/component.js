/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';
import { info, track, warn, flush as flushLogs, immediateFlush } from 'beaver-logger/client';
import { create, CONSTANTS, PopupOpenError } from 'zoid/src';
import { type Component } from 'zoid/src/component/component';
import type { CrossDomainWindowType } from 'cross-domain-utils/src';
import { base64encode } from 'belter/src';

import { isDevice, request, getQueryParam, redirect as redir, patchMethod,
    setLogLevel, getSessionID, getBrowserLocale, supportsPopups, memoize,
    getDomainSetting, getScriptVersion, getButtonSessionID, isPayPalDomain,
    isEligible, getCurrentScriptUrl } from '../lib';
import { config } from '../config';
import { ENV, FPTI, PAYMENT_TYPE, CHECKOUT_OVERLAY_COLOR, ATTRIBUTE } from '../constants';
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

// eslint-disable-next-line flowtype/require-exact-type
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
    localhostUrl? : string,
    checkoutUri? : string,
    authCode? : string
};

export const Checkout : Component<CheckoutPropsType> = create({

    tag:  'paypal-checkout',
    name: 'ppcheckout',

    scrolling: true,

    buildUrl(props) : ZalgoPromise<string> {
        const env = props.env || config.env;

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
            ...config.paypalDomains
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
                const meta = window.xprops && window.xprops.meta;
                return meta || {};
            }
        },

        stage: {
            type:       'string',
            required:   false,
            queryParam: true,

            def(props) : ?string {
                const env = props.env || config.env;

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
                const env = props.env || config.env;

                if (env === ENV.STAGE || env === ENV.LOCAL) {
                    return config.stageUrl;
                }
            }
        },

        authCode: {
            type:     'string',
            required: false,
            def() : string {
                return config.authCode;
            },
            queryParam: 'code'
        },

        localhostUrl: {
            type:       'string',
            required:   false,
            queryParam: true,

            def(props) : ?string {
                const env = props.env || config.env;

                if (env === ENV.LOCAL) {
                    return config.localhostUrl;
                }
            }
        },

        checkoutUri: {
            type:       'string',
            required:   false,
            queryParam: true,

            def() : ?string {
                return config.checkoutUri;
            }
        },

        locale: {
            type:          'string',
            required:      false,
            queryParam:    'locale.x',
            allowDelegate: true,

            def() : string {
                const { lang, country } = getBrowserLocale();
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
                const env = props.env || config.env;

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
                const token = getQueryParam('token');

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

        fundingOffered: {
            type:       'object',
            required:   false,
            queryParam: true,
            def() : Object {
                const elements = Array.prototype.slice.call(document.querySelectorAll(`[${ ATTRIBUTE.FUNDING_SOURCE }]`));

                const fundingSources = elements.map(el => {
                    return el.getAttribute(ATTRIBUTE.FUNDING_SOURCE);
                });

                // $FlowFixMe
                return fundingSources;
            },
            queryValue: (val) => {
                return val.join(',');
            }
        },

        onAuthorize: {
            type:     'function',
            required: true,
            once:     true,
            
            decorate(original) : Function | void {
                if (original) {
                    return function decorateOnAuthorize(data, actions = {}) : ZalgoPromise<void> {

                        if (data && !data.intent) {
                            warn(`checkout_authorize_no_intent`, { paymentID: data.paymentID, token: data.paymentToken });
                        }

                        const close = () => {
                            return ZalgoPromise.try(() => {
                                if (actions.close) {
                                    return actions.close();
                                }
                            }).then(() => {
                                return this.closeComponent();
                            });
                        };

                        const redirect = (win, url) => {
                            return ZalgoPromise.all([
                                redir(win || window.top, url || data.returnUrl),
                                close()
                            ]);
                        };

                        return ZalgoPromise.try(() => {

                            try {
                                const isButton = window.location.href.indexOf('/smart/button') !== -1;
                                const isGuest  = this.window.location.href.indexOf('/webapps/xoonboarding') !== -1;

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

                    const close = () => {
                        return ZalgoPromise.try(() => {
                            if (actions.close) {
                                return actions.close();
                            }
                        }).then(() => {
                            return this.closeComponent();
                        });
                    };

                    const redirect = (win, url) => {
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

                    const onClose = original.apply(this, arguments);

                    const CLOSE_REASONS = CONSTANTS.CLOSE_REASONS;

                    const shouldCancel =
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
        
        test: {
            type:     'object',
            required: false,
            def() : Object {
                return window.__test__ || { action: 'checkout' };
            }
        },

        sdkMeta: {
            type:        'string',
            queryParam:  true,
            sendToChild: false,
            def:         () => {
                return base64encode(JSON.stringify({
                    url: getCurrentScriptUrl()
                }));
            }
        }
    },

    get dimensions() : { width : string, height : string } {

        if (isDevice()) {
            return {
                width:  '100%',
                height: '590px'
            };
        }

        return {
            width:  '500px',
            height: '590px'
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
                    const intent = window.injector.get('$CheckoutCartModel').instance(data.paymentToken).payment_action;
                    warn(`hermes_intent`, { paymentID: data.paymentID, token: data.paymentToken, intent });
                } catch (err) {
                    // pass
                }

                immediateFlush();
            }
            return callOriginal();
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

    const payment = props.payment();
    props.payment = () => payment;

    return original.call(context, win, props, 'body').catch(err => {
        if (err instanceof PopupOpenError && isPayPalDomain()) {
            Checkout.contexts.iframe = true;
            return original.call(context, win, props, 'body');
        }
        throw err;
    });
});

