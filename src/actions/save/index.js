/* @flow */

import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";

import { ValidationError } from "../../lib";

type SaveActionConfig = {|
  createVaultSetupToken: () => ZalgoPromise<string>,
  onApprove: ({| vaultSetupToken: string |}) => void,
|};

export type CreateSaveAction = (config: SaveActionConfig) => {|
  type: "SAVE",
  ...SaveActionConfig,
|};

/**
 * These are the input configurations required from the merchant.
 */
const REQUIRED_INPUTS = {
  onApprove: "function",
  createVaultSetupToken: "function",
};

const validateSaveConfig = (config: SaveActionConfig): void => {
  for (const [inputProp, inputType] of Object.entries(REQUIRED_INPUTS)) {
    if (!config[inputProp] || typeof config[inputProp] !== inputType) {
      throw new ValidationError(
        `Save action is missing the required '${inputProp}' callback`
      );
    }
  }
};

/**
 * Creating a Save action allows us to validate initial inputs from the merchant, and then return the resulting object.
 */
export const createSaveAction: CreateSaveAction = (config) => {
  validateSaveConfig(config);

  return {
    type: "SAVE",
    ...config,
  };
};
