/* @flow */

import { values } from 'belter';

import { FUNDING, CARD, INTENT } from './constants';
import { FUNDING_CONFIG, CARD_CONFIG } from './config';

function isFundingEligible(funding : string, { country, intent, commit, vault } : { country : string, intent : string, commit : boolean, vault : boolean }) : boolean {

    let config = FUNDING_CONFIG[funding];

    if (!config.enabled) {
        return false;
    }

    if (config.countries && config.countries.indexOf(country) === -1) {
        return false;
    }

    if (config.intent && config.intent.indexOf(intent) === -1) {
        return false;
    }

    if (config.commit && config.commit.indexOf(commit) === -1) {
        return false;
    }

    if (config.vault && config.vault.indexOf(vault) === -1) {
        return false;
    }

    return true;
}

function isCardEligible(card : string, { country }) : boolean {
    if (CARD_CONFIG[country]) {
        return (CARD_CONFIG[country].indexOf(card) !== -1);
    }

    return (CARD_CONFIG.default.indexOf(card) !== -1);
}

// $FlowFixMe
export function getFundingEligibility({ country, intent, commit, vault } : { country : string, intent : string, commit : boolean, vault : boolean }) : Object {
    

    if (intent === INTENT.SALE) {
        intent = INTENT.CAPTURE;
    }

    let fundingEligibility = {};
    
    for (let funding of values(FUNDING)) {
        let eligibility = fundingEligibility[funding] = fundingEligibility[funding] || {};
        eligibility.eligible = isFundingEligible(funding, { country, intent, commit, vault });
        eligibility.guest = false;
        eligibility.remembered = false;
    }

    let cards = fundingEligibility[FUNDING.CARD];
    let vendors = cards.vendors = cards.vendors || {};

    cards.branded = true;

    for (let card of values(CARD)) {
        let cardEligibility = vendors[card] = vendors[card] || {};
        cardEligibility.eligible = isCardEligible(card, { country });
    }

    return fundingEligibility;
}
