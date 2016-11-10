
import paypal from 'src/index';

import { onHashChange, uniqueID, generateECToken, CHILD_URI, createElement, createTestContainer, destroyTestContainer } from './common';

for (let { name, options } of [ { name: 'lightbox', options: { lightbox: true } }, { name: 'popup', options: { lightbox: false } } ]) {

    describe(`paypal legacy checkout flow with hijack on ${name}`, () => {

        beforeEach(() => {
            createTestContainer();
            paypal.Checkout.contexts.lightbox = options.lightbox;
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
                    action: CHILD_URI
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

                testForm.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
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
                    href: `${CHILD_URI}?token=${token}#${hash}`
                }
            });

            return paypal.checkout.setup('merchantID', {

                container: 'testLink'

            }).then(() => {

                testLink.querySelector('button').click();

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
                    action: CHILD_URI
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
                    href: `${CHILD_URI}?token=${token}#${hash}`
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
                    href: `${CHILD_URI}?token=${token}#${hash}`
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

                testLink.querySelector('#testButton').click();

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
                    href: `${CHILD_URI}?token=${token}#${hash}`
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

                testLink.querySelector('#testButton').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY&hash=${hash}`);
                });
            });
        });
    });
}
