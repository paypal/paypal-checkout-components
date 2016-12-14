

import paypal from 'src/index';
import { Checkout } from 'src/index';
import { config } from 'src/config';

import { onHashChange, uniqueID, generateECToken, CHILD_REDIRECT_URI, IE8_USER_AGENT, createElement, createTestContainer, destroyTestContainer } from '../common';

for (let flow of [ 'popup', 'lightbox' ]) {

    describe(`paypal legacy checkout flow with custom click handler on ${flow}`, () => {

        beforeEach(() => {
            createTestContainer();
            paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            paypal.Checkout.contexts.lightbox = false;
        });

        it('should render a button into a form container and click on the button, with a custom listener and immediate startFlow', () => {

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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                testForm.querySelector('button').addEventListener('click', event => {
                    event.preventDefault();
                    paypal.checkout.startFlow(token);
                });

                testForm.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener and immediate startFlow, and a cancel', () => {

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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                testForm.querySelector('button').addEventListener('click', event => {
                    event.preventDefault();
                    paypal.checkout.startFlow(token);
                });

                Checkout.props.testAction.def = () => 'cancel';

                testForm.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    Checkout.props.testAction.def = () => 'checkout';
                    assert.equal(urlHash, `#cancel?token=${token}`);
                });
            });
        });

        it('should render a button into a link and click on the button, with a custom listener and immediate startFlow', () => {

            let token = generateECToken();
            let hash = uniqueID();

            let testLink = createElement({
                tag: 'a',
                id: 'testLink',
                container: 'testContainer',
                props: {
                    href: `${config.checkoutUrl}&token=${token}#${hash}`
                }
            });

            return paypal.checkout.setup('merchantID', {

                container: 'testLink',

                click() {
                    // pass
                }

            }).then(() => {

                testLink.querySelector('button').addEventListener('click', event => {
                    event.preventDefault();
                    paypal.checkout.startFlow(token);
                });

                testLink.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a custom button into a form container and click on the button', () => {

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
                    },

                    {
                        tag: 'button',
                        id: 'testButton'
                    }
                ]
            });

            return paypal.checkout.setup('merchantID', {

                button: 'testButton',

                click() {
                    // pass
                }

            }).then(() => {

                testForm.querySelector('button').addEventListener('click', event => {
                    event.preventDefault();
                    paypal.checkout.startFlow(token);
                });

                testForm.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a custom link and click on the link', () => {

            let token = generateECToken();
            let hash = uniqueID();

            let testLink = createElement({
                tag: 'a',
                id: 'testLink',
                container: 'testContainer',
                props: {
                    href: `${config.checkoutUrl}&token=${token}#${hash}`
                }
            });

            return paypal.checkout.setup('merchantID', {

                button: 'testLink',

                click() {
                    // pass
                }

            }).then(() => {

                testLink.addEventListener('click', event => {
                    event.preventDefault();
                    paypal.checkout.startFlow(token);
                });

                testLink.click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a custom button into a form container and click on the button, with an advance click listener', () => {

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
                    },

                    {
                        tag: 'button',
                        id: 'testButton'
                    }
                ]
            });

            testForm.querySelector('button').addEventListener('click', event => {
                event.preventDefault();
                paypal.checkout.initXO();

                setTimeout(() => {
                    paypal.checkout.startFlow(token);
                }, 200);
            });

            let openCount = 0;

            let windowOpen = window.open;
            window.open = function() {

                openCount += 1;

                if (openCount > 1) {
                    window.open = windowOpen;
                    throw new Error(`window.open was called multiple times`);
                }

                return windowOpen.apply(this, arguments);
            };

            return paypal.checkout.setup('merchantID', {

                button: 'testButton',

                click() {
                    // pass
                }

            }).then(() => {

                testForm.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                    window.open = windowOpen;
                });
            });
        });

        it('should render a custom link and click on the link, with an advance click listener', () => {

            let token = generateECToken();
            let hash = uniqueID();

            let testLink = createElement({
                tag: 'a',
                id: 'testLink',
                container: 'testContainer',
                props: {
                    href: `${config.checkoutUrl}&token=${token}#${hash}`
                }
            });

            testLink.addEventListener('click', event => {
                event.preventDefault();
                paypal.checkout.initXO();

                setTimeout(() => {
                    paypal.checkout.startFlow(token);
                }, 200);
            });

            let openCount = 0;

            let windowOpen = window.open;
            window.open = function() {

                openCount += 1;

                if (openCount > 1) {
                    window.open = windowOpen;
                    throw new Error(`window.open was called multiple times`);
                }

                return windowOpen.apply(this, arguments);
            };

            return paypal.checkout.setup('merchantID', {

                button: 'testLink',

                click() {
                    // pass
                }

            }).then(() => {

                testLink.click();

                return onHashChange().then(urlHash => {
                    window.open = windowOpen;
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });


        it('should render a button into a form container and click on the button, with a custom listener and immediate startFlow with a url', () => {

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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                testForm.querySelector('button').addEventListener('click', event => {
                    event.preventDefault();
                    paypal.checkout.startFlow(`${config.checkoutUrl}&token=${token}#${hash}`);
                });

                testForm.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY&hash=${hash}`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener and immediate startFlow with a url in an ineligible browser', () => {

            let token = generateECToken();
            let hash = uniqueID();

            window.navigator.mockUserAgent = IE8_USER_AGENT;

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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                testForm.querySelector('button').addEventListener('click', event => {
                    event.preventDefault();
                    paypal.checkout.startFlow(`#fullpageRedirectUrl?token=${token}`);
                });

                testForm.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#fullpageRedirectUrl?token=${token}`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener, initXO and immediate startFlow', () => {

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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                testForm.querySelector('button').addEventListener('click', event => {
                    event.preventDefault();
                    paypal.checkout.initXO();
                    paypal.checkout.startFlow(token);
                });

                testForm.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener, initXO and immediate startFlow with a url', () => {

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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                testForm.querySelector('button').addEventListener('click', event => {
                    event.preventDefault();
                    paypal.checkout.initXO();
                    paypal.checkout.startFlow(`${config.checkoutUrl}&token=${token}#${hash}`);
                });

                testForm.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY&hash=${hash}`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener, initXO and immediate startFlow with a url in an ineligible browser', () => {

            let token = generateECToken();
            let hash = uniqueID();

            window.navigator.mockUserAgent = IE8_USER_AGENT;

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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                testForm.querySelector('button').addEventListener('click', event => {
                    event.preventDefault();
                    paypal.checkout.initXO();
                    paypal.checkout.startFlow(`#fullpageRedirectUrl?token=${token}`);
                });

                testForm.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#fullpageRedirectUrl?token=${token}`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener, initXO and startFlow', () => {

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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                testForm.querySelector('button').addEventListener('click', event => {
                    event.preventDefault();
                    paypal.checkout.initXO();
                    setTimeout(() => {
                        paypal.checkout.startFlow(token);
                    }, 200);
                });

                testForm.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener, initXO and startFlow with a url', () => {

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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                testForm.querySelector('button').addEventListener('click', event => {
                    event.preventDefault();
                    paypal.checkout.initXO();
                    setTimeout(() => {
                        paypal.checkout.startFlow(`${config.checkoutUrl}&token=${token}#${hash}`);
                    }, 200);
                });

                testForm.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY&hash=${hash}`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener, initXO and startFlow with a url in an ineligible browser', () => {

            let token = generateECToken();
            let hash = uniqueID();

            window.navigator.mockUserAgent = IE8_USER_AGENT;

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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                testForm.querySelector('button').addEventListener('click', event => {
                    event.preventDefault();
                    paypal.checkout.initXO();
                    setTimeout(() => {
                        paypal.checkout.startFlow(`#fullpageRedirectUrl?token=${token}`);
                    }, 200);
                });

                testForm.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#fullpageRedirectUrl?token=${token}`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener, initXO and startFlow with a url with no token', () => {

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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                testForm.querySelector('button').addEventListener('click', event => {
                    event.preventDefault();
                    paypal.checkout.initXO();
                    setTimeout(() => {
                        paypal.checkout.startFlow(CHILD_REDIRECT_URI);
                    }, 200);
                });

                testForm.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=EC-XXXXXXXXXXXXXXXXX&PayerID=YYYYYYYYYYYYY&hash=redirectHash`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener, initXO and startFlow with a url with no token in an ineligible browser', () => {

            window.navigator.mockUserAgent = IE8_USER_AGENT;

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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                testForm.querySelector('button').addEventListener('click', event => {
                    event.preventDefault();
                    paypal.checkout.initXO();
                    setTimeout(() => {
                        paypal.checkout.startFlow(`#fullpageRedirectUrl?token=${token}`);
                    }, 200);
                });

                testForm.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#fullpageRedirectUrl?token=${token}`);
                    delete window.navigator.mockUserAgent;
                });
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener, and call closeFlow with a url', () => {

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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                testForm.querySelector('button').addEventListener('click', event => {
                    event.preventDefault();

                    setTimeout(() => {
                        paypal.checkout.closeFlow('#closeFlowUrl');
                    }, 200);
                });

                testForm.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#closeFlowUrl`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener, and call closeFlow immediately with a url', () => {

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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                testForm.querySelector('button').addEventListener('click', event => {
                    event.preventDefault();

                    paypal.checkout.closeFlow('#closeFlowUrl');
                });

                testForm.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#closeFlowUrl`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener, initXO and closeFlow', (done) => {

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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                testForm.querySelector('button').addEventListener('click', event => {
                    event.preventDefault();

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
                    }, 200);
                });

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

                testForm.querySelector('button').click();
            });
        });

        it('should render a button into a form container and click on the button, with a custom listener, initXO and closeFlow immediately', (done) => {

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

                container: 'testForm',

                click() {
                    // pass
                }

            }).then(() => {

                testForm.querySelector('button').addEventListener('click', event => {
                    event.preventDefault();

                    paypal.checkout.initXO();
                    paypal.checkout.closeFlow();

                    if (flow === 'lightbox') {
                        if (paypal.checkout.win.closed) {
                            return done();
                        } else {
                            return done(new Error('Expected lightbox to be closed'));
                        }
                    }
                });

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

                testForm.querySelector('button').click();
            });
        });
    });
}
