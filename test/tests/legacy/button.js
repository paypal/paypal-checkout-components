
import paypal from 'src/index';

import { createElement, createTestContainer, destroyTestContainer } from './common';

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

        let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

        return paypal.checkout.setup('merchantID', {

            button: 'testButton',

            click(event) {
                done();
            }

        }).then(() => {

            testButton.click();
        });
    });

    it('should use a custom button array with multiple buttons and provide a working click handler', (done) => {

        let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
        let testButton2 = createElement({ tag: 'button', id: 'testButton2', container: 'testContainer' });

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

            testButton.click();
            testButton2.click();
        });
    });

    it('should use a custom button array with mutiple buttons called button and provide a working click handler', (done) => {

        let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
        let testButton2 = createElement({ tag: 'button', id: 'testButton2', container: 'testContainer' });

        let clickCount = 0;

        return paypal.checkout.setup('merchantID', {

            buttons: [ 'testButton', 'testButton2' ],

            click() {
                clickCount += 1;

                if (clickCount === 2) {
                    done();
                }
            }

        }).then(() => {

            testButton.click();
            testButton2.click();
        });
    });

    it('should use a custom buttons array and provide a working click handler', (done) => {

        let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

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

            testButton.click();
        });
    });

    it('should use a custom buttons array with multiple buttons and provide a working click handler', (done) => {

        let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
        let testButton2 = createElement({ tag: 'button', id: 'testButton2', container: 'testContainer' });

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

            testButton.click();
            testButton2.click();
        });
    });


    it('should use a custom button and provide a working click handler which is passed an event', (done) => {

        let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

        return paypal.checkout.setup('merchantID', {

            button: 'testButton',

            click(event) {
                assert.ok(event, 'Expected an event to be passed to click function');
                assert.ok(event.preventDefault instanceof Function, 'Expected event to have preventDefault method');

                done();
            }

        }).then(() => {

            testButton.click();
        });
    });

    it('should use a custom button and provide a working click handler which is not passed an err', (done) => {

        let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

        return paypal.checkout.setup('merchantID', {

            button: 'testButton',

            click(err) {
                assert.ifError(err, 'Expected err to not be passed to click function');

                done();
            }

        }).then(() => {

            testButton.click();
        });
    });

    it('should use a custom button and provide a working click handler which is not passed an error', (done) => {

        let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

        return paypal.checkout.setup('merchantID', {

            button: 'testButton',

            click(error) {
                assert.ifError(error, 'Expected error to not be passed to click function');

                done();
            }

        }).then(() => {

            testButton.click();
        });
    });

    it('should render a button into a link container, click on a custom button, and provide a working click handler', (done) => {

        let customLink = createElement({
            tag: 'a',
            id: 'customLink',
            container: 'testContainer',

            children: [
                {
                    tag: 'button',
                    id: 'testButton'
                }
            ]
        });

        return paypal.checkout.setup('merchantID', {

            container: 'customLink',

            click(event) {
                done();
            }

        }).then(() => {

            customLink.querySelector('#testButton').click();
        });
    });

    it('should render a button into a non-link container, click on a custom button, and provide a working click handler', (done) => {

        let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

        let clicked = false;

        return paypal.checkout.setup('merchantID', {

            container: 'customLink',

            click(event) {
                clicked = true;
                done(new Error(`Expected click not to be called`));
            }

        }).then(() => {

            testButton.click();

            setTimeout(() => {
                if (!clicked) {
                    done();
                } else {
                    done(new Error('Expected button to not be clicked'));
                }
            }, 20);
        });
    });
});
