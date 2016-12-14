
import paypal from 'src/index';
import { Checkout } from 'src/index';
import { config } from 'src/config';

import { onHashChange, generateECToken, createTestContainer, destroyTestContainer, preventOpenWindow, createElement, uniqueID } from '../common';

for (let flow of [ 'popup', 'lightbox' ]) {

    describe(`paypal legacy legacy error cases on ${flow}`, () => {

        beforeEach(() => {
            createTestContainer();
            paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
            window.onerror = () => {
                // pass
            };
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            paypal.Checkout.contexts.lightbox = false;
        });

        it('should call standalone startFlow with a url and redirect to full-page if the window.open fails', () => {

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
            let token = generateECToken();

            testButton.addEventListener('click', event => {
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

            testButton.addEventListener('click', event => {
                paypal.checkout.startFlow(`#redirectUrl?token=${token}`);
            });

            Checkout.props.testAction.def = () => 'error';

            testButton.click();

            return onHashChange().then(urlHash => {
                Checkout.props.testAction.def = () => 'checkout';
                assert.equal(urlHash, `#redirectUrl?token=${token}`);
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

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#redirectUrl?token=${token}`);
                });
            });
        });

        it('should call startFlow and redirect to full-page if there is an error from the page', () => {

            let token = generateECToken();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.startFlow(`#redirectUrl?token=${token}`);
                }

            }).then(() => {

                Checkout.props.testAction.def = () => 'error';

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    Checkout.props.testAction.def = () => 'checkout';
                    assert.equal(urlHash, `#redirectUrl?token=${token}`);
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

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#redirectUrl?token=${token}`);
                });
            });
        });

        it('should call startFlow and redirect to full-page with initXO and startFlow, with an error from the page', () => {

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

                Checkout.props.testAction.def = () => 'error';

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    Checkout.props.testAction.def = () => 'checkout';
                    assert.equal(urlHash, `#redirectUrl?token=${token}`);
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

                let checkoutUrlDescriptor = Object.getOwnPropertyDescriptor(config, 'checkoutUrl');
                delete config.checkoutUrl;
                config.checkoutUrl = '#errorRedirectUrl';

                preventOpenWindow(flow);

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    Object.defineProperty(config, 'checkoutUrl', checkoutUrlDescriptor);
                    assert.equal(urlHash, `#errorRedirectUrl?token=${token}`);
                });
            });
        });

        it('should call startFlow with a token and redirect to full-page if there is an error from the page', () => {

            let token = generateECToken();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.startFlow(token);
                }

            }).then(() => {

                let checkoutUrlDescriptor = Object.getOwnPropertyDescriptor(config, 'checkoutUrl');
                delete config.checkoutUrl;
                config.checkoutUrl = '#errorRedirectUrl';

                Checkout.props.testAction.def = () => 'error';

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    Checkout.props.testAction.def = () => 'checkout';
                    Object.defineProperty(config, 'checkoutUrl', checkoutUrlDescriptor);
                    assert.equal(urlHash, `#errorRedirectUrl?token=${token}`);
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
                    window.location = testForm.action;
                }
            });

            return paypal.checkout.setup('merchantID', {

                container: 'testForm'

            }).then(() => {

                preventOpenWindow(flow);

                let result = onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#errorRedirectUrl?token=${token}`);
                });

                testForm.querySelector('button').click();

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

                Checkout.props.testAction.def = () => 'error';

                testForm.querySelector('button').click();

                let checkoutUrlDescriptor = Object.getOwnPropertyDescriptor(config, 'checkoutUrl');
                delete config.checkoutUrl;
                config.checkoutUrl = '#errorRedirectUrl';

                return onHashChange().then(urlHash => {
                    Checkout.props.testAction.def = () => 'checkout';
                    Object.defineProperty(config, 'checkoutUrl', checkoutUrlDescriptor);
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

                testForm.querySelector('button').addEventListener('click', event => {
                    event.preventDefault();
                    paypal.checkout.startFlow(`#errorRedirectUrl?token=${token}`);
                });

                preventOpenWindow(flow);

                testForm.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#errorRedirectUrl?token=${token}`);
                });
            });
        });

        it('should run a hybrid case, and redirect to full page if there is an error from the page', () => {

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

                testForm.querySelector('button').addEventListener('click', event => {
                    event.preventDefault();
                    paypal.checkout.startFlow(`#errorRedirectUrl?token=${token}`);
                });

                Checkout.props.testAction.def = () => 'error';

                testForm.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    Checkout.props.testAction.def = () => 'checkout';
                    assert.equal(urlHash, `#errorRedirectUrl?token=${token}`);
                });
            });
        });

        it('should call startFlow with no token and trigger an error', (done) => {

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    try {
                        paypal.checkout.startFlow();
                    } catch (err) {
                        return done();
                    }

                    return done(new Error('Expected startFlow to throw an error'));
                }

            }).then(() => {

                document.querySelector('#testContainer button').click();
            });
        });

        it('should call startFlow with an invalid url for the env and trigger an error', (done) => {

            let token = generateECToken();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    try {
                        paypal.checkout.startFlow(`https://www.sandbox.paypal.com/checkoutnow?token=${token}`);
                    } catch (err) {
                        return done();
                    }

                    return done(new Error('Expected startFlow to throw an error'));
                }

            }).then(() => {

                document.querySelector('#testContainer button').click();
            });
        });

        it('should render a button into a container and click on the button, then call startFlow, then fall back', () => {

            let token = generateECToken();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.startFlow(token);
                }

            }).then(() => {

                Checkout.props.testAction.def = () => 'fallback';

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    Checkout.props.testAction.def = () => 'checkout';
                    assert.equal(urlHash, `#fallbackUrl?token=${token}`);
                });
            });
        });

    });
}
