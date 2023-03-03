/* @flow */

import { FUNDING } from '@paypal/sdk-constants';

import { withPage, waitForClose } from './common';
import { runCheckoutLoginFlow, resolveCheckoutContingencies, runCheckoutChoicePage, completeCheckoutReviewPage, renderSmartButtons, getButtonByFundingSource, clickButton, changeFundingSource } from './procedures';
import { ACCOUNTS } from './accounts';

describe('PayPal end to end tests', () => {
    it('Should run an end-to-end transaction on stage with the paypal button', async () => {
        await withPage(async ({ page }) => {
            const buttonFrame = await renderSmartButtons(page, `
                {
                    createOrder: function (data, actions) {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: '10.00'
                                }
                            }]
                        });
                    },

                    updateClientConfiguration: true,

                    onApprove: function (data, actions) {
                        window.capturePromise = actions.order.capture();
                    }
                }
            `);

            const button = await getButtonByFundingSource(buttonFrame, FUNDING.PAYPAL);
            const checkoutPopup = await clickButton(page, button);

            await runCheckoutLoginFlow(checkoutPopup, {
                user:     ACCOUNTS.US_BUYER.EMAIL,
                password: ACCOUNTS.US_BUYER.PASSWORD
            });

            await resolveCheckoutContingencies(checkoutPopup);
            await runCheckoutChoicePage(checkoutPopup);
            await completeCheckoutReviewPage(checkoutPopup);
            await waitForClose(checkoutPopup);

            const { id } = await page.evaluate(`
                window.capturePromise
            `);

            if (!id) {
                throw new Error(`Expected to get order id from transaction`);
            }

            // eslint-disable-next-line no-console
            console.info('Order ID:', id);
        });
    });

    it('Should run an end-to-end transaction on stage with the credit button', async () => {
        await withPage(async ({ page }) => {
            const buttonFrame = await renderSmartButtons(page, `
                {
                    createOrder: function (data, actions) {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: '50.00'
                                }
                            }]
                        });
                    },

                    updateClientConfiguration: true,

                    onApprove: function (data, actions) {
                        window.capturePromise = actions.order.capture();
                    }
                }
            `);

            const button = await getButtonByFundingSource(buttonFrame, FUNDING.CREDIT);
            const checkoutPopup = await clickButton(page, button);

            await runCheckoutLoginFlow(checkoutPopup, {
                user:     ACCOUNTS.US_BUYER_WITH_CREDIT.EMAIL,
                password: ACCOUNTS.US_BUYER_WITH_CREDIT.PASSWORD
            });

            await resolveCheckoutContingencies(checkoutPopup);
            await runCheckoutChoicePage(checkoutPopup);
            await completeCheckoutReviewPage(checkoutPopup);
            await waitForClose(checkoutPopup);

            const { id } = await page.evaluate(`
                window.capturePromise
            `);

            if (!id) {
                throw new Error(`Expected to get order id from transaction`);
            }

            // eslint-disable-next-line no-console
            console.info('Order ID:', id);
        });
    });

    it('Should run an end-to-end transaction on stage with the credit button and change funding source', async () => {
        await withPage(async ({ page }) => {
            const buttonFrame = await renderSmartButtons(page, `
                {
                    createOrder: function (data, actions) {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: '50.00'
                                }
                            }]
                        });
                    },

                    updateClientConfiguration: true,

                    onApprove: function (data, actions) {
                        window.capturePromise = actions.order.capture();
                    }
                }
            `);

            const button = await getButtonByFundingSource(buttonFrame, FUNDING.CREDIT);
            const checkoutPopup = await clickButton(page, button);

            await runCheckoutLoginFlow(checkoutPopup, {
                user:     ACCOUNTS.US_BUYER_WITH_CREDIT.EMAIL,
                password: ACCOUNTS.US_BUYER_WITH_CREDIT.PASSWORD
            });
            
            await resolveCheckoutContingencies(checkoutPopup);
            await runCheckoutChoicePage(checkoutPopup);
            await changeFundingSource(checkoutPopup);
            await completeCheckoutReviewPage(checkoutPopup);
            await waitForClose(checkoutPopup);

            const { id } = await page.evaluate(`
                window.capturePromise
            `);

            if (!id) {
                throw new Error(`Expected to get order id from transaction`);
            }

            // eslint-disable-next-line no-console
            console.info('Order ID:', id);
        });
    });
});

