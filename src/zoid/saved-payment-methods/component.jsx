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
  getComponents,
  getCorrelationID,
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
import {
  getRememberedFunding,
  getRefinedFundingEligibility,
  rememberFunding,
} from "@paypal/funding-components/src";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import {
  ENV,
  FPTI_KEY,
  FUNDING,
  SDK_SETTINGS,
} from "@paypal/sdk-constants/src";
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
  sessionState,
  storageState,
} from "../../lib";
import {
  getButtonColor,
  normalizeButtonMessage,
  normalizeButtonStyle,
} from "../../ui/buttons/props";
import {
  isSupportedNativeVenmoBrowser,
} from "../../funding/util";
import {
  getButtonExperiments,
  getButtonSize,
  getModal,
  isSupportedNativeBrowser,
  getRenderedButtons,
  sendPostRobotMessageToButtonIframe,
} from "../buttons/util";
import { PayPalAppSwitchOverlay } from "../../ui/overlay/paypal-app-switch/overlay";

import { containerTemplate } from "./container";
import { PrerenderedSavedPaymentMethods } from "./prerender";
import { type SavedPaymentMethodsProps } from "./props";
import { getSavedPaymentMethodsSize } from "./util";

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
      },

      dimensions: getSavedPaymentMethodsSize(),

      containerTemplate,

      // $FlowIssue mismatch between beaver-logger and zoid logger types
      logger: getLogger(),

      prerenderTemplate: ({ props, doc, event }) => {
        const { buttonSessionID } = props;

        event.on(EVENT.PRERENDERED, () => {
          getLogger()
            .info("saved_payment_methods_prerendered", {
              buttonSessionID,
            })
            .flush();
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

        appSwitchWhenAvailable: {
          type: "boolean",
          queryParam: true,
          required: false,
        },

        buttonColor: {
          type: "object",
          default: () => ({
            shouldApplyRebrandedStyles: false,
            color: "gold",
          }),
          queryParam: true,
          decorate: ({ props }) => {
            const { experiment, style, sessionID, fundingSource } = props;

            return getButtonColor({
              experiment,
              style,
              sessionID,
              storageState,
              fundingSource,
            });
          },
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

        // buttonSize: {
        //   type: "string",
        //   required: false,
        //   value: ({ props, container }) => {
        //     return getButtonSize(props, container);
        //   },
        //   queryParam: true,
        // },

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

        // commit: {
        //   type: "boolean",
        //   queryParam: true,
        //   value: getCommit,
        // },

        // components: {
        //   type: "array",
        //   queryParam: true,
        //   value: getComponents,
        // },

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
          value: __ENV__ === ENV.LOCAL ? undefined : getRefinedFundingEligibility,
          queryParam: true,
          serialization: "base64",
        },

        fundingSource: {
          type: "string",
          queryParam: true,
          required: false,
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

        hasShippingCallback: {
          type: "boolean",
          required: false,
          queryParam: true,
          value: ({ props }) => {
            return Boolean(
              props.onShippingChange ||
                props.onShippingAddressChange ||
                props.onShippingOptionsChange
            );
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

        hostedButtonId: {
          type: "string",
          required: false,
          queryParam: true,
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

        listenForHashChanges: {
          type: "function",
          queryParam: false,
          value:
            ({ props }) =>
            () => {
              window.addEventListener("hashchange", props.hashChangeHandler);
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
          decorate: ({ props, value }) => {
            const {
              style: { layout },
              renderedButtons: fundingSources,
            } = props;
            return normalizeButtonMessage(
              // $FlowFixMe
              value,
              layout,
              fundingSources
            );
          },
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
              phase: "buttons-first-render",
            });

            return (...args) => {
              return value(...args);
            };
          },
        },

        onMessageClick: {
          type: "function",
          required: false,
          value: ({ props }) => {
            return async ({
              offerType,
              messageType,
              offerCountryCode,
              creditProductIdentifier,
            }) => {
              const { message, clientID, currency, buttonSessionID, merchantID } =
                props;
              const amount = message?.amount;

              getLogger()
                .info("button_message_click")
                .track({
                  [FPTI_KEY.TRANSITION]: "button_message_click",
                  [FPTI_KEY.STATE]: "BUTTON_MESSAGE",
                  [FPTI_KEY.BUTTON_SESSION_UID]: buttonSessionID,
                  [FPTI_KEY.CONTEXT_ID]: buttonSessionID,
                  [FPTI_KEY.CONTEXT_TYPE]: "button_session_id",
                  [FPTI_KEY.EVENT_NAME]: "message_click",
                  [FPTI_KEY.BUTTON_MESSAGE_OFFER_TYPE]: offerType,
                  [FPTI_KEY.BUTTON_MESSAGE_CREDIT_PRODUCT_IDENTIFIER]:
                    creditProductIdentifier,
                  [FPTI_KEY.BUTTON_MESSAGE_TYPE]: messageType,
                  [FPTI_KEY.BUTTON_MESSAGE_POSITION]: message?.position,
                  [FPTI_KEY.BUTTON_MESSAGE_ALIGN]: message?.align,
                  [FPTI_KEY.BUTTON_MESSAGE_COLOR]: message?.color,
                  [FPTI_KEY.BUTTON_MESSAGE_OFFER_COUNTRY]: offerCountryCode,
                  [FPTI_KEY.BUTTON_MESSAGE_CURRENCY]: currency,
                  [FPTI_KEY.BUTTON_MESSAGE_AMOUNT]: amount,
                })
                .flush();

              const modalInstance = await getModal(
                clientID,
                merchantID,
                buttonSessionID
              );
              return modalInstance?.show({
                amount,
                offer: offerType,
                currency,
              });
            };
          },
        },

        onMessageHover: {
          type: "function",
          required: false,
          value: ({ props }) => {
            return () => {
              const { buttonSessionID, clientID, merchantID } = props;
              return getModal(clientID, merchantID, buttonSessionID);
            };
          },
        },

        onMessageReady: {
          type: "function",
          required: false,
          value: ({ props }) => {
            return ({
              offerType,
              messageType,
              offerCountryCode,
              creditProductIdentifier,
              merchantID: serverMerchantId,
            }) => {
              const { message, buttonSessionID, currency } = props;

              if (serverMerchantId) {
                getLogger().addTrackingBuilder(() => ({
                  [FPTI_KEY.SELLER_ID]: serverMerchantId,
                }));
              }

              getLogger()
                .info("button_message_render")
                .track({
                  [FPTI_KEY.TRANSITION]: "button_message_render",
                  [FPTI_KEY.STATE]: "BUTTON_MESSAGE",
                  [FPTI_KEY.BUTTON_SESSION_UID]: buttonSessionID,
                  [FPTI_KEY.CONTEXT_ID]: buttonSessionID,
                  [FPTI_KEY.CONTEXT_TYPE]: "button_session_id",
                  [FPTI_KEY.EVENT_NAME]: "message_render",
                  [FPTI_KEY.BUTTON_MESSAGE_OFFER_TYPE]: offerType,
                  [FPTI_KEY.BUTTON_MESSAGE_CREDIT_PRODUCT_IDENTIFIER]:
                    creditProductIdentifier,
                  [FPTI_KEY.BUTTON_MESSAGE_TYPE]: messageType,
                  [FPTI_KEY.BUTTON_MESSAGE_POSITION]: message?.position,
                  [FPTI_KEY.BUTTON_MESSAGE_ALIGN]: message?.align,
                  [FPTI_KEY.BUTTON_MESSAGE_COLOR]: message?.color,
                  [FPTI_KEY.BUTTON_MESSAGE_CURRENCY]: currency,
                  [FPTI_KEY.BUTTON_MESSAGE_OFFER_COUNTRY]: offerCountryCode,
                  [FPTI_KEY.BUTTON_MESSAGE_AMOUNT]: message?.amount,
                })
                .flush();
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

        preferences: {
          type: "object",
          queryParam: true,
          required: false,
          serialization: "json",
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

        redirect: {
          type: "function",
          sendToChild: true,
          value: () => (url) => {
            location.href = url;
          },
        },

        remember: {
          type: "function",
          value: () => {
            return (fundingSources: $ReadOnlyArray<$Values<typeof FUNDING>>) =>
              rememberFunding(fundingSources, { cookie: false });
          },
        },

        remembered: {
          type: "array",
          queryParam: true,
          value: getRememberedFunding,
        },

        removeListenerForHashChanges: {
          type: "function",
          queryParam: false,
          value:
            ({ props }) =>
            () => {
              window.removeEventListener("hashchange", props.hashChangeHandler);
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

        renderedButtons: {
          type: "array",
          queryParam: true,
          value: ({ props }) => getRenderedButtons(props),
        },

        sessionID: {
          type: "string",
          value: getSessionID,
          queryParam: true,
        },

        sessionState: {
          type: "object",
          value: () => sessionState,
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

        sdkSource: {
          type: "string",
          value: () => getSDKIntegrationSource(),
          required: false,
          queryParam: true,
        },

        sdkToken: {
          type: "string",
          required: false,
          value: getSDKToken,
        },

        sdkVersion: {
          type: "string",
          queryParam: true,
          sendToChild: false,
          value: getVersion,
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
          decorate: ({ props, value }) => {
            // $FlowFixMe
            return normalizeButtonStyle(props, value);
          },

          validate: ({ props, value = {} }) => {
            // $FlowFixMe
            normalizeButtonStyle(props, value);
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

        userAgent: {
          type: "string",
          required: false,
          queryParam: true,
          value: getUserAgent,
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
          queryParam: getEnv() !== ENV.LOCAL && getEnv() !== ENV.STAGE,
          bodyParam: getEnv() === ENV.LOCAL || getEnv() === ENV.STAGE,
        },

        vault: {
          type: "boolean",
          queryParam: true,
          value: getVault,
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

        wallet: {
          type: "object",
          required: false,
          default: () => window.__TEST_WALLET__,
        },
      },
    });
  });
