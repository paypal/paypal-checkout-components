/* @flow */

import { assert } from 'chai';

import paypal from 'src/index';
import { config } from 'src/config';

import { onHashChange, uniqueID, generateECToken, createElement, createTestContainer, destroyTestContainer, getElement } from '../common';

for (let flow of [ 'popup', 'lightbox' ]) {

    describe(`paypal legacy hijack on ${flow}`, () => {

        beforeEach(() => {
            createTestContainer();
            paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            paypal.Checkout.contexts.lightbox = false;
        });

        it('should render a button into a form container and click on the button', () => {

            let token = generateECToken();

            let testForm = createElement({
                tag: 'form',
                container: 'testContainer',
                id: 'testForm',
                props: {
                    action: config.checkoutUrl
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

                container: 'testForm'

            }).then(() => {

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a cancel', () => {

            let token = generateECToken();

            let testForm = createElement({
                tag: 'form',
                container: 'testContainer',
                id: 'testForm',
                props: {
                    action: config.checkoutUrl
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

                container: 'testForm'

            }).then(() => {

                paypal.Checkout.props.testAction.def = () => 'cancel';

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    paypal.Checkout.props.testAction.def = () => 'checkout';
                    assert.equal(urlHash, `#cancel?token=${token}`);
                });
            });
        });

        it('should render a button into a link and click on the button', () => {

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

                container: 'testLink'

            }).then(() => {

                getElement('button', testLink).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY&hash=${hash}`);
                });
            });
        });

        it('should render a custom button into a form container and click on the button', () => {

            let token = generateECToken();

            let testForm = createElement({
                tag: 'form',
                container: 'testContainer',
                id: 'testForm',
                props: {
                    action: config.checkoutUrl
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

                button: 'testButton'

            }).then(() => {

                getElement('button', testForm).click();

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

                button: 'testLink'

            }).then(() => {

                testLink.click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY&hash=${hash}`);
                });
            });
        });

        it('should render a custom button into a link and click on the button', () => {

            let token = generateECToken();
            let hash = uniqueID();

            let testLink = createElement({
                tag: 'a',
                id: 'testLink',
                container: 'testContainer',
                props: {
                    href: `${config.checkoutUrl}&token=${token}#${hash}`
                },

                children: [
                    {
                        tag: 'button',
                        id: 'testButton'
                    }
                ]
            });

            return paypal.checkout.setup('merchantID', {

                button: 'testButton'

            }).then(() => {

                getElement('#testButton', testLink).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY&hash=${hash}`);
                });
            });
        });

        it('should render a custom button into a div into a link and click on the button', () => {

            let token = generateECToken();
            let hash = uniqueID();

            let testLink = createElement({
                tag: 'a',
                id: 'testLink',
                container: 'testContainer',
                props: {
                    href: `${config.checkoutUrl}&token=${token}#${hash}`
                },

                children: [
                    {
                        children: [
                            {
                                tag: 'button',
                                id: 'testButton'
                            }
                        ]
                    }
                ]
            });

            return paypal.checkout.setup('merchantID', {

                button: 'testButton'

            }).then(() => {

                getElement('#testButton', testLink).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY&hash=${hash}`);
                });
            });
        });

        it('should render a custom button into a link and click on another button in the link', () => {

            let token = generateECToken();
            let hash = uniqueID();

            let testForm = createElement({

                container: 'testContainer',

                tag: 'form',
                id: 'testForm',
                props: {
                    action: config.checkoutUrl
                },

                children: [
                    {
                        tag: 'a',
                        id: 'testLink',
                        props: {
                            href: `${config.checkoutUrl}&token=${token}#${hash}`
                        },

                        children: [
                            {
                                tag: 'div',
                                id: 'testButton',
                                html: 'clickme'
                            }
                        ]
                    }
                ]
            });

            return paypal.checkout.setup('merchantID', {

                container: 'testLink'

            }).then(() => {

                getElement('#testButton', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY&hash=${hash}`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a true condition', () => {

            let token = generateECToken();

            let testForm = createElement({
                tag: 'form',
                container: 'testContainer',
                id: 'testForm',
                props: {
                    action: config.checkoutUrl
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

                condition() : boolean {
                    return true;
                }

            }).then(() => {

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a false condition', () => {

            let token = generateECToken();

            let testForm = createElement({
                tag: 'form',
                container: 'testContainer',
                id: 'testForm',
                props: {
                    action: config.checkoutUrl
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

                condition() : boolean {
                    return false;
                }

            }).then(() => {

                let windowOpened = false;
                let windowOpen = window.open;

                window.open = () => {
                    windowOpened = true;
                };

                let submitted = false;

                testForm.addEventListener('submit', event => {
                    event.preventDefault();
                    submitted = true;
                });

                getElement('button', testForm).click();

                if (submitted) {
                    throw new Error('Expected form to not be submitted');
                }

                if (windowOpened) {
                    throw new Error('Expected window not to be opened');
                }

                window.open = windowOpen;
            });
        });
    });
}
