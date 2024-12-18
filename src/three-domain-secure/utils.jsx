/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { node, dom } from "@krakenjs/jsx-pragmatic/src";
import { create, type ZoidComponent } from "@krakenjs/zoid/src";
import { inlineMemoize, noop } from "@krakenjs/belter/src";
import {
  getCSPNonce,
  getClientID,
  getSDKMeta,
  getPayPalDomainRegex,
} from "@paypal/sdk-client/src";

import { Overlay } from "../ui/overlay";

import type { TDSProps } from "./types";

export type TDSComponent = ZoidComponent<TDSProps>;

export function getFastlaneThreeDS(): TDSComponent {
  return inlineMemoize(getFastlaneThreeDS, () => {
    const component = create({
      tag: "fastlane-threeds",
      url: ({ props }) => props.payerActionUrl,

      attributes: {
        iframe: {
          scrolling: "no",
        },
      },

      containerTemplate: ({
        context,
        focus,
        close,
        frame,
        prerenderFrame,
        doc,
        event,
        props,
      }) => {
        return (
          <Overlay
            context={context}
            // $FlowFixMe
            close={props.onCancel || close}
            focus={focus}
            event={event}
            frame={frame}
            prerenderFrame={prerenderFrame}
            content={props.content}
            nonce={props.nonce}
          />
        ).render(dom({ doc }));
      },
      domain: getPayPalDomainRegex(),
      props: {
        payerActionUrl: {
          type: "string",
        },
        clientID: {
          type: "string",
          value: getClientID,
          queryParam: true,
        },
        onSuccess: {
          type: "function",
          alias: "onContingencyResult",
          decorate: ({ value, onError }) => {
            return (err, result) => {
              if (err) {
                return onError(err);
              }

              return value(result);
            };
          },
        },
        content: {
          type: "object",
          required: false,
        },
        nonce: {
          type: "string",
          default: getCSPNonce,
        },
        onCancel: {
          type: "function",
          required: false,
        },
        sdkMeta: {
          type: "string",
          queryParam: true,
          sendToChild: false,
          value: getSDKMeta,
        },
      },
    });

    if (component.isChild()) {
      window.xchild = {
        props: component.xprops,
        close: noop,
      };
    }

    return component;
  });
}
