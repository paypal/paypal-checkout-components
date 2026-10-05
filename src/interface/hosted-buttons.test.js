/* @flow */

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { supportsPopups } from "@krakenjs/belter/src";
import { isSameDomain } from "@krakenjs/cross-domain-utils/src";
import { isPayPalDomain } from "@paypal/sdk-client/src";

import { allowIframe as allowIframeGuard } from "../lib/security";

import { allowIframe } from "./hosted-buttons";

vi.mock("../hosted-buttons", () => ({ getHostedButtonsComponent: vi.fn() }));
vi.mock("../zoid/buttons", () => ({ getButtonsComponent: vi.fn() }));
vi.mock("../zoid/card-form", () => ({ getCardFormComponent: vi.fn() }));
vi.mock("../zoid/qr-code", () => ({ getQRCodeComponent: vi.fn() }));
vi.mock("../zoid/checkout", () => ({ getCheckoutComponent: vi.fn() }));
vi.mock("../lib", () => vi.importActual("../lib/security"));
vi.mock("@krakenjs/belter/src", () => ({ supportsPopups: vi.fn() }));
vi.mock("@krakenjs/cross-domain-utils/src", () => ({ isSameDomain: vi.fn() }));
vi.mock("@paypal/sdk-client/src", () => ({
  getEnv: vi.fn(),
  isPayPalDomain: vi.fn(),
}));

describe("Hosted Buttons iframe authorization", () => {
  beforeEach(() => {
    vi.mocked(isPayPalDomain).mockReturnValue(true);
    vi.mocked(supportsPopups).mockReturnValue(true);
    vi.mocked(isSameDomain).mockReturnValue(true);
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete window.xprops;
  });

  test("exports the existing iframe guard on PayPal origins", () => {
    expect(allowIframe.__get__()).toBe(allowIframeGuard);
  });

  test("does not expose the guard on merchant origins", () => {
    vi.mocked(isPayPalDomain).mockReturnValue(false);

    expect(allowIframe.__get__()).toBeUndefined();
  });

  test("allows a checkout child with a same-domain component parent", () => {
    window.xprops = { getParent: vi.fn().mockReturnValue(window) };

    expect(allowIframe.__get__()?.()).toBe(true);
    expect(isSameDomain).toHaveBeenCalledWith(window);
  });

  test("rejects a checkout child with a cross-domain component parent", () => {
    window.xprops = { getParent: vi.fn().mockReturnValue(window) };
    vi.mocked(isSameDomain).mockReturnValue(false);

    expect(allowIframe.__get__()?.()).toBe(false);
  });

  test("rejects an iframe without a component parent when popups are supported", () => {
    expect(allowIframe.__get__()?.()).toBe(false);
  });

  test("preserves iframe support when the browser cannot open popups", () => {
    vi.mocked(supportsPopups).mockReturnValue(false);

    expect(allowIframe.__get__()?.()).toBe(true);
  });
});
