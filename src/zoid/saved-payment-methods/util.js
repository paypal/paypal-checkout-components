/* @flow */

/**
 * Utility functions for SavedPaymentMethods component
 */

const STYLE_ROOT_KEYS: Set<string> = new Set([
  "backgroundColor",
  "fontFamily",
  "textColorBase",
  "fontSizeBase",
  "primaryColor",
]);

const STYLE_COMPONENT_KEYS: Set<string> = new Set([
  "height",
  "padding",
  "borderRadius",
  "borderColor",
  "borderWidth",
]);

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

const STYLE_LAYOUT_FIELD_TYPES: {|
  [string]: "string" | "boolean",
|} = {
  logo: "boolean",
  label: "boolean",
  message: "boolean",
  logoWidth: "string",
  logoLabelGap: "string",
  labelFiGap: "string",
  labelFontSize: "string",
  fiTextFontSize: "string",
  iconSize: "string",
};

export const getStyleConfig = (style) => ({
  root: {
    ...DEFAULT_STYLE_CONFIG.root,
    ...(style.root || {}),
  },
  component: {
    ...DEFAULT_STYLE_CONFIG.component,
    ...(style.component || {}),
  },
  layout: {
    ...DEFAULT_STYLE_CONFIG.layout,
    ...(style.layout || {}),
  },
});

export const getStyles = (styleConfig) =>
  `
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

  .saved-payment-methods-content {
    min-width: 0;
  }

  .saved-payment-methods-label {
    font-size: ${styleConfig.layout.labelFontSize};
    font-weight: 600;
    color: #222222;
    margin-right: ${styleConfig.layout.labelFiGap};
  }

  .saved-payment-methods-logo {
    width: ${styleConfig.layout.logoWidth};
    margin-right: ${styleConfig.layout.logoLabelGap};
  }

  /* Preact mounts into this node; avoid an extra flex item / box alongside logo + label. */
  #saved-payment-methods-app-root {
    display: contents;
  }

  /* If both skeleton and button ever coexist, collapse the skeleton so it takes no space. */
  #saved-payment-methods-app-root:has(.saved-payment-methods-tag)
    > .saved-payment-methods-tag-loading {
    display: none !important;
    visibility: hidden !important;
    position: absolute !important;
    width: 0 !important;
    height: 0 !important;
    min-width: 0 !important;
    min-height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    border: 0 !important;
    overflow: hidden !important;
    pointer-events: none !important;
  }

  .saved-payment-methods-tag {
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

  .saved-payment-methods-tag-label {
    font-size: ${styleConfig.layout.fiTextFontSize};
    font-weight: 400;
    color: #000000;
    white-space: nowrap;
  }

  .saved-payment-methods-tag-label-fallback {
    display: flex;
    align-items: center;
    min-width: 0;
  }

  .saved-payment-methods-tag-label-email {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
  }

  .saved-payment-methods-tag-label-separator {
    flex: 0 0 auto;
    margin: 0 4px;
  }

  .saved-payment-methods-tag-label-pay-in-full {
    flex: 0 0 auto;
    white-space: nowrap;
  }

  .saved-payment-methods-tag-card-icon {
    width: ${styleConfig.layout.iconSize};
    border-radius: 4px;
  }

  .saved-payment-methods-tag-edit-button svg path {
    fill: ${styleConfig.root.primaryColor};
  }

  .saved-payment-methods-message {
    height: 31px; /* Based on the error message in browser console */
    margin-top: 6px;
    ${
      styleConfig.layout.logo
        ? /* TODO: Remove calc */ `
      margin-left: calc(${styleConfig.layout.logoWidth} + ${styleConfig.layout.logoLabelGap});
    `
        : ""
    }
  }

  .saved-payment-methods-tag-loading {
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
  `;

function assertPlainObject(value: mixed, path: string): void {
  if (value === undefined || value === null) {
    return;
  }
  if (typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError(`Expected ${path} to be a plain object`);
  }
}

/**
 * Validates `style` against the shape used by smart-payment-buttons
 * `saved-payment-methods.jsx` (root / component / layout partials).
 */
export function validateSavedPaymentMethodsStyle(style: mixed): void {
  if (style === undefined || style === null) {
    return;
  }

  assertPlainObject(style, "style");

  // $FlowFixMe[incompatible-type]
  const s: Object = style;
  const topKeys = Object.keys(s);
  const allowedTop = new Set(["root", "component", "layout"]);

  for (const key of topKeys) {
    if (!allowedTop.has(key)) {
      throw new Error(
        `Invalid style key: ${key}. Expected only root, component, and layout`
      );
    }
  }

  if (s.root !== undefined && s.root !== null) {
    assertPlainObject(s.root, "style.root");
    // $FlowFixMe[prop-missing]
    const root: Object = s.root;
    for (const key of Object.keys(root)) {
      if (!STYLE_ROOT_KEYS.has(key)) {
        throw new Error(`Invalid style.root key: ${key}`);
      }
      if (typeof root[key] !== "string") {
        throw new TypeError(`Expected style.root.${key} to be a string`);
      }
    }
  }

  if (s.component !== undefined && s.component !== null) {
    assertPlainObject(s.component, "style.component");
    // $FlowFixMe[prop-missing]
    const component: Object = s.component;
    for (const key of Object.keys(component)) {
      if (!STYLE_COMPONENT_KEYS.has(key)) {
        throw new Error(`Invalid style.component key: ${key}`);
      }
      if (typeof component[key] !== "string") {
        throw new TypeError(`Expected style.component.${key} to be a string`);
      }
    }
  }

  if (s.layout !== undefined && s.layout !== null) {
    assertPlainObject(s.layout, "style.layout");
    // $FlowFixMe[prop-missing]
    const layout: Object = s.layout;
    for (const key of Object.keys(layout)) {
      const expected = STYLE_LAYOUT_FIELD_TYPES[key];
      if (!expected) {
        throw new Error(`Invalid style.layout key: ${key}`);
      }
      const actual = typeof layout[key];
      if (actual !== expected) {
        throw new TypeError(
          `Expected style.layout.${key} to be a ${expected}, got: ${layout[key]}`
        );
      }
    }
  }
}

export function getSavedPaymentMethodsSize(): {|
  width: string,
  height: string,
|} {
  return {
    width: "400px",
    height: "50px",
  };
}
