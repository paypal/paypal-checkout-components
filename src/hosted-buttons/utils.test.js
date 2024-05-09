/* @flow */
/* eslint-disable no-restricted-globals, promise/no-native */
import { test, expect, vi } from "vitest";
import { request } from "@krakenjs/belter/src";
import { getLogger } from "@paypal/sdk-client/src";

import { getButtonsComponent } from "../zoid/buttons";

import {
  buildHostedButtonCreateOrder,
  buildHostedButtonOnApprove,
  createAccessToken,
  getHostedButtonDetails,
  getFlexDirection,
  getButtonColor,
  getElementFromSelector,
  getButtonPreferences,
  getDefaultButton,
  renderStandaloneButton,
  applyContainerStyles,
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
    getLogger: vi.fn(),
  };
});

vi.mock("../zoid/buttons", async () => {
  return {
    ...(await vi.importActual("../zoid/buttons")),
    getButtonsComponent: vi.fn(),
  };
});

const accessToken = "AT1234567890";
const hostedButtonId = "B1234567890";
const merchantId = "M1234567890";
const orderID = "EC-1234567890";
const clientId = "C1234567890";

const mockCreateAccessTokenRequest = () =>
  // eslint-disable-next-line compat/compat
  Promise.resolve({
    body: {
      access_token: accessToken,
    },
  });

describe("getHostedButtonDetails", () => {
  const getHostedButtonDetailsResponse = {
    v1: {
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
            {
              name: "tagline",
              value: "true",
            },
          ],
        },
      },
    },

    v2: {
      body: {
        button_details: {
          link_variables: [
            {
              name: "height",
              value: "50",
            },
            {
              name: "tagline",
              value: "true",
            },
          ],
          preferences: {
            button_preferences: ["paypal", "paylater"],
            eligible_funding_methods: ["paypal", "venmo", "paylater"],
          },
        },
        version: "2",
      },
    },
  };

  test("version 1", async () => {
    // $FlowIssue
    request.mockImplementationOnce(() =>
      // eslint-disable-next-line compat/compat
      Promise.resolve(getHostedButtonDetailsResponse.v1)
    );
    await getHostedButtonDetails({
      hostedButtonId,
      fundingSources: [],
    }).then(({ style }) => {
      expect(style).toEqual({
        layout: "vertical",
        shape: "rect",
        color: "gold",
        label: "paypal",
        tagline: true,
      });
    });
    expect.assertions(1);
  });

  test("version 2", async () => {
    // $FlowIssue
    request.mockImplementationOnce(() =>
      // eslint-disable-next-line compat/compat
      Promise.resolve(getHostedButtonDetailsResponse.v2)
    );
    await getHostedButtonDetails({
      hostedButtonId,
      fundingSources: [],
    }).then(({ style, preferences, version }) => {
      expect(style.height).toEqual(50);
      expect(style.tagline).toEqual(true);
      expect(preferences).toEqual({
        buttonPreferences: ["paypal", "paylater"],
        eligibleFundingMethods: ["paypal", "venmo", "paylater"],
      });
      expect(version).toEqual("2");
    });
    expect.assertions(4);
  });

  test("handles false tagline values", async () => {
    // $FlowIssue
    request.mockImplementationOnce(() =>
      // eslint-disable-next-line compat/compat
      Promise.resolve({
        body: {
          button_details: {
            link_variables: [
              {
                name: "business",
                value: merchantId,
              },
              {
                name: "layout",
                value: "horizontal",
              },
              {
                name: "tagline",
                value: "false",
              },
            ],
          },
        },
      })
    );
    await getHostedButtonDetails({
      hostedButtonId,
    }).then(({ style }) => {
      expect(style).toEqual(
        expect.objectContaining({
          tagline: false,
        })
      );
    });

    // $FlowIssue
    request.mockImplementationOnce(() =>
      // eslint-disable-next-line compat/compat
      Promise.resolve({
        body: {
          button_details: {
            link_variables: [
              {
                name: "height",
                value: 50,
              },
              {
                name: "tagline",
                value: "false",
              },
            ],
            preferences: {
              button_preferences: ["paypal", "paylater"],
              eligible_funding_methods: ["paypal", "venmo", "paylater"],
            },
          },
          version: "2",
        },
      })
    );
    await getHostedButtonDetails({
      hostedButtonId,
    }).then(({ style, preferences, version }) => {
      expect(style.height).toEqual(50);
      expect(style.tagline).toEqual(false);
      expect(preferences).toEqual({
        buttonPreferences: ["paypal", "paylater"],
        eligibleFundingMethods: ["paypal", "venmo", "paylater"],
      });
      expect(version).toEqual("2");
    });
    expect.assertions(5);
  });

  test("handles undefined tagline values", async () => {
    // $FlowIssue
    request.mockImplementationOnce(() =>
      // eslint-disable-next-line compat/compat
      Promise.resolve({
        body: {
          button_details: {
            link_variables: [
              {
                name: "business",
                value: merchantId,
              },
              {
                name: "layout",
                value: "horizontal",
              },
            ],
          },
        },
      })
    );
    await getHostedButtonDetails({
      hostedButtonId,
    }).then(({ style }) => {
      expect(style).toEqual(
        expect.objectContaining({
          tagline: false,
        })
      );
    });

    // $FlowIssue
    request.mockImplementationOnce(() =>
      // eslint-disable-next-line compat/compat
      Promise.resolve({
        body: {
          button_details: {
            link_variables: [
              {
                name: "height",
                value: 50,
              },
            ],
            preferences: {
              button_preferences: ["paypal", "paylater"],
              eligible_funding_methods: ["paypal", "venmo", "paylater"],
            },
          },
          version: "2",
        },
      })
    );
    await getHostedButtonDetails({
      hostedButtonId,
    }).then(({ style, preferences, version }) => {
      expect(style.height).toEqual(50);
      expect(style.tagline).toEqual(false);
      expect(preferences).toEqual({
        buttonPreferences: ["paypal", "paylater"],
        eligibleFundingMethods: ["paypal", "venmo", "paylater"],
      });
      expect(version).toEqual("2");
    });
    expect.assertions(5);
  });
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

test("getElementFromSelector", () => {
  const containerId = "#container-id";
  const selector = document.createElement("div");

  selector.setAttribute("id", containerId.slice(1));

  const mockQuerySelector = vi
    .spyOn(document, "querySelector")
    .mockReturnValueOnce(selector);

  expect(getElementFromSelector(containerId)).toBe(selector);
  expect(getElementFromSelector(selector)).toBe(selector);
  expect(mockQuerySelector).toBeCalledTimes(1);
  expect(mockQuerySelector).toHaveBeenCalledWith(containerId);
});

describe("getButtonPreferences", () => {
  test("returns all button preferences if all are eligible", () => {
    const params = {
      button_preferences: ["paypal", "venmo"],
      eligible_funding_methods: ["paypal", "venmo", "paylater"],
    };

    const preferences = getButtonPreferences(params);

    expect(preferences.buttonPreferences).toEqual(["paypal", "venmo"]);
  });

  test("removes any button preferences not in the eligible funding methods", () => {
    const params = {
      button_preferences: ["paypal", "venmo"],
      eligible_funding_methods: ["paypal", "paylater"],
    };

    const preferences = getButtonPreferences(params);

    expect(preferences.buttonPreferences).toEqual(["paypal"]);
  });
  test("sorts eligible funding methods according to SUPPORTED_FUNDING_SOURCES", () => {
    const params = {
      button_preferences: ["paypal", "venmo"],
      eligible_funding_methods: ["paylater", "venmo", "paypal"],
    };

    const preferences = getButtonPreferences(params);

    expect(preferences.eligibleFundingMethods).toEqual([
      "paypal",
      "venmo",
      "paylater",
    ]);
  });

  test("doesn't filter out 'default' in button preferences", () => {
    const params = {
      button_preferences: ["paypal", "default"],
      eligible_funding_methods: ["paylater", "venmo", "paypal"],
    };

    const preferences = getButtonPreferences(params);

    expect(preferences.buttonPreferences).toEqual(["paypal", "default"]);
  });
});

describe("getDefaultButton", () => {
  test("returns first eligible funding method that is not specified in button preferences", () => {
    const params = {
      buttonPreferences: ["paypal", "default"],
      eligibleFundingMethods: ["paypal", "venmo", "paylater"],
    };

    const defaultButton = getDefaultButton(params);

    expect(defaultButton).toEqual("venmo");
  });

  test("returns undefined if there's no other eligible funding methods that are not specified in button preferences", () => {
    const params = {
      buttonPreferences: ["paypal", "default"],
      eligibleFundingMethods: ["paypal"],
    };

    const defaultButton = getDefaultButton(params);

    expect(defaultButton).toBeUndefined();
  });
});

describe("applyContainerStyles", () => {
  const buttonContainerId = "button-container";
  const params = { flexDirection: "vertical", buttonContainerId };

  test("successfully applies styles to container", () => {
    const buttonContainer = document.createElement("div");
    buttonContainer.id = buttonContainerId;
    vi.spyOn(document, "querySelector").mockReturnValueOnce(buttonContainer);

    applyContainerStyles(params);

    expect(buttonContainer?.style.length).toBeTruthy();
  });

  test("throws error if button container cannot be found", () => {
    const shouldThrowError = () => applyContainerStyles(params);
    expect(shouldThrowError).toThrowError(
      `Button container with id ${buttonContainerId} not found.`
    );
  });
});

describe("renderStandaloneButton", () => {
  const containerId = "#container-id";
  const renderMock = vi.fn();
  const errorMock = vi.fn();
  const baseParams = {
    buttonContainerId: containerId,
    buttonOptions: {
      createOrder: vi.fn(),
      onApprove: vi.fn(),
      onClick: vi.fn(),
      onInit: vi.fn(),
      style: {
        color: "gold",
        layout: "",
        shape: "",
        height: 40,
        label: "",
        tagline: true,
      },
      hostedButtonId: "",
    },
  };

  beforeEach(() => {
    vi.resetAllMocks();
    // $FlowIssue
    getLogger.mockImplementation(() => ({ error: errorMock }));
  });

  test("renders button if eligible", () => {
    const Buttons = vi.fn(() => ({
      render: renderMock,
      isEligible: vi.fn(() => true),
    }));

    // $FlowIssue
    getButtonsComponent.mockImplementationOnce(() => Buttons);

    renderStandaloneButton({
      ...baseParams,
      fundingSource: "paypal",
      preferences: {
        buttonPreferences: ["paypal"],
        eligibleFundingMethods: ["paypal"],
      },
    });

    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith(containerId);
    expect(Buttons).toHaveBeenCalledWith(
      expect.objectContaining({
        fundingSource: "paypal",
      })
    );
  });

  test("does not render button if button is ineligible", () => {
    const Buttons = vi.fn(() => ({
      render: renderMock,
      isEligible: vi.fn(() => false),
    }));

    // $FlowIssue
    getButtonsComponent.mockImplementationOnce(() => Buttons);

    renderStandaloneButton({
      ...baseParams,
      fundingSource: "venmo",
      preferences: {
        buttonPreferences: ["paypal"],
        // Venmo would pass ncp eligibility, but not Buttons().isEligible()
        eligibleFundingMethods: ["paypal", "venmo"],
      },
    });

    expect(renderMock).toHaveBeenCalledTimes(0);
    expect(errorMock).toHaveBeenCalledWith("ncps_standalone_venmo_ineligible");
  });

  test("renders the first eligible button when the fundingSource is 'default'", () => {
    const Buttons = vi.fn(() => ({
      render: renderMock,
      isEligible: vi.fn(() => true),
    }));

    // $FlowIssue
    getButtonsComponent.mockImplementationOnce(() => Buttons);

    renderStandaloneButton({
      ...baseParams,
      fundingSource: "default",
      preferences: {
        buttonPreferences: ["paypal", "default"],
        eligibleFundingMethods: ["paypal", "venmo", "paylater"],
      },
    });

    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith(containerId);
    expect(Buttons).toHaveBeenCalledWith(
      expect.objectContaining({
        fundingSource: "venmo",
      })
    );
  });

  test("renders the next eligible button when the fundingSource is 'default' and the first button fails Buttons().isEligible()", () => {
    const Buttons = vi.fn(({ fundingSource }) => ({
      render: renderMock,
      isEligible: vi.fn(() => fundingSource === "paylater"),
    }));

    // $FlowIssue
    getButtonsComponent.mockImplementation(() => Buttons);

    renderStandaloneButton({
      ...baseParams,
      fundingSource: "default",
      preferences: {
        buttonPreferences: ["paypal", "default"],
        eligibleFundingMethods: ["paypal", "venmo", "paylater"],
      },
    });

    expect(errorMock).toHaveBeenCalledTimes(1);
    expect(errorMock).toHaveBeenCalledWith("ncps_standalone_venmo_ineligible");
    expect(Buttons).toHaveBeenCalledTimes(2);
    expect(Buttons).toHaveBeenCalledWith(
      expect.objectContaining({
        fundingSource: "venmo",
      })
    );
    expect(Buttons).toHaveBeenCalledWith(
      expect.objectContaining({
        fundingSource: "paylater",
      })
    );
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith(containerId);
  });

  test("does not render any button if fundingSource is 'default' and there are no eligible buttons", () => {
    const Buttons = vi.fn(() => ({
      render: renderMock,
      isEligible: vi.fn(() => false),
    }));

    // $FlowIssue
    getButtonsComponent.mockImplementation(() => Buttons);

    renderStandaloneButton({
      ...baseParams,
      fundingSource: "default",
      preferences: {
        buttonPreferences: ["paypal", "default"],
        eligibleFundingMethods: ["paypal", "venmo", "paylater"],
      },
    });

    expect(Buttons).toHaveBeenCalledTimes(2);
    expect(Buttons).toHaveBeenCalledWith(
      expect.objectContaining({
        fundingSource: "venmo",
      })
    );
    expect(Buttons).toHaveBeenCalledWith(
      expect.objectContaining({
        fundingSource: "paylater",
      })
    );
    expect(errorMock).toHaveBeenCalledWith("ncps_standalone_venmo_ineligible");
    expect(errorMock).toHaveBeenCalledWith(
      "ncps_standalone_paylater_ineligible"
    );
  });

  test("exits smoothly if no button is eligible besides the PayPal button", () => {
    const Buttons = vi.fn(() => ({
      render: renderMock,
      isEligible: vi.fn(() => false),
    }));

    // $FlowIssue
    getButtonsComponent.mockImplementation(() => Buttons);

    renderStandaloneButton({
      ...baseParams,
      fundingSource: "default",
      preferences: {
        buttonPreferences: ["paypal", "default"],
        eligibleFundingMethods: ["paypal"],
      },
    });

    expect(errorMock).not.toHaveBeenCalled();
    expect(Buttons).not.toHaveBeenCalled();
  });
});
/* eslint-enable no-restricted-globals, promise/no-native */
