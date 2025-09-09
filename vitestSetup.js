/* @flow */
// eslint-disable-next-line import/no-nodejs-modules
import crypto from "crypto";

import { vi } from "vitest";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: query.includes("(display-mode: standalone)") ? false : true,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Ensure matchMedia is available globally
global.matchMedia = window.matchMedia;

// $FlowIssue missing browser crypto typedefs
window.crypto = crypto.webcrypto;
