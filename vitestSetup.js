/* @flow */
// eslint-disable-next-line import/no-nodejs-modules
import crypto from "crypto";
import { vi } from "vitest";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// $FlowIssue missing browser crypto typedefs
window.crypto = crypto.webcrypto;

// sdk-client relies on a current script to create and find a lot of
// globals that it needs. We are mocking that functionality for tests with this
const sourceURL = `https://${__SDK_HOST__}${__PATH__}?client-id=test`;
const script = document.createElement("script");
script.src = sourceURL;

Object.defineProperty(document, "currentScript", {
  writable: true,
  value: script,
});
