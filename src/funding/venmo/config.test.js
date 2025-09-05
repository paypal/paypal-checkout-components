/* @flow */

import { describe, expect } from "vitest";
import { DISPLAY_ONLY_VALUES, PLATFORM } from "@paypal/sdk-constants/src";

import { BUTTON_FLOW } from "../../constants";

import { getVenmoConfig } from "./config";

describe("Venmo eligibility", () => {
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

    test("should not be eligible if flow is VAULT_WITHOUT_PURCHASE and venmoVaultWithoutPurchase is false", () => {
      const isVenmoEligible = venmoConfig.eligible?.({
        ...baseEligibilityProps,
        flow: BUTTON_FLOW.VAULT_WITHOUT_PURCHASE,
      });

      expect(isVenmoEligible).toEqual(false);
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
    test("should not check for native or popup eligibility if platform is mobile and window.popupBridge is defined", () => {
      window.popupBridge = {};

      const isVenmoEligible = venmoConfig.requires?.({
        experiment: {
          venmoEnableWebOnNonNativeBrowser: true,
        },
        platform: PLATFORM.MOBILE,
      });

      expect(isVenmoEligible).toEqual({
        native: false,
        popup: false,
      });

      window.popupBridge = undefined;
    });

    test("should not check for native or popup eligibility if platform is mobile and venmoEnableWebOnNonNativeBrowser is true", () => {
      const isVenmoEligible = venmoConfig.requires?.({
        experiment: {
          venmoEnableWebOnNonNativeBrowser: true,
        },
        platform: PLATFORM.MOBILE,
      });

      expect(isVenmoEligible).toEqual({
        native: false,
        popup: false,
      });
    });

    test("should check for native and popup eligibility if platform is mobile and venmoEnableWebOnNonNativeBrowser is false and window.popupBridge is not defined", () => {
      const isVenmoEligible = venmoConfig.requires?.({
        experiment: {
          venmoEnableWebOnNonNativeBrowser: false,
        },
        platform: PLATFORM.MOBILE,
      });

      expect(isVenmoEligible).toEqual({
        native: true,
        popup: true,
      });
    });

    test("should not check for native and popup eligibility if platform is not mobile", () => {
      const isVenmoEligible = venmoConfig.requires?.({
        platform: PLATFORM.DESKTOP,
      });

      expect(isVenmoEligible).toEqual({});
    });
  });
});
