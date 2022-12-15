/* @flow */

import { ZalgoPromise } from "@krakenjs/zalgo-promise/dist/zalgo-promise";
import { describe, it, expect, vi } from "vitest";

import { createSaveAction } from "../../../src/actions/save"
import type { onErrorCallback } from "../../../src/actions/save"

describe('Save', () => {
  const mockCreateVaultSetupToken = () => ZalgoPromise.try(() => "some-fake-token")
  /* eslint-disable-next-line no-empty-function */ // - Ignoring empty fn error because this is merchant defined in practice, and the tests don't need it now
  const mockOnApprove = () => {}

  it('returns the appropriate object structure', () => {
    const result = createSaveAction({
      createVaultSetupToken: mockCreateVaultSetupToken,
      onApprove: mockOnApprove
    })
    expect(result.type).toEqual("save")
    expect(result.save).toBeTypeOf("function")
  })

  describe('input validation', () => {
    it("throws if the createVaultSetupToken function is missing", () => {
      // $FlowFixMe - Ignoring so we can use the run-time validations in createSaveAction.
      expect(() => createSaveAction({
        onApprove: mockOnApprove
      })).toThrowError("Save action is missing the required")

      // $FlowFixMe - Ignoring so we can use the run-time validations in createSaveAction.
      expect(() => createSaveAction({
        // $FlowFixMe
        createVaultSetupToken: "i am not a function",
      })).toThrowError("Save action is missing the required")
    })

    it("throws if the onApprove function is configured incorrectly", () => {
      // $FlowFixMe - Ignoring so we can use the run-time validations in createSaveAction.
      expect(() => createSaveAction({
        createVaultSetupToken: mockCreateVaultSetupToken
      })).toThrowError("Save action is missing the required")

      // $FlowFixMe - Ignoring so we can use the run-time validations in createSaveAction.
      expect(() => createSaveAction({
        // $FlowFixMe
        onApprove: "i am not a function",
      })).toThrowError("Save action is missing the required")
    })
  })

  describe('Save#save function', () => {
    const fakeEmptySetupToken = "some-empty-setup-token"
    const actionInputs = {
      createVaultSetupToken: vi.fn(async () => {
        return fakeEmptySetupToken
      }),
      onApprove: () => {}
    }

    it("uses merchant config callback to get token", () => {
      const saveAction = createSaveAction(actionInputs)
      const mockOnError: onErrorCallback = () => {}
      const mockCardDetails = {
        number: "41111111111",
        expiry: "05/25"
      }

      saveAction.save(mockOnError, mockCardDetails)

      expect(actionInputs.createVaultSetupToken).toHaveBeenCalled()
    })
  })
})