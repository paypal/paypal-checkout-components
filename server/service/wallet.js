/* @flow */

import { COUNTRY, CURRENCY, INTENT, COMMIT, VAULT, CARD, FUNDING } from '@paypal/sdk-constants';
import { params, types, query } from 'typed-graphqlify';
import { values } from 'belter';

import type { Wallet } from '../../src/types';
import { type GraphQLBatch } from '../lib';
import type { ExpressRequest, LoggerType } from '../types';

type SmartWallet = {|
    funding_options : $ReadOnlyArray<{|
        funding_sources : $ReadOnlyArray<{|
            primary_instrument : boolean,
            one_click_pay_allowed : boolean,
            logo_url? : string,
            credit? : {|
                id : string,
                type : string
            |},
            payment_card? : {|
                id : string,
                type : string,
                number : string
            |},
            bank_account? : {|
                id : string,
                account_number : string
            |},
            amount? : {|
                value : string,
                currency : string
            |}
        |}>
    |}>
|};

export type GetWallet = (ExpressRequest, {|
    clientID : string,
    merchantID : ?$ReadOnlyArray<string>,
    buyerAccessToken : string,
    amount? : ?string,
    currency : $Values<typeof CURRENCY>
|}) => Promise<SmartWallet>;

function buildVaultQuery() : string {
    const InputTypes = {
        $clientID:        'String',
        $buyerCountry:    'CountryCodes',
        $ip:              'String',
        $cookies:         'String',
        $currency:        'SupportedCountryCurrencies',
        $intent:          'FundingEligibilityIntent',
        $commit:          'Boolean',
        $vault:           'Boolean',
        $disableFunding:  '[ SupportedPaymentMethodsType ]',
        $disableCard:     '[ SupportedCardsType ]',
        $merchantID:      '[ String ]',
        $buttonSessionID: 'String',
        $userAgent:       'String'
    };

    const Inputs = {
        clientId:        '$clientID',
        buyerCountry:    '$buyerCountry',
        ip:              '$ip',
        cookies:         '$cookies',
        currency:        '$currency',
        intent:          '$intent',
        commit:          '$commit',
        vault:           '$vault',
        disableFunding:  '$disableFunding',
        disableCard:     '$disableCard',
        merchantId:      '$merchantID',
        buttonSessionId: '$buttonSessionID',
        userAgent:       '$userAgent'
    };

    const getVaultedInstrumentQuery = () => {
        return {
            id:    types.string,
            label: {
                description: types.string
            }
        };
    };

    const getBasicCardVendorQuery = () => {
        return {
            vaultedInstruments: getVaultedInstrumentQuery()
        };
    };

    const getVendorQuery = () => {
        return {
            [CARD.VISA]:       getBasicCardVendorQuery(),
            [CARD.MASTERCARD]: getBasicCardVendorQuery(),
            [CARD.AMEX]:       getBasicCardVendorQuery(),
            [CARD.DISCOVER]:   getBasicCardVendorQuery(),
            [CARD.HIPER]:      getBasicCardVendorQuery(),
            [CARD.ELO]:        getBasicCardVendorQuery(),
            [CARD.JCB]:        getBasicCardVendorQuery()
        };
    };

    const getPayPalQuery = () => {
        return {
            vaultedInstruments: getVaultedInstrumentQuery()
        };
    };

    const getCardQuery = () => {
        return {
            vendors:  getVendorQuery()
        };
    };

    const fundingQuery = {
        [ FUNDING.PAYPAL ]: getPayPalQuery(),
        [ FUNDING.CARD ]:   getCardQuery()
    };

    return query('GetFundingEligibility', params(InputTypes, {
        fundingEligibility: params(Inputs, fundingQuery)
    }));
}

export type WalletOptions = {|
    logger : LoggerType,
    clientID : string,
    buyerCountry : ?$Values<typeof COUNTRY>,
    currency : $Values<typeof CURRENCY>,
    intent : $Values<typeof INTENT>,
    commit : $Values<typeof COMMIT>,
    vault : $Values<typeof VAULT>,
    disableFunding : $ReadOnlyArray<?$Values<typeof FUNDING>>,
    disableCard : $ReadOnlyArray<?$Values<typeof CARD>>,
    merchantID : ?$ReadOnlyArray<string>,
    buttonSessionID : string,
    clientAccessToken : ?string,
    buyerAccessToken : ?string,
    amount : ?string
|};

// eslint-disable-next-line complexity
export async function resolveWallet(req : ExpressRequest, gqlBatch : GraphQLBatch, getWallet : GetWallet, { logger, clientID, merchantID, buttonSessionID,
    currency, intent, commit, vault, disableFunding, disableCard, clientAccessToken, buyerCountry, buyerAccessToken, amount } : WalletOptions) : Promise<Wallet> {

    const wallet : Wallet = {
        paypal: {
            instruments: []
        },
        card: {
            instruments: []
        },
        bank: {
            instruments: []
        }
    };

    try {
        const ip = req.ip;
        const cookies = req.get('cookie') || '';
        const userAgent = req.get('user-agent') || '';

        intent = intent ? intent.toUpperCase() : intent;
        // $FlowFixMe
        disableFunding = disableFunding ? disableFunding.map(source => source.toUpperCase()) : disableFunding;
        // $FlowFixMe
        disableCard = disableCard ? disableCard.map(source => source.toUpperCase()) : disableCard;

        const [ buyerVault, smartWallet ] = await Promise.all([
            gqlBatch({
                query:     buildVaultQuery(),
                variables: {
                    clientID, merchantID, buyerCountry, cookies, ip, currency, intent, commit,
                    vault, disableFunding, disableCard, userAgent, buttonSessionID
                },
                accessToken: clientAccessToken
            }),

            buyerAccessToken ? getWallet(req, { clientID, merchantID, buyerAccessToken, amount, currency }) : null
        ]);

        if (buyerVault && buyerVault.paypal && buyerVault.paypal.vaultedInstruments) {
            for (const vaultedInstrument of buyerVault.paypal.vaultedInstruments) {
                wallet.paypal.instruments = [
                    ...wallet.paypal.instruments,
                    {
                        funding:  FUNDING.PAYPAL,
                        tokenID:  vaultedInstrument.id,
                        label:    vaultedInstrument.label.description,
                        oneClick: true
                    }
                ];
            }
        }

        if (buyerVault && buyerVault.card) {
            for (const card of values(CARD)) {
                const vendorVault = buyerVault.card.vendors[card];

                if (vendorVault && vendorVault.vaultedInstruments) {
                    for (const vaultedInstrument of vendorVault.vaultedInstruments) {
                        wallet.card.instruments = [
                            ...wallet.card.instruments,
                            {
                                funding:  FUNDING.CARD,
                                vendor:   card,
                                tokenID:  vaultedInstrument.id,
                                label:    vaultedInstrument.label.description,
                                oneClick: true
                            }
                        ];
                    }
                }
            }
        }

        if (smartWallet) {
            for (const fundingOption of smartWallet.funding_options) {
                if (fundingOption.funding_sources.length !== 1) {
                    continue;
                }

                const fundingSource = fundingOption.funding_sources[0];
                const { one_click_pay_allowed = false } = fundingSource;

                let instrument;

                if (fundingSource.credit) {
                    instrument = {
                        funding:      FUNDING.CREDIT,
                        instrumentID: fundingSource.credit.id,
                        oneClick:     one_click_pay_allowed
                    };
                } else if (fundingSource.payment_card) {
                    instrument = {
                        funding:      FUNDING.CARD,
                        label:        `••••${ fundingSource.payment_card.number }`,
                        instrumentID: fundingSource.payment_card.id,
                        logoUrl:      fundingSource.logo_url,
                        oneClick:     one_click_pay_allowed
                    };
                } else if (fundingSource.bank_account) {
                    instrument = {
                        funding:      FUNDING.BANK || 'bank',
                        label:        fundingSource.bank_account.account_number,
                        instrumentID: `••••${ fundingSource.bank_account.id }`,
                        logoUrl:      fundingSource.logo_url,
                        oneClick:     one_click_pay_allowed
                    };
                }

                if (instrument) {
                    wallet.paypal.instruments = [
                        ...wallet.paypal.instruments,
                        instrument
                    ];
                }
            }
        }

        return wallet;

    } catch (err) {
        logger.error(req, 'wallet_error_fallback', { err: err.stack ? err.stack : err.toString() });
        return wallet;
    }
}
