
import { usePayPalPromise } from './promise';
import { detectLightboxEligibility, enableLightbox } from './lightbox';
import { determineLocale } from './locale';
import { persistAccessToken } from './user';
import { setupLoginPreRender, getAccessToken, shouldPrefetchLogin } from './login';
import { renderCheckout } from './checkout';
import { KEY_CODES } from './constants';
import { getButtonFunding } from './api';
import { querySelectorAll } from './util';

function clickButton(event, { fundingSource = 'paypal', card }) {
    event.preventDefault();
    event.stopPropagation();

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

    renderCheckout({ fundingSource });

    if (window.xprops.onClick) {
        window.xprops.onClick({ fundingSource, card });
    }
}

export function setupButton() {
    if (window.name && window.name.indexOf('__prerender') === 0) {
        if (window.console && window.console.warn) {
            window.console.warn('Button setup inside prerender');
        }
        return;
    }

    if (!window.paypal && (!window.name || window.name.indexOf('xcomponent__ppbutton') === -1)) {
        return;
    }

    usePayPalPromise();
    setupLoginPreRender();

    querySelectorAll('.paypal-button').forEach(button => {
        let fundingSource = button.getAttribute('data-funding-source');
        let card = button.getAttribute('data-card');

        button.addEventListener('click', event => {
            return clickButton(event, { fundingSource, card });
        });

        button.addEventListener('keypress', event => {
            if (event.keyCode === KEY_CODES.ENTER) {
                return clickButton(event, { fundingSource, card });
            }
        });
    });

    return window.paypal.Promise.all([

        detectLightboxEligibility(),

        determineLocale().then(locale => {
            window.paypal.config.locale.country = locale.country;
            window.paypal.config.locale.lang = locale.lang;
        }),

        getButtonFunding().then(funding => {
            if (window.xprops.funding && window.xprops.funding.remember && funding.eligible.length) {
                window.xprops.funding.remember(funding.eligible);
            }
        })
    ]);
}
