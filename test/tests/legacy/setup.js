
import paypal from 'src/index';

import { onHashChange, uniqueID, generateECToken, CHILD_URI, CHILD_REDIRECT_URI, IE8_USER_AGENT, createTestContainer, destroyTestContainer } from './common';

for (let { name, options } of [ { name: 'lightbox', options: { lightbox: true } }, { name: 'popup', options: { lightbox: false } } ]) {

    describe(`paypal legacy checkout setup flow with ${name}`, () => {

        beforeEach(() => {
            createTestContainer();
            paypal.Checkout.contexts.lightbox = options.lightbox;
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            paypal.Checkout.contexts.lightbox = false;
        });

        it('should render a button into a container and click on the button, then call startFlow', () => {

            let token = generateECToken();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.startFlow(token);
                }

            }).then(() => {

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call startFlow in an ineligible browser', () => {

            window.navigator.mockUserAgent = IE8_USER_AGENT;

            let checkoutUrl = Object.getOwnPropertyDescriptor(paypal.config, 'checkoutUrl');
            delete paypal.config.checkoutUrl;
            paypal.config.checkoutUrl = '#testCheckoutUrl';

            let token = generateECToken();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.startFlow(token);
                }

            }).then(() => {

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#testCheckoutUrl?token=${token}`);
                    Object.defineProperty(paypal.config, 'checkoutUrl', checkoutUrl);
                });
            });
        });

        it('should render a button into a container and click on the button, then call startFlow with a url', () => {

            let token = generateECToken();
            let hash = uniqueID();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.startFlow(`${CHILD_URI}?token=${token}#${hash}`);
                }

            }).then(() => {

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY&hash=${hash}`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call startFlow with a url in an ineligible browser', () => {

            window.navigator.mockUserAgent = IE8_USER_AGENT;
            let token = generateECToken();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.startFlow(`#fullpageRedirectUrl?token=${token}`);
                }

            }).then(() => {

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#fullpageRedirectUrl?token=${token}`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call startFlow with a url with no token', () => {

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.startFlow(CHILD_REDIRECT_URI);
                }

            }).then(() => {

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=EC-XXXXXXXXXXXXXXXXX&PayerID=YYYYYYYYYYYYY&hash=redirectHash`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call startFlow with a url with no token in an ineligible browser', () => {

            window.navigator.mockUserAgent = IE8_USER_AGENT;

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.startFlow(`#fullpageRedirectUrl`);
                }

            }).then(() => {

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#fullpageRedirectUrl`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call initXO, then startFlow', () => {

            let token = generateECToken();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {

                    paypal.checkout.initXO();

                    setTimeout(() => {
                        paypal.checkout.startFlow(token);
                    }, 100);
                }

            }).then(() => {

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call initXO, then startFlow in an ineligible browser', () => {

            window.navigator.mockUserAgent = IE8_USER_AGENT;

            let token = generateECToken();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.initXO();

                    setTimeout(() => {
                        paypal.checkout.startFlow(`#fullpageRedirectUrl?token=${token}`);
                    }, 100);
                }

            }).then(() => {

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#fullpageRedirectUrl?token=${token}`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call initXO, then startFlow with no token', () => {

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.initXO();

                    setTimeout(() => {
                        paypal.checkout.startFlow(CHILD_REDIRECT_URI);
                    }, 100);
                }

            }).then(() => {

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=EC-XXXXXXXXXXXXXXXXX&PayerID=YYYYYYYYYYYYY&hash=redirectHash`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call initXO, then startFlow with a url', () => {

            let token = generateECToken();
            let hash = uniqueID();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {

                    paypal.checkout.initXO();

                    setTimeout(() => {
                        paypal.checkout.startFlow(`${CHILD_URI}?token=${token}#${hash}`);
                    }, 100);
                }

            }).then(() => {

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY&hash=${hash}`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call initXO and immediately startFlow', () => {

            let token = generateECToken();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.initXO();
                    paypal.checkout.startFlow(token);
                }

            }).then(() => {

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call initXO and then closeFlow', (done) => {

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {

                    if (!options.lightbox) {
                        let open = window.open;
                        window.open = function() {
                            window.open = open;

                            let win = window.open.apply(this, arguments);

                            let close = win.close;
                            win.close = function() {
                                let result = close.apply(this, arguments);
                                done();
                                return result;
                            };

                            return win;
                        };
                    }

                    paypal.checkout.initXO();

                    setTimeout(() => {
                        paypal.checkout.closeFlow();

                        if (options.lightbox) {
                            if (paypal.checkout.win.closed) {
                                return done();
                            } else {
                                return done(new Error('Expected lightbox to be closed'));
                            }
                        }
                    }, 100);
                }

            }).then(() => {

                document.querySelector('#testContainer button').click();
            });
        });

        it('should render a button into a container and click on the button, then call startFlow', () => {

            let token = generateECToken();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {

                    setTimeout(() => {
                        paypal.checkout.startFlow(token);
                    }, 100);
                }

            }).then(() => {

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call initXO and then closeFlow with a url', () => {

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {

                    paypal.checkout.initXO();

                    setTimeout(() => {
                        paypal.checkout.closeFlow('#closeFlowUrl');
                    }, 100);
                }

            }).then(() => {

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#closeFlowUrl`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call initXO and then closeFlow immediately', (done) => {

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {

                    if (!options.lightbox) {
                        let open = window.open;
                        window.open = function() {
                            window.open = open;

                            let win = window.open.apply(this, arguments);

                            let close = win.close;
                            win.close = function() {
                                let result = close.apply(this, arguments);
                                done();
                                return result;
                            };

                            return win;
                        };
                    }

                    paypal.checkout.initXO();
                    paypal.checkout.closeFlow();

                    if (options.lightbox) {
                        if (paypal.checkout.win.closed) {
                            return done();
                        } else {
                            return done(new Error('Expected lightbox to be closed'));
                        }
                    }
                }

            }).then(() => {

                document.querySelector('#testContainer button').click();
            });
        });
    });
}
