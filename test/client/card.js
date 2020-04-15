/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING, CARD } from '@paypal/sdk-constants/src';

import { mockSetupButton, generateOrderID, mockAsyncProp, createButtonHTML, mockFunction, clickButton } from './mocks';

describe('card field cases', () => {

    it('should render a button with createOrder, click the button, and render checkout', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.xprops.enableStandardCardFields = true;

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

            mockFunction(window.paypal, 'CardFields', expect('CardFields', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'render', expect('remder', async ({ original: renderToOriginal, args }) => {
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
                [ FUNDING.CARD]: {
                    eligible: true,
                    vendors:  {
                        [ CARD.VISA ]: {
                            eligible: true
                        },
                        [ CARD.AMEX ]: {
                            eligible: true
                        },
                        [ CARD.MASTERCARD ]: {
                            eligible: true
                        }
                    }
                }
            };

            createButtonHTML({ fundingEligibility });

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(FUNDING.CARD);
        });
    });
});
