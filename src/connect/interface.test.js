/* @flow */

import { describe, expect, vi } from "vitest";

import { getConnectComponent } from "./component";
import { Connect } from "./interface";

describe("interface.js", () => {
  vi.mock("./component", () => {
    return {
      getConnectComponent: vi.fn(),
    };
  });
  it("should call getConnectComponent with merchant props", async () => {
    const merchantProps = { props: "someProps" };
    await Connect()(merchantProps);
    expect(getConnectComponent).toBeCalledWith(merchantProps);
  });
});
