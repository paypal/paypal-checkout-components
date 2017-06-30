

let { config } = window.paypal;
import { detectLightboxEligibility, enableLightbox } from './lightbox';
import { determineLocale } from './locale';
import { isRemembered, persistAccessToken } from './user';
import { setupLoginPreRender, getAccessToken, shouldPrefetchLogin } from './login';
import { renderCheckout } from './checkout';
import { KEY_CODES, IDS } from './constants';

function clickButton(event) {
    event.preventDefault();

    if (shouldPrefetchLogin()) {
        enableLightbox();
        let accessTokenGetter = getAccessToken();

        accessTokenGetter.then(accessToken => {
            persistAccessToken(accessToken);
        });

        return renderCheckout({
            accessToken: () => accessTokenGetter,
            onDisplay: () => accessTokenGetter
        });
    }

    renderCheckout();

    if (window.xprops.onClick) {
        window.xprops.onClick();
    }
}

export function setupButton() {

    setupLoginPreRender();

    detectLightboxEligibility();

    determineLocale().then(locale => {
        config.locale.country = locale.country;
        config.locale.lang = locale.lang;
    });

    if (window.xprops.onRemembered) {
        isRemembered().then(remembered => {
            if (remembered) {
                window.xprops.onRemembered();
            }
        });
    }

    let button = window.document.getElementById(IDS.PAYPAL_BUTTON);

    button.addEventListener('click', event => {
        return clickButton(event);
    });

    button.addEventListener('keypress', event => {
        if (event.keyCode === KEY_CODES.ENTER) {
            return clickButton(event);
        }
    });
}
