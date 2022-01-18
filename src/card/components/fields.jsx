/* @flow */
/** @jsx h */

import { h, Fragment } from 'preact';
import { noop } from 'belter';
import { useState, useEffect, useRef } from 'preact/hooks';

import {
    getStyles,
    styleToString,
    setErrors,
    getCvvLength,
    initFieldValidity,
    goToNextField,
    goToPreviousField,
    convertDateFormat
} from '../lib';
import type {
    CardStyle,
    Card,
    CardNumberChangeEvent,
    CardExpiryChangeEvent,
    CardCvvChangeEvent,
    FieldValidity,
    CardNavigation,
    CardType
} from '../types';
import {
    CARD_ERRORS,
    DEFAULT_STYLE,
    DEFAULT_CARD_TYPE,
    DEFAULT_INPUT_STYLE,
    DEFAULT_PLACEHOLDERS,
    CARD_FIELD_TYPE
} from '../constants';

import { CardNumber } from './CardNumber';
import { CardExpiry } from './CardExpiry';
import { CardCVV } from './CardCVV';


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
    const [ number, setNumber ] : [ string, (string) => string ] = useState('');
    const [ cvv, setCvv ] : [ string, (string) => string ] = useState('');
    const [ expiry, setExpiry ] : [ string, (string) => string ] = useState('');
    const [ isValid, setIsValid ] : [ boolean, (boolean) => boolean ] = useState(true);
    const [ numberValidity, setNumberValidity ] : [ FieldValidity, (FieldValidity) => FieldValidity ] = useState(initFieldValidity);
    const [ expiryValidity, setExpiryValidity ] : [ FieldValidity, (FieldValidity) => FieldValidity ] = useState(initFieldValidity);
    const [ cvvValidity, setCvvValidity ] : [ FieldValidity, (FieldValidity) => FieldValidity ] = useState(initFieldValidity);
    const [ cardType, setCardType ] : [ CardType, (CardType) => CardType ] = useState(DEFAULT_CARD_TYPE);
    const [ generalStyle, inputStyle ] = getStyles(styleObject);
    const numberRef = useRef();
    const expiryRef = useRef();
    const cvvRef = useRef();

    const composedStyles = { ...DEFAULT_STYLE,  ...generalStyle };


    const cardNumberNavivation : CardNavigation = { next: goToNextField(expiryRef), previous: () => noop };
    const cardExpiryNavivation : CardNavigation = { next: goToNextField(cvvRef), previous: goToPreviousField(numberRef) };
    const cardCvvNavivation : CardNavigation = { next:     () =>  noop, previous: goToPreviousField(expiryRef) };

    useEffect(() => {
        autoFocusRef(numberRef);
    }, []);

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
                {styleToString(composedStyles)}
            </style>

            <CardNumber
                ref={ numberRef }
                autocomplete={ autocomplete }
                navigation={ cardNumberNavivation }
                type='text'
                // eslint-disable-next-line react/forbid-component-props
                className={ `number ${ numberValidity.isPotentiallyValid || numberValidity.isValid ? 'valid' : 'invalid' }` }
                // eslint-disable-next-line react/forbid-component-props
                style={ inputStyle }
                allowNavigation={ true }
                placeholder={ placeholder.number ?? DEFAULT_PLACEHOLDERS.number }
                maxLength='24'
                onChange={ onChangeNumber }
                onValidityChange={ (validity : FieldValidity) => setNumberValidity({ ...validity }) }
            />

            <CardExpiry
                ref={ expiryRef }
                autocomplete={ autocomplete }
                navigation={ cardExpiryNavivation }
                type='text'
                // eslint-disable-next-line react/forbid-component-props
                className={ `expiry ${ expiryValidity.isPotentiallyValid || expiryValidity.isValid ? 'valid' : 'invalid' }` }
                // eslint-disable-next-line react/forbid-component-props
                style={ inputStyle }
                allowNavigation={ true }
                placeholder={ placeholder.expiry ?? DEFAULT_PLACEHOLDERS.expiry }
                maxLength='7'
                onChange={ ({ maskedDate } : CardExpiryChangeEvent) => setExpiry(convertDateFormat(maskedDate)) }
                onValidityChange={ (validity : FieldValidity) => setExpiryValidity({ ...validity }) }
            />

            <CardCVV
                ref={ cvvRef }
                autocomplete={ autocomplete }
                navigation={ cardCvvNavivation }
                type='text'
                cardType={ cardType }
                // eslint-disable-next-line react/forbid-component-props
                className={ `cvv ${ cvvValidity.isPotentiallyValid || cvvValidity.isValid ? 'valid' : 'invalid' }` }
                // eslint-disable-next-line react/forbid-component-props
                style={ inputStyle }
                allowNavigation={ true }
                placeholder={ placeholder.cvv ?? DEFAULT_PLACEHOLDERS.cvv }
                maxLength={ getCvvLength(cardType) }
                onChange={ ({ cardCvv } : CardCvvChangeEvent) => setCvv(cardCvv) }
                onValidityChange={ (validity : FieldValidity) => setCvvValidity({ ...validity }) }
            />
        </Fragment>
    );
}

type CardNumberFieldProps = {|
    cspNonce : string,
    onChange : ({| value : string, valid : boolean, errors : [$Values<typeof CARD_ERRORS>] | [] |}) => void,
    styleObject : CardStyle,
    placeholder : {| number? : string, expiry? : string, cvv? : string  |},
    autoFocusRef : (mixed) => void,
    autocomplete? : string,
    gqlErrors : []
|};

export function CardNumberField({ cspNonce, onChange, styleObject = {}, placeholder = {}, autoFocusRef, autocomplete, gqlErrors = [] } : CardNumberFieldProps) : mixed {
    const [ number, setNumber ] : [ string, (string) => string ] = useState('');
    const [ numberValidity, setNumberValidity ] : [ FieldValidity, (FieldValidity) => FieldValidity ] = useState(initFieldValidity);
    const [ generalStyle, inputStyle ] = getStyles(styleObject);
    const numberRef = useRef();

    const composedStyles = { ...{ input: DEFAULT_INPUT_STYLE },  ...generalStyle };
    const { isValid, isPotentiallyValid } = numberValidity;

    useEffect(() => {
        autoFocusRef(numberRef);
    }, []);

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
                {styleToString(composedStyles)}
            </style>

            <CardNumber
                ref={ numberRef }
                type='text'
                autocomplete={ autocomplete }
                // eslint-disable-next-line react/forbid-component-props
                className={ `number ${ numberValidity.isPotentiallyValid || numberValidity.isValid ? 'valid' : 'invalid' }` }
                // eslint-disable-next-line react/forbid-component-props
                style={ inputStyle }
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
    placeholder : {| number? : string, expiry? : string, cvv? : string  |},
    autoFocusRef : (mixed) => void,
    autocomplete? : string,
    gqlErrors : []
|};

export function CardExpiryField({ cspNonce, onChange, styleObject = {}, placeholder = {}, autoFocusRef, autocomplete, gqlErrors = [] } : CardExpiryFieldProps) : mixed {
    const [ expiry, setExpiry ] : [ string, (string) => string ] = useState('');
    const [ expiryValidity, setExpiryValidity ] : [ FieldValidity, (FieldValidity) => FieldValidity ] = useState(initFieldValidity);
    const [ generalStyle, inputStyle ] = getStyles(styleObject);
    const expiryRef = useRef();

    const composedStyles = { ...{ input: DEFAULT_INPUT_STYLE },  ...generalStyle };
    const { isValid, isPotentiallyValid } = expiryValidity;

    useEffect(() => {
        autoFocusRef(expiryRef);
    }, []);

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
                {styleToString(composedStyles)}
            </style>

            <CardExpiry
                ref={ expiryRef }
                type='text'
                autocomplete={ autocomplete }
                // eslint-disable-next-line react/forbid-component-props
                className={ `expiry ${ expiryValidity.isPotentiallyValid || expiryValidity.isValid ? 'valid' : 'invalid' }` }
                // eslint-disable-next-line react/forbid-component-props
                style={ inputStyle }
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
    placeholder : {| number? : string, expiry? : string, cvv? : string  |},
    autoFocusRef : (mixed) => void,
    autocomplete? : string,
    gqlErrors : []
|};

export function CardCVVField({ cspNonce, onChange, styleObject = {}, placeholder = {}, autoFocusRef, autocomplete, gqlErrors = [] } : CardCvvFieldProps) : mixed {
    const [ cvv, setCvv ] : [ string, (string) => string ] = useState('');
    const [ cvvValidity, setCvvValidity ] : [ FieldValidity, (FieldValidity) => FieldValidity ] = useState(initFieldValidity);
    const [ generalStyle, inputStyle ] = getStyles(styleObject);
    const cvvRef = useRef();
    
    const composedStyles = { ...{ input: DEFAULT_INPUT_STYLE },  ...generalStyle };
    const { isValid, isPotentiallyValid } = cvvValidity;

    useEffect(() => {
        autoFocusRef(cvvRef);
    }, []);

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
                {styleToString(composedStyles)}
            </style>

            <CardCVV
                ref={ cvvRef }
                type='text'
                autocomplete={ autocomplete }
                // eslint-disable-next-line react/forbid-component-props
                className={ `cvv ${ cvvValidity.isPotentiallyValid || cvvValidity.isValid ? 'valid' : 'invalid' }` }
                // eslint-disable-next-line react/forbid-component-props
                style={ inputStyle }
                placeholder={ placeholder.cvv ?? DEFAULT_PLACEHOLDERS.cvv }
                maxLength='4'
                onChange={ ({ cardCvv } : CardCvvChangeEvent) => setCvv(cardCvv) }
                onValidityChange={ (validity : FieldValidity) => setCvvValidity(validity) }
            />
        </Fragment>
    );
}
