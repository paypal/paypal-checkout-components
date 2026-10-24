/* @flow */

/**
 * Wire and policy constants for the pluggable xprops transport.
 *
 * The Firebase-facing values (envelope shape, app names, message names, RTDB
 * path, CDN script URLs) are an interop contract with smartcomponentnodeweb's
 * `messageSocket` (client/smart-payment-buttons/src/api/socket.js). Changing
 * one here without changing it there silently drops messages.
 */

/** How often the popup checks that its opener is still there. */
export const OPENER_POLL_MS = 500;

/**
 * Which functions may travel over the relay, and which keys of their FIRST
 * argument may travel with them.
 *
 * Positive selection, on purpose. A field added to a payload upstream does
 * not start being written to a third-party relay until someone adds it here.
 * Hard constraint from the Slack record (Ravi Shekhar, 2026-05-27; Greg Jopa,
 * 2026-06-10): no access tokens or other sensitive data over Firebase,
 * because it is publicly readable.
 *
 * Only the first argument is filtered. Later arguments are function stubs
 * (`actions`), which carry no data of their own.
 *
 * Field names are taken from smartcomponentnodeweb's own types, not guessed —
 * note they are inconsistent: `shipping_address` / `selected_shipping_option`
 * for onShippingChange but `shippingAddress` / `selectedShippingOption` for
 * the other two. A wrong name here silently drops the field.
 *
 * Deliberately absent:
 *   - `authCode`, `buyerAccessToken`, `facilitatorAccessToken`, and anything
 *     else token-bearing, from every payload.
 *   - `atomicsWaitingState` (opaque handoff state; unreviewed).
 *   - `vaultSetupToken` (onCancel; unreviewed).
 *   - onAuth: its whole purpose is to carry a buyer access token.
 *   - onComplete: the checkout app passes a buyer access token to it.
 *   - createOrder / createAuthCode: zoid memoizes these parent-side
 *     (`decorate: memoize`), and the function SCNW holds is the RAW one.
 *     Calling it directly over the relay would mint a second order.
 *   - zoid built-ins other than onError (close, focus, resize, show, hide,
 *     onProps, export, getParent...). zoid defines these; this package cannot
 *     wrap them without changing zoid. onError is the exception: the checkout
 *     component redeclares it with a `childDecorate` that wraps zoid's own.
 */
export const RELAYABLE: { [string]: $ReadOnlyArray<string> } = {
  onApprove: [
    "orderID",
    "payerID",
    "paymentID",
    "billingToken",
    "subscriptionID",
    "approveOnClose",
    "appName",
  ],
  onCancel: ["orderID", "paymentID", "billingToken"],
  // Terminal, like onApprove/onCancel. The error itself is reduced to its
  // message before it is relayed (see pickRelayable).
  onError: ["message"],
  onShippingChange: [
    "orderID",
    "paymentID",
    "paymentToken",
    "shipping_address",
    "selected_shipping_option",
    "amount",
    "forceRestAPI",
    "appName",
  ],
  onShippingAddressChange: [
    "orderID",
    "paymentID",
    "paymentToken",
    "shippingAddress",
    "amount",
    "errors",
  ],
  onShippingOptionsChange: [
    "orderID",
    "paymentID",
    "paymentToken",
    "selectedShippingOption",
    "options",
    "amount",
    "errors",
  ],
};

/**
 * How long a relayed call waits for the parent. Covers setup (CDN load, token
 * mint, auth) as well as the round trip, since the clock starts at the call.
 */
export const RPC_TIMEOUT_MS = 20 * 1000;

// --- Firebase / messageSocket interop --------------------------------------

export const FIREBASE_SCRIPTS = {
  APP: "https://www.paypalobjects.com/checkout/js/lib/firebase-app.js",
  AUTH: "https://www.paypalobjects.com/checkout/js/lib/firebase-auth.js",
  DATABASE:
    "https://www.paypalobjects.com/checkout/js/lib/firebase-database.js",
};

export const MESSAGE_TYPE = {
  REQUEST: ("request": "request"),
  RESPONSE: ("response": "response"),
};

export const RESPONSE_STATUS = {
  SUCCESS: ("success": "success"),
  ERROR: ("error": "error"),
};

export const APP = {
  CHECKOUT: "paypal_checkout",
  SMART_PAYMENT_BUTTONS: "paypal_smart_payment_buttons",
};

// websdknodeweb's relay token endpoint. The version segment only has to match
// `v:major.:minor.:patch`; the route does not use it. Relative on purpose, see
// getFirebaseSessionToken.js.
export const RELAY_SESSION_TOKEN_PATH = "/web-sdk/v6.0.0/relay/session-token";

// Named Firebase app for the relay, so it never collides with a default app
// the checkout page may have initialized itself (a second `initializeApp` on
// the default app with a different config throws). Independent of the app
// names smartcomponentnodeweb uses in its own frame.
export const RELAY_FIREBASE_APP_NAME = "paypal_checkout_relay";

export const FIREBASE_MESSAGES_PATH = (sessionUID: string): string =>
  `users/${sessionUID}/messages`;
