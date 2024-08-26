/* @flow */
import { describe, test, expect } from "vitest";
import { FUNDING, COMPONENTS } from "@paypal/sdk-constants/src";

import { BUTTON_FLOW } from "../../constants";

import { getCardConfig } from "./config";

const getEligibility = ({
  eligible = true,
  branded = false,
  vendors = {},
} = {}) => ({
  card: {
    eligible,
    branded,
    vendors,
  },
});

const getWallet = ({ card = [] } = {}) => ({
  card: {
    instruments: card,
  },
  credit: {
    instruments: [],
  },
  paypal: {
    instruments: [],
  },
  venmo: {
    instruments: [],
  },
});

describe("card eligibility", () => {
  // $FlowIssue .eligible is marked as optional in type
  const getCardConfigEligible = (...args) => getCardConfig().eligible(...args);

  test("should not be eligible when funding eligibility is false", () => {
    expect(
      getCardConfigEligible({
        components: [],
        fundingSource: FUNDING.PAYPAL,
        fundingEligibility: getEligibility({ eligible: false }),
        // $FlowIssue
        wallet: getWallet(),
        flow: BUTTON_FLOW.PURCHASE,
      })
    ).toEqual(false);
  });

  test("should be eligible if card funding eligibility says branded is true", () => {
    expect(
      getCardConfigEligible({
        components: [],
        fundingSource: FUNDING.PAYPAL,
        fundingEligibility: getEligibility({ branded: true }),
        wallet: getWallet(),
        flow: BUTTON_FLOW.PURCHASE,
      })
    ).toEqual(true);
  });

  test("should be eligible if standalone card was rendered", () => {
    expect(
      getCardConfigEligible({
        components: [],
        fundingSource: FUNDING.CARD,
        fundingEligibility: getEligibility(),
        wallet: getWallet(),
        flow: BUTTON_FLOW.PURCHASE,
      })
    ).toEqual(true);
  });

  test("should be ineligible if card-fields were requested", () => {
    expect(
      getCardConfigEligible({
        // $FlowIssue need to add the new card fields as a constant
        components: ["card-fields"],
        fundingSource: FUNDING.PAYPAL,
        fundingEligibility: getEligibility(),
        wallet: getWallet(),
        flow: BUTTON_FLOW.PURCHASE,
      })
    ).toEqual(false);
  });

  test("should be ineligible if card-fields were requested, even if there is a vaulted instrument", () => {
    expect(
      getCardConfigEligible({
        // $FlowIssue need to add the new card fields as a constant
        components: ["card-fields"],
        fundingSource: FUNDING.PAYPAL,
        fundingEligibility: getEligibility(),
        wallet: getWallet({
          card: ["some instrument"],
        }),
        flow: BUTTON_FLOW.PURCHASE,
      })
    ).toEqual(false);
  });

  test("should be eligible if there is a vaulted card", () => {
    expect(
      getCardConfigEligible({
        components: [],
        fundingSource: FUNDING.PAYPAL,
        fundingEligibility: getEligibility(),
        wallet: getWallet({
          card: ["some instrument"],
        }),
        flow: BUTTON_FLOW.PURCHASE,
      })
    ).toEqual(true);
  });

  test("should be ineligible if hosted-fields was requested", () => {
    expect(
      getCardConfigEligible({
        components: [COMPONENTS.HOSTED_FIELDS],
        fundingSource: FUNDING.PAYPAL,
        fundingEligibility: getEligibility(),
        wallet: getWallet(),
        flow: BUTTON_FLOW.PURCHASE,
      })
    ).toEqual(false);
  });

  test("should default to true", () => {
    expect(
      getCardConfigEligible({
        components: [],
        fundingSource: FUNDING.PAYPAL,
        fundingEligibility: getEligibility(),
        wallet: getWallet(),
        flow: BUTTON_FLOW.PURCHASE,
      })
    ).toEqual(true);
  });
});
