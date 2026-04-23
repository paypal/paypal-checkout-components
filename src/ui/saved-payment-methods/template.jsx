/* @flow */
/** @jsx node */

import { node, Fragment, type ElementNode } from "@krakenjs/jsx-pragmatic/src";

import type { SavedPaymentMethodsStyleInputs } from "../../zoid/saved-payment-methods/props";
import { validateSavedPaymentMethodsStyle } from "../../zoid/saved-payment-methods/util";

import { PPRebrandLogo } from "@paypal/sdk-logos/src";

export type SavedPaymentMethodsServerRenderProps = {|
  nonce?: string,
  style?: SavedPaymentMethodsStyleInputs,
|};

export function validateSavedPaymentMethodsProps(props: {|
  style?: SavedPaymentMethodsStyleInputs,
|}) {
  validateSavedPaymentMethodsStyle(props?.style);
}

const DEFAULT_STYLE_CONFIG = {
  root: {
    backgroundColor: "transparent",
    fontFamily: "Arial, sans-serif",
    textColorBase: "#000000",
    fontSizeBase: "16px",
    primaryColor: "#000000",
  },
  component: {
    height: "32px",
    padding: "6px 9px",
    borderRadius: "6px",
    borderColor: "transparent",
    borderWidth: "0",
  },
  layout: {
    logo: true,
    label: true,
    message: true,
    logoWidth: "45px",
    logoLabelGap: "12px",
    labelFiGap: "8px",
    labelFontSize: "16px",
    fiTextFontSize: "14px",
    iconSize: "28px",
  },
};

function getStyleConfig(style?: SavedPaymentMethodsStyleInputs) {
  const s = style || {};
  return {
    root: {
      ...DEFAULT_STYLE_CONFIG.root,
      ...(s.root || {}),
    },
    component: {
      ...DEFAULT_STYLE_CONFIG.component,
      ...(s.component || {}),
    },
    layout: {
      ...DEFAULT_STYLE_CONFIG.layout,
      ...(s.layout || {}),
    },
  };
}

/**
 * Server-only render (commonjs2 / web: false) — mirrors smart buttons `Buttons()`.
 * Non-interactive loading shell (styles + tag skeleton) until the iframe hydrates;
 * shared by zoid prerender and server SSR and must match the first client paint.
 */
export function SavedPaymentMethods(
  props: SavedPaymentMethodsServerRenderProps
): ElementNode {
  const styleConfig = getStyleConfig(props.style);
  const shouldRenderMessageContainer = Boolean(styleConfig.layout.message);

  return (
    <Fragment>
      <style nonce={props.nonce}>
        {`
            body {
              margin: 0;
            }
            * {
              box-sizing: border-box;
            }
            .saved-payment-methods-container {
              background-color: ${styleConfig.root.backgroundColor};
              font-family: ${styleConfig.root.fontFamily};
              color: ${styleConfig.root.textColorBase};
              font-size: ${styleConfig.root.fontSizeBase};
              display: flex;
              align-items: center;
              min-width: 0;
            }

            .spm-content {
              min-width: 0;
            }

            .spm-label {
              font-size: ${styleConfig.layout.labelFontSize};
              font-weight: 600;
              color: #222222;
              margin-right: ${styleConfig.layout.labelFiGap};
            }

            .spm-logo {
              width: ${styleConfig.layout.logoWidth};
              margin-right: ${styleConfig.layout.logoLabelGap};
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
            }

            .spm-logo-frame {
              aspect-ratio: 1.5;
              width: 100%;
              height: 100%;
              min-width: 0;
              min-height: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1.2px solid #CCCCCC;
              border-radius: 2px;
            }

            .spm-logo-frame img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }

            #spm-app-root {
              display: contents;
            }

            .spm-tag {
              display: flex;
              height: ${styleConfig.component.height};
              align-items: center;
              justify-content: space-between;
              background-color: #F5F7FA;
              padding: ${styleConfig.component.padding};
              border-radius: ${styleConfig.component.borderRadius};
              border-width: ${styleConfig.component.borderWidth};
              border-color: ${styleConfig.component.borderColor};
              border-style: solid;
              gap: 8px;
              min-width: 0;
              max-width: 100%;
              cursor: pointer;
            }

            .spm-tag-label {
              font-size: ${styleConfig.layout.fiTextFontSize};
              font-weight: 400;
              color: #000000;
              white-space: nowrap;
            }

            .spm-tag-label-fallback {
              display: flex;
              align-items: center;
              min-width: 0;
            }

            .spm-tag-label-email {
              flex: 1 1 auto;
              min-width: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              display: inline-block;
            }

            .spm-tag-label-separator {
              flex: 0 0 auto;
              margin: 0 4px;
            }

            .spm-tag-label-pay-in-full {
              flex: 0 0 auto;
              white-space: nowrap;
            }

            .spm-tag-card-icon {
              width: ${styleConfig.layout.iconSize};
              border-radius: 4px;
            }

            .spm-tag-edit-button svg path {
              fill: ${styleConfig.root.primaryColor};
            }

            .spm-message {
              height: 31px; /* Based on the error message in browser console */
              margin-top: 6px;
              ${
                styleConfig.layout.logo
                  ? `
                margin-left: calc(${styleConfig.layout.logoWidth} + ${styleConfig.layout.logoLabelGap});
              `
                  : ""
              }
            }

            .spm-tag-loading {
              display: flex;
              height: ${styleConfig.component.height};
              align-items: center;
              justify-content: space-between;
              background: linear-gradient(to right, #ffffff, #F5F7FA);
              padding: ${styleConfig.component.padding};
              border-radius: ${styleConfig.component.borderRadius};
              border-width: ${styleConfig.component.borderWidth};
              border-color: ${styleConfig.component.borderColor};
              border-style: solid;
              gap: 8px;
              min-width: 124px;
              max-width: 100%;
            }

            .spm-tag-loading.spm-tag-loading--hidden {
              display: none !important;
            }
            `}
      </style>
      <div class="saved-payment-methods-container">
        <div class="spm-content">
          <div class="saved-payment-methods-container">
            {styleConfig.layout.logo && (
              <div class="spm-logo" aria-hidden="true">
                <div class="spm-logo-frame">
                  <PPRebrandLogo />
                </div>
              </div>
            )}
            {styleConfig.layout.label && <div class="spm-label">PayPal</div>}
            <div id="spm-app-root">
              <div class="spm-tag-loading" />
            </div>
          </div>
          {shouldRenderMessageContainer && (
            <div id="spm-message-root" class="spm-message" aria-hidden="true" />
          )}
        </div>
      </div>
    </Fragment>
  );
}
