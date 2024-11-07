/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { node, dom } from "@krakenjs/jsx-pragmatic/src";
import { create, type ZoidComponent } from "@krakenjs/zoid/src";
import { inlineMemoize, noop } from "@krakenjs/belter/src";
import { getCSPNonce } from "@paypal/sdk-client/src";

import { Overlay } from "../ui/overlay";

import { threeDSResponse } from "./types";

export type TDSProps = {|
  action: string,
  xcomponent: string,
  flow: string,
  orderID: string,
  onSuccess: (threeDSResponse) => void,
  onError: (mixed) => void,
  sdkMeta: string,
  content?: void | {|
    windowMessage?: string,
    continueMessage?: string,
    cancelMessage?: string,
    interrogativeMessage?: string,
  |},
  nonce: string,
|};

export type TDSComponent = ZoidComponent<TDSProps>;

export function getThreeDomainSecureComponent(payerActionUrll): TDSComponent {
  return inlineMemoize(getThreeDomainSecureComponent, () => {
    const component = create({
      tag: "three-domain-secure-client",
      url: payerActionUrll,

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

      props: {
        xcomponent: {
          type: "string",
          queryParam: true,
          value: () => "1",
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
