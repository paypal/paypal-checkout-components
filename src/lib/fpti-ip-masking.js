/* @flow */

import { getLogger } from "@paypal/sdk-client/src";

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
// The mask-on-init/flush-then-clear logic lives entirely here, scoped to
// this repo's own `getLogger()` singleton, rather than defaulting to masked
// inside the shared `@paypal/sdk-client` package itself. That package is
// used by other, unrelated consumers (for example checkout apps running on
// paypal.com/venmo.com) that have no reason to ever call an "interaction
// happened" signal - defaulting to masked at that shared layer would mask
// their events forever instead of just ours.
type ComponentGetter = () => {
  instances: $ReadOnlyArray<{ updateProps: (mixed) => Promise<void> }>,
};

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
        getComponent().instances.forEach((instance) => {
          instance.updateProps({ maskIP: false }).catch(() => {
            // instance was destroyed between interaction and relay; nothing to update
          });
        });
      });
    });
}

