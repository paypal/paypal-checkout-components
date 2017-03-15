/* @flow */

import paypal from 'src/index';
import { extendUrl } from 'src/lib';
import { assert } from 'chai';
import { config } from 'src/config';

import { onHashChange, generateECToken, createTestContainer, destroyTestContainer, preventOpenWindow, createElement, uniqueID, getElement } from '../common';

for (let flow of [ 'popup', 'lightbox' ]) {

    describe(`paypal legacy legacy error cases on ${flow}`, () => {

        beforeEach(() => {
            createTestContainer();
            paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            paypal.Checkout.contexts.lightbox = false;
        });

        it('should call standalone startFlow with a url and redirect to full-page if the window.open fails', () => {

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
            let token = generateECToken();

            testButton.addEventListener('click', (event : Event) => {
                paypal.checkout.startFlow(`#redirectUrl?token=${token}`);
            });

            preventOpenWindow(flow);

            testButton.click();

            return onHashChange().then(urlHash => {
                assert.equal(urlHash, `#redirectUrl?token=${token}`);
            });
        });

        it('should call standalone startFlow with a url and redirect to full-page if there is an error on the page', () => {

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
            let token = generateECToken();

            testButton.addEventListener('click', (event : Event) => {
                paypal.checkout.startFlow(token);
            });

            paypal.Checkout.props.testAction.def = () => 'error';

            testButton.click();

            return onHashChange().then(urlHash => {
                paypal.Checkout.props.testAction.def = () => 'checkout';

                assert.equal(urlHash, `#fullpageRedirect?url=${extendUrl(config.checkoutUrl, { token })}`);
            });
        });

        it('should call startFlow and redirect to full-page if the window.open fails with immediate startFlow', () => {

            let token = generateECToken();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.startFlow(`#redirectUrl?token=${token}`);
                }

            }).then(() => {

                preventOpenWindow(flow);

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#redirectUrl?token=${token}`);
                });
            });
        });

        it('should call startFlow and redirect to full-page if there is an error from the page', () => {

            let token = generateECToken();
            let redirectUrl = extendUrl(`${paypal.checkout.urlPrefix}${token}`);

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.startFlow(redirectUrl);
                }

            }).then(() => {

                paypal.Checkout.props.testAction.def = () => 'error';

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    paypal.Checkout.props.testAction.def = () => 'checkout';

                    assert.equal(urlHash, `#fullpageRedirect?url=${redirectUrl}`);
                });
            });
        });

        it('should call startFlow and redirect to full-page if the window.open fails with initXO and startFlow', () => {

            let token = generateECToken();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.initXO();

                    setTimeout(() => {
                        paypal.checkout.startFlow(`#redirectUrl?token=${token}`);
                    }, 200);
                }

            }).then(() => {

                preventOpenWindow(flow);

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#redirectUrl?token=${token}`);
                });
            });
        });

        it('should call startFlow and redirect to full-page with initXO and startFlow, with an error from the page', () => {

            let token = generateECToken();
            let redirectUrl = extendUrl(`${paypal.checkout.urlPrefix}${token}`);

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.initXO();

                    setTimeout(() => {
                        paypal.checkout.startFlow(redirectUrl);
                    }, 200);
                }

            }).then(() => {

                paypal.Checkout.props.testAction.def = () => 'error';

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    paypal.Checkout.props.testAction.def = () => 'checkout';
                    assert.equal(urlHash, `#fullpageRedirect?url=${redirectUrl}`);
                });
            });
        });

        it('should call startFlow with a token and redirect to full-page if the window.open fails with immediate startFlow', () => {

            let token = generateECToken();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.startFlow(token);
                }

            }).then(() => {

                let paypalCheckoutUrlDescriptor = Object.getOwnPropertyDescriptor(config, 'checkoutUrl');
                delete config.checkoutUrl;

                // $FlowFixMe
                config.checkoutUrl = '#errorRedirectUrl';

                preventOpenWindow(flow);

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {

                    // $FlowFixMe
                    Object.defineProperty(config, 'checkoutUrl', paypalCheckoutUrlDescriptor);
                    assert.equal(urlHash, `#errorRedirectUrl?token=${token}`);
                });
            });
        });

        it('should call startFlow with a token and redirect to full-page if there is an error from the page', () => {

            let token = generateECToken();
            let redirectUrl = extendUrl(`${paypal.checkout.urlPrefix}${token}`);

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.startFlow(token);
                }

            }).then(() => {

                paypal.Checkout.props.testAction.def = () => 'error';

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    paypal.Checkout.props.testAction.def = () => 'checkout';

                    assert.equal(urlHash, `#fullpageRedirect?url=${redirectUrl}`);
                });
            });
        });


        it('should run hijack case and redirect to full page if the window.open fails', () => {

            let token = generateECToken();

            let testForm = createElement({
                tag: 'form',
                container: 'testContainer',
                id: 'testForm',
                props: {
                    action: `#errorRedirectUrl?token=${token}`
                },

                children: [
                    {
                        tag: 'input',
                        props: {
                            name: 'token',
                            value: token
                        }
                    }
                ]
            });

            testForm.addEventListener('submit', event => {
                if (!testForm.target) {
                    event.preventDefault();
                    window.location = testForm.getAttribute('action');
                }
            });

            return paypal.checkout.setup('merchantID', {

                container: 'testForm'

            }).then(() => {

                preventOpenWindow(flow);

                let result = onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#errorRedirectUrl?token=${token}`);
                });

                getElement('button', testForm).click();

                return result;
            });
        });

        it('should run hijack case and redirect to full page if there is an error from the page', () => {

            let token = generateECToken();

            let testForm = createElement({
                tag: 'form',
                container: 'testContainer',
                id: 'testForm',
                props: {
                    action: config.checkoutUrl
                },

                children: [
                    {
                        tag: 'input',
                        props: {
                            name: 'token',
                            value: token
                        }
                    }
                ]
            });

            return paypal.checkout.setup('merchantID', {

                container: 'testForm'

            }).then(() => {

                paypal.Checkout.props.testAction.def = () => 'error';

                getElement('button', testForm).click();

                let CheckoutUrlDescriptor = Object.getOwnPropertyDescriptor(config, 'checkoutUrl');
                delete config.checkoutUrl;

                // $FlowFixMe
                config.checkoutUrl = '#errorRedirectUrl';

                return onHashChange().then(urlHash => {
                    paypal.Checkout.props.testAction.def = () => 'checkout';

                    // $FlowFixMe
                    Object.defineProperty(config, 'checkoutUrl', CheckoutUrlDescriptor);
                    assert.equal(urlHash, `#errorRedirectUrl?token=${token}`);
                });
            });
        });

        it('should run a hybrid case, and redirect to full page if the window.open fails', () => {

            let token = generateECToken();
            let hash = uniqueID();

            let testForm = createElement({
                tag: 'form',
                container: 'testContainer',
                id: 'testForm',
                props: {
                    action: `${config.checkoutUrl}&token=${token}#${hash}`
                },

                children: [
                    {
                        tag: 'input',
                        props: {
                            name: 'token',
                            value: token
                        }
                    }
                ]
            });

            return paypal.checkout.setup('merchantID', {

                container: 'testForm'

            }).then(() => {

                getElement('button', testForm).addEventListener('click', (event : Event) => {
                    event.preventDefault();
                    paypal.checkout.startFlow(`#errorRedirectUrl?token=${token}`);
                });

                preventOpenWindow(flow);

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#errorRedirectUrl?token=${token}`);
                });
            });
        });

        it('should run a hybrid case, and redirect to full page if there is an error from the page', () => {

            let token = generateECToken();
            let hash = uniqueID();
            let redirectUrl = extendUrl(`${paypal.checkout.urlPrefix}${token}`);

            let testForm = createElement({
                tag: 'form',
                container: 'testContainer',
                id: 'testForm',
                props: {
                    action: `${config.checkoutUrl}&token=${token}#${hash}`
                },

                children: [
                    {
                        tag: 'input',
                        props: {
                            name: 'token',
                            value: token
                        }
                    }
                ]
            });

            return paypal.checkout.setup('merchantID', {

                container: 'testForm'

            }).then(() => {

                getElement('button', testForm).addEventListener('click', (event : Event) => {
                    event.preventDefault();
                    paypal.checkout.startFlow(redirectUrl);
                });

                paypal.Checkout.props.testAction.def = () => 'error';

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    paypal.Checkout.props.testAction.def = () => 'checkout';
                    assert.equal(urlHash, `#fullpageRedirect?url=${redirectUrl}`);
                });
            });
        });

        it('should call startFlow with no token and trigger an error', (done) => {

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) : void {
                    try {
                        paypal.checkout.startFlow();
                    } catch (err) {
                        return done();
                    }

                    return done(new Error('Expected startFlow to throw an error'));
                }

            }).then(() => {

                getElement('#testContainer button').click();
            });
        });

        it('should call startFlow with an invalid url for the env and trigger a full page redirect', () => {

            let token = generateECToken();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.startFlow(`https://www.sandbox.paypal.com/checkoutnow?token=${token}`);
                }

            }).then(() => {

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#fullpageRedirect?url=https://www.sandbox.paypal.com/checkoutnow?token=${token}`);
                });
            });
        });

        it('should call initXO and startFlow with an invalid url for the env and trigger a full page redirect', () => {

            let token = generateECToken();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.initXO();

                    setTimeout(() => {
                        paypal.checkout.startFlow(`https://www.sandbox.paypal.com/checkoutnow?token=${token}`);
                    }, 200);
                }

            }).then(() => {

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#fullpageRedirect?url=https://www.sandbox.paypal.com/checkoutnow?token=${token}`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call startFlow, then fallback', () => {

            let token = generateECToken();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.startFlow(token);
                }

            }).then(() => {

                paypal.Checkout.props.testAction.def = () => 'fallback';

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    paypal.Checkout.props.testAction.def = () => 'checkout';
                    assert.equal(urlHash, `#fallbackUrl?token=${token}`);
                });
            });
        });

    });
}
