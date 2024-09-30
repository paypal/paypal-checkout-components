/* @flow */
/* eslint-disable compat/compat */

import { describe, expect } from "vitest";

import { getPerformanceProp } from "./util";

describe("getPerformanceProp", () => {
  const buttonSessionID = "button-session-id";

  beforeEach(() => {
    performance.clearMarks();
  });

  test("should create object containing performance data", () => {
    const startTime = 1;
    const performanceEntryName = `${buttonSessionID}_buttons-first-render`;

    performance.mark(performanceEntryName, { startTime });

    const perfomanceProp = getPerformanceProp(buttonSessionID);

    expect(perfomanceProp).toEqual({
      firstRenderStartTime: startTime,
    });
  });

  test("firstRenderStartTime should be undefined if the performance entry name is not found", () => {
    const performanceProp = getPerformanceProp(buttonSessionID);
    expect(performanceProp).toEqual({});
  });
});

/* eslint-enable compat/compat */
