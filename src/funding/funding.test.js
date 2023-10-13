import { describe, expect } from "vitest";
import { isFundingEligible } from "./funding";
import { COMPONENTS, FUNDING } from "@paypal/sdk-constants/src";

const defaultMockFundingOptions = {
  platform: "desktop",
  fundingEligibility: {
    paylater: {
      eligible: true,
      vaultable: false,
    },
    venmo: {
      eligible: true,
      vaultable: true,
    },
    sepa: {
      eligible: false,
    },
    card: {
      eligible: true,
      vendors: {
        visa: {
          eligible: true,
          vaultable: false,
        },
        mastercard: {
          eligible: true,
          vaultable: false,
        },
        amex: {
          eligible: true,
          vaultable: false,
        },
      },
    },
  },
};

describe("Funding eligibility", () => {
  test("should not be eligible if funding source is missing from fundingEligibility", () => {
    const fundingEligible = isFundingEligible("fake_funding", {
      fundingEligibility: { venmo: { eligible: true } },
    });

    expect(fundingEligible).toBe(false);
  });

  test("should not be eligible if displayOnly includes 'vaultable' and vaultable is false", () => {
    const options = {
      displayOnly: ["vaultable"],
      ...defaultMockFundingOptions,
    };
    const fundingEligible = isFundingEligible(FUNDING.PAYLATER, options);

    expect(fundingEligible).toBe(false);
  });

  test("card should not be eligible if displayOnly includes 'vaultable' and no vendors are vaultable", () => {
    const options = {
      displayOnly: ["vaultable"],
      components: COMPONENTS.BUTTONS,
      ...defaultMockFundingOptions,
    };
    const fundingEligible = isFundingEligible(FUNDING.CARD, options);

    expect(fundingEligible).toBe(false);
  });

  test("card should be eligible if displayOnly includes 'vaultable' and any vendor is vaultable", () => {
    const options = {
      displayOnly: ["vaultable"],
      components: COMPONENTS.BUTTONS,
      platform: "desktop",
      fundingEligibility: {
        card: {
          eligible: true,
          vendors: {
            visa: {
              eligible: true,
              vaultable: true,
            },
            mastercard: {
              eligible: true,
              vaultable: false,
            },
          },
        },
      },
    };

    const fundingEligible = isFundingEligible(FUNDING.CARD, options);

    expect(fundingEligible).toBe(true);
  });

  test("should not be eligible if fundingSource.eligible is false", () => {
    const fundingEligible = isFundingEligible(
      FUNDING.SEPA,
      defaultMockFundingOptions
    );

    expect(fundingEligible).toBe(false);
  });
});
