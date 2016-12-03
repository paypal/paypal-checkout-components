
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';
import $logger from 'beaver-logger/client';
import xcomponent from 'xcomponent/src';

import parentTemplate from './parentTemplate.htm';
import componentTemplate from './componentTemplate.htm';

import { isDevice, request, getQueryParam, noop } from '../../lib';
import { config } from '../../config';

import { validateProps, urlWillRedirectPage } from '../common';

import contentJSON from './content';
let content = JSON.parse(contentJSON);


function addHeader(name, value) {

    if (!window.$Api) {
        return;
    }

    if (window.$Api.addHeader) {
        return window.$Api.addHeader(name, value);
    }
}


function logReturnUrl(returnUrl) {

    let currentDomain = `${window.location.protocol}//${window.location.host}`.toLowerCase();
    returnUrl = returnUrl.toLowerCase();

    if (currentDomain !== 'https://www.paypal.com') {

        if (returnUrl.indexOf(currentDomain) === 0) {
            $logger.info(`return_url_domain_match`);
        } else {
            $logger.info(`return_url_domain_mismatch`, { returnUrl, currentDomain });
        }

        let currentHost = currentDomain.replace(/^https?/, '');
        let returnHost = returnUrl.replace(/^https?/, '');

        if (returnHost.indexOf(currentHost) === 0) {
            $logger.info(`return_url_host_match`);
        } else {
            $logger.info(`return_url_host_mismatch`, { returnUrl, currentDomain });
        }

        let currentTLD = currentHost.replace(/^www\./, '');
        let returnTLD = returnHost.replace(/^www\./, '');

        if (returnTLD.indexOf(currentTLD) === 0) {
            $logger.info(`return_url_tld_match`);
        } else {
            $logger.info(`return_url_tld_mismatch`, { returnUrl, currentDomain });
        }
    }
}

export let Checkout = xcomponent.create({

    tag: 'paypal-checkout',
    name: 'ppcheckout',

    buildUrl(instance, props) {
        let env = instance.props.env || config.env;

        if (instance.props.billingAgreement) {
            return config.billingUrls[env];
        }

        return props.payment().then(token => {

            if (token.indexOf('BA-') === 0) {
                $logger.info(`url_billing`);
                return config.billingUrls[env];
            }

            if (token.indexOf('PAY-') === 0) {
                $logger.info(`url_payment`);
                return config.checkoutUrls[env];
            }

            if (token.indexOf('EC-') === 0) {
                $logger.info(`url_checkout`);
                return config.checkoutUrls[env];
            }

            $logger.info(`url_default`);
            return config.checkoutUrls[env];
        });
    },

    remoteRenderDomain: config.paypal_domain_regex,

    get bridgeUrls() {
        return config.bridgeUrls;
    },

    get bridgeDomains() {
        return config.paypalDomains;
    },

    contexts: {
        iframe: false,
        lightbox: false,
        popup: true
    },

    get version() {
        return config.ppobjects ? __FILE_VERSION__ : __MINOR_VERSION__;
    },

    get domains() {
        return config.paypalDomains;
    },

    validateProps(component, props, required = true) {
        if (required) {
            return validateProps(props);
        }
    },

    get componentTemplate() {

        return componentTemplate;
    },

    get parentTemplate() {

        let template = parentTemplate;
        let localeContent = content[config.locale.country][config.locale.lang];

        template = template.replace('#windowMessage', localeContent.windowMessage);
        template = template.replace('#continue', localeContent.continue);

        return template;
    },

    props: {

        env: {
            type: 'string',
            required: false,
            queryParam: true,

            def() {
                return config.env;
            }
        },

        stage: {
            type: 'string',
            required: false,
            queryParam: true,

            def() {
                return config.stage;
            }
        },

        locale: {
            type: 'string',
            required: false,
            queryParam: 'locale.x'
        },


        client: {
            type: 'object',
            required: false,
            def() {
                return {};
            },
            sendToChild: false
        },

        payment: {
            type: 'string',
            required: false,
            getter: true,
            memoize: true,
            queryParam(value = '') {
                return value.indexOf('BA-') === 0 ? 'ba_token' : 'token';
            },
            childDef() {
                return getQueryParam('token');
            },
            alias: 'paymentToken'
        },

        billingAgreement: {
            type: 'string',
            required: false,
            getter: true,
            memoize: true,
            queryParam: 'ba_token',
            alias: 'billingToken'
        },

        commit: {
            type: 'boolean',
            required: false
        },

        onAuthorize: {
            type: 'function',
            required: false,
            once: true,
            alias: 'onPaymentAuthorize',

            decorate(original) {
                if (original) {
                    return function(data, actions = {}) {

                        try {
                            logReturnUrl(data.returnUrl);
                        } catch (err) {
                            // pass
                        }

                        let close = () => {
                            return Promise.try(() => {
                                if (actions.close) {
                                    return actions.close();
                                }
                            }).then(() => {
                                return this.closeComponent();
                            });
                        };

                        let redirect = (win, url) => {

                            win = win || window.top;
                            url = url || data.returnUrl;

                            setTimeout(() => {
                                win.location = url;
                            }, 1);

                            return close().then(() => {
                                if (urlWillRedirectPage(url)) {
                                    return new Promise();
                                }
                            });
                        };

                        return Promise.try(() => {

                            try {
                                let isButton = window.location.href.indexOf('/webapps/hermes/button') !== -1;
                                let isGuest  = this.window.location.href.indexOf('/webapps/xoonboarding') !== -1;

                                if (isButton && isGuest) {
                                    return request({
                                        win: this.window,
                                        method: 'get',
                                        url: '/webapps/hermes/api/auth'
                                    }).then(result => {
                                        if (result && result.data && result.data.access_token) {
                                            addHeader('x-paypal-internal-euat', result.data.access_token);
                                        }
                                    }).catch(err2 => {
                                        // pass
                                    });
                                }

                            } catch (err) {
                                // pass
                            }

                        }).then(() => {
                            return original.call(this, data, { ...actions, close, redirect });
                        }).finally(() => {
                            return this.close();
                        });
                    };
                }
            }
        },

        onPaymentComplete: {
            type: 'function',
            required: false,
            sendToChild: false
        },

        onAuth: {
            type: 'function',
            required: false,
            sameDomain: true,
            decorate(original) {
                return function() {
                    enableCheckoutIframe(); // eslint-disable-line
                    if (original) {
                        return original.apply(this, arguments);
                    }
                };
            }
        },

        onCancel: {
            type: 'function',
            required: false,
            once: true,
            alias: 'onPaymentCancel',

            decorate(original) {
                if (original) {
                    return function(data, actions = {}) {

                        let close = () => {
                            return Promise.try(() => {
                                if (actions.close) {
                                    return actions.close();
                                }
                            }).then(() => {
                                return this.closeComponent();
                            });
                        };

                        let redirect = (win, url) => {

                            win = win || window.top;
                            url = url || data.cancelUrl;

                            setTimeout(() => {
                                win.location = url;
                            }, 1);

                            return close().then(() => {
                                if (urlWillRedirectPage(url)) {
                                    return new Promise();
                                }
                            });
                        };

                        return Promise.try(() => {
                            return original.call(this, data, { ...actions, close, redirect });
                        }).finally(() => {
                            this.close();
                        });
                    };
                }
            }
        },

        init: {
            type: 'function',
            required: false,
            once: true,

            def() {
                return function(data) {

                    this.paymentToken = data.paymentToken;
                    this.cancelUrl    = data.cancelUrl;
                };
            }
        },

        onClose: {
            type: 'function',
            required: false,
            once: true,
            promisify: true,

            def() {
                return function(reason) {
                    let CLOSE_REASONS = xcomponent.CONSTANTS.CLOSE_REASONS;

                    if (this.props.onCancel && this.paymentToken && this.cancelUrl && [ CLOSE_REASONS.CLOSE_DETECTED, CLOSE_REASONS.USER_CLOSED ].indexOf(reason) !== -1) {
                        return this.props.onCancel({
                            paymentToken: this.paymentToken,
                            cancelUrl:    this.cancelUrl
                        });
                    }
                };
            }
        },

        onError: {
            type: 'function',
            required: false,
            promisify: true,
            def() {
                return window.xprops && window.xprops.onError || noop;
            },
            once: true
        },

        fallback: {
            type: 'function',
            required: false,
            once: true,

            def() {
                return function(url) {
                    $logger.warn('fallback', { url });
                    return window.onLegacyPaymentAuthorize(this.props.onAuthorize);
                };
            }
        },

        testAction: {
            type: 'string',
            required: false,
            def() {
                return 'checkout';
            }
        }
    },

    autoResize: true,

    get dimensions() {

        if (isDevice()) {
            return {
                width: '100%',
                height: '100%'
            };
        }

        if (this.contexts.lightbox) {
            return {
                width: '450px',
                height: '300px'
            };
        }

        return {
            width: '450px',
            height: '535px'
        };
    }
});

let enableCheckoutIframeTimeout;

export function enableCheckoutIframe() {

    Checkout.contexts.lightbox = true;
    Checkout.contexts.iframe = true;

    if (enableCheckoutIframeTimeout) {
        clearTimeout(enableCheckoutIframeTimeout);
    }

    enableCheckoutIframeTimeout = setTimeout(() => {
        Checkout.contexts.lightbox = false;
        Checkout.contexts.iframe = false;
    }, 5 * 60 * 1000);
}
