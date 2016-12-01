

import paypal from 'src/index';

import { generateECToken, createTestContainer, destroyTestContainer } from '../common';

for (let flow of [ 'popup', 'lightbox' ]) {

    describe(`paypal button component error cases on ${flow}`, () => {

        beforeEach(() => {
            createTestContainer();
            paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            paypal.Checkout.contexts.lightbox = false;
        });

        it('should render a button into a container and click on the button, then complete the payment and try to get data.payment', (done) => {

            return paypal.Button.render({

                payment() {
                    return generateECToken();
                },

                onAuthorize(data) {
                    try {
                        console.log(data.payment);
                    } catch (err) {
                        return done();
                    }

                    return done(new Error('Expected error to be triggered by referencing data.payment'));
                },

                onCancel() {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer').then(button => {

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });
    });
}
