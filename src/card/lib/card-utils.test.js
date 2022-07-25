/* @flow */

import { getLogger } from '../../lib';

import {
    autoFocusOnFirstInput,
    maskValidCard,
    formatDate,
    parseGQLErrors,
    filterStyle,
    styleToString,
    filterExtraFields,
    checkPostalCode
} from './card-utils';

jest.mock('../../lib/dom');

function triggerFocusListener(input) {

    const focusListener = window.addEventListener.mock.calls.find((args) => {
        return args[0] === 'focus';
    })[1];

    focusListener();

    if (input) {

        const focusinListener = window.addEventListener.mock.calls.find((args) => {
            return args[0] === 'focusin';
        })[1];

        focusinListener({ target: input });
    }

    jest.runAllTimers();

}

describe('card utils', () => {
    describe('autoFocusOnFirstInput', () => {
        let input : HTMLInputElement;

        beforeEach(() => {
            jest.useFakeTimers();
            jest.spyOn(window, 'addEventListener').mockImplementation(jest.fn());
            input = document.createElement('input');
        });

        it('noops when no input is passed', () => {
            autoFocusOnFirstInput();

            expect(window.addEventListener).not.toBeCalled();
        });

        it('adds a focus and focusin listener when input is available', () => {
            autoFocusOnFirstInput(input);

            expect(window.addEventListener).toBeCalledTimes(2);
            expect(window.addEventListener).toBeCalledWith('focus', expect.any(Function));
            expect(window.addEventListener).toBeCalledWith('focusin', expect.any(Function));
        });

        it('noops when the an HTMLInputElement gets focus', () => {
            const spy = jest.spyOn(input, 'focus');

            autoFocusOnFirstInput(input);

            triggerFocusListener(input);

            expect(spy).not.toBeCalled();
        });

        it('focuses on input when the window gets focus', () => {
            const spy = jest.spyOn(input, 'focus');

            autoFocusOnFirstInput(input);

            triggerFocusListener();

            expect(spy).toBeCalledTimes(1);
        });

        it('applies a focus patch for Safari using setSelectionRange', () => {
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

    describe('filterStyle', () => {
        it('normalizes css properties from camelCase to kebab-case', () => {
            const styles = {
                'input': {
                    paddingTop:    '20px'
                }
            };
            const filteredStyles = filterStyle(styles)
            const expectedStyles = {
                'input': {
                    'padding-top': '20px'
                }
           };
           expect(filteredStyles).toEqual(expectedStyles);
        });
        it('normalizes all css properties to lower case', () => {
            const styles = {
                'input': {
                    'pAdDiNg-ToP':    '20px'
                }
            };
            const filteredStyles = filterStyle(styles)
            const expectedStyles = {
                'input': {
                    'padding-top': '20px'
                }
           };
           expect(filteredStyles).toEqual(expectedStyles);
        });
        it('excludes css properties that are not on the allowlist and log a warning', () => {
            const styles = {
                'input': {
                    boxShadow:    '20px',
                    paddingTop:    '20px'
                }
            };
            const originalLoggerWarn = getLogger().warn;
            getLogger().warn = jest.fn();
            const filteredStyles = filterStyle(styles)
            const expectedStyles = {
                'input': {
                    'padding-top': '20px'
                }
            };
            expect(filteredStyles).toEqual(expectedStyles);
            expect(getLogger().warn).toHaveBeenCalledWith('style_warning', { warn: 'CSS property "boxShadow" was ignored. See allowed CSS property list.' });
            getLogger().warn = originalLoggerWarn;
        });
    });

    describe('styleToString', () => {
        it('converts a style object to a valid style string', () => {
            const styleObject = {
                'input': {
                    'font-size': '16 px',
                    'font-color': 'red'
                }
            };

            const targetString = `input {\n font-size: 16 px;\n font-color: red;\n}`

            expect(typeof styleObject).toBe('object');

            const styleString = styleToString(styleObject);
            expect(typeof styleString).toBe('string');
            expect(styleString).toBe(targetString)
        });
    });

    describe('checkPostalCode', () => {
        it('returns true for isValid for a 5-digit postal code', () => {
            const postalCode = '12345';

            expect(checkPostalCode(postalCode).isValid).toBe(true)
        });

        it('returns false for isValid for a postal code < 5 digits', () => {
            const postalCode = '1234';

            expect(checkPostalCode(postalCode, 5).isValid).toBe(false)
        });

        it('retusn false for isValid for a postal code that is not a string', () => {
            const postalCode = 12345

            // $FlowFixMe
            expect(checkPostalCode(postalCode).isValid).toBe(false)
        })
    })

    describe('filterExtraFields', () => {

        it('should return empty object for invalid data', () => {
            const extraFields = filterExtraFields(123);
            
            expect(typeof extraFields).toBe('object');
            expect(Object.keys(extraFields).length).toBe(0);
            
        });

        it('should check for valid object with valid props', () => {
            const extraData = {
                billingAddress: 'Av. test, 12324',
                cardHolderName: 'Joe Dow'
            };

            const extraFields = filterExtraFields(extraData);

            expect(Object.keys(extraFields).length).toBe(1);
            expect(extraFields.billingAddress).toBe('Av. test, 12324');

        });
    });

});
