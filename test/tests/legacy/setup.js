/* @flow */
/* eslint max-lines: 0 */

import type { CrossDomainWindowType } from 'cross-domain-utils/src';

import { onHashChange, uniqueID, generateECToken, CHILD_REDIRECT_URI, IE8_USER_AGENT,
    IE11_USER_AGENT, createTestContainer, destroyTestContainer, getElement, assert } from '../common';

for (let flow of [ 'popup', 'iframe' ]) {

    describe(`paypal legacy checkout setup/startflow on ${ flow }`, () => {

        beforeEach(() => {
            createTestContainer();
            window.paypal.Checkout.contexts.iframe = (flow === 'iframe');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            window.paypal.Checkout.contexts.iframe = false;
        });

        it('should render a button into a container and click on the button, then call startFlow', () => {

            let token = generateECToken();

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {
                    window.paypal.checkout.startFlow(token);
                }

            }).then(() => {

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call startFlow with a cancel', () => {

            let token = generateECToken();

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {
                    window.paypal.checkout.startFlow(token);
                }

            }).then(() => {

                window.__test__ = { action: 'cancel' };

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#cancel?token=${ token }`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call startFlow in an ineligible browser', () => {

            Object.defineProperty(window.navigator, 'userAgent', {
                value:        IE8_USER_AGENT,
                configurable: true
            });

            let checkoutUrl = Object.getOwnPropertyDescriptor(window.paypal.config, 'checkoutUrl');
            delete window.paypal.config.checkoutUrl;

            window.paypal.config.checkoutUrl = '#testCheckoutUrl';

            let token = generateECToken();

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {
                    window.paypal.checkout.startFlow(token);
                }

            }).then(() => {

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#testCheckoutUrl?token=${ token }`);
                    // $FlowFixMe
                    Object.defineProperty(window.paypal.config, 'checkoutUrl', checkoutUrl);
                });
            });
        });

        it('should render a button into a container and click on the button, then call startFlow in an ineligible browser in Intranet Mode', () => {

            Object.defineProperty(window.navigator, 'userAgent', {
                value:        IE11_USER_AGENT,
                configurable: true
            });
            window.document.documentMode = 11;

            let checkoutUrl = Object.getOwnPropertyDescriptor(window.paypal.config, 'checkoutUrl');
            delete window.paypal.config.checkoutUrl;

            window.paypal.config.checkoutUrl = '#testCheckoutUrl';

            let token = generateECToken();

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {
                    window.paypal.checkout.startFlow(token);
                }

            }).then(() => {

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#testCheckoutUrl?token=${ token }`);
                    // $FlowFixMe
                    Object.defineProperty(window.paypal.config, 'checkoutUrl', checkoutUrl);
                });
            });
        });

        it('should render a button into a container and click on the button, then call startFlow with a url', () => {

            let token = generateECToken();
            let hash = uniqueID();

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {
                    window.paypal.checkout.startFlow(`${ window.paypal.config.checkoutUrl }&token=${ token }#${ hash }`);
                }

            }).then(() => {

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY&hash=${ hash }`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call startFlow with a url usingwindow.paypal.checkout.urlPrefix', () => {

            let token = generateECToken();
            let hash = uniqueID();

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {
                    window.paypal.checkout.startFlow(`${ window.paypal.checkout.urlPrefix }${ token }#${ hash }`);
                }

            }).then(() => {

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY&hash=${ hash }`);
                });
            });
        });

        it('should render a button into a container with test env, and click on the button, then call startFlow with a url', () => {

            let token = generateECToken();
            let hash = uniqueID();

            return window.paypal.checkout.setup('merchantID', {

                environment: 'test',
                container:   'testContainer',

                click() {
                    window.paypal.checkout.startFlow(`${ window.paypal.config.checkoutUrl }&token=${ token }#${ hash }`);
                }

            }).then(() => {

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY&hash=${ hash }`);
                });
            });
        });

        it('should render a button into a container with a bad env, and click on the button, then call startFlow with a url', () => {

            let token = generateECToken();
            let hash = uniqueID();

            return window.paypal.checkout.setup('merchantID', {

                environment: 'THISISINVALID',
                container:   'testContainer',

                click() {
                    window.paypal.checkout.startFlow(`${ window.paypal.config.checkoutUrl }&token=${ token }#${ hash }`);
                }

            }).then(() => {

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY&hash=${ hash }`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call startFlow with a url and a true condition', () => {

            let token = generateECToken();
            let hash = uniqueID();
            let clicked = false;

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                condition() : boolean {
                    return true;
                },

                click() {
                    clicked = true;
                    window.paypal.checkout.startFlow(`${ window.paypal.config.checkoutUrl }&token=${ token }#${ hash }`);
                }

            }).then(() => {

                getElement('#testContainer button').click();

                if (!clicked) {
                    throw new Error('Expected click handler to have been called');
                }

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY&hash=${ hash }`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call startFlow with a url and a false condition', () => {

            let clicked = false;

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                condition() : boolean {
                    return false;
                },

                click() {
                    clicked = true;
                }

            }).then(() => {

                let windowOpened = false;
                let windowOpen = window.open;

                window.open = () => {
                    windowOpened = true;
                };

                getElement('#testContainer button').click();

                if (clicked) {
                    throw new Error('Expected button not to be clicked');
                }

                if (windowOpened) {
                    throw new Error('Expected window not to be opened');
                }

                window.open = windowOpen;
            });
        });

        it('should render a button into a container and click on the button, then call startFlow with a url in an ineligible browser', () => {

            Object.defineProperty(window.navigator, 'userAgent', {
                value:        IE8_USER_AGENT,
                configurable: true
            });

            let token = generateECToken();

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {
                    window.paypal.checkout.startFlow(`#fullpageRedirectUrl?token=${ token }`);
                }

            }).then(() => {

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#fullpageRedirectUrl?token=${ token }`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call startFlow with a url with no token', () => {

            let hash = uniqueID();

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {
                    window.paypal.checkout.startFlow(`${ CHILD_REDIRECT_URI }#${ hash }`);
                }

            }).then(() => {

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=EC-XXXXXXXXXXXXXXXXX&PayerID=YYYYYYYYYYYYY&hash=${ hash }`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call startFlow with a url with no token in an ineligible browser', () => {

            Object.defineProperty(window.navigator, 'userAgent', {
                value:        IE8_USER_AGENT,
                configurable: true
            });

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {
                    window.paypal.checkout.startFlow(`#fullpageRedirectUrl`);
                }

            }).then(() => {

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#fullpageRedirectUrl`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call initXO, then startFlow', () => {

            let token = generateECToken();

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {

                    window.paypal.checkout.initXO();

                    assert.ok(window.paypal.checkout.win, 'Expected window.paypal.checkout.win to be present');
                    assert.ok(!window.paypal.checkout.win.closed, 'Expected window.paypal.checkout.win to not be closed');

                    setTimeout(() => {
                        window.paypal.checkout.startFlow(token);
                    }, 100);
                }

            }).then(() => {

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call initXO, then startFlow with a token and hash', () => {

            let token = generateECToken();
            let hash = uniqueID();

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {

                    window.paypal.checkout.initXO();

                    setTimeout(() => {
                        window.paypal.checkout.startFlow(`${ token }#${ hash }`);
                    }, 100);
                }

            }).then(() => {

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY&hash=${ hash }`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call initXO, then startFlow in an ineligible browser', () => {

            Object.defineProperty(window.navigator, 'userAgent', {
                value:        IE8_USER_AGENT,
                configurable: true
            });

            let token = generateECToken();

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {
                    window.paypal.checkout.initXO();

                    setTimeout(() => {
                        window.paypal.checkout.startFlow(`#fullpageRedirectUrl?token=${ token }`);
                    }, 100);
                }

            }).then(() => {

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#fullpageRedirectUrl?token=${ token }`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call initXO, then startFlow with no token', () => {

            let hash = uniqueID();

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {
                    window.paypal.checkout.initXO();

                    setTimeout(() => {
                        window.paypal.checkout.startFlow(`${ CHILD_REDIRECT_URI }#${ hash }`);
                    }, 100);
                }

            }).then(() => {

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=EC-XXXXXXXXXXXXXXXXX&PayerID=YYYYYYYYYYYYY&hash=${ hash }`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call initXO, then startFlow with a url', () => {

            let token = generateECToken();
            let hash = uniqueID();

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {

                    window.paypal.checkout.initXO();

                    setTimeout(() => {
                        window.paypal.checkout.startFlow(`${ window.paypal.config.checkoutUrl }&token=${ token }#${ hash }`);
                    }, 100);
                }

            }).then(() => {

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY&hash=${ hash }`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call initXO and immediately startFlow', () => {

            let token = generateECToken();

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {
                    window.paypal.checkout.initXO();
                    window.paypal.checkout.startFlow(token);
                }

            }).then(() => {

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call initXO and then closeFlow', (done) => {

            window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {

                    if (flow === 'popup') {
                        let open = window.open;
                        window.open = function overrideWindowOpen() : CrossDomainWindowType {
                            window.open = open;

                            let win = window.open.apply(this, arguments);

                            let close = win.close;
                            win.close = function overrideWindowClose() : void {
                                let result = close.apply(this, arguments);
                                done();
                                return result;
                            };

                            return win;
                        };
                    }

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
                    }, 100);
                }

            }).then(() => {

                getElement('#testContainer button').click();
            });
        });

        it('should render a button into a container and click on the button, then call startFlow immediately', () => {

            let token = generateECToken();

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {
                    window.paypal.checkout.startFlow(token);
                }

            }).then(() => {

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call initXO and then closeFlow with a url', () => {

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {

                    window.paypal.checkout.initXO();

                    setTimeout(() => {
                        window.paypal.checkout.closeFlow('#closeFlowUrl');
                    }, 100);
                }

            }).then(() => {

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#closeFlowUrl`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call initXO and then closeFlow immediately', (done) => {

            window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() : void {

                    if (flow === 'popup') {
                        let open = window.open;
                        window.open = function overrideWindowOpen() : CrossDomainWindowType {
                            window.open = open;

                            let win = window.open.apply(this, arguments);

                            let close = win.close;
                            win.close = function overrideWindowClose() : void {
                                let result = close.apply(this, arguments);
                                done();
                                return result;
                            };

                            return win;
                        };
                    }

                    window.paypal.checkout.initXO();
                    window.paypal.checkout.closeFlow();

                    if (flow === 'iframe') {
                        if (window.paypal.checkout.win.closed) {
                            return done();
                        } else {
                            return done(new Error('Expected iframe to be closed'));
                        }
                    }
                }

            }).then(() => {

                getElement('#testContainer button').click();
            }).catch(done);
        });

        it('should render a button into a container and click on the button, then call startFlow, with the post-bridge', () => {

            window.paypal.postRobot.CONFIG.ALLOW_POSTMESSAGE_POPUP = false;

            let token = generateECToken();

            return window.paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click() {
                    window.paypal.checkout.startFlow(token);
                }

            }).then(() => {

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });
    });
}
