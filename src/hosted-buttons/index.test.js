/* @flow */

import { describe, test, expect, vi } from "vitest";
import { request } from "@krakenjs/belter/src";
import { ZalgoPromise } from "@krakenjs/zalgo-promise";

import { getButtonsComponent } from "../zoid/buttons";

import {
  getHostedButtonDetails,
  getHostedButtonCreateOrder,
  getHostedButtonOnApprove,
  getHostedButtonsComponent,
} from ".";

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
      button_variables: [
        {
          name: "business",
          value: "M1234567890",
        },
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
    expect(Buttons).toHaveBeenCalled();
    expect.assertions(1);
  });

  test("getHostedButtonDetails", async () => {
    // $FlowIssue
    request.mockImplementationOnce(() =>
      ZalgoPromise.resolve(getHostedButtonDetailsResponse)
    );
    await getHostedButtonDetails({
      hostedButtonId: "B1234567890",
    }).then(({ merchantId, style }) => {
      expect(merchantId).toBe("M1234567890");
      expect(style).toEqual({
        layout: "vertical",
        shape: "rect",
        color: "gold",
        label: "paypal",
      });
    });
    expect.assertions(2);
  });

  test("getHostedButtonCreateOrder", async () => {
    const createOrder = getHostedButtonCreateOrder({
      buttonType: "FIXED_PRICE",
      hostedButtonId: "B1234567890",
      merchantId: "M1234567890",
    });

    // $FlowIssue
    request.mockImplementationOnce(() =>
      ZalgoPromise.resolve({
        body: {
          hosted_button_id: "B1234567890",
          merchant_id: "M1234567890",
          order_id: "EC-1234567890",
          status: "PAYER_ACTION_REQUIRED",
        },
      })
    );
    const orderID = await createOrder({ paymentSource: "paypal" });
    expect(orderID).toBe("EC-1234567890");
    expect.assertions(1);
  });

  test("getHostedButtonOnApprove", async () => {
    const onApprove = getHostedButtonOnApprove({
      buttonType: "FIXED_PRICE",
      hostedButtonId: "B1234567890",
      merchantId: "M1234567890",
    });

    // $FlowIssue
    request.mockImplementationOnce(() => ZalgoPromise.resolve({}));
    await onApprove({ orderID: "EC-1234567890" });
    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        body: JSON.stringify({
          button_type: "FIXED_PRICE",
          entry_point: "SDK",
          hosted_button_id: "B1234567890",
          id: "EC-1234567890",
          merchant_id: "M1234567890",
        }),
      })
    );
    expect.assertions(1);
  });
});
