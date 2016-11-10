
import paypal from 'src/index';

function onHashChange(method) {

    let currentHash = window.location.hash;

    let interval = setInterval(() => {
        if (window.location.hash !== currentHash) {
            clearInterval(interval);
            method(window.location.hash);
        }
    }, 10);
}

function uniqueID(length = 8, chars = '0123456789abcdefhijklmnopqrstuvwxyz') {
    return new Array(length + 1).join('x').replace(/x/g, item => {
        return chars.charAt(Math.floor(Math.random() * chars.length));
    });
}

function generateECToken() {
    return `EC-${uniqueID(17).toUpperCase()}`;
}

const CHILD_URI = '/base/test/child.htm';
const CHILD_REDIRECT_URI = '/base/test/childRedirect.htm';

const IE8_USER_AGENT = 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)';

function createTestContainer() {
    let testContainer = document.createElement('div');
    testContainer.id = 'testContainer';
    document.body.appendChild(testContainer);
    return testContainer;
}

function destroyTestContainer() {
    let testContainer = document.getElementById('testContainer');
    testContainer.parentNode.removeChild(testContainer);
}

function createCustomButton(id = 'testButton', container = 'testContainer') {
    let testButton = document.createElement('button');
    testButton.id = id;
    document.getElementById(container).appendChild(testButton);
    return testButton;
}

describe('paypal legacy button rendering', () => {

    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
    });

    it('should render a button into a container', () => {

        return paypal.checkout.setup('merchantID', {

            container: 'testContainer'

        }).then(() => {

            assert.ok(document.querySelector('#testContainer button'));
        });
    });

    it('should render a button into a container using buttons array', () => {

        return paypal.checkout.setup('merchantID', {

            buttons: [
                {
                    container: 'testContainer'
                }
            ]

        }).then(() => {

            assert.ok(document.querySelector('#testContainer button'));
        });
    });


    it('should render a button into a container and provide a working click handler', (done) => {

        return paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {
                done();
            }

        }).then(() => {

            document.querySelector('#testContainer button').click();
        });
    });

    it('should render a button into a container using buttons array and provide a working click handler', (done) => {

        return paypal.checkout.setup('merchantID', {

            buttons: [
                {
                    container: 'testContainer',
                    click(event) {
                        done();
                    }
                }
            ]

        }).then(() => {

            document.querySelector('#testContainer button').click();
        });
    });


    it('should render a button into a container and provide a working click handler which is passed an event', (done) => {

        return paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {
                assert.ok(event, 'Expected an event to be passed to click function');
                assert.ok(event.preventDefault instanceof Function, 'Expected event to have preventDefault method');

                done();
            }

        }).then(() => {

            document.querySelector('#testContainer button').click();
        });
    });

    it('should render a button into a container and provide a working click handler which is not passed an err', (done) => {

        return paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(err) {
                assert.ifError(err, 'Expected err to not be passed to click function');

                done();
            }

        }).then(() => {

            document.querySelector('#testContainer button').click();
        });
    });

    it('should render a button into a container and provide a working click handler which is not passed an error', (done) => {

        return paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(error) {
                assert.ifError(error, 'Expected error to not be passed to click function');

                done();
            }

        }).then(() => {

            document.querySelector('#testContainer button').click();
        });
    });

    it('should render multiple buttons into a container and provide a working click handler', (done) => {

        let clickCount = 0;

        return paypal.checkout.setup('merchantID', {

            buttons: [
                {
                    container: 'testContainer',
                    click(event) {
                        clickCount += 1;

                        if (clickCount === 2) {
                            done();
                        }
                    }
                },

                {
                    container: 'testContainer',
                    click(event) {
                        clickCount += 1;

                        if (clickCount === 2) {
                            done();
                        }
                    }
                }
            ]

        }).then(() => {

            document.querySelectorAll('#testContainer button')[0].click();
            document.querySelectorAll('#testContainer button')[1].click();
        });
    });

    it('should use a custom button and provide a working click handler', (done) => {

        createCustomButton();

        return paypal.checkout.setup('merchantID', {

            button: 'testButton',

            click(event) {
                done();
            }

        }).then(() => {

            document.querySelector('#testContainer #testButton').click();
        });
    });

    it('should use a custom button array with mutiple buttons and provide a working click handler', (done) => {

        createCustomButton('testButton');
        createCustomButton('testButton2');

        let clickCount = 0;

        return paypal.checkout.setup('merchantID', {

            button: [ 'testButton', 'testButton2' ],

            click() {
                clickCount += 1;

                if (clickCount === 2) {
                    done();
                }
            }

        }).then(() => {

            document.querySelector('#testContainer #testButton').click();
            document.querySelector('#testContainer #testButton2').click();
        });
    });

    it('should use a custom buttons array and provide a working click handler', (done) => {

        createCustomButton();

        return paypal.checkout.setup('merchantID', {

            buttons: [
                {
                    button: 'testButton',
                    click(event) {
                        done();
                    }
                }
            ]

        }).then(() => {

            document.querySelector('#testContainer button').click();
        });
    });

    it('should use a custom buttons array with multiple buttons and provide a working click handler', (done) => {

        createCustomButton('testButton');
        createCustomButton('testButton2');

        let clickCount = 0;

        return paypal.checkout.setup('merchantID', {

            buttons: [
                {
                    button: 'testButton',
                    click(event) {
                        clickCount += 1;

                        if (clickCount === 2) {
                            done();
                        }
                    }
                },

                {
                    button: 'testButton2',
                    click(event) {
                        clickCount += 1;

                        if (clickCount === 2) {
                            done();
                        }
                    }
                }
            ]

        }).then(() => {

            document.querySelector('#testContainer #testButton').click();
            document.querySelector('#testContainer #testButton2').click();
        });
    });


    it('should use a custom button and provide a working click handler which is passed an event', (done) => {

        createCustomButton();

        return paypal.checkout.setup('merchantID', {

            button: 'testButton',

            click(event) {
                assert.ok(event, 'Expected an event to be passed to click function');
                assert.ok(event.preventDefault instanceof Function, 'Expected event to have preventDefault method');

                done();
            }

        }).then(() => {

            document.querySelector('#testContainer button').click();
        });
    });

    it('should use a custom button and provide a working click handler which is not passed an err', (done) => {

        createCustomButton();

        return paypal.checkout.setup('merchantID', {

            button: 'testButton',

            click(err) {
                assert.ifError(err, 'Expected err to not be passed to click function');

                done();
            }

        }).then(() => {

            document.querySelector('#testContainer button').click();
        });
    });

    it('should use a custom button and provide a working click handler which is not passed an error', (done) => {

        createCustomButton();

        return paypal.checkout.setup('merchantID', {

            button: 'testButton',

            click(error) {
                assert.ifError(error, 'Expected error to not be passed to click function');

                done();
            }

        }).then(() => {

            document.querySelector('#testContainer button').click();
        });
    });

    it('should render a button into a link container, click on a custom button, and provide a working click handler', (done) => {

        let customLink = document.createElement('a');
        customLink.id = 'customLink';
        document.getElementById('testContainer').appendChild(customLink);

        createCustomButton('testButton', 'customLink');

        return paypal.checkout.setup('merchantID', {

            container: 'customLink',

            click(event) {
                done();
            }

        }).then(() => {

            document.querySelector('#testContainer #testButton').click();
        });
    });
});

for (let { name, options } of [ { name: 'lightbox', options: { lightbox: true } }, { name: 'popup', options: { lightbox: false } } ]) {

    describe(`paypal legacy ${name}`, () => {

        beforeEach(() => {
            createTestContainer();
            paypal.Checkout.contexts.lightbox = options.lightbox;
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            paypal.Checkout.contexts.lightbox = false;
        });

        describe('paypal legacy checkout flow', () => {

            it('should render a button into a container and click on the button, then call startFlow', (done) => {

                return paypal.checkout.setup('merchantID', {

                    container: 'testContainer',

                    click(event) {

                        let token = generateECToken();

                        paypal.checkout.startFlow(token);

                        onHashChange(urlHash => {
                            assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                            done();
                        });
                    }

                }).then(() => {

                    document.querySelector('#testContainer button').click();
                });
            });

            it('should render a button into a container and click on the button, then call startFlow in an ineligible browser', (done) => {

                window.navigator.mockUserAgent = IE8_USER_AGENT;

                let checkoutUrl = Object.getOwnPropertyDescriptor(paypal.config, 'checkoutUrl');
                delete paypal.config.checkoutUrl;
                paypal.config.checkoutUrl = '#testCheckoutUrl';

                return paypal.checkout.setup('merchantID', {

                    container: 'testContainer',

                    click(event) {

                        let token = generateECToken();

                        onHashChange(urlHash => {
                            assert.equal(urlHash, `#testCheckoutUrl?token=${token}`);
                            Object.defineProperty(paypal.config, 'checkoutUrl', checkoutUrl);
                            done();
                        });

                        paypal.checkout.startFlow(token);
                    }

                }).then(() => {

                    document.querySelector('#testContainer button').click();
                });
            });

            it('should render a button into a container and click on the button, then call startFlow with a url', (done) => {

                return paypal.checkout.setup('merchantID', {

                    container: 'testContainer',

                    click(event) {

                        let token = generateECToken();
                        let hash = uniqueID();

                        paypal.checkout.startFlow(`${CHILD_URI}?token=${token}#${hash}`);

                        onHashChange(urlHash => {
                            assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY&hash=${hash}`);
                            done();
                        });
                    }

                }).then(() => {

                    document.querySelector('#testContainer button').click();
                });
            });

            it('should render a button into a container and click on the button, then call startFlow with a url in an ineligible browser', (done) => {

                window.navigator.mockUserAgent = IE8_USER_AGENT;

                return paypal.checkout.setup('merchantID', {

                    container: 'testContainer',

                    click(event) {

                        let token = generateECToken();

                        onHashChange(urlHash => {
                            assert.equal(urlHash, `#fullpageRedirectUrl?token=${token}`);
                            done();
                        });

                        paypal.checkout.startFlow(`#fullpageRedirectUrl?token=${token}`);
                    }

                }).then(() => {

                    document.querySelector('#testContainer button').click();
                });
            });

            it('should render a button into a container and click on the button, then call startFlow with a url with no token', (done) => {

                return paypal.checkout.setup('merchantID', {

                    container: 'testContainer',

                    click(event) {

                        paypal.checkout.startFlow(CHILD_REDIRECT_URI);

                        onHashChange(urlHash => {
                            assert.equal(urlHash, `#return?token=EC-XXXXXXXXXXXXXXXXX&PayerID=YYYYYYYYYYYYY&hash=redirectHash`);
                            done();
                        });
                    }

                }).then(() => {

                    document.querySelector('#testContainer button').click();
                });
            });

            it('should render a button into a container and click on the button, then call startFlow with a url with no token in an ineligible browser', (done) => {

                window.navigator.mockUserAgent = IE8_USER_AGENT;

                return paypal.checkout.setup('merchantID', {

                    container: 'testContainer',

                    click(event) {

                        onHashChange(urlHash => {
                            assert.equal(urlHash, `#fullpageRedirectUrl`);
                            done();
                        });

                        paypal.checkout.startFlow(`#fullpageRedirectUrl`);
                    }

                }).then(() => {

                    document.querySelector('#testContainer button').click();
                });
            });

            it('should render a button into a container and click on the button, then call initXO, then startFlow', (done) => {

                return paypal.checkout.setup('merchantID', {

                    container: 'testContainer',

                    click(event) {

                        paypal.checkout.initXO();

                        setTimeout(() => {
                            let token = generateECToken();

                            paypal.checkout.startFlow(token);

                            onHashChange(urlHash => {
                                assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                                done();
                            });

                        }, 100);
                    }

                }).then(() => {

                    document.querySelector('#testContainer button').click();
                });
            });

            it('should render a button into a container and click on the button, then call initXO, then startFlow in an ineligible browser', (done) => {

                window.navigator.mockUserAgent = IE8_USER_AGENT;

                return paypal.checkout.setup('merchantID', {

                    container: 'testContainer',

                    click(event) {

                        paypal.checkout.initXO();

                        setTimeout(() => {

                            let token = generateECToken();

                            onHashChange(urlHash => {
                                assert.equal(urlHash, `#fullpageRedirectUrl?token=${token}`);
                                done();
                            });

                            paypal.checkout.startFlow(`#fullpageRedirectUrl?token=${token}`);

                        }, 100);
                    }

                }).then(() => {

                    document.querySelector('#testContainer button').click();
                });
            });

            it('should render a button into a container and click on the button, then call initXO, then startFlow with no token', (done) => {

                return paypal.checkout.setup('merchantID', {

                    container: 'testContainer',

                    click(event) {

                        paypal.checkout.initXO();

                        setTimeout(() => {

                            paypal.checkout.startFlow(CHILD_REDIRECT_URI);

                            onHashChange(urlHash => {
                                assert.equal(urlHash, `#return?token=EC-XXXXXXXXXXXXXXXXX&PayerID=YYYYYYYYYYYYY&hash=redirectHash`);
                                done();
                            });

                        }, 100);
                    }

                }).then(() => {

                    document.querySelector('#testContainer button').click();
                });
            });

            it('should render a button into a container and click on the button, then call initXO, then startFlow with a url', (done) => {

                return paypal.checkout.setup('merchantID', {

                    container: 'testContainer',

                    click(event) {

                        paypal.checkout.initXO();

                        setTimeout(() => {

                            let token = generateECToken();
                            let hash = uniqueID();

                            paypal.checkout.startFlow(`${CHILD_URI}?token=${token}#${hash}`);

                            onHashChange(urlHash => {
                                assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY&hash=${hash}`);
                                done();
                            });

                        }, 100);
                    }

                }).then(() => {

                    document.querySelector('#testContainer button').click();
                });
            });

            it('should render a button into a container and click on the button, then call initXO and immediately startFlow', (done) => {

                return paypal.checkout.setup('merchantID', {

                    container: 'testContainer',

                    click(event) {

                        let token = generateECToken();

                        paypal.checkout.initXO();
                        paypal.checkout.startFlow(token);

                        onHashChange(urlHash => {
                            assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                            done();
                        });
                    }

                }).then(() => {

                    document.querySelector('#testContainer button').click();
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

            it('should render a button into a container and click on the button, then call startFlow', (done) => {

                return paypal.checkout.setup('merchantID', {

                    container: 'testContainer',

                    click(event) {

                        setTimeout(() => {
                            let token = generateECToken();

                            paypal.checkout.startFlow(token);

                            onHashChange(urlHash => {
                                assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                                done();
                            });

                        }, 100);
                    }

                }).then(() => {

                    document.querySelector('#testContainer button').click();
                });
            });

            it('should render a button into a container and click on the button, then call initXO and then closeFlow with a url', (done) => {

                return paypal.checkout.setup('merchantID', {

                    container: 'testContainer',

                    click(event) {

                        paypal.checkout.initXO();

                        setTimeout(() => {

                            onHashChange(urlHash => {
                                assert.equal(urlHash, `#closeFlowUrl`);
                                done();
                            });

                            paypal.checkout.closeFlow('#closeFlowUrl');

                        }, 100);
                    }

                }).then(() => {

                    document.querySelector('#testContainer button').click();
                });
            });

            it('should render a button into a container and click on the button, then call initXO and then closeFlow immediately', (done) => {

                return paypal.checkout.setup('merchantID', {

                    container: 'testContainer',

                    click(event) {

                        let open = window.open;
                        window.open = function() {
                            done(new Error(`Expected window.open to not be called`));
                        };

                        paypal.checkout.initXO();
                        paypal.checkout.closeFlow();

                        setTimeout(() => {
                            window.open = open;
                            done();
                        }, 10);
                    }

                }).then(() => {

                    document.querySelector('#testContainer button').click();
                });
            });

            it('should render a button into a container and click on the button, then call closeFlow immediately', (done) => {

                return paypal.checkout.setup('merchantID', {

                    container: 'testContainer',

                    click(event) {

                        let open = window.open;
                        window.open = function() {
                            done(new Error(`Expected window.open to not be called`));
                        };

                        paypal.checkout.closeFlow();

                        setTimeout(() => {
                            window.open = open;
                            done();
                        }, 10);
                    }

                }).then(() => {

                    document.querySelector('#testContainer button').click();
                });
            });
        });


        describe('paypal legacy standalone checkout', () => {

            it('should call startFlow', (done) => {

                let testButton = createCustomButton();

                testButton.addEventListener('click', event => {
                    let token = generateECToken();

                    paypal.checkout.startFlow(token);

                    onHashChange(urlHash => {
                        assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                        done();
                    });
                });

                testButton.click();
            });

            it('should call startFlow with a url', (done) => {

                let testButton = createCustomButton();

                testButton.addEventListener('click', event => {
                    let token = generateECToken();
                    let hash = uniqueID();

                    paypal.checkout.startFlow(`${CHILD_URI}?token=${token}#${hash}`);

                    onHashChange(urlHash => {
                        assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY&hash=${hash}`);
                        done();
                    });
                });

                testButton.click();
            });

            it('should call startFlow with a url with no token', (done) => {

                let testButton = createCustomButton();

                testButton.addEventListener('click', event => {
                    paypal.checkout.startFlow(CHILD_REDIRECT_URI);

                    onHashChange(urlHash => {
                        assert.equal(urlHash, `#return?token=EC-XXXXXXXXXXXXXXXXX&PayerID=YYYYYYYYYYYYY&hash=redirectHash`);
                        done();
                    });
                });

                testButton.click();
            });

            it('should call initXO and then startFlow', (done) => {

                let testButton = createCustomButton();

                testButton.addEventListener('click', event => {
                    let token = generateECToken();

                    paypal.checkout.initXO();

                    setTimeout(() => {
                        paypal.checkout.startFlow(token);

                        onHashChange(urlHash => {
                            assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                            done();
                        });
                    }, 100);
                });

                testButton.click();
            });

            it('should call initXO and then startFlow with a url', (done) => {

                let testButton = createCustomButton();

                testButton.addEventListener('click', event => {
                    paypal.checkout.initXO();

                    setTimeout(() => {

                        let token = generateECToken();
                        let hash = uniqueID();

                        paypal.checkout.startFlow(`${CHILD_URI}?token=${token}#${hash}`);

                        onHashChange(urlHash => {
                            assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY&hash=${hash}`);
                            done();
                        });
                    }, 100);
                });

                testButton.click();
            });

            it('should call initXO and then startFlow with a url with no token', (done) => {

                let testButton = createCustomButton();

                testButton.addEventListener('click', event => {
                    paypal.checkout.initXO();

                    setTimeout(() => {

                        paypal.checkout.startFlow(CHILD_REDIRECT_URI);

                        onHashChange(urlHash => {
                            assert.equal(urlHash, `#return?token=EC-XXXXXXXXXXXXXXXXX&PayerID=YYYYYYYYYYYYY&hash=redirectHash`);
                            done();
                        });
                    }, 100);
                });

                testButton.click();
            });

            it('should call initXO and immediately startFlow', (done) => {

                let testButton = createCustomButton();

                testButton.addEventListener('click', event => {
                    let token = generateECToken();

                    paypal.checkout.initXO();
                    paypal.checkout.startFlow(token);

                    onHashChange(urlHash => {
                        assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                        done();
                    });
                });

                testButton.click();
            });

            it('should call initXO and then closeFlow', (done) => {

                let testButton = createCustomButton();

                testButton.addEventListener('click', event => {

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
                });

                testButton.click();
            });

            it('should call initXO and then closeFlow with a url', (done) => {

                let testButton = createCustomButton();

                testButton.addEventListener('click', event => {
                    paypal.checkout.initXO();

                    setTimeout(() => {

                        onHashChange(urlHash => {
                            assert.equal(urlHash, `#closeFlowUrl`);
                            done();
                        });

                        paypal.checkout.closeFlow('#closeFlowUrl');

                    }, 100);
                });

                testButton.click();
            });

            it('should call initXO and then closeFlow immediately', (done) => {

                let testButton = createCustomButton();

                testButton.addEventListener('click', event => {

                    if (options.lightbox) {
                        setTimeout(function() {
                            if (paypal.checkout.win.closed) {
                                return done();
                            } else {
                                return done(new Error('Expected lightbox to be closed'));
                            }
                        });

                    } else {

                        let open = window.open;
                        window.open = function() {
                            window.open = open;

                            return {
                                close() {
                                    done();
                                }
                            };
                        };
                    }

                    paypal.checkout.initXO();
                    paypal.checkout.closeFlow();
                });

                testButton.click();
            });
        });
    });
}
