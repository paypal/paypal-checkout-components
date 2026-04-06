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
