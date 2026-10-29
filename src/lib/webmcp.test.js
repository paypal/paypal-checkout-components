/* @flow */

import { afterEach, describe, expect, it, vi } from "vitest";

import {
  registerWebMCPTools,
  resetWebMCPRegistration,
  unregisterWebMCPTools,
} from "./webmcp";

describe("top-level WebMCP registration", () => {
  afterEach(() => {
    resetWebMCPRegistration();
    // $FlowIgnore[prop-missing]
    delete document.modelContext;
  });

  it("registers proxy tools on the merchant document", async () => {
    const registerTool = vi.fn(async () => undefined);
    const executeTool = vi.fn(async () => ({ content: [] }));
    // $FlowIgnore[prop-missing]
    document.modelContext = { registerTool };

    await registerWebMCPTools({
      executeTool,
      protocolVersion: 1,
      registrationId: "registration-1",
      toolDefinitions: [
        {
          description: "Search products",
          inputSchema: { type: "object" },
          name: "shopping.searchProducts",
        },
      ],
    });

    expect(registerTool).toHaveBeenCalledTimes(1);
    const [tool, options] = registerTool.mock.calls[0];
    expect(options.signal).toBeInstanceOf(AbortSignal);

    await tool.execute({ query: "gift card" });
    expect(executeTool).toHaveBeenCalledWith({
      args: { query: "gift card" },
      protocolVersion: 1,
      registrationId: "registration-1",
      toolName: "shopping.searchProducts",
    });
  });

  it("resolves execute() with an isError result instead of rejecting when executeTool fails", async () => {
    // Agents treat a rejected execute() as an untrusted/unexpected page
    // failure and sanitize the message to a generic error, discarding the
    // actual (often actionable, e.g. "Please provide an email address to
    // continue.") reason. Resolving with { content, isError: true } instead
    // preserves it.
    const registerTool = vi.fn(async () => undefined);
    const executeTool = vi.fn(async () => {
      throw new Error(
        "UNPROCESSABLE: Please provide an email address to continue.",
      );
    });
    // $FlowIgnore[prop-missing]
    document.modelContext = { registerTool };

    await registerWebMCPTools({
      executeTool,
      protocolVersion: 1,
      registrationId: "registration-1",
      toolDefinitions: [
        {
          description: "Checkout",
          name: "shopping.initiateCheckout",
        },
      ],
    });

    const [tool] = registerTool.mock.calls[0];
    const result = await tool.execute({});

    expect(result).toEqual({
      content: [
        {
          type: "text",
          text: "UNPROCESSABLE: Please provide an email address to continue.",
        },
      ],
      isError: true,
    });
  });

  it("does not register the same bridge registration twice", async () => {
    const registerTool = vi.fn(async () => undefined);
    // $FlowIgnore[prop-missing]
    document.modelContext = { registerTool };
    const registration = {
      executeTool: vi.fn(async () => ({ content: [] })),
      protocolVersion: 1,
      registrationId: "registration-1",
      toolDefinitions: [
        {
          description: "Search products",
          name: "shopping.searchProducts",
        },
      ],
    };

    await registerWebMCPTools(registration);
    await registerWebMCPTools(registration);

    expect(registerTool).toHaveBeenCalledTimes(1);
  });

  it("only unregisters the currently active bridge registration", async () => {
    const registerTool = vi.fn(async () => undefined);
    // $FlowIgnore[prop-missing]
    document.modelContext = { registerTool };
    const registration = {
      executeTool: vi.fn(async () => ({ content: [] })),
      protocolVersion: 1,
      registrationId: "registration-2",
      toolDefinitions: [
        {
          description: "Search products",
          name: "shopping.searchProducts",
        },
      ],
    };

    await registerWebMCPTools(registration);
    const signal = registerTool.mock.calls[0][1].signal;

    unregisterWebMCPTools({ registrationId: "registration-1" });
    expect(signal.aborted).toBe(false);

    unregisterWebMCPTools({ registrationId: "registration-2" });
    expect(signal.aborted).toBe(true);
  });
});
