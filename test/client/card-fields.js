/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise } from '@krakenjs/belter/src';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { INTENT } from '@paypal/sdk-constants';

import { CARD_FIELD_TYPE } from '../../src/card/constants';

import {
    generateOrderID,
    mockAsyncProp,
    mockFunction,
    createCardFieldsContainerHTML,
    mockSetupCardFields,
    getGraphQLApiMock,
    setCardFieldsValues,
    renderCardFieldMock
} from './mocks';


describe('card fields cases', () => {

    describe('single card fields', () => {

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

                            if (data.variables.card.securityCode !== '123') {
                                throw new Error(`Expected CVV to be 123 but got ${ data.variables.card.securityCode }`);
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
                    }, 20);

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


    describe('multi card fields', () => {
        it('should render multi card fields with createOrder', async () => {

            return await wrapPromise(async ({ expect }) => {

                const orderID = generateOrderID();

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

                    mockFunction(cardFieldInstance, 'NumberField', expect('NumberField', ({ original: NumberFieldToOriginal, args: numberArgs }) => {

                        const numberFieldToOriginal = NumberFieldToOriginal(...numberArgs);

                        mockFunction(numberFieldToOriginal, 'render', expect('render', async ({ original: renderToOriginal, args }) => {
                            return props.createOrder().then(id => {

                                if (id !== orderID) {
                                    throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                                }

                                return renderToOriginal(...args);
                            });
                        }));

                        return numberFieldToOriginal;

                    }));

                    mockFunction(cardFieldInstance, 'ExpiryField', expect('ExpiryField', ({ original: ExpiryFieldToOriginal, args: expiryArgs }) => {

                        const expiryFieldToOriginal = ExpiryFieldToOriginal(...expiryArgs);

                        mockFunction(expiryFieldToOriginal, 'render', expect('render', async ({ original: renderToOriginal, args }) => {
                            return props.createOrder().then(id => {

                                if (id !== orderID) {
                                    throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                                }

                                return renderToOriginal(...args);
                            });
                        }));

                        return expiryFieldToOriginal;

                    }));

                    mockFunction(cardFieldInstance, 'CVVField', expect('CVVField', ({ original: CVVFieldToOriginal, args: cvvArgs }) => {

                        const cVVFieldToOriginal = CVVFieldToOriginal(...cvvArgs);

                        mockFunction(cVVFieldToOriginal, 'render', expect('render', async ({ original: renderToOriginal, args }) => {
                            return props.createOrder().then(id => {

                                if (id !== orderID) {
                                    throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                                }

                                return renderToOriginal(...args);
                            });
                        }));

                        return cVVFieldToOriginal;

                    }));

                    return cardFieldInstance;
                }));


                const numberContainer = createCardFieldsContainerHTML('number');
                const expiryContainer = createCardFieldsContainerHTML('expiry');
                const cvvContainer = createCardFieldsContainerHTML('cvv');

                const cardFields = window.paypal.CardFields(window.xprops);

                window.xprops.type = CARD_FIELD_TYPE.NUMBER;
                await mockSetupCardFields();
                cardFields.NumberField(window.xprops).render(numberContainer);

                window.xprops.type = CARD_FIELD_TYPE.EXPIRY;
                await mockSetupCardFields();
                cardFields.ExpiryField(window.xprops).render(expiryContainer);

                window.xprops.type = CARD_FIELD_TYPE.CVV;
                await mockSetupCardFields();
                cardFields.CVVField(window.xprops).render(cvvContainer);

            });

        });

        it('should render multi card fields with createOrder and call onApprove callback', async () => {

            return await wrapPromise(async ({ expect }) => {

                const orderID = generateOrderID();
                const payerID = 'AAABBBCCC';

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

                    mockFunction(cardFieldInstance, 'NumberField', expect('NumberField', ({ original: NumberFieldToOriginal, args: numberArgs }) => {

                        const numberFieldToOriginal = NumberFieldToOriginal(...numberArgs);

                        mockFunction(numberFieldToOriginal, 'render', expect('render', async ({ original: renderToOriginal, args }) => {
                            return props.createOrder().then(id => {

                                if (id !== orderID) {
                                    throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                                }

                                return renderToOriginal(...args);
                            });
                        }));

                        return numberFieldToOriginal;

                    }));

                    mockFunction(cardFieldInstance, 'ExpiryField', expect('ExpiryField', ({ original: ExpiryFieldToOriginal, args: expiryArgs }) => {

                        const expiryFieldToOriginal = ExpiryFieldToOriginal(...expiryArgs);

                        mockFunction(expiryFieldToOriginal, 'render', expect('render', async ({ original: renderToOriginal, args }) => {
                            return props.createOrder().then(id => {

                                if (id !== orderID) {
                                    throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                                }

                                return renderToOriginal(...args);
                            });
                        }));

                        return expiryFieldToOriginal;

                    }));

                    mockFunction(cardFieldInstance, 'CVVField', expect('CVVField', ({ original: CVVFieldToOriginal, args: cvvArgs }) => {

                        const cVVFieldToOriginal = CVVFieldToOriginal(...cvvArgs);

                        mockFunction(cVVFieldToOriginal, 'render', expect('render', async ({ original: renderToOriginal, args }) => {
                            return props.createOrder().then(id => {

                                if (id !== orderID) {
                                    throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                                }

                                return renderToOriginal(...args);
                            });
                        }));

                        return cVVFieldToOriginal;

                    }));


                    mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                        return onApproveOriginal({ ...data, payerID }, actions);
                    }));

                    return cardFieldInstance;
                }));


                const numberContainer = createCardFieldsContainerHTML('number');
                const expiryContainer = createCardFieldsContainerHTML('expiry');
                const cvvContainer = createCardFieldsContainerHTML('cvv');

                const cardFields = window.paypal.CardFields(window.xprops);

                window.xprops.type = CARD_FIELD_TYPE.NUMBER;
                await mockSetupCardFields();
                cardFields.NumberField(window.xprops).render(numberContainer);

                window.xprops.type = CARD_FIELD_TYPE.EXPIRY;
                await mockSetupCardFields();
                cardFields.ExpiryField(window.xprops).render(expiryContainer);

                window.xprops.type = CARD_FIELD_TYPE.CVV;
                await mockSetupCardFields();
                cardFields.CVVField(window.xprops).render(cvvContainer);

            });

        });

        it('should render multi card fields and call ProcessPayment mutation with valid card inputs on submit event', async () => {

            return await wrapPromise(async ({ expect, wait }) => {

                const orderID = generateOrderID();
                const payerID = 'AAABBBCCC';

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

                const cardNumber = '5555555555554444';
                const cardExpiry = '01/2022';
                const cardCvv = '123';

                const gqlMock = getGraphQLApiMock({
                    extraHandler: ({ data }) => {
                        if (!data.variables.orderID) {
                            throw new Error(`Expected orderID to be passed`);
                        }

                        if (data.query.includes('mutation ProcessPayment')) {

                            if (!data.variables.card) {
                                throw new Error('Expected card data to be passed');
                            }

                            if (data.variables.card.cardNumber !== cardNumber) {
                                throw new Error(`Expected card number to be ${ cardNumber } but got ${ data.variables.card.cardNumber }`);
                            }

                            if (data.variables.card.expirationDate !== cardExpiry) {
                                throw new Error(`Expected expiry to be ${ cardExpiry } but got ${ data.variables.card.expirationDate }`);
                            }

                            if (data.variables.card.securityCode !== cardCvv) {
                                throw new Error(`Expected CVV to be ${ cardCvv } but got ${ data.variables.card.securityCode }`);
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

                    mockFunction(cardFieldInstance, 'NumberField', expect('NumberField', ({ original: NumberFieldToOriginal, args: numberArgs }) => {

                        const numberFieldToOriginal = NumberFieldToOriginal(...numberArgs);

                        mockFunction(numberFieldToOriginal, 'render', expect('render', async ({ original: renderToOriginal, args }) => {
                            return props.createOrder().then(id => {

                                if (id !== orderID) {
                                    throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                                }

                                return renderToOriginal(...args);
                            });
                        }));

                        renderCardFieldMock({ name: 'card-number-field', isFieldValid: () => true, getFieldValue: () => cardNumber });
                        setCardFieldsValues({ number: cardNumber });
                        return numberFieldToOriginal;

                    }));

                    mockFunction(cardFieldInstance, 'ExpiryField', expect('ExpiryField', ({ original: ExpiryFieldToOriginal, args: expiryArgs }) => {

                        const expiryFieldToOriginal = ExpiryFieldToOriginal(...expiryArgs);

                        mockFunction(expiryFieldToOriginal, 'render', expect('render', async ({ original: renderToOriginal, args }) => {
                            return props.createOrder().then(id => {

                                if (id !== orderID) {
                                    throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                                }

                                return renderToOriginal(...args);
                            });
                        }));

                        renderCardFieldMock({ name: 'card-expiry-field', isFieldValid: () => true, getFieldValue: () => cardExpiry });
                        setCardFieldsValues({ expiry: cardExpiry });
                        return expiryFieldToOriginal;

                    }));

                    mockFunction(cardFieldInstance, 'CVVField', expect('CVVField', ({ original: CvvFieldToOriginal, args: cvvArgs }) => {

                        const cVVFieldToOriginal = CvvFieldToOriginal(...cvvArgs);

                        mockFunction(cVVFieldToOriginal, 'render', expect('render', async ({ original: renderToOriginal, args }) => {
                            return props.createOrder().then(id => {

                                if (id !== orderID) {
                                    throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                                }

                                setTimeout(() => {
                                    cardFieldInstance.submit();
                                }, 20);

                                return renderToOriginal(...args);
                            });
                        }));

                        renderCardFieldMock({ name: 'card-cvv-field', isFieldValid: () => true, getFieldValue: () => cardCvv });
                        setCardFieldsValues({ cvv: cardCvv });
                        return cVVFieldToOriginal;

                    }));

                    mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                        return onApproveOriginal({ ...data, payerID }, actions);
                    }));


                    return cardFieldInstance;
                }));


                const numberContainer = createCardFieldsContainerHTML('number');
                const expiryContainer = createCardFieldsContainerHTML('expiry');
                const cvvContainer = createCardFieldsContainerHTML('cvv');

                const cardFields = window.paypal.CardFields(window.xprops);

                window.xprops.type = CARD_FIELD_TYPE.NUMBER;
                await mockSetupCardFields();
                cardFields.NumberField(window.xprops).render(numberContainer);

                window.xprops.type = CARD_FIELD_TYPE.EXPIRY;
                await mockSetupCardFields();
                cardFields.ExpiryField(window.xprops).render(expiryContainer);

                window.xprops.type = CARD_FIELD_TYPE.CVV;
                await mockSetupCardFields();
                cardFields.CVVField(window.xprops).render(cvvContainer);

                await wait();
                gqlMock.done();

            });

        });

        it('should render multi card fields and not call ProcessPayment mutation with invalid card inputs on submit', async () => {

            return await wrapPromise(async ({ expect, wait }) => {

                const orderID = generateOrderID();
                const payerID = 'AAABBBCCC';

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

                const cardNumber = '55555555555';
                const cardExpiry = '01/20';
                const cardCvv = '12';

                const gqlMock = getGraphQLApiMock({
                    extraHandler: ({ data }) => {
                        if (!data.variables.orderID) {
                            throw new Error(`Expected orderID to be passed`);
                        }

                        if (data.query.includes('mutation ProcessPayment')) {

                            if (!data.variables.card) {
                                throw new Error('Expected card data to be passed');
                            }

                            if (data.variables.card.cardNumber !== cardNumber) {
                                throw new Error(`Expected card number to be ${ cardNumber } but got ${ data.variables.card.cardNumber }`);
                            }

                            if (data.variables.card.expirationDate !== cardExpiry) {
                                throw new Error(`Expected expiry to be ${ cardExpiry } but got ${ data.variables.card.expirationDate }`);
                            }

                            if (data.variables.card.securityCode !== cardCvv) {
                                throw new Error(`Expected CVV to be ${ cardCvv } but got ${ data.variables.card.securityCode }`);
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

                    mockFunction(cardFieldInstance, 'NumberField', expect('NumberField', ({ original: NumberFieldToOriginal, args: numberArgs }) => {

                        const numberFieldToOriginal = NumberFieldToOriginal(...numberArgs);

                        mockFunction(numberFieldToOriginal, 'render', expect('render', async ({ original: renderToOriginal, args }) => {
                            return props.createOrder().then(id => {

                                if (id !== orderID) {
                                    throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                                }

                                return renderToOriginal(...args);
                            });
                        }));

                        renderCardFieldMock({ name: 'card-number-field', isFieldValid: () => true, getFieldValue: () => cardNumber });
                        setCardFieldsValues({ number: cardNumber });
                        return numberFieldToOriginal;

                    }));

                    mockFunction(cardFieldInstance, 'ExpiryField', expect('ExpiryField', ({ original: ExpiryFieldToOriginal, args: expiryArgs }) => {

                        const expiryFieldToOriginal = ExpiryFieldToOriginal(...expiryArgs);

                        mockFunction(expiryFieldToOriginal, 'render', expect('render', async ({ original: renderToOriginal, args }) => {
                            return props.createOrder().then(id => {

                                if (id !== orderID) {
                                    throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                                }

                                return renderToOriginal(...args);
                            });
                        }));

                        renderCardFieldMock({ name: 'card-expiry-field', isFieldValid: () => true, getFieldValue: () => cardExpiry });
                        setCardFieldsValues({ expiry: cardExpiry });
                        return expiryFieldToOriginal;

                    }));

                    mockFunction(cardFieldInstance, 'CVVField', expect('CVVField', ({ original: CvvFieldToOriginal, args: cvvArgs }) => {

                        const cVVFieldToOriginal = CvvFieldToOriginal(...cvvArgs);

                        mockFunction(cVVFieldToOriginal, 'render', expect('render', async ({ original: renderToOriginal, args }) => {
                            return props.createOrder().then(id => {

                                if (id !== orderID) {
                                    throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                                }

                                return renderToOriginal(...args);
                            });
                        }));

                        renderCardFieldMock({ name: 'card-cvv-field', isFieldValid: () => true, getFieldValue: () => cardCvv });
                        setCardFieldsValues({ cvv: cardCvv });
                        return cVVFieldToOriginal;

                    }));

                    mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                        return onApproveOriginal({ ...data, payerID }, actions);
                    }));

                    setTimeout(() => {
                        cardFieldInstance.submit().catch(error => {
                            if (!error) {
                                throw new Error('Expected on submit error if the card data is invalid');
                            }
                        });
                    }, 100);

                    return cardFieldInstance;
                }));


                const numberContainer = createCardFieldsContainerHTML('number');
                const expiryContainer = createCardFieldsContainerHTML('expiry');
                const cvvContainer = createCardFieldsContainerHTML('cvv');

                const cardFields = window.paypal.CardFields(window.xprops);

                window.xprops.type = CARD_FIELD_TYPE.NUMBER;
                await mockSetupCardFields();
                cardFields.NumberField(window.xprops).render(numberContainer);

                window.xprops.type = CARD_FIELD_TYPE.EXPIRY;
                await mockSetupCardFields();
                cardFields.ExpiryField(window.xprops).render(expiryContainer);

                window.xprops.type = CARD_FIELD_TYPE.CVV;
                await mockSetupCardFields();
                cardFields.CVVField(window.xprops).render(cvvContainer);

                await wait();
                gqlMock.done();

            });

        });

        it('should render multi card fields with createOrder and optional cardholder name field', async () => {

            return await wrapPromise(async ({ expect }) => {

                const orderID = generateOrderID();

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

                const cardNumber = '5555555555554444';
                const cardExpiry = '01/2022';
                const cardCvv = '123';
                const cardName = 'John Doe';

                window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                    return ZalgoPromise.try(() => {
                        return orderID;
                    });
                }));

                mockFunction(window.paypal, 'CardFields', expect('CardFields', ({ original: CardFieldOriginal, args: [ props ] }) => {

                    const cardFieldInstance = CardFieldOriginal(props);

                    mockFunction(cardFieldInstance, 'NumberField', expect('NumberField', ({ original: NumberFieldToOriginal, args: numberArgs }) => {
                        
                        const numberFieldToOriginal = NumberFieldToOriginal(...numberArgs);

                        mockFunction(numberFieldToOriginal, 'render', expect('render', async ({ original: renderToOriginal, args }) => {
                            return props.createOrder().then(id => {

                                if (id !== orderID) {
                                    throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                                }

                                return renderToOriginal(...args);
                            });
                        }));

                        renderCardFieldMock({ name: 'card-number-field', isFieldValid: () => true, getFieldValue: () => cardNumber });
                        setCardFieldsValues({ number: cardNumber });
                        return numberFieldToOriginal;
                        
                    }));

                    mockFunction(cardFieldInstance, 'ExpiryField', expect('ExpiryField', ({ original: ExpiryFieldToOriginal, args: expiryArgs }) => {
                        
                        const expiryFieldToOriginal = ExpiryFieldToOriginal(...expiryArgs);

                        mockFunction(expiryFieldToOriginal, 'render', expect('render', async ({ original: renderToOriginal, args }) => {
                            return props.createOrder().then(id => {

                                if (id !== orderID) {
                                    throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                                }

                                return renderToOriginal(...args);
                            });
                        }));

                        renderCardFieldMock({ name: 'card-expiry-field', isFieldValid: () => true, getFieldValue: () => cardExpiry });
                        setCardFieldsValues({ expiry: cardExpiry });
                        return expiryFieldToOriginal;
                        
                    }));

                    mockFunction(cardFieldInstance, 'CVVField', expect('CVVField', ({ original: CVVFieldToOriginal, args: cvvArgs }) => {
                        
                        const cVVFieldToOriginal = CVVFieldToOriginal(...cvvArgs);

                        mockFunction(cVVFieldToOriginal, 'render', expect('render', async ({ original: renderToOriginal, args }) => {
                            return props.createOrder().then(id => {

                                if (id !== orderID) {
                                    throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                                }

                                return renderToOriginal(...args);
                            });
                        }));

                        renderCardFieldMock({ name: 'card-cvv-field', isFieldValid: () => true, getFieldValue: () => cardCvv });
                        setCardFieldsValues({ cvv: cardCvv });
                        return cVVFieldToOriginal;
                        
                    }));

                    mockFunction(cardFieldInstance, 'NameField', expect('NameField', ({ original: NameFieldToOriginal, args: nameArgs }) => {
                        
                        const nameFieldToOriginal = NameFieldToOriginal(...nameArgs);

                        mockFunction(nameFieldToOriginal, 'render', expect('render', async ({ original: renderToOriginal, args }) => {
                            return props.createOrder().then(id => {

                                if (id !== orderID) {
                                    throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                                }

                                return renderToOriginal(...args);
                            });
                        }));

                        renderCardFieldMock({ name: 'card-name-field', isFieldValid: () => true, getFieldValue: () => cardName });
                        setCardFieldsValues({ name: cardName });
                        return nameFieldToOriginal;
                        
                    }));
                    return cardFieldInstance;
                }));
                

                const numberContainer = createCardFieldsContainerHTML('number');
                const expiryContainer = createCardFieldsContainerHTML('expiry');
                const cvvContainer = createCardFieldsContainerHTML('cvv');
                const nameContainer = createCardFieldsContainerHTML('name');

                const cardFields = window.paypal.CardFields(window.xprops);

                window.xprops.type = CARD_FIELD_TYPE.NUMBER;
                await mockSetupCardFields();
                cardFields.NumberField(window.xprops).render(numberContainer);
                
                window.xprops.type = CARD_FIELD_TYPE.EXPIRY;
                await mockSetupCardFields();
                cardFields.ExpiryField(window.xprops).render(expiryContainer);

                window.xprops.type = CARD_FIELD_TYPE.CVV;
                await mockSetupCardFields();
                cardFields.CVVField(window.xprops).render(cvvContainer);

                window.xprops.type = CARD_FIELD_TYPE.NAME;
                await mockSetupCardFields();
                cardFields.NameField(window.xprops).render(nameContainer);
            });

        });

    });


    it('includes autocomplete attributes', async () => {
        return await wrapPromise(async ({ expect }) => {
            window.xprops.type = CARD_FIELD_TYPE.SINGLE;

            const container = createCardFieldsContainerHTML();

            mockFunction(window.paypal, 'CardFields', expect('CardFields', ({ original: CardFieldOriginal, args: [ props ] }) => {
                const cardFieldInstance = CardFieldOriginal(props);
                const numberInput = document.getElementsByName('number')[0];
                const expiryInput = document.getElementsByName('expiry')[0];
                const cvvInput = document.getElementsByName('cvv')[0];

                if (numberInput.getAttribute('autocomplete') !== 'cc-number') {
                    throw new Error('Card Number autocomplete is not set to "cc-number"');
                }

                if (expiryInput.getAttribute('autocomplete') !== 'cc-exp') {
                    throw new Error('Card Expiry autocomplete is not set to "cc-exp"');
                }

                if (cvvInput.getAttribute('autocomplete') !== 'cc-csc') {
                    throw new Error('Card CVV autocomplete is not set to "cc-csc"');
                }
                return cardFieldInstance;
            }));

            await mockSetupCardFields();

            const card = window.paypal.CardFields(window.xprops);
            card.render(container);
        });
    });

    it('should turn autocomplete off on fields with `disableAutocomplete`', async () => {
        return await wrapPromise(async ({ expect }) => {
            window.xprops.disableAutocomplete = true;
            window.xprops.type = CARD_FIELD_TYPE.SINGLE;

            const container = createCardFieldsContainerHTML();

            mockFunction(window.paypal, 'CardFields', expect('CardFields', ({ original: CardFieldOriginal, args: [ props ] }) => {
                const cardFieldInstance = CardFieldOriginal(props);
                const numberInput = document.getElementsByName('number')[0];
                const expiryInput = document.getElementsByName('expiry')[0];
                const cvvInput = document.getElementsByName('cvv')[0];

                if (numberInput.getAttribute('autocomplete') !== 'off') {
                    throw new Error('Card Number autocomplete is not set to "off"');
                }

                if (expiryInput.getAttribute('autocomplete') !== 'off') {
                    throw new Error('Card Expiry autocomplete is not set to "off"');
                }

                if (cvvInput.getAttribute('autocomplete') !== 'off') {
                    throw new Error('Card CVV autocomplete is not set to "off"');
                }
                return cardFieldInstance;
            }));

            await mockSetupCardFields();

            const card = window.paypal.CardFields(window.xprops);
            card.render(container);
        });
    });
});
