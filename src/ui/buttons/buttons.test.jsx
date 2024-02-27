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
  },
};

describe("Buttons", () => {
  describe("style.layout = 'vertical", () => {
    it("renders inline guest and paypal powered by", () => {
      const container = document.createElement("div");
      // $FlowIssue
      container.appendChild(Buttons(props).render(dom()));
      expect(
        container.querySelector(`[${ATTRIBUTE.FUNDING_SOURCE}='card']`)
      ).toBeTruthy();
      expect(container.querySelector(`.${CLASS.POWERED_BY}`)).toBeTruthy();
      expect(container.querySelector(`.${CLASS.TAGLINE}`)).toBeFalsy();
    });
  });

  describe("style.layout = 'horizontal'", () => {
    it("does not render inline guest or paypal powered by if layout is horizontal", () => {
      const container = document.createElement("div");
      container.appendChild(
        // $FlowIssue
        Buttons({
          ...props,
          style: {
            layout: "horizontal",
          },
        }).render(dom())
      );
      expect(
        container.querySelector(`[${ATTRIBUTE.FUNDING_SOURCE}='card']`)
      ).toBeFalsy();
      expect(container.querySelector(`.${CLASS.POWERED_BY}`)).toBeFalsy();
      expect(container.querySelector(`.${CLASS.TAGLINE}`)).toBeTruthy();
    });
  });
});
