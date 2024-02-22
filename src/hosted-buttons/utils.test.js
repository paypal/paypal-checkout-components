/* @flow */
/* eslint-disable no-restricted-globals, promise/no-native */
import { test, expect, vi } from "vitest";
import { request } from "@krakenjs/belter/src";

import {
  buildHostedButtonCreateOrder,
  buildHostedButtonOnApprove,
  getHostedButtonDetails,
  requestWithDPoP,
} from "./utils";

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
    // eslint-disable-next-line compat/compat
    Promise.resolve(getHostedButtonDetailsResponse)
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

test("requestWithDPoP", async () => {
  const accessToken = window.crypto.randomUUID();
  // $FlowIssue
  request.mockImplementation(() =>
    // eslint-disable-next-line compat/compat
    Promise.resolve({
      body: {
        access_token: accessToken,
        nonce: "123abc",
      },
    })
  );
  const options = {
    method: "POST",
    url: "https://example.com/",
    headers: {
      Authorization: `Basic ${accessToken}`,
    },
    body: "",
  };
  await requestWithDPoP(options);
  expect(request).toHaveBeenCalledWith(
    expect.objectContaining({
      headers: expect.objectContaining({
        // does not override the basic auth scheme
        Authorization: expect.stringContaining(`Basic ${accessToken}`),
        // but includes a DPoP jwt
        DPoP: expect.any(String),
      }),
    })
  );

  options.headers.Authorization = `Bearer ${accessToken}`;
  await requestWithDPoP(options);
  expect(request).toHaveBeenCalledWith(
    expect.objectContaining({
      headers: expect.objectContaining({
        // overrides the Bearer auth scheme
        Authorization: expect.stringContaining(`DPoP ${accessToken}`),
        // and includes a DPoP jwt
        DPoP: expect.any(String),
      }),
    })
  );
});

test("buildHostedButtonCreateOrder", async () => {
  const createOrder = buildHostedButtonCreateOrder({
    hostedButtonId,
    merchantId,
  });

  // $FlowIssue
  request.mockImplementation(() =>
    // eslint-disable-next-line compat/compat
    Promise.resolve({
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

test("buildHostedButtonCreateOrder error handling", async () => {
  const createOrder = buildHostedButtonCreateOrder({
    hostedButtonId,
    merchantId,
  });

  // $FlowIssue
  request.mockImplementation(() =>
    // eslint-disable-next-line compat/compat
    Promise.resolve({
      body: {
        name: "RESOURCE_NOT_FOUND",
      },
    })
  );

  const onError = vi.fn();
  window[`__pp_form_fields_${hostedButtonId}`] = {
    onError,
  };

  await createOrder({ paymentSource: "paypal" });
  expect(onError).toHaveBeenCalledWith("RESOURCE_NOT_FOUND");
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
      // eslint-disable-next-line compat/compat
      Promise.resolve({
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
});

/* eslint-enable no-restricted-globals, promise/no-native */
