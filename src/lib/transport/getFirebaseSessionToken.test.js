/* @flow */

import { describe, it, expect, vi } from "vitest";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";

import { getFirebaseSessionToken } from "./getFirebaseSessionToken";

const { requestMock } = vi.hoisted(() => ({ requestMock: vi.fn() }));

vi.mock("@krakenjs/belter/src", () => ({ request: requestMock }));

describe("getFirebaseSessionToken", () => {
  it("requests the relay endpoint with the encoded channel id and returns the token", async () => {
    requestMock.mockReturnValue(
      ZalgoPromise.resolve({ status: 200, body: { sessionToken: "tok" } }),
    );

    await expect(getFirebaseSessionToken("a b/c")).resolves.toBe("tok");

    const call = requestMock.mock.calls[0][0];
    expect(call.url).toBe(
      "/web-sdk/v6.0.0/relay/session-token?sessionId=a%20b%2Fc",
    );
    expect(call.method).toBe("GET");
  });

  it("rejects on a non-200 status", async () => {
    requestMock.mockReturnValue(
      ZalgoPromise.resolve({ status: 404, body: { sessionToken: "tok" } }),
    );

    await expect(getFirebaseSessionToken("c")).rejects.toThrow(/status 404/);
  });

  it("rejects when the body has no token", async () => {
    requestMock.mockReturnValue(
      ZalgoPromise.resolve({ status: 200, body: {} }),
    );

    await expect(getFirebaseSessionToken("c")).rejects.toThrow(/session token/);
  });
});
