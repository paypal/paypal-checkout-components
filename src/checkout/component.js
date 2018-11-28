/* @flow */
/* eslint max-lines: 0 */

import { getPayPalDomainRegex, getLogger, getLocale, getEnv, getClientID, getCommit, getSDKMeta, isEligible } from 'paypal-braintree-web-client/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { create, CONSTANTS, PopupOpenError } from 'zoid/src';
import { type Component } from 'zoid/src/component/component';
import { patchMethod, isDevice, supportsPopups, memoize, isIEIntranet } from 'belter/src';
import { FUNDING, ENV } from 'paypal-sdk-constants/src';

import { getSessionID, getButtonSessionID } from '../lib';
import { FUNDING_CONFIG } from '../funding';

import { containerTemplate, componentTemplate } from './template';
import type { CheckoutPropsType } from './props';

export const Checkout : Component<CheckoutPropsType> = create({

    tag:  'paypal-checkout',
    name: 'ppcheckout',

    attributes: {
        iframe: {
            scrolling: 'yes'
        }
    },

    url(props) : string {
        const { fundingSource } = props;
        const fundingConfig = FUNDING_CONFIG[fundingSource];

        if (!fundingConfig) {
            throw new Error(`Can not find funding config for ${ fundingSource }`);
        }

        return fundingConfig.url();
    },

    get unsafeRenderTo() : boolean {
        return getEnv() === ENV.LOCAL;
    },

    domain: getPayPalDomainRegex(),

    contexts: {
        iframe: !supportsPopups(),
        popup:  supportsPopups()
    },

    validate() {
        if (isIEIntranet()) {
            throw new Error(`Can not render button in IE intranet mode`);
        }

        if (!isEligible()) {
            getLogger().warn('checkout_render_ineligible');
        }
    },

    prerenderTemplate: componentTemplate,
    containerTemplate,

    props: {

        clientID: {
            type:       'string',
            value:      getClientID,
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
            value:      getEnv
        },

        sdkMeta: {
            type:       'string',
            queryParam: true,
            value:      getSDKMeta
        },

        nonce: {
            type:     'string',
            required: false
        },

        meta: {
            type: 'object',
            def() : Object {
                const meta = window.xprops && window.xprops.meta;
                return meta || {};
            }
        },

        locale: {
            type:          'object',
            queryParam:    'locale.x',
            allowDelegate: true,
            queryValue(locale) : string {
                const { lang, country } = locale;
                return `${ lang }_${ country }`;
            },
            value: getLocale
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
            def:        getCommit
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

                    const close = () => {
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

                    const close = () => {
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

                    const onClose = ZalgoPromise.try(() => {
                        if (original) {
                            return original.apply(this, arguments);
                        }
                    });

                    const CLOSE_REASONS = CONSTANTS.CLOSE_REASONS;

                    const shouldCancel =
                        this.props.onCancel &&
                        [ CLOSE_REASONS.CLOSE_DETECTED, CLOSE_REASONS.USER_CLOSED ].indexOf(reason) !== -1;

                    if (shouldCancel) {
                        getLogger().info(`close_trigger_cancel`);
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
        return isDevice()
            ? { width:  '100%', height: '535px' }
            : { width:  '450px', height: '535px' };
    }
});

patchMethod(Checkout, 'renderTo', ({ args: [ win, props ], original, context }) => {

    const payment = props.payment();
    props.payment = () => payment;

    return original.call(context, win, props, 'body').catch(err => {
        if (err instanceof PopupOpenError) {
            Checkout.contexts.iframe = true;
            return original.call(context, win, props, 'body');
        }
        throw err;
    });
});
