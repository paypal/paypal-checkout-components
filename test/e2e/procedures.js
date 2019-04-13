/* @flow */

import { waitAndClick, waitAndType, elementExists, findFrameByName, waitForPopup, waitForElement } from './common';
import { SELECTORS, DATA_ATTRIBUTES, WINDOW_NAME } from './selectors';
import { STAGE, CLIENT_ID } from './config';

export async function renderSmartButtons(page : Object, opts? : string = '') : Promise<Object> {
    await page.addScriptTag({ url: `https://www.${ STAGE }/sdk/js?client-id=${ CLIENT_ID }` });

    await page.evaluate(`window.paypal.Buttons(${ opts }).render('body')`);

    return await findFrameByName(page, WINDOW_NAME.BUTTON);
}

export async function getButtonByFundingSource(buttonFrame : Object, funding : string) : Promise<Object> {
    return await buttonFrame.$(`[${ DATA_ATTRIBUTES.BUTTON.FUNDING_SOURCE }=${ funding }]`);
}

export async function clickButton(buttonFrame : Object, button : Object) : Promise<Object> {
    const popupPromise = waitForPopup(buttonFrame);
    await button.click();
    return await popupPromise;
}

export async function runLoginFlow(page : Object, { user, password } : { user : string, password : string }) : Promise<void> {
    await waitAndType(page, SELECTORS.LOGIN.EMAIL_FIELD, user);

    if (await elementExists(page, SELECTORS.LOGIN.NEXT_BUTTON)) {
        await waitAndClick(page, SELECTORS.LOGIN.NEXT_BUTTON);
    }

    await waitAndType(page, SELECTORS.LOGIN.PASSWORD_FIELD, password);
    await waitAndClick(page, SELECTORS.LOGIN.LOGIN_BUTTON);
}

export async function runCheckoutFlow(page : Object, { user, password } : { user : string, password : string }) : Promise<void> {
    await Promise.race([
        waitForElement(page, SELECTORS.LOGIN.EMAIL_FIELD),
        waitForElement(page, SELECTORS.CHECKOUT.LOGIN_IFRAME)
    ]);

    if (await elementExists(page, SELECTORS.CHECKOUT.LOGIN_IFRAME)) {
        await runLoginFlow(await findFrameByName(page, WINDOW_NAME.LOGIN), { user, password });
    } else {
        await runLoginFlow(page, { user, password });
    }

    await Promise.race([
        waitForElement(page, SELECTORS.CHECKOUT.CREDIT_CANCEL),
        waitForElement(page, SELECTORS.CHECKOUT.ECONSENT_ACCEPT_CHECKBOX),
        waitForElement(page, SELECTORS.CHECKOUT.REVIEW_CONTINUE_BUTTON)
    ]);

    if (await elementExists(page, SELECTORS.CHECKOUT.CREDIT_CANCEL)) {
        await waitAndClick(page, SELECTORS.CHECKOUT.CREDIT_CANCEL);
    }

    await Promise.race([
        waitForElement(page, SELECTORS.CHECKOUT.ECONSENT_ACCEPT_CHECKBOX),
        waitForElement(page, SELECTORS.CHECKOUT.REVIEW_CONTINUE_BUTTON)
    ]);

    if (await elementExists(page, SELECTORS.CHECKOUT.ECONSENT_ACCEPT_CHECKBOX)) {
        await waitAndClick(page, SELECTORS.CHECKOUT.ECONSENT_ACCEPT_CHECKBOX);
        await waitAndClick(page, SELECTORS.CHECKOUT.ECONSENT_ACCEPT_BUTTON);
    }

    await waitForElement(page, SELECTORS.CHECKOUT.REVIEW_CONTINUE_BUTTON);

    if (!await elementExists(page, SELECTORS.CHECKOUT.SHIPPING_ADDRESS)) {
        await waitAndClick(page, SELECTORS.CHECKOUT.REVIEW_CONTINUE_BUTTON);
    }

    await waitAndClick(page, SELECTORS.CHECKOUT.REVIEW_CONTINUE_BUTTON);
}
