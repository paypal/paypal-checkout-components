/* @flow */

import { onHashChange, uniqueID, generateECToken, createElement,
    createTestContainer, destroyTestContainer, getElement, assert } from '../common';

for (let flow of [ 'popup', 'iframe' ]) {

    describe(`paypal legacy hijack on ${ flow }`, () => {

        beforeEach(() => {
            createTestContainer();
            window.paypal.Checkout.contexts.iframe = (flow === 'iframe');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            window.paypal.Checkout.contexts.iframe = false;
        });

        it('should render a button into a form container and click on the button', () => {

            let token = generateECToken();

            let testForm = createElement({
                tag:       'form',
                container: 'testContainer',
                id:        'testForm',
                props:     {
                    action: window.paypal.config.checkoutUrl
                },

                children: [
                    {
                        tag:   'input',
                        props: {
                            name:  'token',
                            value: token
                        }
                    }
                ]
            });

            return window.paypal.checkout.setup('merchantID', {

                container: 'testForm'

            }).then(() => {

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a cancel', () => {

            let token = generateECToken();

            let testForm = createElement({
                tag:       'form',
                container: 'testContainer',
                id:        'testForm',
                props:     {
                    action: window.paypal.config.checkoutUrl
                },

                children: [
                    {
                        tag:   'input',
                        props: {
                            name:  'token',
                            value: token
                        }
                    }
                ]
            });

            return window.paypal.checkout.setup('merchantID', {

                container: 'testForm'

            }).then(() => {

                window.__test__ = { action: 'cancel' };

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#cancel?token=${ token }`);
                });
            });
        });

        it('should render a button into a link and click on the button', () => {

            let token = generateECToken();
            let hash = uniqueID();

            let testLink = createElement({
                tag:       'a',
                id:        'testLink',
                container: 'testContainer',
                props:     {
                    href: `${ window.paypal.config.checkoutUrl }&token=${ token }#${ hash }`
                }
            });

            return window.paypal.checkout.setup('merchantID', {

                container: 'testLink'

            }).then(() => {

                getElement('button', testLink).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY&hash=${ hash }`);
                });
            });
        });

        it('should render a custom button into a form container and click on the button', () => {

            let token = generateECToken();

            let testForm = createElement({
                tag:       'form',
                container: 'testContainer',
                id:        'testForm',
                props:     {
                    action: window.paypal.config.checkoutUrl
                },

                children: [
                    {
                        tag:   'input',
                        props: {
                            name:  'token',
                            value: token
                        }
                    },

                    {
                        tag: 'button',
                        id:  'testButton'
                    }
                ]
            });

            return window.paypal.checkout.setup('merchantID', {

                button: 'testButton'

            }).then(() => {

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a custom link and click on the link', () => {

            let token = generateECToken();
            let hash = uniqueID();

            let testLink = createElement({
                tag:       'a',
                id:        'testLink',
                container: 'testContainer',
                props:     {
                    href: `${ window.paypal.config.checkoutUrl }&token=${ token }#${ hash }`
                }
            });

            return window.paypal.checkout.setup('merchantID', {

                button: 'testLink'

            }).then(() => {

                testLink.click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY&hash=${ hash }`);
                });
            });
        });

        it('should render a custom button into a link and click on the button', () => {

            let token = generateECToken();
            let hash = uniqueID();

            let testLink = createElement({
                tag:       'a',
                id:        'testLink',
                container: 'testContainer',
                props:     {
                    href: `${ window.paypal.config.checkoutUrl }&token=${ token }#${ hash }`
                },

                children: [
                    {
                        tag: 'button',
                        id:  'testButton'
                    }
                ]
            });

            return window.paypal.checkout.setup('merchantID', {

                button: 'testButton'

            }).then(() => {

                getElement('#testButton', testLink).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY&hash=${ hash }`);
                });
            });
        });

        it('should render a custom button into a div into a link and click on the button', () => {

            let token = generateECToken();
            let hash = uniqueID();

            let testLink = createElement({
                tag:       'a',
                id:        'testLink',
                container: 'testContainer',
                props:     {
                    href: `${ window.paypal.config.checkoutUrl }&token=${ token }#${ hash }`
                },

                children: [
                    {
                        children: [
                            {
                                tag: 'button',
                                id:  'testButton'
                            }
                        ]
                    }
                ]
            });

            return window.paypal.checkout.setup('merchantID', {

                button: 'testButton'

            }).then(() => {

                getElement('#testButton', testLink).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY&hash=${ hash }`);
                });
            });
        });

        it('should render a custom button into a link and click on another button in the link', () => {

            let token = generateECToken();
            let hash = uniqueID();

            let testForm = createElement({

                container: 'testContainer',

                tag:   'form',
                id:    'testForm',
                props: {
                    action: window.paypal.config.checkoutUrl
                },

                children: [
                    {
                        tag:   'a',
                        id:    'testLink',
                        props: {
                            href: `${ window.paypal.config.checkoutUrl }&token=${ token }#${ hash }`
                        },

                        children: [
                            {
                                tag:  'div',
                                id:   'testButton',
                                html: 'clickme'
                            }
                        ]
                    }
                ]
            });

            return window.paypal.checkout.setup('merchantID', {

                container: 'testLink'

            }).then(() => {

                getElement('#testButton', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY&hash=${ hash }`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a true condition', () => {

            let token = generateECToken();

            let testForm = createElement({
                tag:       'form',
                container: 'testContainer',
                id:        'testForm',
                props:     {
                    action: window.paypal.config.checkoutUrl
                },

                children: [
                    {
                        tag:   'input',
                        props: {
                            name:  'token',
                            value: token
                        }
                    }
                ]
            });

            return window.paypal.checkout.setup('merchantID', {

                container: 'testForm',

                condition() : boolean {
                    return true;
                }

            }).then(() => {

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a false condition', () => {

            let token = generateECToken();

            let testForm = createElement({
                tag:       'form',
                container: 'testContainer',
                id:        'testForm',
                props:     {
                    action: `#fullpageRedirectUrl?token=${ token }`
                }
            });

            testForm.addEventListener('submit', event => {
                // $FlowFixMe
                if (!testForm.target) {
                    event.preventDefault();
                    setTimeout(() => {
                        window.location = testForm.getAttribute('action');
                    });
                }
            });

            return window.paypal.checkout.setup('merchantID', {

                container: 'testForm',

                condition() : boolean {
                    return false;
                }

            }).then(() => {

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#fullpageRedirectUrl?token=${ token }`);
                });
            });
        });

        it('should render a button into a form container and click on the button, with a post bridge', () => {

            window.paypal.postRobot.CONFIG.ALLOW_POSTMESSAGE_POPUP = false;

            let token = generateECToken();

            let testForm = createElement({
                tag:       'form',
                container: 'testContainer',
                id:        'testForm',
                props:     {
                    action: window.paypal.config.checkoutUrl
                },

                children: [
                    {
                        tag:   'input',
                        props: {
                            name:  'token',
                            value: token
                        }
                    }
                ]
            });

            return window.paypal.checkout.setup('merchantID', {

                container: 'testForm'

            }).then(() => {

                getElement('button', testForm).click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });
    });
}
