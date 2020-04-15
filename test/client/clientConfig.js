/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise } from 'belter/src';
import { FUNDING, CARD } from '@paypal/sdk-constants/src';

import { mockSetupButton, mockAsyncProp, createButtonHTML, clickButton, getGraphQLApiMock, DEFAULT_FUNDING_ELIGIBILITY } from './mocks';

describe('client config cases', () => {

    it('should pass the correct basic values for incontext checkout', async () => {
        return await wrapPromise(async ({ expect }) => {
            let clientConfigCalled = false;

            const gqlMock = getGraphQLApiMock({
                handler: expect('clientConfigCall', ({ data }) => {
                    if (!data.query.includes('mutation UpdateClientConfig')) {
                        return {};
                    }

                    if (!data.variables.orderID) {
                        throw new Error(`Expected orderID to be passed`);
                    }

                    if (data.variables.integrationArtifact !== 'PAYPAL_JS_SDK') {
                        throw new Error(`Expected integrationArtifact to be PAYPAL_JS_SDK, got ${ data.variables.integrationArtifact }`);
                    }

                    if (data.variables.productFlow !== 'SMART_PAYMENT_BUTTONS') {
                        throw new Error(`Expected productFlow to be SMART_PAYMENT_BUTTONS, got ${ data.variables.productFlow }`);
                    }

                    if (data.variables.userExperienceFlow !== 'INCONTEXT') {
                        throw new Error(`Expected userExperienceFlow to be INCONTEXT, got ${ data.variables.userExperienceFlow }`);
                    }

                    clientConfigCalled = true;
                    return {};
                })
            }).expectCalls();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async () => {
                gqlMock.done();

                if (!clientConfigCalled) {
                    throw new Error(`Expected clientConfig mutation to be called`);
                }
            }));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should pass the correct basic values for inline card fields', async () => {
        return await wrapPromise(async ({ expect }) => {
            window.xprops.enableStandardCardFields = true;

            let clientConfigCalled = false;

            const gqlMock = getGraphQLApiMock({
                handler: expect('clientConfigCall', ({ data }) => {
                    if (!data.query.includes('mutation UpdateClientConfig')) {
                        return {};
                    }

                    if (!data.variables.orderID) {
                        throw new Error(`Expected orderID to be passed`);
                    }

                    if (data.variables.integrationArtifact !== 'PAYPAL_JS_SDK') {
                        throw new Error(`Expected integrationArtifact to be PAYPAL_JS_SDK, got ${ data.variables.integrationArtifact }`);
                    }

                    if (data.variables.productFlow !== 'SMART_PAYMENT_BUTTONS') {
                        throw new Error(`Expected productFlow to be SMART_PAYMENT_BUTTONS, got ${ data.variables.productFlow }`);
                    }

                    if (data.variables.userExperienceFlow !== 'INLINE') {
                        throw new Error(`Expected userExperienceFlow to be INLINE, got ${ data.variables.userExperienceFlow }`);
                    }

                    clientConfigCalled = true;
                    return {};
                })
            }).expectCalls();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async () => {
                gqlMock.done();

                if (!clientConfigCalled) {
                    throw new Error(`Expected clientConfig mutation to be called`);
                }
            }));

            const fundingEligibility = {
                [ FUNDING.CARD ]: {
                    eligible: true,
                    vendors:  {
                        [ CARD.VISA ]: {
                            eligible: true
                        }
                    }
                }
            };

            createButtonHTML({ fundingEligibility });

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(FUNDING.CARD);
        });
    });

    it('should pass paypal when button clicked', async () => {
        return await wrapPromise(async ({ expect }) => {

            const fundingSource = FUNDING.PAYPAL;

            let clientConfigCalled = false;

            const gqlMock = getGraphQLApiMock({
                handler: expect('clientConfigCall', ({ data }) => {
                    if (!data.query.includes('mutation UpdateClientConfig')) {
                        return {};
                    }

                    if (data.variables.fundingSource !== fundingSource) {
                        throw new Error(`Expected fundingSource to be ${ fundingSource }, got ${ data.variables.fundingSource }`);
                    }

                    clientConfigCalled = true;
                    return {};
                })
            }).expectCalls();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async () => {
                gqlMock.done();

                if (!clientConfigCalled) {
                    throw new Error(`Expected clientConfig mutation to be called`);
                }
            }));

            const fundingEligibility = {
                [fundingSource]: {
                    eligible: true
                }
            };

            createButtonHTML({ fundingEligibility });

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(fundingSource);
        });
    });

    it('should pass venmo when button clicked', async () => {
        return await wrapPromise(async ({ expect }) => {

            const fundingSource = FUNDING.VENMO;
            let clientConfigCalled = false;

            const gqlMock = getGraphQLApiMock({
                handler: expect('clientConfigCall', ({ data }) => {
                    if (!data.query.includes('mutation UpdateClientConfig')) {
                        return {};
                    }

                    if (data.variables.fundingSource !== fundingSource) {
                        throw new Error(`Expected fundingSource to be ${ fundingSource }, got ${ data.variables.fundingSource }`);
                    }

                    clientConfigCalled = true;
                    return {};
                })
            }).expectCalls();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async () => {
                gqlMock.done();

                if (!clientConfigCalled) {
                    throw new Error(`Expected clientConfig mutation to be called`);
                }
            }));

            const fundingEligibility = {
                [ fundingSource ]: {
                    eligible: true
                }
            };

            createButtonHTML({ fundingEligibility });

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(fundingSource);
        });
    });

    it('should pass credit when button clicked', async () => {
        return await wrapPromise(async ({ expect }) => {

            const fundingSource = FUNDING.CREDIT;
            let clientConfigCalled = false;

            const gqlMock = getGraphQLApiMock({
                handler: expect('clientConfigCall', ({ data }) => {
                    if (!data.query.includes('mutation UpdateClientConfig')) {
                        return {};
                    }

                    if (data.variables.fundingSource !== fundingSource) {
                        throw new Error(`Expected fundingSource to be ${ fundingSource }, got ${ data.variables.fundingSource }`);
                    }

                    clientConfigCalled = true;
                    return {};
                })
            }).expectCalls();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async () => {
                gqlMock.done();

                if (!clientConfigCalled) {
                    throw new Error(`Expected clientConfig mutation to be called`);
                }
            }));

            const fundingEligibility = {
                [fundingSource]: {
                    eligible: true
                }
            };

            createButtonHTML({ fundingEligibility });

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(fundingSource);
        });
    });
});
