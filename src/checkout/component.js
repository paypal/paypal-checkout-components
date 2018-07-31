/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';
import { info, track, flush as flushLogs } from 'beaver-logger/client';
import { create, CONSTANTS, PopupOpenError } from 'xcomponent/src';
import { type Component } from 'xcomponent/src/component/component';
import type { CrossDomainWindowType } from 'cross-domain-utils/src';
import { getQueryParam, patchMethod, isDevice, supportsPopups, memoize } from 'belter/src';

import { request, setLogLevel, getSessionID, getButtonSessionID } from '../lib';
import { config } from '../config';
import { ENV, FPTI } from '../constants';
import { determineUrl } from '../integrations';

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
    onCancel? : ({ cancelUrl : string }, { redirect : (?CrossDomainWindowType, ?string) => ZalgoPromise<void> }) => ?ZalgoPromise<void>,
    fundingSource? : string,
    logLevel? : string,
    env? : string,
    stage? : string,
    stageUrl? : string
};

export let Checkout : Component<CheckoutPropsType> = create({

    tag:  'paypal-checkout',
    name: 'ppcheckout',

    scrolling: true,

    buildUrl(props) : ZalgoPromise<string> {
        if (!props.payment) {
            throw new Error(`Can not build url without payment prop`);
        }

        return props.payment().then(token => {
            if (!token) {
                throw new Error(`Expected payment id or token to be passed, got ${ token }`);
            }

            return determineUrl(config.env, props.fundingSource);
        });
    },

    get unsafeRenderTo() : boolean {
        return config.env === ENV.LOCAL;
    },

    domain: config.domains.paypal,

    contexts: {
        iframe: (!supportsPopups()),
        popup:  true
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
            get value() : string {
                return config.env;
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

            def() : ?string {
                if (config.env === ENV.STAGE || config.env === ENV.LOCAL) {
                    return config.stage;
                }
            }
        },

        stageDomain: {
            type:       'string',
            required:   false,
            queryParam: true,

            def() : ?string {
                if (config.env === ENV.STAGE || config.env === ENV.LOCAL) {
                    return config.stageDomain;
                }
            }
        },

        locale: {
            type:          'string',
            required:      false,
            queryParam:    'locale.x',
            allowDelegate: true,

            get value() : string {
                let { lang, country } = config.locale;
                return `${ lang }_${ country }`;
            }
        },
        
        payment: {
            type:       'function',
            required:   false,
            memoize:    true,
            promisify:  true,
            queryParam: 'token',
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

        commit: {
            type:       'boolean',
            required:   false,
            queryParam: true,
            get value() : boolean {
                return true;
            }
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

            decorate(original) : Function | void {
                if (original) {
                    return function decorateOnAuthorize(data, actions = {}) : ZalgoPromise<void> {

                        let close = () => {
                            return ZalgoPromise.try(() => {
                                if (actions.close) {
                                    return actions.close();
                                }
                            }).then(() => {
                                return this.closeComponent();
                            });
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
                            return original.call(this, data, { ...actions, close });
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

                    return ZalgoPromise.try(() => {
                        return original.call(this, data, { ...actions, close });
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
                        [ FPTI.KEY.CONTEXT_TYPE ]: FPTI.CONTEXT_TYPE.EC_TOKEN,
                        [ FPTI.KEY.TOKEN ]:        data.orderID,
                        [ FPTI.KEY.CONTEXT_ID ]:   data.orderID
                    });

                    flushLogs();

                    this.orderID   = data.orderID;
                    this.cancelUrl = data.cancelUrl;

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
                            orderID:   this.orderID,
                            cancelUrl: this.cancelUrl
                        }).then(() => onClose);
                    }

                    return onClose;
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
        }
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

patchMethod(Checkout, 'renderTo', ({ args: [ win, props ], original, context }) => {

    let payment = props.payment();
    props.payment = () => payment;

    return original.call(context, win, props, 'body').catch(err => {
        if (err instanceof PopupOpenError) {
            Checkout.contexts.iframe = true;
            return original.call(context, win, props, 'body');
        }
        throw err;
    });
});

if (Checkout.isChild() && Checkout.xchild && Checkout.xprops) {
    if (Checkout.xprops && Checkout.xprops.logLevel) {
        setLogLevel(Checkout.xprops.logLevel);
    }
}
