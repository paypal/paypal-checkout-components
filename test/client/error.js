/* @flow */
/* eslint require-await: off */

import { setupButton } from '../../src';

import { createButtonHTML, getMockCheckoutInstance } from './mocks';

describe('error cases', () => {

    it('should call xprops.onError for any onApprove error', async () => {

        let onApprove;
        let onApproveCalled = false;
        let errorCalled = false;
        const error = new Error(`Something went wrong`);

        window.xprops.onError = (err) => {
            if (err !== error) {
                throw new Error(`Expected errors to match`);
            }

            errorCalled = true;
        };

        window.xprops.onApprove = async () => {
            onApproveCalled = true;
            throw error;
        };

        window.paypal.Checkout = (props) => {
            return {
                renderTo: async () => {
                    onApprove = props.onApprove.call(getMockCheckoutInstance(), { orderID: 'XXXXX', payerID: 'YYYYY' });
                }
            };
        };

        window.document.body.innerHTML = createButtonHTML();

        setupButton();

        window.document.querySelector('.paypal-button').click();

        await onApprove;

        if (!onApprove || !onApproveCalled) {
            throw new Error(`Expected onApprove to have been called`);
        }

        if (!errorCalled) {
            throw new Error(`Expected window.xprops.onError to be called`);
        }
    });

    it('should call xprops.onError for any onCancel error', async () => {

        let onCancel;
        let onCancelCalled = false;
        let errorCalled = false;
        const error = new Error(`Something went wrong`);

        window.xprops.onError = (err) => {
            if (err !== error) {
                throw new Error(`Expected errors to match -- got "${ err.message }", expected "${ error.message }"`);
            }

            errorCalled = true;
        };

        window.xprops.onCancel = () => {
            onCancelCalled = true;
            throw error;
        };

        window.paypal.Checkout = (props) => {
            return {
                renderTo: async () => {
                    onCancel = props.onCancel.call(getMockCheckoutInstance(), { payerID: 'YYYYYY' });
                }
            };
        };

        window.document.body.innerHTML = createButtonHTML();

        setupButton();

        window.document.querySelector('.paypal-button').click();

        await onCancel;

        if (!onCancel || !onCancelCalled) {
            throw new Error(`Expected onCancel to have been called`);
        }

        if (!errorCalled) {
            throw new Error(`Expected window.xprops.onError to be called`);
        }
    });
});
