/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { uniqueID, wrapPromise } from '@krakenjs/belter/src';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { FUNDING, CARD } from '@paypal/sdk-constants/src';

import {
    mockSetupButton,
    generateOrderID,
    mockAsyncProp,
    createButtonHTML,
    mockFunction,
    clickButton,
    getRestfulCaptureOrderApiMock,
    getRestfulGetOrderApiMock,
    getGraphQLApiMock
} from './mocks';

describe('Inline XO cases', () => {
    
    const fundingEligibility = {
        [ FUNDING.PAYPAL ]: {
            eligible: true
        },
        [ FUNDING.CARD]: {
            eligible: true,
            vendors:  {
                [ CARD.VISA ]: {
                    eligible: true
                },
                [ CARD.AMEX ]: {
                    eligible: true
                },
                [ CARD.MASTERCARD ]: {
                    eligible: true
                }
            }
        }
    };

    it('should call onComplete if experience is inline', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();

            window.xprops.experience = 'inline';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onApprove = avoid('onApprove');
            window.xprops.onError = avoid('onError');

            window.xprops.onComplete = expect('onComplete', mockAsyncProp((data, actions) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (!actions.redirect) {
                    throw new Error(`Expected actions.redirect() to be available.`);
                }
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onComplete', expect('onComplete', ({ original: onCompleteOriginal, args: [ data, actions ] }) => {
                    return onCompleteOriginal({ ...data }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    const [ win, element, context ] = args;

                    if (!win) {
                        throw new Error(`Expected window to be passed to renderTo`);
                    }

                    if (!element || typeof element !== 'string') {
                        throw new Error(`Expected string element to be passed to renderTo`);
                    }

                    if (context !== 'iframe') {
                        throw new Error(`Expected context to be iframe, got ${ context }`);
                    }

                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML({ fundingEligibility });
            await mockSetupButton({ experience: 'inline', merchantID: [ 'XYZ12345' ], fundingEligibility });
            await clickButton(FUNDING.CARD);
        });
    });

    it('should call onComplete if experience is inline and capture if intent is authorize', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();
            const facilitatorAccessToken = uniqueID();

            window.xprops.experience = 'inline';
            window.xprops.intent = 'authorize';

            const getOrderDetailsMock = getGraphQLApiMock({
                extraHandler: expect('orderDetailsCall', ({ data }) => {

                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  'authorize',
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:       {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }
                })
            }).expectCalls();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onApprove = avoid('onApprove');
            window.xprops.onError = avoid('onError');

            window.xprops.onComplete = expect('onComplete', async (data, actions) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (!actions.redirect) {
                    throw new Error(`Expected actions.redirect() to be available.`);
                }

                const captureOrderMock = getRestfulCaptureOrderApiMock({
                    handler: expect('captureOrder', ({ headers }) => {
                        if (headers.authorization !== `Bearer ${ facilitatorAccessToken }`) {
                            throw new Error(`Expected call to come with correct facilitator access token`);
                        }

                        return {
                            id: orderID
                        };
                    })
                });
                captureOrderMock.expectCalls();
                if (data.intent === 'authorize') {
                    await actions.capture();
                }
                captureOrderMock.done();
            });

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onComplete', expect('onComplete', ({ original: onCompleteOriginal, args: [ data, actions ] }) => {
                    return onCompleteOriginal({ ...data }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    const [ win, element, context ] = args;

                    if (!win) {
                        throw new Error(`Expected window to be passed to renderTo`);
                    }

                    if (!element || typeof element !== 'string') {
                        throw new Error(`Expected string element to be passed to renderTo`);
                    }

                    if (context !== 'iframe') {
                        throw new Error(`Expected context to be iframe, got ${ context }`);
                    }

                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML({ fundingEligibility });
            await mockSetupButton({
                experience: 'inline',
                merchantID: [ 'XYZ12345' ],
                fundingEligibility,
                facilitatorAccessToken
            });
            await clickButton(FUNDING.CARD);

            getOrderDetailsMock.done();
        });
    });

    it('should call onComplete if experience is inline and capture if intent is authorize and catch isProcessorDeclineError from capture', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();
            const facilitatorAccessToken = uniqueID();

            window.xprops.experience = 'inline';
            window.xprops.intent = 'authorize';

            const getOrderDetailsMock = getGraphQLApiMock({
                extraHandler: expect('orderDetailsCall', ({ data }) => {

                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  'authorize',
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:       {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }
                })
            }).expectCalls();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onApprove = avoid('onApprove');
            window.xprops.onError = avoid('onError');

            let onComplete = expect('onComplete', async (data, actions) => {

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                const captureOrderRESTMock = getRestfulCaptureOrderApiMock({
                    status: 400,
                    data:   {
                        ack:         'contingency',
                        contingency: 'UNPROCESSABLE_ENTITY',
                        data:        {
                            details: [
                                {
                                    issue: 'INSTRUMENT_DECLINED'
                                }
                            ]
                        }
                    }
                });
                captureOrderRESTMock.expectCalls();
                actions.capture();
                captureOrderRESTMock.done();

                onComplete = expect('onComplete2');
            });

            window.xprops.onComplete = mockAsyncProp(expect('onComplete', (data, actions) => onComplete(data, actions)));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                mockFunction(props, 'onComplete', expect('onComplete', ({ original: onCompleteOriginal, args: [ data, actions ] }) => {
                    return onCompleteOriginal({ ...data }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    const [ win, element, context ] = args;

                    if (!win) {
                        throw new Error(`Expected window to be passed to renderTo`);
                    }

                    if (!element || typeof element !== 'string') {
                        throw new Error(`Expected string element to be passed to renderTo`);
                    }

                    if (context !== 'iframe') {
                        throw new Error(`Expected context to be iframe, got ${ context }`);
                    }

                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML({ fundingEligibility });
            await mockSetupButton({
                experience: 'inline',
                merchantID: [ 'XYZ12345' ],
                fundingEligibility,
                facilitatorAccessToken
            });
            await clickButton(FUNDING.CARD);

            getOrderDetailsMock.done();
        });
    });

    it('should call onComplete if experience is inline and capture if intent is authorize and catch isUnprocessableEntityError from capture', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();
            const facilitatorAccessToken = uniqueID();

            window.xprops.experience = 'inline';
            window.xprops.intent = 'authorize';

            const getOrderDetailsMock = getGraphQLApiMock({
                extraHandler: expect('orderDetailsCall', ({ data }) => {

                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  'authorize',
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:       {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }
                })
            }).expectCalls();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onApprove = avoid('onApprove');
            window.xprops.onError = avoid('onError');

            let onComplete = expect('onComplete', async (data, actions) => {

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                const captureOrderRESTMock = getRestfulCaptureOrderApiMock({
                    status: 400,
                    data:   {
                        ack:         'contingency',
                        contingency: 'UNPROCESSABLE_ENTITY',
                        data:        {
                            details: [
                                {
                                    issue: 'DUPLICATE_INVOICE_ID'
                                }
                            ]
                        }
                    }
                });
                captureOrderRESTMock.expectCalls();
                actions.capture();
                captureOrderRESTMock.done();

                onComplete = avoid('onComplete2');
            });

            window.xprops.onComplete = mockAsyncProp(expect('onComplete', (data, actions) => onComplete(data, actions)));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onComplete', expect('onComplete', ({ original: onCompleteOriginal, args: [ data, actions ] }) => {
                    return onCompleteOriginal({ ...data }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    const [ win, element, context ] = args;

                    if (!win) {
                        throw new Error(`Expected window to be passed to renderTo`);
                    }

                    if (!element || typeof element !== 'string') {
                        throw new Error(`Expected string element to be passed to renderTo`);
                    }

                    if (context !== 'iframe') {
                        throw new Error(`Expected context to be iframe, got ${ context }`);
                    }

                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML({ fundingEligibility });
            await mockSetupButton({
                experience: 'inline',
                merchantID: [ 'XYZ12345' ],
                fundingEligibility,
                facilitatorAccessToken
            });
            await clickButton(FUNDING.CARD);

            getOrderDetailsMock.done();
        });
    });

    it('should call onComplete if experience is inline and get order when captured', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();
            const facilitatorAccessToken = uniqueID();

            window.xprops.experience = 'inline';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onApprove = avoid('onApprove');
            window.xprops.onError = avoid('onError');

            window.xprops.onComplete = expect('onComplete', async (data, actions) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (!actions.redirect) {
                    throw new Error(`Expected actions.redirect() to be available.`);
                }

                const getOrderMock = getRestfulGetOrderApiMock({
                    handler: expect('getOrder', ({ headers }) => {
                        if (headers.authorization !== `Bearer ${ facilitatorAccessToken }`) {
                            throw new Error(`Expected call to come with correct facilitator access token`);
                        }

                        return {
                            id: orderID
                        };
                    })
                });
                getOrderMock.expectCalls();
                await actions.get();
                getOrderMock.done();
            });

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onComplete', expect('onComplete', ({ original: onCompleteOriginal, args: [ data, actions ] }) => {
                    return onCompleteOriginal({ ...data }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    const [ win, element, context ] = args;

                    if (!win) {
                        throw new Error(`Expected window to be passed to renderTo`);
                    }

                    if (!element || typeof element !== 'string') {
                        throw new Error(`Expected string element to be passed to renderTo`);
                    }

                    if (context !== 'iframe') {
                        throw new Error(`Expected context to be iframe, got ${ context }`);
                    }

                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML({ fundingEligibility });
            await mockSetupButton({
                experience: 'inline',
                merchantID: [ 'XYZ12345' ],
                fundingEligibility,
                facilitatorAccessToken
            });
            await clickButton(FUNDING.CARD);
        });
    });

    it('should not fail when calling onComplete if experience is inline and onComplete callback is not provided', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();

            window.xprops.experience = 'inline';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onApprove = avoid('onApprove');
            window.xprops.onError = avoid('onError');

            createButtonHTML({ fundingEligibility });
            await mockSetupButton({ experience: 'inline', merchantID: [ 'XYZ12345' ], fundingEligibility });
            await clickButton(FUNDING.CARD);
        });
    });

    it('should call onComplete if experience is inline and handle error in callback if thrown', async () => {
        return await wrapPromise(async ({ expect, expectError, avoid }) => {

            const orderID = generateOrderID();

            window.xprops.experience = 'inline';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onApprove = avoid('onApprove');

            const error = new Error('Oops! Error in merchant callback.');
            window.xprops.onError = expect('onError', (err) => {
                if (err !== error) {
                    throw new Error(`Expected errors to match`);
                }
            });

            window.xprops.onComplete = expectError('onComplete', mockAsyncProp((data, actions) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (!actions.redirect) {
                    throw new Error(`Expected actions.redirect() to be available.`);
                }

                throw error;
            }));

            createButtonHTML({ fundingEligibility });
            await mockSetupButton({ experience: 'inline', merchantID: [ 'XYZ12345' ], fundingEligibility });
            await clickButton(FUNDING.CARD);
        });
    });

    it('should call onComplete if experience is inline and handle error if redirect is missing url', async () => {
        return await wrapPromise(async ({ expect, expectError, avoid }) => {

            const orderID = generateOrderID();

            window.xprops.experience = 'inline';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onApprove = avoid('onApprove');
            window.xprops.onError = expect('onError', (err) => {
                if (err.message !== 'Expected redirect url') {
                    throw new Error(`Expected errors to match`);
                }
            });

            window.xprops.onComplete = expectError('onComplete', mockAsyncProp((data, actions) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (!actions.redirect) {
                    throw new Error(`Expected actions.redirect() to be available.`);
                }

                actions.redirect();
            }));

            createButtonHTML({ fundingEligibility });
            await mockSetupButton({ experience: 'inline', merchantID: [ 'XYZ12345' ], fundingEligibility });
            await clickButton(FUNDING.CARD);
        });
    });

    it('should call onComplete if experience is inline and handle error if redirect url is malformed', async () => {
        return await wrapPromise(async ({ expect, expectError, avoid }) => {

            const orderID = generateOrderID();
            const url = 'https:abcd';

            window.xprops.experience = 'inline';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onApprove = avoid('onApprove');
            window.xprops.onError = expect('onError', (err) => {
                if (err.message !== `Invalid redirect url: ${ url } - must be fully qualified url`) {
                    throw new Error(`Expected errors to match`);
                }
            });

            window.xprops.onComplete = expectError('onComplete', mockAsyncProp((data, actions) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (!actions.redirect) {
                    throw new Error(`Expected actions.redirect() to be available.`);
                }

                actions.redirect(url);
            }));

            createButtonHTML({ fundingEligibility });
            await mockSetupButton({ experience: 'inline', merchantID: [ 'XYZ12345' ], fundingEligibility });
            await clickButton(FUNDING.CARD);
        });
    });
});
