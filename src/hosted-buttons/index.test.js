/* @flow */
/* eslint-disable no-restricted-globals, promise/no-native */

import { describe, test, expect, vi } from "vitest";
import { request } from "@krakenjs/belter/src";

import { getButtonsComponent } from "../zoid/buttons";

import { getHostedButtonsComponent } from ".";

vi.mock("@krakenjs/belter/src", async () => {
  return {
    ...(await vi.importActual("@krakenjs/belter/src")),
    request: vi.fn(),
  };
});

vi.mock("@paypal/sdk-client/src", async () => {
  return {
    ...(await vi.importActual("@paypal/sdk-client/src")),
    getSDKHost: () => "example.com",
    getClientID: () => "client_id_123",
    getMerchantID: () => ["merchant_id_123"],
  };
});

vi.mock("../zoid/buttons", async () => {
  return {
    ...(await vi.importActual("../zoid/buttons")),
    getButtonsComponent: vi.fn(),
  };
});

const getHostedButtonDetailsResponse = {
  body: {
    button_details: {
      link_variables: [
        {
          name: "shape",
          value: "rect",
        },
        {
          name: "layout",
          value: "vertical",
        },
        {
          name: "color",
          value: "gold",
        },
        {
          name: "button_text",
          value: "paypal",
        },
        {
          name: "button_type",
          value: "FIXED_PRICE",
        },
      ],
    },
  },
};

describe("HostedButtons", () => {
  test("paypal.Buttons calls getHostedButtonDetails and invokes v5 of the SDK", async () => {
    const Buttons = vi.fn(() => ({ render: vi.fn() }));
    // $FlowIssue
    getButtonsComponent.mockImplementationOnce(() => Buttons);
    const HostedButtons = getHostedButtonsComponent();
    // $FlowIssue
    request.mockImplementationOnce(() =>
      // eslint-disable-next-line compat/compat
      Promise.resolve(getHostedButtonDetailsResponse)
    );
    await HostedButtons({
      hostedButtonId: "B1234567890",
    }).render("#example");
    expect(Buttons).toHaveBeenCalledWith(
      expect.objectContaining({
        hostedButtonId: "B1234567890",
      })
    );
    expect(Buttons).toHaveBeenCalledTimes(1);
    expect.assertions(2);
  });

  describe("NCP V2", () => {
    // beforeEach(() => {
    //   const containerId = "container-id";
    //   const selector = document.createElement("div");
    //   selector.setAttribute("id", containerId);
    //   vi.spyOn(document, "getElementById").mockReturnValue(selector);
    // });
    // afterEach(() => {
    //   vi.restoreAllMocks();
    // });

    test("paypal.Buttons calls getHostedButtonDetails, invokes v5 of the SDK", async () => {
      const containerId = "container-id";
      const selector = document.createElement("div");
      selector.setAttribute("id", containerId);
      vi.spyOn(document, "getElementById").mockReturnValue(selector);
      const renderMock = vi.fn();

      const Buttons = vi.fn(() => ({
        render: renderMock,
        isEligible: vi.fn(() => true),
      }));
      // $FlowIssue
      getButtonsComponent.mockImplementationOnce(() => Buttons);
      const HostedButtons = getHostedButtonsComponent();
      // $FlowIssue
      request.mockImplementationOnce(() =>
        // eslint-disable-next-line compat/compat
        Promise.resolve(getHostedButtonDetailsResponse)
      );
      await HostedButtons({
        hostedButtonId: "B1234567890",
        fundingSources: ["paypal", "venmo"],
      }).render("#example");
      expect(Buttons).toHaveBeenCalledWith(
        expect.objectContaining({
          hostedButtonId: "B1234567890",
        })
      );
      expect(Buttons).toHaveBeenCalledTimes(2);
      expect(renderMock).toHaveBeenCalledTimes(2);
      expect.assertions(3);
    });
  });

  test("only eligible buttons are rendered", async () => {
    const containerId = "container-id";
    const selector = document.createElement("div");
    selector.setAttribute("id", containerId);
    vi.spyOn(document, "getElementById").mockReturnValue(selector);
    const renderMock = vi.fn();

    const Buttons = vi.fn(() => ({
      render: renderMock,
      isEligible: vi.fn(() => false),
    }));
    // $FlowIssue
    getButtonsComponent.mockImplementationOnce(() => Buttons);
    const HostedButtons = getHostedButtonsComponent();
    // $FlowIssue
    request.mockImplementationOnce(() =>
      // eslint-disable-next-line compat/compat
      Promise.resolve(getHostedButtonDetailsResponse)
    );
    await HostedButtons({
      hostedButtonId: "B1234567890",
      fundingSources: ["paypal", "venmo"],
    }).render("#example");
    expect(Buttons).toHaveBeenCalledWith(
      expect.objectContaining({
        hostedButtonId: "B1234567890",
      })
    );
    expect(Buttons).toHaveBeenCalledTimes(2);
    expect(renderMock).toHaveBeenCalledTimes(0);
    expect.assertions(3);
  });
});
/* eslint-enable no-restricted-globals, promise/no-native */
