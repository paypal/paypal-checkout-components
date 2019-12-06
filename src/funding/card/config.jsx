/* @flow */
/** @jsx node */

import { node, Fragment } from 'jsx-pragmatic/src';
import { CARD, FUNDING, COUNTRY, COMPONENTS } from '@paypal/sdk-constants/src';
import { GlyphCard } from '@paypal/sdk-logos';

import { BUTTON_LAYOUT, BUTTON_COLOR, DEFAULT, CLASS, ATTRIBUTE } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig, type CardConfig } from '../common';
import { Text } from '../../ui';

import { getVisaConfig } from './visa';
import { getMastercardConfig } from './mastercard';
import { getAmexConfig } from './amex';
import { getDiscoverConfig } from './discover';
import { getHiperConfig } from './hiper';
import { getEloConfig } from './elo';
import { getJCBConfig } from './jcb';

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

        maxCards: maxCardForCountry,

        vendors,

        colors: [
            BUTTON_COLOR.TRANSPARENT
        ],

        secondaryColors: {
            [ DEFAULT ]: BUTTON_COLOR.TRANSPARENT
        },

        handleClick: true,

        Logo: ({ onClick, nonce, blackButtonText }) => {
            return (
                <div>
                    <style
                        nonce={ nonce }
                        innerHTML={ `
                            #black-credit-card-button {
                                background: #000;
                                color: #fff;
                                font-size: 1.15em;
                            }

                            #black-credit-card-button img {
                                padding: 0 6px;
                                display: inline-block;
                                height: 1.3em;
                                vertical-align: middle;
                                padding: 0 6px;
                            }

                            .dom-ready #black-credit-card-button div {
                                -webkit-animation: show-text 1.0s 0s forwards;
                                -moz-animation:    show-text 1.0s 0s forwards;
                                -o-animation:      show-text 1.0s 0s forwards;
                                animation:         show-text 1.0s 0s forwards;
                                vertical-align: middle;
                                overflow: hidden;
                                display: inline-block;
                                max-width: 0%;
                                opacity: 0;
                                position: static;
                                visibility: visible;
                            }

                            #black-credit-card-button div {
                                position: absolute;
                                visibility: hidden;
                            }
                        ` } />
                    <button
                        type="button"
                        id="black-credit-card-button"
                        onClick={ event => onClick(event) }
                        class={ `${ CLASS.BUTTON }` }
                        { ...{
                            [ ATTRIBUTE.FUNDING_SOURCE ]: FUNDING.CARD
                        } }>
                        <GlyphCard />
                        <div>{ blackButtonText }</div>
                    </button>
                </div>
            );
        },

        Label: ({ logo }) => {
            return (
                <Fragment>
                    { logo }
                </Fragment>
            );
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
    };
}
