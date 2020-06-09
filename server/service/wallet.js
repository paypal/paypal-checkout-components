/* @flow */

import { COUNTRY, CURRENCY, INTENT, COMMIT, VAULT, CARD, FUNDING, WALLET_INSTRUMENT } from '@paypal/sdk-constants';
import { params, types, query } from 'typed-graphqlify';
import { values } from 'belter';


import type { Wallet } from '../../src/types';
import { type GraphQLBatch } from '../lib';
import type { ExpressRequest, LoggerType } from '../types';


type SmartWallet = {|
    payer? : {|
        email_address? : string
    |},
    funding_options : $ReadOnlyArray<{|
        funding_sources : $ReadOnlyArray<{|
            logo_url? : string,
            credit? : {|
                id : string
            |},
            card? : {|
                id : string,
                last_n_chars : string
            |},
            bank_account? : {|
                id : string,
                last_n_chars : string
            |},
            balance? : {|
                id : string
            |},
            one_click_pay_allowed? : boolean
        |}>,
        one_click_eligibility : {|
            eligible : boolean,
            ineligible_reason? : string
        |}
    |}>
|};

export type GetWallet = (ExpressRequest, {|
    clientID : string,
    merchantID : ?$ReadOnlyArray<string>,
    buyerAccessToken : string,
    amount : string,
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

    logger.info(req, 'resolve_wallet');

    const wallet : Wallet = {
        paypal: {
            instruments: []
        },
        credit: {
            instruments: []
        },
        card: {
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

            (buyerAccessToken && amount)
                ? getWallet(req, { clientID, merchantID, buyerAccessToken, amount, currency }) : null
        ]);

        if (buyerVault && buyerVault.paypal && buyerVault.paypal.vaultedInstruments) {
            for (const vaultedInstrument of buyerVault.paypal.vaultedInstruments) {
                logger.info(req, 'resolve_vault_paypal', { oneClick: 'true' });

                wallet.paypal.instruments = [
                    ...wallet.paypal.instruments,
                    {
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
                        logger.info(req, 'resolve_vault_card', { oneClick: 'true' });

                        wallet.card.instruments = [
                            ...wallet.card.instruments,
                            {
                                type:     WALLET_INSTRUMENT.CARD,
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
                const one_click_pay_allowed =
                    fundingSource.one_click_pay_allowed ||
                    (fundingOption.one_click_eligibility && fundingOption.one_click_eligibility.eligible) ||
                    false;

                const one_click_reason = fundingOption.one_click_eligibility &&
                    fundingOption.one_click_eligibility.ineligible_reason;

                const email = (smartWallet.payer && smartWallet.payer.email_address);

                const { credit, card, bank_account, balance, logo_url } = fundingSource;
                let instrument;

                if (credit) {
                    logger.info(req, 'resolve_wallet_credit', {
                        oneClick: one_click_pay_allowed.toString(),
                        one_click_reason });

                    instrument = {
                        type:         WALLET_INSTRUMENT.CREDIT,
                        instrumentID: credit.id,
                        label:        email,
                        oneClick:     one_click_pay_allowed
                    };

                    wallet.paypal.instruments = [
                        ...wallet.paypal.instruments,
                        instrument
                    ];

                    wallet.credit.instruments = [
                        ...wallet.credit.instruments,
                        instrument
                    ];

                } else if (card) {
                    logger.info(req, 'resolve_wallet_card', {
                        oneClick: one_click_pay_allowed.toString(),
                        one_click_reason
                    });

                    instrument = {
                        type:         WALLET_INSTRUMENT.CARD,
                        instrumentID: card.id,
                        label:        `••••${ card.last_n_chars }`,
                        logoUrl:      logo_url,
                        oneClick:     one_click_pay_allowed
                    };

                    wallet.paypal.instruments = [
                        ...wallet.paypal.instruments,
                        instrument
                    ];

                } else if (bank_account) {
                    logger.info(req, 'resolve_wallet_bank', {
                        oneClick: one_click_pay_allowed.toString(),
                        one_click_reason
                    });

                    instrument = {
                        type:         WALLET_INSTRUMENT.BANK,
                        instrumentID: bank_account.id,
                        label:        `••••${ bank_account.last_n_chars }`,
                        logoUrl:      logo_url,
                        oneClick:     one_click_pay_allowed
                    };

                    wallet.paypal.instruments = [
                        ...wallet.paypal.instruments,
                        instrument
                    ];
                } else if (balance) {
                    logger.info(req, 'resolve_wallet_balance', {
                        oneClick: one_click_pay_allowed.toString(),
                        one_click_reason
                    });

                    instrument = {
                        type:         WALLET_INSTRUMENT.BALANCE,
                        instrumentID: balance.id,
                        label:        email,
                        oneClick:     one_click_pay_allowed
                    };

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
