/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import { setupButton } from '../../src';

import { mockAsyncProp, createButtonHTML, getGetOrderApiMock, getCaptureOrderApiMock, DEFAULT_FUNDING_ELIGIBILITY, mockFunction, clickButton } from './mocks';

describe('auth cases', () => {

    it('should render a button, call onAuth, and pass the access token to order get', async () => {
        return await wrapPromise(async ({ expect }) => {
            const accessToken = 'abc123xxxyyyzzz';

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data, actions) => {
                const getOrderMock = getGetOrderApiMock({
                    handler: expect('getOrder', ({ headers }) => {
                        if (headers['x-paypal-internal-euat'] !== accessToken) {
                            throw new Error(`Expected access token header to be ${ accessToken }, got ${ headers['x-paypal-internal-euat'] }`);
                        }

                        return {
                            ack:  'success',
                            data: {}
                        };
                    })
                });
                getOrderMock.expectCalls();
                await actions.order.get();
                getOrderMock.done();

                const captureOrderApiMock = getCaptureOrderApiMock({
                    handler: expect('captureOrder', ({ headers }) => {
                        if (headers['x-paypal-internal-euat'] !== accessToken) {
                            throw new Error(`Expected access token header to be ${ accessToken }, got ${ headers['x-paypal-internal-euat'] }`);
                        }

                        return {
                            ack:  'success',
                            data: {}
                        };
                    })
                });
                captureOrderApiMock.expectCalls();
                await actions.order.capture();
                captureOrderApiMock.done();
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                props.onAuth({ accessToken });
                return CheckoutOriginal(props);
            }));

            createButtonHTML();

            await setupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });
});
