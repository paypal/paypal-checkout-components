/* @flow */
import { describe, expect, test } from "vitest";
import { html } from "@krakenjs/jsx-pragmatic";

import { SavedPaymentMethods } from "./template";

describe("SavedPaymentMethods template (UI shell)", () => {
  test("parses SSR markup into DOM with app root and loading skeleton", () => {
    const markup = SavedPaymentMethods({ nonce: "test-nonce" }).render(html());

    expect(typeof markup).toBe("string");
    expect(markup.length).toBeGreaterThan(0);

    const host = document.createElement("div");
    host.innerHTML = markup;

    expect(host.querySelector("style[nonce='test-nonce']")).toBeTruthy();
    expect(host.querySelector(".spm-container")).toBeTruthy();
    expect(host.querySelector("#spm-app-root")).toBeTruthy();
    expect(host.querySelector(".spm-tag-loading")).toBeTruthy();
    expect(host.querySelector(".spm-logo-frame")).toBeTruthy();
  });
});
