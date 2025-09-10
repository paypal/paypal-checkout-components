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

import type { Experiment } from "../types";

export const isVenmoSupportedWebView = (): boolean => {
  return (
    isWebView() || isIosWebview() || isAndroidWebview() || isFacebookWebView()
  );
};

export function supportsVenmoPopups(experiment?: Experiment): boolean {
  if (isVenmoSupportedWebView()) {
    if (window.popupBridge) {
      return true;
    }
    return false;
  }

  const venmoUserAgentSupportsPopups = () => {
    return !(
      isVenmoSupportedWebView() ||
      isOperaMini() ||
      isFirefoxIOS() ||
      isEdgeIOS() ||
      isQQBrowser() ||
      isElectron() ||
      isMacOsCna() ||
      isStandAlone()
    );
  };

  if (experiment?.venmoEnableWebOnNonNativeBrowser === true) {
    return venmoUserAgentSupportsPopups();
  }
  return supportsPopups();
}

export function isSupportedNativeVenmoBrowser(experiment?: Experiment): boolean {
  if (isVenmoSupportedWebView()) {
    if (window.popupBridge) {
      return true;
    }
    return false;
  }

  if (isTablet()) {
    return false;
  }

  // Default supported browsers for Venmo
  if ((isIos() && isSafari()) || (isAndroid() && isChrome())) {
    return true;
  }

  // Additional browsers enabled by experiment
  if (
    experiment?.venmoEnableWebOnNonNativeBrowser === true &&
    ((isIos() && isChrome()) || (isAndroid() && isFirefox()))
  ) {
    return true;
  }

  return false;
}
