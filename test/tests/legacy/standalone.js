/* @flow */

import type { CrossDomainWindowType } from 'cross-domain-utils/src';

import { onHashChange, uniqueID, generateECToken, CHILD_REDIRECT_URI, createElement,
    createTestContainer, destroyTestContainer, assert } from '../common';

for (const flow of [ 'popup', 'iframe' ]) {

    describe(`paypal legacy standalone checkout on ${ flow }`, () => {

        beforeEach(() => {
            createTestContainer();
            window.paypal.Checkout.contexts.iframe = (flow === 'iframe');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            window.paypal.Checkout.contexts.iframe = false;
        });

        it('should call startFlow', () => {

            const testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
            const token = generateECToken();

            testButton.addEventListener('click', () => {
                window.paypal.checkout.startFlow(token);
            });

            testButton.click();

            return onHashChange().then(urlHash => {
                assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
            }).toPromise();
        });

        it('should call startFlow, with a cancel', () => {

            const testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
            const token = generateECToken();

            testButton.addEventListener('click', () => {
                window.paypal.checkout.startFlow(token);
            });

            window.__test__ = { action: 'cancel' };

            testButton.click();

            return onHashChange().then(urlHash => {
                assert.equal(urlHash, `#cancel?token=${ token }`);
            }).toPromise();
        });

        it('should call startFlow with a url', () => {

            const testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
            const token = generateECToken();
            const hash = uniqueID();

            testButton.addEventListener('click', () => {
                window.paypal.checkout.startFlow(`${ window.paypal.config.checkoutUrl }&token=${ token }#${ hash }`);
            });

            testButton.click();

            return onHashChange().then(urlHash => {
                assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY&hash=${ hash }`);
            }).toPromise();
        });

        it('should call startFlow with a url with no token', () => {

            const hash = uniqueID();

            const testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                window.paypal.checkout.startFlow(`${ CHILD_REDIRECT_URI }#${ hash }`);
            });

            testButton.click();

            return onHashChange().then(urlHash => {
                assert.equal(urlHash, `#return?token=EC-XXXXXXXXXXXXXXXXX&PayerID=YYYYYYYYYYYYY&hash=${ hash }`);
            }).toPromise();
        });

        it('should call initXO and then startFlow', () => {

            const testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
            const token = generateECToken();

            testButton.addEventListener('click', () => {

                window.paypal.checkout.initXO();

                setTimeout(() => {
                    window.paypal.checkout.startFlow(token);
                }, 100);
            });

            testButton.click();

            return onHashChange().then(urlHash => {
                assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
            }).toPromise();
        });

        it('should call initXO and then startFlow with a url', () => {

            const testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
            const token = generateECToken();
            const hash = uniqueID();

            testButton.addEventListener('click', () => {
                window.paypal.checkout.initXO();

                setTimeout(() => {

                    window.paypal.checkout.startFlow(`${ window.paypal.config.checkoutUrl }&token=${ token }#${ hash }`);
                }, 100);
            });

            testButton.click();

            return onHashChange().then(urlHash => {
                assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY&hash=${ hash }`);
            }).toPromise();
        });

        it('should call initXO and then startFlow with a url with no token', () => {

            const testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            const hash = uniqueID();

            testButton.addEventListener('click', () => {
                window.paypal.checkout.initXO();

                setTimeout(() => {
                    window.paypal.checkout.startFlow(`${ CHILD_REDIRECT_URI }#${ hash }`);
                }, 100);
            });

            testButton.click();

            return onHashChange().then(urlHash => {
                assert.equal(urlHash, `#return?token=EC-XXXXXXXXXXXXXXXXX&PayerID=YYYYYYYYYYYYY&hash=${ hash }`);
            }).toPromise();
        });

        it('should call initXO and immediately startFlow', () => {

            const testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
            const token = generateECToken();

            testButton.addEventListener('click', () => {

                window.paypal.checkout.initXO();
                window.paypal.checkout.startFlow(token);
            });

            testButton.click();

            return onHashChange().then(urlHash => {
                assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
            }).toPromise();
        });

        it('should call initXO and then closeFlow', (done) => {

            const testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {

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
            });

            testButton.click();
        });

        it('should call initXO and then closeFlow with a url', () => {

            const testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                window.paypal.checkout.initXO();

                setTimeout(() => {
                    window.paypal.checkout.closeFlow('#closeFlowUrl');
                }, 100);
            });

            testButton.click();

            return onHashChange().then(urlHash => {
                assert.equal(urlHash, `#closeFlowUrl`);
            }).toPromise();
        });

        it('should call initXO and then closeFlow immediately', (done) => {

            const testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {

                if (flow === 'iframe') {
                    setTimeout(() => {
                        if (window.paypal.checkout.win.closed) {
                            return done();
                        } else {
                            return done(new Error('Expected iframe to be closed'));
                        }
                    });

                } else {

                    const open = window.open;
                    window.open = function overrideWindowOpen() : CrossDomainWindowType {
                        window.open = open;

                        const win : Object = {
                            close() {
                                done();
                            }
                        };

                        win.parent = win.top = win;
                        win.opener = window;

                        return win;
                    };
                }

                window.paypal.checkout.initXO();
                window.paypal.checkout.closeFlow();
            });

            testButton.click();
        });

        it('should call startFlow, with a post-bridge', () => {

            window.paypal.postRobot.CONFIG.ALLOW_POSTMESSAGE_POPUP = false;

            const testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
            const token = generateECToken();

            testButton.addEventListener('click', () => {
                window.paypal.checkout.startFlow(token);
            });

            testButton.click();

            return onHashChange().then(urlHash => {
                assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
            }).toPromise();
        });
    });
}
