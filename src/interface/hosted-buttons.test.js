import { beforeEach, describe, expect, test, vi } from "vitest";
import { isPayPalDomain } from "@paypal/sdk-client/src";

import { allowIframe as allowIframeGuard } from "../lib/security";

import { allowIframe } from "./hosted-buttons";

vi.mock("../hosted-buttons", () => ({ getHostedButtonsComponent: vi.fn() }));
vi.mock("../zoid/buttons", () => ({ getButtonsComponent: vi.fn() }));
vi.mock("../zoid/card-form", () => ({ getCardFormComponent: vi.fn() }));
vi.mock("../zoid/qr-code", () => ({ getQRCodeComponent: vi.fn() }));
vi.mock("../zoid/checkout", () => ({ getCheckoutComponent: vi.fn() }));
vi.mock("../lib", () => vi.importActual("../lib/security"));
vi.mock("@paypal/sdk-client/src", () => ({
  getEnv: vi.fn(),
  isPayPalDomain: vi.fn(),
}));

// The guard's own logic is covered in src/lib/security.test.js. These tests only
// cover how the Hosted Buttons interface exposes it.
describe("Hosted Buttons allowIframe export", () => {
  beforeEach(() => {
    vi.mocked(isPayPalDomain).mockReturnValue(true);
  });

  test("exports the existing iframe guard on PayPal origins", () => {
    expect(allowIframe.__get__()).toBe(allowIframeGuard);
  });

  test("does not expose the guard on merchant origins", () => {
    vi.mocked(isPayPalDomain).mockReturnValue(false);

    expect(allowIframe.__get__()).toBeUndefined();
  });
});
