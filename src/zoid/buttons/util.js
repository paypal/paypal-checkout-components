/* @flow */
import {
  supportsPopups as userAgentSupportsPopups,
  isAndroid,
  isChrome,
  isIos,
  isIOS14,
  isSafari,
  type Experiment,
  isDevice,
  isTablet,
  getElement,
  isStandAlone,
  once,
  memoize,
} from "@krakenjs/belter/src";
import { send as postRobotSend } from "@krakenjs/post-robot/src";
import {
  getEnableFunding,
  getLogger,
  createExperiment,
  getFundingEligibility,
  getPlatform,
  getComponents,
  getEnv,
  getNamespace,
  getPayPalDomain,
  getFirstRenderExperiments,
} from "@paypal/sdk-client/src";
import { FUNDING, FPTI_KEY } from "@paypal/sdk-constants/src";
import { getRefinedFundingEligibility } from "@paypal/funding-components/src";

import type { Experiment as EligibilityExperiment } from "../../types";
import { BUTTON_FLOW, BUTTON_SIZE, BUTTON_LAYOUT } from "../../constants";
import type {
  ApplePaySessionConfigRequest,
  CreateBillingAgreement,
  CreateSubscription,
  ButtonProps,
  CreateVaultSetupToken,
} from "../../ui/buttons/props";
import { determineEligibleFunding } from "../../funding";
import { BUTTON_SIZE_STYLE } from "../../ui/buttons/config";

type DetermineFlowOptions = {|
  createBillingAgreement: CreateBillingAgreement,
  createSubscription: CreateSubscription,
  createVaultSetupToken: CreateVaultSetupToken,
|};

/**
 * log information about screen to debug. currently in use to test if sfvc logic triggers
 *
 * @param {string} key for logging
 */
const logNativeScreenInformation = once(() => {
  if (window) {
    const height = window.innerHeight;
    const outerHeight = window.outerHeight;
    const scale =
      Math.round((window.screen.width / window.innerWidth) * 100) / 100;
    const computedHeight = Math.round(height * scale);
    const ios14 = isIOS14();
    const standAlone = isStandAlone();

    getLogger()
      // $FlowFixMe - object is mixed values when this expects all of the same value types
      .info("sfvcScreenInformation", {
        computedHeight,
        height,
        ios14,
        outerHeight,
        scale,
        standAlone,
      });
  }
});

export function determineFlow(
  props: DetermineFlowOptions
): $Values<typeof BUTTON_FLOW> {
  if (props.createVaultSetupToken) {
    return BUTTON_FLOW.VAULT_WITHOUT_PURCHASE;
  } else if (props.createBillingAgreement) {
    return BUTTON_FLOW.BILLING_SETUP;
  } else if (props.createSubscription) {
    return BUTTON_FLOW.SUBSCRIPTION_SETUP;
  } else {
    return BUTTON_FLOW.PURCHASE;
  }
}

export function isSupportedNativeBrowser(): boolean {
  logNativeScreenInformation();

  if (typeof window === "undefined") {
    return false;
  }

  if (!userAgentSupportsPopups()) {
    return false;
  }

  if (isTablet()) {
    return false;
  }

  if (isIos() && isSafari()) {
    return true;
  }

  if (isAndroid() && isChrome()) {
    return true;
  }

  return false;
}

export function createVenmoExperiment(): ?Experiment {
  const enableFunding = getEnableFunding();
  const isEnableFundingVenmo =
    enableFunding && enableFunding.indexOf(FUNDING.VENMO) !== -1;

  const fundingEligibility = getFundingEligibility();
  const hasBasicVenmoEligibility =
    fundingEligibility &&
    fundingEligibility[FUNDING.VENMO] &&
    fundingEligibility[FUNDING.VENMO].eligible;
  const isEligibleForVenmoNative =
    isSupportedNativeBrowser() && !isEnableFundingVenmo;

  // basic eligibility must be true for venmo to be eligible for the experiments
  if (!hasBasicVenmoEligibility) {
    return;
  }

  if (isDevice()) {
    if (!isEligibleForVenmoNative) {
      return;
    }

    if (isIos() && isSafari()) {
      return createExperiment("enable_venmo_ios", 100);
    }

    if (isAndroid() && isChrome()) {
      return createExperiment("enable_venmo_android", 100);
    }
  } else {
    return createExperiment("enable_venmo_desktop", 100);
  }
}

export function getVenmoExperiment(): EligibilityExperiment {
  const experiment = createVenmoExperiment();

  const enableFunding = getEnableFunding();
  const isVenmoFundingEnabled =
    enableFunding && enableFunding.indexOf(FUNDING.VENMO) !== -1;
  const isNativeSupported = isSupportedNativeBrowser();
  const isExperimentEnabled = experiment && experiment.isEnabled();

  if (isDevice()) {
    return {
      enableVenmo: Boolean(
        (isExperimentEnabled || isVenmoFundingEnabled) && isNativeSupported
      ),
    };
  } else {
    return {
      enableVenmo: Boolean(isExperimentEnabled),
    };
  }
}

export function getRenderedButtons(
  props: ButtonProps
): $ReadOnlyArray<$Values<typeof FUNDING>> {
  const {
    fundingSource,
    onShippingChange,
    onShippingAddressChange,
    onShippingOptionsChange,
    hasShippingCallback,
    style = {},
    enableFunding = getEnableFunding(),
    fundingEligibility = getRefinedFundingEligibility(),
    experiment = getVenmoExperiment(),
    applePaySupport,
    supportsPopups = userAgentSupportsPopups(),
    supportedNativeBrowser = isSupportedNativeBrowser(),
    createBillingAgreement,
    createSubscription,
    createVaultSetupToken,
    displayOnly,
  } = props;

  const flow = determineFlow({
    createBillingAgreement,
    createSubscription,
    createVaultSetupToken,
  });
  const { layout } = style;
  const remembered = [];
  const platform = getPlatform();
  const components = getComponents();

  const renderedButtons = determineEligibleFunding({
    fundingSource,
    remembered,
    layout,
    platform,
    fundingEligibility,
    enableFunding,
    components,
    onShippingChange,
    onShippingAddressChange,
    onShippingOptionsChange,
    hasShippingCallback,
    flow,
    applePaySupport,
    supportsPopups,
    supportedNativeBrowser,
    experiment,
    displayOnly,
  });
  return renderedButtons;
}

export function applePaySession(): ?ApplePaySessionConfigRequest {
  try {
    if (!window.ApplePaySession) {
      return;
    }

    const convertErrorsFromUpdate = (update) => {
      return {
        ...update,
        errors: (update.errors || []).map(
          (error) =>
            new window.ApplePayError(
              error.code,
              error.contactField,
              error.message
            )
        ),
      };
    };

    return (version, request) => {
      const session = new window.ApplePaySession(version, request);
      const listeners = {};

      session.onvalidatemerchant = ({ validationURL }) => {
        listeners.validatemerchant({ validationURL });
      };

      session.onpaymentmethodselected = ({ paymentMethod }) => {
        listeners.paymentmethodselected({ paymentMethod });
      };

      session.onshippingmethodselected = ({ shippingMethod }) => {
        listeners.shippingmethodselected({ shippingMethod });
      };

      session.onshippingcontactselected = ({ shippingContact }) => {
        listeners.shippingcontactselected({ shippingContact });
      };

      session.onpaymentauthorized = ({ payment }) => {
        listeners.paymentauthorized({ payment });
      };

      // eslint-disable-next-line  unicorn/prefer-add-event-listener
      session.oncancel = () => {
        listeners.oncancel();
      };

      return {
        addEventListener: (name, handler) => {
          listeners[name] = handler;
        },
        completeMerchantValidation: (validatedSession) => {
          session.completeMerchantValidation(validatedSession);
        },
        completePaymentMethodSelection: (update) => {
          session.completePaymentMethodSelection(update);
        },
        completeShippingMethodSelection: (update) => {
          session.completeShippingMethodSelection(update);
        },
        completeShippingContactSelection: (update) => {
          const newUpdate = convertErrorsFromUpdate(update);
          session.completeShippingContactSelection(newUpdate);
        },
        completePayment: (update) => {
          const newUpdate = convertErrorsFromUpdate(update);
          session.completePayment(newUpdate);
        },
        begin: () => session.begin(),
        abort: () => session.abort(),
      };
    };
  } catch (e) {
    return undefined;
  }
}

export function getButtonExperiments(): EligibilityExperiment {
  return {
    ...getVenmoExperiment(),
    ...getFirstRenderExperiments(),
  };
}

export function getButtonSize(
  props: ButtonProps,
  container: string | HTMLElement | void
): string | void {
  if (!container) {
    return;
  }

  let containerWidth = 0;

  if (typeof container === "string") {
    const containerElement = document.querySelector(container);
    containerWidth = containerElement?.offsetWidth || 0;
  } else {
    containerWidth = getElement(container)?.offsetWidth;
  }

  const layout = props?.style?.layout || BUTTON_LAYOUT.HORIZONTAL;
  const numButtonsRendered = props?.renderedButtons?.length || 1;
  const { tiny, small, medium, large, huge } = BUTTON_SIZE_STYLE;

  if (containerWidth) {
    let buttonWidth = Math.min(containerWidth, 750);
    const spaceBetweenHorizontalButtons = 8;
    if (layout === BUTTON_LAYOUT.HORIZONTAL && numButtonsRendered === 2) {
      buttonWidth = (buttonWidth - spaceBetweenHorizontalButtons) / 2;
    }

    if (tiny.minWidth <= buttonWidth && buttonWidth <= tiny.maxWidth) {
      return BUTTON_SIZE.TINY;
    }

    if (small.minWidth < buttonWidth && buttonWidth <= small.maxWidth) {
      return BUTTON_SIZE.SMALL;
    }

    if (medium.minWidth < buttonWidth && buttonWidth <= medium.maxWidth) {
      return BUTTON_SIZE.MEDIUM;
    }

    if (large.minWidth < buttonWidth && buttonWidth <= large.maxWidth) {
      return BUTTON_SIZE.LARGE;
    }

    if (huge.minWidth < buttonWidth) {
      return BUTTON_SIZE.HUGE;
    }
  }
}

function buildModalBundleUrl(): string {
  let url = __PAYPAL_CHECKOUT__.__URI__.__MESSAGE_MODAL__;
  if (getEnv() === "sandbox") {
    url = url.replace("/js/", "/sandbox/");
  } else if (getEnv() === "stage" || getEnv() === "local") {
    url = url.replace("/js/", "/stage/");
  }
  return url;
}

export const getModal: (
  clientID: string,
  merchantID: $ReadOnlyArray<string> | void,
  buttonSessionID: string
) => Object = memoize(async (clientID, merchantID, buttonSessionID) => {
  try {
    const namespace = getNamespace();
    if (!window[namespace].MessagesModal) {
      // eslint-disable-next-line no-restricted-globals, promise/no-native
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.setAttribute("data-pp-namespace", namespace);
        script.src = buildModalBundleUrl();
        script.addEventListener("error", (err: Event) => {
          reject(err);
        });
        script.addEventListener("load", () => {
          document.body?.removeChild(script);
          resolve();
        });
        document.body?.appendChild(script);
      });
    }

    return window[namespace].MessagesModal({
      buttonSessionId: buttonSessionID,
      onApply: () =>
        getLogger()
          .info("button_message_modal_apply")
          .track({
            [FPTI_KEY.TRANSITION]: "button_message_modal_apply",
            [FPTI_KEY.STATE]: "BUTTON_MESSAGE",
            [FPTI_KEY.BUTTON_SESSION_UID]: buttonSessionID,
            [FPTI_KEY.CONTEXT_ID]: buttonSessionID,
            [FPTI_KEY.CONTEXT_TYPE]: "button_session_id",
            [FPTI_KEY.EVENT_NAME]: "modal_apply",
          })
          .flush(),
      account: `client-id:${clientID}`,
      merchantId: merchantID?.join(",") || undefined,
    });
  } catch (err) {
    // $FlowFixMe flow doesn't seem to understand that the reset function property exists on the function object itself
    getModal.reset();
    getLogger()
      .error("button_message_modal_fetch_error", { err })
      .track({
        err: err.message || "BUTTON_MESSAGE_MODAL_FETCH_ERROR",
        details: err.details,
        stack: JSON.stringify(err.stack || err),
      });
  }
});

export const sendPostRobotMessageToButtonIframe = ({
  eventName,
  payload,
}: // eslint-disable-next-line flowtype/require-exact-type
{
  eventName: string,
  payload: Object,
}) => {
  const iframes = document.querySelectorAll("iframe");

  // I don't understand why but trying to make iframes which is a NodeList
  // into an Iterable (so we could do a for..of loop or .forEach) is not
  // working. It ends up iterating over itself so instead of looping over the contents
  // of the NodeList you loop over the NodeList itself which is extremely unexpected
  // for..in works though :shrug: - Shane 11 Dec 2024
  for (let i = 0; i < iframes.length; i++) {
    if (iframes[i].name.includes("zoid__paypal_buttons")) {
      postRobotSend(iframes[i].contentWindow, eventName, payload, {
        domain: getPayPalDomain(),
      });
    }
  }
};
