/* @flow */

import { assert } from 'chai';

import paypal from 'src/index';
import { config } from 'src/config';

import { onHashChange, generateECToken, createTestContainer, destroyTestContainer, getElement, setupBridge, destroyBridge, uniqueID, CHILD_REDIRECT_URI } from '../common';

for (let flow of [ 'popup', 'lightbox' ]) {

    describe(`paypal legacy bridge checkout setup/startflow on ${flow}`, () => {

        beforeEach(() => {
            createTestContainer();
            paypal.Checkout.contexts.lightbox = (flow === 'lightbox');

            setupBridge();
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            paypal.Checkout.contexts.lightbox = false;

            destroyBridge();
        });

        it('should render a button into a container and click on the button, then call startFlow', () => {

            let token = generateECToken();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.startFlow(token);
                }

            }).then(() => {

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call startFlow with a cancel', () => {

            setupBridge({ isAuthorize: false });

            let token = generateECToken();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.startFlow(token);
                }

            }).then(() => {

                paypal.Checkout.props.testAction.def = () => 'cancel';

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    paypal.Checkout.props.testAction.def = () => 'checkout';
                    assert.equal(urlHash, `#cancel?token=${token}`);
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

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY&hash=${hash}`);
                });
            });
        });

        it('should render a button into a container and click on the button, then call startFlow with a url with no token', () => {

            let hash = uniqueID();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.startFlow(`${CHILD_REDIRECT_URI}#${hash}`);
                }

            }).then(() => {

                getElement('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=EC-XXXXXXXXXXXXXXXXX&PayerID=YYYYYYYYYYYYY&hash=${hash}`);
                });
            });
        });
    });
}
