/* @flow */
/** @jsx node */

import { node, dom, type ChildType } from "@krakenjs/jsx-pragmatic/src";
import { FUNDING, CARD, FPTI_KEY } from "@paypal/sdk-constants/src";
import {
  popup,
  supportsPopups,
  writeElementToWindow,
} from "@krakenjs/belter/src";
import {
  assertSameDomain,
  type CrossDomainWindowType,
} from "@krakenjs/cross-domain-utils/src";
import { SpinnerPage } from "@paypal/common-components/src";
import { getLogger } from "@paypal/sdk-client/src";
import type { ZoidProps } from "@krakenjs/zoid/src";

import { DEFAULT_POPUP_SIZE } from "../checkout";
import { Buttons } from "../../ui";
import { type ButtonProps } from "../../ui/buttons/props";

import { isEagerOrderCreationEnabled } from "./util";

type PrerenderedButtonsProps = {|
  nonce: ?string,
  props: ZoidProps<ButtonProps>,
  onRenderCheckout: ({|
    win?: CrossDomainWindowType,
    fundingSource: $Values<typeof FUNDING>,
    card: ?$Values<typeof CARD>,
    hostedButtonId?: string,
  |}) => void,
|};

export function PrerenderedButtons({
  nonce,
  onRenderCheckout,
  props,
}: PrerenderedButtonsProps): ChildType {
  const eagerOrderCreation = isEagerOrderCreationEnabled(
    props.appSwitchWhenAvailable
  );
  let win;

  // State management for disabled prop
  const state = {
    disabled: props.disabled || false,
  };

  // Helper function to update disabled state
  const setDisabled = (disabled: boolean) => {
    state.disabled = disabled;

    // Update DOM synchronously to prevent race conditions
    if (typeof document !== "undefined") {
      const buttons = document.querySelectorAll('[data-button="true"]');
      buttons.forEach((button) => {
        if (disabled) {
          button.setAttribute("tabindex", "-1");
          button.setAttribute("aria-disabled", "true");
          button.classList.add("paypal-button-disabled");
        } else {
          button.setAttribute("tabindex", "0");
          button.setAttribute("aria-disabled", "false");
          button.classList.remove("paypal-button-disabled");
        }
      });
    }
  };

  // Call onInit with actions object
  if (props.onInit && typeof props.onInit === "function") {
    try {
      const actions = {
        disable: () => setDisabled(true),
        enable: () => setDisabled(false),
      };
      props.onInit({}, actions);
    } catch (err) {
      getLogger().error("oninit_error", { err: err.message });
    }
  }
  const handleClick = (
    // eslint-disable-next-line no-undef
    event: SyntheticInputEvent<HTMLInputElement>,
    {
      fundingSource,
      card,
    }: {|
      fundingSource: $Values<typeof FUNDING>,
      card: ?$Values<typeof CARD>,
    |}
  ) => {
    getLogger()
      .info("paypal_js_sdk_v5_button_prerender_click", {
        fundingSource,
        card,
        eagerOrderCreation: String(eagerOrderCreation),
        buttonsSessionID: props.buttonSessionID,
      })
      .track({
        [FPTI_KEY.BUTTON_SESSION_UID]: props.buttonSessionID,
        [FPTI_KEY.CONTEXT_TYPE]: "button_session_id",
        [FPTI_KEY.CONTEXT_ID]: props.buttonSessionID,
        [FPTI_KEY.TRANSITION]: "process_button_prerender_click",
        [FPTI_KEY.CHOSEN_FUNDING]: fundingSource,
      });

    if (eagerOrderCreation) {
      // Pass this click. The buttons are rendered in disabled state
      return;
    }

    if (fundingSource === FUNDING.VENMO || fundingSource === FUNDING.APPLEPAY) {
      // wait for button to load
    } else if (supportsPopups() && !props.merchantRequestedPopupsDisabled) {
      // remember the popup window to prevent showing a new popup window on every click in the prerender state
      if (!win || win.closed) {
        win = assertSameDomain(
          popup("", {
            width: DEFAULT_POPUP_SIZE.WIDTH,
            height: DEFAULT_POPUP_SIZE.HEIGHT,
          })
        );
      }

      const doc = window.document;

      const spinner = (<SpinnerPage nonce={nonce} />).render(dom({ doc }));

      writeElementToWindow(win, spinner);

      onRenderCheckout({
        win,
        fundingSource,
        card,
        hostedButtonId: props.hostedButtonId,
      });
    } else {
      onRenderCheckout({ fundingSource, card });
    }
  };

  return (
    <html>
      <body>
        {/* $FlowFixMe */}
        <Buttons
          {...props}
          onClick={handleClick}
          showLoadingSpinner={eagerOrderCreation}
          disabled={state.disabled}
        />
      </body>
    </html>
  );
}
