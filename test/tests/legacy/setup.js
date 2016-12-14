
import paypal from 'src/index';
import { Checkout } from 'src/index';
import { config } from 'src/config';

import { onHashChange, uniqueID, generateECToken, CHILD_REDIRECT_URI, IE8_USER_AGENT, createTestContainer, destroyTestContainer } from '../common';

for (let flow of [ 'popup', 'lightbox' ]) {

    describe(`paypal legacy checkout setup/startflow on ${flow}`, () => {

        beforeEach(() => {
            createTestContainer();
            paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
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

        it('should render a button into a container and click on the button, then call startFlow with a cancel', () => {

            let token = generateECToken();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.startFlow(token);
                }

            }).then(() => {

                Checkout.props.testAction.def = () => 'cancel';

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    Checkout.props.testAction.def = () => 'checkout';
                    assert.equal(urlHash, `#cancel?token=${token}`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call startFlow in an ineligible browser', () => {

            window.navigator.mockUserAgent = IE8_USER_AGENT;

            let checkoutUrl = Object.getOwnPropertyDescriptor(config, 'checkoutUrl');
            delete config.checkoutUrl;
            config.checkoutUrl = '#testCheckoutUrl';

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
                    Object.defineProperty(config, 'checkoutUrl', checkoutUrl);
                });
            });
        });

        it('should render a button into a container and click on the button, then call startFlow with a url', () => {

            let token = generateECToken();
            let hash = uniqueID();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.startFlow(`${config.checkoutUrl}&token=${token}#${hash}`);
                }

            }).then(() => {

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY&hash=${hash}`);
                });
            });
        });

        it('should render a button into a container with test env, and click on the button, then call startFlow with a url', () => {

            let token = generateECToken();
            let hash = uniqueID();

            return paypal.checkout.setup('merchantID', {

                environment: 'test',
                container: 'testContainer',

                click(event) {
                    paypal.checkout.startFlow(`${config.checkoutUrl}&token=${token}#${hash}`);
                }

            }).then(() => {

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY&hash=${hash}`);
                });
            });
        });

        it('should render a button into a container with a bad env, and click on the button, then call startFlow with a url', () => {

            let token = generateECToken();
            let hash = uniqueID();

            return paypal.checkout.setup('merchantID', {

                environment: 'THISISINVALID',
                container: 'testContainer',

                click(event) {
                    paypal.checkout.startFlow(`${config.checkoutUrl}&token=${token}#${hash}`);
                }

            }).then(() => {

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY&hash=${hash}`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call startFlow with a url and a true condition', () => {

            let token = generateECToken();
            let hash = uniqueID();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                condition() {
                    return true;
                },

                click(event) {
                    paypal.checkout.startFlow(`${config.checkoutUrl}&token=${token}#${hash}`);
                }

            }).then(() => {

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY&hash=${hash}`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call startFlow with a url and a false condition', () => {

            let clicked = false;

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                condition() {
                    return false;
                },

                click(event) {
                    clicked = true;
                }

            }).then(() => {

                document.querySelector('#testContainer button').click();

                if (clicked) {
                    throw new Error('Expected button not to be clicked');
                }
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

                    assert.ok(paypal.checkout.win, 'Expected paypal.ceheckout.win to be present');
                    assert.ok(!paypal.checkout.win.closed, 'Expected paypal.ceheckout.win to not be closed');

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

        it('should render a button into a container and click on the button, then call initXO, then startFlow with a token and hash', () => {

            let token = generateECToken();
            let hash = uniqueID();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {

                    paypal.checkout.initXO();

                    setTimeout(() => {
                        paypal.checkout.startFlow(`${token}#${hash}`);
                    }, 100);
                }

            }).then(() => {

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY&hash=${hash}`);
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
                        paypal.checkout.startFlow(`${config.checkoutUrl}&token=${token}#${hash}`);
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

                    if (flow === 'popup') {
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

                        if (flow === 'lightbox') {
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

        it('should render a button into a container and click on the button, then call startFlow immediately', () => {

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

                    if (flow === 'popup') {
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

                    if (flow === 'lightbox') {
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
