/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { INTENT } from '@paypal/sdk-constants';

import { CARD_FIELD_TYPE } from '../../src/card/constants';

import {
    generateOrderID,
    mockAsyncProp,
    mockFunction,
    createCardFieldsContainerHTML,
    mockSetupCardFields,
    getGraphQLApiMock,
    setCardFieldsValues
} from './mocks';


describe('card fields cases', () => {

    it('should render a single card fields with createOrder', async () => {

        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();

            window.xprops.type = CARD_FIELD_TYPE.SINGLE;
            window.xprops.intent = INTENT.CAPTURE;
            window.xprops.style = {
                'height':          '60px',
                'padding':         '10px',
                'fontSize':        '18px',
                'fontFamily':      '"Open Sans", sans-serif',
                'transition':      'all 0.5s ease-out',
                'input.invalid': {
                    color: 'red'
                }
            };
            window.xprops.placeholder = {
                number: 'Card number',
                expiry: 'MM/YY',
                cvv:    'CVV'
            };

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            mockFunction(window.paypal, 'CardFields', expect('CardFields', ({ original: CardFieldOriginal, args: [ props ] }) => {

                const cardFieldInstance = CardFieldOriginal(props);

                mockFunction(cardFieldInstance, 'render', expect('render', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {

                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return cardFieldInstance;
            }));

            const container = createCardFieldsContainerHTML();

            await mockSetupCardFields();

            const card = window.paypal.CardFields(window.xprops);
            card.render(container);

        });

    });

    it('should render a single card fields with createOrder and call onApprove callback', async () => {

        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'AAABBBCCC';

            window.xprops.type = CARD_FIELD_TYPE.SINGLE;
            window.xprops.intent = INTENT.CAPTURE;

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

            mockFunction(window.paypal, 'CardFields', expect('CardFields', ({ original: CardFieldOriginal, args: [ props ] }) => {

                const cardFieldInstance = CardFieldOriginal(props);

                mockFunction(cardFieldInstance, 'render', expect('render', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {

                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                setCardFieldsValues({ number: '5555555555554444', expiry: '0122', cvv: '123' });

                return cardFieldInstance;
            }));

            const container = createCardFieldsContainerHTML();

            await mockSetupCardFields();
          
            const card = window.paypal.CardFields(window.xprops);
            card.render(container);

        });

    });

    it('should render a single card fields and call ProcessPayment mutation with valid card inputs on submit event', async () => {

        return await wrapPromise(async ({ expect, wait }) => {

            const orderID = generateOrderID();
            const payerID = 'AAABBBCCC';

            window.xprops.type = CARD_FIELD_TYPE.SINGLE;
            window.xprops.intent = INTENT.CAPTURE;
            window.xprops.style = {
                'height':          '60px',
                'padding':         '10px',
                'fontSize':        '18px',
                'fontFamily':      '"Open Sans", sans-serif',
                'transition':      'all 0.5s ease-out',
                'input.invalid': {
                    color: 'red'
                }
            };
            window.xprops.placeholder = {
                number: 'Card number',
                expiry: 'MM/YY',
                cvv:    'CVV'
            };


            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ data }) => {
                    if (!data.variables.orderID) {
                        throw new Error(`Expected orderID to be passed`);
                    }

                    if (data.query.includes('mutation ProcessPayment')) {

                        if (!data.variables.card) {
                            throw new Error('Expected card data to be passed');
                        }

                        if (data.variables.card.cardNumber !== '5555555555554444') {
                            throw new Error(`Expected card number to be 5555555555554444 but got ${ data.variables.card.cardNumber }`);
                        }

                        if (data.variables.card.expirationDate !== '01/2022') {
                            throw new Error(`Expected expiry to be 01/2022 but got ${ data.variables.card.expirationDate }`);
                        }

                        if (data.variables.card.cvv !== '123') {
                            throw new Error(`Expected CVV to be 123 but got ${ data.variables.card.cvv }`);
                        }

                        return {
                            data: {
                                processPayment: 'APPROVED'
                            }
                        };
                    }
                }
            }).listen();

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

            mockFunction(window.paypal, 'CardFields', expect('CardFields', ({ original: CardFieldOriginal, args: [ props ] }) => {

                const cardFieldInstance = CardFieldOriginal(props);

                mockFunction(cardFieldInstance, 'render', expect('render', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {

                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                setCardFieldsValues({ number: '5555555555554444', expiry: '0122', cvv: '123' });

                setTimeout(() => {
                    cardFieldInstance.submit();
                }, 10);

                return cardFieldInstance;
            }));

            const container = createCardFieldsContainerHTML();

            await mockSetupCardFields();
          
            const card = window.paypal.CardFields(window.xprops);
            card.render(container);
            await wait();
            gqlMock.done();

        });

    });

    it('should render a single card fields and not call ProcessPayment mutation with invalid card inputs on submit', async () => {

        return await wrapPromise(async ({ expect, wait }) => {

            const orderID = generateOrderID();
            const payerID = 'AAABBBCCC';

            window.xprops.type = CARD_FIELD_TYPE.SINGLE;
            window.xprops.intent = INTENT.CAPTURE;
            window.xprops.style = {
                'height':          '60px',
                'padding':         '10px',
                'fontSize':        '18px',
                'fontFamily':      '"Open Sans", sans-serif',
                'transition':      'all 0.5s ease-out',
                'input.invalid': {
                    color: 'red'
                }
            };
            window.xprops.placeholder = {
                number: 'Card number',
                expiry: 'MM/YY',
                cvv:    'CVV'
            };


            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ data }) => {
                    if (!data.variables.orderID) {
                        throw new Error(`Expected orderID to be passed`);
                    }

                    if (data.query.includes('mutation ProcessPayment')) {
                        throw new Error('Expected to not call ProcessPayment if the card data is invalid');
                    }
                }
            }).listen();

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

            mockFunction(window.paypal, 'CardFields', expect('CardFields', ({ original: CardFieldOriginal, args: [ props ] }) => {

                const cardFieldInstance = CardFieldOriginal(props);

                mockFunction(cardFieldInstance, 'render', expect('render', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {

                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                setCardFieldsValues({ number: '123456', expiry: '012', cvv: '12' });

                setTimeout(() => {
                    cardFieldInstance.submit().catch(error => {
                        if (!error) {
                            throw new Error('Expected on submit error if the card data is invalid');
                        }
                    });
                }, 10);

                return cardFieldInstance;
            }));

            const container = createCardFieldsContainerHTML();

            await mockSetupCardFields();
          
            const card = window.paypal.CardFields(window.xprops);
            card.render(container);
            await wait();
            gqlMock.done();

        });

    });


});
