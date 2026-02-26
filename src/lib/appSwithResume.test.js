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

  test("should test fetching resume params when parameters are correctly passed with ? delimiter", () => {
    vi.spyOn(window, "location", "get").mockReturnValue({
      hash: `#onApprove?button_session_id=${buttonSessionID}&token=${orderID}&fundingSource=${fundingSource}`,
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

  test("should test fetching resume params when parameters are correctly passed with only & delimiter", () => {
    vi.spyOn(window, "location", "get").mockReturnValue({
      hash: `#onApprove&button_session_id=${buttonSessionID}&token=${orderID}&fundingSource=${fundingSource}`,
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
    });

    const params = getAppSwitchResumeParams();

    expect.assertions(2);
    expect(params).toEqual(null);
    expect(isAppSwitchResumeFlow()).toEqual(false);
  });

  test("should extract resume params from hash with non-action prefix via web fallback", () => {
    // When hash is not a known action (e.g. #Unknown) but contains PayPal params,
    // the web fallback should extract them from the hash fragment.
    vi.spyOn(window, "location", "get").mockReturnValue({
      hash: `#Unknown?button_session_id=${buttonSessionID}&token=${orderID}&fundingSource=${fundingSource}`,
      search: "",
    });

    const params = getAppSwitchResumeParams();

    expect.assertions(2);
    expect(params).toEqual({
      buttonSessionID,
      checkoutState: "onCancel",
      fundingSource,
      orderID,
    });
    expect(isAppSwitchResumeFlow()).toEqual(true);
  });

  test("should test fetching multiple resume params when parameters are correctly passed", () => {
    vi.spyOn(window, "location", "get").mockReturnValue({
      hash: `#onApprove?button_session_id=${buttonSessionID}&token=${orderID}&fundingSource=${fundingSource}&billingToken=BA-124&PayerID=PP-payer-122&paymentID=PAY-123&subscriptionID=I-1234&vaultSetupToken=VA-3`,
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

  test("should test onApprove resume params when parameters are passed from web fallback with vaultSetupToken", () => {
    vi.spyOn(window, "location", "get").mockReturnValue({
      search: `?button_session_id=${buttonSessionID}&token=${orderID}&fundingSource=${fundingSource}&vaultSetupToken=VA-3&PayerID=PP123456`,
    });

    const params = getAppSwitchResumeParams();

    expect.assertions(2);
    expect(params).toEqual({
      buttonSessionID,
      checkoutState: "onApprove",
      fundingSource,
      orderID,
      payerID: "PP123456",
      vaultSetupToken: "VA-3",
    });
    expect(isAppSwitchResumeFlow()).toEqual(true);
  });

  test("should test onCancel resume params when parameters are passed from web fallback with approval_token_id", () => {
    vi.spyOn(window, "location", "get").mockReturnValue({
      search: `?button_session_id=${buttonSessionID}&token=${orderID}&fundingSource=${fundingSource}&approval_token_id=VA-3`,
    });

    const params = getAppSwitchResumeParams();

    expect.assertions(2);
    expect(params).toEqual({
      buttonSessionID,
      checkoutState: "onCancel",
      fundingSource,
      orderID,
      vaultSetupToken: "VA-3",
    });
    expect(isAppSwitchResumeFlow()).toEqual(true);
  });

  test("should extract resume params when merchant return_url has hash fragment with ? delimiter", () => {
    vi.spyOn(window, "location", "get").mockReturnValue({
      hash: `#payment?button_session_id=${buttonSessionID}&token=${orderID}&fundingSource=${fundingSource}&PayerID=PP-payer-122`,
      search: "",
    });

    const params = getAppSwitchResumeParams();

    expect(params).toEqual({
      buttonSessionID,
      checkoutState: "onApprove",
      fundingSource,
      orderID,
      payerID: "PP-payer-122",
    });
    expect(isAppSwitchResumeFlow()).toEqual(true);
  });

  test("should extract resume params when merchant return_url has hash fragment without PayerID (cancel)", () => {
    vi.spyOn(window, "location", "get").mockReturnValue({
      hash: `#payment?button_session_id=${buttonSessionID}&token=${orderID}&fundingSource=${fundingSource}`,
      search: "",
    });

    const params = getAppSwitchResumeParams();

    expect(params).toEqual({
      buttonSessionID,
      checkoutState: "onCancel",
      fundingSource,
      orderID,
    });
    expect(isAppSwitchResumeFlow()).toEqual(true);
  });

  test("should extract resume params when hash uses & delimiter instead of ?", () => {
    // Real-world case: URL like /ppcp-js-sdk?clientSideDelay=0#payment&token=...&PayerID=...
    vi.spyOn(window, "location", "get").mockReturnValue({
      hash: `#payment&token=${orderID}&PayerID=PP-payer-122&button_session_id=${buttonSessionID}`,
      search: "?clientSideDelay=0&serverSideDelay=0",
    });

    const params = getAppSwitchResumeParams();

    expect(params).toEqual({
      buttonSessionID,
      checkoutState: "onApprove",
      orderID,
      payerID: "PP-payer-122",
    });
    expect(isAppSwitchResumeFlow()).toEqual(true);
  });

  test("should extract vault resume params from hash fragment", () => {
    vi.spyOn(window, "location", "get").mockReturnValue({
      hash: `#/step3?button_session_id=${buttonSessionID}&token=${orderID}&approval_token_id=VA-3`,
      search: "",
    });

    const params = getAppSwitchResumeParams();

    expect(params).toEqual({
      buttonSessionID,
      checkoutState: "onCancel",
      orderID,
      vaultSetupToken: "VA-3",
    });
    expect(isAppSwitchResumeFlow()).toEqual(true);
  });

  test("should prefer search params over hash params when both exist", () => {
    vi.spyOn(window, "location", "get").mockReturnValue({
      hash: `#payment?token=WRONG-TOKEN`,
      search: `?button_session_id=${buttonSessionID}&token=${orderID}&PayerID=PP-123`,
    });

    const params = getAppSwitchResumeParams();

    expect(params).toEqual({
      buttonSessionID,
      checkoutState: "onApprove",
      orderID,
      payerID: "PP-123",
    });
  });

  test("should return null when hash has merchant fragment but no PayPal params", () => {
    vi.spyOn(window, "location", "get").mockReturnValue({
      hash: "#payment",
      search: "",
    });

    const params = getAppSwitchResumeParams();

    expect(params).toEqual(null);
    expect(isAppSwitchResumeFlow()).toEqual(false);
  });

  test("should return null when hash has merchant fragment with unrelated params", () => {
    vi.spyOn(window, "location", "get").mockReturnValue({
      hash: "#/checkout?step=review&cart=abc123",
      search: "",
    });

    const params = getAppSwitchResumeParams();

    expect(params).toEqual(null);
    expect(isAppSwitchResumeFlow()).toEqual(false);
  });

  test("should handle vaultSetupToken in search params", () => {
    vi.spyOn(window, "location", "get").mockReturnValue({
      hash: "",
      search: `?button_session_id=${buttonSessionID}&vaultSetupToken=VA-123&PayerID=PP-456`,
    });

    const params = getAppSwitchResumeParams();

    expect(params).toEqual({
      buttonSessionID,
      checkoutState: "onApprove",
      payerID: "PP-456",
      vaultSetupToken: "VA-123",
    });
    expect(isAppSwitchResumeFlow()).toEqual(true);
  });

  test("should handle approval_token_id in search params", () => {
    vi.spyOn(window, "location", "get").mockReturnValue({
      hash: "",
      search: `?button_session_id=${buttonSessionID}&approval_token_id=AT-789`,
    });

    const params = getAppSwitchResumeParams();

    expect(params).toEqual({
      buttonSessionID,
      checkoutState: "onCancel",
      vaultSetupToken: "AT-789",
    });
    expect(isAppSwitchResumeFlow()).toEqual(true);
  });

  test("should handle approval_session_id in search params", () => {
    vi.spyOn(window, "location", "get").mockReturnValue({
      hash: "",
      search: `?button_session_id=${buttonSessionID}&approval_session_id=AS-999`,
    });

    const params = getAppSwitchResumeParams();

    expect(params).toEqual({
      buttonSessionID,
      checkoutState: "onCancel",
      vaultSetupToken: "AS-999",
    });
    expect(isAppSwitchResumeFlow()).toEqual(true);
  });

  describe("hash URL variations", () => {
    // Tests for all supported hash URL formats that the web fallback must handle.
    // PayPal appends params to the URL after app switch; the exact position depends
    // on the merchant's return_url structure.

    test("#hash - plain hash with no params returns null", () => {
      vi.spyOn(window, "location", "get").mockReturnValue({
        hash: "#hash",
        search: "",
      });

      const params = getAppSwitchResumeParams();

      expect(params).toEqual(null);
      expect(isAppSwitchResumeFlow()).toEqual(false);
    });

    test("?query=param#hash - PayPal params in search, merchant hash fragment", () => {
      vi.spyOn(window, "location", "get").mockReturnValue({
        hash: "#hash",
        search: `?button_session_id=${buttonSessionID}&token=${orderID}&PayerID=PP-payer-122`,
      });

      const params = getAppSwitchResumeParams();

      expect(params).toEqual({
        buttonSessionID,
        checkoutState: "onApprove",
        orderID,
        payerID: "PP-payer-122",
      });
      expect(isAppSwitchResumeFlow()).toEqual(true);
    });

    test("#hash?query=param - PayPal params embedded in hash after ?", () => {
      vi.spyOn(window, "location", "get").mockReturnValue({
        hash: `#hash?button_session_id=${buttonSessionID}&token=${orderID}&PayerID=PP-payer-122`,
        search: "",
      });

      const params = getAppSwitchResumeParams();

      expect(params).toEqual({
        buttonSessionID,
        checkoutState: "onApprove",
        orderID,
        payerID: "PP-payer-122",
      });
      expect(isAppSwitchResumeFlow()).toEqual(true);
    });

    test("/#/checkout/completed - SPA-style hash path with no params returns null", () => {
      vi.spyOn(window, "location", "get").mockReturnValue({
        hash: "#/checkout/completed",
        search: "",
      });

      const params = getAppSwitchResumeParams();

      expect(params).toEqual(null);
      expect(isAppSwitchResumeFlow()).toEqual(false);
    });

    test("/#/checkout/completed?query=param - PayPal params after SPA-style hash path", () => {
      vi.spyOn(window, "location", "get").mockReturnValue({
        hash: `#/checkout/completed?button_session_id=${buttonSessionID}&token=${orderID}&PayerID=PP-payer-122`,
        search: "",
      });

      const params = getAppSwitchResumeParams();

      expect(params).toEqual({
        buttonSessionID,
        checkoutState: "onApprove",
        orderID,
        payerID: "PP-payer-122",
      });
      expect(isAppSwitchResumeFlow()).toEqual(true);
    });

    test("#onApprove&token=...&hash?param=value - native app return with & delimiter and merchant hash containing ?", () => {
      // Native app constructs return URL with & delimiter between action and params,
      // and the merchant's original hash fragment contained a ? (e.g. #hash?param1=value1).
      // The ? must not cause a mis-split; & appears first so it takes priority.
      vi.spyOn(window, "location", "get").mockReturnValue({
        hash: `#onApprove&token=${orderID}&PayerID=PP-payer-122&button_session_id=${buttonSessionID}&switch_initiated_time=1772041777662&hash?param1=value1`,
        search: "",
      });

      const params = getAppSwitchResumeParams();

      expect(params).toEqual({
        buttonSessionID,
        checkoutState: "onApprove",
        orderID,
        payerID: "PP-payer-122",
      });
      expect(isAppSwitchResumeFlow()).toEqual(true);
    });

    test("#onCancel&token=...&hash?param=value - native app cancel with & delimiter and merchant hash containing ?", () => {
      vi.spyOn(window, "location", "get").mockReturnValue({
        hash: `#onCancel&token=${orderID}&button_session_id=${buttonSessionID}&hash?param1=value1`,
        search: "",
      });

      const params = getAppSwitchResumeParams();

      expect(params).toEqual({
        buttonSessionID,
        checkoutState: "onCancel",
        orderID,
      });
      expect(isAppSwitchResumeFlow()).toEqual(true);
    });

    test("#onApprove?token=...&hash?param=value - native app return with ? delimiter and merchant hash containing ?", () => {
      // Native app uses ? delimiter, and merchant hash also contains ?.
      // The first ? splits action from params; the second ? is just part of param values.
      vi.spyOn(window, "location", "get").mockReturnValue({
        hash: `#onApprove?token=${orderID}&PayerID=PP-payer-122&button_session_id=${buttonSessionID}&hash?param1=value1`,
        search: "",
      });

      const params = getAppSwitchResumeParams();

      expect(params).toEqual({
        buttonSessionID,
        checkoutState: "onApprove",
        orderID,
        payerID: "PP-payer-122",
      });
      expect(isAppSwitchResumeFlow()).toEqual(true);
    });
  });

  test("should return null when web fallback throws error", () => {
    // Mock location.search as a getter that throws an error
    // eslint-disable-next-line compat/compat
    const originalURLSearchParams = window.URLSearchParams;
    // eslint-disable-next-line compat/compat
    window.URLSearchParams = class {
      constructor() {
        throw new Error("Invalid URL");
      }
    };

    vi.spyOn(window, "location", "get").mockReturnValue({
      hash: "",
      search: "?invalid",
    });

    const params = getAppSwitchResumeParams();

    expect(params).toEqual(null);
    expect(isAppSwitchResumeFlow()).toEqual(false);

    // Restore original URLSearchParams
    // eslint-disable-next-line compat/compat
    window.URLSearchParams = originalURLSearchParams;
  });
});
