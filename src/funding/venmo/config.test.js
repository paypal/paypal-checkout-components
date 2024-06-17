/* @flow */

import { describe, expect } from "vitest";

import { BUTTON_FLOW } from "../../constants";

import { getVenmoConfig } from "./config";

describe("Venmo eligibility", () => {
  const baseEligibilityProps = {
    fundingSource: undefined,
    components: ["buttons"],
    fundingEligibility: {},
    experiment: {
      venmoWebEnabled: true,
    },
    wallet: expect.any,
    flow: BUTTON_FLOW.PURCHASE,
  };
  const venmoConfig = getVenmoConfig();

  test("should not be eligible if a shipping callback is passed and displayOnly=['vaultable']", () => {
    const isVenmoEligible = venmoConfig.eligible?.({
      ...baseEligibilityProps,
      shippingChange: true,
      displayOnly: ["vaultable"],
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
      displayOnly: ["vaultable"],
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

  test("should not be eligible if a shipping callback is passed & experiment does not include venmoWebEnabled", () => {
    const isVenmoEligible = venmoConfig.eligible?.({
      ...baseEligibilityProps,
      experiment: {},
      shippingChange: true,
    });

    expect(isVenmoEligible).toEqual(false);
  });

  test("should be eligible if shipping callback exists & experiment includes venmoWebEnabled", () => {
    const isVenmoEligible = venmoConfig.eligible?.({
      ...baseEligibilityProps,
      shippingChange: true,
    });

    expect(isVenmoEligible).toEqual(true);
  });
});
