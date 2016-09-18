
import ppxo from 'src/index';

function onHashChange(method) {

    let currentHash = window.location.hash;

    let interval = setInterval(function() {
        if (window.location.hash !== currentHash) {
            clearInterval(interval);
            method(window.location.hash);
        }
    }, 10);
}

function generateECToken() {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return 'EC-XXXXXXXXXXXXXXXXX'.replace(/X/g, item => {
        return chars.charAt(Math.floor(Math.random() * chars.length));
    });
}

describe('ppxo legacy cases', () => {

    let testContainer = document.createElement('div');
    testContainer.id = 'testContainer';
    document.body.appendChild(testContainer);

    afterEach(function() {
        testContainer.innerHTML = '';
        window.location.hash = '';
        ppxo.Checkout.contexts.lightbox = false;
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

    it('should render a button into a container and click on the button, then call startFlow', (done) => {

        let token = generateECToken();

        return paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {

                paypal.checkout.startFlow(token);

                onHashChange(hash => {
                    assert.equal(hash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                    done();
                });
            }

        }).then(() => {

            document.querySelector('#testContainer button').click();
        });
    });

    it('should render a button into a container and click on the button, then call initXO, then startFlow', (done) => {

        let token = generateECToken();

        return paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {

                paypal.checkout.initXO();

                setTimeout(() => {
                    paypal.checkout.startFlow(token);

                    onHashChange(hash => {
                        assert.equal(hash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                        done();
                    });

                }, 100);
            }

        }).then(() => {

            document.querySelector('#testContainer button').click();
        });
    });

    it('should render a button into a container and click on the button, then call initXO and immediately startFlow', (done) => {

        let token = generateECToken();

        return paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {

                paypal.checkout.initXO();
                paypal.checkout.startFlow(token);

                onHashChange(hash => {
                    assert.equal(hash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                    done();
                });
            }

        }).then(() => {

            document.querySelector('#testContainer button').click();
        });
    });

    it('should render a button into a container and click on the button, then call initXO and then closeFlow', (done) => {

        let token = generateECToken();

        return paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {

                console.warn(11111);

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

                paypal.checkout.initXO();

                setTimeout(function() {
                    paypal.checkout.closeFlow();
                }, 100);
            }

        }).then(() => {

            document.querySelector('#testContainer button').click();
        });
    });

    it('should render a button into a container and click on the button, then call startFlow', (done) => {

        let token = generateECToken();

        return paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {

                setTimeout(() => {
                    paypal.checkout.startFlow(token);

                    onHashChange(hash => {
                        assert.equal(hash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                        done();
                    });

                }, 100);
            }

        }).then(() => {

            document.querySelector('#testContainer button').click();
        });
    });

    it('should render a button into a container and click on the button, then call initXO and then closeFlow with a url', (done) => {

        let token = generateECToken();

        return paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {

                paypal.checkout.initXO();

                setTimeout(function() {

                    onHashChange(hash => {
                        assert.equal(hash, `#closeFlowUrl`);
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

        let token = generateECToken();

        return paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {

                let open = window.open;
                window.open = function() {
                    done(new Error(`Expected window.open to not be called`))
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

        let token = generateECToken();

        return paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {

                let open = window.open;
                window.open = function() {
                    done(new Error(`Expected window.open to not be called`))
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


    it('should call startFlow', (done) => {

        let token = generateECToken();

        paypal.checkout.startFlow(token);

        onHashChange(hash => {
            assert.equal(hash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
            done();
        });
    });

    it('should call initXO and then startFlow', (done) => {

        let token = generateECToken();

        paypal.checkout.initXO();

        setTimeout(function() {
            paypal.checkout.startFlow(token);

            onHashChange(hash => {
                assert.equal(hash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                done();
            });
        }, 100);
    });

    it('should call initXO and immediately startFlow', (done) => {

        let token = generateECToken();

        paypal.checkout.initXO();
        paypal.checkout.startFlow(token);

        onHashChange(hash => {
            assert.equal(hash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
            done();
        });
    });

    it('should call initXO and then closeFlow', (done) => {

        let token = generateECToken();

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

        paypal.checkout.initXO();

        setTimeout(function() {
            paypal.checkout.closeFlow();
        }, 100);
    });

    it('should call initXO and then closeFlow with a url', (done) => {

        let token = generateECToken();

        paypal.checkout.initXO();

        setTimeout(function() {

            onHashChange(hash => {
                assert.equal(hash, `#closeFlowUrl`);
                done();
            });

            paypal.checkout.closeFlow('#closeFlowUrl');

        }, 100);
    });

    it('should call initXO and then closeFlow immediately', (done) => {

        let token = generateECToken();

        let open = window.open;
        window.open = function() {
            window.open = open;

            return {
                close() {
                    done();
                }
            };
        };

        paypal.checkout.initXO();
        paypal.checkout.closeFlow();
    });
});
