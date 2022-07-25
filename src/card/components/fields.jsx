/* @flow */
/** @jsx h */

import { h, Fragment } from 'preact';
import { noop } from '@krakenjs/belter';
import { useState, useEffect, useRef } from 'preact/hooks';

import {
    setErrors,
    getCvvLength,
    initFieldValidity,
    goToNextField,
    goToPreviousField,
    convertDateFormat,
    getCSSText
} from '../lib';
import type {
    CardStyle,
    Card,
    CardNumberChangeEvent,
    CardExpiryChangeEvent,
    CardCvvChangeEvent,
    CardNameChangeEvent,
    CardPostalCodeChangeEvent,
    FieldValidity,
    CardNavigation,
    CardType
} from '../types';
import {
    CARD_ERRORS,
    DEFAULT_STYLE_MULTI_CARD,
    DEFAULT_STYLE_SINGLE_CARD,
    DEFAULT_CARD_TYPE,
    DEFAULT_PLACEHOLDERS,
    CARD_FIELD_TYPE
} from '../constants';

import { CardNumber } from './CardNumber';
import { CardExpiry } from './CardExpiry';
import { CardCVV } from './CardCVV';
import { CardName } from './CardName';
import { CardPostalCode } from './CardPostalCode';

type CardFieldProps = {|
    cspNonce : string,
    onChange : ({| value : Card, valid : boolean, errors : [$Values<typeof CARD_ERRORS>] | [] |}) => void,
    styleObject : CardStyle,
    placeholder : {| number? : string, expiry? : string, cvv? : string  |},
    autoFocusRef : (mixed) => void,
    autocomplete? : string,
    gqlErrorsObject : {| field : string, errors : [] |}
|};

export function CardField({ cspNonce, onChange, styleObject = {}, placeholder = {}, gqlErrorsObject = {}, autoFocusRef, autocomplete } : CardFieldProps) : mixed {
    const [ cssText, setCSSText ] : [ string, (string) => string ] = useState('');
    const [ number, setNumber ] : [ string, (string) => string ] = useState('');
    const [ cvv, setCvv ] : [ string, (string) => string ] = useState('');
    const [ expiry, setExpiry ] : [ string, (string) => string ] = useState('');
    const [ isValid, setIsValid ] : [ boolean, (boolean) => boolean ] = useState(true);
    const [ validationMessage, setValidationMessage ] : [ string, (string) => string ] = useState('');
    const [ numberValidity, setNumberValidity ] : [ FieldValidity, (FieldValidity) => FieldValidity ] = useState(initFieldValidity);
    const [ expiryValidity, setExpiryValidity ] : [ FieldValidity, (FieldValidity) => FieldValidity ] = useState(initFieldValidity);
    const [ cvvValidity, setCvvValidity ] : [ FieldValidity, (FieldValidity) => FieldValidity ] = useState(initFieldValidity);
    const [ cardType, setCardType ] : [ CardType, (CardType) => CardType ] = useState(DEFAULT_CARD_TYPE);
    const [ hasFocus, setHasFocus ] : [ boolean, (boolean) => boolean ] = useState(false);
    const numberRef = useRef();
    const expiryRef = useRef();
    const cvvRef = useRef();

    const cardNumberNavivation : CardNavigation = { next: goToNextField(expiryRef), previous: () => noop };
    const cardExpiryNavivation : CardNavigation = { next: goToNextField(cvvRef), previous: goToPreviousField(numberRef) };
    const cardCvvNavivation : CardNavigation = { next:     () =>  noop, previous: goToPreviousField(expiryRef) };

    function getValidationMessage() : string {
        if (!numberValidity.isPotentiallyValid && !numberValidity.isValid) {
            return 'This card number is not valid.';
        }
        if (!expiryValidity.isPotentiallyValid && !expiryValidity.isValid) {
            return 'This expiration date is not valid.';
        }
        if (!cvvValidity.isPotentiallyValid && !cvvValidity.isValid) {
            return 'This security code is not valid.';
        }
        return '';
    }

    useEffect(() => {
        autoFocusRef(numberRef);
    }, []);

    useEffect(() => {
        setCSSText(getCSSText(DEFAULT_STYLE_SINGLE_CARD, styleObject));
    }, [ styleObject ]);

    useEffect(() => {
        const { field, errors } = gqlErrorsObject;

        if (field === CARD_FIELD_TYPE.NUMBER) {
            const hasGQLErrors = errors.length > 0;
            if (hasGQLErrors) {
                setNumberValidity({ isPotentiallyValid: false, isValid: false });
            }
        }

        if (field === CARD_FIELD_TYPE.EXPIRY) {
            const hasGQLErrors = errors.length > 0;
            if (hasGQLErrors) {
                setExpiryValidity({ isPotentiallyValid: false, isValid: false });
            }
        }

        if (field === CARD_FIELD_TYPE.CVV) {
            const hasGQLErrors = errors.length > 0;
            if (hasGQLErrors) {
                setCvvValidity({ isPotentiallyValid: false, isValid: false });
            }
        }
    }, [ gqlErrorsObject ]);
   
    useEffect(() => {

        setValidationMessage(getValidationMessage());

        const valid = Boolean(numberValidity.isValid && cvvValidity.isValid && expiryValidity.isValid);

        setIsValid(valid);

        const errors = setErrors({ isNumberValid: numberValidity.isValid, isCvvValid: cvvValidity.isValid, isExpiryValid: expiryValidity.isValid, gqlErrorsObject });

        onChange({ value: { number, cvv, expiry }, valid, errors });

    }, [
        number,
        cvv,
        expiry,
        isValid,
        numberValidity,
        cvvValidity,
        expiryValidity,
        cardType
    ]);

    const onChangeNumber : (CardNumberChangeEvent) => void = ({ cardNumber, cardType : type } : CardNumberChangeEvent) : void => {
        setNumber(cardNumber);
        setCardType({ ...type });
    };

    return (
        <Fragment>
            <style nonce={ cspNonce }>
                { cssText }
            </style>
            <div className={ `card-field ${ hasFocus ? 'focus' : '' } ${ !validationMessage.length ? '' : 'invalid' }` }>
                <CardNumber
                    ref={ numberRef }
                    autocomplete={ autocomplete }
                    navigation={ cardNumberNavivation }
                    type='text'
                    // eslint-disable-next-line react/forbid-component-props
                    className={ `number ${ numberValidity.isPotentiallyValid || numberValidity.isValid ? 'valid' : 'invalid' }` }
                    allowNavigation={ true }
                    placeholder={ placeholder.number ?? DEFAULT_PLACEHOLDERS.number }
                    maxLength='24'
                    onChange={ onChangeNumber }
                    onValidityChange={ (validity : FieldValidity) => setNumberValidity({ ...validity }) }
                    onFocus={ () => setHasFocus(true) }
                    onBlur={ () => setHasFocus(false) }
                />
                <CardExpiry
                    ref={ expiryRef }
                    autocomplete={ autocomplete }
                    navigation={ cardExpiryNavivation }
                    type='text'
                    // eslint-disable-next-line react/forbid-component-props
                    className={ `expiry ${ expiryValidity.isPotentiallyValid || expiryValidity.isValid ? 'valid' : 'invalid' }` }
                    allowNavigation={ true }
                    placeholder={ placeholder.expiry ?? DEFAULT_PLACEHOLDERS.expiry }
                    maxLength='7'
                    onChange={ ({ maskedDate } : CardExpiryChangeEvent) => setExpiry(convertDateFormat(maskedDate)) }
                    onValidityChange={ (validity : FieldValidity) => setExpiryValidity({ ...validity }) }
                    onFocus={ () => setHasFocus(true) }
                    onBlur={ () => setHasFocus(false) }
                />
                <CardCVV
                    ref={ cvvRef }
                    autocomplete={ autocomplete }
                    navigation={ cardCvvNavivation }
                    type='text'
                    cardType={ cardType }
                    // eslint-disable-next-line react/forbid-component-props
                    className={ `cvv ${ cvvValidity.isPotentiallyValid || cvvValidity.isValid ? 'valid' : 'invalid' }` }
                    allowNavigation={ true }
                    placeholder={ placeholder.cvv ?? DEFAULT_PLACEHOLDERS.cvv }
                    maxLength={ getCvvLength(cardType) }
                    onChange={ ({ cardCvv } : CardCvvChangeEvent) => setCvv(cardCvv) }
                    onValidityChange={ (validity : FieldValidity) => setCvvValidity({ ...validity }) }
                    onFocus={ () => setHasFocus(true) }
                    onBlur={ () => setHasFocus(false) }
                />
            </div>
            <ValidationMessage message={ validationMessage } />
        </Fragment>
    );
}

export function ValidationMessage({ message } : Object) : mixed {
    return (
        <div className={ `card-field-validation-error ${ message.length ? '' : 'hidden' }` }>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.64 17.34L14.05 4.2c-.92-1.59-3.22-1.59-4.14 0L2.32 17.34c-.92 1.59.23 3.59 2.07 3.59h15.18c1.84 0 2.99-2 2.07-3.59zM11.26 7.91h1.45c.26 0 .47.25.45.53l-.5 5.53c-.01.15-.13.27-.27.27h-.78c-.14 0-.26-.12-.27-.27l-.53-5.52c-.02-.29.18-.54.45-.54zm.73 10.19c-.64 0-1.17-.52-1.17-1.17 0-.64.53-1.17 1.17-1.17.65 0 1.17.53 1.17 1.17 0 .65-.52 1.17-1.17 1.17z"/>
            </svg>
            { message }
        </div>
    );
}

type CardNumberFieldProps = {|
    cspNonce : string,
    onChange : ({| value : string, valid : boolean, errors : [$Values<typeof CARD_ERRORS>] | [] |}) => void,
    styleObject : CardStyle,
    placeholder : {| number? : string, expiry? : string, cvv? : string, name? : string  |},
    autoFocusRef : (mixed) => void,
    autocomplete? : string,
    gqlErrors : []
|};

export function CardNumberField({ cspNonce, onChange, styleObject = {}, placeholder = {}, autoFocusRef, autocomplete, gqlErrors = [] } : CardNumberFieldProps) : mixed {
    const [ cssText, setCSSText ] : [ string, (string) => string ] = useState('');
    const [ number, setNumber ] : [ string, (string) => string ] = useState('');
    const [ numberValidity, setNumberValidity ] : [ FieldValidity, (FieldValidity) => FieldValidity ] = useState(initFieldValidity);
    const numberRef = useRef();

    const { isValid, isPotentiallyValid } = numberValidity;

    useEffect(() => {
        autoFocusRef(numberRef);
    }, []);

    useEffect(() => {
        setCSSText(getCSSText(DEFAULT_STYLE_MULTI_CARD, styleObject));
    }, [ styleObject ]);

    useEffect(() => {
        const hasGQLErrors = gqlErrors.length > 0;
        if (hasGQLErrors) {
            setNumberValidity({ isPotentiallyValid: false, isValid: false });
        }
    }, [ gqlErrors ]);

    useEffect(() => {
        const errors = setErrors({ isNumberValid: numberValidity.isValid, gqlErrorsObject: { field: CARD_FIELD_TYPE.NUMBER, errors: gqlErrors } });
        onChange({ value: number, valid: numberValidity.isValid, errors });
    }, [ number, isValid, isPotentiallyValid ]);

    return (
        <Fragment>
            <style nonce={ cspNonce }>
                { cssText }
            </style>
            <CardNumber
                ref={ numberRef }
                type='text'
                autocomplete={ autocomplete }
                // eslint-disable-next-line react/forbid-component-props
                className={ `number ${ numberValidity.isPotentiallyValid || numberValidity.isValid ? 'valid' : 'invalid' }` }
                placeholder={ placeholder.number ?? DEFAULT_PLACEHOLDERS.number }
                maxLength='24'
                onChange={ ({ cardNumber } : CardNumberChangeEvent) => setNumber(cardNumber) }
                onValidityChange={ (validity : FieldValidity) => setNumberValidity(validity) }
            />
        </Fragment>
    );
}

type CardExpiryFieldProps = {|
    cspNonce : string,
    onChange : ({| value : string, valid : boolean, errors : [$Values<typeof CARD_ERRORS>] | [] |}) => void,
    styleObject : CardStyle,
    placeholder : {| number? : string, expiry? : string, cvv? : string, name? : string  |},
    autoFocusRef : (mixed) => void,
    autocomplete? : string,
    gqlErrors : []
|};

export function CardExpiryField({ cspNonce, onChange, styleObject = {}, placeholder = {}, autoFocusRef, autocomplete, gqlErrors = [] } : CardExpiryFieldProps) : mixed {
    const [ cssText, setCSSText ] : [ string, (string) => string ] = useState('');
    const [ expiry, setExpiry ] : [ string, (string) => string ] = useState('');
    const [ expiryValidity, setExpiryValidity ] : [ FieldValidity, (FieldValidity) => FieldValidity ] = useState(initFieldValidity);
    const expiryRef = useRef();

    const { isValid, isPotentiallyValid } = expiryValidity;

    useEffect(() => {
        autoFocusRef(expiryRef);
    }, []);

    useEffect(() => {
        setCSSText(getCSSText(DEFAULT_STYLE_MULTI_CARD, styleObject));
    }, [ styleObject ]);

    useEffect(() => {
        const hasGQLErrors = gqlErrors.length > 0;
        if (hasGQLErrors) {
            setExpiryValidity({ isPotentiallyValid: false, isValid: false });
        }
    }, [ gqlErrors ]);
    
    useEffect(() => {
        const errors = setErrors({ isExpiryValid: expiryValidity.isValid });

        onChange({ value: expiry, valid: expiryValidity.isValid, errors });
    }, [ expiry, isValid, isPotentiallyValid ]);

    return (
        <Fragment>
            <style nonce={ cspNonce }>
                { cssText }
            </style>
            <CardExpiry
                ref={ expiryRef }
                type='text'
                autocomplete={ autocomplete }
                // eslint-disable-next-line react/forbid-component-props
                className={ `expiry ${ expiryValidity.isPotentiallyValid || expiryValidity.isValid ? 'valid' : 'invalid' }` }
                placeholder={ placeholder.expiry ?? DEFAULT_PLACEHOLDERS.expiry }
                maxLength='7'
                onChange={ ({ maskedDate } : CardExpiryChangeEvent) => setExpiry(convertDateFormat(maskedDate)) }
                onValidityChange={ (validity : FieldValidity) => setExpiryValidity(validity) }
            />
        </Fragment>
    );
}
type CardCvvFieldProps = {|
    cspNonce : string,
    onChange : ({| value : string, valid : boolean, errors : [$Values<typeof CARD_ERRORS>] | [] |}) => void,
    styleObject : CardStyle,
    placeholder : {| number? : string, expiry? : string, cvv? : string, name? : string  |},
    autoFocusRef : (mixed) => void,
    autocomplete? : string,
    gqlErrors : []
|};

export function CardCVVField({ cspNonce, onChange, styleObject = {}, placeholder = {}, autoFocusRef, autocomplete, gqlErrors = [] } : CardCvvFieldProps) : mixed {
    const [ cssText, setCSSText ] : [ string, (string) => string ] = useState('');
    const [ cvv, setCvv ] : [ string, (string) => string ] = useState('');
    const [ cvvValidity, setCvvValidity ] : [ FieldValidity, (FieldValidity) => FieldValidity ] = useState(initFieldValidity);
    const cvvRef = useRef();
    
    const { isValid, isPotentiallyValid } = cvvValidity;

    useEffect(() => {
        autoFocusRef(cvvRef);
    }, []);

    useEffect(() => {
        setCSSText(getCSSText(DEFAULT_STYLE_MULTI_CARD, styleObject));
    }, [ styleObject ]);

    useEffect(() => {
        const hasGQLErrors = gqlErrors.length > 0;
        if (hasGQLErrors) {
            setCvvValidity({ isPotentiallyValid: false, isValid: false });
        }
    }, [ gqlErrors ]);

    useEffect(() => {
        const errors = setErrors({ isCvvValid: cvvValidity.isValid });

        onChange({ value: cvv, valid: cvvValidity.isValid, errors });
    }, [ cvv, isValid, isPotentiallyValid  ]);

    return (
        <Fragment>
            <style nonce={ cspNonce }>
                { cssText }
            </style>
            <CardCVV
                ref={ cvvRef }
                type='text'
                autocomplete={ autocomplete }
                // eslint-disable-next-line react/forbid-component-props
                className={ `cvv ${ cvvValidity.isPotentiallyValid || cvvValidity.isValid ? 'valid' : 'invalid' }` }
                placeholder={ placeholder.cvv ?? DEFAULT_PLACEHOLDERS.cvv }
                maxLength='4'
                onChange={ ({ cardCvv } : CardCvvChangeEvent) => setCvv(cardCvv) }
                onValidityChange={ (validity : FieldValidity) => setCvvValidity(validity) }
            />
        </Fragment>
    );
}

type CardNameFieldProps = {|
    cspNonce : string,
    onChange : ({| value : string, valid : boolean, errors : [$Values<typeof CARD_ERRORS>] | [] |}) => void,
    styleObject : CardStyle,
    placeholder : {| number? : string, expiry? : string, cvv? : string, name? : string  |},
    autoFocusRef : (mixed) => void,
    gqlErrors : []
|};

export function CardNameField({ cspNonce, onChange, styleObject = {}, placeholder = {}, autoFocusRef, gqlErrors = [] } : CardNameFieldProps) : mixed {
    const [ cssText, setCSSText ] : [ string, (string) => string ] = useState('');
    const [ name, setName ] : [ string, (string) => string ] = useState('');
    const [ nameValidity, setNameValidity ] : [ FieldValidity, (FieldValidity) => FieldValidity ] = useState(initFieldValidity);
    const nameRef = useRef();
    
    const { isValid, isPotentiallyValid } = nameValidity;

    useEffect(() => {
        autoFocusRef(nameRef);
    }, []);

    useEffect(() => {
        setCSSText(getCSSText(DEFAULT_STYLE_MULTI_CARD, styleObject));
    }, [ styleObject ]);

    useEffect(() => {
        const hasGQLErrors = gqlErrors.length > 0;
        if (hasGQLErrors) {
            setNameValidity({ isPotentiallyValid: false, isValid: false });
        }
    }, [ gqlErrors ]);

    useEffect(() => {
        const errors = setErrors({ isNameValid: nameValidity.isValid });

        onChange({ value: name, valid: nameValidity.isValid, errors });
    }, [ name, isValid, isPotentiallyValid  ]);

    return (
        <Fragment>
            <style nonce={ cspNonce }>
                { cssText }
            </style>
            <CardName
                ref={ nameRef }
                type='text'
                // eslint-disable-next-line react/forbid-component-props
                className={ `name ${ nameValidity.isPotentiallyValid || nameValidity.isValid ? 'valid' : 'invalid' }` }
                placeholder={ placeholder.name ?? DEFAULT_PLACEHOLDERS.name }
                maxLength='255'
                onChange={ ({ cardName } : CardNameChangeEvent) => setName(cardName) }
                onValidityChange={ (validity : FieldValidity) => setNameValidity(validity) }
            />
        </Fragment>
    );
}

type CardPostalFieldProps = {|
    cspNonce : string,
    onChange : ({| value : string, valid : boolean, errors : [$Values<typeof CARD_ERRORS>] | [] |}) => void,
    styleObject : CardStyle,
    placeholder : {| number? : string, expiry? : string, cvv? : string, name? : string |},
    minLength : number,
    maxLength: number,
    autoFocusRef : (mixed) => void,
    autocomplete? : string,
    gqlErrors : []
|};

export function CardPostalCodeField({ cspNonce, onChange, styleObject = {}, placeholder = {}, minLength, maxLength, autoFocusRef, autocomplete, gqlErrors = [] } : CardPostalFieldProps) : mixed {
    const [ cssText, setCSSText ] : [ string, (string) => string ] = useState('');
    const [ postalCode, setPostalCode ] : [ string, (string) => string ] = useState('');
    const [ postalCodeValidity, setPostalCodeValidity ] : [ FieldValidity, (FieldValidity) => FieldValidity ] = useState(initFieldValidity);
    const postalRef = useRef();

    const { isValid, isPotentiallyValid } = postalCodeValidity;

    useEffect(() => {
        autoFocusRef(postalRef);
    }, []);

    useEffect(() => {
        setCSSText(getCSSText(DEFAULT_STYLE_MULTI_CARD, styleObject));
    }, [ styleObject ]);

    useEffect(() => {
        const hasGQLErrors = gqlErrors.length > 0;
        if (hasGQLErrors) {
            setPostalCodeValidity({ isPotentiallyValid: false, isValid: false });
        }
    }, [ gqlErrors ]);

    useEffect(() => {
        const errors = setErrors({ isPostalCodeValid: postalCodeValidity.isValid });

        onChange({ value: postalCode, valid: postalCodeValidity.isValid, errors });
    }, [ postalCode, isValid, isPotentiallyValid  ]);

    return (
        <Fragment>
            <style nonce={ cspNonce }>
                { cssText }
            </style>
            <CardPostalCode
                ref={ postalRef }
                type='text'
                autocomplete={ autocomplete }
                placeholder={ placeholder.name ?? DEFAULT_PLACEHOLDERS.postal }
                // eslint-disable-next-line react/forbid-component-props
                className={ `expiry ${ postalCodeValidity.isPotentiallyValid || postalCodeValidity.isValid ? 'valid' : 'invalid' }` }
                minLength={ minLength }
                maxLength={ maxLength }
                onChange={ ({ cardPostalCode } : CardPostalCodeChangeEvent) => setPostalCode(cardPostalCode) }
                onValidityChange={ (validity : FieldValidity) => setPostalCodeValidity(validity) }
            />
        </Fragment>
    )
}
