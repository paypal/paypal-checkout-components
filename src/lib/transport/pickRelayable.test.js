/* @flow */

import { describe, expect, it } from "vitest";

import { pickRelayable } from "./pickRelayable";

describe("pickRelayable", () => {
  it("keeps only allowlisted keys", () => {
    expect(
      pickRelayable("onApprove", {
        orderID: "O-1",
        payerID: "P-1",
        authCode: "secret",
        buyerAccessToken: "secret",
      }),
    ).toEqual({ orderID: "O-1", payerID: "P-1" });
  });

  it("uses the allowlist of the named callback", () => {
    expect(
      pickRelayable("onCancel", { orderID: "O-1", payerID: "P-1" }),
    ).toEqual({ orderID: "O-1" });
  });

  it("returns {} for a name that is not relayable", () => {
    expect(pickRelayable("createOrder", { orderID: "O-1" })).toEqual({});
    expect(pickRelayable("toString", { orderID: "O-1" })).toEqual({});
  });

  it("returns {} for non-object data", () => {
    for (const data of [null, undefined, "orderID", 5, ["orderID"]]) {
      expect(pickRelayable("onApprove", data)).toEqual({});
    }
  });

  it("reduces an onError error to a truncated message", () => {
    const err = new Error("boom");
    // $FlowFixMe
    err.token = "secret";

    expect(pickRelayable("onError", err)).toEqual({ message: "boom" });
    expect(pickRelayable("onError", "oops")).toEqual({ message: "oops" });
    expect(pickRelayable("onError", null)).toEqual({
      message: "<unknown error: [object Null]>",
    });
    expect(
      pickRelayable("onError", new Error("x".repeat(600))).message,
    ).toHaveLength(500);
  });

  it("ignores inherited keys", () => {
    const data = Object.create({ orderID: "inherited" });
    expect(pickRelayable("onApprove", data)).toEqual({});
  });
});
