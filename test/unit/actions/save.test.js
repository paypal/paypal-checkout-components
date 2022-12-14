/* @flow */
import { describe, it, expect, expectTypeOf } from "vitest";
import { createSaveAction } from "../../../src/actions/save"

describe('Save', () => {
  describe('input validation', () => {
    it("throws if the createVaultSetupToken function is missing", () => {
      // $FlowFixMe - Ignoring so we can use the run-time validations in createSaveAction.
      expect(() => createSaveAction({
        onApprove: () => {}
      })).toThrowError("Save action is missing the required")
    })

    it("throws if the onApprove function is missing", () => {
      // $FlowFixMe - Ignoring so we can use the run-time validations in createSaveAction.
      expect(() => createSaveAction({
        createVaultSetupToken: async () => {},
      })).toThrowError("Save action is missing the required")
    })

  })
})