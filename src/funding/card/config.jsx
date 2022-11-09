/* @flow */
/** @jsx node */

import { node, Fragment } from '@krakenjs/jsx-pragmatic/src';
import { CARD, COUNTRY, COMPONENTS, FUNDING } from '@paypal/sdk-constants/src';
import { GlyphCard } from '@paypal/sdk-logos/src';

import { BUTTON_LAYOUT, BUTTON_COLOR, DEFAULT, BUTTON_FLOW } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig, type CardConfig } from '../common';
import { Text, Space } from '../../ui/text';
import { isRTLLanguage } from '../../lib';
import { WalletLabel } from '../paypal/template';

import { getVisaConfig } from './visa';
import { getMastercardConfig } from './mastercard';
import { getAmexConfig } from './amex';
import { getDiscoverConfig } from './discover';
import { getHiperConfig } from './hiper';
import { getEloConfig } from './elo';
import { getJCBConfig } from './jcb';

function getVendorConfig() : { [$Values<typeof CARD>] : ?CardConfig } {
    return {
        [ CARD.VISA ]:       (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.card && __FUNDING_ELIGIBILITY__.card.vendors && __FUNDING_ELIGIBILITY__.card.vendors.visa && __FUNDING_ELIGIBILITY__.card.vendors.visa.eligible)) ? getVisaConfig() : null,
        [ CARD.AMEX ]:       (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.card && __FUNDING_ELIGIBILITY__.card.vendors && __FUNDING_ELIGIBILITY__.card.vendors.amex && __FUNDING_ELIGIBILITY__.card.vendors.amex.eligible)) ? getAmexConfig() : null,
        [ CARD.MASTERCARD ]: (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.card && __FUNDING_ELIGIBILITY__.card.vendors && __FUNDING_ELIGIBILITY__.card.vendors.mastercard && __FUNDING_ELIGIBILITY__.card.vendors.mastercard.eligible)) ? getMastercardConfig() : null,
        [ CARD.DISCOVER ]:   (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.card && __FUNDING_ELIGIBILITY__.card.vendors && __FUNDING_ELIGIBILITY__.card.vendors.discover && __FUNDING_ELIGIBILITY__.card.vendors.discover.eligible)) ? getDiscoverConfig() : null,
        [ CARD.JCB ]:        (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.card && __FUNDING_ELIGIBILITY__.card.vendors && __FUNDING_ELIGIBILITY__.card.vendors.jcb && __FUNDING_ELIGIBILITY__.card.vendors.jcb.eligible)) ? getJCBConfig() : null,
        [ CARD.ELO ]:        (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.card && __FUNDING_ELIGIBILITY__.card.vendors && __FUNDING_ELIGIBILITY__.card.vendors.elo && __FUNDING_ELIGIBILITY__.card.vendors.elo.eligible)) ? getEloConfig() : null,
        [ CARD.HIPER ]:      (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.card && __FUNDING_ELIGIBILITY__.card.vendors && __FUNDING_ELIGIBILITY__.card.vendors.hiper && __FUNDING_ELIGIBILITY__.card.vendors.hiper.eligible)) ? getHiperConfig() : null
    };
}

export function getCardConfig() : FundingSourceConfig {

    const vendors = getVendorConfig();

    const maxCardForCountry = {
        [ COUNTRY.BR ]: 5
    };

    return {
        ...DEFAULT_FUNDING_CONFIG,

        eligible: ({ components, fundingSource, fundingEligibility, wallet }) => {
            const cardEligibility = fundingEligibility.card;

            const hostedFieldsRequested = Boolean(components.indexOf(COMPONENTS.HOSTED_FIELDS) !== -1);
            const cardEligible = Boolean(cardEligibility && cardEligibility.eligible);
            const cardBranded = Boolean(cardEligibility && cardEligibility.branded);
            const cardVaulted = Boolean(wallet && wallet.card && wallet.card.instruments && wallet.card.instruments.length);

            // If card is not eligible, never show card buttons
            if (!cardEligible) {
                return false;
            }

            // If card is branded, always show card buttons
            if (cardBranded) {
                return true;
            }

            // If there's a vaulted card, always show card button
            if (cardVaulted) {
                return true;
            }

            // If standalone card is selected, always show card button
            if (fundingSource === FUNDING.CARD) {
                return true;
            }
            
            // If hosted fields is requested, do not show card buttons
            if (hostedFieldsRequested) {
                return false;
            }
            
            // Otherwise default to show card buttons
            return true;
        },

        flows: [
            BUTTON_FLOW.PURCHASE,
            BUTTON_FLOW.BILLING_SETUP,
            BUTTON_FLOW.SUBSCRIPTION_SETUP
        ],
        
        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],

        maxCards: maxCardForCountry,

        vendors,

        colors: [
            BUTTON_COLOR.BLACK,
            BUTTON_COLOR.WHITE
        ],

        secondaryColors: {
            ...DEFAULT_FUNDING_CONFIG.secondaryColors,
            [ DEFAULT ]: BUTTON_COLOR.BLACK
        },

        logoColors: {
            [ BUTTON_COLOR.WHITE  ]:  BUTTON_COLOR.BLACK,
            [ DEFAULT ]:              BUTTON_COLOR.WHITE
        },
        
        labelText: ({ content }) => {
            if (!__WEB__ && content) {
                return content.payWithDebitOrCreditCard;
            }
            return FUNDING.CARD;
        },

        Logo: ({ logoColor }) => {
            return (
                <GlyphCard logoColor={ logoColor } />
            );
        },

        Label: ({ logo, locale, content, custom }) => {
            if (custom && custom.label && custom.label.length) {
                const validLabels = {
                    buy:                    'Buy',
                    checkout:               'Checkout',
                    pay:                    'Pay',
                    'buy now':              'Buy Now',
                    'pay now':              'Pay Now',
                    'checkout now':         'Checkout Now',
                    'proceed to checkout':  'Proceed to checkout'
                };

                let label = validLabels.checkout;

                const lowerCaseLabel = custom.label.toLowerCase();
                if (validLabels[lowerCaseLabel]) {
                    label = validLabels[lowerCaseLabel];
                }

                return (
                    <Fragment>
                        <Text>{ label }</Text>
                        <Space />
                    </Fragment>
                );
            }
            const { lang } = locale;
            const isRTL = isRTLLanguage(lang);
            return (
                <Fragment>
                    { (isRTL && !__WEB__ && content) ? (
                        <Fragment>
                            <Text animate optional>{ content.payWithDebitOrCreditCard }</Text>
                            <Space />
                        </Fragment>
                    ) : null }
                    { logo }
                    {(!isRTL && !__WEB__ && content) ? (
                        <Fragment>
                            <Space />
                            <Text animate optional>{ content.payWithDebitOrCreditCard }</Text>
                        </Fragment>
                    ) : null }
                </Fragment>
            );
        },

        WalletLabel,

        showWalletMenu: ({ instrument, userIDToken }) => {
            if (instrument.branded) {
                return false;
            } else {
                if (!instrument.tokenID?.match(/-/) && userIDToken) {
                    return false
                }

                return true;
            }
        }
    };
}
