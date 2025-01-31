/* @flow */
/** @jsx node */

import { values, destroyElement, toCSS } from "@krakenjs/belter/src";
import { node, dom } from "@krakenjs/jsx-pragmatic/src";
import { EVENT, type RenderOptionsType } from "@krakenjs/zoid/src";
import { getVersion } from "@paypal/sdk-client/src";

import {
  BUTTON_SIZE,
  BUTTON_SIZE_REBRAND,
  ATTRIBUTE,
  MENU_PLACEMENT,
} from "../../constants";
import {
  BUTTON_SIZE_STYLE,
  BUTTON_REBRAND_SIZE_STYLE,
  MINIMUM_SIZE,
} from "../../ui/buttons/config";
import { type ButtonProps } from "../../ui/buttons/props";

const CLASS = {
  VISIBLE: "visible",
  INVISIBLE: "invisible",
  COMPONENT_FRAME: "component-frame",
  PRERENDER_FRAME: "prerender-frame",
  SMART_MENU: "smart-menu",
  INSTALLMENTS_MODAL: "installments-modal",
};

const ID = {
  SMART_MENU: "smart-menu",
  INSTALLMENTS_MODAL: "installments-modal",
};

export function containerTemplate({
  uid,
  props,
  tag,
  context,
  frame,
  prerenderFrame,
  doc,
  container,
  event,
}: RenderOptionsType<ButtonProps>): ?HTMLElement {
  if (!frame || !prerenderFrame) {
    return;
  }

  if (container && container.tagName.toLowerCase() === "button") {
    throw new Error(`Do not render the PayPal button into a button element`);
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

  // $FlowFixMe
  const { style, experiment, nonce } = props;
  const { isPaypalRebrandEnabled } = experiment;
  const {
    label,
    layout,
    height: buttonHeight,
    menuPlacement,
    disableMaxHeight,
  } = style;

  let minimumSize = isPaypalRebrandEnabled
    ? BUTTON_SIZE.SMALL
    : MINIMUM_SIZE[layout];
  const buttonSizeStyle = isPaypalRebrandEnabled
    ? BUTTON_REBRAND_SIZE_STYLE
    : BUTTON_SIZE_STYLE;

  const buttonSize = isPaypalRebrandEnabled ? BUTTON_SIZE_REBRAND : BUTTON_SIZE;

  if (buttonHeight && !disableMaxHeight) {
    const possibleSizes = values(buttonSize).filter((possibleSize) => {
      return (
        buttonSizeStyle[possibleSize] &&
        buttonHeight &&
        buttonSizeStyle[possibleSize].minHeight <= buttonHeight &&
        buttonSizeStyle[possibleSize].maxHeight >= buttonHeight
      );
    });

    possibleSizes.sort(
      (
        sizeA: $Values<typeof BUTTON_SIZE>,
        sizeB: $Values<typeof BUTTON_SIZE>
      ): number => {
        return (
          buttonSizeStyle[sizeA].defaultWidth -
          buttonSizeStyle[sizeB].defaultWidth
        );
      }
    );
    minimumSize = possibleSizes[0];
  }

  const setupAutoResize = (el) => {
    event.on(EVENT.RESIZE, ({ width: newWidth, height: newHeight }) => {
      if (typeof newWidth === "number") {
        el.style.width = toCSS(newWidth);
      }
      if (disableMaxHeight) {
        el.style.height = "100%";
      } else if (typeof newHeight === "number") {
        el.style.height = toCSS(newHeight);
      }
    });
  };

  const element = (
    <div
      id={uid}
      class={`${tag} ${tag}-context-${context} ${tag}-label-${
        label || "unknown"
      } ${tag}-layout-${layout}`}
      {...{ [ATTRIBUTE.VERSION]: `${getVersion()}` }}
      onRender={setupAutoResize}
    >
      <style nonce={nonce}>
        {`
                    #${uid} {
                        position: relative;
                        display: inline-block;
                        width: 100%;
                        min-height: ${buttonSizeStyle[minimumSize].minHeight}px;
                        min-width: ${buttonSizeStyle[minimumSize].minWidth}px;
                        font-size: 0;
                    }

                    #${uid} > iframe {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
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

                    #${uid} > .${CLASS.SMART_MENU} {
                        position: absolute;
                        z-index: 300;
                        ${
                          menuPlacement === MENU_PLACEMENT.ABOVE
                            ? "bottom: 100%;"
                            : "top: 0;"
                        }
                        left: 0;
                        width: 100%;
                    }
                `}
      </style>

      <node el={frame} />
      <node el={prerenderFrame} />

      <div id={ID.SMART_MENU} class={CLASS.SMART_MENU} />

      <div id={ID.INSTALLMENTS_MODAL} class={CLASS.INSTALLMENTS_MODAL} />
    </div>
  ).render(dom({ doc }));

  event.on(EVENT.RENDERED, () => {
    setTimeout(() => {
      element.style.transition = "all 0.2s ease-in-out";
    }, 1000);
  });

  return element;
}
