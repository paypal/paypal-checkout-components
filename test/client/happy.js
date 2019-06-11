/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import { setupButton } from '../../src';

import { createButtonHTML, DEFAULT_FUNDING_ELIGIBILITY, mockFunction, clickButton, enterButton } from './mocks';
import { triggerKeyPress } from './util';

describe('happy cases', () => {

    it('should render a button with createOrder, click the button, and render checkout', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = 'XXXXXXXXXX';
            const payerID = 'YYYYYYYYYY';

            window.xprops.createOrder = expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            });

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            });

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

            createButtonHTML();

            await setupButton({ fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with a paymentID', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = 'XXXXXXXXXX';
            const payerID = 'YYYYYYYYYY';
            const paymentID = 'ZZZZZZ';

            window.xprops.createOrder = expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            });

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }

                if (data.paymentID !== paymentID) {
                    throw new Error(`Expected paymentID to be ${ paymentID }, got ${ data.paymentID }`);
                }
            });

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID, paymentID }, actions);
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

            createButtonHTML();

            await setupButton({ fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button with createBillingAgreement, click the button, and render checkout', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = 'ABCDEFG12345';
            const billingToken = 'BA-ZZZZZZZZZZZ';
            const payerID = 'YYYYYYYYYY';

            delete window.xprops.createOrder;

            window.xprops.vault = true;
            window.xprops.createBillingAgreement = expect('createBillingAgreement', async () => {
                return ZalgoPromise.try(() => {
                    return billingToken;
                });
            });

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = expect('onApprove', async (data) => {
                if (data.billingToken !== billingToken) {
                    throw new Error(`Expected billingToken to be ${ billingToken }, got ${ data.billingToken }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            });

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID, billingToken }, actions);
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

            createButtonHTML();

            await setupButton({ fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button with createSubscription, click the button, and render checkout', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const cartID = 'CARTIDOFSUBSCRIPTIONS';
            const subscriptionID = 'I-SUBSCRIPTIONID';
            const payerID = 'YYYYYYYYYY';

            window.xprops.vault = true;
            delete window.xprops.createOrder;
            window.xprops.createSubscription = expect('createSubscription', async () => {
                return ZalgoPromise.try(() => {
                    return subscriptionID;
                });
            });

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = expect('onApprove', async (data) => {
                if (data.subscriptionID !== subscriptionID) {
                    throw new Error(`Expected billingToken to be ${ subscriptionID }, got ${ data.subscriptionID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            });

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

            await setupButton({ fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, press enter on the button, and render checkout', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = 'XXXXXXXXXX';
            const payerID = 'YYYYYYYYYY';

            window.xprops.createOrder = expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            });

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            });

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

            createButtonHTML();

            await setupButton({ fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            triggerKeyPress(window.document.querySelector(`button[data-funding-source=${ FUNDING.PAYPAL }]`), 13);
        });
    });
    
    it('should render a button, click the button, and call onClick', async () => {
        return await wrapPromise(async ({ expect }) => {
            window.xprops.onClick = expect('onClick', () => ZalgoPromise.resolve());

            createButtonHTML();

            await setupButton({ fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });
    
    it('should render a button, press enter on the button, and call onClick', async () => {
        return await wrapPromise(async ({ expect }) => {
            window.xprops.onClick = expect('onClick', () => ZalgoPromise.resolve());

            createButtonHTML();

            await setupButton({ fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            enterButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, click the button, and render checkout, then call onCancel', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = 'XXXXXXXXXX';

            window.xprops.createOrder = expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            });

            window.xprops.onCancel = expect('onCancel', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            });

            window.xprops.onApprove = avoid('onApprove');

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async () => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return props.onCancel({ orderID });
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await setupButton({ fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, click the button, and render checkout, onApprove, restart and call onApprove again', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = 'XXXXXXXXXX';
            const payerID = 'YYYYYYYYYY';

            window.xprops.createOrder = expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            });

            window.xprops.onCancel = avoid('onCancel');

            let onApprove = async (data, actions) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }

                onApprove = expect('onApprove2', async (data2) => {
                    if (data2.orderID !== orderID) {
                        throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                    }

                    if (data2.payerID !== payerID) {
                        throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                    }
                });

                actions.restart().then(avoid('restartThen'));
            };

            window.xprops.onApprove = expect('onApprove', (data, actions) => onApprove(data, actions));

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

            createButtonHTML();

            await setupButton({ fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });
});
