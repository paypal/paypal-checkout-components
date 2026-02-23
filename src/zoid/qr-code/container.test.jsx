/* @flow */
/** @jsx node */
/**
 * Unit tests for QR Code container template and component.
 * Tests CSP nonce handling, frame validation, and visibility state management
 * for both web and non-web environments.
 */

import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";
import { dom } from "@krakenjs/jsx-pragmatic/src";
import { getCSPNonce } from "@paypal/sdk-client/src";

import { containerTemplate, QRCodeContainer } from "./container";

const TEST_UID = "test-uid-12345";
const TEST_NONCE = "test-csp-nonce-xyz";

vi.mock("@paypal/sdk-client/src", () => ({
  getCSPNonce: vi.fn(),
}));

const createMocks = () => ({
  frame: document.createElement("iframe"),
  prerenderFrame: document.createElement("iframe"),
  // $FlowFixMe - mock event emitter for tests
  event: {
    on: vi.fn(),
    trigger: vi.fn(),
    once: vi.fn(),
    reset: vi.fn(),
    triggerOnce: vi.fn(),
  },
});

const originalWebValue = global.__WEB__;

const setupTest = () => {
  vi.clearAllMocks();
  global.__WEB__ = true;
};

const teardownTest = () => {
  global.__WEB__ = originalWebValue;
};

describe("containerTemplate", () => {
  beforeEach(setupTest);
  afterEach(teardownTest);

  test.each([[true], [false]])(
    "when __WEB__ is %s, should call getCSPNonce conditionally",
    (webValue) => {
      global.__WEB__ = webValue;
      // $FlowIssue - mock return value
      getCSPNonce.mockReturnValue(TEST_NONCE);

      const { frame, prerenderFrame, event } = createMocks();
      // $FlowIssue - test props
      const result = containerTemplate({
        frame,
        prerenderFrame,
        doc: document,
        uid: TEST_UID,
        event,
        props: {},
      });

      if (webValue) {
        expect(getCSPNonce).toHaveBeenCalled();
        // Verify nonce value is available for use
        expect(getCSPNonce).toHaveReturnedWith(TEST_NONCE);
        expect(result).toBeDefined();
      } else {
        expect(getCSPNonce).not.toHaveBeenCalled();
      }
    }
  );

  test.each([
    [
      "frame",
      { frame: null, prerenderFrame: document.createElement("iframe") },
    ],
    [
      "prerenderFrame",
      { frame: document.createElement("iframe"), prerenderFrame: null },
    ],
  ])("should return undefined when %s is missing", (_paramName, frames) => {
    // $FlowIssue - test props
    const result = containerTemplate({
      ...frames,
      doc: document,
      uid: TEST_UID,
      event: createMocks().event,
      props: {},
    });
    expect(result).toBeUndefined();
  });

  test("should apply cspNonce to style element in rendered output", () => {
    // $FlowIssue - mock return value
    getCSPNonce.mockReturnValue(TEST_NONCE);

    const { frame, prerenderFrame, event } = createMocks();
    // $FlowIssue - test props
    const result = containerTemplate({
      frame,
      prerenderFrame,
      doc: document,
      uid: TEST_UID,
      event,
      props: {},
    });

    // $FlowFixMe - result is HTMLElement in test context
    const styleElement = result.querySelector("style");
    expect(styleElement?.getAttribute("nonce")).toBe(TEST_NONCE);
  });
});

describe("QRCodeContainer", () => {
  beforeEach(setupTest);
  afterEach(teardownTest);

  test.each([
    ["frame", (mocks) => ({ ...mocks, frame: null })],
    ["prerenderFrame", (mocks) => ({ ...mocks, prerenderFrame: null })],
  ])("should throw error when %s is missing", (_paramName, modifyMocks) => {
    const mocks = createMocks();
    // $FlowIssue - intentionally passing null for error test
    expect(() =>
      QRCodeContainer({ uid: TEST_UID, ...modifyMocks(mocks) })
    ).toThrow("Expected frame and prerenderframe");
  });

  test("should set up visibility classes for prerender transition", () => {
    // Initial state: prerenderFrame visible, component frame invisible
    const { frame, prerenderFrame, event } = createMocks();
    QRCodeContainer({ uid: TEST_UID, frame, prerenderFrame, event });

    // Verify component frame is initially hidden
    expect(frame.classList.contains("component-frame")).toBe(true);
    expect(frame.classList.contains("invisible")).toBe(true);

    // Verify prerender frame is initially visible
    expect(prerenderFrame.classList.contains("prerender-frame")).toBe(true);
    expect(prerenderFrame.classList.contains("visible")).toBe(true);
  });

  test("should toggle frame visibility when EVENT.RENDERED fires", () => {
    const mocks = createMocks();
    QRCodeContainer({ uid: TEST_UID, ...mocks });

    // Extract and invoke the registered handler
    // $FlowFixMe - accessing vitest mock properties
    const handler = mocks.event.on.mock.calls[0][1];
    handler();

    // Verify visibility toggle: prerenderFrame becomes invisible
    expect(mocks.prerenderFrame.classList.contains("invisible")).toBe(true);
    expect(mocks.prerenderFrame.classList.contains("visible")).toBe(false);

    // Verify visibility toggle: component frame becomes visible
    expect(mocks.frame.classList.contains("visible")).toBe(true);
    expect(mocks.frame.classList.contains("invisible")).toBe(false);
  });

  test("should pass cspNonce to QRCodeContainer and apply to rendered style", () => {
    const { frame, prerenderFrame, event } = createMocks();
    const result = QRCodeContainer({
      uid: TEST_UID,
      frame,
      prerenderFrame,
      event,
      cspNonce: TEST_NONCE,
    });

    // Render to DOM to access style element
    // $FlowFixMe - result is ChildType with render method
    const rendered = result.render(dom({ doc: document }));
    const styleElement = rendered.querySelector("style");

    expect(styleElement?.getAttribute("nonce")).toBe(TEST_NONCE);
  });
});
