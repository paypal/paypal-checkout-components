/* @flow */
/* eslint require-await: off, max-nested-callbacks: off */

import { wrapPromise } from '@krakenjs/belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import {
    mockAsyncProp,
    mockFunction,
    createButtonHTML,
    DEFAULT_FUNDING_ELIGIBILITY,
    clickButton,
    mockSetupButton,
    generateOrderID
} from './mocks';

describe('callback data cases', () => {
    it('should render a button, click the button, pass the selected funding to the createOrder data', async () => {
        return await wrapPromise(async ({ expect }) => {
            const orderID = generateOrderID();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async (data) => {
                if (data.paymentSource && data.paymentSource === 'venmo') {
                    return orderID;
                }

                throw new Error(`Expected paymentSource to be available in createOrder data`);
            }));

            const fundingEligibility = {
                venmo: {
                    eligible: true
                }
            };

            createButtonHTML({ fundingEligibility });

            await mockSetupButton({
                merchantID:         [ 'XYZ12345' ],
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.VENMO);
        });
    });

    it('should render a button, click the button, and pass the selected funding to the onApprove data', async () => {
        return await wrapPromise(async ({ expect }) => {
            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data) => {
                if (data.paymentSource && data.paymentSource === 'paypal') {
                    return;
                }

                throw new Error(`Expected paymentSource to be available in onApprove data`);
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID:         [ 'XYZ12345' ],
                fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY
            });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, click the button, and pass the selected funding to the createBillingAgreement data', async () => {
        return await wrapPromise(async ({ expect }) => {
            const billingToken = 'BA-123';

            delete window.xprops.createOrder;

            window.xprops.vault = true;
            window.xprops.createBillingAgreement = mockAsyncProp(expect('createBillingAgreement', async (data) => {
                if (data.paymentSource && data.paymentSource === 'paypal') {
                    return billingToken;
                }

                throw new Error(`Expected paymentSource to be available in createBillingAgreement data`);
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID:         [ 'XYZ12345' ],
                fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY
            });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, click the button, and pass the selected funding to the createSubscription data, and render checkout', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            const cartID = 'CARTIDOFSUBSCRIPTIONS';
            const subscriptionID = 'I-SUBSCRIPTIONID';
            const payerID = 'YYYYYYYYYY';

            delete window.xprops.createOrder;
            window.xprops.vault = true;

            window.xprops.createSubscription = mockAsyncProp(expect('createSubscription', async (data) => {
                if (data.paymentSource && data.paymentSource === 'paypal') {
                    return subscriptionID;
                }

                throw new Error(`Expected paymentSource to be available in createSubscription data`);

            }));

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.subscriptionID !== subscriptionID) {
                    throw new Error(`Expected subscriptionID to be ${ subscriptionID }, got ${ data.subscriptionID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID, subscriptionID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== cartID) {
                            throw new Error(`Expected cartID to be ${ cartID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID:         [ 'XYZ12345' ],
                fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY
            });

            await clickButton(FUNDING.PAYPAL);
        });
    });
});
