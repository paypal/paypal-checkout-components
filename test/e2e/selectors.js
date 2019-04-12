/* @flow */

export const BUTTON_FRAME_NAME = '__zoid__paypal_buttons__';
export const CHECKOUT_POPUP_NAME = '__zoid__paypal_checkout__';

export const SELECTORS = {

    LOGIN: {
        EMAIL_FIELD:    'input#email',
        PASSWORD_FIELD: 'input#password',
        NEXT_BUTTON:    'button#btnNext',
        LOGIN_BUTTON:   'button#btnLogin'
    },

    CHECKOUT: {
        ECONSENT_ACCEPT_CHECKBOX: '[data-test-id=eConsentLabel]',
        ECONSENT_ACCEPT_BUTTON:   'input#submitEConsent',
        REVIEW_CONTINUE_BUTTON:   'input#confirmButtonTop'
    }
};

export const DATA_ATTRIBUTES = {

    BUTTON: {
        FUNDING_SOURCE: 'data-funding-source'
    }
};
