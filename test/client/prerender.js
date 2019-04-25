/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import { setupButton } from '../../src';

import { createButtonHTML, DEFAULT_FUNDING_ELIGIBILITY } from './mocks';

describe('prerender cases', () => {

    it('should prerender a button, and call createOrder or onApprove', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = 'XXXXXXXXXX';

            const win = {
                close: avoid('close')
            };

            window.xprops.getPrerenderDetails = expect('getPrerenderDetails', () => {
                return ZalgoPromise.try(() => {
                    return {
                        win,
                        fundingSource: FUNDING.PAYPAL
                    };
                });
            });

            window.xprops.createOrder = expect('createOrder', async () => ZalgoPromise.resolve(orderID));

            window.xprops.onApprove = expect('onApprove', async (data) => {
                return ZalgoPromise.try(() => {
                    if (data.orderID !== orderID) {
                        throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                    }
                });
            });

            window.document.body.innerHTML = createButtonHTML();
            await setupButton({ fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
        });
    });

    it('should render a button, enable the button, click, and call createOrder or onApprove', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = 'XXXXXXXXXX';

            const win = {
                close: avoid('close')
            };

            window.xprops.getPrerenderDetails = expect('getPrerenderDetails', () => {
                return ZalgoPromise.try(() => {
                    return {
                        win,
                        fundingSource: FUNDING.PAYPAL
                    };
                });
            });

            window.xprops.onInit = expect('onInit', (data, actions) => {
                return actions.enable();
            });

            window.xprops.onClick = expect('onClick', () => ZalgoPromise.resolve());

            window.xprops.createOrder = expect('createOrder', async () => ZalgoPromise.resolve(orderID));

            window.document.body.innerHTML = createButtonHTML();
            await setupButton({ fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
        });
    });

    it('should render a button, disable the button, click, and not call Checkout or createOrder or onApprove', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const win = {
                close: expect('close')
            };

            window.xprops.getPrerenderDetails = expect('getPrerenderDetails', () => {
                return ZalgoPromise.try(() => {
                    return {
                        win,
                        fundingSource: FUNDING.PAYPAL
                    };
                });
            });

            window.xprops.onInit = expect('onInit', (data, actions) => {
                return actions.disable();
            });

            window.xprops.onClick = expect('onClick', () => ZalgoPromise.resolve());

            window.xprops.createOrder = avoid('createOrder', () => ZalgoPromise.reject(new Error(`Avoid createOrder`)));
            window.xprops.onApprove = avoid('onApprove', () => ZalgoPromise.reject(new Error(`Avoid onApprove`)));

            window.document.body.innerHTML = createButtonHTML();
            await setupButton({ fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
        });
    });

    it('should render a button, disable the button, re-enable the button, click, and call createOrder or onApprove', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = 'XXXXXXXXXX';

            const win = {
                close: avoid('close')
            };

            window.xprops.getPrerenderDetails = expect('getPrerenderDetails', () => {
                return ZalgoPromise.try(() => {
                    return {
                        win,
                        fundingSource: FUNDING.PAYPAL
                    };
                });
            });

            window.xprops.onInit = (data, actions) => {
                return actions.disable().then(() => {
                    return ZalgoPromise.delay(50);
                }).then(() => {
                    return actions.enable();
                });
            };

            window.xprops.onClick = expect('onClick', () => ZalgoPromise.resolve());
            window.xprops.createOrder = expect('createOrder', async () => ZalgoPromise.resolve(orderID));

            window.document.body.innerHTML = createButtonHTML();
            await setupButton({ fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
        });
    });

    it('should render a button, and resolve in onClick', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = 'XXXXXXXXXX';

            const win = {
                close: avoid('close')
            };

            window.xprops.getPrerenderDetails = expect('getPrerenderDetails', () => {
                return ZalgoPromise.try(() => {
                    return {
                        win,
                        fundingSource: FUNDING.PAYPAL
                    };
                });
            });

            window.xprops.onClick = expect('onClick', (data, actions) => {
                return ZalgoPromise.delay(50).then(() => actions.resolve());
            });

            window.xprops.createOrder = expect('createOrder', async () => ZalgoPromise.resolve(orderID));
            window.xprops.onApprove = expect('onApprove', () => ZalgoPromise.resolve());

            window.document.body.innerHTML = createButtonHTML();
            await setupButton({ fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
        });
    });

    it('should render a button, and reject in onClick', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const win = {
                close: expect('close')
            };

            window.xprops.getPrerenderDetails = expect('getPrerenderDetails', () => {
                return ZalgoPromise.try(() => {
                    return {
                        win,
                        fundingSource: FUNDING.PAYPAL
                    };
                });
            });

            window.xprops.onClick = expect('onClick', (data, actions) => {
                return ZalgoPromise.delay(50).then(() => actions.reject());
            });

            window.xprops.createOrder = avoid('createOrder', () => ZalgoPromise.reject(new Error(`Avoid createOrder`)));
            window.xprops.onApprove = avoid('onApprove', () => ZalgoPromise.reject(new Error(`Avoid onApprove`)));

            window.document.body.innerHTML = createButtonHTML();
            await setupButton({ fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
        });
    });
});
