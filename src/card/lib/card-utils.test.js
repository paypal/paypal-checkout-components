/* @flow */

import { getActiveElement } from '../../lib/dom';

import {
    autoFocusOnFirstInput,
    maskValidCard,
    formatDate,
    parseGQLErrors,
    styleToString,
    getStyles
} from './card-utils';

jest.mock('../../lib/dom');

function triggerFocusListener() {
    const cb = window.addEventListener.mock.calls.find((args) => {
        return args[0] === 'focus';
    })[1];

    cb();

    jest.runAllTimers();
}

describe('card utils', () => {
    describe('autoFocusOnFirstInput', () => {
        let input : HTMLInputElement;

        beforeEach(() => {
            jest.useFakeTimers();
            jest.spyOn(window, 'addEventListener').mockImplementation(jest.fn());
            input = document.createElement('input');

            (getActiveElement : JestMockFn<[], null | HTMLElement>).mockReturnValue(null);
        });

        it('noops when no input is passed', () => {
            autoFocusOnFirstInput();

            expect(window.addEventListener).not.toBeCalled();
        });

        it('adds a focus listener when input is available', () => {
            autoFocusOnFirstInput(input);

            expect(window.addEventListener).toBeCalledTimes(1);
        });

        it('noops when the active element is not the body or the document element', () => {
            const spy = jest.spyOn(input, 'focus');

            autoFocusOnFirstInput(input);

            triggerFocusListener();

            expect(spy).not.toBeCalled();
        });

        it('focuses on input when the document body is the active element', () => {
            const spy = jest.spyOn(input, 'focus');

            (getActiveElement : JestMockFn<[], null | HTMLElement>).mockReturnValue(document.body);

            autoFocusOnFirstInput(input);

            triggerFocusListener();

            expect(spy).toBeCalledTimes(1);
        });

        it('focuses on input when the document element is the active element', () => {
            const spy = jest.spyOn(input, 'focus');

            (getActiveElement : JestMockFn<[], null | HTMLElement>).mockReturnValue(document.documentElement);

            autoFocusOnFirstInput(input);

            triggerFocusListener();

            expect(spy).toBeCalledTimes(1);
        });

        it('applies a focus patch for Safari using setSelectionRange', () => {
            (getActiveElement : JestMockFn<[], null | HTMLElement>).mockReturnValue(document.body);

            input.value = 'foo';

            input.setSelectionRange(1, 2);

            const spy = jest.spyOn(input, 'setSelectionRange');
            autoFocusOnFirstInput(input);

            triggerFocusListener();

            expect(spy).toBeCalledTimes(2);
            expect(spy).toBeCalledWith(0, 0);
            expect(spy).toBeCalledWith(1, 2);
        });

        it('adjusts and resets the inputs value when it is empty to accomodate Safari quirk', () => {
            (getActiveElement : JestMockFn<[], null | HTMLElement>).mockReturnValue(document.body);

            input.value = '';

            const spy = jest.spyOn(input, 'value', 'set');
            autoFocusOnFirstInput(input);

            triggerFocusListener();

            expect(spy).toBeCalledTimes(2);
            expect(spy).toBeCalledWith(' ');
            expect(spy).toBeCalledWith('');
        });
    });

    describe('maskValidCard', () => {
        it('masks all but the last 4 of the card number with •', () => {
            const masked = maskValidCard('12345678901234');

            expect(masked).toBe('••••••••••1234');
        });

        it('retains white space', () => {
            const masked = maskValidCard('1234 5678 901234');

            expect(masked).toBe('•••• •••• ••1234');
        });

        it('does not mask when card number is less than 5 digits', () => {
            expect(maskValidCard('1234')).toBe('1234');
            expect(maskValidCard('123')).toBe('123');
            expect(maskValidCard('12')).toBe('12');
            expect(maskValidCard('1')).toBe('1');
            expect(maskValidCard('')).toBe('');
        });
    });

    describe('formatDate', () => {
        it('format valid number sequence', () => {
            const masked = formatDate('1022');

            expect(masked).toBe('10 / 22');
        });

        it('add slash at the end of a valid month', () => {
            const masked = formatDate('10');

            expect(masked).toBe('10 / ');
        });

        it('format number by adding a slash to separate the month from the year', () => {
            const masked = formatDate('22');

            expect(masked).toBe('02 / 2');
        });

        it('returns prevMask if it is valid', () => {
            const masked = formatDate('22');

            expect(masked).toBe('02 / 2');
        });

        it('returns only the month section when the string finished with slash', () => {
            const masked = formatDate('12 /');

            expect(masked).toBe('12');
        });

    });

    describe('parseGQLErrors', () => {
        it('should parse an invalid card number error', () => {
            const gqlError = {
                path:    [
                    'processPayment'
                ],
                data:  [
                    {
                        code:    'UNPROCESSABLE_ENTITY',
                        details: [
                            {
                                'field':       '/payment_source/card/number',
                                'location':    'body',
                                'issue':       'VALIDATION_ERROR',
                                'description': 'Invalid card number'
                            }
                        ]
                    }
                ]
            };

            const { parsedErrors, errors, errorsMap } = parseGQLErrors(gqlError);

            expect(parsedErrors.length).toBe(1);
            expect(parsedErrors[0]).toBe('INVALID_NUMBER');

            expect(errors.length).toBe(1);
            expect(errors[0]?.issue).toBe('VALIDATION_ERROR');

            expect(errorsMap.number).not.toEqual(undefined);
            expect(errorsMap.number.length).toBe(1);
        });

        it('should parse an invalid expiry syntax error', () => {
            const gqlError = {
                path:    [
                    'processPayment'
                ],
                data: [
                    {
                        code:    'INVALID_REQUEST',
                        details: [
                            {
                                field:       '/payment_source/card/expiry',
                                value:       '22-01',
                                location:    'body',
                                issue:       'INVALID_PARAMETER_SYNTAX',
                                description: 'The value of a field does not conform to the expected format.'
                            },
                            {
                                field:       '/payment_source/card/expiry',
                                value:       '22-01',
                                location:    'body',
                                issue:       'INVALID_STRING_LENGTH',
                                description: 'The value of a field is either too short or too long.'
                            }
                        ]
                    }
                ]
            };

            const { parsedErrors, errors, errorsMap } = parseGQLErrors(gqlError);

            expect(parsedErrors.length).toBe(2);
            expect(parsedErrors[0]).toBe('INVALID_EXPIRATION_DATE_FORMAT');
            expect(parsedErrors[1]).toBe('INVALID_EXPIRATION_DATE_LENGTH');

            expect(errors.length).toBe(2);
            expect(errors[0]?.issue).toBe('INVALID_PARAMETER_SYNTAX');
            expect(errors[1]?.issue).toBe('INVALID_STRING_LENGTH');

            expect(errorsMap.expiry).not.toEqual(undefined);
            expect(errorsMap.expiry.length).toBe(2);
        });

        it('should parse an expired card error', () => {
            const gqlError = {
                path:    [
                    'processPayment'
                ],
                data: [
                    {
                        code:    'UNPROCESSABLE_ENTITY',
                        details: [
                            {
                                field:       '/payment_source/card/expiry',
                                location:    'body',
                                issue:       'CARD_EXPIRED',
                                description: 'The card is expired.'
                            }
                        ]
                    }
                ]
            };

            const { parsedErrors, errors, errorsMap } = parseGQLErrors(gqlError);

            expect(parsedErrors.length).toBe(1);
            expect(parsedErrors[0]).toBe('CARD_EXPIRED');

            expect(errors.length).toBe(1);
            expect(errors[0]?.issue).toBe('CARD_EXPIRED');

            expect(errorsMap.expiry).not.toEqual(undefined);
            expect(errorsMap.expiry.length).toBe(1);
        });

        it('should parse a missing required field error', () => {
            const gqlError = {
                path:    [
                    'processPayment'
                ],
                data: [
                    {
                        code:    'INVALID_REQUEST',
                        details: [
                            {
                                field:       '/payment_source/card/number',
                                value:       '',
                                location:    'body',
                                issue:       'MISSING_REQUIRED_PARAMETER',
                                description: 'A required field / parameter is missing.'
                            }
                        ]
                    }
                ]
            };

            const { parsedErrors, errors, errorsMap } = parseGQLErrors(gqlError);

            expect(parsedErrors.length).toBe(1);
            expect(parsedErrors[0]).toBe('MISSING_NUMBER');

            expect(errors.length).toBe(1);
            expect(errors[0]?.issue).toBe('MISSING_REQUIRED_PARAMETER');

            expect(errorsMap.number).not.toEqual(undefined);
            expect(errorsMap.number.length).toBe(1);
        });

        it('should parse refused transaction error', () => {
            const gqlError = {
                path:    [
                    'processPayment'
                ],
                data: [
                    {
                        code:    'UNPROCESSABLE_ENTITY',
                        details: [
                            {
                                issue:       'TRANSACTION_REFUSED',
                                description: 'The request was refused.'
                            }
                        ]
                    }
                ]
            };

            const { parsedErrors, errors, errorsMap } = parseGQLErrors(gqlError);

            expect(parsedErrors.length).toBe(1);
            expect(parsedErrors[0]).toBe('TRANSACTION_REJECTED');

            expect(errors.length).toBe(1);
            expect(errors[0]?.issue).toBe('TRANSACTION_REFUSED');

            expect(Object.keys(errorsMap).length).toEqual(0);
        });

        it('should return errors for unhandled (not defined on the constants) cases', () => {
            const gqlError = {
                path:    [
                    'processPayment'
                ],
                data: [
                    {
                        code:    'INVALID_REQUEST',
                        details: [
                            {
                                issue:       'PERMISSION_DENIED',
                                description: 'You do not have permission to access or perform operations on this resource.'
                            }
                        ]
                    }
                ]
            };

            const { parsedErrors, errors, errorsMap } = parseGQLErrors(gqlError);

            expect(parsedErrors.length).toBe(1);
            expect(parsedErrors[0]).toBe('PERMISSION_DENIED: You do not have permission to access or perform operations on this resource.');

            expect(errors.length).toBe(1);
            expect(errors[0]?.issue).toBe('PERMISSION_DENIED');

            expect(Object.keys(errorsMap).length).toEqual(0);
        });
    });

    describe('styleToString', () => {

        it('should stringify a style object into a valid style string', () => {

            const objectStyle = {
                height:     '60px',
                padding:    '10px',
                fontSize:   '18px',
                fontFamily: '"Open Sans", sans-serif',
                transition: 'all 0.5s ease-out'
            };
            const stringStyle = styleToString(objectStyle);

            expect(stringStyle).toBe('  height : 60px ;  padding : 10px ;  font-size : 18px ;  font-family : "Open Sans", sans-serif ;  transition : all 0.5s ease-out ;');
        });

    });

    describe('getStyles', () => {
        it('should separate nested sub-styles into their own style objects', () => {
            const objectStyle = {
                'height':          '60px',
                'padding':         '10px',
                'fontSize':        '18px',
                'fontFamily':      '"Open Sans", sans-serif',
                'transition':        'all 0.5s ease-out',
                'input.invalid': {
                    color: 'red'
                }
            };

            const [ generalStyle, inputStyle ] = getStyles(objectStyle);

            expect(Object.keys(generalStyle).length).toBe(1);
            expect(generalStyle['input.invalid'].color).toBe('red');

            expect(Object.keys(inputStyle).length).toBe(5);
            expect(inputStyle.height).toBe('60px');

        });
    });

});

