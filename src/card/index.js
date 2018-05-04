/* @flow */
/* @jsx jsxDom */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';
import { create, PopupOpenError  } from 'xcomponent/src';
import { type Component } from 'xcomponent/src/component/component';
import { warn } from 'beaver-logger/client';
import type { CrossDomainWindowType } from 'cross-domain-utils/src';

import { onAuthorizeListener } from '../experiments';
import { mergePaymentDetails } from '../api/hacks';
import { request, redirect as redir, patchMethod,
    setLogLevel, memoize, isPayPalDomain
} from '../lib';

type CardOptions = {
    client : {
        [string] : (string | ZalgoPromise<string>)
    },
    env? : string,
    locale? : string,
    logLevel : string,
    awaitPopupBridge : Function,
    onAuthorize : ({ returnUrl : string }, { redirect : (?CrossDomainWindowType, ?string) => ZalgoPromise<void> }) => ?ZalgoPromise<void>,
    onCancel? : ({ cancelUrl : string }, { redirect : (?CrossDomainWindowType, ?string) => ZalgoPromise<void> }) => ?ZalgoPromise<void>,
    meta : Object
};

export const Card : Component<CardOptions> = create({
    tag:  'zombo',
    name: 'ppcard',

    dimensions: {
        height: '300px',
        width:  '250px'
    },

    buildUrl() : string {
        return 'http://localhost.paypal.com:8000/webapps/hermes/zombo';
    },

    contexts: {
        iframe: true,
        popup:  false
    },

    onAuthorize: {
        type:     'function',
        required: true,
        once:     true,

        decorate(original) : ?Function {
            if (original) {
                return function decorateOnAuthorize(
                    data,
                    actions = {}
                ) : ZalgoPromise<void> {
                    if (data && !data.intent) {
                        warn(`checkout_authorize_no_intent`, {
                            paymentID:  data.paymentID,
                            token:      data.paymentToken
                        });
                    }

                    let restart = actions.restart;
                    actions.restart = () => {
                        return restart().then(() => {
                            return new ZalgoPromise();
                        });
                    };

                    actions.redirect = (win, url) => {
                        return ZalgoPromise.all([
                            redir(win || window.top, url || data.returnUrl),
                            actions.close()
                        ]);
                    };

                    actions.payment.tokenize = memoize(() => {
                        if (!this.props.braintree) {
                            throw new Error(`Must pass in Braintree client to tokenize payment`);
                        }

                        return this.props.braintree
                            .then(client => client.tokenizePayment(data))
                            .then(res => ({ nonce: res.nonce }));
                    });

                    let execute = actions.payment.execute;
                    actions.payment.execute = () => {
                        return execute().then(result => {

                            if (!result || !result.id || !result.intent || !result.state) {
                                warn(`execute_result_missing_data`);
                                return new ZalgoPromise();
                            }

                            return mergePaymentDetails(result.id, result);
                        });
                    };

                    let get = actions.payment.get;

                    actions.payment.get = () => {
                        return get().then(result => {
                            if (!result || !result.id || !result.intent || !result.state) {
                                warn(`get_result_missing_data`);
                                return new ZalgoPromise();
                            }

                            return mergePaymentDetails(result.id, result);
                        });
                    };

                    actions.request = request;

                    onAuthorizeListener.trigger({
                        paymentToken: data.paymentToken
                    });

                    return original.call(this, data, actions);
                };
            }
        }
    },

    onAuth: {
        type:       'function',
        required:   false,
        sameDomain: true
    },

    on: {
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
            return function decorateOnCancel(
                data,
                actions = {}
            ) : ZalgoPromise<void> {
                let close = () => {
                    return ZalgoPromise.try(() => {
                        if (actions.close) {
                            return actions.close();
                        }
                    }).then(() => {
                        return this.closeComponent || this.closeComponent();
                    });
                };

                let redirect = (win, url) => {
                    return ZalgoPromise.all([
                        redir(win || window.top, url || data.cancelUrl),
                        close()
                    ]);
                };

                return ZalgoPromise.try(() => {
                    return original.call(this, data, {
                        ...actions,
                        close,
                        redirect
                    });
                }).finally(() => {
                    this.close();
                });
            };
        }
    }
});

patchMethod(Card, 'init', ({ args: [ props, _context ], original, context }) => {
    if (Card.xprops && Card.xprops.logLevel) {
        setLogLevel(Card.xprops.logLevel);
    }
    return original.call(context, props, _context, 'body');
});

patchMethod(Card, 'render', ({ args: [ props ], original, context }) => {
    return original.call(context, props, 'body');
});

patchMethod(Card, 'renderTo', ({ args: [ win, props ], original, context }) => {

    let payment = props.payment();
    props.payment = () => payment;

    return original.call(context, win, props, 'body').catch(err => {
        if (err instanceof PopupOpenError && isPayPalDomain()) {
            return original.call(context, win, props, 'body');
        }
        throw err;
    });
});
