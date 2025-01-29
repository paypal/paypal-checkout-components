/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { noop } from "@krakenjs/belter/src";
import { describe, expect, vi } from "vitest";
import { getEnv } from "@paypal/sdk-client/src";

import { getThreeDS } from "./utils";

vi.mock("@paypal/sdk-client/src");

describe("Three Domain Secure Utils", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should create and return fastlane component", () => {
    vi.mocked(getEnv).mockReturnValue("stage");
    vi.mock("@krakenjs/zoid/src", () => ({
      create: vi.fn(() => ({
        isChild: vi.fn().mockReturnValue(false),
        xprops: {
          payerActionUrl: "mock-payer-action-url",
        },
      })),
      type: "zoidComponent",
    }));

    const fastlaneComponent = getThreeDS();
    expect(fastlaneComponent).toBeDefined();
    // expect(createMock).toHaveBeenCalledTimes(1);
  });

  it("Should set window.xchild if component is child", () => {
    vi.mock("@krakenjs/zoid/src", () => ({
      create: vi.fn(() => ({
        isChild: vi.fn().mockReturnValue(true),
        xprops: {
          payerActionUrl: "mock-payer-action-url",
        },
      })),
      type: "zoidComponent",
    }));

    getThreeDS();

    expect(window.xchild).toBeDefined();
    expect(window.xchild).toEqual({
      props: {
        payerActionUrl: "mock-payer-action-url",
      },
      close: noop,
    });
  });
});
