/* @flow */

export const WINDOW_NAME = {
    BUTTON:   '__zoid__paypal_buttons__',
    CHECKOUT: '__zoid__paypal_checkout__',
    LOGIN:    'injectedUl'
};

export const SELECTORS = {

    LOGIN: {
        EMAIL_FIELD:    'input#email',
        PASSWORD_FIELD: 'input#password',
        NEXT_BUTTON:    'button#btnNext',
        LOGIN_BUTTON:   'button#btnLogin'
    },

    CHECKOUT: {
        LOGIN_IFRAME:             `iframe[name=${ WINDOW_NAME.LOGIN }]`,
        CREDIT_CANCEL:            'button#billingInfoCancelBtn',
        ECONSENT_ACCEPT_CHECKBOX: 'label[data-test-id=eConsentLabel]',
        ECONSENT_ACCEPT_BUTTON:   'input#submitEConsent',
        SHIPPING_ADDRESS:         '#shippingAddress',
        REVIEW_CONTINUE_BUTTON:   'input#confirmButtonTop',
        REVIEW_CHANGE_PAYMENT:    'a.changePayment',
        SELECT_FUNDING:           (n : number) : string => `ul.allPlanList li.fundingsource:nth-child(${ n })`
    }
};

export const DATA_ATTRIBUTES = {

    BUTTON: {
        FUNDING_SOURCE: 'data-funding-source'
    }
};
