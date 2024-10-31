import { describe, expect, vi } from "vitest";
import { getCardFieldsComponent } from "./component";
import { create } from "@krakenjs/zoid/src";
import { getRefinedFundingEligibility } from "@paypal/funding-components/src";
import { isPayPalDomain } from "@paypal/sdk-client/src";

vi.mock("@krakenjs/zoid/src", () => ({
  create: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

vi.mock("./component", () => ({
  // Can try to mock this to return the Zoid Component
  // Right now doing this is returning undefined
  // Do we need to refactor the original code to all the configuration can be reused here?
  getCardFieldsComponent: vi.fn(),
}));

vi.mock("@paypal/funding-components/src", () => ({
  getRefinedFundingEligibility: vi.fn().mockReturnValue({
    card: {
      eligible: true,
    },
  }),
}));

vi.mock("@paypal/sdk-client/src", () => ({
  isPayPalDomain: vi.fn(() => true),
}));

afterEach(() => {
  vi.restoreAllMocks();
});

describe("createSubscription tests", () => {
  it("should throw an error when using Card Fields subscriptions without the SDK token.", async () => {
    expect(() => {
      const CardFields = getCardFieldsComponent();

      // CardFields keep returning undefined.
      console.log("==>> CardFields: ", CardFields);

      // Create CardFields with only createSubscription but no sdkToken
      CardFields({
        createSubscription: () => {
          console.log("pass this callback");
        },
        // sdkToken: <Not being passed>
      }).render("#doesntmatterRenderIsMocked");
    }).toThrowError("SDK Token must be passed in for createSubscription");
  });

  /*
  // NOTE: We can comment-out the rest of these UTs once we make the one above works.

  it("should not throw an error when using Card Fields with subscriptions and with SDK token provided.", async () => {
    expect(() => {
      const CardFields = getCardFieldsComponent();

      // CardFields keep returning undefined
      console.log("==>> CardFields: ", CardFields);

      // Create CardFields with createSubscription and with sdkToken
      CardFields({
        createSubscription: () => {
          console.log("pass this callback");
        },
        sdkToken: "my-token",
      }).render("#doesntmatterRenderIsMocked");
    }).not.toThrowError("SDK Token must be passed in for createSubscription");
  });

    it("should not throw an error when using Card Fields without subscriptions and without the SDK token.", async () => {
      expect(() => {
        const CardFields = getCardFieldsComponent();

        // CardFields keep returning undefined
        console.log("==>> CardFields: ", CardFields);

        // Create CardFields with createOrder and no sdkToken
        CardFields({
          createOrder: () => {
            console.log("pass this callback");
          },
          // sdkToken: <Not being passed>
        }).render("#doesntmatterRenderIsMocked");
      }).toThrowError("SDK Token must be passed in for createSubscription");
    });

    it("should return CardFields when createSubscription is passed and isPayPalDomain() returns true", async () => {

        // isPayPalDomain() is already mocked to return true

      expect(() => {
        const CardFields = getCardFieldsComponent();

        // CardFields keep returning undefined
        console.log("==>> CardFields: ", CardFields);

        // Create CardFields with createSubscription and sdkToken
        const instance = CardFields({
          createSubscription: () => {
            console.log("pass this callback");
          },
          sdkToken: "my-token",
        })

        // Check that zoid.create(...) gets called with createSubscription
        


      });
    });

    */
});
