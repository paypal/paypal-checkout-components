/* @flow */

import { FUNDING } from '@paypal/sdk-constants';

import { withPage, waitForClose } from './common';
import { runCheckoutFlow, renderSmartButtons, getButtonByFundingSource, clickButton } from './procedures';

describe('PayPal end to end tests', () => {
    it('Should run an end-to-end transaction on stage', async () => {
        await withPage(async ({ page }) => {
            const buttonFrame = await renderSmartButtons(page, `
                {
                    updateClientConfiguration: true,

                    onApprove: function (data, actions) {
                        window.capturePromise = actions.order.capture();
                    }
                }
            `);

            const button = await getButtonByFundingSource(buttonFrame, FUNDING.PAYPAL);
            const checkoutPopup = await clickButton(page, button);

            await runCheckoutFlow(checkoutPopup);
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

