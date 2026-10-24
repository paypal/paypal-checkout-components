/* @flow */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { getFirebaseConfig } from "./firebaseConfig";

const { envState } = vi.hoisted(() => ({ envState: { env: "stage" } }));

vi.mock("@paypal/sdk-client/src", () => ({
  getEnv: () => envState.env,
}));

const project = (name) => ({
  apiKey: `${name}-key`,
  databaseURL: `https://${name}.firebaseio.com`,
});

describe("getFirebaseConfig", () => {
  beforeEach(() => {
    vi.stubGlobal("__FIREBASE__", {
      __PRODUCTION__: project("prod"),
      __SANDBOX__: project("sandbox"),
      __STAGE__: project("stage"),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("uses the production project in production", () => {
    envState.env = "production";
    expect(getFirebaseConfig()?.apiKey).toBe("prod-key");
  });

  it("uses the sandbox project in sandbox", () => {
    envState.env = "sandbox";
    expect(getFirebaseConfig()?.apiKey).toBe("sandbox-key");
  });

  it("uses the stage project in stage, test and local", () => {
    for (const env of ["stage", "test", "local"]) {
      envState.env = env;
      expect(getFirebaseConfig()?.apiKey).toBe("stage-key");
    }
  });

  it("returns null when the project has no apiKey or databaseURL", () => {
    vi.stubGlobal("__FIREBASE__", {
      __PRODUCTION__: { apiKey: "", databaseURL: "x" },
      __SANDBOX__: { apiKey: "k", databaseURL: "" },
      __STAGE__: undefined,
    });

    envState.env = "production";
    expect(getFirebaseConfig()).toBeNull();
    envState.env = "sandbox";
    expect(getFirebaseConfig()).toBeNull();
    envState.env = "stage";
    expect(getFirebaseConfig()).toBeNull();
  });
});
