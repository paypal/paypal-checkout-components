import { usePayPalPromise } from './promise';
import { detectLightboxEligibility, enableLightbox } from './lightbox';
import { determineLocale } from './locale';
import { persistAccessToken } from './user';
import {
    setupLoginPreRender,
    getAccessToken,
    shouldPrefetchLogin
} from './login';
import { renderCardExperience } from './card';
import { renderCheckout } from './checkout';
import { KEY_CODES } from './constants';
import { getButtonFunding, mapToToken } from './api';
import { querySelectorAll } from './util';
import { payment, guestEligibilityCheck } from './paymentRequest';

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

    const isZomboEnabled = document.cookie.indexOf('zombo=1') >= 0;
    const isPaymentRequestAPIEnabled = document.cookie.indexOf('browserPaymentRequest=1') >= 0;

    if (window.xprops.onClick) {
        window.xprops.onClick({ fundingSource, card });
    }

    if (!isZomboEnabled) {
        renderCheckout({ fundingSource });
        return;
    }

    if (!(card || fundingSource === 'card')) {
        return renderCheckout({ fundingSource });
    } else {
        window.xprops
            .payment()
            .then(mapToToken)
            .then(paymentToken => {
                // make API call to check flow eligibility
                return guestEligibilityCheck({ token: paymentToken })
                    .then(res => {
                        return res.data.checkoutSession.flags;
                    })
                    .then(({ isHostedFieldsAllowed, isGuestEligible }) => {
                        if (isHostedFieldsAllowed) {
                            // render zombo
                            return renderCardExperience({ fundingSource, card, token: paymentToken });
                        }

                        if (isGuestEligible) {
                            if (!isPaymentRequestAPIEnabled) {
                                return renderCheckout({ fundingSource });
                            }

                            // use request payment api
                            return payment().canMakePayment().then(isAvailable => {
                                if (isAvailable) {
                                    payment.show();
                                } else {
                                    // go to xoon guest checkout
                                    return renderCheckout({ fundingSource });
                                }
                            });
                        }

                        // TODO: render a button to go to xoon since we cannot open
                        // new popup because this check is asynchonous
                        // go to xoon signup
                        return renderCheckout({ fundingSource });
                    });
            })
            .catch(window.xprops.onError);
    }
}

export function setupButton() {

    const attachClickEventToElement = (element, fn) => {
        element.addEventListener('click', fn);
        element.addEventListener('keypress', event => {
            if (event.keyCode === KEY_CODES.ENTER) {
                return fn(event);
            }
        });
    };

    if (window.name && window.name.indexOf('__prerender') === 0) {
        if (window.console && window.console.warn) {
            window.console.warn('Button setup inside prerender');
        }
        return;
    }

    if (
        !window.paypal &&
        (!window.name || window.name.indexOf('xcomponent__ppbutton') === -1)
    ) {
        return;
    }

    usePayPalPromise();
    setupLoginPreRender();

    querySelectorAll('.paypal-button').forEach(button => {
        let fundingSource = button.getAttribute('data-funding-source');
        let card = button.getAttribute('data-card');

        attachClickEventToElement(button, event => {
            return clickButton(event, { fundingSource, card });
        });
    });

    return window.paypal.Promise.all([
        detectLightboxEligibility(),

        determineLocale().then(locale => {
            window.paypal.config.locale.country = locale.country;
            window.paypal.config.locale.lang = locale.lang;
        }),

        getButtonFunding().then(funding => {
            if (
                window.xprops.funding &&
                window.xprops.funding.remember &&
                funding.eligible.length
            ) {
                window.xprops.funding.remember(funding.eligible);
            }
        })
    ]);
}
