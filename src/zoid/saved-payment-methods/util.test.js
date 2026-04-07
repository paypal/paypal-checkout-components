/* @flow */

import { describe, expect, it } from "vitest";

import { validateSavedPaymentMethodsStyle } from "./util";

describe("validateSavedPaymentMethodsStyle", () => {
  it("allows undefined, null, and empty object", () => {
    expect(() => validateSavedPaymentMethodsStyle(undefined)).not.toThrow();
    expect(() => validateSavedPaymentMethodsStyle(null)).not.toThrow();
    expect(() => validateSavedPaymentMethodsStyle({})).not.toThrow();
  });

  it("allows a valid style with root, component, and layout", () => {
    expect(() =>
      validateSavedPaymentMethodsStyle({
        root: {
          backgroundColor: "#fff",
          fontFamily: "Arial",
          textColorBase: "#000",
          fontSizeBase: "16px",
          primaryColor: "#0070ba",
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
          message: false,
          logoWidth: "45px",
          logoLabelGap: "12px",
          labelFiGap: "8px",
          labelFontSize: "16px",
          fiTextFontSize: "14px",
          iconSize: "28px",
        },
      })
    ).not.toThrow();
  });

  it("allows partial root, component, or layout only", () => {
    expect(() =>
      validateSavedPaymentMethodsStyle({
        root: { backgroundColor: "transparent" },
      })
    ).not.toThrow();
    expect(() =>
      validateSavedPaymentMethodsStyle({
        component: { height: "40px" },
      })
    ).not.toThrow();
    expect(() =>
      validateSavedPaymentMethodsStyle({
        layout: { logo: false },
      })
    ).not.toThrow();
  });

  it("rejects non-plain-object style", () => {
    expect(() => validateSavedPaymentMethodsStyle("")).toThrow(TypeError);
    expect(() => validateSavedPaymentMethodsStyle(1)).toThrow(TypeError);
    expect(() => validateSavedPaymentMethodsStyle([])).toThrow(TypeError);
  });

  it("rejects unknown top-level keys", () => {
    expect(() => validateSavedPaymentMethodsStyle({ color: "red" })).toThrow(
      /Invalid style key: color/
    );
  });

  it("rejects non-object root", () => {
    expect(() => validateSavedPaymentMethodsStyle({ root: [] })).toThrow(
      /Expected style\.root to be a plain object/
    );
    expect(() => validateSavedPaymentMethodsStyle({ root: "x" })).toThrow(
      /Expected style\.root to be a plain object/
    );
  });

  it("rejects unknown root keys and non-string root values", () => {
    expect(() =>
      validateSavedPaymentMethodsStyle({ root: { unknown: "a" } })
    ).toThrow(/Invalid style\.root key: unknown/);
    expect(() =>
      validateSavedPaymentMethodsStyle({ root: { backgroundColor: 1 } })
    ).toThrow(/Expected style\.root\.backgroundColor to be a string/);
  });

  it("rejects unknown component keys and non-string component values", () => {
    expect(() =>
      validateSavedPaymentMethodsStyle({ component: { width: "1" } })
    ).toThrow(/Invalid style\.component key: width/);
    expect(() =>
      validateSavedPaymentMethodsStyle({ component: { height: true } })
    ).toThrow(/Expected style\.component\.height to be a string/);
  });

  it("rejects unknown layout keys", () => {
    expect(() =>
      validateSavedPaymentMethodsStyle({ layout: { extra: true } })
    ).toThrow(/Invalid style\.layout key: extra/);
  });

  it("rejects layout fields with wrong types", () => {
    expect(() =>
      validateSavedPaymentMethodsStyle({ layout: { logo: "yes" } })
    ).toThrow(/Expected style\.layout\.logo to be a boolean/);
    expect(() =>
      validateSavedPaymentMethodsStyle({ layout: { logoWidth: true } })
    ).toThrow(/Expected style\.layout\.logoWidth to be a string/);
  });
});
