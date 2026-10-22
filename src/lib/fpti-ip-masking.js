/* @flow */

import { getLogger } from "@paypal/sdk-client/src";
import { type ZalgoPromise } from "@krakenjs/zalgo-promise/src";

// Every rendered surface is its own cross-origin iframe with its own logger,
// so unmasking one does not unmask the rest. Each component registers its
// own factory getter here once, at module load. When any surface reports
// buyer interaction, the unmask signal is pushed to every other live
// instance across all registered components.
//
// Per-instance tracking is NOT reimplemented here - zoid's own component
// factories already maintain a live `.instances` array (added/removed on
// render/destroy). This module only tracks which factory getters exist, so
// it knows which `.instances` arrays to walk; it never imports those zoid
// factories directly to avoid a circular import back to this file.
//
// Deliberately inexact: a registered getter's real return type (a zoid
// ZoidComponent/ZoidComponentInstance) has many more properties than these -
// this type only names the ones the relay actually uses.
/* eslint-disable flowtype/require-exact-type */
type ComponentGetter = () => {
  instances: $ReadOnlyArray<{ updateProps: (mixed) => ZalgoPromise<void> }>,
};
/* eslint-enable flowtype/require-exact-type */

const maskedComponentGetters: Array<ComponentGetter> = [];

let hasInteracted = false;
let isFlushing = false;

getLogger().addMetaBuilder(() => (hasInteracted ? {} : { maskIP: true }));

export function registerMaskedComponent(getComponent: ComponentGetter) {
  maskedComponentGetters.push(getComponent);
}

export function hasUserInteracted(): boolean {
  return hasInteracted;
}

export function notifyUserInteraction() {
  if (hasInteracted || isFlushing) {
    return;
  }
  isFlushing = true;

  getLogger()
    .immediateFlush()
    .then(() => {
      hasInteracted = true;

      maskedComponentGetters.forEach((getComponent) => {
        try {
          getComponent().instances.forEach((instance) => {
            instance.updateProps({ hasInteracted: true }).catch(() => {
              // instance was destroyed between interaction and relay; nothing to update
            });
          });
        } catch {
          // one component failing to construct must not block the relay to
          // every other registered component
        }
      });
    });
}

