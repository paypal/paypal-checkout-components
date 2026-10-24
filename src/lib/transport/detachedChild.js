/* @flow */

import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { getLogger } from "@paypal/sdk-client/src";
import {
  noop,
  stringifyError,
  parseQuery,
  undotify,
  isDefined,
  uniqueID,
} from "@krakenjs/belter/src";

import { getRelayChannelID, withTransport } from "./withTransport";
import { isOpenerLost } from "./openerWatch";

/**
 * PROTOTYPE: boot-time opener loss.
 *
 * zoid builds a popup's `window.xprops` from a payload that only the parent
 * window can supply (same-domain popups carry just a reference in
 * `window.name`; the data sits in the parent's memory). If the parent is gone
 * when the checkout popup boots, zoid's child registration throws and the
 * checkout app never gets xprops.
 *
 * This module is the recovery for that case, in the spirit of the v6 bridge:
 * it builds `window.xprops` from the popup's own URL and routes the callbacks
 * over the Firebase relay. It runs only when zoid has already failed, only
 * for popups that were given a `relayChannelID`, and only when the opener is
 * really gone, so it cannot affect a checkout that would otherwise work.
 *
 * What it can and cannot provide:
 *   - Data props: whatever the Checkout component put in the URL as
 *     `queryParam`s (see PROPS below).
 *   - Callbacks: the relayable ones (onApprove/onAuthorize, onCancel, onError, and the
 *     shipping callbacks unless `hasShippingCallback` is false).
 *   - NOT provided: `onAuth` does nothing (it carries a buyer access token,
 *     which is never relayed), so the parent gets no buyer token and
 *     client-side capture will fail. Zoid helpers (close, resize, ...) are
 *     local no-ops.
 */

const DETACHED_TAG = "paypal-checkout";

// zoid puts props in the popup URL with belter's `dotify` (nested objects as
// `a.b`, arrays as `a.0` / `a[]`, booleans and numbers as strings).
// `undotify` is its inverse and restores the types.
export function parseDetachedQuery(search: string): Object {
  return undotify(parseQuery(search.replace(/^\?/, "")));
}

// IDs can look numeric, and undotify turns numeric-looking strings into
// numbers, so read them back as strings.
function str(value: mixed): ?string {
  return isDefined(value) ? String(value) : undefined;
}

function bool(value: mixed, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function readLocale(query: Object): ?{| lang: string, country: string |} {
  const raw = query.locale && query.locale.x;

  if (typeof raw !== "string") {
    return undefined;
  }

  const [lang, country] = raw.split("_");
  return { lang, country };
}

// The stand-in for a callback's original value. It is never the one that
// runs: withTransport routes to the relay once the opener is lost, which is
// the only reason we are here. If it ever is called, fail loudly.
function unavailable(
  name: string,
): (...args: $ReadOnlyArray<mixed>) => ZalgoPromise<void> {
  return () =>
    ZalgoPromise.reject(
      new Error(`${name} is unavailable: this checkout lost its parent window`),
    );
}

export function buildDetachedXprops(query: Object): Object {
  const xprops: Object = {
    // Data props, from the popup URL.
    clientID: str(query.clientID),
    sessionID: str(query.sessionID),
    buttonSessionID: str(query.buttonSessionID),
    stickinessID: str(query.stickinessID),
    relayChannelID: str(query.relayChannelID),
    fundingSource: str(query.fundingSource),
    buyerCountry: str(query.buyerCountry),
    clientMetadataID: str(query["client-metadata-id"]),
    token: str(query.token),
    env: str(query.env),
    commit: bool(query.commit, true),
    branded: bool(query.branded, false),
    hasShippingCallback: bool(query.hasShippingCallback, true),
    enableFunding: Array.isArray(query.enableFunding)
      ? query.enableFunding.map(String)
      : [],
    locale: readLocale(query),
    // zoid's `country` prop holds the same locale object; the URL carries
    // only the country code, so rebuild it from `locale.x`.
    country: readLocale(query),
    sdkMeta: str(query.sdkMeta),
    version: str(query.version),
    standaloneFundingSource: str(query.standaloneFundingSource),
    hostedButtonId: str(query.hostedButtonId),
    smokeHash: str(query.smokeHash),
    // zoid's per-instance id is not in the URL. The per-checkout relay channel
    // id is the stable stand-in, so logs still correlate.
    uid: str(query.relayChannelID) || uniqueID(),

    // zoid helpers: local only. There is no parent to call.
    tag: DETACHED_TAG,
    isDetached: true,
    close: () => ZalgoPromise.try(() => window.close()),
    focus: () => ZalgoPromise.try(() => window.focus()),
    resize: () => ZalgoPromise.resolve(),
    show: () => ZalgoPromise.resolve(),
    hide: () => ZalgoPromise.resolve(),
    export: () => ZalgoPromise.resolve(),
    onProps: () => ({ cancel: noop }),
    getParent: () => null,
    getParentDomain: () => "",
    getSiblings: () => [],

    // Carries a buyer access token, which is never relayed. Resolve so the
    // checkout app's boot does not wait on it.
    onAuth: () => {
      getLogger().info("checkout_transport_detached_on_auth_skipped").flush();
      return ZalgoPromise.resolve();
    },
  };

  // Relayed callbacks. withTransport arms the opener watch and the eager
  // Firebase connection on first use, and sends every call over the relay.
  // Like the v6 bridge: onApprove and onCancel are always present, and the
  // shipping callbacks are present unless the URL says hasShippingCallback is
  // false. The button frame's relay peer treats a call for a callback the
  // merchant did not supply as a no-op.
  const approve = withTransport("onApprove", unavailable("onApprove"));
  xprops.onApprove = approve;
  xprops.onAuthorize = approve;
  xprops.onCancel = withTransport("onCancel", unavailable("onCancel"));

  const relayError: Function = withTransport("onError", unavailable("onError"));
  xprops.onError = (err) => {
    getLogger()
      .warn("checkout_transport_detached_on_error", {
        err: stringifyError(err),
      })
      .flush();

    return ZalgoPromise.try(() => relayError(err)).then(noop, noop);
  };

  if (xprops.hasShippingCallback) {
    for (const name of [
      "onShippingChange",
      "onShippingAddressChange",
      "onShippingOptionsChange",
    ]) {
      xprops[name] = withTransport(name, unavailable(name));
    }
  }

  return xprops;
}

/**
 * Called when creating the Checkout component threw. Returns a stand-in
 * component (enough for `paypal.Checkout.isChild()` and `xprops`) after
 * installing `window.xprops`, or null if this is not a detached boot, in
 * which case the caller rethrows the original error.
 */
export function recoverDetachedCheckout(err: mixed): ?Object {
  try {
    if (!getRelayChannelID() || !isOpenerLost()) {
      return null;
    }

    const xprops = buildDetachedXprops(
      parseDetachedQuery(window.location.search),
    );

    window.xprops = xprops;

    getLogger()
      .info("checkout_transport_detached_boot", {
        err: stringifyError(err),
        hasToken: Boolean(xprops.token),
        callbacks: Object.keys(xprops)
          .filter((key) => key.indexOf("on") === 0)
          .join(","),
      })
      .flush();

    return {
      xprops,
      isChild: () => true,
      canRenderTo: () => false,
      instances: [],
    };
  } catch (recoveryErr) {
    getLogger()
      .warn("checkout_transport_detached_boot_failed", {
        err: stringifyError(recoveryErr),
      })
      .flush();
    return null;
  }
}
