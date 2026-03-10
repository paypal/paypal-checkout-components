/* @flow */
/** @jsx node */

import { node, dom } from "@krakenjs/jsx-pragmatic/src";
import { EVENT, type RenderOptionsType } from "@krakenjs/zoid/src";
import { getVersion } from "@paypal/sdk-client/src";
import { destroyElement } from "@krakenjs/belter/src";
import { getNamespace } from "@paypal/sdk-client/src";

import { type SavedPaymentMethodsProps, type MessagesOptions } from "./props";

const CLASS = {
  VISIBLE: "visible",
  INVISIBLE: "invisible",
  COMPONENT_FRAME: "component-frame",
  PRERENDER_FRAME: "prerender-frame",
  MESSAGE: "saved-payment-methods-message",
  FRAMES_WRAPPER: "saved-payment-methods-frames",
};

const ATTRIBUTE = {
  VERSION: "data-version",
};

export function containerTemplate({
  uid,
  props,
  tag,
  context,
  frame,
  prerenderFrame,
  doc,
  event,
}: RenderOptionsType<SavedPaymentMethodsProps>): ?HTMLElement {
  if (!frame || !prerenderFrame) {
    return;
  }

  frame.classList.add(CLASS.COMPONENT_FRAME);
  prerenderFrame.classList.add(CLASS.PRERENDER_FRAME);

  frame.classList.add(CLASS.INVISIBLE);
  prerenderFrame.classList.add(CLASS.VISIBLE);

  event.on(EVENT.RENDERED, () => {
    prerenderFrame.classList.remove(CLASS.VISIBLE);
    prerenderFrame.classList.add(CLASS.INVISIBLE);

    frame.classList.remove(CLASS.INVISIBLE);
    frame.classList.add(CLASS.VISIBLE);

    setTimeout(() => {
      destroyElement(prerenderFrame);
    }, 1000);
  });

  event.on(EVENT.PRERENDERED, () => {
    const messageContainer = element.querySelector(
      `[data-spm-message-container="true"]`
    );
    if (messageContainer instanceof HTMLElement) {
      // const success = renderMessagesInContainer(messageContainer, {
      //   amount: message?.amount,
      //   currency: message?.currency,
      // });
      // TODO: Logging from the Merchant's website?
      // console.log(
      //   "====== renderMessagesInContainer",
      //   success,
      //   messageContainer,
      //   message
      // );
    }
  });

  const { nonce, message } = props;

  const element = (
    <div
      id={uid}
      class={`${tag} ${tag}-context-${context}`}
      {...{ [ATTRIBUTE.VERSION]: `${getVersion()}` }}
    >
      <style nonce={nonce}>
        {`
          #${uid} {
            position: relative;
            display: block;
            width: 200px;
            font-size: 0;
          }

          #${uid} .${CLASS.MESSAGE} {
            margin-bottom: 8px;
          }

          #${uid} .${CLASS.FRAMES_WRAPPER} {
            position: relative;
            min-height: 50px;
          }

          #${uid} .${CLASS.FRAMES_WRAPPER} > iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
          }

          #${uid} .${CLASS.FRAMES_WRAPPER} > iframe.${CLASS.COMPONENT_FRAME} {
            z-index: 100;
          }

          #${uid} .${CLASS.FRAMES_WRAPPER} > iframe.${CLASS.PRERENDER_FRAME} {
            transition: opacity .2s linear;
            z-index: 200;
          }

          #${uid} .${CLASS.FRAMES_WRAPPER} > iframe.${CLASS.VISIBLE} {
            opacity: 1;
          }

          #${uid} .${CLASS.FRAMES_WRAPPER} > iframe.${CLASS.INVISIBLE} {
            opacity: 0;
            pointer-events: none;
          }
        `}
      </style>

      <div class={CLASS.FRAMES_WRAPPER}>
        <node el={frame} />
        <node el={prerenderFrame} />
      </div>
      <div class={CLASS.MESSAGE} data-spm-message-container="true" />
    </div>
  ).render(dom({ doc }));
  return element;
}

function renderMessagesInContainer(
  container: HTMLElement,
  options: MessagesOptions
): boolean {
  if (!container || !container.ownerDocument?.body?.contains(container)) {
    return false;
  }
  const namespace = getNamespace();
  const Messages = window[namespace]?.Messages;
  if (!Messages) {
    return false;
  }
  Messages(options).render(container);
  return true;
}
