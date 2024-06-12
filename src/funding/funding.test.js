/* @flow */
import { COMPONENTS, FUNDING } from "@paypal/sdk-constants/src";
import { describe, expect } from "vitest";

import { BUTTON_FLOW } from "../constants";

import { isFundingEligible, isWalletFundingEligible } from "./funding";

const defaultMockFundingOptions = {
  platform: "desktop",
  components: [COMPONENTS.BUTTONS],
  flow: BUTTON_FLOW.PURCHASE,
  fundingSource: FUNDING.SEPA,
  fundingEligibility: {
    paylater: {
      eligible: true,
      vaultable: false,
    },
    venmo: {
      eligible: true,
      vaultable: true,
      branded: false,
    },
    sepa: {
      eligible: false,
      branded: false,
    },
    oxxo: {
      eligible: false,
      vaultable: true,
      branded: false,
    },
    card: {
      eligible: true,
      branded: false,
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
  applePaySupport: false,
  supportsPopups: true,
  supportedNativeBrowser: true,
  onShippingChange: null,
  onShippingAddressChange: null,
  onShippingOptionsChange: null,
};

describe("Funding eligibility", () => {
  test("should not be eligible if funding source is missing from fundingEligibility", () => {
    const fundingEligible = isFundingEligible(
      FUNDING.WECHATPAY,
      defaultMockFundingOptions
    );

    expect(fundingEligible).toBe(false);
  });

  test("should not be eligible if displayOnly includes 'vaultable' and vaultable is false", () => {
    const options = {
      ...defaultMockFundingOptions,
      displayOnly: ["vaultable"],
      fundingSource: FUNDING.PAYLATER,
    };
    const fundingEligible = isFundingEligible(FUNDING.PAYLATER, options);

    expect(fundingEligible).toBe(false);
  });

  test("card should not be eligible if displayOnly includes 'vaultable' and no vendors are vaultable", () => {
    const options = {
      ...defaultMockFundingOptions,
      displayOnly: ["vaultable"],
      components: [COMPONENTS.BUTTONS],
      fundingSource: FUNDING.CARD,
    };
    const fundingEligible = isFundingEligible(FUNDING.CARD, options);

    expect(fundingEligible).toBe(false);
  });

  test("card should be eligible if displayOnly includes 'vaultable' and any vendor is vaultable", () => {
    const options = {
      ...defaultMockFundingOptions,
      displayOnly: ["vaultable"],
      fundingSource: FUNDING.CARD,
      components: [COMPONENTS.BUTTONS],
      platform: "desktop",
      fundingEligibility: {
        card: {
          eligible: true,
          branded: false,
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

  test("should not be eligible if fundingSource.eligible is false and fundingSource.vaultable is true", () => {
    const fundingEligible = isFundingEligible(
      FUNDING.OXXO,
      defaultMockFundingOptions
    );

    expect(fundingEligible).toBe(false);
  });
});

describe("isWalletFundingEligible", () => {
  const mockWalletValue = { instruments: [] };
  const mockWallet = {
    paypal: mockWalletValue,
    card: mockWalletValue,
    credit: mockWalletValue,
    venmo: mockWalletValue,
  };

  test("should not be eligible if a shipping callback is present", () => {
    const result = isWalletFundingEligible({
      wallet: mockWallet,
      hasShippingCallback: true,
    });
    expect(result).toBe(false);
  });

  test("should not be eligible if wallet does not exist", () => {
    const result = isWalletFundingEligible({
      wallet: null,
      hasShippingCallback: false,
    });
    expect(result).toBe(false);
  });

  test("should be eligible if a shipping callback is not present & wallet exists", () => {
    const result = isWalletFundingEligible({
      wallet: mockWallet,
      hasShippingCallback: false,
    });
    expect(result).toBe(true);
  });
});
