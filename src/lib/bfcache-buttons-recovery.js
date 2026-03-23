/* @flow */
/*
 * Bfcache recovery for PayPal Buttons.
 * WebKit/Safari back-forward restore can leave stale sandbox/overlay DOM while
 * Zoid's state no longer matches the page; we listen for pageshow + persisted,
 * remove ghosts, close instances, and re-render from a registry of last-known props/containers.
 *
 * Only buttons are re-rendered; overlays (PayPalAppSwitchOverlay) are intentionally
 * removed without recreation because the checkout flow that spawned them is no
 * longer active after the user navigated back.
 */

import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { getLogger } from "@paypal/sdk-client/src";

type CacheRecoveryRegistryEntry = {|
  propsInput: Object,
  container: mixed,
  context: mixed,
  instance: {|
    render: (mixed, mixed) => ZalgoPromise<void>,
    close: () => ZalgoPromise<void>,
  |},
|};

type ButtonsFactory = (propsInput?: Object) => Object;

const LOG_EVENT_PREFIX = "bfcache_recovery";
const SANDBOX_CLASS = "paypal-checkout-sandbox";
const IGNORED_FACTORY_PROPS = new Set(["length", "name", "prototype"]);

const registry: CacheRecoveryRegistryEntry[] = [];
let buttonsFactory: ButtonsFactory | null = null;
let pageshowListenerInstalled = false;
let cacheRecoveryInProgress = false;

function noop() {
  /* Empty on purpose: .catch(noop) and ignored detach errors. */
}

function logInfo(event: string, dimensions?: { [string]: mixed }) {
  getLogger()
    .info(`${LOG_EVENT_PREFIX}_${event}`)
    .metricCounter({
      namespace: `${LOG_EVENT_PREFIX}.${event}.count`,
      event: "info",
      dimensions,
    });
}

function logError(event: string, err: mixed) {
  getLogger()
    .error(`${LOG_EVENT_PREFIX}_${event}`, { err })
    .metricCounter({
      namespace: `${LOG_EVENT_PREFIX}.${event}.count`,
      event: "error",
    });
}

function escapeQuerySelectorId(id: string): string {
  try {
    if (window && window.CSS && typeof window.CSS.escape === "function") {
      return window.CSS.escape(id);
    }
  } catch (e) {
    noop(); // Fall through to regex escape.
  }

  return id.replace(/([^\w-])/g, "\\$1");
}

// After bfcache, stale DOM references may not match the live node; re-query by id.
function resolveToLiveElement(element: mixed): mixed {
  if (!document) {
    return element;
  }

  // eslint-disable-next-line flowtype/no-weak-types
  const node: any = element;
  const id = typeof node?.id === "string" ? node.id : undefined;
  if (!id) {
    return element;
  }

  try {
    const elementBySelector = document.querySelector(
      `#${escapeQuerySelectorId(id)}.${SANDBOX_CLASS}`
    );
    if (elementBySelector) {
      return elementBySelector;
    }

    const elementById = document.getElementById(id);
    if (elementById?.classList?.contains(SANDBOX_CLASS)) {
      return elementById;
    }
  } catch (e) {
    noop(); // Fall through to return original element.
  }

  return element;
}

// Prefer remove(), fall back to parent's removeChild() for older browsers.
function removeNode(element: mixed) {
  // eslint-disable-next-line flowtype/no-weak-types
  const node: any = element;
  if (!node || typeof node !== "object") {
    return;
  }

  if (typeof node.remove === "function") {
    try {
      node.remove();
      return;
    } catch (e) {
      noop();
    }
  }

  try {
    if (node.parentNode && typeof node.parentNode.removeChild === "function") {
      node.parentNode.removeChild(node);
    }
  } catch (e) {
    noop();
  }
}

// Remove ghost sandboxes/overlays so clicks work and recovery re-renders do not stack.
// The overlay selector catches nodes that may not carry the sandbox class.
function removeStaleNodes() {
  if (!document) {
    return;
  }

  const seen = new Set();
  const selectors = [`.${SANDBOX_CLASS}`, '[id^="paypal-overlay-"]'];

  for (const selector of selectors) {
    const nodes = document.querySelectorAll(selector);
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes.item(i);
      if (node && !seen.has(node)) {
        seen.add(node);
        removeNode(node);
      }
    }
  }
}

function copyFactoryDescriptors(from: Object, to: Object) {
  for (const key of Object.getOwnPropertyNames(from)) {
    if (IGNORED_FACTORY_PROPS.has(key)) {
      continue;
    }
    const descriptor = Object.getOwnPropertyDescriptor(from, key);
    if (descriptor) {
      Object.defineProperty(to, key, descriptor);
    }
  }
}

// Close registered instances, strip DOM, replay renders from a snapshot.
// Snapshot avoids skips/double-closes from async registry mutation.
// Per-instance catch isolates failures so one broken entry does not block the rest.
function recoverAfterBfcacheRestore(): ZalgoPromise<void> | void {
  const Buttons = buttonsFactory;
  if (!Buttons || !registry.length) {
    return;
  }

  if (cacheRecoveryInProgress) {
    logInfo("skipped");
    return;
  }

  cacheRecoveryInProgress = true;
  const snapshot = [...registry];
  const dimensions = { entryCount: String(snapshot.length) };

  logInfo("start", dimensions);

  return ZalgoPromise.all(
    snapshot.map(({ instance }) =>
      instance.close().catch((err) => logError("close_error", err))
    )
  )
    .then(() => {
      removeStaleNodes();
      return ZalgoPromise.all(
        snapshot.map(({ propsInput, container, context }) =>
          ZalgoPromise.try(() =>
            Buttons(propsInput).render(container, context)
          ).catch((err) => {
            logError("render_error", err);
            return null;
          })
        )
      );
    })
    .then((results) => {
      const renderCount = results.filter(Boolean).length;
      logInfo("finished", {
        ...dimensions,
        renderCount: String(renderCount),
      });
    })
    .catch((err) => logError("unexpected", err))
    .finally(() => {
      cacheRecoveryInProgress = false;
    });
}

export function withBfCacheRecovery(Buttons: ButtonsFactory): ButtonsFactory {
  const Wrapped = (propsInput?: Object) => {
    // $FlowFixMe[incompatible-call]
    const instance = Buttons(propsInput);
    const originalRender = instance.render.bind(instance);
    const originalClose = instance.close.bind(instance);

    instance.render = (container, context) =>
      originalRender(container, context).then(() => {
        const entry = {
          propsInput: propsInput || {},
          container,
          context,
          instance,
        };
        const index = registry.findIndex((e) => e.instance === instance);
        if (index === -1) {
          registry.push(entry);
        } else {
          registry[index] = entry;
        }
      });

    instance.close = () =>
      originalClose().finally(() => {
        for (let i = registry.length - 1; i >= 0; i--) {
          if (registry[i].instance === instance) {
            registry.splice(i, 1);
            break;
          }
        }
      });

    return instance;
  };

  copyFactoryDescriptors(Buttons, Wrapped);
  buttonsFactory = Wrapped;

  if (!pageshowListenerInstalled && window) {
    pageshowListenerInstalled = true;
    window.addEventListener("pageshow", (event: mixed) => {
      // $FlowFixMe[prop-missing]
      // eslint-disable-next-line flowtype/no-weak-types
      if (event && (event: any).persisted) {
        logInfo("pageshow");
        recoverAfterBfcacheRestore();
      }
    });
  }

  return Wrapped;
}
