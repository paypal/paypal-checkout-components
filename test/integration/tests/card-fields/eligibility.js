/* @flow */

import { FUNDING } from "@paypal/sdk-constants/src";

import {
  createTestContainer,
  destroyTestContainer,
  mockProp,
  assert,
} from "../common";

describe.only(`paypal card fields component`, () => {
  beforeEach(() => {
    createTestContainer();
  });

  afterEach(() => {
    destroyTestContainer();
  });

  it(`should not be eligible or render when branded is true`, (done) => {
    const fundingSource = FUNDING.CARD;
    mockProp(window.__TEST_FUNDING_ELIGIBILITY__, fundingSource, {
      eligible: true,
      branded: true,
    });

    const cardButton = window.paypal.Buttons({
      fundingSource,
    });

    const cardFields = window.paypal.CardFields({});

    assert.equal(cardFields.isEligible(), false);
    done();
  });

  it(`should be eligible when branded is false`, (done) => {
    const fundingSource = FUNDING.CARD;
    mockProp(window.__TEST_FUNDING_ELIGIBILITY__, fundingSource, {
      eligible: true,
      branded: false,
    });
    window.__COMPONENTS__ = ["buttons", "card-fields"];

    const cardButton = window.paypal.Buttons({
      fundingSource,
    });

    const cardFields = window.paypal.CardFields({});

    assert.equal(cardFields.isEligible(), true);
    done();
  });
});
