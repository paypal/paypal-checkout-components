/* @flow */

/**
 * iOS injects popup bridge installed-state as a boolean, while Android's
 * addJavascriptInterface can surface the same member as a callable bridge getter.
 * Normalize both shapes at the JS SDK boundary.
 */
export function readPopupBridgeBoolean(value: mixed, owner?: mixed): boolean {
  if (typeof value === "function") {
    try {
      // eslint-disable-next-line flowtype/no-weak-types
      const callable = (value: any);
      return Boolean(owner ? callable.call(owner) : callable());
    } catch (_) {
      return false;
    }
  }

  return Boolean(value);
}
