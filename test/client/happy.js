/* @flow */
/* eslint require-await: off, max-lines: off */

import { wrapPromise } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { setupButton } from '../../src';

import { createButtonHTML, getMockCheckoutInstance,
    getOrderApiMock, captureOrderApiMock, authorizeOrderApiMock, patchOrderApiMock } from './mocks';
import { triggerKeyPress } from './util';

describe('happy cases', () => {

    it('should render a button with createOrder, click the button, and render checkout', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = 'XXXXXXXXXX';
            const payerID = 'YYYYYYYYYY';

            window.xprops.createOrder = expect('createOrder', async () => {
                return orderID;
            });

            window.xprops.onApprove = expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            });

            window.paypal.Checkout = (props) => {
                return {
                    renderTo: expect('renderTo', async () => {
                        // eslint-disable-next-line max-nested-callbacks
                        return props.createOrder().then(id => {
                            if (id !== orderID) {
                                throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                            }

                            return props.onApprove({ orderID, payerID }, {});
                        });
                    })
                };
            };

            window.document.body.innerHTML = createButtonHTML();

            await setupButton();

            window.document.querySelector('.paypal-button').click();
        });
    });

    it('should render a button with createBillingAgreement, click the button, and render checkout', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = 'ABCDEFG12345';
            const billingToken = 'BA-ZZZZZZZZZZZ';
            const payerID = 'YYYYYYYYYY';

            window.xprops.createOrder = avoid('createOrder');

            window.xprops.createBillingAgreement = expect('createBillingAgreement', async () => {
                return billingToken;
            });

            window.xprops.onApprove = expect('onApprove', async (data) => {
                if (data.billingToken !== billingToken) {
                    throw new Error(`Expected billingToken to be ${ billingToken }, got ${ data.billingToken }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            });

            window.paypal.Checkout = (props) => {
                return {
                    renderTo: expect('renderTo', async () => {
                        return props.createOrder().then(id => {
                            if (id !== orderID) {
                                throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                            }

                            return props.onApprove({ billingToken, payerID }, {});
                        });
                    })
                };
            };

            window.document.body.innerHTML = createButtonHTML();

            await setupButton();

            window.document.querySelector('.paypal-button').click();
        });
    });
    
    it('should render a button, press enter on the button, and render checkout', async () => {
    
        let renderToCalled = false;
    
        window.paypal.Checkout = () => {
            return {
                renderTo: async () => {
                    renderToCalled = true;
                }
            };
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

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent', async () => {

        const orderID = 'XXXXXX';
        const payerID = 'YYYYYY';
    
        let onApprove;
        let onApproveCalled = false;

        window.xprops.onApprove = async (data) => {
            if (data.orderID !== orderID) {
                throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
            }

            if (data.payerID !== payerID) {
                throw new Error(`Expected orderID to be ${ payerID }, got ${ data.payerID }`);
            }

            onApproveCalled = true;
        };

        window.paypal.Checkout = (props) => {
            return {
                renderTo: async () => {
                    onApprove = props.onApprove.call(getMockCheckoutInstance(), { orderID, payerID });
                }
            };
        };
    
        window.document.body.innerHTML = createButtonHTML();
    
        await setupButton();
    
        window.document.querySelector('.paypal-button').click();

        await onApprove;

        if (!onApprove || !onApproveCalled) {
            throw new Error(`Expected onApprove to have been called`);
        }
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with a paymentID', async () => {

        const orderID = 'XXXXXX';
        const payerID = 'YYYYYY';
        const paymentID = 'ZZZZZZ';

        let onApprove;
        let onApproveCalled = false;

        window.xprops.onApprove = async (data) => {
            if (data.paymentID !== paymentID) {
                throw new Error(`Expected paymentID to be ${ paymentID }, got ${ data.paymentID }`);
            }

            onApproveCalled = true;
        };

        window.paypal.Checkout = (props) => {
            return {
                renderTo: async () => {
                    onApprove = props.onApprove.call(getMockCheckoutInstance(), { orderID, payerID, paymentID });
                }
            };
        };

        window.document.body.innerHTML = createButtonHTML();

        await setupButton();

        window.document.querySelector('.paypal-button').click();

        await onApprove;

        if (!onApprove || !onApproveCalled) {
            throw new Error(`Expected onApprove to have been called`);
        }
    });

    it('should render a button, click the button, and render checkout, then pass onCancel callback to the parent', async () => {

        let onCancel;
        let onCancelCalled = false;

        window.xprops.onCancel = () => {
            onCancelCalled = true;
        };

        window.paypal.Checkout = (props) => {
            return {
                renderTo: async () => {
                    onCancel = props.onCancel.call(getMockCheckoutInstance(), {});
                }
            };
        };

        window.document.body.innerHTML = createButtonHTML();

        await setupButton();

        window.document.querySelector('.paypal-button').click();

        await onCancel;

        if (!onCancel || !onCancelCalled) {
            throw new Error(`Expected onCancel to have been called`);
        }
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with the correct data', async () => {
    
        const orderID = 'XXXXXXXXXX';
        const payerID = 'YYYYYYYYYY';

        let onApprove;
        let onApproveCalled = false;

        window.xprops.onApprove = async (data) => {

            if (data.orderID !== orderID) {
                throw new Error(`Expected data.orderID to be ${ orderID }, got ${ data.orderID }`);
            }

            if (data.orderID !== orderID) {
                throw new Error(`Expected data.orderID to be ${ orderID }, got ${ data.orderID }`);
            }

            onApproveCalled = true;
        };

        window.paypal.Checkout = (props) => {
            return {
                renderTo: async () => {
                    onApprove = props.onApprove.call(getMockCheckoutInstance(), { orderID, payerID });
                }
            };
        };
    
        window.document.body.innerHTML = createButtonHTML();
    
        await setupButton();
    
        window.document.querySelector('.paypal-button').click();

        await onApprove;

        if (!onApprove || !onApproveCalled) {
            throw new Error(`Expected onApprove to have been called`);
        }
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.restart', async () => {
    
        const orderID = 'XXXXXXX';
        const payerID = 'YYYYYYYYYY';

        let onApprove;
        let onApproveCalled = false;
        let didRestart = false;

        window.xprops.onApprove = async (data, actions) => {
            if (didRestart) {
                onApproveCalled = true;
            } else {
                didRestart = true;
                onApprove = null;
                actions.restart();
            }
        };

        window.paypal.Checkout = (props) => {
            return {
                renderTo: async () => {
                    onApprove = props.onApprove.call(getMockCheckoutInstance(), { orderID, payerID });
                },
                close: () => {
                    return ZalgoPromise.resolve();
                }
            };
        };
    
        window.document.body.innerHTML = createButtonHTML();
    
        await setupButton();
    
        window.document.querySelector('.paypal-button').click();

        await onApprove;

        if (!onApprove || !onApproveCalled) {
            throw new Error(`Expected onApprove to have been called`);
        }
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.get', async () => {

        const orderID = 'XXXXXXXXXX';
        const payerID = 'YYYYYYYYYY';

        let onApprove;
        let onApproveCalled = false;

        window.xprops.onApprove = async (data, actions) => {

            const getOrderMock = getOrderApiMock();
            getOrderMock.expectCalls();
            await actions.order.get();
            getOrderMock.done();

            onApproveCalled = true;
        };

        window.paypal.Checkout = (props) => {
            return {
                renderTo: async () => {
                    onApprove = props.onApprove.call(getMockCheckoutInstance(), { orderID, payerID });
                }
            };
        };

        window.document.body.innerHTML = createButtonHTML();

        await setupButton();

        window.document.querySelector('.paypal-button').click();

        await onApprove;

        if (!onApprove || !onApproveCalled) {
            throw new Error(`Expected onApprove to have been called`);
        }
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.capture', async () => {

        const orderID = 'XXXXXXXXXX';
        const payerID = 'YYYYYYYYYY';

        let onApprove;
        let onApproveCalled = false;

        window.xprops.onApprove = async (data, actions) => {

            const captureOrderMock = captureOrderApiMock();
            captureOrderMock.expectCalls();
            await actions.order.capture();
            captureOrderMock.done();

            onApproveCalled = true;
        };

        window.paypal.Checkout = (props) => {
            return {
                renderTo: async () => {
                    onApprove = props.onApprove.call(getMockCheckoutInstance(), { orderID, payerID });
                }
            };
        };

        window.document.body.innerHTML = createButtonHTML();

        await setupButton();

        window.document.querySelector('.paypal-button').click();

        await onApprove;

        if (!onApprove || !onApproveCalled) {
            throw new Error(`Expected onApprove to have been called`);
        }
    });

    it('should render a button, click the button, and render checkout, then pass onShippingChange callback to the parent with actions.order.patch', async () => {

        const orderID = 'XXXXXXXXXX';

        let onShippingChange;
        let onShippingChangeCalled = false;

        window.xprops.onShippingChange = async (data, actions) => {

            const patchOrderMock = patchOrderApiMock();
            patchOrderMock.expectCalls();
            await actions.order.patch();
            patchOrderMock.done();

            onShippingChangeCalled = true;
        };

        window.paypal.Checkout = (props) => {
            return {
                renderTo: async () => {
                    onShippingChange = props.onShippingChange.call(getMockCheckoutInstance(), { orderID });
                }
            };
        };

        window.document.body.innerHTML = createButtonHTML();

        await setupButton();

        window.document.querySelector('.paypal-button').click();

        await onShippingChange;

        if (!onShippingChange || !onShippingChangeCalled) {
            throw new Error(`Expected onShippingChange to have been called`);
        }
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.authorize', async () => {

        const orderID = 'XXXXXXXXXX';
        const payerID = 'YYYYYYYYYY';

        let onApprove;
        let onApproveCalled = false;

        window.xprops.onApprove = async (data, actions) => {

            const authorizeOrderMock = authorizeOrderApiMock();
            authorizeOrderMock.expectCalls();
            await actions.order.authorize();
            authorizeOrderMock.done();

            onApproveCalled = true;
        };

        window.paypal.Checkout = (props) => {
            return {
                renderTo: async () => {
                    onApprove = props.onApprove.call(getMockCheckoutInstance(), { orderID, payerID });
                }
            };
        };

        window.document.body.innerHTML = createButtonHTML();

        await setupButton();

        window.document.querySelector('.paypal-button').click();

        await onApprove;

        if (!onApprove || !onApproveCalled) {
            throw new Error(`Expected onApprove to have been called`);
        }
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.capture call and automatic restart on CC_PROCESSOR_DECLINED', async () => {

        const orderID = 'XXXXXXXXXX';
        const payerID = 'YYYYYYYYYY';

        let onApprove;
        let onApproveCalled = false;
        let didRestart = false;

        window.xprops.onApprove = async (data, actions) => {
            if (didRestart) {
                onApproveCalled = true;
            } else {
                didRestart = true;
                onApprove = null;

                const captureOrderMock = captureOrderApiMock({
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

        window.paypal.Checkout = (props) => {
            return {
                renderTo: async () => {
                    onApprove = props.onApprove.call(getMockCheckoutInstance(), { orderID, payerID });
                },
                close: () => {
                    return ZalgoPromise.resolve();
                }
            };
        };

        window.document.body.innerHTML = createButtonHTML();

        await setupButton();

        window.document.querySelector('.paypal-button').click();

        await onApprove;

        if (!onApprove || !onApproveCalled) {
            throw new Error(`Expected onApprove to have been called`);
        }
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.capture call and automatic restart on INSTRUMENT_DECLINED', async () => {

        const orderID = 'XXXXXXXXXX';
        const payerID = 'YYYYYYYYYY';

        let onApprove;
        let onApproveCalled = false;
        let didRestart = false;

        window.xprops.onApprove = async (data, actions) => {
            if (didRestart) {
                onApproveCalled = true;
            } else {
                didRestart = true;
                onApprove = null;

                const captureOrderMock = captureOrderApiMock({
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

        window.paypal.Checkout = (props) => {
            return {
                renderTo: async () => {
                    onApprove = props.onApprove.call(getMockCheckoutInstance(), { orderID, payerID });
                },
                close: () => {
                    return ZalgoPromise.resolve();
                }
            };
        };

        window.document.body.innerHTML = createButtonHTML();

        await setupButton();

        window.document.querySelector('.paypal-button').click();

        await onApprove;

        if (!onApprove || !onApproveCalled) {
            throw new Error(`Expected onApprove to have been called`);
        }
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.authorize call and automatic restart on CC_PROCESSOR_DECLINED', async () => {

        const orderID = 'XXXXXXXXXX';
        const payerID = 'YYYYYYYYYY';

        let onApprove;
        let onApproveCalled = false;
        let didRestart = false;

        window.xprops.onApprove = async (data, actions) => {
            if (didRestart) {
                onApproveCalled = true;
            } else {
                didRestart = true;
                onApprove = null;

                const authorizeOrderMock = authorizeOrderApiMock({
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
        
        window.paypal.Checkout = (props) => {
            return {
                renderTo: async () => {
                    onApprove = props.onApprove.call(getMockCheckoutInstance(), { orderID, payerID });
                },
                close: () => {
                    return ZalgoPromise.resolve();
                }
            };
        };

        window.document.body.innerHTML = createButtonHTML();

        await setupButton();

        window.document.querySelector('.paypal-button').click();

        await onApprove;

        if (!onApprove || !onApproveCalled) {
            throw new Error(`Expected onApprove to have been called`);
        }
    });
});
