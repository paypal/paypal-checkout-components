/* @flow */

import { objFilter, stringifyErrorMessage } from "@krakenjs/belter/src";

import { RELAYABLE } from "./constants";

const MAX_ERROR_MESSAGE_LENGTH = 500;

/**
 * Copy only the allowlisted keys of a relayed callback's FIRST argument. See
 * RELAYABLE for what is allowed and why.
 *
 * Anything not a plain object (null, arrays, strings...) and any name outside
 * RELAYABLE yields `{}`. Only own keys are copied.
 */
export function pickRelayable(name: string, data: mixed): { [string]: mixed } {
  if (name === "onError") {
    const message =
      typeof data === "string" ? data : stringifyErrorMessage(data);

    return { message: message.slice(0, MAX_ERROR_MESSAGE_LENGTH) };
  }

  // Own names only: `RELAYABLE["toString"]` is an inherited function.
  const allowed = RELAYABLE.hasOwnProperty(name) ? RELAYABLE[name] : null;

  if (!allowed || !data || typeof data !== "object" || Array.isArray(data)) {
    return {};
  }

  // $FlowFixMe[incompatible-variance] narrowed to a non-array object above
  return objFilter(data, (value, key) => allowed.indexOf(key) !== -1);
}
