/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise, parseQuery } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import { mockSetupButton, mockAsyncProp, createButtonHTML, DEFAULT_FUNDING_ELIGIBILITY, clickButton, generateOrderID } from './mocks';

describe('popup bridge cases', () => {

    it('should render a button with createOrder, click the button, and render checkout using popup bridge', async () => {
        return await wrapPromise(async ({ expect }) => {

            const nativeUrl = 'native://foobar';
            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            window.xprops.commit = true;

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            window.xprops.getPopupBridge = mockAsyncProp(expect('getPopupBridge', async () => {
                return {
                    nativeUrl,
                    start: expect('start', async (url) => {
                        const query = parseQuery(url.split('?')[1]);

                        if (query.token !== orderID) {
                            throw new Error(`Expected token to be ${ orderID }, got ${ query.token }`);
                        }

                        if (query.useraction !== 'commit') {
                            throw new Error(`Expected useraction to be commit, got ${ query.useraction }`);
                        }

                        if (query.fundingSource !== FUNDING.PAYPAL) {
                            throw new Error(`Expected fundingSource to be ${ FUNDING.PAYPAL }, got ${ query.fundingSource }`);
                        }

                        if (!query.redirect_uri) {
                            throw new Error(`Expected redirect_uri to be present in url`);
                        }

                        if (query.native_xo !== '1') {
                            throw new Error(`Expected native_xo to be 1, got ${ query.native_xo }`);
                        }

                        return {
                            opType:  'payment',
                            token:   orderID,
                            PayerID: payerID
                        };
                    })
                };
            }));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button with createOrder, click the button, and cancel using popup bridge', async () => {
        return await wrapPromise(async ({ expect }) => {

            const nativeUrl = 'native://foobar';
            const orderID = generateOrderID();
            window.xprops.commit = true;

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onCancel = mockAsyncProp(expect('onCancel', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            window.xprops.getPopupBridge = mockAsyncProp(expect('getPopupBridge', async () => {
                return {
                    nativeUrl,
                    start: expect('start', async (url) => {
                        const query = parseQuery(url.split('?')[1]);

                        if (query.token !== orderID) {
                            throw new Error(`Expected token to be ${ orderID }, got ${ query.token }`);
                        }

                        if (query.useraction !== 'commit') {
                            throw new Error(`Expected useraction to be commit, got ${ query.useraction }`);
                        }

                        if (query.fundingSource !== FUNDING.PAYPAL) {
                            throw new Error(`Expected fundingSource to be ${ FUNDING.PAYPAL }, got ${ query.fundingSource }`);
                        }

                        if (!query.redirect_uri) {
                            throw new Error(`Expected redirect_uri to be present in url`);
                        }

                        if (query.native_xo !== '1') {
                            throw new Error(`Expected native_xo to be 1, got ${ query.native_xo }`);
                        }

                        return {
                            opType:  'cancel',
                            token:   orderID
                        };
                    })
                };
            }));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button with createOrder, click the button, and render checkout using popup bridge returning paymentID', async () => {
        return await wrapPromise(async ({ expect }) => {

            const nativeUrl = 'native://foobar';
            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const paymentID = 'ZZZZZZZZZZ';
            window.xprops.commit = true;

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }

                if (data.paymentID !== paymentID) {
                    throw new Error(`Expected paymentID to be ${ paymentID }, got ${ data.paymentID }`);
                }
            }));

            window.xprops.getPopupBridge = mockAsyncProp(expect('getPopupBridge', async () => {
                return {
                    nativeUrl,
                    start: expect('start', async (url) => {
                        const query = parseQuery(url.split('?')[1]);

                        if (query.token !== orderID) {
                            throw new Error(`Expected token to be ${ orderID }, got ${ query.token }`);
                        }

                        if (query.useraction !== 'commit') {
                            throw new Error(`Expected useraction to be commit, got ${ query.useraction }`);
                        }

                        if (query.fundingSource !== FUNDING.PAYPAL) {
                            throw new Error(`Expected fundingSource to be ${ FUNDING.PAYPAL }, got ${ query.fundingSource }`);
                        }

                        if (!query.redirect_uri) {
                            throw new Error(`Expected redirect_uri to be present in url`);
                        }

                        if (query.native_xo !== '1') {
                            throw new Error(`Expected native_xo to be 1, got ${ query.native_xo }`);
                        }
                        
                        return {
                            opType:    'payment',
                            token:     orderID,
                            PayerID:   payerID,
                            paymentId: paymentID
                        };
                    })
                };
            }));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button with createOrder, click the button, and render checkout using popup bridge returning billingToken', async () => {
        return await wrapPromise(async ({ expect }) => {

            const nativeUrl = 'native://foobar';
            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const billingToken = 'BA-QQQQQQQQQQQ';
            window.xprops.commit = true;

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }

                if (data.billingToken !== billingToken) {
                    throw new Error(`Expected paymentID to be ${ billingToken }, got ${ data.billingToken }`);
                }
            }));

            window.xprops.getPopupBridge = mockAsyncProp(expect('getPopupBridge', async () => {
                return {
                    nativeUrl,
                    start: expect('start', async (url) => {
                        const query = parseQuery(url.split('?')[1]);

                        if (query.token !== orderID) {
                            throw new Error(`Expected token to be ${ orderID }, got ${ query.token }`);
                        }

                        if (query.useraction !== 'commit') {
                            throw new Error(`Expected useraction to be commit, got ${ query.useraction }`);
                        }

                        if (query.fundingSource !== FUNDING.PAYPAL) {
                            throw new Error(`Expected fundingSource to be ${ FUNDING.PAYPAL }, got ${ query.fundingSource }`);
                        }

                        if (!query.redirect_uri) {
                            throw new Error(`Expected redirect_uri to be present in url`);
                        }

                        if (query.native_xo !== '1') {
                            throw new Error(`Expected native_xo to be 1, got ${ query.native_xo }`);
                        }

                        return {
                            opType:    'payment',
                            token:     orderID,
                            PayerID:   payerID,
                            ba_token:  billingToken
                        };
                    })
                };
            }));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });
});
