/* @flow */

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
  supportsPopups,
  isTablet,
  isIos,
  isSafari,
  isAndroid,
  isChrome,
  isFirefox,
} from "@krakenjs/belter/src";

import type { Experiment } from "../types";

const isMacOsCna = (userAgent: string): boolean => {
  return /Macintosh.*AppleWebKit(?!.*Safari)/i.test(userAgent);
};

const isVenmoSupportedWebView = (userAgent: string): boolean => {
  return (
    isWebView(userAgent) ||
    isIosWebview(userAgent) ||
    isAndroidWebview(userAgent) ||
    isFacebookWebView(userAgent)
  );
};

const venmoUserAgentSupportsPopups = (userAgent: string): boolean => {
  return !(
    isVenmoSupportedWebView(userAgent) ||
    isOperaMini(userAgent) ||
    isFirefoxIOS(userAgent) ||
    isEdgeIOS(userAgent) ||
    isQQBrowser(userAgent) ||
    isMacOsCna(userAgent) ||
    isElectron()
  );
};

export function supportsVenmoPopups(
  experiment?: Experiment,
  userAgent: string
): boolean {
  if (isVenmoSupportedWebView(userAgent)) {
    if (typeof window !== "undefined" && window.popupBridge) {
      return true;
    }
    return false;
  }

  if (experiment?.venmoEnableWebOnNonNativeBrowser === true) {
    return venmoUserAgentSupportsPopups(userAgent);
  }
  return supportsPopups();
}

export function isSupportedNativeVenmoBrowser(
  experiment?: Experiment,
  userAgent: string
): boolean {
  if (isVenmoSupportedWebView(userAgent)) {
    if (typeof window !== "undefined" && window.popupBridge) {
      return true;
    }
    return false;
  }

  if (isTablet(userAgent)) {
    return false;
  }

  // Default supported browsers for Venmo
  if (
    (isIos(userAgent) && isSafari(userAgent)) ||
    (isAndroid(userAgent) && isChrome(userAgent))
  ) {
    return true;
  }

  // Additional browsers enabled by experiment
  if (
    experiment?.venmoEnableWebOnNonNativeBrowser === true &&
    ((isIos(userAgent) && isChrome(userAgent)) ||
      (isAndroid(userAgent) && isFirefox(userAgent)))
  ) {
    return true;
  }

  return false;
}
