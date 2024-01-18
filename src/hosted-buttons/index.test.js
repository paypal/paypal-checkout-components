/* @flow */

import { describe, test, expect, vi } from "vitest";
import { request } from "@krakenjs/belter/src";
import { ZalgoPromise } from "@krakenjs/zalgo-promise";

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
  test("paypal.Buttons calls getHostedButtonDetails and invokes v5 of the SDK", () => {
    const Buttons = vi.fn(() => ({ render: vi.fn() }));
    // $FlowIssue
    getButtonsComponent.mockImplementationOnce(() => Buttons);
    const HostedButtons = getHostedButtonsComponent();
    // $FlowIssue
    request.mockImplementationOnce(() =>
      ZalgoPromise.resolve(getHostedButtonDetailsResponse)
    );
    HostedButtons({
      hostedButtonId: "B1234567890",
    }).render("#example");
    expect(Buttons).toHaveBeenCalledWith(
      expect.objectContaining({
        hostedButtonId: "B1234567890",
      })
    );
    expect.assertions(1);
  });
});
