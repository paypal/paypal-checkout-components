/* @flow */

import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
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
  isStandAlone,
  supportsPopups,
  isTablet,
  isIos,
  isSafari,
  isAndroid,
  isChrome,
  isFirefox,
} from "@krakenjs/belter/src";

import {
  isVenmoSupportedWebView,
  supportsVenmoPopups,
  isSupportedNativeVenmoBrowser,
} from "./util";

// Mock all the browser detection functions from belter
vi.mock("@krakenjs/belter/src", () => ({
  isWebView: vi.fn(),
  isIosWebview: vi.fn(),
  isAndroidWebview: vi.fn(),
  isFacebookWebView: vi.fn(),
  isOperaMini: vi.fn(),
  isFirefoxIOS: vi.fn(),
  isEdgeIOS: vi.fn(),
  isQQBrowser: vi.fn(),
  isElectron: vi.fn(),
  isMacOsCna: vi.fn(),
  isStandAlone: vi.fn(),
  supportsPopups: vi.fn(),
  isTablet: vi.fn(),
  isIos: vi.fn(),
  isSafari: vi.fn(),
  isAndroid: vi.fn(),
  isChrome: vi.fn(),
  isFirefox: vi.fn(),
}));

describe("funding/util", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    
    // Reset window.popupBridge
    delete window.popupBridge;
    
    // Set default mock return values
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
    vi.mocked(isStandAlone).mockReturnValue(false);
    vi.mocked(supportsPopups).mockReturnValue(true);
    vi.mocked(isTablet).mockReturnValue(false);
    vi.mocked(isIos).mockReturnValue(false);
    vi.mocked(isSafari).mockReturnValue(false);
    vi.mocked(isAndroid).mockReturnValue(false);
    vi.mocked(isChrome).mockReturnValue(false);
    vi.mocked(isFirefox).mockReturnValue(false);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("isVenmoSupportedWebView", () => {
    it("should return true when isWebView returns true", () => {
      vi.mocked(isWebView).mockReturnValue(true);

      expect(isVenmoSupportedWebView()).toBe(true);
    });

    it("should return true when isIosWebview returns true", () => {
      vi.mocked(isIosWebview).mockReturnValue(true);

      expect(isVenmoSupportedWebView()).toBe(true);
    });

    it("should return true when isAndroidWebview returns true", () => {
      vi.mocked(isAndroidWebview).mockReturnValue(true);

      expect(isVenmoSupportedWebView()).toBe(true);
    });

    it("should return true when isFacebookWebView returns true", () => {
      vi.mocked(isFacebookWebView).mockReturnValue(true);

      expect(isVenmoSupportedWebView()).toBe(true);
    });

    it("should return true when multiple webview detectors return true", () => {
      vi.mocked(isWebView).mockReturnValue(true);
      vi.mocked(isIosWebview).mockReturnValue(true);

      expect(isVenmoSupportedWebView()).toBe(true);
    });

    it("should return false when no webview detectors return true", () => {
      expect(isVenmoSupportedWebView()).toBe(false);
    });
  });

  describe("supportsVenmoPopups", () => {
    describe("when in supported webview", () => {
      beforeEach(() => {
        vi.mocked(isWebView).mockReturnValue(true);
      });

      it("should return true when popupBridge is available", () => {
        window.popupBridge = {};

        expect(supportsVenmoPopups({})).toBe(true);
      });

      it("should return false when popupBridge is not available", () => {
        expect(supportsVenmoPopups({})).toBe(false);
      });
    });

    describe("when not in supported webview", () => {
      it("should return true when experiment flag is enabled and user agent supports popups", () => {
        vi.mocked(supportsPopups).mockReturnValue(true);
        const experiment = { venmoEnableWebOnNonNativeBrowser: true };

        expect(supportsVenmoPopups(experiment)).toBe(true);
      });

      it("should return false when experiment flag is enabled but user agent doesn't support popups due to isOperaMini", () => {
        vi.mocked(isOperaMini).mockReturnValue(true);
        const experiment = { venmoEnableWebOnNonNativeBrowser: true };

        expect(supportsVenmoPopups(experiment)).toBe(false);
      });

      it("should return false when experiment flag is enabled but user agent doesn't support popups due to isFirefoxIOS", () => {
        vi.mocked(isFirefoxIOS).mockReturnValue(true);
        const experiment = { venmoEnableWebOnNonNativeBrowser: true };

        expect(supportsVenmoPopups(experiment)).toBe(false);
      });

      it("should return false when experiment flag is enabled but user agent doesn't support popups due to isEdgeIOS", () => {
        vi.mocked(isEdgeIOS).mockReturnValue(true);
        const experiment = { venmoEnableWebOnNonNativeBrowser: true };

        expect(supportsVenmoPopups(experiment)).toBe(false);
      });

      it("should return false when experiment flag is enabled but user agent doesn't support popups due to isQQBrowser", () => {
        vi.mocked(isQQBrowser).mockReturnValue(true);
        const experiment = { venmoEnableWebOnNonNativeBrowser: true };

        expect(supportsVenmoPopups(experiment)).toBe(false);
      });

      it("should return false when experiment flag is enabled but user agent doesn't support popups due to isElectron", () => {
        vi.mocked(isElectron).mockReturnValue(true);
        const experiment = { venmoEnableWebOnNonNativeBrowser: true };

        expect(supportsVenmoPopups(experiment)).toBe(false);
      });

      it("should return false when experiment flag is enabled but user agent doesn't support popups due to isMacOsCna", () => {
        vi.mocked(isMacOsCna).mockReturnValue(true);
        const experiment = { venmoEnableWebOnNonNativeBrowser: true };

        expect(supportsVenmoPopups(experiment)).toBe(false);
      });

      it("should return false when experiment flag is enabled but user agent doesn't support popups due to isStandAlone", () => {
        vi.mocked(isStandAlone).mockReturnValue(true);
        const experiment = { venmoEnableWebOnNonNativeBrowser: true };

        expect(supportsVenmoPopups(experiment)).toBe(false);
      });

      it("should fall back to supportsPopups when experiment flag is not enabled", () => {
        vi.mocked(supportsPopups).mockReturnValue(true);
        const experiment = {};

        expect(supportsVenmoPopups(experiment)).toBe(true);
      });

      it("should fall back to supportsPopups when experiment flag is false", () => {
        vi.mocked(supportsPopups).mockReturnValue(false);
        const experiment = { venmoEnableWebOnNonNativeBrowser: false };

        expect(supportsVenmoPopups(experiment)).toBe(false);
      });

      it("should handle undefined experiment", () => {
        vi.mocked(supportsPopups).mockReturnValue(true);

        expect(supportsVenmoPopups(undefined)).toBe(true);
      });
    });
  });

  describe("isSupportedNativeVenmoBrowser", () => {
    describe("when in supported webview", () => {
      beforeEach(() => {
        vi.mocked(isWebView).mockReturnValue(true);
      });

      it("should return true when popupBridge is available", () => {
        window.popupBridge = {};

        expect(isSupportedNativeVenmoBrowser({})).toBe(true);
      });

      it("should return false when popupBridge is not available", () => {
        expect(isSupportedNativeVenmoBrowser({})).toBe(false);
      });
    });

    describe("when not in supported webview", () => {
      it("should return false when on tablet", () => {
        vi.mocked(isTablet).mockReturnValue(true);

        expect(isSupportedNativeVenmoBrowser({})).toBe(false);
      });

      it("should return true for iOS Safari by default", () => {
        vi.mocked(isIos).mockReturnValue(true);
        vi.mocked(isSafari).mockReturnValue(true);

        expect(isSupportedNativeVenmoBrowser({})).toBe(true);
      });

      it("should return true for Android Chrome by default", () => {
        vi.mocked(isAndroid).mockReturnValue(true);
        vi.mocked(isChrome).mockReturnValue(true);

        expect(isSupportedNativeVenmoBrowser({})).toBe(true);
      });

      it("should return false for iOS Chrome without experiment flag", () => {
        vi.mocked(isIos).mockReturnValue(true);
        vi.mocked(isChrome).mockReturnValue(true);

        expect(isSupportedNativeVenmoBrowser({})).toBe(false);
      });

      it("should return true for iOS Chrome with experiment flag", () => {
        vi.mocked(isIos).mockReturnValue(true);
        vi.mocked(isChrome).mockReturnValue(true);
        const experiment = { venmoEnableWebOnNonNativeBrowser: true };

        expect(isSupportedNativeVenmoBrowser(experiment)).toBe(true);
      });

      it("should return false for Android Firefox without experiment flag", () => {
        vi.mocked(isAndroid).mockReturnValue(true);
        vi.mocked(isFirefox).mockReturnValue(true);

        expect(isSupportedNativeVenmoBrowser({})).toBe(false);
      });

      it("should return true for Android Firefox with experiment flag", () => {
        vi.mocked(isAndroid).mockReturnValue(true);
        vi.mocked(isFirefox).mockReturnValue(true);
        const experiment = { venmoEnableWebOnNonNativeBrowser: true };

        expect(isSupportedNativeVenmoBrowser(experiment)).toBe(true);
      });

      it("should return false for unsupported browser combinations", () => {
        vi.mocked(isIos).mockReturnValue(true);
        vi.mocked(isFirefox).mockReturnValue(true); // iOS Firefox (not Chrome)

        expect(isSupportedNativeVenmoBrowser({})).toBe(false);
      });

      it("should return false for desktop browsers", () => {
        // No mobile flags set, simulating desktop

        expect(isSupportedNativeVenmoBrowser({})).toBe(false);
      });

      it("should handle undefined experiment", () => {
        vi.mocked(isIos).mockReturnValue(true);
        vi.mocked(isSafari).mockReturnValue(true);

        expect(isSupportedNativeVenmoBrowser(undefined)).toBe(true);
      });

      it("should prioritize tablet check over browser checks", () => {
        vi.mocked(isTablet).mockReturnValue(true);
        vi.mocked(isIos).mockReturnValue(true);
        vi.mocked(isSafari).mockReturnValue(true);

        expect(isSupportedNativeVenmoBrowser({})).toBe(false);
      });
    });
  });
});