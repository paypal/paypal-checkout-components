/* @flow */
/* eslint max-lines: 0 */

import { extendUrl } from '../../../src/lib/dom';
import { onHashChange, generateECToken, createTestContainer, destroyTestContainer, preventOpenWindow,
    createElement, uniqueID, getElement, assert } from '../common';

for (let flow of [ 'popup', 'iframe' ]) {

    describe(`paypal legacy legacy error cases on ${ flow }`, () => {

        beforeEach(() => {
            createTestContainer();
            window.paypal.Checkout.contexts.iframe = (flow === 'iframe');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            window.paypal.Checkout.contexts.iframe = false;
        });

        it('should call standalone startFlow with a url and redirect to full-page if the window.open fails', () => {

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
            let token = generateECToken();

            testButton.addEventListener('click', () => {
                window.paypal.checkout.startFlow(`#redirectUrl?token=${ token }`);
            });

            preventOpenWindow(flow);

            testButton.click();

            return onHashChange().then(urlHash => {
                assert.equal(urlHash, `#redirectUrl?token=${ token }`);
            }).toPromise();
        });

        it('should call standalone startFlow with a url and redirect to full-page if there is an error on the page', () => {

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
            let token = generateECToken();

            testButton.addEventListener('click', () => {
                window.paypal.checkout.startFlow(token);
            });

            window.__test__ = { action: 'error' };

            testButton.click();

            return onHashChange().then(urlHash => {
                assert.equal(urlHash, `#fullpageRedirect?url=${ extendUrl(window.paypal.config.checkoutUrl, { token }) }`);
            }).toPromise();
        });

        it('should call startFlow and redirect to full-page if the window.open fails with immediate startFlow', () => {

            let token = generateECToken();

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {
                    window.paypal.checkout.startFlow(`#redirectUrl?token=${ token }`);
                }

            }).then(() => {

                preventOpenWindow(flow);

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#redirectUrl?token=${ token }`);
                });
            });
        });

        it('should call startFlow and redirect to full-page if there is an error from the page', () => {

            let token = generateECToken();
            let redirectUrl = extendUrl(`${ window.paypal.checkout.urlPrefix }${ token }`);

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {
                    window.paypal.checkout.startFlow(redirectUrl);
                }

            }).then(() => {

                window.__test__ = { action: 'error' };

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#fullpageRedirect?url=${ redirectUrl }`);
                });
            });
        });

        it('should call startFlow and redirect to full-page if the window.open fails with initXO and startFlow', () => {

            let token = generateECToken();

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {
                    window.paypal.checkout.initXO();

                    setTimeout(() => {
                        window.paypal.checkout.startFlow(`#redirectUrl?token=${ token }`);
                    }, 200);
                }

            }).then(() => {

                preventOpenWindow(flow);

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#redirectUrl?token=${ token }`);
                });
            });
        });

        it('should call startFlow and redirect to full-page with initXO and startFlow, with an error from the page', () => {

            let token = generateECToken();
            let redirectUrl = extendUrl(`${ window.paypal.checkout.urlPrefix }${ token }`);

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {
                    window.paypal.checkout.initXO();

                    setTimeout(() => {
                        window.paypal.checkout.startFlow(redirectUrl);
                    }, 200);
                }

            }).then(() => {

                window.__test__ = { action: 'error' };

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#fullpageRedirect?url=${ redirectUrl }`);
                });
            });
        });

        it('should call startFlow with a token and redirect to full-page if the window.open fails with immediate startFlow', () => {

            let token = generateECToken();

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {
                    window.paypal.checkout.startFlow(token);
                }

            }).then(() => {

                let paypalCheckoutUrlDescriptor = Object.getOwnPropertyDescriptor(window.paypal.config, 'checkoutUrl');
                delete window.paypal.config.checkoutUrl;

                window.paypal.config.checkoutUrl = '#errorRedirectUrl';

                preventOpenWindow(flow);

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    // $FlowFixMe
                    Object.defineProperty(window.paypal.config, 'checkoutUrl', paypalCheckoutUrlDescriptor);
                    assert.equal(urlHash, `#errorRedirectUrl?token=${ token }`);
                });
            });
        });

        it('should call startFlow with a token and redirect to full-page if there is an error from the page', () => {

            let token = generateECToken();
            let redirectUrl = extendUrl(`${ window.paypal.checkout.urlPrefix }${ token }`);

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {
                    window.paypal.checkout.startFlow(token);
                }

            }).then(() => {

                window.__test__ = { action: 'error' };

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#fullpageRedirect?url=${ redirectUrl }`);
                });
            });
        });


        it('should run hijack case and redirect to full page if the window.open fails', () => {

            let token = generateECToken();

            let testForm = createElement({
                tag:       'form',
                container: 'testContainer',
                id:        'testForm',
                props:     {
                    action: `#errorRedirectUrl?token=${ token }`
                },

                children: [
                    {
                        tag:   'input',
                        props: {
                            name:  'token',
                            value: token
                        }
                    }
                ]
            });

            testForm.addEventListener('submit', event => {
                // $FlowFixMe
                if (!testForm.target) {
                    event.preventDefault();
                    window.location = testForm.getAttribute('action');
                }
            });

            return window.paypal.checkout.setup('merchantID', {

                container: 'testForm'

            }).then(() => {

                preventOpenWindow(flow);

                let result = onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#errorRedirectUrl?token=${ token }`);
                });

                getElement('button', testForm).click();

                return result;
            });
        });

        it('should run hijack case and redirect to full page if there is an error from the page', () => {

            let token = generateECToken();

            let testForm = createElement({
                tag:       'form',
                container: 'testContainer',
                id:        'testForm',
                props:     {
                    action: window.paypal.config.checkoutUrl
                },

                children: [
                    {
                        tag:   'input',
                        props: {
                            name:  'token',
                            value: token
                        }
                    }
                ]
            });

            return window.paypal.checkout.setup('merchantID', {

                container: 'testForm'

            }).then(() => {

                window.__test__ = { action: 'error' };

                getElement('button', testForm).click();

                let CheckoutUrlDescriptor = Object.getOwnPropertyDescriptor(window.paypal.config, 'checkoutUrl');
                delete window.paypal.config.checkoutUrl;

                window.paypal.config.checkoutUrl = '#errorRedirectUrl';

                return onHashChange().then(urlHash => {
                    // $FlowFixMe
                    Object.defineProperty(window.paypal.config, 'checkoutUrl', CheckoutUrlDescriptor);
                    assert.equal(urlHash, `#errorRedirectUrl?token=${ token }`);
                });
            });
        });

        it('should run a hybrid case, and redirect to full page if the window.open fails', () => {

            let token = generateECToken();
            let hash = uniqueID();

            let testForm = createElement({
                tag:       'form',
                container: 'testContainer',
                id:        'testForm',
                props:     {
                    action: `${ window.paypal.config.checkoutUrl }&token=${ token }#${ hash }`
                },

                children: [
                    {
                        tag:   'input',
                        props: {
                            name:  'token',
                            value: token
                        }
                    }
                ]
            });

            return window.paypal.checkout.setup('merchantID', {

                container: 'testForm'

            }).then(() => {

                getElement('button', testForm).addEventListener('click', (event : Event) => {
                    event.preventDefault();
                    window.paypal.checkout.startFlow(`#errorRedirectUrl?token=${ token }`);
                });

                preventOpenWindow(flow);

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#errorRedirectUrl?token=${ token }`);
                });
            });
        });

        it('should run a hybrid case, and redirect to full page if there is an error from the page', () => {

            let token = generateECToken();
            let hash = uniqueID();
            let redirectUrl = extendUrl(`${ window.paypal.checkout.urlPrefix }${ token }`);

            let testForm = createElement({
                tag:       'form',
                container: 'testContainer',
                id:        'testForm',
                props:     {
                    action: `${ window.paypal.config.checkoutUrl }&token=${ token }#${ hash }`
                },

                children: [
                    {
                        tag:   'input',
                        props: {
                            name:  'token',
                            value: token
                        }
                    }
                ]
            });

            return window.paypal.checkout.setup('merchantID', {

                container: 'testForm'

            }).then(() => {

                getElement('button', testForm).addEventListener('click', (event : Event) => {
                    event.preventDefault();
                    window.paypal.checkout.startFlow(redirectUrl);
                });

                window.__test__ = { action: 'error' };

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#fullpageRedirect?url=${ redirectUrl }`);
                });
            });
        });

        it('should call startFlow with no token and trigger an error', (done) => {

            window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() : void {
                    try {
                        window.paypal.checkout.startFlow();
                    } catch (err) {
                        return done();
                    }

                    return done(new Error('Expected startFlow to throw an error'));
                }

            }).then(() => {

                getElement('#testContainer button').click();
            }).catch(done);
        });

        it('should call startFlow with an invalid url for the env and trigger a full page redirect', () => {

            let token = generateECToken();

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {
                    window.paypal.checkout.startFlow(`https://www.sandbox.paypal.com/checkoutnow?token=${ token }`);
                }

            }).then(() => {

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#fullpageRedirect?url=https://www.sandbox.paypal.com/checkoutnow?token=${ token }`);
                });
            });
        });

        it('should call initXO and startFlow with an invalid url for the env and trigger a full page redirect', () => {

            let token = generateECToken();

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {
                    window.paypal.checkout.initXO();

                    setTimeout(() => {
                        window.paypal.checkout.startFlow(`https://www.sandbox.paypal.com/checkoutnow?token=${ token }`);
                    }, 200);
                }

            }).then(() => {

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#fullpageRedirect?url=https://www.sandbox.paypal.com/checkoutnow?token=${ token }`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call startFlow, then fallback', () => {

            let token = generateECToken();

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {
                    window.paypal.checkout.startFlow(token);
                }

            }).then(() => {

                window.__test__ = { action: 'fallback' };

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#fallbackUrl?token=${ token }`);
                });
            });
        });

    });
}
