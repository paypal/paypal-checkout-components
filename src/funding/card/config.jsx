/* @flow */
/** @jsx node */

import { node, Fragment } from 'jsx-pragmatic/src';
import { CARD, FUNDING, COUNTRY, COMPONENTS } from '@paypal/sdk-constants/src';

import { BUTTON_LAYOUT, BUTTON_LABEL, BUTTON_COLOR, DEFAULT, CLASS, ATTRIBUTE } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, DEFAULT_LABEL_CONFIG, type FundingSourceConfig, type CardConfig } from '../common';
import { Text } from '../../ui';

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
        [ CARD.VISA ]:       (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.card && __paypal_checkout__.serverConfig.fundingEligibility.card.vendors && __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.visa && __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.visa.eligible)) ? getVisaConfig() : null,
        [ CARD.AMEX ]:       (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.card && __paypal_checkout__.serverConfig.fundingEligibility.card.vendors && __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.amex && __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.amex.eligible)) ? getAmexConfig() : null,
        [ CARD.MASTERCARD ]: (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.card && __paypal_checkout__.serverConfig.fundingEligibility.card.vendors && __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.mastercard && __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.mastercard.eligible)) ? getMastercardConfig() : null,
        [ CARD.DISCOVER ]:   (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.card && __paypal_checkout__.serverConfig.fundingEligibility.card.vendors && __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.discover && __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.discover.eligible)) ? getDiscoverConfig() : null,
        [ CARD.JCB ]:        (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.card && __paypal_checkout__.serverConfig.fundingEligibility.card.vendors && __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.jcb && __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.jcb.eligible)) ? getJCBConfig() : null,
        [ CARD.ELO ]:        (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.card && __paypal_checkout__.serverConfig.fundingEligibility.card.vendors && __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.elo && __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.elo.eligible)) ? getEloConfig() : null,
        [ CARD.HIPER ]:      (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.card && __paypal_checkout__.serverConfig.fundingEligibility.card.vendors && __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.hiper && __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.hiper.eligible)) ? getHiperConfig() : null
    };
}

export function getCardConfig() : FundingSourceConfig {

    const vendors = getVendorConfig();

    const maxCardForCountry = {
        [ COUNTRY.BR ]: 5
    };

    return {
        ...DEFAULT_FUNDING_CONFIG,

        eligible: ({ components, fundingEligibility }) => {
            const hostedFieldsRequested = Boolean(components.indexOf(COMPONENTS.HOSTED_FIELDS) !== -1);
            const cardEligible = Boolean(fundingEligibility.card && fundingEligibility.card.eligible);
            const cardBranded = Boolean(fundingEligibility.card && fundingEligibility.card.branded);
            const cardVendors = fundingEligibility.card && fundingEligibility.card.vendors;

            const cardEligibleVendors = Object.keys(cardVendors || []).filter(vendor =>
                cardVendors[vendor] && cardVendors[vendor].eligible);

            if (cardEligibleVendors.length <= 0) {
                return false;
            }

            // If card is not eligible, never show card buttons
            if (!cardEligible) {
                return false;
            }

            // If card is branded, always show card buttons
            if (cardBranded) {
                return true;
            }
            
            // If hosted fields is requested, do not show card buttons
            if (hostedFieldsRequested) {
                return false;
            }

            // Otherwise default to show card buttons
            return true;
        },
        
        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],
    
        defaultLabel: BUTTON_LABEL.CARD,

        maxCards: maxCardForCountry,

        vendors,
    
        labels: {
            [ BUTTON_LABEL.CARD ]: {
                ...DEFAULT_LABEL_CONFIG,

                colors: [
                    BUTTON_COLOR.TRANSPARENT
                ],

                secondaryColors: {
                    [ DEFAULT ]: BUTTON_COLOR.TRANSPARENT
                },

                handleClick: true,
    
                Label: ({ fundingEligibility, locale, onClick }) => {
                    let maxCards = 4;
    
                    // $FlowFixMe
                    if (maxCardForCountry[locale.country]) {
                        maxCards = maxCardForCountry[locale.country];
                    }
    
                    return CARD_PRIORITY.map(name => {
    
                        const cardEligibility = fundingEligibility[FUNDING.CARD];

                        if (!cardEligibility || !cardEligibility.vendors || !cardEligibility.vendors[name] || !cardEligibility.vendors[name].eligible) {
                            return null;
                        }
    
                        const vendorConfig = vendors[name];
    
                        if (!vendorConfig) {
                            return null;
                        }
    
                        const { Label } = vendorConfig;
                        
                        return (
                            <div
                                class={ `${ CLASS.CARD } ${ CLASS.CARD }-${ name }` }
                                onClick={ event => onClick(event, { card: name }) }
                                tabindex='0'
                                role='button'
                                { ...{
                                    [ ATTRIBUTE.FUNDING_SOURCE ]: FUNDING.CARD,
                                    [ ATTRIBUTE.CARD ]:           name
                                } }
                            >
                                <Label />
                            </div>
                        );
                    }).filter(Boolean).slice(0, maxCards);
                },

                VaultLabel: ({ vendor, label } : { vendor? : $Values<typeof CARD>, label : string }) => {
                    if (!vendor) {
                        throw new Error(`Vendor required for card vault label`);
                    }

                    const vendorConfig = vendors[vendor];

                    if (!vendorConfig) {
                        throw new Error(`Could not find vendor config for ${ vendor }`);
                    }

                    const { Label } = vendorConfig;

                    return (
                        <Fragment>
                            <Label optional /> <Text className={ CLASS.VAULT_LABEL }>{ label }</Text>
                        </Fragment>
                    );
                }
            }
        }
    };
}
