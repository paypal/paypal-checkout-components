/* @flow */
import {
  getEnv,
  getLogger,
  getPayPalAPIDomain,
  getSDKToken,
  getClientID,
} from "@paypal/sdk-client/src";
import { describe, expect, vi } from "vitest";
import { destroy as zoidDestroy } from "@krakenjs/zoid/src";

import { ThreeDomainSecureComponent } from "./component";
import { GraphQLClient, RestClient } from "./api";
import { getFastlaneThreeDS } from "./utils";
import { setup, destroy, ThreeDomainSecureClient } from "./interface";

vi.mock("@paypal/sdk-client/src");
vi.mock("@krakenjs/zoid/src");
vi.mock("./component");
vi.mock("./api");
vi.mock("./utils");

describe("ThreeDomainSecure interface", () => {
  it("should setup and destroy", () => {
    setup();
    expect(getFastlaneThreeDS).toHaveBeenCalledTimes(1);

    const err = new Error("test error");
    destroy(err);
    expect(zoidDestroy).toHaveBeenCalledTimes(1);
    expect(zoidDestroy).toHaveBeenCalledWith(err);
  });

  it("should create and return instance of ThreeDomainSecureClient only on dev environment", async () => {
    vi.mocked(getEnv).mockReturnValue("stage");
    vi.mocked(getSDKToken).mockReturnValue("test-token");
    vi.mocked(getPayPalAPIDomain).mockReturnValue("test-domain");
    vi.mocked(getClientID).mockReturnValue("test-client-id");

    const threeDomainSecureInstance = ThreeDomainSecureClient.__get__();
    expect(threeDomainSecureInstance).toBeDefined();
    // $FlowIssue
    expect(threeDomainSecureInstance.isEligible).toBeDefined();
    // $FlowIssue
    expect(threeDomainSecureInstance.show).toBeDefined();

    // Replicating testbed changes
    const threeDSComponentInstance = new ThreeDomainSecureComponent({
      logger: getLogger(),
      restClient: new RestClient(),
      graphQLClient: new GraphQLClient({
        baseURL: "https://payments.sandbox.braintree-api.com",
        accessToken: "test-token",
      }),
      sdkConfig: {
        authenticationToken: "test-token",
        paypalApiDomain: "test-domain",
        clientID: "test-client-id",
      },
    });

    const payload = {
      amount: "10.00",
      currency: "USD",
      nonce: "fastlane-nonce",
    };

    await threeDSComponentInstance.isEligible(payload);
    // $FlowIssue
    expect(threeDSComponentInstance.isEligible).toHaveBeenCalledWith(payload);

    await threeDSComponentInstance.show();
    // $FlowIssue
    expect(threeDSComponentInstance.show).toHaveBeenCalledTimes(1);

    // instance check
    expect(ThreeDomainSecureComponent).toHaveBeenCalledWith({
      logger: getLogger(),
      restClient: expect.any(RestClient),
      graphQLClient: expect.any(GraphQLClient),
      sdkConfig: {
        authenticationToken: "test-token",
        paypalApiDomain: "test-domain",
        clientID: "test-client-id",
      },
    });
  });
});
