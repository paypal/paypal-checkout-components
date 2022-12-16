/* @flow */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';

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

  return {
    type: "save",
    save: (onError, paymentSourceDetails) => {
      const { createVaultSetupToken } = config;
    
      if (!onError || !paymentSourceDetails) {
        return ZalgoPromise.reject(new ValidationError("Missing args to #save"))
      }

      return ZalgoPromise.try(() => {
        createVaultSetupToken()
        .then((/* emptySetupToken */) => {
          // take token and call our PP endpoint with it
        }).catch((/* error */) => {
          // TODO: Let's make sure we stringify this error safely/idiomatically - Do we define errors elsewhere?
          return onError("Unable to retrieve setup token from 'createVaultSetupToken'")
        })
      })  
    }
  }
};
