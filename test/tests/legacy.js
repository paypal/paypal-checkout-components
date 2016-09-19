
import ppxo from 'src/index';

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

describe('ppxo legacy cases', () => {

    let testContainer = document.createElement('div');
    testContainer.id = 'testContainer';
    document.body.appendChild(testContainer);

    afterEach(() => {
        testContainer.innerHTML = '';
        window.location.hash = '';
        ppxo.Checkout.contexts.lightbox = false;
    });

    it('should render a button into a container', () => {

        return window.paypal.checkout.setup('merchantID', {

            container: 'testContainer'

        }).then(() => {

            assert.ok(document.querySelector('#testContainer button'));
        });
    });

    it('should render a button into a container using buttons array', () => {

        return window.paypal.checkout.setup('merchantID', {

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

        return window.paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {
                done();
            }

        }).then(() => {

            document.querySelector('#testContainer button').click();
        });
    });

    it('should render a button into a container using buttons array and provide a working click handler', (done) => {

        return window.paypal.checkout.setup('merchantID', {

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

        return window.paypal.checkout.setup('merchantID', {

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

        return window.paypal.checkout.setup('merchantID', {

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

        return window.paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(error) {
                assert.ifError(error, 'Expected error to not be passed to click function');

                done();
            }

        }).then(() => {

            document.querySelector('#testContainer button').click();
        });
    });

    it('should render a button into a container and click on the button, then call startFlow', (done) => {

        return window.paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {

                let token = generateECToken();

                window.paypal.checkout.startFlow(token);

                onHashChange(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                    done();
                });
            }

        }).then(() => {

            document.querySelector('#testContainer button').click();
        });
    });

    it.skip('should render a button into a container and click on the button, then call startFlow in an ineligible browser', (done) => {

        window.navigator.mockUserAgent = IE8_USER_AGENT;

        return window.paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {

                let token = generateECToken();

                onHashChange(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                    done();
                });

                window.paypal.checkout.startFlow(token);
            }

        }).then(() => {

            document.querySelector('#testContainer button').click();
        });
    });

    it('should render a button into a container and click on the button, then call startFlow with a url', (done) => {

        return window.paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {

                let token = generateECToken();
                let hash = uniqueID();

                window.paypal.checkout.startFlow(`${CHILD_URI}?token=${token}#${hash}`);

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

        return window.paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {

                let token = generateECToken();

                onHashChange(urlHash => {
                    assert.equal(urlHash, `#fullpageRedirectUrl?token=${token}`);
                    done();
                });

                window.paypal.checkout.startFlow(`#fullpageRedirectUrl?token=${token}`);
            }

        }).then(() => {

            document.querySelector('#testContainer button').click();
        });
    });

    it('should render a button into a container and click on the button, then call startFlow with a url with no token', (done) => {

        return window.paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {

                window.paypal.checkout.startFlow(CHILD_REDIRECT_URI);

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

        return window.paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {

                onHashChange(urlHash => {
                    assert.equal(urlHash, `#fullpageRedirectUrl`);
                    done();
                });

                window.paypal.checkout.startFlow(`#fullpageRedirectUrl`);
            }

        }).then(() => {

            document.querySelector('#testContainer button').click();
        });
    });

    it('should render a button into a container and click on the button, then call initXO, then startFlow', (done) => {

        return window.paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {

                window.paypal.checkout.initXO();

                setTimeout(() => {
                    let token = generateECToken();

                    window.paypal.checkout.startFlow(token);

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

        return window.paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {

                window.paypal.checkout.initXO();

                setTimeout(() => {

                    let token = generateECToken();

                    onHashChange(urlHash => {
                        assert.equal(urlHash, `#fullpageRedirectUrl?token=${token}`);
                        done();
                    });

                    window.paypal.checkout.startFlow(`#fullpageRedirectUrl?token=${token}`);

                }, 100);
            }

        }).then(() => {

            document.querySelector('#testContainer button').click();
        });
    });

    it('should render a button into a container and click on the button, then call initXO, then startFlow with no token', (done) => {

        return window.paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {

                window.paypal.checkout.initXO();

                setTimeout(() => {

                    window.paypal.checkout.startFlow(CHILD_REDIRECT_URI);

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

        return window.paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {

                window.paypal.checkout.initXO();

                setTimeout(() => {

                    let token = generateECToken();
                    let hash = uniqueID();

                    window.paypal.checkout.startFlow(`${CHILD_URI}?token=${token}#${hash}`);

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

        return window.paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {

                let token = generateECToken();

                window.paypal.checkout.initXO();
                window.paypal.checkout.startFlow(token);

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

        return window.paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {

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

                window.paypal.checkout.initXO();

                setTimeout(() => {
                    window.paypal.checkout.closeFlow();
                }, 100);
            }

        }).then(() => {

            document.querySelector('#testContainer button').click();
        });
    });

    it('should render a button into a container and click on the button, then call startFlow', (done) => {



        return window.paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {

                setTimeout(() => {
                    let token = generateECToken();

                    window.paypal.checkout.startFlow(token);

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

        return window.paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {

                window.paypal.checkout.initXO();

                setTimeout(() => {

                    onHashChange(urlHash => {
                        assert.equal(urlHash, `#closeFlowUrl`);
                        done();
                    });

                    window.paypal.checkout.closeFlow('#closeFlowUrl');

                }, 100);
            }

        }).then(() => {

            document.querySelector('#testContainer button').click();
        });
    });

    it('should render a button into a container and click on the button, then call initXO and then closeFlow immediately', (done) => {

        return window.paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {

                let open = window.open;
                window.open = function() {
                    done(new Error(`Expected window.open to not be called`));
                };

                window.paypal.checkout.initXO();
                window.paypal.checkout.closeFlow();

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

        return window.paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {

                let open = window.open;
                window.open = function() {
                    done(new Error(`Expected window.open to not be called`));
                };

                window.paypal.checkout.closeFlow();

                setTimeout(() => {
                    window.open = open;
                    done();
                }, 10);
            }

        }).then(() => {

            document.querySelector('#testContainer button').click();
        });
    });


    it('should call startFlow', (done) => {

        let token = generateECToken();

        window.paypal.checkout.startFlow(token);

        onHashChange(urlHash => {
            assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
            done();
        });
    });

    it('should call startFlow with a url', (done) => {

        let token = generateECToken();
        let hash = uniqueID();

        window.paypal.checkout.startFlow(`${CHILD_URI}?token=${token}#${hash}`);

        onHashChange(urlHash => {
            assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY&hash=${hash}`);
            done();
        });
    });

    it('should call startFlow with a url with no token', (done) => {

        window.paypal.checkout.startFlow(CHILD_REDIRECT_URI);

        onHashChange(urlHash => {
            assert.equal(urlHash, `#return?token=EC-XXXXXXXXXXXXXXXXX&PayerID=YYYYYYYYYYYYY&hash=redirectHash`);
            done();
        });
    });

    it('should call initXO and then startFlow', (done) => {

        let token = generateECToken();

        window.paypal.checkout.initXO();

        setTimeout(() => {
            window.paypal.checkout.startFlow(token);

            onHashChange(urlHash => {
                assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                done();
            });
        }, 100);
    });

    it('should call initXO and then startFlow with a url', (done) => {

        window.paypal.checkout.initXO();

        setTimeout(() => {

            let token = generateECToken();
            let hash = uniqueID();

            window.paypal.checkout.startFlow(`${CHILD_URI}?token=${token}#${hash}`);

            onHashChange(urlHash => {
                assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY&hash=${hash}`);
                done();
            });
        }, 100);
    });

    it('should call initXO and then startFlow with a url with no token', (done) => {

        window.paypal.checkout.initXO();

        setTimeout(() => {

            window.paypal.checkout.startFlow(CHILD_REDIRECT_URI);

            onHashChange(urlHash => {
                assert.equal(urlHash, `#return?token=EC-XXXXXXXXXXXXXXXXX&PayerID=YYYYYYYYYYYYY&hash=redirectHash`);
                done();
            });
        }, 100);
    });

    it('should call initXO and immediately startFlow', (done) => {

        let token = generateECToken();

        window.paypal.checkout.initXO();
        window.paypal.checkout.startFlow(token);

        onHashChange(urlHash => {
            assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
            done();
        });
    });

    it('should call initXO and then closeFlow', (done) => {

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

        window.paypal.checkout.initXO();

        setTimeout(() => {
            window.paypal.checkout.closeFlow();
        }, 100);
    });

    it('should call initXO and then closeFlow with a url', (done) => {

        window.paypal.checkout.initXO();

        setTimeout(() => {

            onHashChange(urlHash => {
                assert.equal(urlHash, `#closeFlowUrl`);
                done();
            });

            window.paypal.checkout.closeFlow('#closeFlowUrl');

        }, 100);
    });

    it('should call initXO and then closeFlow immediately', (done) => {

        let open = window.open;
        window.open = function() {
            window.open = open;

            return {
                close() {
                    done();
                }
            };
        };

        window.paypal.checkout.initXO();
        window.paypal.checkout.closeFlow();
    });
});
