/* @flow */

import { describe, expect, vi, beforeEach, afterEach } from "vitest";
import {
  isWebView,
  isIosWebview,
  isAndroidWebview,
  isFacebookWebView,
  isOperaMini,
  isFirefoxIOS,
  isEdgeIOS,
  isQQBrowser,
  isElectron,
  isMacOsCna,
  isIos,
  isAndroid,
  isChrome,
  isSafari,
  isFirefox,
  isTablet,
} from "@krakenjs/belter/src";

import { isSupportedNativeVenmoBrowser, supportsVenmoPopups } from "./util";

// Mock functions to avoid matchMedia issues and control browser detection
vi.mock("@krakenjs/belter/src", async () => {
  const actual = await vi.importActual("@krakenjs/belter/src");
  return {
    ...actual,
    isStandAlone: vi.fn(() => false),
    supportsPopups: vi.fn(() => true),
    isWebView: vi.fn(() => false),
    isIosWebview: vi.fn(() => false),
    isAndroidWebview: vi.fn(() => false),
    isFacebookWebView: vi.fn(() => false),
    isOperaMini: vi.fn(() => false),
    isFirefoxIOS: vi.fn(() => false),
    isEdgeIOS: vi.fn(() => false),
    isQQBrowser: vi.fn(() => false),
    isElectron: vi.fn(() => false),
    isMacOsCna: vi.fn(() => false),
    isIos: vi.fn(() => true),
    isAndroid: vi.fn(() => false),
    isChrome: vi.fn(() => false),
    isSafari: vi.fn(() => true),
    isFirefox: vi.fn(() => false),
    isTablet: vi.fn(() => false),
  };
});

describe("isSupportedNativeVenmoBrowser", () => {
  let originalPopupBridge;

  beforeEach(() => {
    originalPopupBridge = window.popupBridge;
    delete window.popupBridge;
    // Mock navigator.userAgent
    window.navigator.mockUserAgent =
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

    // Reset all mocks to default values for non-webview, iOS Safari
    vi.mocked(isWebView).mockReturnValue(false);
    vi.mocked(isIosWebview).mockReturnValue(false);
    vi.mocked(isAndroidWebview).mockReturnValue(false);
    vi.mocked(isFacebookWebView).mockReturnValue(false);
    vi.mocked(isOperaMini).mockReturnValue(false);
    vi.mocked(isFirefoxIOS).mockReturnValue(false);
    vi.mocked(isEdgeIOS).mockReturnValue(false);
    vi.mocked(isQQBrowser).mockReturnValue(false);
    vi.mocked(isElectron).mockReturnValue(false);
    vi.mocked(isMacOsCna).mockReturnValue(false);
    vi.mocked(isIos).mockReturnValue(true);
    vi.mocked(isAndroid).mockReturnValue(false);
    vi.mocked(isChrome).mockReturnValue(false);
    vi.mocked(isSafari).mockReturnValue(true);
    vi.mocked(isFirefox).mockReturnValue(false);
    vi.mocked(isTablet).mockReturnValue(false);
  });

  afterEach(() => {
    if (originalPopupBridge) {
      window.popupBridge = originalPopupBridge;
    } else {
      delete window.popupBridge;
    }
    vi.restoreAllMocks();
  });

  describe("webview scenarios", () => {
    test("should return true in webview with popupBridge", () => {
      window.popupBridge = {};
      vi.mocked(isWebView).mockReturnValue(true);

      const result = isSupportedNativeVenmoBrowser({});

      expect(result).toBe(true);
    });

    test("should return false in webview without popupBridge", () => {
      vi.mocked(isWebView).mockReturnValue(true);

      const result = isSupportedNativeVenmoBrowser({});

      expect(result).toBe(false);
    });

    test("should return true in iOS webview with popupBridge", () => {
      window.popupBridge = {};
      vi.mocked(isIosWebview).mockReturnValue(true);

      const result = isSupportedNativeVenmoBrowser({});

      expect(result).toBe(true);
    });

    test("should return false in iOS webview without popupBridge", () => {
      vi.mocked(isIosWebview).mockReturnValue(true);

      const result = isSupportedNativeVenmoBrowser({});

      expect(result).toBe(false);
    });
  });

  describe("tablet scenarios", () => {
    test("should return false on tablet devices", () => {
      vi.mocked(isTablet).mockReturnValue(true);
      const experiment = { venmoEnableWebOnNonNativeBrowser: true };

      const result = isSupportedNativeVenmoBrowser(experiment);

      expect(result).toBe(false);
    });
  });

  describe("non-webview scenarios with venmoEnableWebOnNonNativeBrowser enabled", () => {
    const experiment = { venmoEnableWebOnNonNativeBrowser: true };

    test("should return true when experiment is enabled", () => {
      const result = isSupportedNativeVenmoBrowser(experiment);

      expect(result).toBe(true);
    });
  });

  describe("non-webview scenarios with venmoEnableWebOnNonNativeBrowser disabled", () => {
    const experiment = { venmoEnableWebOnNonNativeBrowser: false };

    test("should return false when experiment is disabled", () => {
      const result = isSupportedNativeVenmoBrowser(experiment);

      expect(result).toBe(false);
    });
  });

  describe("non-webview scenarios with venmoEnableWebOnNonNativeBrowser undefined", () => {
    const experiment = {};

    test("should return false when experiment is undefined", () => {
      const result = isSupportedNativeVenmoBrowser(experiment);

      expect(result).toBe(false);
    });
  });

  describe("default user agent", () => {
    test("should use default user agent when none provided", () => {
      const experiment = { venmoEnableWebOnNonNativeBrowser: true };

      // This will use the mocked navigator.userAgent (iOS Safari)
      const result = isSupportedNativeVenmoBrowser(experiment);

      expect(result).toBe(true);
    });
  });
});

describe("supportsVenmoPopups", () => {
  let originalPopupBridge;
  let originalStandalone;
  let originalScreen;

  beforeEach(() => {
    originalPopupBridge = window.popupBridge;
    delete window.popupBridge;
    window.navigator.mockUserAgent =
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

    // Mock navigator.standalone for isStandAlone detection
    originalStandalone = window.navigator.standalone;
    window.navigator.standalone = false;

    // Mock screen object for isStandAlone detection
    originalScreen = window.screen;
    window.screen = {
      width: 390,
      height: 844,
      availWidth: 390,
      availHeight: 844,
    };

    // Mock innerWidth/Height and outerWidth/Height for isStandAlone
    Object.defineProperty(window, "innerWidth", { value: 390, writable: true });
    Object.defineProperty(window, "innerHeight", {
      value: 844,
      writable: true,
    });
    Object.defineProperty(window, "outerWidth", { value: 390, writable: true });
    Object.defineProperty(window, "outerHeight", {
      value: 844,
      writable: true,
    });

    // Reset all mocks to default values for non-webview, iOS Safari
    vi.mocked(isWebView).mockReturnValue(false);
    vi.mocked(isIosWebview).mockReturnValue(false);
    vi.mocked(isAndroidWebview).mockReturnValue(false);
    vi.mocked(isFacebookWebView).mockReturnValue(false);
    vi.mocked(isOperaMini).mockReturnValue(false);
    vi.mocked(isFirefoxIOS).mockReturnValue(false);
    vi.mocked(isEdgeIOS).mockReturnValue(false);
    vi.mocked(isQQBrowser).mockReturnValue(false);
    vi.mocked(isElectron).mockReturnValue(false);
    vi.mocked(isMacOsCna).mockReturnValue(false);
    vi.mocked(isIos).mockReturnValue(true);
    vi.mocked(isAndroid).mockReturnValue(false);
    vi.mocked(isChrome).mockReturnValue(false);
    vi.mocked(isSafari).mockReturnValue(true);
    vi.mocked(isFirefox).mockReturnValue(false);
    vi.mocked(isTablet).mockReturnValue(false);
  });

  afterEach(() => {
    if (originalPopupBridge) {
      window.popupBridge = originalPopupBridge;
    } else {
      delete window.popupBridge;
    }
    window.navigator.standalone = originalStandalone;
    window.screen = originalScreen;
    vi.restoreAllMocks();
  });

  describe("webview scenarios", () => {
    test("should return true in webview with popupBridge", () => {
      window.popupBridge = {};
      vi.mocked(isWebView).mockReturnValue(true);

      const result = supportsVenmoPopups({});

      expect(result).toBe(true);
    });

    test("should return false in webview without popupBridge", () => {
      vi.mocked(isWebView).mockReturnValue(true);

      const result = supportsVenmoPopups({});

      expect(result).toBe(false);
    });

    test("should return true in iOS webview with popupBridge", () => {
      window.popupBridge = {};
      vi.mocked(isIosWebview).mockReturnValue(true);

      const result = supportsVenmoPopups({});

      expect(result).toBe(true);
    });
  });

  describe("venmoEnableWebOnNonNativeBrowser enabled scenarios", () => {
    const experiment = { venmoEnableWebOnNonNativeBrowser: true };

    test("should return true when experiment is enabled", () => {
      const result = supportsVenmoPopups(experiment);

      expect(result).toBe(true);
    });
  });

  describe("venmoEnableWebOnNonNativeBrowser disabled scenarios", () => {
    const experiment = { venmoEnableWebOnNonNativeBrowser: false };

    test("should use default userAgentSupportsPopups when experiment is disabled", () => {
      const result = supportsVenmoPopups(experiment);

      expect(result).toBe(true);
    });
  });

  describe("default experiment scenarios", () => {
    test("should use default userAgentSupportsPopups when experiment is undefined", () => {
      const experiment = {};

      const result = supportsVenmoPopups(experiment);

      expect(result).toBe(true);
    });
  });

  describe("default user agent", () => {
    test("should use default user agent when none provided", () => {
      const experiment = { venmoEnableWebOnNonNativeBrowser: true };

      const result = supportsVenmoPopups(experiment);

      expect(result).toBe(true);
    });
  });
});
