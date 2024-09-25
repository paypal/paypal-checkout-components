/* @flow */
/* eslint max-lines: 0 */
import { vi, describe, beforeEach, afterEach, test, expect } from "vitest";

import { Buttons } from "../../src/interface/button";

import {
  addComponentsToWindow,
  createTestContainer,
  destroyTestContainer,
} from "./testutils";

describe("PayPal Buttons Component", () => {
  beforeEach(() => {
    createTestContainer();
    addComponentsToWindow({ Buttons });
  });

  afterEach(() => {
    destroyTestContainer();
  });

  test("should render Buttons with no issues", async () => {
    await expect(
      window.paypal.Buttons({}).render("#testContainer")
    ).resolves.toEqual();
  });
});
