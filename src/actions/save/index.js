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

export type SaveAction = (SaveActionConfig) => ({|
  type: "save",
  /* TODO: 
      - We need to define how paymentSourceDetails is typed here
  */
  save: ({|onError: (error: string) => void, paymentSourceDetails: CardDetails|}) => ZalgoPromise<void>,
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
    save: () => {
      return ZalgoPromise.try(() => {
        // basics for typing requirements. Implementation to come in next ticket.
      })
    }
  }
};
