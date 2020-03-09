/* @flow */

import type { FundingOptionType } from './types';

const getWalletImages = (type, name) => {
    const prefix = 'https://www.paypalobjects.com/ui-web';

    switch (type) {
    case 'BANK_ACCOUNT' :
        return `${ prefix }/money-icons/bank/generic_bank.png`;
    case 'PAYPAL_CREDIT' :
        switch (name) {
        case 'EBAY_MASTERCARD' :
            return `${ prefix }/money-icons/card/ebay_mastercard.png`;
        case 'PAYPAL_EXTRAS_MASTERCARD' :
            return `${ prefix }/money-icons/card/extrasMastercardLogo.svg`;
        default :
            return `${ prefix }/wallet-icons/bank/PP_Credit_large.svg`;
        }
    default :
        return `${ prefix }/wallet-icons/bank/PP_Balance_large.svg`;
    }
};

export const buildWalletItemDetails = (fundingOption : FundingOptionType) => {
    const {
        fundingInstrument: {
            image,
            name,
            issuerProductDescription,
            instrumentSubType: subType,
            lastDigits: digits,
            isPreferred,
            type
        },
        id
    } = fundingOption;

    const href = (image)
        ? image.url.href
        : getWalletImages(type, name);

    const fundingOptionTitle = (subType === 'PAYPAL')
        ? 'PayPal Credit'
        : issuerProductDescription || name;
    
    const instrumentSubType = (subType === 'PAYPAL')
        ? 'Pay overtime for your purchase'
        : subType;

    const lastDigits = (subType === 'PAYPAL')
        ? ''
        : `•••• ${ digits || '' }`;

    return {
        id,
        fundingOptionIcon: href,
        fundingOptionTitle,
        instrumentSubType,
        showPreferredText: isPreferred,
        lastDigits
    };
};
