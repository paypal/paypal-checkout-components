/* @flow */

import { FUNDING, CARD_PRIORITY } from '../../../config/constants';

export const FUNDING_DEFAULT = [
    FUNDING.PAYPAL
];

export const FUNDING_PRIORITY = [
    FUNDING.PAYPAL,
    FUNDING.VENMO,
    FUNDING.CREDIT,
    FUNDING.CARD,
    FUNDING.IDEAL,
    FUNDING.ELV
];

export type FundingSource    = string;
export type FundingList      = Array<FundingSource>;
export type FundingSelection = {
    allowed : FundingList,
    disallowed : FundingList,
    remembered : FundingList
};

export function determineEligibleFunding({ funding, selected } :
    { funding : FundingSelection, selected : FundingSource }) : FundingList {

    let eligibleFunding = [ selected ];

    for (let sourceList of [ FUNDING_DEFAULT, funding.allowed, funding.remembered ]) {
        for (let source of sourceList) {
            if (funding.disallowed.indexOf(source) === -1 && eligibleFunding.indexOf(source) === -1) {
                eligibleFunding.push(source);
            }
        }
    }

    eligibleFunding.sort((a, b) => {

        if (a === selected) {
            return -1;
        }

        return FUNDING_PRIORITY.indexOf(a) - FUNDING_PRIORITY.indexOf(b);
    });

    return eligibleFunding;
}

export function determineEligibleCards({ funding, count } :
    { funding : FundingSelection, count : number }) : FundingList {

    let cards = [];

    for (let card of CARD_PRIORITY) {
        if (funding.disallowed.indexOf(card) === -1) {
            cards.push(card);

            if (cards.length === count) {
                break;
            }
        }
    }

    return cards;
}
