/* @flow */

import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { getLogger, getEnv } from "@paypal/sdk-client/src";
import { ENV } from "@paypal/sdk-constants/src";
import { noop, stringifyError } from "@krakenjs/belter/src";

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
 *   - Callbacks: the relayable ones (onApprove/onAuthorize, onCancel, the
 *     shipping callbacks), present or absent as the parent said in the
 *     `hasOn*` URL flags.
 *   - NOT provided: `onAuth` does nothing (it carries a buyer access token,
 *     which is never relayed), so the parent gets no buyer token and
 *     client-side capture will fail. Zoid helpers (close, resize, ...) are
 *     local no-ops.
 *
 * Prototype gate: non-production only. Remove `isDetachedBootEnabled` to
 * enable it everywhere.
 */

const DETACHED_TAG = "paypal-checkout";

function isDetachedBootEnabled(): boolean {
  try {
    return getEnv() !== ENV.PRODUCTION;
  } catch (err) {
    return false;
  }
}

function readString(params: URLSearchParams, key: string): ?string {
  const value = params.get(key);
  return value === null ? undefined : value;
}

function readBoolean(
  params: URLSearchParams,
  key: string,
  fallback: boolean,
): boolean {
  const value = params.get(key);

  if (value === null) {
    return fallback;
  }

  return value === "true" || value === "1";
}

function readList(
  params: URLSearchParams,
  prefix: string,
): $ReadOnlyArray<string> {
  const values = [];

  params.forEach((value, key) => {
    if (key.indexOf(`${prefix}.`) === 0) {
      values.push(value);
    }
  });

  return values;
}

function readLocale(
  params: URLSearchParams,
): ?{| lang: string, country: string |} {
  const raw = params.get("locale.x");

  if (!raw) {
    return undefined;
  }

  const [lang, country] = raw.split("_");
  return { lang, country };
}

// The stand-in for a callback's original value. It is never the one that
// runs: withTransport routes to the relay once the opener is lost, which is
// the only reason we are here. If it ever is called, fail loudly.
function unavailable(name: string): () => ZalgoPromise<void> {
  return () =>
    ZalgoPromise.reject(
      new Error(`${name} is unavailable: this checkout lost its parent window`),
    );
}

export function buildDetachedXprops(params: URLSearchParams): Object {
  const xprops: Object = {
    // Data props, from the popup URL.
    clientID: readString(params, "clientID"),
    sessionID: readString(params, "sessionID"),
    buttonSessionID: readString(params, "buttonSessionID"),
    stickinessID: readString(params, "stickinessID"),
    relayChannelID: readString(params, "relayChannelID"),
    fundingSource: readString(params, "fundingSource"),
    buyerCountry: readString(params, "buyerCountry"),
    clientMetadataID: readString(params, "client-metadata-id"),
    token: readString(params, "token"),
    env: readString(params, "env"),
    commit: readBoolean(params, "commit", true),
    branded: readBoolean(params, "branded", false),
    hasShippingCallback: readBoolean(params, "hasShippingCallback", false),
    enableFunding: readList(params, "enableFunding"),
    locale: readLocale(params),

    // zoid helpers: local only. There is no parent to call.
    tag: DETACHED_TAG,
    isDetached: true,
    close: () => ZalgoPromise.try(() => window.close()),
    focus: () => ZalgoPromise.try(() => window.focus()),
    onError: (err) =>
      ZalgoPromise.try(() => {
        getLogger()
          .warn("checkout_transport_detached_on_error", {
            err: stringifyError(err),
          })
          .flush();
      }),
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
  // onApprove is always present; the rest only if the parent said so.
  const approve = withTransport("onApprove", unavailable("onApprove"));
  xprops.onApprove = approve;
  xprops.onAuthorize = approve;

  if (readBoolean(params, "hasOnCancel", true)) {
    xprops.onCancel = withTransport("onCancel", unavailable("onCancel"));
  }

  for (const [name, flag] of [
    ["onShippingChange", "hasOnShippingChange"],
    ["onShippingAddressChange", "hasOnShippingAddressChange"],
    ["onShippingOptionsChange", "hasOnShippingOptionsChange"],
  ]) {
    if (readBoolean(params, flag, false)) {
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
    if (!isDetachedBootEnabled() || !getRelayChannelID() || !isOpenerLost()) {
      return null;
    }

    // eslint-disable-next-line compat/compat
    const params = new URLSearchParams(window.location.search);
    const xprops = buildDetachedXprops(params);

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
