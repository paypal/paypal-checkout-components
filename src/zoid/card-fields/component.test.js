/* @flow */

import { describe, expect, it, vi } from "vitest";

import { getCardFieldsComponent } from "./component";

// Capture every config object passed to zoid's create() so we can assert on
// the real prop definitions of both the parent CardFields component and the
// individual field children (number, cvv, expiry, name).
const { createMock } = vi.hoisted(() => ({
  createMock: vi.fn((options) => ({ ...options, isChild: () => false })),
}));

vi.mock("@krakenjs/zoid/src", () => ({
  create: createMock,
}));

vi.mock("@paypal/sdk-client/src", async (importOriginal) => ({
  ...(await importOriginal()),
  getDisableSetCookie: vi.fn(() => true),
  getPayPalDomain: vi.fn(() => "https://www.paypal.com"),
}));

const getCreateOptions = () => {
  getCardFieldsComponent();
  return createMock.mock.calls.map(([options]) => options);
};

const getParentOptions = () =>
  getCreateOptions().find(({ tag }) => tag === "paypal-card-fields");

const getChildOptions = () =>
  getCreateOptions().filter(({ tag }) => tag !== "paypal-card-fields");

describe("getCardFieldsComponent disableSetCookie prop", () => {
  it("defines disableSetCookie on the parent as an optional boolean query param", () => {
    const { disableSetCookie } = getParentOptions().props;

    expect(disableSetCookie).toMatchObject({
      type: "boolean",
      required: false,
      queryParam: true,
    });
  });

  it("sources the parent value from the SDK disableSetCookie global", () => {
    const { disableSetCookie } = getParentOptions().props;

    expect(disableSetCookie.value()).toBe(true);
  });

  it("defines disableSetCookie on every card field (number, cvv, expiry, name, postal) as an optional boolean query param", () => {
    const children = getChildOptions();

    expect(children.map(({ tag }) => tag).sort()).toEqual([
      "paypal-card-cvv-field",
      "paypal-card-expiry-field",
      "paypal-card-name-field",
      "paypal-card-number-field",
      // created via genericCardField but not yet exposed as a child (see TODO)
      "paypal-card-postal-field",
    ]);

    children.forEach(({ props }) => {
      expect(props.disableSetCookie).toMatchObject({
        type: "boolean",
        required: false,
        queryParam: true,
      });
    });
  });

  it.each([true, false, undefined])(
    "passes the parent's disableSetCookie (%s) through to every child field",
    (parentValue) => {
      getChildOptions().forEach(({ props }) => {
        expect(
          props.disableSetCookie.value({
            props: { parent: { props: { disableSetCookie: parentValue } } },
          }),
        ).toBe(parentValue);
      });
    },
  );
});
