/* @flow */
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { describe, expect, vi } from "vitest";
import { request } from "@krakenjs/belter/src";
import { callRestAPI } from "../lib";
import { HEADERS } from "../constants/api";
import { RestClient, GraphQLClient, callGraphQLAPI, HTTPClient } from "./api";

vi.mock("@krakenjs/belter/src", async () => {
  return {
    ...(await vi.importActual("@krakenjs/belter/src")),
    request: vi.fn(),
  };
});

vi.mock("@paypal/sdk-client/src", async () => {
  return {
    ...(await vi.importActual("@paypal/sdk-client/src")),
    getSessionID: () => "session_id_123",
    getPartnerAttributionID: () => "partner_attr_123",
  };
});

vi.mock("../lib", () => ({
  callRestAPI: vi.fn(),
}));

describe("API", () => {
  const accessToken = "access_token";
  const baseURL = "http://localhost.paypal.com:8080";

  afterEach(() => {
    vi.clearAllMocks();
  });
  describe("HTTPClient", () => {
    it("should set access token and base url in constructor", () => {
      const client = new HTTPClient({ accessToken, baseURL });
      expect(client.accessToken).toBe(accessToken);
      expect(client.baseURL).toBe(baseURL);
    });

    it("should set access token", () => {
      const client = new HTTPClient();
      client.setAccessToken(accessToken);
      expect(client.accessToken).toBe(accessToken);
    });
  });

  describe("RestClient", () => {
    it("should make a REST API call with correct params", () => {
      const requestOptions = {
        data: { test: "data" },
        url: baseURL,
      };
      const client = new RestClient({ accessToken });
      client.request(requestOptions);
      expect(callRestAPI).toHaveBeenCalledWith({
        accessToken,
        ...requestOptions,
      });
    });
  });

  describe("GraphQLClient", () => {
    const query = { test: "data" };
    const data = { query };
    const headers = { "Content-Type": "application/json" };

    it.skip("should make a GraphQL API call with correct params", () => {
      vi.spyOn({ callGraphQLAPI }, "callGraphQLAPI").mockResolvedValue({
        data: { test: "data" },
      });
      const client = new GraphQLClient({ accessToken, baseURL });
      client.request({ data, headers }).then(() => {
        expect(callGraphQLAPI).toHaveBeenCalledWith({
          accessToken,
          baseURL,
          data,
          headers,
        });
      });
    });
  });

  describe("callGraphQLAPI", () => {
    const query = '{ "test": "data" }';
    const variables = { option: "param1" };
    const gqlQuery = { query, variables };

    const response = { data: { test: "data" } };

    it("should throw error if no access token is provided", () => {
      expect(() =>
        callGraphQLAPI({
          accessToken: null,
          baseURL,
          data: gqlQuery,
          headers: {},
        })
      ).toThrowError(
        new Error(
          `No access token passed to GraphQL request ${baseURL}/graphql`
        )
      );
    });

    it("should make a GraphQL API call with correct params", () => {
      vi.mocked(request).mockResolvedValue({
        status: 200,
        body: response,
      });
      callGraphQLAPI({
        accessToken,
        baseURL,
        data: gqlQuery,
        headers: {},
      });
      expect(request).toHaveBeenCalledWith({
        method: "post",
        url: `${baseURL}/graphql`,
        headers: {
          [HEADERS.AUTHORIZATION]: `Bearer ${accessToken}`,
          [HEADERS.CONTENT_TYPE]: "application/json",
          [HEADERS.PARTNER_ATTRIBUTION_ID]: "partner_attr_123",
          [HEADERS.CLIENT_METADATA_ID]: "session_id_123",
        },
        json: gqlQuery,
      });
    });

    it("should resolve with response body on success", async () => {
      vi.mocked(request).mockResolvedValue({
        status: 200,
        body: response,
      });
      const resp = await callGraphQLAPI({
        accessToken,
        baseURL,
        data: gqlQuery,
        headers: {},
      });
      expect(resp).toEqual(response);
    });

    it("should throw error on error status", async () => {
      const status = 400;
      vi.mocked(request).mockResolvedValue({
        status,
        body: { message: "Something went wrong" },
      });

      try {
        await callGraphQLAPI({
          accessToken,
          baseURL,
          data: gqlQuery,
          headers: {},
        });
      } catch (error) {
        expect(error.message).toBe(
          `${baseURL}/graphql returned status ${status}`
        );
      }
    });
  });
});
