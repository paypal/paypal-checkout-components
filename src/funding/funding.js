/* @flow */

import { ENV, CARD_PRIORITY, FUNDING, BUTTON_LAYOUT, FUNDING_ELIGIBILITY_REASON } from '../constants';
import type { LocaleType, FundingSource, FundingSelection, FundingList } from '../types';

import { getFundingConfig, getCardConfig, FUNDING_PRIORITY, FUNDING_CONFIG } from './config';

const fundingEligibilityReasons = [];

export function isFundingIneligible(source : FundingSource, { locale, funding, layout, commit, env } :
    { locale : LocaleType, funding : FundingSelection, layout : string, commit? : boolean, env : string }) : ?string {

    const isVertical = layout === BUTTON_LAYOUT.VERTICAL;
    const allowSecondary = getFundingConfig(source, isVertical ? 'allowVertical' : 'allowHorizontal');

    if (!allowSecondary) {
        return FUNDING_ELIGIBILITY_REASON.SECONDARY_DISALLOWED;
    }

    if (funding.disallowed.indexOf(source) !== -1 && getFundingConfig(source, 'allowOptOut')) {
        return FUNDING_ELIGIBILITY_REASON.OPT_OUT;
    }

    if (funding.disallowed.indexOf(source) !== -1 && source === FUNDING.VENMO) {
        return FUNDING_ELIGIBILITY_REASON.OPT_OUT;
    }
    if (funding.disallowed.indexOf(source) !== -1 && source === FUNDING.ITAU) {
        return FUNDING_ELIGIBILITY_REASON.OPT_OUT;
    }

    if (getFundingConfig(source, 'allowedCountries', [ locale.country ]).indexOf(locale.country) === -1) {
        return FUNDING_ELIGIBILITY_REASON.DISALLOWED_COUNTRY;
    }

    if (getFundingConfig(source, 'requireCommitAsTrue') && !commit) {
        return FUNDING_ELIGIBILITY_REASON.COMMIT_NOT_SET;
    }

    const allowedEnvs = getFundingConfig(source, 'allowedEnvs');
    if (allowedEnvs && allowedEnvs.indexOf(env) === -1) {
        return FUNDING_ELIGIBILITY_REASON.INVALID_ENV;
    }
}

export function isFundingAutoEligible(source : FundingSource, { locale, funding, layout } :
    { locale : LocaleType, funding : FundingSelection, layout : string }) : ?string {

    const isVertical = layout === BUTTON_LAYOUT.VERTICAL;

    if (isVertical && getFundingConfig(source, 'defaultVerticalCountries', []).indexOf(locale.country) !== -1) {
        return FUNDING_ELIGIBILITY_REASON.DEFAULT_COUNTRY;
    }

    if (getFundingConfig(source, 'default')) {
        return FUNDING_ELIGIBILITY_REASON.DEFAULT;
    }

    if (funding.allowed.indexOf(source) !== -1 && getFundingConfig(source, 'allowOptIn')) {
        return FUNDING_ELIGIBILITY_REASON.OPT_IN;
    }

    if (funding.remembered.indexOf(source) !== -1 && getFundingConfig(source, 'allowRemember')) {
        return FUNDING_ELIGIBILITY_REASON.REMEMBERED;
    }
}

export function isFundingEligible(source : FundingSource, { locale, funding, env, layout, selected, commit } :
    { locale : LocaleType, funding : FundingSelection, env : string, layout : string, selected? : string, commit : boolean }) : { eligible : boolean, reason : string } {

    if (selected && source === selected) {
        return { eligible: true, reason: FUNDING_ELIGIBILITY_REASON.PRIMARY };
    }

    if (!getFundingConfig(source, 'enabled')) {
        if (!(env === ENV.TEST && getFundingConfig(source, 'test'))) {
            return { eligible: false, reason: FUNDING_ELIGIBILITY_REASON.NOT_ENABLED };
        }
    }

    const ineligibleReason = isFundingIneligible(source, { locale, funding, layout, commit, env });

    if (ineligibleReason) {
        return { eligible: false, reason: ineligibleReason };
    }

    const autoEligibleReason = isFundingAutoEligible(source, { locale, funding, layout });

    if (autoEligibleReason) {
        return { eligible: true, reason: autoEligibleReason };
    }

    return { eligible: false, reason: FUNDING_ELIGIBILITY_REASON.NEED_OPT_IN };
}

export function determineEligibleFunding({ funding, selected, locale, env, layout, commit } :
    { funding : FundingSelection, selected : FundingSource, locale : LocaleType, env : string, layout : string, commit : boolean }) : FundingList {

    const reasons = {};

    const eligibleFunding = FUNDING_PRIORITY.filter(source => {
        const { eligible, reason } = isFundingEligible(source, { selected, locale, funding, env, layout, commit });
        reasons[source] = { eligible, reason, factors: { env, locale, layout } };
        return eligible;
    });

    fundingEligibilityReasons.push(reasons);

    eligibleFunding.splice(eligibleFunding.indexOf(selected), 1);
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
        for (const source of funding.allowed) {
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
        for (const source of funding.disallowed) {
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

export function logFundingEligibility() {
    fundingEligibilityReasons.forEach((reasons, i) => {
        console.log(`\nButton ${ i + 1 }:\n`); // eslint-disable-line no-console

        console.table(Object.keys(reasons).map(source => {  // eslint-disable-line no-console, compat/compat
            const { reason, eligible, factors } = reasons[source];

            return {
                'Funding':     source,
                'Reason':      reason,
                'Eligibility': eligible ? 'eligible' : 'ineligible',
                'Factors':     JSON.stringify(factors)
            };
        }));
    });
}
