/* @flow */

import { describe, expect } from "vitest";
import { DISPLAY_ONLY_VALUES, PLATFORM } from "@paypal/sdk-constants/src";

import { BUTTON_FLOW } from "../../constants";

import { getVenmoConfig } from "./config";

describe("Venmo eligibility", () => {
  window.navigator.mockUserAgent =
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

  const baseEligibilityProps = {
    fundingSource: undefined,
    components: ["buttons"],
    fundingEligibility: {},
    experiment: {
      isWebViewEnabled: false,
      venmoWebEnabled: true,
      venmoEnableWebOnNonNativeBrowser: true,
    },
    wallet: expect.any,
    flow: BUTTON_FLOW.PURCHASE,
  };
  const venmoConfig = getVenmoConfig();

  describe("eligible", () => {
    test("should be eligible if fundingEligibility is true and enable-funding is set", () => {
      const isVenmoEligible = venmoConfig.eligible?.({
        ...baseEligibilityProps,
        experiment: {
          enableVenmo: true,
        },
      });

      expect(isVenmoEligible).toEqual(true);
    });

    test("should be not eligible if fundingEligibility is false || enable-funding is not set", () => {
      const isVenmoEligible = venmoConfig.eligible?.({
        ...baseEligibilityProps,
        experiment: {
          enableVenmo: false,
        },
      });

      expect(isVenmoEligible).toEqual(false);
    });

    test("should not be eligible if a shipping callback is passed and displayOnly=['vaultable']", () => {
      const isVenmoEligible = venmoConfig.eligible?.({
        ...baseEligibilityProps,
        shippingChange: true,
        displayOnly: [DISPLAY_ONLY_VALUES.VAULTABLE],
      });

      expect(isVenmoEligible).toEqual(false);
    });

    test("should be eligible if a shipping callback is present but not displayOnly", () => {
      const isVenmoEligible = venmoConfig.eligible?.({
        ...baseEligibilityProps,
        shippingChange: true,
      });

      expect(isVenmoEligible).toEqual(true);
    });

    test("should be eligible if displayOnly=['vaultable'] but no shipping callback is present", () => {
      const isVenmoEligible = venmoConfig.eligible?.({
        ...baseEligibilityProps,
        displayOnly: [DISPLAY_ONLY_VALUES.VAULTABLE],
      });

      expect(isVenmoEligible).toEqual(true);
    });

    test("should be eligible if neither a shipping callback nor displayOnly is present", () => {
      const isVenmoEligible = venmoConfig.eligible?.(baseEligibilityProps);

      expect(isVenmoEligible).toEqual(true);
    });

    test("should be eligible if flow is VAULT_WITHOUT_PURCHASE and venmoVaultWithoutPurchase is true", () => {
      const isVenmoEligible = venmoConfig.eligible?.({
        ...baseEligibilityProps,
        flow: BUTTON_FLOW.VAULT_WITHOUT_PURCHASE,
        experiment: {
          venmoVaultWithoutPurchase: true,
        },
      });

      expect(isVenmoEligible).toEqual(true);
    });
  });

  describe("requires", () => {
    test("should require native and popup support when platform is mobile", () => {
      const venmoRequires = venmoConfig.requires?.({
        platform: PLATFORM.MOBILE,
      });

      expect(venmoRequires).toEqual({
        native: true,
        popup: true,
      });
    });

    test("should not require native or popup support when platform is desktop", () => {
      const venmoRequires = venmoConfig.requires?.({
        platform: PLATFORM.DESKTOP,
      });

      expect(venmoRequires).toEqual({
        native: false,
        popup: false,
      });
    });

    test("should not require native or popup support when platform is not specified", () => {
      const venmoRequires = venmoConfig.requires?.({});

      expect(venmoRequires).toEqual({
        native: false,
        popup: false,
      });
    });
  });
});
