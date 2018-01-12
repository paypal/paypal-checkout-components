
import { FUNDING } from 'paypal-checkout/dist/checkout.button.render';

import { setupButton } from '../../public/js/button/button';

import { createButtonHTML, getPaymentApiMock, executePaymentApiMock,
    getMockCheckoutInstance, getLocaleApiMock, getFundingApiMock,
    getOrderApiMock, captureOrderApiMock } from './mocks';
import { triggerKeyPress } from './util';

describe('happy cases', () => {

    it('should set up locale correctly', async () => {

        let country = 'FR';
        let lang = 'fr';

        let localeApiMock = getLocaleApiMock({
            data: {
                ack: 'success',
                data: {
                    country,
                    lang
                }
            }
        });

        localeApiMock.expectCalls();

        await setupButton();

        localeApiMock.done();

        if (window.paypal.config.locale.country !== country) {
            throw new Error(`Expected paypal.config.locale.country to be ${ country }, got ${ window.paypal.config.country }`);
        }

        if (window.paypal.config.locale.lang !== lang) {
            throw new Error(`Expected paypal.config.locale.lang to be ${ lang }, got ${ window.paypal.config.lang }`);
        }
    });

    it('should call funding.remember for remembered funding sources', async () => {

        let remembered = [ FUNDING.VENMO, FUNDING.PAYPAL, FUNDING.IDEAL ];
        let sentRemembered;

        let fundingApiMock = getFundingApiMock({
            data: {
                ack: 'success',
                data: {
                    eligible: remembered
                }
            }
        });

        fundingApiMock.expectCalls();

        window.xprops.funding.remember = (sources) => {
            sentRemembered = sources;
        };

        await setupButton();

        fundingApiMock.done();

        if (!sentRemembered) {
            throw new Error(`Expected remembered funding sources to be sent`);
        }

        if (sentRemembered.length !== remembered.length) {
            throw new Error(`Expected ${ remembered.length } funding sources to be sent, got ${ sentRemembered.length }`);
        }

        for (let i = 0; i < remembered.length; i++) {
            if (sentRemembered[i] !== remembered[i]) {
                throw new Error(`Expected remembered funding source ${ i } to be ${ remembered[i] }, got ${ sentRemembered[i] }`);
            }
        }
    });

    it('should render a button, click the button, and render checkout', async () => {
    
        let renderToCalled = false;

        window.paypal.Checkout.renderTo = () => {
            renderToCalled = true;
        };

        window.document.body.innerHTML = createButtonHTML();
    
        await setupButton();
    
        window.document.querySelector('.paypal-button').click();
    
        if (!renderToCalled) {
            throw new Error(`Expected renderTo to be called`);
        }
    });
    
    it('should render a button, press enter on the button, and render checkout', async () => {
    
        let renderToCalled = false;
    
        window.paypal.Checkout.renderTo = () => {
            renderToCalled = true;
        };
    
        window.document.body.innerHTML = createButtonHTML();
    
        await setupButton();
    
        triggerKeyPress(window.document.querySelector('.paypal-button'), 13);
    
        if (!renderToCalled) {
            throw new Error(`Expected renderTo to be called`);
        }
    });
    
    it('should render a button, click the button, and call onClick', async () => {
    
        let onClickCalled = false;
    
        window.xprops.onClick = () => {
            onClickCalled = true;
        };
    
        window.document.body.innerHTML = createButtonHTML();
    
        await setupButton();
    
        window.document.querySelector('.paypal-button').click();
    
        if (!onClickCalled) {
            throw new Error(`Expected onClick to be called`);
        }
    });
    
    it('should render a button, press enter on the button, and call onClick', async () => {
        
        let onClickCalled = false;
    
        window.xprops.onClick = () => {
            onClickCalled = true;
        };
    
        window.document.body.innerHTML = createButtonHTML();
    
        await setupButton();
    
        triggerKeyPress(window.document.querySelector('.paypal-button'), 13);
    
        if (!onClickCalled) {
            throw new Error(`Expected onClick to be called`);
        }
    });

    it('should render a button, click the button, and render checkout, then pass onAuthorize callback to the parent', async () => {
    
        let onAuthorize;
        let onAuthorizeCalled = false;

        window.xprops.onAuthorize = async () => {
            onAuthorizeCalled = true;
        };

        window.paypal.Checkout.renderTo = async (win, props) => {
            onAuthorize = props.onAuthorize.call(getMockCheckoutInstance());
        };
    
        window.document.body.innerHTML = createButtonHTML();
    
        await setupButton();
    
        window.document.querySelector('.paypal-button').click();

        await onAuthorize;

        if (!onAuthorize || !onAuthorizeCalled) {
            throw new Error(`Expected onAuthorize to have been called`);
        }
    });

    it('should render a button, click the button, and render checkout, then pass onCancel callback to the parent', async () => {

        let onCancel;
        let onCancelCalled = false;

        window.xprops.onCancel = async () => {
            onCancelCalled = true;
        };

        window.paypal.Checkout.renderTo = async (win, props) => {
            onCancel = props.onCancel.call(getMockCheckoutInstance(), {});
        };

        window.document.body.innerHTML = createButtonHTML();

        await setupButton();

        window.document.querySelector('.paypal-button').click();

        await onCancel;

        if (!onCancel || !onCancelCalled) {
            throw new Error(`Expected onCancel to have been called`);
        }
    });

    it('should render a button, click the button, and render checkout, then pass onAuthorize callback to the parent with the correct data', async () => {
    
        let paymentID = 'PAY-XXXXXXX';
        let payerID = 'YYYYYYYYYY';

        let onAuthorize;
        let onAuthorizeCalled = false;

        window.xprops.onAuthorize = async (data, actions) => {

            if (data.paymentID !== paymentID) {
                throw new Error(`Expected data.paymentID to be ${ paymentID }, got ${ data.paymentID }`);
            }

            if (data.payerID !== payerID) {
                throw new Error(`Expected data.paymentID to be ${ paymentID }, got ${ data.paymentID }`);
            }

            onAuthorizeCalled = true;
        };
    
        window.paypal.Checkout.renderTo = async (win, props) => {
            onAuthorize = props.onAuthorize.call(getMockCheckoutInstance(), { paymentID, payerID });
        };
    
        window.document.body.innerHTML = createButtonHTML();
    
        await setupButton();
    
        window.document.querySelector('.paypal-button').click();

        await onAuthorize;

        if (!onAuthorize || !onAuthorizeCalled) {
            throw new Error(`Expected onAuthorize to have been called`);
        }
    });

    it('should render a button, click the button, and render checkout, then pass onAuthorize callback to the parent with actions.payment.get', async () => {
    
        let paymentID = 'PAY-XXXXXXX';
        let payerID = 'YYYYYYYYYY';

        let onAuthorize;
        let onAuthorizeCalled = false;

        window.xprops.onAuthorize = async (data, actions) => {

            let getPaymentMock = getPaymentApiMock();
            getPaymentMock.expectCalls();
            await actions.payment.get();
            getPaymentMock.done();

            onAuthorizeCalled = true;
        };
    
        window.paypal.Checkout.renderTo = async (win, props) => {
            onAuthorize = props.onAuthorize.call(getMockCheckoutInstance(), { paymentID, payerID });
        };
    
        window.document.body.innerHTML = createButtonHTML();
    
        await setupButton();
    
        window.document.querySelector('.paypal-button').click();

        await onAuthorize;

        if (!onAuthorize || !onAuthorizeCalled) {
            throw new Error(`Expected onAuthorize to have been called`);
        }
    });

    it('should render a button, click the button, and render checkout, then pass onAuthorize callback to the parent with actions.payment.execute', async () => {
    
        let paymentID = 'PAY-XXXXXXX';
        let payerID = 'YYYYYYYYYY';

        let onAuthorize;
        let onAuthorizeCalled = false;

        window.xprops.onAuthorize = async (data, actions) => {

            let executePaymentMock = executePaymentApiMock();
            executePaymentMock.expectCalls();
            await actions.payment.execute();
            executePaymentMock.done();

            onAuthorizeCalled = true;
        };
    
        window.paypal.Checkout.renderTo = async (win, props) => {
            onAuthorize = props.onAuthorize.call(getMockCheckoutInstance(), { paymentID, payerID });
        };
    
        window.document.body.innerHTML = createButtonHTML();
    
        await setupButton();
    
        window.document.querySelector('.paypal-button').click();

        await onAuthorize;

        if (!onAuthorize || !onAuthorizeCalled) {
            throw new Error(`Expected onAuthorize to have been called`);
        }
    });

    it('should render a button, click the button, and render checkout, then pass onAuthorize callback to the parent with actions.restart', async () => {
    
        let paymentID = 'PAY-XXXXXXX';
        let payerID = 'YYYYYYYYYY';

        let onAuthorize;
        let onAuthorizeCalled = false;
        let didRestart = false;

        window.xprops.onAuthorize = async (data, actions) => {
            if (didRestart) {
                onAuthorizeCalled = true;
            } else {
                didRestart = true;
                onAuthorize = null;
                actions.restart();
            }
        };
    
        window.paypal.Checkout.renderTo = async (win, props) => {
            onAuthorize = props.onAuthorize.call(getMockCheckoutInstance(), { paymentID, payerID });
        };
    
        window.document.body.innerHTML = createButtonHTML();
    
        await setupButton();
    
        window.document.querySelector('.paypal-button').click();

        await onAuthorize;

        if (!onAuthorize || !onAuthorizeCalled) {
            throw new Error(`Expected onAuthorize to have been called`);
        }
    });

    it('should render a button, click the button, and render checkout, then pass onAuthorize callback to the parent with automatic restart on CC_PROCESSOR_DECLINED', async () => {

        let paymentID = 'PAY-XXXXXXX';
        let payerID = 'YYYYYYYYYY';

        let onAuthorize;
        let onAuthorizeCalled = false;
        let didRestart = false;

        window.xprops.onAuthorize = async (data, actions) => {
            if (didRestart) {
                onAuthorizeCalled = true;
            } else {
                didRestart = true;
                onAuthorize = null;

                let executePaymentMock = executePaymentApiMock({
                    data: {
                        ack: 'contingency',
                        contingency: 'CC_PROCESSOR_DECLINED'
                    }
                });

                executePaymentMock.expectCalls();
                actions.payment.execute();
                executePaymentMock.done();
            }
        };

        window.paypal.Checkout.renderTo = async (win, props) => {
            onAuthorize = props.onAuthorize.call(getMockCheckoutInstance(), { paymentID, payerID });
        };

        window.document.body.innerHTML = createButtonHTML();

        await setupButton();

        window.document.querySelector('.paypal-button').click();

        await onAuthorize;

        if (!onAuthorize || !onAuthorizeCalled) {
            throw new Error(`Expected onAuthorize to have been called`);
        }
    });

    it('should render a button, click the button, and render checkout, then pass onAuthorize callback to the parent with automatic restart on INSTRUMENT_DECLINED', async () => {

        let paymentID = 'PAY-XXXXXXX';
        let payerID = 'YYYYYYYYYY';

        let onAuthorize;
        let onAuthorizeCalled = false;
        let didRestart = false;

        window.xprops.onAuthorize = async (data, actions) => {
            if (didRestart) {
                onAuthorizeCalled = true;
            } else {
                didRestart = true;
                onAuthorize = null;

                let executePaymentMock = executePaymentApiMock({
                    data: {
                        ack: 'contingency',
                        contingency: 'INSTRUMENT_DECLINED'
                    }
                });

                executePaymentMock.expectCalls();
                actions.payment.execute();
                executePaymentMock.done();
            }
        };

        window.paypal.Checkout.renderTo = async (win, props) => {
            onAuthorize = props.onAuthorize.call(getMockCheckoutInstance(), { paymentID, payerID });
        };

        window.document.body.innerHTML = createButtonHTML();

        await setupButton();

        window.document.querySelector('.paypal-button').click();

        await onAuthorize;

        if (!onAuthorize || !onAuthorizeCalled) {
            throw new Error(`Expected onAuthorize to have been called`);
        }
    });

    it('should render a button, click the button, and render checkout, then pass onAuthorize callback to the parent with actions.order.get', async () => {

        let orderID = 'XXXXXXXXXX';
        let payerID = 'YYYYYYYYYY';

        let onAuthorize;
        let onAuthorizeCalled = false;

        window.xprops.onAuthorize = async (data, actions) => {

            let getOrderMock = getOrderApiMock();
            getOrderMock.expectCalls();
            await actions.order.get();
            getOrderMock.done();

            onAuthorizeCalled = true;
        };

        window.paypal.Checkout.renderTo = async (win, props) => {
            onAuthorize = props.onAuthorize.call(getMockCheckoutInstance(), { orderID, payerID });
        };

        window.document.body.innerHTML = createButtonHTML();

        await setupButton();

        window.document.querySelector('.paypal-button').click();

        await onAuthorize;

        if (!onAuthorize || !onAuthorizeCalled) {
            throw new Error(`Expected onAuthorize to have been called`);
        }
    });

    it('should render a button, click the button, and render checkout, then pass onAuthorize callback to the parent with actions.order.capture', async () => {

        let orderID = 'XXXXXXXXXX';
        let payerID = 'YYYYYYYYYY';

        let onAuthorize;
        let onAuthorizeCalled = false;

        window.xprops.onAuthorize = async (data, actions) => {

            let captureOrderMock = captureOrderApiMock();
            captureOrderMock.expectCalls();
            await actions.order.capture();
            captureOrderMock.done();

            onAuthorizeCalled = true;
        };

        window.paypal.Checkout.renderTo = async (win, props) => {
            onAuthorize = props.onAuthorize.call(getMockCheckoutInstance(), { orderID, payerID });
        };

        window.document.body.innerHTML = createButtonHTML();

        await setupButton();

        window.document.querySelector('.paypal-button').click();

        await onAuthorize;

        if (!onAuthorize || !onAuthorizeCalled) {
            throw new Error(`Expected onAuthorize to have been called`);
        }
    });

    it('should render a button, click the button, and render checkout, then pass onAuthorize callback to the parent with actions.order.capture call and automatic restart on CC_PROCESSOR_DECLINED', async () => {

        let orderID = 'XXXXXXXXXX';
        let payerID = 'YYYYYYYYYY';

        let onAuthorize;
        let onAuthorizeCalled = false;
        let didRestart = false;

        window.xprops.onAuthorize = async (data, actions) => {
            if (didRestart) {
                onAuthorizeCalled = true;
            } else {
                didRestart = true;
                onAuthorize = null;

                let captureOrderMock = captureOrderApiMock({
                    data: {
                        ack: 'contingency',
                        contingency: 'CC_PROCESSOR_DECLINED'
                    }
                });

                captureOrderMock.expectCalls();
                actions.order.capture();
                captureOrderMock.done();
            }
        };

        window.paypal.Checkout.renderTo = async (win, props) => {
            onAuthorize = props.onAuthorize.call(getMockCheckoutInstance(), { orderID, payerID });
        };

        window.document.body.innerHTML = createButtonHTML();

        await setupButton();

        window.document.querySelector('.paypal-button').click();

        await onAuthorize;

        if (!onAuthorize || !onAuthorizeCalled) {
            throw new Error(`Expected onAuthorize to have been called`);
        }
    });

    it('should render a button, click the button, and render checkout, then pass onAuthorize callback to the parent with actions.order.capture call and automatic restart on INSTRUMENT_DECLINED', async () => {

        let orderID = 'XXXXXXXXXX';
        let payerID = 'YYYYYYYYYY';

        let onAuthorize;
        let onAuthorizeCalled = false;
        let didRestart = false;

        window.xprops.onAuthorize = async (data, actions) => {
            if (didRestart) {
                onAuthorizeCalled = true;
            } else {
                didRestart = true;
                onAuthorize = null;

                let captureOrderMock = captureOrderApiMock({
                    data: {
                        ack: 'contingency',
                        contingency: 'INSTRUMENT_DECLINED'
                    }
                });

                captureOrderMock.expectCalls();
                actions.order.capture();
                captureOrderMock.done();
            }
        };

        window.paypal.Checkout.renderTo = async (win, props) => {
            onAuthorize = props.onAuthorize.call(getMockCheckoutInstance(), { orderID, payerID });
        };

        window.document.body.innerHTML = createButtonHTML();

        await setupButton();

        window.document.querySelector('.paypal-button').click();

        await onAuthorize;

        if (!onAuthorize || !onAuthorizeCalled) {
            throw new Error(`Expected onAuthorize to have been called`);
        }
    });
});