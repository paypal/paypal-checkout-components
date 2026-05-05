/* @flow */
/** @jsx node */

import { node, dom } from "@krakenjs/jsx-pragmatic/src";
import { EVENT, type RenderOptionsType } from "@krakenjs/zoid/src";
import { getVersion } from "@paypal/sdk-client/src";
import { destroyElement, toCSS } from "@krakenjs/belter/src";

import { type SavedPaymentMethodsProps } from "./props";

const CLASS = {
  VISIBLE: "visible",
  INVISIBLE: "invisible",
  COMPONENT_FRAME: "component-frame",
  PRERENDER_FRAME: "prerender-frame",
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
  dimensions,
}: RenderOptionsType<SavedPaymentMethodsProps>): ?HTMLElement {
  if (!frame || !prerenderFrame) {
    return;
  }

  frame.classList.add(CLASS.COMPONENT_FRAME);
  prerenderFrame.classList.add(CLASS.PRERENDER_FRAME);

  frame.classList.add(CLASS.INVISIBLE);
  prerenderFrame.classList.add(CLASS.VISIBLE);

  const { width: initialWidth, height: initialHeight } = dimensions;

  event.on(EVENT.RENDERED, () => {
    prerenderFrame.classList.remove(CLASS.VISIBLE);
    prerenderFrame.classList.add(CLASS.INVISIBLE);

    frame.classList.remove(CLASS.INVISIBLE);
    frame.classList.add(CLASS.VISIBLE);

    setTimeout(() => {
      destroyElement(prerenderFrame);
    }, 1000);
  });

  const setupAutoResize = (el) => {
    event.on(EVENT.RESIZE, ({ width: newWidth, height: newHeight }) => {
      if (typeof newWidth === "number") {
        el.style.width = toCSS(newWidth);
      }
      if (typeof newHeight === "number") {
        el.style.height = toCSS(newHeight);
      }
    });
  };

  const { nonce } = props;

  const element = (
    <div
      id={uid}
      class={`${tag} ${tag}-context-${context}`}
      {...{ [ATTRIBUTE.VERSION]: `${getVersion()}` }}
      style={{
        width: initialWidth,
        height: initialHeight,
      }}
      onRender={setupAutoResize}
    >
      <style nonce={nonce}>
        {`
          #${uid} {
            position: relative;
            display: block;
            font-size: 0;
          }

          #${uid} > iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            border: none;
          }

          #${uid} > iframe.${CLASS.COMPONENT_FRAME} {
            z-index: 100;
          }

          #${uid} > iframe.${CLASS.PRERENDER_FRAME} {
            transition: opacity .2s linear;
            z-index: 200;
          }

          #${uid} > iframe.${CLASS.VISIBLE} {
            opacity: 1;
          }

          #${uid} > iframe.${CLASS.INVISIBLE} {
            opacity: 0;
            pointer-events: none;
          }
        `}
      </style>

      <node el={frame} />
      <node el={prerenderFrame} />
    </div>
  ).render(dom({ doc }));

  return element;
}
