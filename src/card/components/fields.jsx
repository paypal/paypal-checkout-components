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
    CardNavigation
} from '../types';
import {
    CARD_ERRORS,
    DEFAULT_STYLE,
    DEFAULT_CARD_TYPE,
    DEFAULT_INPUT_STYLE,
    DEFAULT_PLACEHOLDERS
} from '../constants';

import { CardNumber } from './CardNumber';
import { CardExpiry } from './CardExpiry';
import { CardCVV } from './CardCVV';


type CardFieldProps = {|
    cspNonce : string,
    onChange : ({| value : Card, valid : boolean, errors : [$Values<typeof CARD_ERRORS>] | [] |}) => void,
    styleObject : CardStyle,
    placeholder : {| number? : string, expiry? : string, cvv? : string  |}
|};

export function CardField({ cspNonce, onChange, styleObject = {}, placeholder = {} } : CardFieldProps) : mixed {
    const [ number, setNumber ] = useState('');
    const [ cvv, setCvv ] = useState('');
    const [ expiry, setExpiry ] = useState('');
    const [ isValid, setIsValid ] = useState(true);
    const [ numberValidity, setNumberValidity ] = useState(initFieldValidity);
    const [ expiryValidity, setExpiryValidity ] = useState(initFieldValidity);
    const [ cvvValidity, setCvvValidity ] = useState(initFieldValidity);
    const [ generalStyle, inputStyle ] = getStyles(styleObject);
    const [ cardType, setCardType ] = useState(DEFAULT_CARD_TYPE);
    const numberRef = useRef();
    const expiryRef = useRef();
    const cvvRef = useRef();

    const composedStyles = { ...DEFAULT_STYLE,  ...generalStyle };


    const cardNumberNavivation : CardNavigation = { next: goToNextField(expiryRef), previous: () => noop };
    const cardExpiryNavivation : CardNavigation = { next: goToNextField(cvvRef), previous: goToPreviousField(numberRef) };
    const cardCvvNavivation : CardNavigation = { next:     () =>  noop, previous: goToPreviousField(expiryRef) };

    useEffect(() => {

        const valid = Boolean(numberValidity.isValid && cvvValidity.isValid && expiryValidity.isValid);

        setIsValid(valid);

        const errors = setErrors({ isNumberValid: numberValidity.isValid, isCvvValid: cvvValidity.isValid, isExpiryValid: expiryValidity.isValid });

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
                navigation={ cardNumberNavivation }
                type='text'
                // eslint-disable-next-line react/forbid-component-props
                className={ numberValidity.isPossibleValid || numberValidity.isValid ? 'number valid' : 'number invalid' }
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
                navigation={ cardExpiryNavivation }
                type='text'
                // eslint-disable-next-line react/forbid-component-props
                className={ expiryValidity.isPossibleValid || expiryValidity.isValid ? 'expiry valid' : 'expiry invalid' }
                // eslint-disable-next-line react/forbid-component-props
                style={ inputStyle }
                allowNavigation={ true }
                placeholder={ placeholder.expiry ?? DEFAULT_PLACEHOLDERS.expiry }
                maxLength='7'
                onChange={ ({ maskedDate } : CardExpiryChangeEvent) => setExpiry(convertDateFormat(maskedDate)) }
                onValidityChange={ (expiryValidityity : FieldValidity) => setExpiryValidity({ ...expiryValidityity }) }
            />

            <CardCVV
                ref={ cvvRef }
                navigation={ cardCvvNavivation }
                type='text'
                cardType={ cardType }
                // eslint-disable-next-line react/forbid-component-props
                className={ cvvValidity.isPossibleValid || cvvValidity.isValid ? 'cvv valid' : 'cvv invalid' }
                // eslint-disable-next-line react/forbid-component-props
                style={ inputStyle }
                allowNavigation={ true }
                placeholder={ placeholder.cvv ?? DEFAULT_PLACEHOLDERS.cvv }
                maxLength={ getCvvLength(cardType) }
                onChange={ ({ cardCvv } : CardCvvChangeEvent) => setCvv(cardCvv) }
                onValidityChange={ (cvvValidityity : FieldValidity) => setCvvValidity({ ...cvvValidityity }) }
            />
        </Fragment>
    );
}

type CardNumberFieldProps = {|
    cspNonce : string,
    onChange : ({| value : string, valid : boolean |}) => void,
    styleObject : CardStyle,
   placeholder : {| number? : string, expiry? : string, cvv? : string  |}
|};

export function CardNumberField({ cspNonce, onChange, styleObject = {}, placeholder = {} } : CardNumberFieldProps) : mixed {
    const [ number, setNumber ] = useState('');
    const [ numberValidity, setNumberValidity ] = useState(true);
    const [ generalStyle, inputStyle ] = getStyles(styleObject);

    const composedStyles = { ...{ input: DEFAULT_INPUT_STYLE },  ...generalStyle };

    useEffect(() => {
        setNumberValidity(number);
        const valid = Boolean(number);
        const value = number;
        onChange({ value, valid });
    }, [ number ]);

    return (
        <Fragment>
            <style nonce={ cspNonce }>
                {styleToString(composedStyles)}
            </style>

            <CardNumber
                type='text'
                // eslint-disable-next-line react/forbid-component-props
                className={ numberValidity.isPossibleValid ? 'number valid' : 'number invalid' }
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
    onChange : ({| value : string, valid : boolean |}) => void,
    styleObject : CardStyle,
    placeholder : {| number? : string, expiry? : string, cvv? : string  |}
|};

export function CardExpiryField({ cspNonce, onChange, styleObject = {}, placeholder = {} } : CardExpiryFieldProps) : mixed {
    const [ expiry, setExpiry ] = useState('');
    const [ expiryValidity, setExpiryValidity ] = useState(true);
    const [ generalStyle, inputStyle ] = getStyles(styleObject);

    const composedStyles = { ...{ input: DEFAULT_INPUT_STYLE },  ...generalStyle };

    useEffect(() => {
        setExpiryValidity(expiry);
        const valid = Boolean(expiry);
        onChange({ value: expiry, valid });
    }, [ expiry ]);

    return (
        <Fragment>
            <style nonce={ cspNonce }>
                {styleToString(composedStyles)}
            </style>

            <CardExpiry
                type='text'
                // eslint-disable-next-line react/forbid-component-props
                className={ expiryValidity ? 'expiry valid' : 'expiry invalid' }
                // eslint-disable-next-line react/forbid-component-props
                style={ inputStyle }
                placeholder={ placeholder.expiry ?? DEFAULT_PLACEHOLDERS.expiry }
                maxLength='7'
                onChange={ ({ maskedDate } : CardExpiryChangeEvent) => setExpiry(maskedDate) }
                onValidityChange={ (expiryValidityity : boolean) => setExpiryValidity(expiryValidityity) }
            />
        </Fragment>
    );
}
type CardCvvFieldProps = {|
    cspNonce : string,
    onChange : ({| value : string, valid : boolean |}) => void,
    styleObject : CardStyle,
    placeholder : {| number? : string, expiry? : string, cvv? : string  |}
|};

export function CardCVVField({ cspNonce, onChange, styleObject = {}, placeholder = {} } : CardCvvFieldProps) : mixed {
    const [ cvv, setCvv ] = useState('');
    const [ cvvValidity, setCvvValidity ] = useState(true);
    const [ generalStyle, inputStyle ] = getStyles(styleObject);
    
    const composedStyles = { ...{ input: DEFAULT_INPUT_STYLE },  ...generalStyle };

    useEffect(() => {
        setCvvValidity(cvv);
        const valid = Boolean(cvv);
        onChange({ value: cvv, valid });
    }, [ cvv ]);

    return (
        <Fragment>
            <style nonce={ cspNonce }>
                {styleToString(composedStyles)}
            </style>

            <CardCVV
                type='text'
                // eslint-disable-next-line react/forbid-component-props
                className={ cvvValidity ? 'cvv valid' : 'cvv invalid' }
                // eslint-disable-next-line react/forbid-component-props
                style={ inputStyle }
                placeholder={ placeholder.cvv ?? DEFAULT_PLACEHOLDERS.cvv }
                maxLength='4'
                onChange={ ({ cardCvv } : CardCvvChangeEvent) => setCvv(cardCvv) }
                onValidityChange={ (cvvValidityity : boolean) => setCvvValidity(cvvValidityity) }
            />
        </Fragment>
    );
}
