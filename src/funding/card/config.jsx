/* @flow */
/** @jsx node */

import { node } from 'jsx-pragmatic/src';
import { CARD, FUNDING, COUNTRY } from '@paypal/sdk-constants/src';
import { LOGO_COLOR } from '@paypal/sdk-logos/src';

import { getGuestUrl } from '../../config';
import { BUTTON_LAYOUT, BUTTON_LABEL, BUTTON_COLOR } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, DEFAULT_LABEL_CONFIG, type FundingSourceConfig, type CardConfig } from '../common';

import { getVisaConfig } from './visa';
import { getMastercardConfig } from './mastercard';
import { getAmexConfig } from './amex';
import { getDiscoverConfig } from './discover';
import { getHiperConfig } from './hiper';
import { getEloConfig } from './elo';
import { getJCBConfig } from './jcb';

const CARD_PRIORITY : $ReadOnlyArray<$Values<typeof CARD>> = [
    CARD.VISA,
    CARD.MASTERCARD,
    CARD.AMEX,
    CARD.DISCOVER,
    CARD.HIPER,
    CARD.ELO,
    CARD.JCB
];

function getVendorConfig() : { [$Values<typeof CARD>] : ?CardConfig } {
    return {
        [ CARD.VISA ]:       (!__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.visa.eligible) ? getVisaConfig() : null,
        [ CARD.AMEX ]:       (!__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.amex.eligible) ? getAmexConfig() : null,
        [ CARD.MASTERCARD ]: (!__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.mastercard.eligible) ? getMastercardConfig() : null,
        [ CARD.DISCOVER ]:   (!__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.discover.eligible) ? getDiscoverConfig() : null,
        [ CARD.JCB ]:        (!__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.jcb.eligible) ? getJCBConfig() : null,
        [ CARD.ELO ]:        (!__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.elo.eligible) ? getEloConfig() : null,
        [ CARD.HIPER ]:      (!__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.hiper.eligible) ? getHiperConfig() : null
    };
}

export function getCardConfig() : FundingSourceConfig {

    const vendors = getVendorConfig();

    const maxCardForCountry = {
        [ COUNTRY.BR ]: 5
    };

    return {
        ...DEFAULT_FUNDING_CONFIG,

        url: getGuestUrl,
    
        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],
    
        defaultLabel: BUTTON_LABEL.CARD,

        maxCards: maxCardForCountry,

        vendors,
    
        labels: {
            [ BUTTON_LABEL.CARD ]: {
                ...DEFAULT_LABEL_CONFIG,
    
                Label: ({ fundingEligibility, locale, nonce }) => {
                    let maxCards = 4;
    
                    // $FlowFixMe
                    if (maxCardForCountry[locale.country]) {
                        // $FlowFixMe
                        maxCards = maxCardForCountry[locale.country];
                    }
    
                    return CARD_PRIORITY.map(name => {
    
                        const cardEligibility = fundingEligibility[FUNDING.CARD];
    
                        if (!cardEligibility) {
                            return null;
                        }
    
                        if (!cardEligibility.vendors[name] || !cardEligibility.vendors[name].eligible) {
                            return null;
                        }
    
                        const vendorConfig = vendors[name];
    
                        if (!vendorConfig) {
                            return null;
                        }
    
                        const { Logo } = vendorConfig;
                        
                        return (
                            <Logo
                                locale={ locale }
                                nonce={ nonce }
                            />
                        );
                    }).filter(Boolean).slice(0, maxCards);
                },
    
                defaultColor: BUTTON_COLOR.SILVER,
    
                colors: [
                    BUTTON_COLOR.TRANSPARENT
                ],
    
                logoColors:  {
                    [ BUTTON_COLOR.TRANSPARENT ]: LOGO_COLOR.BLACK
                },
    
                secondaryColors: {
                    [ BUTTON_COLOR.GOLD ]:       BUTTON_COLOR.TRANSPARENT,
                    [ BUTTON_COLOR.BLUE ]:       BUTTON_COLOR.TRANSPARENT,
                    [ BUTTON_COLOR.SILVER ]:     BUTTON_COLOR.TRANSPARENT,
                    [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_COLOR.TRANSPARENT
                }
            }
        }
    };
}
