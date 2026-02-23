/* @flow */
/** @jsx node */
/**
 * Unit tests for QR Code prerender template.
 * Tests CSP nonce propagation to SpinnerPage and style elements
 * in both web and non-web environments.
 */

import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";
import { getCSPNonce } from "@paypal/sdk-client/src";

import { prerenderTemplate } from "./prerender";

const TEST_NONCE = "prerender-nonce-abc123";

vi.mock("@paypal/sdk-client/src", () => ({
  getCSPNonce: vi.fn(),
}));

let capturedSpinnerPageProps = null;
let capturedChildren = null;

vi.mock("@paypal/common-components/src", () => ({
  SpinnerPage: vi.fn().mockImplementation((props, children) => {
    capturedSpinnerPageProps = props;
    capturedChildren = children;
    return {
      render: vi.fn(() => document.createElement("div")),
    };
  }),
}));

const originalWebValue = global.__WEB__;

const setupTest = () => {
  vi.clearAllMocks();
  capturedSpinnerPageProps = null;
  capturedChildren = null;
  global.__WEB__ = true;
};

const teardownTest = () => {
  global.__WEB__ = originalWebValue;
};

describe("prerenderTemplate", () => {
  beforeEach(setupTest);
  afterEach(teardownTest);

  test.each([
    [true, TEST_NONCE],
    [false, undefined],
  ])(
    "when __WEB__ is %s, should pass nonce %s to SpinnerPage",
    (webValue, expectedNonce) => {
      global.__WEB__ = webValue;
      // $FlowIssue - mock return value
      getCSPNonce.mockReturnValue(TEST_NONCE);

      // $FlowIssue - test props
      const result = prerenderTemplate({
        doc: document,
        close: vi.fn(),
        props: {},
      });

      if (webValue) {
        // Verify getCSPNonce is called in web environment
        expect(getCSPNonce).toHaveBeenCalled();
        expect(getCSPNonce).toHaveReturnedWith(TEST_NONCE);
      } else {
        // Verify getCSPNonce is NOT called in non-web environment
        expect(getCSPNonce).not.toHaveBeenCalled();
      }

      // Verify SpinnerPage receives correct nonce prop
      expect(result).toBeDefined();
      expect(capturedSpinnerPageProps).toEqual({ nonce: expectedNonce });
    }
  );

  test("should apply cspNonce to style element in children", () => {
    // $FlowIssue - mock return value
    getCSPNonce.mockReturnValue(TEST_NONCE);

    // $FlowIssue - test props
    prerenderTemplate({ doc: document, close: vi.fn(), props: {} });

    expect(capturedChildren?.length).toBe(2);
    // $FlowFixMe - capturedChildren is set by mock
    expect(capturedChildren[0]?.props?.nonce).toBe(TEST_NONCE);
  });

  test("should wire up close handler to close button", () => {
    const mockClose = vi.fn();
    // $FlowIssue - test props
    prerenderTemplate({ doc: document, close: mockClose, props: {} });

    // Verify second child is close button with correct props
    expect(capturedChildren?.length).toBe(2);
    // $FlowFixMe - capturedChildren is set by mock
    const closeButton = capturedChildren[1];
    expect(closeButton?.props?.onClick).toBe(mockClose);
    expect(closeButton?.props?.id).toBe("close");
    expect(closeButton?.props["aria-label"]).toBe("close");
  });
});
