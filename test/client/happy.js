/* @flow */
/* eslint require-await: off */

import { setupButton } from '../../src';

import { createButtonHTML, getMockCheckoutInstance,
    getOrderApiMock, captureOrderApiMock, authorizeOrderApiMock } from './mocks';
import { triggerKeyPress } from './util';

describe('happy cases', () => {

    it('should render a button, click the button, and render checkout', async () => {
    
        let renderToCalled = false;

        window.paypal.Checkout.renderTo = async () => {
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
    
        window.paypal.Checkout.renderTo = async () => {
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
    
        window.xprops.onClick = async () => {
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
    
        window.xprops.onClick = async () => {
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
            onAuthorize = props.onAuthorize.call(getMockCheckoutInstance(), { orderID: 'xxx', payerID: 'yyy' });
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

        window.xprops.onCancel = () => {
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
    
        let orderID = 'XXXXXXXXXX';
        let payerID = 'YYYYYYYYYY';

        let onAuthorize;
        let onAuthorizeCalled = false;

        window.xprops.onAuthorize = async (data) => {

            if (data.orderID !== orderID) {
                throw new Error(`Expected data.paymentID to be ${ orderID }, got ${ data.orderID }`);
            }

            if (data.orderID !== orderID) {
                throw new Error(`Expected data.paymentID to be ${ orderID }, got ${ data.orderID }`);
            }

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

    it('should render a button, click the button, and render checkout, then pass onAuthorize callback to the parent with actions.order.authorize', async () => {

        let orderID = 'XXXXXXXXXX';
        let payerID = 'YYYYYYYYYY';

        let onAuthorize;
        let onAuthorizeCalled = false;

        window.xprops.onAuthorize = async (data, actions) => {

            let authorizeOrderMock = authorizeOrderApiMock();
            authorizeOrderMock.expectCalls();
            await actions.order.authorize();
            authorizeOrderMock.done();

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
                        ack:         'contingency',
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
                        ack:         'contingency',
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

it('should render a button, click the button, and render checkout, then pass onAuthorize callback to the parent with actions.order.authorize call and automatic restart on CC_PROCESSOR_DECLINED', async () => {

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

            let authorizeOrderMock = authorizeOrderApiMock({
                data: {
                    ack:         'contingency',
                    contingency: 'CC_PROCESSOR_DECLINED'
                }
            });

            authorizeOrderMock.expectCalls();
            actions.order.authorize();
            authorizeOrderMock.done();
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
