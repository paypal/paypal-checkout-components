/* @flow */
/* eslint-disable compat/compat */
import { beforeEach, describe, expect, vi } from "vitest";

import { getStartTimeFromMark } from "./perceived-latency-instrumentation";

describe("getStartTimeFromMark", () => {
  const buttonSessionID = "button-session-id";
  const phase = "phase";

  beforeEach(() => {
    vi.restoreAllMocks();
    performance.clearMarks();
  });

  test("should throw error if window.perfomance doesn't exist", () => {
    vi.spyOn(window, "performance", "get").mockReturnValueOnce(null);

    const startTimeFn = () => getStartTimeFromMark(buttonSessionID, phase);
    expect(startTimeFn).toThrowError();
  });

  test("should return undefined if performance entry is not found", () => {
    const startTime = getStartTimeFromMark(buttonSessionID, phase);

    expect(startTime).toBeUndefined();
  });

  test("should get the start time from a performance mark", () => {
    const expectedStartTime = 1;
    const entryName = `${buttonSessionID}_${phase}`;

    window.performance.mark(entryName, { startTime: expectedStartTime });

    const startTime = getStartTimeFromMark({ buttonSessionID, phase });

    expect(startTime).toBe(expectedStartTime);
  });
});

/* eslint-enable compat/compat */
