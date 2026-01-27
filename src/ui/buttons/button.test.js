/* @flow */
import { describe, test, expect } from "vitest";
import { noop } from "@krakenjs/belter/src";

import { CLASS } from "../../constants/class";

import { Button } from "./button";

describe("Button", () => {
  test("should apply the disabled class if the disabled prop is passed", () => {
    const mockedButtonProps = {
      buyerCountry: "US",
      commit: false,
      content: null,
      customerId: null,
      env: "test",
      experiment: {},
      flow: "purchase",
      fundingEligibility: {},
      fundingSource: "paypal",
      i: 0,
      instrument: null,
      locale: "en_US",
      multiple: false,
      nonce: "",
      onClick: noop,
      personalization: null,
      showPayLabel: false,
      style: {
        layout: "horizontal",
        shape: "rect",
        borderRadius: 0,
        color: "gold",
        label: "paypal",
      },
      tagline: false,
      userIDToken: null,
      vault: false,
      disabled: true,
    };

    // $FlowFixMe
    const jsxElem = Button(mockedButtonProps);

    // Check that the button has the disabled class
    const buttonElement = jsxElem?.children?.find(
      // $FlowFixMe
      (elem) => elem?.props?.class?.includes(CLASS.DISABLED)
    );

    expect(buttonElement).toBeDefined();
    expect(
      jsxElem?.children?.some(
        // $FlowFixMe
        (elem) => elem?.props?.class?.includes(CLASS.DISABLED)
      )
    ).toBe(true);
  });
});
