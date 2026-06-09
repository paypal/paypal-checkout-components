/* @flow */
import { describe, test, expect } from "vitest";

import { PayPalMonogramMark } from "./monogramMark";

describe("PayPalMonogramMark", () => {
  test("should render PayPal monogram mark component", () => {
    const markComponent = PayPalMonogramMark();

    expect(markComponent).toBeDefined();
    expect(markComponent.type).toBe("component");
    expect(markComponent.props).toBeDefined();
    expect(markComponent.props.logoColor).toBe("blue");
  });

  test("should return ChildType for type compatibility", () => {
    const markComponent = PayPalMonogramMark();

    // Should be compatible with ChildType (no type errors)
    expect(typeof markComponent).toBe("object");
    expect(markComponent.type).toBeDefined();
    expect(markComponent.props).toBeDefined();
  });
});
