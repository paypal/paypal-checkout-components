/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { noop } from "@krakenjs/belter/src";
import { describe, expect, vi } from "vitest";
import { getEnv } from "@paypal/sdk-client/src";

import { getFastlaneThreeDS } from "./utils";

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

    const fastlaneComponent = getFastlaneThreeDS();
    expect(fastlaneComponent).toBeDefined();
    // expect(createMock).toHaveBeenCalledTimes(1);
  });

  it.skip("Should call zoid create with correct params", () => {
    vi.resetModules();
    const createMock = vi.fn();

    vi.doMock("@krakenjs/zoid/src", () => ({
      create: createMock,
      type: "zoidComponent",
    }));

    // const { create } = await import("@krakenjs/zoid/src");

    getFastlaneThreeDS();

    expect(createMock).toHaveBeenCalledTimes(1);
    expect(createMock).toHaveBeenCalledWith(
      expect.objectContaining({
        tag: "fastlane-threeds",
        url: expect.any(Function),
      })
    );
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

    getFastlaneThreeDS();

    expect(window.xchild).toBeDefined();
    expect(window.xchild).toEqual({
      props: {
        payerActionUrl: "mock-payer-action-url",
      },
      close: noop,
    });
  });
});
