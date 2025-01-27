/* @flow */

import { vi, describe, expect } from "vitest";

import {
  isAppSwitchResumeFlow,
  getAppSwitchResumeParams,
} from "./appSwitchResume";

describe("app switch resume flow", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });
  const buttonSessionID = "uid_button_session_123444";
  const orderID = "EC-1223114";
  const fundingSource = "paypal";

  test("should test fetching resume params when its non resume flow", () => {
    const params = getAppSwitchResumeParams();

    expect.assertions(2);
    expect(params).toEqual(null);
    expect(isAppSwitchResumeFlow()).toEqual(false);
  });

  test("should test fetching resume params when parameters are correctly passed", () => {
    vi.spyOn(window, "location", "get").mockReturnValue({
      hash: `#onApprove?buttonSessionID=${buttonSessionID}&token=${orderID}&fundingSource=${fundingSource}`,
    });

    const params = getAppSwitchResumeParams();

    expect.assertions(2);
    expect(params).toEqual({
      buttonSessionID,
      checkoutState: "onApprove",
      fundingSource,
      orderID,
    });
    expect(isAppSwitchResumeFlow()).toEqual(true);
  });

  test("should test fetching resume params with invalid callback passed", () => {
    vi.spyOn(window, "location", "get").mockReturnValue({
      hash: "#Unknown",
      search: `buttonSessionID=${buttonSessionID}&token=${orderID}&fundingSource=${fundingSource}`,
    });

    const params = getAppSwitchResumeParams();

    expect.assertions(2);
    expect(params).toEqual(null);
    expect(isAppSwitchResumeFlow()).toEqual(false);
  });

  test("should test null fetching resume params with invalid callback passed", () => {
    vi.spyOn(window, "location", "get").mockReturnValue({
      hash: `#Unknown?buttonSessionID=${buttonSessionID}&token=${orderID}&fundingSource=${fundingSource}`,
    });

    const params = getAppSwitchResumeParams();

    expect.assertions(2);
    expect(params).toEqual(null);
    expect(isAppSwitchResumeFlow()).toEqual(false);
  });

  test("should test fetching multiple resume params when parameters are correctly passed", () => {
    vi.spyOn(window, "location", "get").mockReturnValue({
      hash: `#onApprove?buttonSessionID=${buttonSessionID}&token=${orderID}&fundingSource=${fundingSource}&billingToken=BA-124&PayerID=PP-payer-122&paymentID=PAY-123&subscriptionID=I-1234&vaultSetupToken=VA-3`,
    });

    const params = getAppSwitchResumeParams();

    expect.assertions(2);
    expect(params).toEqual({
      billingToken: "BA-124",
      buttonSessionID,
      checkoutState: "onApprove",
      fundingSource,
      orderID,
      payerID: "PP-payer-122",
      paymentID: "PAY-123",
      subscriptionID: "I-1234",
      vaultSetupToken: "VA-3",
    });
    expect(isAppSwitchResumeFlow()).toEqual(true);
  });
});
