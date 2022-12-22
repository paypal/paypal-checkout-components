/* @flow */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { request } from '@krakenjs/belter/src';
import { getLogger, getPayPalDomain } from '@paypal/sdk-client/src';


import { ValidationError } from "../../lib"

type CardDetails = {|
  number: ?string,
  expiry: ?string,
  name?: ?string,
  security_code?: ?string,
  type?: string,
  postalCode?: ?string,
  billingAddress? : string,
|};

type SaveActionConfig = {|
  createVaultSetupToken: () => ZalgoPromise<string>,
  onApprove: ({| vaultSetupToken: string |}) => void,
|};

export type onErrorCallback = (error: string) => void

/* 
 * The onError function passed here is the `onError` callback provided to the component, e.g. Hosted Card Fields.
*/
export type SaveAction = (SaveActionConfig) => ({|
  type: "save",
  save: (onError: onErrorCallback, paymentSourceDetails: CardDetails) => ZalgoPromise<void>,
|});

/**
 * These are the input configurations required from the merchant.
 */
const REQUIRED_INPUTS = {
  onApprove: 'function',
  createVaultSetupToken: 'function'
}

const validateSaveConfig = (config: SaveActionConfig): void => {
  for (const [inputProp, inputType] of Object.entries(REQUIRED_INPUTS)) {
    if (!config[inputProp] || typeof config[inputProp] !== inputType) {
      throw new ValidationError(`Save action is missing the required '${inputProp}' callback`)  
    }
  }
}

/**
 * Creating a Save action allows us to validate initial inputs from the merchant, and then return the resulting object. 
 */
export const createSaveAction: SaveAction = (config: SaveActionConfig) => {
  validateSaveConfig(config)

  const logger = getLogger()

  return {
    type: "SAVE",
    save: (onError, paymentSourceDetails, lowScopedAccessToken) => {
      const { createVaultSetupToken, onApprove } = config;
    
      if (!onError || !paymentSourceDetails) {
        return ZalgoPromise.reject(new ValidationError("Missing args to #save"))
      }

      const handleError = (error) => {
        logger.error('pp_sdk_actions_save_error', stringifyError(error))
        onError(error.message)
      }

      return ZalgoPromise.try(() => {
        createVaultSetupToken()
        .then(({ vaultSetupToken }) => {
          // const vaultUrl = `${ getPayPalDomain() }/v3/vault/setup-tokens/${vaultSetupToken}/update`
          const vaultUrl = `https://msmaster.qa.paypal.com:18582/v3/vault/setup-tokens/${vaultSetupToken}/update`
          // call the vault api to update the setup token with our payment details
          return request({
            method: 'post',
            url: vaultUrl,
            headers: {
              // Figure out where we can get authToken
              'Authorization': `Basic ${lowScopedAccessToken}`,
              'Content-Type': 'application/json',
            },
            data: {
              'payment_source': {
                'card': {
                  // TODO validate paymentSourceDetails
                  ...paymentSourceDetails,
                  // TODO Determine source for ths part of the payload
                  'experience_context': {
                    'brand_name': 'YourBrandName',
                    'locale': 'en-US',
                    'return_url': 'https://example.com/returnUrl',
                    'cancel_url': 'https://example.com/cancelUrl'
                  }
                }
              }
            },
          }).then(({ body }) => {
            // check the response and do some validation
            if (!body || !body.status === 'APPROVED') {
              throw new Error('request was not approved')
            }
            onApprove({ setupToken: vaultSetupToken })

          }).catch(handleError)

          // take token and call our PP endpoint with it
        }).catch((/* error */) => {
          // TODO: Let's make sure we stringify this error safely/idiomatically - Do we define errors elsewhere?
          return handleError(new Error("Unable to retrieve setup token from 'createVaultSetupToken'"))
        })
      })  
    }
  }
};
