/* @flow */
/* eslint max-lines: 0 */

import type { CrossDomainWindowType } from 'cross-domain-utils/src';

import { onHashChange, uniqueID, generateECToken, CHILD_REDIRECT_URI, IE8_USER_AGENT,
    createElement, createTestContainer, destroyTestContainer, getElement, assert } from '../common';

for (const flow of [ 'popup', 'iframe' ]) {

    describe(`paypal legacy checkout flow with custom click handler on ${ flow }`, () => {

        beforeEach(() => {
            createTestContainer();
            window.paypal.Checkout.contexts.iframe = (flow === 'iframe');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            window.paypal.Checkout.contexts.iframe = false;
        });

        it('should render a button into a form container and click on the button, with a custom listener and immediate startFlow', () => {

            const token = generateECToken();
            const hash = uniqueID();

            const testForm = createElement({
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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                getElement('button', testForm).addEventListener('click', (event : Event) => {
                    event.preventDefault();
                    window.paypal.checkout.startFlow(token);
                });

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a button into a form container without passing container and click on the button, with a custom listener and immediate startFlow', () => {

            const token = generateECToken();
            const hash = uniqueID();

            createElement({
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

            const testButton = createElement({
                tag:       'button',
                container: 'testForm'
            });

            return window.paypal.checkout.setup('merchantID', {

                click() {
                    // pass
                }

            }).then(() => {

                testButton.addEventListener('click', (event : Event) => {
                    event.preventDefault();
                    window.paypal.checkout.startFlow(token);
                });

                testButton.click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener, initXO and startFlow', () => {

            const token = generateECToken();
            const hash = uniqueID();

            const testForm = createElement({
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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                getElement('button', testForm).addEventListener('click', (event : Event) => {
                    event.preventDefault();
                    window.paypal.checkout.initXO();

                    setTimeout(() => {
                        window.paypal.checkout.startFlow(token);
                    }, 50);
                });

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a button into a form container without passing container and click on the button, with a custom listener, initXO and startFlow', () => {

            const token = generateECToken();
            const hash = uniqueID();

            createElement({
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

            const testButton = createElement({
                tag:       'button',
                container: 'testForm'
            });

            return window.paypal.checkout.setup('merchantID', {

                click() {
                    // pass
                }

            }).then(() => {

                testButton.addEventListener('click', (event : Event) => {
                    event.preventDefault();
                    window.paypal.checkout.initXO();

                    setTimeout(() => {
                        window.paypal.checkout.startFlow(token);
                    }, 50);
                });

                testButton.click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener and immediate startFlow, and a cancel', () => {

            const token = generateECToken();
            const hash = uniqueID();

            const testForm = createElement({
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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                getElement('button', testForm).addEventListener('click', (event : Event) => {
                    event.preventDefault();
                    window.paypal.checkout.startFlow(token);
                });

                window.__test__ = { action: 'cancel' };

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#cancel?token=${ token }`);
                });
            });
        });

        it('should render a button into a link and click on the button, with a custom listener and immediate startFlow', () => {

            const token = generateECToken();
            const hash = uniqueID();

            const testLink = createElement({
                tag:       'a',
                id:        'testLink',
                container: 'testContainer',
                props:     {
                    href: `${ window.paypal.config.checkoutUrl }&token=${ token }#${ hash }`
                }
            });

            return window.paypal.checkout.setup('merchantID', {

                container: 'testLink',

                click() {
                    // pass
                }

            }).then(() => {

                getElement('button', testLink).addEventListener('click', (event : Event) => {
                    event.preventDefault();
                    window.paypal.checkout.startFlow(token);
                });

                getElement('button', testLink).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a custom button into a form container and click on the button', () => {

            const token = generateECToken();
            const hash = uniqueID();

            const testForm = createElement({
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
                    },

                    {
                        tag: 'button',
                        id:  'testButton'
                    }
                ]
            });

            return window.paypal.checkout.setup('merchantID', {

                button: 'testButton',

                click() {
                    // pass
                }

            }).then(() => {

                getElement('button', testForm).addEventListener('click', (event : Event) => {
                    event.preventDefault();
                    window.paypal.checkout.startFlow(token);
                });

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a custom link and click on the link', () => {

            const token = generateECToken();
            const hash = uniqueID();

            const testLink = createElement({
                tag:       'a',
                id:        'testLink',
                container: 'testContainer',
                props:     {
                    href: `${ window.paypal.config.checkoutUrl }&token=${ token }#${ hash }`
                }
            });

            return window.paypal.checkout.setup('merchantID', {

                button: 'testLink',

                click() {
                    // pass
                }

            }).then(() => {

                testLink.addEventListener('click', (event : Event) => {
                    event.preventDefault();
                    window.paypal.checkout.startFlow(token);
                });

                testLink.click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a custom button into a form container and click on the button, with an advance click listener', () => {

            const token = generateECToken();
            const hash = uniqueID();

            const testForm = createElement({
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
                    },

                    {
                        tag: 'button',
                        id:  'testButton'
                    }
                ]
            });

            getElement('button', testForm).addEventListener('click', (event : Event) => {
                event.preventDefault();
                window.paypal.checkout.initXO();

                setTimeout(() => {
                    window.paypal.checkout.startFlow(token);
                }, 200);
            });

            let openCount = 0;

            const windowOpen = window.open;
            window.open = function overrideWindowOpen() : CrossDomainWindowType {

                openCount += 1;

                if (openCount > 1) {
                    window.open = windowOpen;
                    throw new Error(`window.open was called multiple times`);
                }

                return windowOpen.apply(this, arguments);
            };

            return window.paypal.checkout.setup('merchantID', {

                button: 'testButton',

                click() {
                    // pass
                }

            }).then(() => {

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                    window.open = windowOpen;
                });
            });
        });

        it('should render a custom link and click on the link, with an advance click listener', () => {

            const token = generateECToken();
            const hash = uniqueID();

            const testLink = createElement({
                tag:       'a',
                id:        'testLink',
                container: 'testContainer',
                props:     {
                    href: `${ window.paypal.config.checkoutUrl }&token=${ token }#${ hash }`
                }
            });

            testLink.addEventListener('click', (event : Event) => {
                event.preventDefault();
                window.paypal.checkout.initXO();

                setTimeout(() => {
                    window.paypal.checkout.startFlow(token);
                }, 200);
            });

            let openCount = 0;

            const windowOpen = window.open;
            window.open = function overrideWindowOpen() : CrossDomainWindowType {

                openCount += 1;

                if (openCount > 1) {
                    window.open = windowOpen;
                    throw new Error(`window.open was called multiple times`);
                }

                return windowOpen.apply(this, arguments);
            };

            return window.paypal.checkout.setup('merchantID', {

                button: 'testLink',

                click() {
                    // pass
                }

            }).then(() => {

                testLink.click();

                return onHashChange().then(urlHash => {
                    window.open = windowOpen;
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });


        it('should render a button into a form container and click on the button, with a custom listener and immediate startFlow with a url', () => {

            const token = generateECToken();
            const hash = uniqueID();

            const testForm = createElement({
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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                getElement('button', testForm).addEventListener('click', (event : Event) => {
                    event.preventDefault();
                    window.paypal.checkout.startFlow(`${ window.paypal.config.checkoutUrl }&token=${ token }#${ hash }`);
                });

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY&hash=${ hash }`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener and immediate startFlow with a url in an ineligible browser', () => {

            const token = generateECToken();
            const hash = uniqueID();

            Object.defineProperty(window.navigator, 'userAgent', {
                value:        IE8_USER_AGENT,
                configurable: true
            });

            const testForm = createElement({
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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                getElement('button', testForm).addEventListener('click', (event : Event) => {
                    event.preventDefault();
                    window.paypal.checkout.startFlow(`#fullpageRedirectUrl?token=${ token }`);
                });

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#fullpageRedirectUrl?token=${ token }`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener, initXO and immediate startFlow', () => {

            const token = generateECToken();
            const hash = uniqueID();

            const testForm = createElement({
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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                getElement('button', testForm).addEventListener('click', (event : Event) => {
                    event.preventDefault();
                    window.paypal.checkout.initXO();
                    window.paypal.checkout.startFlow(token);
                });

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener, initXO and immediate startFlow with a url', () => {

            const token = generateECToken();
            const hash = uniqueID();

            const testForm = createElement({
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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                getElement('button', testForm).addEventListener('click', (event : Event) => {
                    event.preventDefault();
                    window.paypal.checkout.initXO();
                    window.paypal.checkout.startFlow(`${ window.paypal.config.checkoutUrl }&token=${ token }#${ hash }`);
                });

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY&hash=${ hash }`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener, initXO and immediate startFlow with a url in an ineligible browser', () => {

            const token = generateECToken();
            const hash = uniqueID();

            Object.defineProperty(window.navigator, 'userAgent', {
                value:        IE8_USER_AGENT,
                configurable: true
            });

            const testForm = createElement({
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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                getElement('button', testForm).addEventListener('click', (event : Event) => {
                    event.preventDefault();
                    window.paypal.checkout.initXO();
                    window.paypal.checkout.startFlow(`#fullpageRedirectUrl?token=${ token }`);
                });

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#fullpageRedirectUrl?token=${ token }`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener, initXO and startFlow', () => {

            const token = generateECToken();
            const hash = uniqueID();

            const testForm = createElement({
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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                getElement('button', testForm).addEventListener('click', (event : Event) => {
                    event.preventDefault();
                    window.paypal.checkout.initXO();
                    setTimeout(() => {
                        window.paypal.checkout.startFlow(token);
                    }, 200);
                });

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener, initXO and startFlow with a url', () => {

            const token = generateECToken();
            const hash = uniqueID();

            const testForm = createElement({
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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                getElement('button', testForm).addEventListener('click', (event : Event) => {
                    event.preventDefault();
                    window.paypal.checkout.initXO();
                    setTimeout(() => {
                        window.paypal.checkout.startFlow(`${ window.paypal.config.checkoutUrl }&token=${ token }#${ hash }`);
                    }, 200);
                });

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY&hash=${ hash }`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener, initXO and startFlow with a url in an ineligible browser', () => {

            const token = generateECToken();
            const hash = uniqueID();

            Object.defineProperty(window.navigator, 'userAgent', {
                value:        IE8_USER_AGENT,
                configurable: true
            });

            const testForm = createElement({
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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                getElement('button', testForm).addEventListener('click', (event : Event) => {
                    event.preventDefault();
                    window.paypal.checkout.initXO();
                    setTimeout(() => {
                        window.paypal.checkout.startFlow(`#fullpageRedirectUrl?token=${ token }`);
                    }, 200);
                });

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#fullpageRedirectUrl?token=${ token }`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener, initXO and startFlow with a url with no token', () => {

            const token = generateECToken();
            const hash = uniqueID();

            const testForm = createElement({
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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                getElement('button', testForm).addEventListener('click', (event : Event) => {
                    event.preventDefault();
                    window.paypal.checkout.initXO();
                    setTimeout(() => {
                        window.paypal.checkout.startFlow(`${ CHILD_REDIRECT_URI }#${ hash }`);
                    }, 200);
                });

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=EC-XXXXXXXXXXXXXXXXX&PayerID=YYYYYYYYYYYYY&hash=${ hash }`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener, initXO and startFlow with a url with no token in an ineligible browser', () => {

            Object.defineProperty(window.navigator, 'userAgent', {
                value:        IE8_USER_AGENT,
                configurable: true
            });

            const token = generateECToken();
            const hash = uniqueID();

            const testForm = createElement({
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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                getElement('button', testForm).addEventListener('click', (event : Event) => {
                    event.preventDefault();
                    window.paypal.checkout.initXO();
                    setTimeout(() => {
                        window.paypal.checkout.startFlow(`#fullpageRedirectUrl?token=${ token }`);
                    }, 200);
                });

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#fullpageRedirectUrl?token=${ token }`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener, and call closeFlow with a url', () => {

            const token = generateECToken();
            const hash = uniqueID();

            const testForm = createElement({
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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                getElement('button', testForm).addEventListener('click', (event : Event) => {
                    event.preventDefault();

                    setTimeout(() => {
                        window.paypal.checkout.closeFlow('#closeFlowUrl');
                    }, 200);
                });

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#closeFlowUrl`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener, and call closeFlow immediately with a url', () => {

            const token = generateECToken();
            const hash = uniqueID();

            const testForm = createElement({
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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                getElement('button', testForm).addEventListener('click', (event : Event) => {
                    event.preventDefault();

                    window.paypal.checkout.closeFlow('#closeFlowUrl');
                });

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#closeFlowUrl`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener, initXO and closeFlow', (done) => {

            const token = generateECToken();
            const hash = uniqueID();

            const testForm = createElement({
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

            window.paypal.checkout.setup('merchantID', {

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                getElement('button', testForm).addEventListener('click', (event : Event) => {
                    event.preventDefault();

                    window.paypal.checkout.initXO();
                    setTimeout(() => {
                        window.paypal.checkout.closeFlow();

                        if (flow === 'iframe') {
                            if (window.paypal.checkout.win.closed) {
                                return done();
                            } else {
                                return done(new Error('Expected iframe to be closed'));
                            }
                        }
                    }, 200);
                });

                if (flow === 'popup') {
                    const open = window.open;
                    window.open = function overrideWindowOpen() : CrossDomainWindowType {
                        window.open = open;

                        const win = window.open.apply(this, arguments);

                        const close = win.close;
                        win.close = function overrideWindowClose() : void {
                            const result = close.apply(this, arguments);
                            done();
                            return result;
                        };

                        return win;
                    };
                }

                getElement('button', testForm).click();
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener, initXO and closeFlow immediately', (done) => {

            const token = generateECToken();
            const hash = uniqueID();

            const testForm = createElement({
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

            window.paypal.checkout.setup('merchantID', {

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                getElement('button', testForm).addEventListener('click', (event : Event) => {
                    event.preventDefault();

                    window.paypal.checkout.initXO();
                    window.paypal.checkout.closeFlow();

                    if (flow === 'iframe') {
                        if (window.paypal.checkout.win.closed) {
                            return done();
                        } else {
                            return done(new Error('Expected iframe to be closed'));
                        }
                    }
                });

                if (flow === 'popup') {
                    const open = window.open;
                    window.open = function overrideWindowOpen() : CrossDomainWindowType {
                        window.open = open;

                        const win = window.open.apply(this, arguments);

                        const close = win.close;
                        win.close = function overrideWindowClose() : void {
                            const result = close.apply(this, arguments);
                            done();
                            return result;
                        };

                        return win;
                    };
                }

                getElement('button', testForm).click();
            }).catch(done);
        });

        it('should render a button into a form container and click on the button, with a custom listener and immediate startFlow, with a post bridge', () => {

            window.paypal.postRobot.CONFIG.ALLOW_POSTMESSAGE_POPUP = false;

            const token = generateECToken();
            const hash = uniqueID();

            const testForm = createElement({
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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                getElement('button', testForm).addEventListener('click', (event : Event) => {
                    event.preventDefault();
                    window.paypal.checkout.startFlow(token);
                });

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });
    });
}
