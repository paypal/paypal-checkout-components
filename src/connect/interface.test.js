/* @flow */

import { describe, expect, vi, beforeEach } from "vitest";
import { memoize } from "@krakenjs/belter/src";

import { getConnectComponent } from "./component";
import { Connect } from "./interface";

describe("interface.js", () => {
  beforeEach(() => {
    memoize.clear();
  });
  vi.mock("./component", () => {
    return {
      getConnectComponent: vi.fn(() => ({})),
    };
  });
  it("should call getConnectComponent with merchant props", async () => {
    const merchantProps = { props: "someProps" };

    await Connect(merchantProps);
    expect(getConnectComponent).toBeCalledWith(merchantProps);
  });
});
