/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import {
  getLogger,
  getLocale,
  getClientID,
  getEnv,
  getMerchantID,
  getPayPalDomainRegex,
  getSDKMeta,
  getCSPNonce,
  getPayPalDomain,
  getVersion,
  getCurrency,
  getUserIDToken,
  getAmount,
  getAPIStageHost,
  getBuyerCountry,
  getClientAccessToken,
  getClientMetadataID,
  getCommit,
  getCorrelationID,
  getCustomerId,
  getDebug,
  getDisableSetCookie,
  getExperimentation,
  getIntent,
  getJsSdkLibrary,
  getMerchantRequestedPopupsDisabled,
  getPartnerAttributionID,
  getPlatform,
  getSDKInitTime,
  getSDKIntegrationSource,
  getSDKToken,
  getStageHost,
  getStorageID,
  getUserExperienceFlow,
  getVault,
  getSDKAttribute,
} from "@paypal/sdk-client/src";
import { getRefinedFundingEligibility } from "@paypal/funding-components/src";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { ENV, FPTI_KEY, SDK_SETTINGS } from "@paypal/sdk-constants/src";
import { create, EVENT, type ZoidComponent } from "@krakenjs/zoid/src";
import {
  uniqueID,
  memoize,
  getUserAgent,
  noop,
  supportsPopups as userAgentSupportsPopups,
} from "@krakenjs/belter/src";
import { node, dom } from "@krakenjs/jsx-pragmatic/src";

import {
  getSessionID,
  logLatencyInstrumentationPhase,
  prepareInstrumentationPayload,
  sessionState,
  storageState,
} from "../../lib";
import {
  getButtonExperiments,
  isSupportedNativeBrowser,
  sendPostRobotMessageToButtonIframe,
} from "../buttons/util";
import { isSupportedNativeVenmoBrowser } from "../../funding/util";
import { PayPalAppSwitchOverlay } from "../../ui/overlay/paypal-app-switch/overlay";

import { containerTemplate } from "./container";
import { PrerenderedSavedPaymentMethods } from "./prerender";
import { type SavedPaymentMethodsProps } from "./props";
import { validateSavedPaymentMethodsStyle } from "./util";

export type SavedPaymentMethodsComponent = ZoidComponent<
  SavedPaymentMethodsProps,
  void,
  void,
  void
>;

// $FlowIssue
export const getSavedPaymentMethodsComponent: () => SavedPaymentMethodsComponent =
  memoize(() => {
    const queriedEligibleFunding = [];

    // $FlowIssue
    return create({
      tag: "paypal-saved-payment-methods",
      url: () =>
        `${getPayPalDomain()}${
          __PAYPAL_CHECKOUT__.__URI__.__SAVED_PAYMENT_METHODS__ ||
          "/smart/saved-payment-methods"
        }`,

      domain: getPayPalDomainRegex(),

      autoResize: {
        width: false,
        height: true,
        element: ".saved-payment-methods-container",
      },

      dimensions: {
        // TODO: Does this have any effect?
        width: "400px",
        height: "30px",
      },

      containerTemplate,

      // $FlowIssue mismatch between beaver-logger and zoid logger types
      logger: getLogger(),

      prerenderTemplate: ({ props, doc, event }) => {
        const { buttonSessionID } = props;

        event.on(EVENT.PRERENDERED, () => {
          logLatencyInstrumentationPhase({
            buttonSessionID,
            phase: "saved-payment-methods-first-render-end",
          });

          getLogger()
            .info("saved_payment_methods_prerendered", {
              buttonSessionID,
            })
            .flush();

          try {
            const cplPhases = prepareInstrumentationPayload(
              buttonSessionID,
              "saved-payment-methods"
            );
            const cplLatencyMetrics = {
              [FPTI_KEY.STATE]: "CPL_LATENCY_METRICS",
              [FPTI_KEY.TRANSITION]: "process_client_metrics",
              [FPTI_KEY.CONTEXT_ID]: buttonSessionID,
              [FPTI_KEY.PAGE]:
                "main:xo:paypal-components:saved-payment-methods",
              [FPTI_KEY.CPL_COMP_METRICS]: JSON.stringify(
                cplPhases?.comp || {}
              ),
            };
            getLogger().track(cplLatencyMetrics);
          } catch (err) {
            getLogger().track({
              err: err.message || "CPL_LOG_PHASE_ERROR",
              details: err.details,
              stack: JSON.stringify(err.stack || err),
            });
          }
        });

        return (
          <PrerenderedSavedPaymentMethods nonce={props.nonce} props={props} />
        ).render(dom({ doc }));
      },

      attributes: {
        iframe: {
          scrolling: "no",
          title: "PayPal Saved Payment Methods",
        },
      },

      props: {
        appSwitchWhenAvailable: {
          type: "boolean",
          queryParam: true,
          required: false,
        },

        preferences: {
          type: "object",
          queryParam: true,
          required: false,
          serialization: "json",
        },

        showPayPalAppSwitchOverlay: {
          type: "function",
          queryParam: false,
          value:
            ({ props: { buttonSessionID } }) =>
            ({ close, focus }) => {
              const overlay = (
                <PayPalAppSwitchOverlay
                  buttonSessionID={buttonSessionID}
                  close={close}
                  focus={focus}
                />
              ).render(dom({ doc: document }));

              document.body?.appendChild(overlay);
            },
        },

        hidePayPalAppSwitchOverlay: {
          type: "function",
          queryParam: false,
          value:
            ({ props: { buttonSessionID } }) =>
            ({ close }) => {
              const overlay = document.getElementsByName(
                `paypal-overlay-${buttonSessionID}`
              )?.[0];

              if (overlay) {
                close();
                overlay.remove();
              }
            },
        },

        redirect: {
          type: "function",
          sendToChild: true,
          value: () => (url) => {
            location.href = url;
          },
        },

        hashChangeHandler: {
          type: "function",
          sendToChild: false,
          queryParam: false,
          value: () => (event) => {
            sendPostRobotMessageToButtonIframe({
              eventName: "paypal-hashchange",
              payload: {
                url: event.newURL,
              },
            });
          },
        },

        visibilityChangeHandler: {
          type: "function",
          sendToChild: false,
          queryParam: false,
          value: () => () => {
            sendPostRobotMessageToButtonIframe({
              eventName: "paypal-visibilitychange",
              payload: {
                url: window.location.href,

                visibilityState: document.visibilityState,
              },
            });
          },
        },

        listenForVisibilityChange: {
          type: "function",
          queryParam: false,
          value:
            ({ props }) =>
            () => {
              window.addEventListener(
                "visibilitychange",
                props.visibilityChangeHandler
              );
            },
        },

        removeListenerForVisibilityChanges: {
          type: "function",
          queryParam: false,
          value:
            ({ props }) =>
            () => {
              window.removeEventListener(
                "visibilitychange",
                props.visibilityChangeHandler
              );
            },
        },

        // allowBillingPayments prop is used by Honey Extension to render the one-click button
        // with payment methods & to use the payment methods instead of the Billing Agreement
        allowBillingPayments: {
          type: "boolean",
          queryParam: true,
          required: false,
          default: () => true,
        },

        amount: {
          type: "string",
          required: false,
          queryParam: true,
          value: getAmount,
        },

        apiStageHost: {
          type: "string",
          value: getAPIStageHost,
          required: false,
        },

        buttonLocation: {
          type: "string",
          value: () => window.location.hostname,
          queryParam: false,
        },

        buttonSessionID: {
          type: "string",
          value: uniqueID,
          queryParam: true,
        },

        buyerCountry: {
          type: "string",
          queryParam: true,
          required: false,
          value: getBuyerCountry,
        },

        clientAccessToken: {
          type: "string",
          required: false,
          queryParam: true,
          value: getClientAccessToken,
        },

        customerId: {
          type: "string",
          required: false,
          queryParam: true,
          value: getCustomerId,
        },

        clientID: {
          type: "string",
          value: getClientID,
          queryParam: true,
        },

        clientMetadataID: {
          type: "string",
          required: false,
          default: () => {
            const clientMetadataId = getClientMetadataID();
            const sessionID = getSessionID();

            return clientMetadataId || sessionID;
          },
          queryParam: true,
        },

        commit: {
          type: "boolean",
          queryParam: true,
          value: getCommit,
        },

        createOrder: {
          type: "function",
          required: false,
        },

        csp: {
          type: "object",
          required: false,
          value: () => {
            return {
              nonce: getCSPNonce(),
            };
          },
        },

        currency: {
          type: "string",
          queryParam: true,
          value: getCurrency,
        },

        debug: {
          type: "boolean",
          value: getDebug,
          queryParam: true,
        },

        disableSetCookie: {
          type: "boolean",
          queryParam: true,
          required: false,
          value: getDisableSetCookie,
        },

        env: {
          type: "string",
          queryParam: true,
          value: getEnv,
        },

        experiment: {
          type: "object",
          queryParam: true,
          value: getButtonExperiments,
        },

        experimentation: {
          type: "object",
          queryParam: true,
          required: false,
          value: getExperimentation,
        },

        fundingEligibility: {
          type: "object",
          default: getRefinedFundingEligibility,
          value:
            __ENV__ === ENV.LOCAL ? undefined : getRefinedFundingEligibility,
          queryParam: true,
          serialization: "base64",
        },

        getPageUrl: {
          type: "function",
          value: () => {
            return () => window.location.href;
          },
        },

        getPopupBridge: {
          type: "function",
          required: false,
          value: () => {
            return () => {
              if (!window.popupBridge) {
                return;
              }

              return {
                nativeUrl: window.popupBridge.getReturnUrlPrefix(),
                start: (url) => {
                  return new ZalgoPromise((resolve, reject) => {
                    window.popupBridge.onComplete = (err, result) => {
                      if (!err && !result) {
                        resolve({
                          opType: "user_closed_window",
                        });
                      }
                      const queryItems =
                        result && result.queryItems ? result.queryItems : {};
                      return err ? reject(err) : resolve(queryItems);
                    };
                    window.popupBridge.open(url);
                  });
                },
              };
            };
          },
        },

        getPrerenderDetails: {
          type: "function",
          value:
            ({ state }) =>
            () =>
              state.prerenderDetails,
        },

        getQueriedEligibleFunding: {
          type: "function",
          value: () => {
            return () => queriedEligibleFunding;
          },
        },

        intent: {
          type: "string",
          queryParam: true,
          value: getIntent,
        },

        jsSdkLibrary: {
          type: "string",
          queryParam: true,
          required: false,
          value: getJsSdkLibrary,
        },

        locale: {
          type: "object",
          queryParam: true,
          value: getLocale,
        },

        merchantID: {
          type: "array",
          queryParam: true,
          value: getMerchantID,
        },

        merchantRequestedPopupsDisabled: {
          type: "boolean",
          required: false,
          value: getMerchantRequestedPopupsDisabled,
        },

        message: {
          type: "object",
          queryParam: true,
          required: false,
        },

        nonce: {
          type: "string",
          default: getCSPNonce,
        },

        onApprove: {
          type: "function",
          required: false,
        },

        onCancel: {
          type: "function",
          required: false,
        },

        onClick: {
          type: "function",
          required: false,
        },

        onComplete: {
          type: "function",
          required: false,
        },

        onError: {
          // TODO: Is it necessary? Not present in buttons
          type: "function",
          required: false,
        },

        onInit: {
          type: "function",
          required: false,
          default: () => noop,
          decorate: ({ props, value = noop }) => {
            logLatencyInstrumentationPhase({
              buttonSessionID: props.buttonSessionID,
              phase: "saved-payment-methods-first-render",
            });

            return (...args) => {
              return value(...args);
            };
          },
        },

        onShippingAddressChange: {
          type: "function",
          required: false,
        },

        onShippingOptionsChange: {
          type: "function",
          required: false,
        },

        hasShippingCallback: {
          type: "boolean",
          required: false,
          queryParam: true,
          value: ({ props }) => {
            return Boolean(
              props.onShippingAddressChange || props.onShippingOptionsChange
            );
          },
        },

        pageType: {
          type: "string",
          required: false,
          queryParam: true,
          value: () => getSDKAttribute(SDK_SETTINGS.PAGE_TYPE),
        },

        partnerAttributionID: {
          type: "string",
          required: false,
          value: getPartnerAttributionID,
        },

        paymentMethodNonce: {
          type: "string",
          queryParam: true,
          required: false,
        },

        paymentMethodToken: {
          type: "string",
          queryParam: true,
          required: false,
        },

        paymentRequest: {
          type: "object",
          queryParam: false,
          required: false,
        },

        platform: {
          type: "string",
          queryParam: true,
          value: getPlatform,
        },

        referrerDomain: {
          type: "string",
          required: false,
          value: () => {
            if (window.document.referrer) {
              return new URL(window.document.referrer).host || undefined;
            }
          },
        },

        sessionID: {
          type: "string",
          value: getSessionID,
          queryParam: true,
        },

        sdkCorrelationID: {
          type: "string",
          required: false,
          value: getCorrelationID,
          queryParam: true,
        },

        sdkInitTimings: {
          type: "object",
          queryParam: false,
          required: false,
          value: () => {
            // eslint-disable-next-line compat/compat
            const sdkScript = window?.performance
              ?.getEntriesByType("resource")
              // eslint-disable-next-line security/detect-unsafe-regex
              .find(({ name }) => /paypal\.com(?::\d+)?\/sdk\/js/.test(name));

            const isCached = (performanceEntry) => {
              if (
                !performanceEntry ||
                typeof performanceEntry.duration === "undefined"
              ) {
                return "unknown";
              }

              return performanceEntry.duration === 0 ? "yes" : "no";
            };

            let sdkInitTimeStamp;

            try {
              sdkInitTimeStamp = getSDKInitTime();
            } catch (error) {
              // do nothing
            }

            return {
              sdkInitTimeStamp,
              sdkScriptDownloadDuration: sdkScript?.duration,
              isSdkCached: isCached(sdkScript),
            };
          },
        },

        sdkMeta: {
          type: "string",
          queryParam: true,
          sendToChild: false,
          value: getSDKMeta,
        },

        sdkToken: {
          type: "string",
          required: false,
          value: getSDKToken,
        },

        /**
         * Version of the SDK used in first render.
         * This is passed to the `/smart/buttons` endpoint in order for the second render
         * to be aware of what sdk version to load during SSR of the buttons
         */
        sdkVersion: {
          type: "string",
          queryParam: true,
          sendToChild: false,
          value: getVersion,
        },

        sessionState: {
          type: "object",
          value: () => sessionState,
        },

        stageHost: {
          type: "string",
          value: getStageHost,
          required: false,
        },

        storageID: {
          type: "string",
          value: getStorageID,
          queryParam: true,
        },

        storageState: {
          type: "object",
          value: () => storageState,
        },

        style: {
          type: "object",
          queryParam: true,
          required: false,

          validate: ({ value = {} }) => {
            validateSavedPaymentMethodsStyle(value);
          },

          default: () => ({}),
        },

        supportedNativeBrowser: {
          type: "boolean",
          value: isSupportedNativeBrowser,
          queryParam: true,
        },

        supportedNativeVenmoBrowser: {
          type: "boolean",
          value: ({ props }) => {
            return isSupportedNativeVenmoBrowser(
              props.experiment,
              props.userAgent
            );
          },
          queryParam: true,
          required: false,
        },

        supportsPopups: {
          type: "boolean",
          value: () => {
            return userAgentSupportsPopups();
          },
          queryParam: true,
        },

        test: {
          type: "object",
          default(): Object {
            return {
              action: "checkout",
            };
          },
        },

        userExperienceFlow: {
          type: "string",
          required: false,
          value: getUserExperienceFlow,
        },

        userIDToken: {
          type: "string",
          default: getUserIDToken,
          required: false,
          queryParam: true,
        },

        sdkSource: {
          type: "string",
          value: () => getSDKIntegrationSource(),
          required: false,
          queryParam: true,
        },

        vault: {
          type: "boolean",
          queryParam: true,
          value: getVault,
        },

        userAgent: {
          type: "string",
          required: false,
          queryParam: true,
          value: getUserAgent,
        },
      },
    });
  });
