/* @flow */
/* eslint-disable no-restricted-globals, promise/no-native */
import { test, expect, vi } from "vitest";
import { request, popup } from "@krakenjs/belter/src";

import {
  buildHostedButtonCreateOrder,
  buildHostedButtonOnApprove,
  buildOpenPopup,
  createAccessToken,
  getHostedButtonDetails,
  popupFallbackClassName,
} from "./utils";

vi.mock("@krakenjs/belter/src", async () => {
  return {
    ...(await vi.importActual("@krakenjs/belter/src")),
    popup: vi.fn(),
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
    const url = "https://example.com/ncp/payment/B1234567890/EC-1234567890";
    const selector = "buttons-container";
    // $FlowIssue
    document.body.innerHTML = `<div id="${selector}"></div>`; // eslint-disable-line compat/compat
    const popupFallback = `<a href="#">See payment details</a>`;
    const openPopup = buildOpenPopup({
      popupFallback,
      selector: `#${selector}`,
    });
    const onApprove = buildHostedButtonOnApprove({
      hostedButtonId,
      merchantId,
      openPopup,
    });
    // $FlowIssue
    request.mockImplementation(() =>
      // eslint-disable-next-line compat/compat
      Promise.resolve({
        body: {},
      })
    );

    test("provides its own popup", async () => {
      await onApprove({ orderID, paymentSource: "card" });
      expect(popup).toHaveBeenCalledWith(url, expect.anything());
      expect.assertions(1);
    });

    test("appends a link if the popup is blocked", async () => {
      // $FlowIssue
      popup.mockImplementationOnce(() => {
        throw new Error("popup_blocked");
      });
      await onApprove({ orderID, paymentSource: "card" });
      const link = document.querySelector(`.${popupFallbackClassName} a`);
      expect(link?.getAttribute("href")).toBe(url);
      expect.assertions(1);
    });

    test("does not append a second link if the popup is blocked a second time", async () => {
      // still present from the previous popup open failure
      expect(
        document.querySelectorAll(`.${popupFallbackClassName}`).length
      ).toBe(1);
      // $FlowIssue
      popup.mockImplementationOnce(() => {
        throw new Error("popup_blocked");
      });
      await onApprove({ orderID, paymentSource: "card" });
      expect(
        document.querySelectorAll(`.${popupFallbackClassName}`).length
      ).toBe(1);
      expect.assertions(2);
    });

    test("removes the fallback message if a different payment source is used", async () => {
      // still present from the previous popup open failure
      expect(
        document.querySelectorAll(`.${popupFallbackClassName}`).length
      ).toBe(1);
      // $FlowIssue
      popup.mockImplementationOnce(() => {
        throw new Error("popup_blocked");
      });

      // note new payment source
      await onApprove({ orderID, paymentSource: "paypal" });
      expect(
        document.querySelectorAll(`.${popupFallbackClassName}`).length
      ).toBe(0);
      expect.assertions(2);
    });
  });
});

/* eslint-enable no-restricted-globals, promise/no-native */
