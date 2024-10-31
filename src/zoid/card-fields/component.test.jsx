import { describe, expect, vi } from "vitest";
import { getCardFieldsComponent } from "./component";
import { getTestGlobals } from "../../../test/globals";
import globals from "../../../globals";
import { getRefinedFundingEligibility } from "@paypal/funding-components/src";

vi.mock("@paypal/funding-components/src", () => ({
  getRefinedFundingEligibility: vi.fn().mockReturnValue({
    card: {
      eligible: true,
    },
  }),
}));

//getSDKScript
// vi.mock("@paypal/sdk-client/src", () => ({
//   getSDKScript: vi.fn(),
// }));

vi.mock("@paypal/sdk-client/src", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getSDKScript: vi.fn(),
  };
});

beforeAll(() => {
  Object.defineProperty(document, "currentScript", {
    value: {
      src: "https://test.paypal.com/sdk/js?client-id=alc_client1",
    },
    writable: true,
  });

  // Create and append the PayPal SDK Script
  const script = document.createElement("script");
  script.src = "https://test.paypal.com/sdk/js?client-id=alc_client1";
  script.async = true;
  document.head.appendChild(script);
});

describe("createSubscription tests", () => {
  afterEach(() => {
    const script = document.querySelector(
      `script[src='https://test.paypal.com/sdk/js?client-id=alc_client1']`
    );
    if (script) {
      script.remove();
    }

    vi.restoreAllMocks();
  });

  it("should throw an error when using Card Fields subscriptions without the SDK token.", async () => {
    const testGlobals = getTestGlobals(globals);
    window.__ENV__ = "local";

    // Copy everything from testGlobals into window
    const objKeys = Object.keys(testGlobals);
    console.log("Global Vars: ");
    objKeys.forEach((item) => {
      window[item] = testGlobals[item];
      console.log(item + ": ", window[item]);
    });

    //window.__SDK_HOST__ = "localhost.paypal.com:8443";
    //window.__PATH__ = "/sdk/js?client-id=alc_client1";

    const CardFields = getCardFieldsComponent();
    console.log("\n==>> CardFields: ", CardFields);
    expect(CardFields).toBeDefined();

    const container = document.createElement("div");
    container.id = "testid";
    const script = document.createElement("script");
    script.src = "https://test.paypal.com/sdk/js?client-id=alc_client1";
    //script.async = true;
    document.body.appendChild(container);
    document.body.appendChild(script);
    console.log(document.body.innerHTML);
    console.log(container.innerHTML);
    console.log("here");
    console.log(document.getElementsByTagName("script")[0].src);
    console.log(document.getElementById("testid1"));

    // Create CardFields with only createSubscription but no sdkToken
    const results = await CardFields({
      createSubscription: vi.fn(),
      // sdkToken: <Not being passed>
    })
      .render(document.body)
      .then(() => {
        console.log("Render is successful");
      });

    console.log("GOOD");
    expect(results).toThrowError(
      "SDK Token must be passed in for createSubscription"
    );

    console.log(document.body);
    console.log(container);
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
