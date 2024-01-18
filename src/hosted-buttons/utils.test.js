/* @flow */

import { test, expect, vi } from "vitest";
import { request, popup, supportsPopups } from "@krakenjs/belter/src";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";

import {
  buildHostedButtonCreateOrder,
  buildHostedButtonOnApprove,
  getHostedButtonDetails,
} from "./utils";

vi.mock("@krakenjs/belter/src", async () => {
  return {
    ...(await vi.importActual("@krakenjs/belter/src")),
    request: vi.fn(),
    popup: vi.fn(),
    supportsPopups: vi.fn(),
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

const hostedButtonId = "B1234567890";
const merchantId = "M1234567890";
const orderID = "EC-1234567890";

const getHostedButtonDetailsResponse = {
  body: {
    button_details: {
      link_variables: [
        {
          name: "business",
          value: merchantId,
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

test("getHostedButtonDetails", async () => {
  // $FlowIssue
  request.mockImplementationOnce(() =>
    ZalgoPromise.resolve(getHostedButtonDetailsResponse)
  );
  await getHostedButtonDetails({
    hostedButtonId,
  }).then(({ style }) => {
    expect(style).toEqual({
      layout: "vertical",
      shape: "rect",
      color: "gold",
      label: "paypal",
    });
  });
  expect.assertions(1);
});

test("buildHostedButtonCreateOrder", async () => {
  const createOrder = buildHostedButtonCreateOrder({
    hostedButtonId,
    merchantId,
  });

  // $FlowIssue
  request.mockImplementation(() =>
    ZalgoPromise.resolve({
      body: {
        link_id: hostedButtonId,
        merchant_id: merchantId,
        context_id: orderID,
        status: "CREATED",
      },
    })
  );
  const createdOrderID = await createOrder({ paymentSource: "paypal" });
  expect(createdOrderID).toBe(orderID);
  expect.assertions(1);
});

describe("buildHostedButtonOnApprove", () => {
  test("makes a request to the Hosted Buttons API", async () => {
    const onApprove = buildHostedButtonOnApprove({
      hostedButtonId,
      merchantId,
    });

    // $FlowIssue
    request.mockImplementation(() =>
      ZalgoPromise.resolve({
        body: {},
      })
    );
    await onApprove({ orderID, paymentSource: "paypal" });
    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        body: JSON.stringify({
          entry_point: "SDK",
          merchant_id: merchantId,
          context_id: orderID,
        }),
      })
    );
    expect.assertions(1);
  });

  test("provides its own popup for inline guest", async () => {
    const onApprove = buildHostedButtonOnApprove({
      hostedButtonId,
      merchantId,
    });
    // $FlowIssue
    request.mockImplementation(() =>
      ZalgoPromise.resolve({
        body: {},
      })
    );

    // $FlowIssue
    supportsPopups.mockImplementation(() => true);
    await onApprove({ orderID, paymentSource: "card" });
    expect(popup).toHaveBeenCalled();

    // but redirects if popups are not supported
    // $FlowIssue
    supportsPopups.mockImplementation(() => false);
    await onApprove({ orderID, paymentSource: "card" });
    expect(window.location).toMatch(
      `/ncp/payment/${hostedButtonId}/${orderID}`
    );

    expect.assertions(2);
  });
});
