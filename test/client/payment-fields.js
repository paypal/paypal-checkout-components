/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise } from '@krakenjs/belter/src';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import { mockSetupButton, generateOrderID, mockAsyncProp, createButtonHTML, mockFunction, clickButton } from './mocks';

describe('payment field cases', () => {
    it('should render a button, click the button, and render payment-fields iframe', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            const orderID = generateOrderID();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = avoid('onApprove');

            mockFunction(window.paypal, 'PaymentFields', expect('PaymentFields', ({ original: PaymentFieldsOriginal, args: [ props ] }) => {
                const onContinueData = {
                    payment_source: {
                        'eps': {
                            country_code: 'AT',
                            name: 'Jane Doe',
                        },
                    }
                }

                mockFunction(props, 'onContinue', expect('onContinue', ({ original: onContinueOriginal }) => {
                    return onContinueOriginal({ ...onContinueData });
                }));

                const paymentFieldsInstance = PaymentFieldsOriginal(props);

                mockFunction(paymentFieldsInstance, 'render', expect('render', async ({ original: renderToOriginal, args }) => {
                    return renderToOriginal(...args);
                }));

                return paymentFieldsInstance;
            }));

            const fundingEligibility = {
                [ FUNDING.PAYPAL ]: {
                    eligible: true
                },
                [ FUNDING.EPS]: {
                    eligible: true
                }
            };

            createButtonHTML({ fundingEligibility });

            await mockSetupButton({
                merchantID: [ 'XYZ12345' ],
                fundingEligibility,
                buyerCountry: 'AT',
                eligibility: {
                    inlinePaymentFields: {
                        inlineEligibleAPMs : ['eps'],
                        isInlineEnabled : true
                    }
                }
            });

            await clickButton(FUNDING.EPS);
        });
    });

    it('should render a button, click the button, and should NOT render payment-fields iframe instead render checkout with eps funding source', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            const orderID = generateOrderID();
            const payerID = 'AAABBBCCC';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            const fundingEligibility = {
                [ FUNDING.PAYPAL ]: {
                    eligible: true
                },
                [ FUNDING.EPS]: {
                    eligible: true
                }
            };

            createButtonHTML({ fundingEligibility });

            await mockSetupButton({
                merchantID: [ 'XYZ12345' ],
                fundingEligibility,
                buyerCountry: 'AT',
                eligibility: {
                    inlinePaymentFields: {
                        inlineEligibleAPMs : [],
                        isInlineEnabled : false
                    }
                }
            });

            await clickButton(FUNDING.EPS);
        });
    });
});