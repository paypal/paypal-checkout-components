/* @flow */

import { noop, values } from '@krakenjs/belter';
import creditCardType from 'credit-card-type';
import luhn10 from 'card-validator/src/luhn-10';
import cardValidator from 'card-validator';

import type { CardType, CardNavigation, InputState, FieldValidity, InputEvent, Card, ExtraFields } from '../types';
import {
    CARD_ERRORS,
    CARD_FIELD_TYPE,
    DEFAULT_CARD_TYPE,
    DEFAULT_STYLE,
    FIELD_STYLE,
    FILTER_CSS_SELECTORS,
    FILTER_CSS_VALUES,
    GQL_ERRORS,
    VALID_EXTRA_FIELDS,
    VALIDATOR_TO_TYPE_MAP
} from '../constants';
import { getLogger } from '../../lib';

// Add additional supported card types
creditCardType.addCard({
    code: {
        name: 'CVV',
        size: 3
    },
    gaps:     [ 4, 8, 12 ],
    lengths:  [ 16, 18, 19 ],
    niceType: 'Carte Bancaire',
    patterns: [],
    type:     'cb-nationale'
});

creditCardType.addCard({
    code: {
        name: 'CVV',
        size: 3
    },
    gaps:     [ 4, 8, 12, 16 ],
    lengths:  [ 19 ],
    niceType: 'Carte Aurore',
    patterns: [],
    type:     'cetelem'
});

creditCardType.addCard({
    code: {
        name: '',
        size: 0
    },
    gaps:     [ 4, 8, 12, 16 ],
    lengths:  [ 17 ],
    niceType: 'Cofinoga ou Privilège',
    patterns: [],
    type:     'cofinoga'
});

creditCardType.addCard({
    code: {
        name: '',
        size: 0
    },
    gaps:     [ 4, 8 ],
    lengths:  [ 8, 9 ],
    niceType: '4 étoiles',
    patterns: [],
    type:     'cofidis'
});

export const defaultNavigation : CardNavigation = {
    next:     () => noop,
    previous: () => noop
};

export const defaultInputState : InputState = {
    inputValue:         '',
    maskedInputValue:   '',
    cursorStart:        0,
    cursorEnd:          0,
    keyStrokeCount:     0,
    isPotentiallyValid:  true,
    isValid:            false
};

export const initFieldValidity : FieldValidity = { isValid: false, isPotentiallyValid: true };

export function splice(str : string, idx : number, insert : string) : string {
    return str.slice(0, idx) + insert + str.slice(idx);
}


export function assertType(assertion : () => void, errorMsg : string) : void | TypeError {
    if (!assertion) {
        throw new TypeError(errorMsg);
    }
}

export function assertString<T>(...args : T) : void | TypeError {
    // $FlowFixMe
    assertType(args.every((s) => typeof s === 'string'), 'Expected a string');
}

export function removeSpaces(value : string) : string {
    return value.replace(/\s/g, '');
}

// Detect the card type metadata for a card number
export function detectCardType(number : string) : CardType {
    if (number.length > 0) {
        const cardType = creditCardType(number)?.[0];
        if (cardType) {
            return {
                ...cardType,
                type: VALIDATOR_TO_TYPE_MAP[cardType.type]
            };
        }
    }
    return DEFAULT_CARD_TYPE;
}

// Mask a card number for display given a card type. If a card type is
// not provided, attempt to detect it and mask based on that type.
export function maskCard(number : string, cardType? : CardType) : string {
    assertString(number);
    number = number.trim().replace(/[^0-9]/g, '').replace(/\s/g, '');
    // $FlowFixMe
    const gaps = cardType?.gaps || detectCardType(number)?.gaps;

    if (gaps) {
        for (let idx = 0; idx < gaps.length; idx++) {
            const splicePoint = gaps[idx] + idx;
            if (splicePoint > number.length - 1) {
                // We're beyond the end of the number
                break;
            }

            number = splice(number, splicePoint, ' ');
        }
    }
    return number;
}

// Return the last 4 digits of a valid card number
export function maskValidCard(number : string) : string {
    const trimmedValue = removeSpaces(number);
    const lastFour = trimmedValue.slice(-4);
    const maskedNumber = number.replace(/\d/g, '•').slice(0, -4);

    return maskedNumber + lastFour;
}

export function removeDateMask(date : string) : string {
    return date.trim().replace(/\s|\//g, '');
}


// Format expiry date
export function formatDate(date : string, prevFormat? : string = '') : string {
    assertString(date);

    if (prevFormat && prevFormat.includes('/')) {
        const [ month ] = removeSpaces(prevFormat).split('/');
        if (month.length < 2) {
            return prevFormat;
        }
    }

    if (date.trim().slice(-1) === '/') {
        return date.slice(0, 2);
    }

    date = removeDateMask(date);

    if (date.length < 2) {
        const first = date[0];
        if (parseInt(first, 10) > 1) {
            return `0${ first } / `;
        }
        return date;
    }

    const month = date.slice(0, 2);
    if (parseInt(month, 10) > 12) {
        const first = month[0];
        const second = month[1];
        return `0${ first } / ${ second }`;
    }

    const year = date.slice(2, 4);
    return `${ month } / ${ year }`;

}

// from https://github.com/braintree/inject-stylesheet/blob/main/src/lib/filter-style-values.ts
function isValidValue(value : string | number) : boolean {
    return !FILTER_CSS_VALUES.some((regex) => regex.test(String(value)));
}

// from https://github.com/braintree/inject-stylesheet/blob/main/src/lib/validate-selector.ts
function isValidSelector(selector : string) : boolean {
    return !FILTER_CSS_SELECTORS.some((regex) => regex.test(selector));
}

export function filterStyle(style : Object) : Object {
    const result = {};
    Object.keys(style).forEach((key) => {
        const value = style[key];
        // if the key is pointing to a string or a number, it must be a CSS property
        if (typeof value === 'string' || typeof value === 'number') {
            // so normalize the property name and filter based on FIELD_STYLE (allow list)
            let property;
            if (FIELD_STYLE[key]) {
                // normalize from camelCase to kebab-case
                property = FIELD_STYLE[key];
                if (isValidValue(value)) {
                    result[property] = value;
                }
            } else if (values(FIELD_STYLE).includes(key.toLowerCase())) {
                // normalize to lower case
                property = key.toLowerCase();
                if (isValidValue(value)) {
                    result[property] = value;
                }
            } else {
                getLogger().warn('style_warning', { warn: `CSS property "${key}" was ignored. See allowed CSS property list.`});
            }
        // if the key is pointing to an object, it must be a CSS selector
        } else if (typeof value === 'object') {
            if (isValidSelector(key)) {
                // so normalize the object it's pointing to
                result[key] = filterStyle(value);
            }
        }
    });
    return result;
}

// Converts style object to valid style string
export function styleToString(style : Object = { }) : string {
    const s = [];
    Object.keys(style).forEach((key) => {
        const value = style[key];
        if (typeof value === 'string' || typeof value === 'number') {
            s.push(` ${ key }: ${ value };`);
        } else if (typeof value === 'object') {
            s.push(`${ key } {`);
            s.push(styleToString(value));
            s.push('}');
        }
    });
    return s.join('\n');
}

// convert default and custom styles to CSS text
export function getCSSText(cardFieldStyle : Object, customStyle : Object) : string {
    const s = [];
    s.push('/* default style */');
    s.push(styleToString(DEFAULT_STYLE));
    s.push(styleToString(cardFieldStyle));
    s.push('/* custom style */');
    s.push(styleToString(filterStyle(customStyle)));
    return s.join('\n');
}

export function removeNonDigits(value : string) : string {
    const trimmedValue = removeSpaces(value);
    return trimmedValue.replace(/\D/g, '');
}

export function checkForNonDigits(value : string) : boolean {
    return (/\D/g).test(removeSpaces(value));
}

export function getCvvLength(cardType? : CardType) : number {
    if (cardType && typeof cardType === 'object') {
        const { code } = cardType;

        if (typeof code === 'object') {
            const { size } = code;

            if (typeof size === 'number') {
                return size;
            }
        }
    }

    return 3;
}

export function checkCardNumber(value : string, cardType : CardType) : {| isValid : boolean, isPotentiallyValid : boolean |} {
    const trimmedValue = removeSpaces(value);
    const { lengths } = cardType;

    const validLength = lengths.some((length) => length === trimmedValue.length);
    const validLuhn = luhn10(trimmedValue);

    const maxLength = Math.max.apply(null, lengths);

    return {
        isValid:            validLength && validLuhn,
        isPotentiallyValid: validLength || trimmedValue.length < maxLength
    };
}

export function checkCVV(value : string, cardType : CardType) : {| isValid : boolean, isPotentiallyValid : boolean |} {
    let isValid = false;
    if (value.length === getCvvLength(cardType)) {
        isValid = true;
    }
    return {
        isValid,
        isPotentiallyValid: true
    };
}

export function checkName(value : string) : {| isValid : boolean, isPotentiallyValid : boolean |} {
    let isValid = false;
    if (value.length >= 1 && value.length <= 255) {
        isValid = true;
    }
    return {
        isValid,
        isPotentiallyValid: true
    };
}

export function checkExpiry(value : string) : {| isValid : boolean, isPotentiallyValid : boolean |} {
    const { expirationDate } = cardValidator;
    const { isValid } = expirationDate(value);

    return {
        isValid,
        isPotentiallyValid: true
    };
}

export function checkPostalCode(value : string, minLength? : number) : {| isValid : boolean, isPotentiallyValid : boolean |} {
    const { postalCode } = cardValidator;
    const { isValid } = postalCode(value, {minLength})
    return {
        isValid,
        isPotentiallyValid: true
    };
}

export function setErrors({ isNumberValid, isCvvValid, isExpiryValid, isNameValid, isPostalCodeValid, gqlErrorsObject = {} } : {| isNumberValid? : boolean, isCvvValid? : boolean, isExpiryValid? : boolean, isNameValid? : boolean, isPostalCodeValid? : boolean, gqlErrorsObject? : {| field : string, errors : [] |} |}) : [$Values<typeof CARD_ERRORS>] | [] {
    const errors = [];

    const { field, errors: gqlErrors } = gqlErrorsObject;

    if (isNumberValid === false) {

        if (field === CARD_FIELD_TYPE.NUMBER && gqlErrors.length) {
            errors.push(...gqlErrors);
        } else {
            errors.push(CARD_ERRORS.INVALID_NUMBER);
        }
    }

    if (isExpiryValid === false) {

        if (field === CARD_FIELD_TYPE.EXPIRY  && gqlErrors.length) {
            errors.push(...gqlErrors);
        } else {
            errors.push(CARD_ERRORS.INVALID_EXPIRY);
        }

    }

    if (isCvvValid === false) {

        if (field === CARD_FIELD_TYPE.CVV  && gqlErrors.length) {
            errors.push(...gqlErrors);
        } else {
            errors.push(CARD_ERRORS.INVALID_CVV);
        }
    }

    if (isNameValid === false) {

        if (field === CARD_FIELD_TYPE.NAME && gqlErrors.length) {
            errors.push(...gqlErrors);
        } else {
            errors.push(CARD_ERRORS.INVALID_NAME);
        }
    }

    if (isPostalCodeValid === false) {

        if (field === CARD_FIELD_TYPE.POSTAL && gqlErrors.length) {
            errors.push(...gqlErrors);
        } else {
            errors.push(CARD_ERRORS.INVALID_POSTAL);
        }
    }

    return errors;
}

// Move cursor within a field
export function moveCursor(element : HTMLInputElement, start : number, end? : number) : void {
    window.requestAnimationFrame(() => {
        element.selectionStart = start;
        element.selectionEnd = end ?? start;
    });
}

// Navigation helper to go to the next field putting the cursor at the start
export function goToNextField(ref : {| current : {| base : HTMLInputElement |} |}) : () => void {
    return () => {
        moveCursor(ref.current.base, 0);
        setTimeout(() => ref.current.base.focus());
    };
}

// Navigation helper to go to the previous field putting the curser at the end
export function goToPreviousField(ref : {| current : {| base : HTMLInputElement |} |}) : () => void {
    return () => {
        const { value } = ref.current.base;

        if (value) {
            const valueLength = value.length;
            moveCursor(ref.current.base, valueLength);
        }
        setTimeout(() => ref.current.base.focus());
    };
}

// Navigate between fields using the arrow keys and/or the backspace
export function navigateOnKeyDown(event : InputEvent, navigation : CardNavigation) : void {
    const { target: { value, selectionStart, selectionEnd }, key } = event;

    if (selectionStart === 0 && (value.length === 0 || value.length !== selectionEnd)  && [ 'Backspace', 'ArrowLeft' ].includes(key)) {
        navigation.previous();
    }

    if (selectionStart === value.length && [ 'ArrowRight' ].includes(key)) {
        navigation.next();
    }
}

// Format expity date to MM/YYYY
export function convertDateFormat(date : string) : string {
    const trimmedDate = removeSpaces(date);
    const splittedDate = trimmedDate.split('/');
    let formattedDate = trimmedDate;

    if (splittedDate[1] && splittedDate[1].length === 2) {
        splittedDate[1] = `20${ splittedDate[1] }`;
        formattedDate = splittedDate.join('/');
    }

    return formattedDate;
}


// Safari (both iOS and Desktop) has an unconvential behavior,
// where it won't let an iframe that includes an input get
// focus programatically from outisde of the input.
// Big props to the devs at Stripe that figured out
// you run this selection range hack to force the focus back
// onto the input.
function applyFocusWorkaroundForSafari (input : HTMLInputElement) {
    const inputIsEmptyInitially = input.value === '';

    // Safari can't set selection if the input is empty
    if (inputIsEmptyInitially) {
        input.value = ' ';
    }

    const start = input.selectionStart;
    const end = input.selectionEnd;

    input.setSelectionRange(0, 0);
    input.setSelectionRange(start, end);

    if (inputIsEmptyInitially) {
        input.value = '';
    }
}

export function autoFocusOnFirstInput(input? : HTMLInputElement) {
    if (!input) {
        return;
    }

    let timeoutID = null;

    window.addEventListener('focus', () => {
        // the set timeout is required here, because in some browsers (Firefox, for instance)
        // when tabbing backward into the iframe, it will have the html element focussed
        // initially, but then passes focus to the input
        timeoutID = setTimeout(() => {
            timeoutID = null;

            applyFocusWorkaroundForSafari(input);

            // for Safari, setting the selection range is enough to give
            // it focus, but Firefox requires an explicit focus call.
            // Also, just calling `focus` on Safari does not work at all
            input.focus();
        }, 1);
    });

    window.addEventListener('focusin', (event) => {
        if (timeoutID && event.target instanceof HTMLInputElement) {
            clearTimeout(timeoutID);
            timeoutID = null;
        }
    });

}

// Function that returns the field value in the correct format
export function formatFieldValue(value : string | Card) : string | Card {
    let newValue;
    // Single card field case
    if (typeof value === 'object') {
        newValue = { ...value };
    // Individual field case
    } else {
        newValue = value;
    }
    return newValue;
}

// Parse errors from ProcessPayment GQL mutation
export function parseGQLErrors(errorsObject : Object) : {| parsedErrors : $ReadOnlyArray<string>, errors : $ReadOnlyArray<Object>, errorsMap : Object |} {
    const { data } = errorsObject;

    const parsedErrors = [];
    const errors = [];
    const errorsMap = {};

    if (Array.isArray(data) && data.length) {
        data.forEach(e => {
            const { details } = e;

            if (Array.isArray(details) && details.length) {
                details.forEach(d => {
                    errors.push(d);
                    
                    let parsedError;
                    if (d.field && d.issue && d.description) {
                        parsedError = GQL_ERRORS[d.field][d.issue] ?? `${ d.issue }: ${ d.description }`;
                        const field  = d.field.split('/').pop();

                        if (!errorsMap[field]) {
                            errorsMap[field] = [];
                        }
                        
                        errorsMap[field].push(parsedError);

                    } else if (d.issue && d.description) {
                        parsedError = GQL_ERRORS[d.issue] ?? `${ d.issue }: ${ d.description }`;
                    }
                    
                    if (parsedError) {
                        parsedErrors.push(parsedError);
                    }
                    
                });
            }
        });
    }

    return {
        errors,
        parsedErrors,
        errorsMap
    };
}

export function filterExtraFields(extraData : Object) : ExtraFields | Object {
    if (!extraData || typeof extraData !== 'object' || Array.isArray(extraData)) {
        return {};
    }

    return Object.keys(extraData).reduce((acc, key) => {
        if (VALID_EXTRA_FIELDS.includes(key)) {
            acc[key] = extraData[key];
        }
        return acc;
    }, {});
}
