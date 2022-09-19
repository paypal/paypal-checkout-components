/* @flow */

import cardValidator from 'card-validator';

import type { CardType } from '../types';
import { DEFAULT_CARD_TYPE, VALIDATOR_TO_TYPE_MAP } from '../constants';

import { assertString, splice } from './card-utils';

// Add additional supported card types
cardValidator.creditCardType.addCard({
    code: {
        name: 'CVV',
        size: 3
    },
    gaps:     [ 4, 8, 12 ],
    lengths:  [ 16, 18, 19 ],
    niceType: 'Carte Bancaire',
    patterns: [],
    type:     'cb-nationale'
});

cardValidator.creditCardType.addCard({
    code: {
        name: 'CVV',
        size: 3
    },
    gaps:     [ 4, 8, 12, 16 ],
    lengths:  [ 19 ],
    niceType: 'Carte Aurore',
    patterns: [],
    type:     'cetelem'
});

cardValidator.creditCardType.addCard({
    code: {
        name: '',
        size: 0
    },
    gaps:     [ 4, 8, 12, 16 ],
    lengths:  [ 17 ],
    niceType: 'Cofinoga ou Privilège',
    patterns: [],
    type:     'cofinoga'
});

cardValidator.creditCardType.addCard({
    code: {
        name: '',
        size: 0
    },
    gaps:     [ 4, 8 ],
    lengths:  [ 8, 9 ],
    niceType: '4 étoiles',
    patterns: [],
    type:     'cofidis'
});

// Detect the card type metadata for a card number
export function detectCardType(cardNumber : string) : CardType {
    if (cardNumber.length > 0) {
        const cardTypes = cardValidator.creditCardType.default(cardNumber);
        if (cardTypes.length > 0) {
            return cardTypes[0];
        }
    }
    return DEFAULT_CARD_TYPE;
}

// Add gaps to a card number for display given a card type. If a card type is
// not provided, attempt to detect it and add gaps based on that type.
export function addGapsToCardNumber(cardNumber : string, cardType? : CardType) : string {
    assertString(cardNumber);
    // Remove all non-digits and all whitespaces
    cardNumber = cardNumber.trim().replace(/[^0-9]/g, '').replace(/\s/g, '');
    // $FlowFixMe
    const gaps = cardType?.gaps || detectCardType(cardNumber)?.gaps;

    // The gaps indicate where a space is inserted into the card number for display
    if (gaps) {
        for (let idx = 0; idx < gaps.length; idx++) {
            const splicePoint = gaps[idx] + idx;
            if (splicePoint > cardNumber.length - 1) {
                // We're beyond the end of the number
                break;
            }

            cardNumber = splice(cardNumber, splicePoint, ' ');
        }
    }
    return cardNumber;
}

export function checkCardEligibility(value : string, cardType : CardType) : boolean  {
    // check if the card type is eligible
    const fundingEligibility = window.xprops.fundingEligibility;
    const type = VALIDATOR_TO_TYPE_MAP[cardType.type];
    if (fundingEligibility && fundingEligibility.card) {
        // mark as ineligible if card payments are explicitly set to not be eligible
        if (!fundingEligibility.card.eligible) {
            return false;
        }
        // mark as ineligible if the card vendor is explicitly set to not be eligible
        if (type && fundingEligibility.card.vendors) {
            const vendor = fundingEligibility.card.vendors[type];
            if (vendor && !vendor.eligible) {
                return false;
            }
        }
    }
    // otherwise default to be eligible
    return true;
}
