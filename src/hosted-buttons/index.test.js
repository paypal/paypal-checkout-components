/* @flow */
/* eslint-disable no-restricted-globals, promise/no-native */

import { describe, test, expect, vi } from "vitest";
import { request } from "@krakenjs/belter/src";

import { getButtonsComponent } from "../zoid/buttons";

import { renderDefaultButton, renderStandaloneButton } from "./utils";

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
    getLocale: () => ({ lang: "en", country: "US" }),
  };
});

vi.mock("../zoid/buttons", async () => {
  return {
    ...(await vi.importActual("../zoid/buttons")),
    getButtonsComponent: vi.fn(),
  };
});

vi.mock("./utils.js", async () => {
  return {
    ...(await vi.importActual("./utils.js")),
    renderStandaloneButton: vi.fn(),
    renderDefaultButton: vi.fn(),
  };
});

const baseLinkVariables = [
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
  {
    name: "tagline",
    value: "true",
  },
  {
    name: "height",
    value: "40",
  },
];

const hostedButtonId = "B1234567890";

describe("HostedButtons v1", () => {
  const hostedButtonDetailsResponse = {
    body: {
      button_details: {
        link_variables: baseLinkVariables,
      },
    },
  };

  test("paypal.Buttons calls getHostedButtonDetails and invokes v5 of the SDK", async () => {
    const Buttons = vi.fn(() => ({ render: vi.fn() }));
    // $FlowIssue
    getButtonsComponent.mockImplementationOnce(() => Buttons);
    const HostedButtons = getHostedButtonsComponent();
    // $FlowIssue
    request.mockImplementationOnce(() =>
      // eslint-disable-next-line compat/compat
      Promise.resolve(hostedButtonDetailsResponse)
    );
    await HostedButtons({
      hostedButtonId,
    }).render("#example");

    expect(Buttons).toHaveBeenCalledWith(
      expect.objectContaining({
        hostedButtonId,
        style: expect.objectContaining({ tagline: true }),
      })
    );
    expect(Buttons).toHaveBeenCalledTimes(1);
    expect.assertions(2);
  });

  test("only eligible buttons are rendered", async () => {
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
      Promise.resolve(hostedButtonDetailsResponse)
    );
    await HostedButtons({
      hostedButtonId,
    }).render("#example");

    expect(Buttons).toHaveBeenCalledWith(
      expect.objectContaining({
        hostedButtonId,
      })
    );
    expect(Buttons).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect.assertions(3);
  });

  test("tagline is rendered based on hosted button response", async () => {
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
      Promise.resolve({
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
              {
                name: "tagline",
                value: "false",
              },
            ],
          },
        },
      })
    );
    await HostedButtons({
      hostedButtonId,
    }).render("#example");

    expect(Buttons).toHaveBeenCalledWith(
      expect.objectContaining({
        hostedButtonId,
        style: expect.objectContaining({ tagline: false }),
      })
    );
    expect(Buttons).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect.assertions(3);
  });
});

describe("HostedButtons v2", () => {
  const hostedButtonDetailsResponse = {
    body: {
      version: "2",
      button_details: {
        link_variables: baseLinkVariables,
        js_sdk_container_id: "spb-container",
        preferences: {
          button_preferences: ["paypal", "default"],
          eligible_funding_methods: ["paypal", "venmo", "paylater"],
        },
      },
    },
  };

  beforeEach(() => {
    vi.restoreAllMocks();

    const selector = document.createElement("div");
    selector.id =
      hostedButtonDetailsResponse.body.button_details.js_sdk_container_id;
    vi.spyOn(document, "querySelector").mockReturnValue(selector);
  });

  test("paypal.HostedButtons calls renderStandaloneButton & renderDefaultButton accordingly", async () => {
    const renderMock = vi.fn();

    const Buttons = vi.fn(() => ({
      render: renderMock,
      isEligible: vi.fn(() => false),
    }));
    // $FlowIssue
    getButtonsComponent.mockImplementation(() => Buttons);

    const HostedButtons = getHostedButtonsComponent();

    // $FlowIssue
    request.mockImplementationOnce(() =>
      // eslint-disable-next-line compat/compat
      Promise.resolve(hostedButtonDetailsResponse)
    );

    await HostedButtons({
      hostedButtonId,
    }).render("#example");

    expect(renderStandaloneButton).toHaveBeenCalledTimes(1);
    expect(renderDefaultButton).toHaveBeenCalledTimes(1);

    expect(renderStandaloneButton).toHaveBeenCalledWith(
      expect.objectContaining({
        fundingSource: "paypal",
      })
    );

    expect(renderDefaultButton).toHaveBeenCalledWith(
      expect.objectContaining({
        eligibleDefaultButtons: ["venmo", "paylater"],
      })
    );
  });
});

/* eslint-enable no-restricted-globals, promise/no-native */
