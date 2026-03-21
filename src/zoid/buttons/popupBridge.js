/* @flow */

/**
 * iOS injects popup bridge installed-state as a boolean, while Android's
 * addJavascriptInterface can surface the same member as a callable bridge getter.
 * Normalize both shapes at the JS SDK boundary.
 */
export function readPopupBridgeBoolean(value: mixed): boolean {
  if (typeof value === "function") {
    try {
      return Boolean(value());
    } catch (_) {
      return false;
    }
  }

  return Boolean(value);
}
