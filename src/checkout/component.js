/* @flow */
/* eslint max-lines: 0 */

import { ENV, logger, type LocaleType } from 'paypal-braintree-web-client/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { create, CONSTANTS, PopupOpenError } from 'zoid/src';
import { type Component } from 'zoid/src/component/component';
import type { CrossDomainWindowType } from 'cross-domain-utils/src';
import { patchMethod, isDevice, supportsPopups, memoize, isIEIntranet } from 'belter/src';

import { getSessionID, getButtonSessionID, isEligible } from '../lib';
import { DOMAINS, STAGE } from '../config';
import { LOCALE, CURRENT_ENV, CLIENT_ID } from '../globals';
import { FUNDING } from '../constants';
import { FUNDING_CONFIG } from '../funding';

import { containerTemplate, componentTemplate } from './template';

type CheckoutPropsType = {
    payment? : () => ZalgoPromise<string>,
    onAuthorize : ({ returnUrl : string }, { redirect : (?CrossDomainWindowType, ?string) => ZalgoPromise<void> }) => ?ZalgoPromise<void>,
    onCancel? : ({ cancelUrl : string }, { redirect : (?CrossDomainWindowType, ?string) => ZalgoPromise<void> }) => ?ZalgoPromise<void>,
    fundingSource : string,
    env? : string,
    stage? : string,
    stageUrl? : string
};

export let Checkout : Component<CheckoutPropsType> = create({

    tag:  'paypal-checkout',
    name: 'ppcheckout',

    scrolling: true,

    buildUrl(props) : string {
        let { fundingSource } = props;
        return FUNDING_CONFIG[fundingSource].url;
    },

    get unsafeRenderTo() : boolean {
        return CURRENT_ENV === ENV.LOCAL;
    },

    domain: DOMAINS.PAYPAL,

    contexts: {
        iframe: (!supportsPopups()),
        popup:  true
    },

    validate() {
        if (isIEIntranet()) {
            throw new Error(`Can not render button in IE intranet mode`);
        }

        if (!isEligible()) {
            logger.warn('button_render_ineligible');
        }
    },

    prerenderTemplate: componentTemplate,
    containerTemplate,

    props: {

        clientID: {
            type: 'string',
            value() : string {
                return CLIENT_ID;
            },
            queryParam: true
        },

        sessionID: {
            type: 'string',
            value() : string {
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
            queryParam: true,
            value() : string {
                return CURRENT_ENV;
            }
        },

        meta: {
            type: 'object',
            def() : Object {
                let meta = window.xprops && window.xprops.meta;
                return meta || {};
            }
        },

        stage: {
            type:       'string',
            queryParam: true,
            required:   false,

            def() : ?string {
                if (CURRENT_ENV === ENV.STAGE || CURRENT_ENV === ENV.LOCAL) {
                    return STAGE;
                }
            }
        },

        locale: {
            type:          'object',
            queryParam:    'locale.x',
            allowDelegate: true,
            queryValue(locale) : string {
                let { lang, country } = locale;
                return `${ lang }_${ country }`;
            },
            value() : LocaleType {
                let { LANG, COUNTRY } = LOCALE;
                return {
                    lang:    LANG,
                    country: COUNTRY
                };
            }
        },
        
        payment: {
            type:       'function',
            queryParam: 'token',
            queryValue(payment) : ZalgoPromise<string> {
                return payment();
            },
            decorate(payment) : () => ZalgoPromise<string> {
                return memoize(() => {
                    return ZalgoPromise.try(payment)
                        .then(orderID => {

                            if (!orderID) {
                                throw new Error(`No order id passed`);
                            }

                            return orderID;
                        });
                });
            }
        },

        xcomponent: {
            type:       'string',
            queryParam: true,
            value() : string {
                return '1';
            }
        },

        version: {
            type:       'string',
            queryParam: true,
            value() : string {
                return '5';
            }
        },

        commit: {
            type:       'boolean',
            queryParam: true,
            value() : boolean {
                return true;
            }
        },

        fundingSource: {
            type:       'string',
            queryParam: true,
            def() : string {
                return FUNDING.PAYPAL;
            }
        },

        onAuthorize: {
            type:     'function',

            decorate(original) : Function {
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
                        return original.call(this, data, { ...actions, close });
                    }).catch(err => {
                        return this.error(err);
                    }).finally(() => {
                        return this.close();
                    });
                };
            }
        },

        onAuth: {
            type:       'function',
            required:   false,
            sameDomain: true
        },

        accessToken: {
            type:     'string',
            required: false
        },

        onCancel: {
            type:     'function',
            required: false,

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
                        if (original) {
                            return original.call(this, data, { ...actions, close });
                        }
                    }).finally(() => {
                        this.close();
                    });
                };
            }
        },

        onClose: {
            type:      'function',
            required:  false,

            decorate(original) : Function {
                return function decorateOnClose(reason) : ZalgoPromise<void> {

                    let onClose = ZalgoPromise.try(() => {
                        if (original) {
                            return original.apply(this, arguments);
                        }
                    });

                    let CLOSE_REASONS = CONSTANTS.CLOSE_REASONS;

                    let shouldCancel =
                        this.props.onCancel &&
                        [ CLOSE_REASONS.CLOSE_DETECTED, CLOSE_REASONS.USER_CLOSED ].indexOf(reason) !== -1;

                    if (shouldCancel) {
                        logger.info(`close_trigger_cancel`);
                        return this.props.onCancel()
                            .then(() => onClose);
                    }

                    return onClose;
                };
            }
        },

        test: {
            type: 'object',
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
