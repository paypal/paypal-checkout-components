/* @flow */

import { ENV, CARD_PRIORITY, FUNDING } from '../../../config/constants';
import { BUTTON_LAYOUT } from '../constants';

import { getButtonConfig, getFundingConfig, getCardConfig, FUNDING_PRIORITY, FUNDING_CONFIG, fundingToDefaultLabel } from './config';

export type FundingSource    = string;
export type FundingList      = Array<FundingSource>;
export type FundingSelection = {
    allowed : FundingList,
    disallowed : FundingList,
    remembered : FundingList
};

function isFundingEligible(source : FundingSource, { locale, funding, env, layout } :
    { locale : LocaleType, funding : FundingSelection, env : string, layout : string }) : boolean {

    if (!getFundingConfig(source, 'enabled')) {
        if (!(env === ENV.TEST && getFundingConfig(source, 'test'))) {
            return false;
        }
    }

    let isVertical = layout === BUTTON_LAYOUT.VERTICAL;

    let label = fundingToDefaultLabel(source);

    let allowSecondary = getButtonConfig(label, isVertical
        ? 'allowSecondaryVertical'
        : 'allowSecondaryHorizontal'
    );

    if (!allowSecondary) {
        return false;
    }

    if (funding.disallowed.indexOf(source) !== -1 && getFundingConfig(source, 'allowOptOut')) {
        return false;
    }

    if (funding.disallowed.indexOf(source) !== -1 && source === FUNDING.VENMO) {
        return false;
    }

    if (getFundingConfig(source, 'allowedCountries', [ locale.country ]).indexOf(locale.country) === -1) {
        return false;
    }

    if (getFundingConfig(source, 'defaultCountries', []).indexOf(locale.country) !== -1) {
        return true;
    }

    if (isVertical && getFundingConfig(source, 'defaultVerticalCountries', []).indexOf(locale.country) !== -1) {
        return true;
    }

    if (getFundingConfig(source, 'default')) {
        return true;
    }

    if (funding.allowed.indexOf(source) !== -1 && getFundingConfig(source, 'allowOptIn')) {
        return true;
    }

    if (funding.remembered.indexOf(source) !== -1 && getFundingConfig(source, 'allowRemember')) {
        return true;
    }

    return false;
}

export function determineEligibleFunding({ funding, selected, locale, env, layout } :
    { funding : FundingSelection, selected : FundingSource, locale : LocaleType, env : string, layout : string }) : FundingList {

    let eligibleFunding = FUNDING_PRIORITY.filter(source =>
        (source !== selected) && isFundingEligible(source, { locale, funding, env, layout }));

    eligibleFunding.unshift(selected);

    return eligibleFunding;
}

export function determineEligibleCards({ funding, locale } :
    { funding : FundingSelection, locale : LocaleType }) : FundingList {

    return getCardConfig(locale.country, 'priority')
        .filter(card => funding.disallowed.indexOf(card) === -1);
}

export function validateFunding(funding : FundingSelection = { allowed: [], disallowed: [], remembered: [] }) {

    if (funding.allowed) {
        for (let source of funding.allowed) {
            if (CARD_PRIORITY.indexOf(source) !== -1) {
                continue;
            }

            if (!FUNDING_CONFIG.hasOwnProperty(source)) {
                throw new Error(`Invalid funding source: ${ source }`);
            }

            if (!getFundingConfig(source, 'allowOptIn')) {
                throw new Error(`Can not allow funding source: ${ source }`);
            }

            if (funding.disallowed && funding.disallowed.indexOf(source) !== -1) {
                throw new Error(`Can not allow and disallow funding source: ${ source }`);
            }
        }
    }

    if (funding.disallowed) {
        for (let source of funding.disallowed) {
            if (CARD_PRIORITY.indexOf(source) !== -1) {
                continue;
            }

            if (!FUNDING_CONFIG.hasOwnProperty(source)) {
                throw new Error(`Invalid funding source: ${ source }`);
            }

            if (!getFundingConfig(source, 'allowOptOut')) {
                throw new Error(`Can not disallow funding source: ${ source }`);
            }
        }
    }
}
