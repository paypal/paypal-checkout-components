/* @flow */
/* eslint max-lines: 0 */

import { createElement, createTestContainer, destroyTestContainer, getElement, assert } from '../common';

describe('paypal legacy button rendering', () => {

    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
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

        window.paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click() {
                done();
            }

        }).then(() => {

            getElement('#testContainer button').click();

        }).catch(done);
    });

    it('should render a button into a container using buttons array and provide a working click handler', (done) => {

        window.paypal.checkout.setup('merchantID', {

            buttons: [
                {
                    container: 'testContainer',
                    click() {
                        done();
                    }
                }
            ]

        }).then(() => {

            getElement('#testContainer button').click();

        }).catch(done);
    });


    it('should render a button into a container and provide a working click handler which is passed an event', (done) => {

        window.paypal.checkout.setup('merchantID', {

            container: 'testContainer',

            click(event) {
                assert.ok(event, 'Expected an event to be passed to click function');
                assert.ok(event.preventDefault instanceof Function, 'Expected event to have preventDefault method');

                done();
            }

        }).then(() => {

            getElement('#testContainer button').click();
        }).catch(done);
    });

    it('should render multiple buttons into a container and provide a working click handler', (done) => {

        let clickCount = 0;

        window.paypal.checkout.setup('merchantID', {

            buttons: [
                {
                    container: 'testContainer',
                    click() {
                        clickCount += 1;

                        if (clickCount === 2) {
                            done();
                        }
                    }
                },

                {
                    container: 'testContainer',
                    click() {
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
        }).catch(done);
    });

    it('should work with a link container', (done) => {

        let link = createElement({
            tag:       'link',
            id:        'linkContainer',
            container: 'testContainer'
        });

        window.paypal.checkout.setup('merchantID', {

            buttons: [
                {
                    container: 'linkContainer',
                    click() {
                        done();
                    }
                }
            ]

        }).then(() => {

            getElement('button', link).click();
        }).catch(done);
    });

    it('should work with a link container when the container is clicked', (done) => {

        let link = createElement({
            tag:       'a',
            id:        'linkContainer',
            container: 'testContainer'
        });

        window.paypal.checkout.setup('merchantID', {

            buttons: [
                {
                    container: 'linkContainer',
                    click() {
                        done();
                    }
                }
            ]

        }).then(() => {

            link.click();

        }).catch(done);
    });

    it('should not work with a non-link container when the container is clicked', (done) => {

        let paraContainer = createElement({
            tag:       'p',
            id:        'paraContainer',
            container: 'testContainer'
        });

        let clicked = false;

        window.paypal.checkout.setup('merchantID', {

            buttons: [
                {
                    container: 'paraContainer',
                    click() {
                        clicked = true;
                        done(new Error('Expected click handler to not be called'));
                    }
                }
            ]

        }).then(() => {
            paraContainer.click();
            setTimeout(() => {
                if (!clicked) {
                    done();
                }
            }, 200);
        });
    });

    it('should prioritize buttons[i].container over options.container', (done) => {

        window.paypal.checkout.setup('merchantID', {

            container: 'fooContainer',

            buttons: [
                {
                    container: 'testContainer',
                    click() {
                        done();
                    }
                }
            ]

        }).then(() => {

            document.querySelectorAll('#testContainer button')[0].click();
        }).catch(done);
    });

    it('should render multiple buttons into a container and provide a working click handler with some invalid buttons', (done) => {

        let clickCount = 0;

        window.paypal.checkout.setup('merchantID', {

            buttons: [
                {
                    container: 'DOESNOTEXIST1',
                    click() : void {
                        return done(new Error('Expected non-existant button to not be clicked'));
                    }
                },

                {
                    container: 'testContainer',
                    click() {
                        clickCount += 1;

                        if (clickCount === 2) {
                            done();
                        }
                    }
                },

                {
                    container: 'DOESNOTEXIST2',
                    click() : void {
                        return done(new Error('Expected non-existant button to not be clicked'));
                    }
                },

                {
                    container: 'testContainer',
                    click() {
                        clickCount += 1;

                        if (clickCount === 2) {
                            done();
                        }
                    }
                },

                {
                    container: 'DOESNOTEXIST3',
                    click() : void {
                        return done(new Error('Expected non-existant button to not be clicked'));
                    }
                }
            ]

        }).then(() => {

            document.querySelectorAll('#testContainer button')[0].click();
            document.querySelectorAll('#testContainer button')[1].click();
        }).catch(done);
    });

    it('should use a custom button and provide a working click handler', (done) => {

        let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

        window.paypal.checkout.setup('merchantID', {

            button: 'testButton',

            click() {
                done();
            }

        }).then(() => {

            testButton.click();
        }).catch(done);
    });

    it('should use a custom button array with multiple buttons and provide a working click handler', (done) => {

        let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
        let testButton2 = createElement({ tag: 'button', id: 'testButton2', container: 'testContainer' });

        let clickCount = 0;

        window.paypal.checkout.setup('merchantID', {

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
        }).catch(done);
    });

    it('should use a custom button array with multiple buttons, some non-existant and provide a working click handler', (done) => {

        let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
        let testButton2 = createElement({ tag: 'button', id: 'testButton2', container: 'testContainer' });

        let clickCount = 0;

        window.paypal.checkout.setup('merchantID', {

            button: [ 'testButtonDOESNOTEXIST1', 'testButton', 'testButtonDOESNOTEXIST2', 'testButton2', 'testButtonDOESNOTEXIST3' ],

            click() {
                clickCount += 1;

                if (clickCount === 2) {
                    done();
                }
            }

        }).then(() => {

            testButton.click();
            testButton2.click();
        }).catch(done);
    });

    it('should use a custom button array with mutiple buttons called button and provide a working click handler', (done) => {

        let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
        let testButton2 = createElement({ tag: 'button', id: 'testButton2', container: 'testContainer' });

        let clickCount = 0;

        window.paypal.checkout.setup('merchantID', {

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
        }).catch(done);
    });

    it('should use a custom buttons array and provide a working click handler', (done) => {

        let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

        window.paypal.checkout.setup('merchantID', {

            buttons: [
                {
                    button: 'testButton',
                    click() {
                        done();
                    }
                }
            ]

        }).then(() => {

            testButton.click();
        }).catch(done);
    });

    it('should use a custom buttons array with multiple buttons and provide a working click handler', (done) => {

        let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
        let testButton2 = createElement({ tag: 'button', id: 'testButton2', container: 'testContainer' });

        let clickCount = 0;

        window.paypal.checkout.setup('merchantID', {

            buttons: [
                {
                    button: 'testButton',
                    click() {
                        clickCount += 1;

                        if (clickCount === 2) {
                            done();
                        }
                    }
                },

                {
                    button: 'testButton2',
                    click() {
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
        }).catch(done);
    });

    it('should use a custom buttons array with multiple buttons, some non-existant, and provide a working click handler', (done) => {

        let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
        let testButton2 = createElement({ tag: 'button', id: 'testButton2', container: 'testContainer' });

        let clickCount = 0;

        window.paypal.checkout.setup('merchantID', {

            buttons: [
                {
                    button: 'DOESNOTEXIST1',
                    click() : void {
                        return done(new Error('Expected click handler for non-existant button to not be called'));
                    }
                },

                {
                    button: 'testButton',
                    click() {
                        clickCount += 1;

                        if (clickCount === 2) {
                            done();
                        }
                    }
                },

                {
                    button: 'DOESNOTEXIST2',
                    click() : void {
                        return done(new Error('Expected click handler for non-existant button to not be called'));
                    }
                },

                {
                    button: 'testButton2',
                    click() {
                        clickCount += 1;

                        if (clickCount === 2) {
                            done();
                        }
                    }
                },

                {
                    button: 'DOESNOTEXIST3',
                    click() : void {
                        return done(new Error('Expected click handler for non-existant button to not be called'));
                    }
                }
            ]

        }).then(() => {

            testButton.click();
            testButton2.click();
        }).catch(done);
    });


    it('should use a custom button and provide a working click handler which is passed an event', (done) => {

        let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

        window.paypal.checkout.setup('merchantID', {

            button: 'testButton',

            click(event) {
                assert.ok(event, 'Expected an event to be passed to click function');
                assert.ok(event.preventDefault instanceof Function, 'Expected event to have preventDefault method');

                done();
            }

        }).then(() => {

            testButton.click();
        }).catch(done);
    });

    it('should render a button into a link container, click on a custom button, and provide a working click handler', (done) => {

        let customLink = createElement({
            tag:       'a',
            id:        'customLink',
            container: 'testContainer',

            children: [
                {
                    tag: 'button',
                    id:  'testButton'
                }
            ]
        });

        window.paypal.checkout.setup('merchantID', {

            container: 'customLink',

            click() {
                done();
            }

        }).then(() => {

            getElement('#testButton', customLink).click();
        }).catch(done);
    });

    it('should use a containers array and provide a working click handler', (done) => {

        let buttonContainer1 = createElement({ id: 'buttonContainer1', container: 'testContainer' });
        let buttonContainer2 = createElement({ id: 'buttonContainer2', container: 'testContainer' });

        let clickCount = 0;

        window.paypal.checkout.setup('merchantID', {

            container: [ 'buttonContainer1', 'buttonContainer2' ],

            click() {
                clickCount += 1;

                if (clickCount === 2) {
                    done();
                }
            }

        }).then(() => {

            getElement('button', buttonContainer1).click();
            getElement('button', buttonContainer2).click();
        }).catch(done);
    });

    it('should use a containers array, some nonexistent, and provide a working click handler', (done) => {

        let buttonContainer1 = createElement({ id: 'buttonContainer1', container: 'testContainer' });
        let buttonContainer2 = createElement({ id: 'buttonContainer2', container: 'testContainer' });

        let clickCount = 0;

        window.paypal.checkout.setup('merchantID', {

            container: [ 'DOESNOTEXIST1', 'buttonContainer1', 'DOESNOTEXIST2', 'buttonContainer2', 'DOESNOTEXIST3' ],

            click() {
                clickCount += 1;

                if (clickCount === 2) {
                    done();
                }
            }

        }).then(() => {

            getElement('button', buttonContainer1).click();
            getElement('button', buttonContainer2).click();
        }).catch(done);
    });

    it('should render a button into a non-link container, click on a custom button, and provide a working click handler', (done) => {

        let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

        let clicked = false;

        window.paypal.checkout.setup('merchantID', {

            container: 'testButton',

            click() {
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

    it('should listen for click on button when passed both button and container', (done) => {

        let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
        createElement({ tag: 'div', id: 'randomContainer', container: 'testContainer' });

        window.paypal.checkout.setup('merchantID', {

            button:    'testButton',
            container: 'randomContainer',

            click() {
                done();
            }

        }).then(() => {

            testButton.click();
        }).catch(done);
    });

    it('should listen for click on button when passed both button array and container', (done) => {

        let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
        createElement({ tag: 'div', id: 'randomContainer', container: 'testContainer' });

        window.paypal.checkout.setup('merchantID', {

            button:    [ 'testButton' ],
            container: 'randomContainer',

            click() {
                done();
            }

        }).then(() => {

            testButton.click();
        }).catch(done);
    });

    it('should listen for click on button when passed both button array and container array', (done) => {

        let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
        createElement({ tag: 'div', id: 'randomContainer', container: 'testContainer' });

        window.paypal.checkout.setup('merchantID', {

            button:    [ 'testButton' ],
            container: [ 'randomContainer' ],

            click() {
                done();
            }

        }).then(() => {

            testButton.click();
        }).catch(done);
    });

    it('should not render button to container when passed both button and container', (done) => {

        createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
        let randomContainer = createElement({ tag: 'div', id: 'randomContainer', container: 'testContainer' });

        window.paypal.checkout.setup('merchantID', {

            button:    'testButton',
            container: 'randomContainer',

            click() {
                done(new Error(`Expected click handler not to be called`));
            }

        }).then(() => {

            if (randomContainer.querySelector('button')) {
                return done(new Error(`Expected container to not contain a button`));
            }

            done();
        }).catch(done);
    });

    it('should register clicks on container when passed both button and container', (done) => {

        createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
        let randomContainer = createElement({ tag: 'div', id: 'randomContainer', container: 'testContainer' });

        window.paypal.checkout.setup('merchantID', {

            button:    'testButton',
            container: 'randomContainer',

            click() {
                done();
            }

        }).then(() => {

            randomContainer.click();
        }).catch(done);
    });

    it('should register clicks on container when passed both button and container array', (done) => {

        createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
        let randomContainer = createElement({ tag: 'div', id: 'randomContainer', container: 'testContainer' });

        window.paypal.checkout.setup('merchantID', {

            button:    'testButton',
            container: [ 'randomContainer' ],

            click() {
                done();
            }

        }).then(() => {

            randomContainer.click();
        }).catch(done);
    });

    it('should register clicks on container when passed both button array and container', (done) => {

        createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
        let randomContainer = createElement({ tag: 'div', id: 'randomContainer', container: 'testContainer' });

        window.paypal.checkout.setup('merchantID', {

            button:    [ 'testButton' ],
            container: 'randomContainer',

            click() {
                done();
            }

        }).then(() => {

            randomContainer.click();
        }).catch(done);
    });

    it('should register clicks on container when passed both button array and container array', (done) => {

        createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });
        let randomContainer = createElement({ tag: 'div', id: 'randomContainer', container: 'testContainer' });

        window.paypal.checkout.setup('merchantID', {

            button:    [ 'testButton' ],
            container: [ 'randomContainer' ],

            click() {
                done();
            }

        }).then(() => {

            randomContainer.click();
        }).catch(done);
    });
});

describe('paypal legacy button options', () => {

    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
    });

    it('should render two buttons with different locales and verify that the content is different', () => {

        let container1 = createElement({ id: 'container1', container: 'testContainer' });
        let container2 = createElement({ id: 'container2', container: 'testContainer' });
        let container3 = createElement({ id: 'container3', container: 'testContainer' });

        return window.paypal.checkout.setup('merchantID', {

            buttons: [
                {
                    container: 'container1',
                    locale:    'en_US'
                },

                {
                    container: 'container2',
                    locale:    'en_US'
                },

                {
                    container: 'container3',
                    locale:    'fr_FR'
                }
            ]

        }).then(() => {

            let content1 = (getElement('.paypal-button-content span', container1).innerText || '').trim();
            let content2 = (getElement('.paypal-button-content span', container2).innerText || '').trim();
            let content3 = (getElement('.paypal-button-content span', container3).innerText || '').trim();

            assert.equal(content1, content2, 'en_US should match en_US');
            assert.notEqual(content1, content3, 'en_US should not match en_FR');
        });
    });


    it('should render a button with no locale and verify it defaults to en_US', () => {

        let container1 = createElement({ id: 'container1', container: 'testContainer' });
        let container2 = createElement({ id: 'container2', container: 'testContainer' });

        return window.paypal.checkout.setup('merchantID', {

            buttons: [
                {
                    container: 'container1',
                    locale:    'en_US'
                },

                {
                    container: 'container2'
                }
            ]

        }).then(() => {

            let content1 = (getElement('.paypal-button-content span', container1).innerText || '').trim();
            let content2 = (getElement('.paypal-button-content span', container2).innerText || '').trim();

            assert.equal(content1, content2, 'en_US should match no locale');
        });
    });

    it('should render a button with an unknown locale and verify it defaults to en_US', () => {

        let container1 = createElement({ id: 'container1', container: 'testContainer' });
        let container2 = createElement({ id: 'container2', container: 'testContainer' });

        return window.paypal.checkout.setup('merchantID', {

            buttons: [
                {
                    container: 'container1',
                    locale:    'en_US'
                },

                {
                    container: 'container2',
                    locale:    'xx_XX'
                }
            ]

        }).then(() => {

            let content1 = (getElement('.paypal-button-content span', container1).innerText || '').trim();
            let content2 = (getElement('.paypal-button-content span', container2).innerText || '').trim();

            assert.equal(content1, content2, 'en_US should match xx_XX');
        });
    });

    it('should render a button with locale=fr and verify it defaults to fr_US', () => {

        let container1 = createElement({ id: 'container1', container: 'testContainer' });
        let container2 = createElement({ id: 'container2', container: 'testContainer' });

        return window.paypal.checkout.setup('merchantID', {

            buttons: [
                {
                    container: 'container1',
                    locale:    'fr_US'
                },

                {
                    container: 'container2',
                    locale:    'fr'
                }
            ]

        }).then(() => {

            let content1 = (getElement('.paypal-button-content span', container1).innerText || '').trim();
            let content2 = (getElement('.paypal-button-content span', container2).innerText || '').trim();

            assert.equal(content1, content2, 'fr_US should match fr');
        });
    });

    it('should render a button with locale=US and verify it defaults to en_US', () => {

        let container1 = createElement({ id: 'container1', container: 'testContainer' });
        let container2 = createElement({ id: 'container2', container: 'testContainer' });

        return window.paypal.checkout.setup('merchantID', {

            buttons: [
                {
                    container: 'container1',
                    locale:    'en_US'
                },

                {
                    container: 'container2',
                    locale:    'US'
                }
            ]

        }).then(() => {

            let content1 = (getElement('.paypal-button-content span', container1).innerText || '').trim();
            let content2 = (getElement('.paypal-button-content span', container2).innerText || '').trim();

            assert.equal(content1, content2, 'en_US should match US');
        });
    });

    it('should render a button with locale=FR and verify it defaults to fr_FR', () => {

        let container1 = createElement({ id: 'container1', container: 'testContainer' });
        let container2 = createElement({ id: 'container2', container: 'testContainer' });

        return window.paypal.checkout.setup('merchantID', {

            buttons: [
                {
                    container: 'container1',
                    locale:    'en_FR'
                },

                {
                    container: 'container2',
                    locale:    'FR'
                }
            ]

        }).then(() => {

            let content1 = (getElement('.paypal-button-content span', container1).innerText || '').trim();
            let content2 = (getElement('.paypal-button-content span', container2).innerText || '').trim();

            assert.equal(content1, content2, 'en_FR should match FR');
        });
    });

    it('should render a button and ensure the correct class is added by default', () => {

        let container1 = createElement({ id: 'container1', container: 'testContainer' });

        return window.paypal.checkout.setup('merchantID', {

            container: 'container1'

        }).then(() => {
            assert.ok(getElement('button', container1).classList.contains('paypal-style-checkout'));
            assert.ok(getElement('button', container1).classList.contains('paypal-size-small'));
            assert.ok(getElement('button', container1).classList.contains('paypal-color-gold'));
            assert.ok(getElement('button', container1).classList.contains('paypal-shape-pill'));
            assert.ok(getElement('button', container1).classList.contains('en_US'));
        });
    });

    it('should render a button with size=tiny and ensure the correct class is added', () => {

        let container1 = createElement({ id: 'container1', container: 'testContainer' });

        return window.paypal.checkout.setup('merchantID', {

            container: 'container1',
            size:      'tiny'

        }).then(() => {

            assert.ok(getElement('button', container1).classList.contains('paypal-size-tiny'));
        });
    });

    it('should render a button with size=small and ensure the correct class is added', () => {

        let container1 = createElement({ id: 'container1', container: 'testContainer' });

        return window.paypal.checkout.setup('merchantID', {

            container: 'container1',
            size:      'small'

        }).then(() => {

            assert.ok(getElement('button', container1).classList.contains('paypal-size-small'));
        });
    });

    it('should render a button with size=medium and ensure the correct class is added', () => {

        let container1 = createElement({ id: 'container1', container: 'testContainer' });

        return window.paypal.checkout.setup('merchantID', {

            container: 'container1',
            size:      'medium'

        }).then(() => {

            assert.ok(getElement('button', container1).classList.contains('paypal-size-medium'));
        });
    });

    it('should render a button with shape=pill and ensure the correct class is added', () => {

        let container1 = createElement({ id: 'container1', container: 'testContainer' });

        return window.paypal.checkout.setup('merchantID', {

            container: 'container1',
            shape:     'pill'

        }).then(() => {

            assert.ok(getElement('button', container1).classList.contains('paypal-shape-pill'));
        });
    });

    it('should render a button with shape=rect and ensure the correct class is added', () => {

        let container1 = createElement({ id: 'container1', container: 'testContainer' });

        return window.paypal.checkout.setup('merchantID', {

            container: 'container1',
            shape:     'rect'

        }).then(() => {

            assert.ok(getElement('button', container1).classList.contains('paypal-shape-rect'));
        });
    });

    it('should render a button with color=gold and ensure the correct class is added', () => {

        let container1 = createElement({ id: 'container1', container: 'testContainer' });

        return window.paypal.checkout.setup('merchantID', {

            container: 'container1',
            color:     'gold'

        }).then(() => {

            assert.ok(getElement('button', container1).classList.contains('paypal-color-gold'));
        });
    });

    it('should render a button with color=blue and ensure the correct class is added', () => {

        let container1 = createElement({ id: 'container1', container: 'testContainer' });

        return window.paypal.checkout.setup('merchantID', {

            container: 'container1',
            color:     'blue'

        }).then(() => {

            assert.ok(getElement('button', container1).classList.contains('paypal-color-blue'));
        });
    });

    it('should render a button with color=silver and ensure the correct class is added', () => {

        let container1 = createElement({ id: 'container1', container: 'testContainer' });

        return window.paypal.checkout.setup('merchantID', {

            container: 'container1',
            color:     'silver'

        }).then(() => {

            assert.ok(getElement('button', container1).classList.contains('paypal-color-silver'));
        });
    });

    it('should render a button with locale=fr_FR and ensure the correct class is added', () => {

        let container1 = createElement({ id: 'container1', container: 'testContainer' });

        return window.paypal.checkout.setup('merchantID', {

            container: 'container1',
            locale:    'fr_FR'

        }).then(() => {

            assert.ok(getElement('button', container1).classList.contains('fr_FR'));
        });
    });

    it('should render multiple buttons with different styles and ensure the correct class is added', () => {

        let container1 = createElement({ id: 'container1', container: 'testContainer' });
        let container2 = createElement({ id: 'container2', container: 'testContainer' });
        let container3 = createElement({ id: 'container3', container: 'testContainer' });

        return window.paypal.checkout.setup('merchantID', {

            buttons: [
                {
                    container: 'container1',
                    color:     'gold',
                    size:      'tiny',
                    shape:     'rect',
                    locale:    'de_DE'
                },
                {
                    container: 'container2',
                    color:     'silver',
                    size:      'medium',
                    shape:     'pill',
                    locale:    'en_GB'
                },
                {
                    container: 'container3',
                    color:     'blue',
                    size:      'small',
                    shape:     'rect',
                    locale:    'es_ES'
                }
            ]

        }).then(() => {

            assert.ok(getElement('button', container1).classList.contains('paypal-style-checkout'));
            assert.ok(getElement('button', container1).classList.contains('paypal-size-tiny'));
            assert.ok(getElement('button', container1).classList.contains('paypal-color-gold'));
            assert.ok(getElement('button', container1).classList.contains('paypal-shape-rect'));
            assert.ok(getElement('button', container1).classList.contains('de_DE'));

            assert.ok(getElement('button', container2).classList.contains('paypal-style-checkout'));
            assert.ok(getElement('button', container2).classList.contains('paypal-size-medium'));
            assert.ok(getElement('button', container2).classList.contains('paypal-color-silver'));
            assert.ok(getElement('button', container2).classList.contains('paypal-shape-pill'));
            assert.ok(getElement('button', container2).classList.contains('en_GB'));

            assert.ok(getElement('button', container3).classList.contains('paypal-style-checkout'));
            assert.ok(getElement('button', container3).classList.contains('paypal-size-small'));
            assert.ok(getElement('button', container3).classList.contains('paypal-color-blue'));
            assert.ok(getElement('button', container3).classList.contains('paypal-shape-rect'));
            assert.ok(getElement('button', container3).classList.contains('es_ES'));
        });
    });
});
