/* @flow */

import { describe, expect } from "vitest";
import { dom } from "@krakenjs/jsx-pragmatic/src";

import { CLASS } from "../../constants/class";
import { ATTRIBUTE } from "../../constants/misc";

import { Buttons } from "./buttons";

const props = {
  fundingEligibility: {
    card: {
      eligible: true,
    },
    paypal: {
      eligible: true,
    },
    venmo: {
      eligible: true,
    },
  },
};

const selectors = {
  inlineGuest: `[${ATTRIBUTE.FUNDING_SOURCE}='card']`,
  paypal: `[${ATTRIBUTE.FUNDING_SOURCE}='paypal'`,
  poweredBy: `.${CLASS.POWERED_BY}`,
  tagline: `.${CLASS.TAGLINE}`,
  venmo: `[${ATTRIBUTE.FUNDING_SOURCE}='venmo'`,
};

const render = (buttonProps) => {
  const container = document.createElement("div");
  // $FlowIssue not all required props are needed for this test
  container.appendChild(Buttons(buttonProps).render(dom()));
  return container;
};

describe("Buttons", () => {
  describe("style.layout = 'vertical'", () => {
    it("renders inline guest and paypal powered by", () => {
      const container = render(props);
      expect(container.querySelector(selectors.inlineGuest)).toBeTruthy();
      expect(container.querySelector(selectors.poweredBy)).toBeTruthy();
      expect(container.querySelector(selectors.tagline)).toBeFalsy();
    });
  });

  describe("style.layout = 'horizontal'", () => {
    const style = {
      layout: "horizontal",
    };
    it("renders the first two funding sources with a tagline", () => {
      const container = render({
        ...props,
        style,
      });
      expect(container.querySelector(selectors.paypal)).toBeTruthy();
      expect(container.querySelector(selectors.venmo)).toBeTruthy();
      expect(container.querySelector(selectors.inlineGuest)).toBeFalsy();
      expect(container.querySelector(selectors.poweredBy)).toBeFalsy();
      expect(container.querySelector(selectors.tagline)).toBeTruthy();
    });
    it("renders inline guest with powered by if eligible", () => {
      // $FlowIssue fundingEligibility props are optional
      const { card, paypal } = props.fundingEligibility;
      const container = render({
        fundingEligibility: {
          card,
          paypal,
        },
        style,
      });
      expect(container.querySelector(selectors.inlineGuest)).toBeTruthy();
      expect(container.querySelector(selectors.poweredBy)).toBeTruthy();
      expect(container.querySelector(selectors.tagline)).toBeFalsy();
    });
    it("does not render inline guest or paypal powered by if layout is horizontal", () => {
      const container = render({
        ...props,
        style,
      });
      expect(container.querySelector(selectors.inlineGuest)).toBeFalsy();
      expect(container.querySelector(selectors.poweredBy)).toBeFalsy();
      expect(container.querySelector(selectors.tagline)).toBeTruthy();
    });
  });
});
