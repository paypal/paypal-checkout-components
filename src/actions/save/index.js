/* @flow */
import { ValidationError } from "../../lib"
type SaveActionConfig = {|
  // eslint-disable-next-line no-restricted-globals, promise/no-native
  createVaultSetupToken: () => Promise<string>,
  onApprove: ({| vaultSetupToken: string |}) => void,
|};

export type SaveAction = (SaveActionConfig) => ({|
  type: "save",
  /* TODO: 
      - We need to define how paymentSourceDetails is typed here
      - Do we have another `onError` type from elsewhere we could reference here?
  */
  save: ({|onError: () => {}, paymentSourceDetails: any|}) => Promise<void>,
|});

/**
 * These are the input configurations required from the merchant.
 */
const REQUIRED_INPUTS = {
  onApprove: 'function',
  createVaultSetupToken: 'function'
}

const validateSaveConfig = (config: SaveActionConfig) => {
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
  const { createVaultSetupToken } = config;

  validateSaveConfig(config)

  return {
    type: "save",
    save: async () => {}
  }
};
