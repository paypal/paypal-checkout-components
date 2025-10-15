/* @flow */
import { COMPONENTS, FUNDING } from "@paypal/sdk-constants/src";
import { describe, expect, vi, beforeEach, afterEach } from "vitest";

import { BUTTON_FLOW } from "../constants";

import { isFundingEligible, isWalletFundingEligible } from "./funding";
import { supportsVenmoPopups, isSupportedNativeVenmoBrowser } from "./util";
import { getFundingConfig } from "./config";

// Mock the venmo utility functions
vi.mock("./util", () => ({
  supportsVenmoPopups: vi.fn(),
  isSupportedNativeVenmoBrowser: vi.fn(),
}));

// Mock getFundingConfig to control funding config behavior
vi.mock("./config", () => ({
  getFundingConfig: vi.fn(),
}));

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
  supportsVenmoPopups: false,
  supportedNativeVenmoBrowser: false,
  onShippingChange: null,
  onShippingAddressChange: null,
  onShippingOptionsChange: null,
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
};

describe("Funding eligibility", () => {
  beforeEach(() => {
    // Mock getFundingConfig with basic configs for all funding sources
    vi.mocked(getFundingConfig).mockReturnValue({
      [FUNDING.PAYLATER]: {
        enabled: true,
        automatic: true,
      },
      [FUNDING.CARD]: {
        enabled: true,
        automatic: true,
      },
      [FUNDING.SEPA]: {
        enabled: false,
        automatic: false,
      },
      [FUNDING.OXXO]: {
        enabled: false,
        automatic: false,
      },
      [FUNDING.VENMO]: {
        enabled: true,
        automatic: true,
      },
      [FUNDING.PAYPAL]: {
        enabled: true,
        automatic: true,
      },
    });
  });

  describe("Desktop", () => {
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

    describe("Venmo-specific funding requirements", () => {
      beforeEach(() => {
        // Reset all mocks before each test
        vi.clearAllMocks();

        // Mock getFundingConfig to return configs with venmo requirements
        vi.mocked(getFundingConfig).mockReturnValue({
          [FUNDING.PAYLATER]: {
            enabled: true,
            automatic: true,
          },
          [FUNDING.CARD]: {
            enabled: true,
            automatic: true,
          },
          [FUNDING.SEPA]: {
            enabled: false,
            automatic: false,
          },
          [FUNDING.OXXO]: {
            enabled: false,
            automatic: false,
          },
          [FUNDING.VENMO]: {
            enabled: true,
            automatic: true,
            requires: () => ({
              popup: true,
              native: true,
            }),
          },
          [FUNDING.PAYPAL]: {
            enabled: true,
            automatic: true,
            requires: () => ({
              popup: true,
              native: true,
            }),
          },
        });
      });

      afterEach(() => {
        vi.resetAllMocks();
      });

      test("should use supportsVenmoPopups for venmo funding source when popup is required", () => {
        vi.mocked(supportsVenmoPopups).mockReturnValue(true);
        vi.mocked(isSupportedNativeVenmoBrowser).mockReturnValue(true);

        const options = {
          ...defaultMockFundingOptions,
          fundingSource: FUNDING.VENMO,
          platform: "mobile",
          experiment: { venmoEnableWebOnNonNativeBrowser: true },
        };

        const result = isFundingEligible(FUNDING.VENMO, options);

        expect(supportsVenmoPopups).toHaveBeenCalledWith(
          options.experiment,
          true,
          options.userAgent
        );
        expect(result).toBe(true);
      });

      test("should use isSupportedNativeVenmoBrowser for venmo funding source when native is required", () => {
        const options = {
          ...defaultMockFundingOptions,
          fundingSource: FUNDING.VENMO,
          platform: "mobile",
          experiment: { venmoEnableWebOnNonNativeBrowser: true },
          supportedNativeVenmoBrowser: true,
          supportsVenmoPopups: true,
        };

        const result = isFundingEligible(FUNDING.VENMO, options);

        expect(isSupportedNativeVenmoBrowser).toHaveBeenCalledWith(
          options.experiment,
          options.userAgent
        );
        expect(result).toBe(true);
      });

      test("should return false when venmo popup support is required but supportsVenmoPopups returns false", () => {
        const options = {
          ...defaultMockFundingOptions,
          fundingSource: FUNDING.VENMO,
          platform: "mobile",
          experiment: {},
          supportsVenmoPopups: false,
          supportedNativeVenmoBrowser: true,
        };

        const result = isFundingEligible(FUNDING.VENMO, options);

        expect(supportsVenmoPopups).toHaveBeenCalledWith(
          options.experiment,
          true,
          options.userAgent
        );
        expect(result).toBe(false);
      });

      test("should return false when venmo native support is required but isSupportedNativeVenmoBrowser returns false", () => {
        vi.mocked(supportsVenmoPopups).mockReturnValue(true);
        vi.mocked(isSupportedNativeVenmoBrowser).mockReturnValue(false);

        const options = {
          ...defaultMockFundingOptions,
          fundingSource: FUNDING.VENMO,
          platform: "mobile",
          experiment: {},
        };

        const result = isFundingEligible(FUNDING.VENMO, options);

        expect(isSupportedNativeVenmoBrowser).toHaveBeenCalledWith(
          options.experiment,
          options.userAgent
        );
        expect(result).toBe(false);
      });

      test("should use standard supportsPopups for non-venmo funding sources", () => {
        vi.mocked(supportsVenmoPopups).mockReturnValue(false);
        vi.mocked(isSupportedNativeVenmoBrowser).mockReturnValue(false);

        // Update the mock to not require popup and native for PayPal to isolate the test
        vi.mocked(getFundingConfig).mockReturnValue({
          [FUNDING.PAYLATER]: {
            enabled: true,
            automatic: true,
          },
          [FUNDING.CARD]: {
            enabled: true,
            automatic: true,
          },
          [FUNDING.SEPA]: {
            enabled: false,
            automatic: false,
          },
          [FUNDING.OXXO]: {
            enabled: false,
            automatic: false,
          },
          [FUNDING.VENMO]: {
            enabled: true,
            automatic: true,
            requires: () => ({
              popup: true,
              native: true,
            }),
          },
          [FUNDING.PAYPAL]: {
            enabled: true,
            automatic: true,
            // No requires function for PayPal to test standard behavior
          },
        });

        const options = {
          ...defaultMockFundingOptions,
          fundingSource: FUNDING.PAYPAL,
          platform: "mobile",
          supportsPopups: true,
          supportedNativeBrowser: true,
          experiment: {},
          fundingEligibility: {
            ...defaultMockFundingOptions.fundingEligibility,
            paypal: {
              eligible: true,
              vaultable: false,
              branded: false,
            },
          },
        };

        const result = isFundingEligible(FUNDING.PAYPAL, options);

        // Venmo functions should not be called for non-venmo sources
        expect(supportsVenmoPopups).not.toHaveBeenCalled();
        expect(isSupportedNativeVenmoBrowser).not.toHaveBeenCalled();
        expect(result).toBe(true);
      });

      test("should handle undefined experiment parameter for venmo", () => {
        vi.mocked(supportsVenmoPopups).mockReturnValue(true);
        vi.mocked(isSupportedNativeVenmoBrowser).mockReturnValue(true);

        const options = {
          ...defaultMockFundingOptions,
          fundingSource: FUNDING.VENMO,
          platform: "mobile",
          experiment: undefined,
        };

        const result = isFundingEligible(FUNDING.VENMO, options);

        expect(supportsVenmoPopups).toHaveBeenCalledWith(
          undefined,
          true,
          options.userAgent
        );
        expect(isSupportedNativeVenmoBrowser).toHaveBeenCalledWith(
          undefined,
          options.userAgent
        );
        expect(result).toBe(true);
      });

      test("should pass through experiment flags to venmo utility functions", () => {
        vi.mocked(supportsVenmoPopups).mockReturnValue(true);
        vi.mocked(isSupportedNativeVenmoBrowser).mockReturnValue(true);

        const experimentFlags = {
          venmoEnableWebOnNonNativeBrowser: true,
          venmoVaultWithoutPurchase: false,
        };

        const options = {
          ...defaultMockFundingOptions,
          fundingSource: FUNDING.VENMO,
          platform: "mobile",
          experiment: experimentFlags,
        };

        const result = isFundingEligible(FUNDING.VENMO, options);

        expect(supportsVenmoPopups).toHaveBeenCalledWith(
          experimentFlags,
          true,
          options.userAgent
        );
        expect(isSupportedNativeVenmoBrowser).toHaveBeenCalledWith(
          experimentFlags,
          options.userAgent
        );
        expect(result).toBe(true);
      });

      test("should respect combination of venmo popup and native requirements", () => {
        // Test case where popup succeeds but native fails
        vi.mocked(supportsVenmoPopups).mockReturnValue(true);
        vi.mocked(isSupportedNativeVenmoBrowser).mockReturnValue(false);

        const options = {
          ...defaultMockFundingOptions,
          fundingSource: FUNDING.VENMO,
          platform: "mobile",
          experiment: {},
        };

        const result = isFundingEligible(FUNDING.VENMO, options);

        expect(result).toBe(false);

        // Test case where both succeed
        vi.mocked(isSupportedNativeVenmoBrowser).mockReturnValue(true);

        const result2 = isFundingEligible(FUNDING.VENMO, options);
        expect(result2).toBe(true);
      });
    });
  });
});
