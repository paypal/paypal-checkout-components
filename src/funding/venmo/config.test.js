/* @flow */

import { describe, expect } from "vitest";
import { getVenmoConfig } from "./config";

describe("Venmo eligibility", () => {
  const venmoConfig = getVenmoConfig();

  test("should not be eligible if a shipping callback is passed and displayOnly=['vaultable']", () => {
    const isVenmoEligible = venmoConfig.eligible({
      shippingChange: true,
      displayOnly: ["vaultable"],
    });

    expect(isVenmoEligible).toEqual(false);
  });

  test("should be eligible if a shipping callback is present but not displayOnly", () => {
    const isVenmoEligible = venmoConfig.eligible({ shippingChange: true });

    expect(isVenmoEligible).toEqual(true);
  });

  test("should be eligible if displayOnly=['vaultable'] but no shipping callback is present", () => {
    const isVenmoEligible = venmoConfig.eligible({
      displayOnly: ["vaultable"],
    });

    expect(isVenmoEligible).toEqual(true);
  });

  test("should be eligible if neither a shipping callback nor displayOnly is present", () => {
    const isVenmoEligible = venmoConfig.eligible({});

    expect(isVenmoEligible).toEqual(true);
  });
});
