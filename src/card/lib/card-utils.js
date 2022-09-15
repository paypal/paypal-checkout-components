/* @flow */

import { values } from '@krakenjs/belter';

import type { InputState, FieldValidity, ExtraFields } from '../types';
import {
    CARD_ERRORS,
    CARD_FIELD_TYPE,
    DEFAULT_STYLE,
    FIELD_STYLE,
    FILTER_CSS_SELECTORS,
    FILTER_CSS_VALUES,
    GQL_ERRORS,
    VALID_EXTRA_FIELDS,
    ALLOWED_ATTRIBUTES
} from '../constants';
import { getLogger } from '../../lib';

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

export function isValidAttribute(attribute: string) : boolean {
    if(!ALLOWED_ATTRIBUTES.includes(attribute.toLocaleLowerCase())) {
        getLogger().warn('attribute_warning', { warn: `HTML Attribute "${attribute}" was ignored. See allowed attribute list.`})
        return false
    };

    return true
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

// mark the ref's HTMLElement as valid or invalid
export function markValidity(ref : Object, validity : FieldValidity) {
    const element = ref?.current?.base;
    if (element) {
        if (validity.isPotentiallyValid || validity.isValid) {
            element.classList.add('valid');
            element.classList.remove('invalid');
        } else{
            element.classList.add('invalid');
            element.classList.remove('valid');
        }
    }
}

export function removeNonDigits(value : string) : string {
    const trimmedValue = removeSpaces(value);
    return trimmedValue.replace(/\D/g, '');
}

export function checkForNonDigits(value : string) : boolean {
    return (/\D/g).test(removeSpaces(value));
}

export function setErrors({ isCardEligible, isNumberValid, isCvvValid, isExpiryValid, isNameValid, isPostalCodeValid, gqlErrorsObject = {} } : {| isCardEligible? : boolean, isNumberValid? : boolean, isCvvValid? : boolean, isExpiryValid? : boolean, isNameValid? : boolean, isPostalCodeValid? : boolean, gqlErrorsObject? : {| field : string, errors : [] |} |}) : [$Values<typeof CARD_ERRORS>] | [] {
    const errors = [];
    const { field, errors: gqlErrors } = gqlErrorsObject;

    if (isCardEligible === false) {
        if (field === CARD_FIELD_TYPE.NUMBER && gqlErrors.length) {
            errors.push(...gqlErrors);
        } else {
            errors.push(CARD_ERRORS.INELIGIBLE_CARD);
        }
    }

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

export function getContext(win : Object) : string {
    return win.xprops?.parent?.uid || win.xprops?.uid;
}
