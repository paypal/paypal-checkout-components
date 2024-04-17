/* @flow */
/* eslint-disable no-restricted-globals, promise/no-native */
import { test, expect, vi } from "vitest";
import { request } from "@krakenjs/belter/src";

import {
  buildHostedButtonCreateOrder,
  buildHostedButtonOnApprove,
  createAccessToken,
  getHostedButtonDetails,
  getFlexDirection,
  getButtonColor,
  shouldRenderSDKButtons,
  appendButtonContainer,
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

const accessToken = "AT1234567890";
const hostedButtonId = "B1234567890";
const merchantId = "M1234567890";
const orderID = "EC-1234567890";
const clientId = "C1234567890";

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

const mockCreateAccessTokenRequest = () =>
  // eslint-disable-next-line compat/compat
  Promise.resolve({
    body: {
      access_token: accessToken,
    },
  });

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

describe("createAccessToken", () => {
  test("basic functionality", async () => {
    request
      // $FlowIssue
      .mockImplementationOnce(mockCreateAccessTokenRequest);
    await createAccessToken({ clientId });
    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.stringContaining("Basic "),
        }),
      })
    );
    expect.assertions(1);
  });
  test("with DPoP enabled", async () => {
    request
      // $FlowIssue
      .mockImplementationOnce(mockCreateAccessTokenRequest);
    await createAccessToken({ clientId, enableDPoP: true });
    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.stringContaining("Basic "),
          DPoP: expect.any(String),
        }),
      })
    );
    expect.assertions(1);
  });
});

test("buildHostedButtonCreateOrder", async () => {
  const createOrder = buildHostedButtonCreateOrder({
    hostedButtonId,
    merchantId,
  });

  request
    // $FlowIssue
    .mockImplementationOnce(mockCreateAccessTokenRequest)
    .mockImplementation(() =>
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
  expect(request).toHaveBeenCalledWith(
    expect.objectContaining({
      headers: expect.objectContaining({
        Authorization: `Bearer ${accessToken}`,
      }),
    })
  );
  expect(createdOrderID).toBe(orderID);
  expect.assertions(2);
});

test("buildHostedButtonCreateOrder with DPoP enabled", async () => {
  const createOrder = buildHostedButtonCreateOrder({
    enableDPoP: true,
    hostedButtonId,
    merchantId,
  });

  request
    // $FlowIssue
    .mockImplementationOnce(mockCreateAccessTokenRequest)
    .mockImplementation(() =>
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
  await createOrder({ paymentSource: "paypal" });
  expect(request).toHaveBeenCalledWith(
    expect.objectContaining({
      headers: expect.objectContaining({
        Authorization: `DPoP ${accessToken}`,
        DPoP: expect.any(String),
      }),
    })
  );
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

  test("with DPoP enabled", async () => {
    const onApprove = buildHostedButtonOnApprove({
      enableDPoP: true,
      hostedButtonId,
      merchantId,
    });
    request
      // $FlowIssue
      .mockImplementationOnce(mockCreateAccessTokenRequest)
      .mockImplementation(() =>
        // eslint-disable-next-line compat/compat
        Promise.resolve({
          body: {},
        })
      );
    await onApprove({ orderID, paymentSource: "paypal" });
    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `DPoP ${accessToken}`,
          DPoP: expect.any(String),
        }),
      })
    );
    expect.assertions(1);
  });

  describe("inline guest", () => {
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

    test("redirects from the merchant's site to a thank you page", async () => {
      expect(window.location.href).toBe("http://localhost:3000/");
      await onApprove({ orderID, paymentSource: "card" });
      expect(window.location).toBe(
        "https://example.com/ncp/payment/B1234567890/EC-1234567890"
      );
    });

    test("redirects with an error message in the status query parameter", async () => {
      // $FlowIssue
      request.mockImplementation(() =>
        // eslint-disable-next-line compat/compat
        Promise.resolve({
          body: {
            details: [
              {
                issue: "DUPLICATE_INVOICE_ID",
              },
            ],
          },
        })
      );

      await onApprove({ orderID, paymentSource: "card" });
      expect(window.location).toBe(
        "https://example.com/ncp/payment/B1234567890/EC-1234567890?status=DUPLICATE_INVOICE_ID"
      );
    });
  });
});

test("getFlexDirection", () => {
  expect(getFlexDirection({ layout: "horizontal" })).toStrictEqual({
    flexDirection: "row",
  });
  expect(getFlexDirection({ layout: "vertical" })).toStrictEqual({
    flexDirection: "column",
  });
});

test("getButtonColor", () => {
  const colors = ["gold", "blue", "silver", "white", "black"];
  const fundingSources = ["paypal", "venmo", "paylater"];
  const colorMap = {
    gold: {
      paypal: "gold",
      venmo: "blue",
      paylater: "gold",
    },
    blue: {
      paypal: "blue",
      venmo: "silver",
      paylater: "blue",
    },
    black: {
      paypal: "black",
      venmo: "black",
      paylater: "black",
    },
    white: {
      paypal: "white",
      venmo: "white",
      paylater: "white",
    },
    silver: {
      paypal: "silver",
      venmo: "blue",
      paylater: "silver",
    },
  };

  colors.forEach((color) => {
    fundingSources.forEach((fundingSource) => {
      expect(getButtonColor(color, fundingSource)).toBe(
        colorMap[color][fundingSource]
      );
    });
  });
});

test("shouldRenderSDKButtons", () => {
  expect(shouldRenderSDKButtons([])).toBe(false);
  expect(shouldRenderSDKButtons(["paypal"])).toBe(true);
  expect(shouldRenderSDKButtons(["paypal", "venmo"])).toBe(true);
});

test("buildButtonContainer", () => {
  const containerId = "container-id";
  const selector = document.createElement("div");

  selector.setAttribute("id", containerId);

  const mock = vi.spyOn(document, "getElementById").mockReturnValue(selector);

  expect(() =>
    appendButtonContainer({ flexDirection: "row", selector: `#${containerId}` })
  ).not.toThrow();
  expect(mock).toHaveBeenCalledTimes(1);
  expect(mock).toHaveBeenCalledWith(containerId);

  expect(() =>
    appendButtonContainer({ flexDirection: "row", selector: `.${containerId}` })
  ).toThrow("Selector must be referring to an id");
  expect(() =>
    appendButtonContainer({ flexDirection: "row", selector })
  ).toThrow("Selector must be a string");
});

/* eslint-enable no-restricted-globals, promise/no-native */
