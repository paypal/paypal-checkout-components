
import { setupButton } from '../../public/js/button/button';
import { createButtonHTML, getMockCheckoutInstance } from './mocks';

describe('error cases', () => {

    it('should error out on actions.payment.get without a paymentID', async () => {

        let onAuthorize;
        let onAuthorizeCalled = false;
    
        window.paypal.Checkout.renderTo = async (win, props) => {
            onAuthorize = props.onAuthorize;
        };

        window.xprops.onAuthorize = async (data, actions) => {

            let error;

            try {
                await actions.payment.get();
            } catch (err) {
                error = err;
            }
            
            if (!error) {
                throw new Error(`Expected actions.payment.get to throw an error in the absense of a payment id`);
            }

            onAuthorizeCalled = true;
        };
    
        window.document.body.innerHTML = createButtonHTML();
    
        setupButton();
    
        window.document.querySelector('.paypal-button').click();

        await onAuthorize.call(getMockCheckoutInstance(), {});
    
        if (!onAuthorizeCalled) {
            throw new Error(`Expected onAuthorize to be called`);
        }
    });

    it('should error out on actions.payment.execute without a paymentID', async () => {
    
        let onAuthorize;
        let onAuthorizeCalled = false;
    
        window.paypal.Checkout.renderTo = async (win, props) => {
            onAuthorize = props.onAuthorize;
        };

        window.xprops.onAuthorize = async (data, actions) => {

            let error;

            try {
                await actions.payment.execute();
            } catch (err) {
                error = err;
            }
            
            if (!error) {
                throw new Error(`Expected actions.payment.execute to throw an error in the absense of a payment id`);
            }

            onAuthorizeCalled = true;
        };
    
        window.document.body.innerHTML = createButtonHTML();
    
        setupButton();
    
        window.document.querySelector('.paypal-button').click();

        await onAuthorize.call(getMockCheckoutInstance(), {});
    
        if (!onAuthorizeCalled) {
            throw new Error(`Expected onAuthorize to be called`);
        }
    });

    it('should call xchild.error for any onAuthorize error', async () => {

        let onAuthorize;
        let onAuthorizeCalled = false;
        let errorCalled = false;
        let error = new Error(`Something went wrong`);

        window.xchild.error = (err) => {
            if (err !== error) {
                throw new Error(`Expected errors to match`);
            }

            errorCalled = true;
        };

        window.xprops.onAuthorize = async () => {
            onAuthorizeCalled = true;
            throw error;
        };

        window.paypal.Checkout.renderTo = async (win, props) => {
            onAuthorize = props.onAuthorize.call(getMockCheckoutInstance());
        };

        window.document.body.innerHTML = createButtonHTML();

        setupButton();

        window.document.querySelector('.paypal-button').click();

        await onAuthorize;

        if (!onAuthorize || !onAuthorizeCalled) {
            throw new Error(`Expected onAuthorize to have been called`);
        }

        if (!errorCalled) {
            throw new Error(`Expected window.xchild.error to be called`);
        }
    });

    it('should call xchild.error for any onCancel error', async () => {

        let onCancel;
        let onCancelCalled = false;
        let errorCalled = false;
        let error = new Error(`Something went wrong`);

        window.xchild.error = (err) => {
            if (err !== error) {
                throw new Error(`Expected errors to match -- got "${ err.message }", expected "${ error.message }"`);
            }

            errorCalled = true;
        };

        window.xprops.onCancel = async () => {
            onCancelCalled = true;
            throw error;
        };

        window.paypal.Checkout.renderTo = async (win, props) => {
            onCancel = props.onCancel.call(getMockCheckoutInstance(), {});
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