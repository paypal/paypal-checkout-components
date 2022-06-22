/* @flow */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { stringifyError } from '@krakenjs/belter/src';
import { COUNTRY, CURRENCY, FUNDING, CARD, INTENT, type FundingEligibilityType } from '@paypal/sdk-constants/src';

import { enableVault, getFundingEligibility } from '../api';
import { getLogger } from '../lib';
import { type CreateBillingAgreement, type CreateSubscription } from '../props';
import { INTEGRATION_ARTIFACT, PRODUCT_FLOW, USER_EXPERIENCE_FLOW } from '../constants';


type VaultAutoSetupEligibleProps = {|
    vault : boolean,
    clientAccessToken : ?string,
    createBillingAgreement : ?CreateBillingAgreement,
    createSubscription : ?CreateSubscription,
    fundingSource : $Values<typeof FUNDING>,
    clientID : string,
    merchantID : ?$ReadOnlyArray<string>,
    currency : $Values<typeof CURRENCY>,
    buyerCountry : $Values<typeof COUNTRY>,
    intent : $Values<typeof INTENT>,
    commit : boolean,
    disableFunding : ?$ReadOnlyArray<$Values<typeof FUNDING>>,
    disableCard : ?$ReadOnlyArray<$Values<typeof CARD>>
|};

type IsFundingSourceVaultableOptions = {|
    accessToken : string,
    fundingSource : $Values<typeof FUNDING>,
    clientID : string,
    merchantID : ?$ReadOnlyArray<string>,
    currency : $Values<typeof CURRENCY>,
    buyerCountry : $Values<typeof COUNTRY>,
    intent : $Values<typeof INTENT>,
    commit : boolean,
    vault : boolean,
    disableFunding : ?$ReadOnlyArray<$Values<typeof FUNDING>>,
    disableCard : ?$ReadOnlyArray<$Values<typeof CARD>>
|};

type EnableVaultSetupOptions = {|
    orderID : string,
    vault : boolean,
    clientAccessToken : ?string,
    fundingEligibility : FundingEligibilityType,
    fundingSource : $Values<typeof FUNDING>,
    createBillingAgreement : ?CreateBillingAgreement,
    createSubscription : ?CreateSubscription,
    clientID : string,
    merchantID : ?$ReadOnlyArray<string>,
    currency : $Values<typeof CURRENCY>,
    buyerCountry : $Values<typeof COUNTRY>,
    intent : $Values<typeof INTENT>,
    commit : boolean,
    disableFunding : ?$ReadOnlyArray<$Values<typeof FUNDING>>,
    disableCard : ?$ReadOnlyArray<$Values<typeof CARD>>,
    userIDToken : ?string,
    inline : ?boolean,
    userExperienceFlow : ?string,
    buttonSessionID : string
|};


function isFundingSourceVaultable({ accessToken, fundingSource, clientID, merchantID, buyerCountry, currency, commit, vault, intent, disableFunding, disableCard } : IsFundingSourceVaultableOptions) : ZalgoPromise<boolean> {
    return ZalgoPromise.try(() => {
        if (fundingSource !== FUNDING.PAYPAL) {
            return false;
        }

        return getFundingEligibility(`
                ${ fundingSource } {
                    vaultable
                }
            `, {
            accessToken, clientID, merchantID, buyerCountry, currency, commit, vault,
            intent, disableFunding, disableCard
        }).then(newFundingEligibility => {
            if (newFundingEligibility[fundingSource] && newFundingEligibility[fundingSource].vaultable) {
                return true;
            } else {
                return false;
            }
        });
    });
}

function isVaultAutoSetupEligible({ vault, clientAccessToken, createBillingAgreement, createSubscription, fundingSource,
    clientID, merchantID, buyerCountry, currency, commit, intent, disableFunding, disableCard } : VaultAutoSetupEligibleProps) : ZalgoPromise<boolean> {

    return ZalgoPromise.try(() => {
        if (!clientAccessToken) {
            return false;
        }

        if (createBillingAgreement || createSubscription) {
            return false;
        }

        if (vault) {
            return true;
        }

        return isFundingSourceVaultable({ accessToken: clientAccessToken, fundingSource, clientID, merchantID, buyerCountry, currency,
            commit, vault, intent, disableFunding, disableCard }).catch(err => {

            getLogger().warn('funding_vaultable_error', { err: stringifyError(err) });
            return false;
        });
    });
}

export function enableVaultSetup({ orderID, vault, clientAccessToken, createBillingAgreement, createSubscription, fundingSource,
    clientID, merchantID, buyerCountry, currency, commit, intent, disableFunding, disableCard, userIDToken, inline = false, userExperienceFlow, buttonSessionID } : EnableVaultSetupOptions) : ZalgoPromise<void> {

    return ZalgoPromise.try(() => {
        getLogger()
            .info(`vault_auto_setup_vault_${ vault.toString() }_id_token_${ userIDToken ? 'present' : 'not_present' }`)
            .flush();

        return isVaultAutoSetupEligible({ vault, clientAccessToken, createBillingAgreement, createSubscription, fundingSource,
            clientID, merchantID, buyerCountry, currency, commit, intent, disableFunding, disableCard });

    }).then(eligible => {
        if (eligible && clientAccessToken) {
            const experienceFlow = inline ? USER_EXPERIENCE_FLOW.INLINE : USER_EXPERIENCE_FLOW.INCONTEXT;
            return enableVault({
                orderID,
                clientAccessToken,
                fundingSource,
                integrationArtifact: INTEGRATION_ARTIFACT.PAYPAL_JS_SDK,
                userExperienceFlow:  userExperienceFlow ? userExperienceFlow : experienceFlow,
                productFlow:         PRODUCT_FLOW.SMART_PAYMENT_BUTTONS,
                buttonSessionID
            }).catch(err => {
                if (vault) {
                    throw err;
                }
            });
        }
    });
}
