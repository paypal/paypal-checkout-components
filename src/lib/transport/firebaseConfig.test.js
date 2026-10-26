/* @flow */

import { describe, it, expect, vi, afterEach } from "vitest";

import { getFirebaseConfig, getFirebaseScripts } from "./firebaseConfig";

const SCRIPTS = {
  APP: "https://cdn.example/firebase-app.js",
  AUTH: "https://cdn.example/firebase-auth.js",
  DATABASE: "https://cdn.example/firebase-database.js",
};

const CONFIG = {
  apiKey: "key",
  authDomain: "example.firebaseapp.com",
  databaseURL: "https://example.firebaseio.com",
  projectId: "example",
};

describe("firebaseConfig", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("when __FIREBASE__ is provided", () => {
    it("returns the config and the script URLs", () => {
      vi.stubGlobal("__FIREBASE__", {
        __CONFIG__: CONFIG,
        __SCRIPTS__: SCRIPTS,
      });

      expect(getFirebaseConfig()).toEqual(CONFIG);
      expect(getFirebaseScripts()).toEqual(SCRIPTS);
    });

    it("returns null for a config without an apiKey or databaseURL", () => {
      vi.stubGlobal("__FIREBASE__", {
        __CONFIG__: { ...CONFIG, apiKey: "" },
        __SCRIPTS__: SCRIPTS,
      });
      expect(getFirebaseConfig()).toBeNull();

      vi.stubGlobal("__FIREBASE__", {
        __CONFIG__: { ...CONFIG, databaseURL: "" },
        __SCRIPTS__: SCRIPTS,
      });
      expect(getFirebaseConfig()).toBeNull();
    });

    it("returns null for incomplete script URLs", () => {
      vi.stubGlobal("__FIREBASE__", {
        __CONFIG__: CONFIG,
        __SCRIPTS__: { ...SCRIPTS, AUTH: "" },
      });

      expect(getFirebaseScripts()).toBeNull();
    });
  });

  describe("when __FIREBASE__ is not defined", () => {
    it("returns null instead of throwing", () => {
      expect(getFirebaseConfig()).toBeNull();
      expect(getFirebaseScripts()).toBeNull();
    });
  });
});
