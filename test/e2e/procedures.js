/* @flow */

import { waitAndClick, waitAndType, elementExists, findFrameByName, waitForPopup } from './common';
import { SELECTORS, BUTTON_FRAME_NAME, DATA_ATTRIBUTES } from './selectors';
import { ACCOUNTS } from './accounts';
import { STAGE, CLIENT_ID } from './config';

export async function renderSmartButtons(page : Object, opts? : string = '') : Promise<Object> {
    await page.addScriptTag({ url: `https://www.${ STAGE }/sdk/js?client-id=${ CLIENT_ID }` });

    await page.evaluate(`window.paypal.Buttons(${ opts }).render('body')`);

    return await findFrameByName(page, BUTTON_FRAME_NAME);
}

export async function getButtonByFundingSource(buttonFrame : Object, funding : string) : Promise<Object> {
    return await buttonFrame.$(`[${ DATA_ATTRIBUTES.BUTTON.FUNDING_SOURCE }=${ funding }]`);
}

export async function clickButton(buttonFrame : Object, button : Object) : Promise<Object> {
    const popupPromise = waitForPopup(buttonFrame);
    await button.click();
    return await popupPromise;
}

export async function runCheckoutFlow(page : Object) : Promise<void> {
    await waitAndType(page, SELECTORS.LOGIN.EMAIL_FIELD, ACCOUNTS.US_BUYER_WITH_CREDIT.EMAIL);
    await waitAndClick(page, SELECTORS.LOGIN.NEXT_BUTTON);

    await waitAndType(page, SELECTORS.LOGIN.PASSWORD_FIELD, ACCOUNTS.US_BUYER_WITH_CREDIT.PASSWORD);
    await waitAndClick(page, SELECTORS.LOGIN.LOGIN_BUTTON);

    await Promise.race([
        page.waitForSelector(SELECTORS.CHECKOUT.ECONSENT_ACCEPT_CHECKBOX),
        page.waitForSelector(SELECTORS.CHECKOUT.REVIEW_CONTINUE_BUTTON)
    ]);

    if (await elementExists(page, SELECTORS.CHECKOUT.ECONSENT_ACCEPT_CHECKBOX)) {
        await waitAndClick(page, SELECTORS.CHECKOUT.ECONSENT_ACCEPT_CHECKBOX);
        await waitAndClick(page, SELECTORS.CHECKOUT.ECONSENT_ACCEPT_BUTTON);
    }

    await waitAndClick(page, SELECTORS.CHECKOUT.REVIEW_CONTINUE_BUTTON);
}
