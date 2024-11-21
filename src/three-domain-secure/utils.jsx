/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { node, dom } from "@krakenjs/jsx-pragmatic/src";
import { create, type ZoidComponent } from "@krakenjs/zoid/src";
import { inlineMemoize, noop } from "@krakenjs/belter/src";
import { getCSPNonce, getClientID, getSDKMeta } from "@paypal/sdk-client/src";

import { payPayDomainRegEx } from "../lib";
import { Overlay } from "../ui/overlay";

import { type threeDSResponse } from "./types";

export type TDSProps = {|
  xcomponent?: string,
  onSuccess: (data: threeDSResponse) => void,
  onError: (mixed) => void,
  sdkMeta?: string,
  content?: void | {|
    windowMessage?: string,
    continueMessage?: string,
    cancelMessage?: string,
    interrogativeMessage?: string,
  |},
  nonce: string,
|};

export type TDSComponent = ZoidComponent<TDSProps>;

export function getFastlaneThreeDS(payerActionUrl: string): TDSComponent {
  return inlineMemoize(getFastlaneThreeDS, () => {
    const component = create({
      tag: "fastlane-threeds",
      url: payerActionUrl,

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
            close={close}
            focus={focus}
            event={event}
            frame={frame}
            prerenderFrame={prerenderFrame}
            content={props.content}
            nonce={props.nonce}
          />
        ).render(dom({ doc }));
      },
      domain: payPayDomainRegEx,
      props: {
        clientID: {
          type: "string",
          value: getClientID,
          queryParam: true,
        },
        onSuccess: {
          type: "function",
          alias: "onContingencyResult",
          decorate: ({ value, onError }) => {
            // eslint-disable-next-line no-console
            console.log("******* Out", window.xprops);
            return (err, result) => {
              // eslint-disable-next-line no-console
              console.log("*******", result);
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
      // eslint-disable-next-line no-console
      console.log("### Something", component.xprops);
      window.xchild = {
        props: component.xprops,
        close: noop,
      };
    }

    return component;
  });
}
