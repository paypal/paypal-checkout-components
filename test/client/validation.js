/* @flow */
/* eslint require-await: off, max-lines: off */

import { wrapPromise } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { setupButton } from '../../src';

import { createButtonHTML } from './mocks';

describe('validation cases', () => {

    it('should render a button, enable the button, click, and call createOrder or onApprove', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = 'XXXXXXXXXX';

            window.xprops.onInit = (data, actions) => {
                return actions.enable();
            };

            window.xprops.onClick = expect('onClick');

            window.xprops.createOrder = expect('createOrder', () => orderID);

            window.paypal.Checkout = expect('Checkout', (props) => {
                return {
                    close:    avoid('close'),
                    renderTo: expect('renderTo', async () => {
                        return props.createOrder().then(expect('createOrderThen'));
                    })
                };
            });

            window.document.body.innerHTML = createButtonHTML();
            await setupButton();
            window.document.querySelector('.paypal-button').click();
        });
    });

    it('should render a button, disable the button, click, and not call Checkout or createOrder or onApprove', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            window.xprops.onInit = (data, actions) => {
                return actions.disable();
            };

            window.xprops.onClick = expect('onClick');

            window.xprops.createOrder = avoid('createOrder');
            window.xprops.onApprove = avoid('onApprove');
            window.paypal.Checkout = () => {
                return {
                    renderTo: avoid('renderTo')
                };
            };

            window.document.body.innerHTML = createButtonHTML();
            await setupButton();
            window.document.querySelector('.paypal-button').click();
        });
    });

    it('should render a button, disable the button, re-enable the button, click, and call createOrder or onApprove', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = 'XXXXXXXXXX';

            window.xprops.onInit = (data, actions) => {
                return actions.disable().then(() => {
                    return ZalgoPromise.delay(50);
                }).then(() => {
                    return actions.enable();
                });
            };

            window.xprops.onClick = expect('onClick');

            window.xprops.createOrder = expect('createOrder', () => orderID);

            window.paypal.Checkout = expect('Checkout', (props) => {
                return {
                    close:    avoid('close'),
                    renderTo: expect('renderTo', async () => {
                        return props.createOrder().then(expect('createOrderThen'));
                    })
                };
            });

            window.document.body.innerHTML = createButtonHTML();
            await setupButton();
            window.document.querySelector('.paypal-button').click();
        });
    });

    it('should render a button, and resolve in onClick', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = 'XXXXXXXXXX';

            window.xprops.onClick = expect('onClick', (data, actions) => {
                return ZalgoPromise.delay(50).then(() => actions.resolve());
            });

            window.xprops.createOrder = expect('createOrder', () => orderID);
            window.xprops.onApprove = avoid('onApprove');

            window.paypal.Checkout = expect('Checkout', (props) => {
                return {
                    close:    avoid('close'),
                    renderTo: expect('renderTo', async () => {
                        return props.createOrder().then(expect('createOrderThen'));
                    })
                };
            });

            window.document.body.innerHTML = createButtonHTML();
            await setupButton();
            window.document.querySelector('.paypal-button').click();
        });
    });

    it('should render a button, and reject in onClick', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.xprops.onClick = expect('onClick', (data, actions) => {
                return ZalgoPromise.delay(50).then(() => actions.reject());
            });

            window.xprops.createOrder = avoid('createOrder');
            window.xprops.onApprove = avoid('onApprove');

            window.paypal.Checkout = expect('Checkout', (props) => {
                return {
                    close:    expect('close', () => {
                        return props.onClose();
                    }),
                    renderTo: expect('renderTo', async () => {
                        return props.createOrder().then(avoid('createOrderThen'))
                            .timeout(50).catch(expect('timeout'));
                    })
                };
            });

            window.document.body.innerHTML = createButtonHTML();
            await setupButton();
            window.document.querySelector('.paypal-button').click();
        });
    });
});
