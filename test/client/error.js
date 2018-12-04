/* @flow */
/* eslint require-await: off */

import { setupButton } from '../../src';

import { createButtonHTML, getMockCheckoutInstance } from './mocks';

describe('error cases', () => {

    it('should call xchild.error for any onApprove error', async () => {

        let onApprove;
        let onApproveCalled = false;
        let errorCalled = false;
        const error = new Error(`Something went wrong`);

        window.xchild.error = (err) => {
            if (err !== error) {
                throw new Error(`Expected errors to match`);
            }

            errorCalled = true;
        };

        window.xprops.onApprove = async () => {
            onApproveCalled = true;
            throw error;
        };

        window.paypal.Checkout.renderTo = async (win, props) => {
            onApprove = props.onApprove.call(getMockCheckoutInstance(), { orderID: 'XXXXX', payerID: 'YYYYY' });
        };

        window.document.body.innerHTML = createButtonHTML();

        setupButton();

        window.document.querySelector('.paypal-button').click();

        await onApprove;

        if (!onApprove || !onApproveCalled) {
            throw new Error(`Expected onApprove to have been called`);
        }

        if (!errorCalled) {
            throw new Error(`Expected window.xchild.error to be called`);
        }
    });

    it('should call xchild.error for any onCancel error', async () => {

        let onCancel;
        let onCancelCalled = false;
        let errorCalled = false;
        const error = new Error(`Something went wrong`);

        window.xchild.error = (err) => {
            if (err !== error) {
                throw new Error(`Expected errors to match -- got "${ err.message }", expected "${ error.message }"`);
            }

            errorCalled = true;
        };

        window.xprops.onCancel = () => {
            onCancelCalled = true;
            throw error;
        };

        window.paypal.Checkout.renderTo = async (win, props) => {
            onCancel = props.onCancel.call(getMockCheckoutInstance(), { payerID: 'YYYYYY' });
        };

        window.document.body.innerHTML = createButtonHTML();

        setupButton();

        window.document.querySelector('.paypal-button').click();

        await onCancel;

        if (!onCancel || !onCancelCalled) {
            throw new Error(`Expected onCancel to have been called`);
        }

        if (!errorCalled) {
            throw new Error(`Expected window.xchild.error to be called`);
        }
    });
});
