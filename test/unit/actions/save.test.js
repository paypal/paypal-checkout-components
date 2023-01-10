/* @flow */

import { ZalgoPromise } from "@krakenjs/zalgo-promise/dist/zalgo-promise";
import { describe, it, expect, vi } from "vitest";
import * as belter from '@krakenjs/belter/src'; // eslint-disable-line import/no-namespace

import { createSaveAction } from "../../../src/actions/save"

const mockPayPalDomain = 'unit-test.paypal.com'

vi.mock('@paypal/sdk-client/src', () => ({
  getLogger: vi.fn(() => console),
  getPayPalDomain: vi.fn(() => mockPayPalDomain),
}));

describe('Save', () => {
  const mockCreateVaultSetupToken = () => ZalgoPromise.try(() => "some-fake-token")
  /* eslint-disable-next-line no-empty-function */ // - Ignoring empty fn error because this is merchant defined in practice, and the tests don't need it now
  const mockOnApprove = () => {}

  it('returns the appropriate object structure', () => {
    const result = createSaveAction({
      createVaultSetupToken: mockCreateVaultSetupToken,
      onApprove: mockOnApprove
    })
    expect(result.type).toEqual("SAVE")
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
      createVaultSetupToken: vi.fn(() => {
        return ZalgoPromise.resolve(fakeEmptySetupToken)
      }),
      onApprove: vi.fn()
    }
    const mockCardDetails = {
      number: "41111111111",
      expiry: "05/25"
    }
    const mockAccessToken = 'test-access-token'

    it("uses merchant config callback to get token", () => {
      const saveAction = createSaveAction(actionInputs)
      const mockOnError = vi.fn()

      saveAction.save(mockOnError, mockCardDetails, mockAccessToken)

      expect(actionInputs.createVaultSetupToken).toHaveBeenCalled()
    })

    it("uses the response from merchant config callback to update the setup token", async () => {
      const vaultSetupToken = 'test-setup-token'

      const saveAction = createSaveAction({
        createVaultSetupToken: () => ZalgoPromise.resolve({ vaultSetupToken }),
        onApprove: vi.fn()
      })
      const mockOnError = vi.fn()
      const spy = vi.spyOn(belter, 'request')

      await saveAction.save(mockOnError, mockCardDetails, mockAccessToken)
      expect.assertions(2)

      expect(spy).toHaveBeenCalled()
      // get our arguments
      const [ [ args ] ] = spy.calls
      expect(args).toEqual({
        method: 'post',
        url: `${mockPayPalDomain}/v3/vault/setup-tokens/${vaultSetupToken}/update`,
        headers: {
          // Figure out where we can get authToken
          'Authorization': `Basic ${mockAccessToken}`,
          'Content-Type': 'application/json',
        },
        data: {
          'payment_source': {
            'card': {
              ...mockCardDetails
            }
          }
        }
      })
    })

    it('uses onError arg if the request fails', (done) => {
      expect.assertions(1)
      const mockError = "Some error"
      // $FlowFixMe
      actionInputs.createVaultSetupToken.mockRejectedValue(mockError)
      const saveAction = createSaveAction(actionInputs)
      const mockOnError = vi.fn()
      
      saveAction.save(mockOnError, mockCardDetails, mockAccessToken).then(() => {
        expect(mockOnError).toBeCalledWith("Unable to retrieve setup token from 'createVaultSetupToken'")
        done()
      })
    })
    
    it('errors if payment details are not provided', () => {
      expect.assertions(1)
      const mockOnError = vi.fn()
      const saveAction = createSaveAction(actionInputs)

      // $FlowFixMe - Explicitly testing this case
      return saveAction.save(mockOnError).catch((error) => {
        // $FlowFixMe
        expect(error.message).toContain("Missing args to #save")
      })
    })
    
    it('errors if onError callback is not provided', () => {
      expect.assertions(1)
      const saveAction = createSaveAction(actionInputs)
      
      // $FlowFixMe - Explicitly testing this case
      return saveAction.save(undefined, mockCardDetails).catch(error => {
        // $FlowFixMe
        expect(error.message).toContain("Missing args to #save")
      })
    })
  })
})
