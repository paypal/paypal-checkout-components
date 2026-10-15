/* @flow */

import { describe, expect, it, vi, beforeEach } from "vitest";

const { loggerMock } = vi.hoisted(() => {
  const addMetaBuilder = vi.fn();
  const immediateFlush = vi.fn(() => Promise.resolve());
  return { loggerMock: { addMetaBuilder, immediateFlush } };
});

vi.mock("@paypal/sdk-client/src", () => ({
  getLogger: vi.fn(() => loggerMock),
}));

describe("fpti-ip-masking", () => {
  beforeEach(() => {
    vi.resetModules();
    loggerMock.addMetaBuilder.mockClear();
    loggerMock.immediateFlush.mockReset();
    loggerMock.immediateFlush.mockImplementation(() => Promise.resolve());
  });

  it("registers a meta builder that masks the IP before any interaction", async () => {
    await import("./fpti-ip-masking");
    const [builder] = loggerMock.addMetaBuilder.mock.calls[0];

    expect(builder()).toEqual({ maskIP: true });
  });

  it("reports no interaction by default", async () => {
    const { hasUserInteracted } = await import("./fpti-ip-masking");

    expect(hasUserInteracted()).toBe(false);
  });

  it("stays masked until the pre-interaction flush resolves, then clears the signal", async () => {
    const { notifyUserInteraction, hasUserInteracted } = await import(
      "./fpti-ip-masking"
    );
    const [builder] = loggerMock.addMetaBuilder.mock.calls[0];

    notifyUserInteraction();

    expect(loggerMock.immediateFlush).toHaveBeenCalledTimes(1);
    expect(hasUserInteracted()).toBe(false);
    expect(builder()).toEqual({ maskIP: true });

    await vi.waitFor(() => expect(hasUserInteracted()).toBe(true));

    expect(builder()).toEqual({});
  });

  it("is idempotent once interaction has been recorded", async () => {
    const { notifyUserInteraction, hasUserInteracted } = await import(
      "./fpti-ip-masking"
    );

    notifyUserInteraction();
    await vi.waitFor(() => expect(hasUserInteracted()).toBe(true));

    notifyUserInteraction();
    notifyUserInteraction();

    expect(loggerMock.immediateFlush).toHaveBeenCalledTimes(1);
  });

  it("does not start a second flush while one is already in flight", async () => {
    let resolveFlush = () => {};
    loggerMock.immediateFlush.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveFlush = resolve;
        }),
    );
    const { notifyUserInteraction, hasUserInteracted } = await import(
      "./fpti-ip-masking"
    );

    notifyUserInteraction();
    notifyUserInteraction();

    expect(loggerMock.immediateFlush).toHaveBeenCalledTimes(1);

    resolveFlush();
    await vi.waitFor(() => expect(hasUserInteracted()).toBe(true));
  });

  it("relays the unmask signal to every registered component's live instances", async () => {
    const { registerMaskedComponent, notifyUserInteraction } = await import(
      "./fpti-ip-masking"
    );

    const updatePropsA = vi.fn(() => Promise.resolve());
    const updatePropsB = vi.fn(() => Promise.resolve());
    registerMaskedComponent(() => ({
      instances: [{ updateProps: updatePropsA }],
    }));
    registerMaskedComponent(() => ({
      instances: [{ updateProps: updatePropsB }],
    }));

    notifyUserInteraction();

    await vi.waitFor(() =>
      expect(updatePropsA).toHaveBeenCalledWith({ hasInteracted: true }),
    );
    expect(updatePropsB).toHaveBeenCalledWith({ hasInteracted: true });
  });

  it("does not throw when a relayed instance was already destroyed", async () => {
    const { registerMaskedComponent, notifyUserInteraction, hasUserInteracted } =
      await import("./fpti-ip-masking");

    const destroyedUpdateProps = vi.fn(() =>
      Promise.reject(new Error("instance destroyed")),
    );
    registerMaskedComponent(() => ({
      instances: [{ updateProps: destroyedUpdateProps }],
    }));

    expect(() => notifyUserInteraction()).not.toThrow();

    await vi.waitFor(() => expect(hasUserInteracted()).toBe(true));
  });

  it("still relays to other components when one component's getter throws", async () => {
    const { registerMaskedComponent, notifyUserInteraction } = await import(
      "./fpti-ip-masking"
    );

    const updateProps = vi.fn(() => Promise.resolve());
    registerMaskedComponent(() => {
      throw new Error("factory blew up");
    });
    registerMaskedComponent(() => ({ instances: [{ updateProps }] }));

    expect(() => notifyUserInteraction()).not.toThrow();

    await vi.waitFor(() =>
      expect(updateProps).toHaveBeenCalledWith({ hasInteracted: true }),
    );
  });
});
