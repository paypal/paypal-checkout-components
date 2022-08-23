/* @flow */
/** @jsx h */

import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

import { validateCVV, removeNonDigits, defaultNavigation, defaultInputState, navigateOnKeyDown, exportMethods } from '../lib';
import type { CardType, CardCvvChangeEvent, CardNavigation, FieldValidity, InputState, InputEvent } from '../types';

type CardCvvProps = {|
    name : string,
    autocomplete? : string,
    type : string,
    state? : InputState,
    placeholder : string,
    style : Object,
    maxLength : string,
    cardType : CardType,
    navigation : CardNavigation,
    onChange : (cvvEvent : CardCvvChangeEvent) => void,
    onFocus : (event : InputEvent) => void,
    onBlur : (event : InputEvent) => void,
    allowNavigation : boolean,
    onValidityChange? : (numberValidity : FieldValidity) => void
|};


export function CardCVV(
    {
        name = 'cvv',
        autocomplete = 'cc-csc',
        navigation = defaultNavigation,
        allowNavigation = false,
        state,
        type,
        placeholder,
        style,
        maxLength,
        onChange,
        onFocus,
        onBlur,
        onValidityChange,
        cardType
    } : CardCvvProps
) : mixed {
    const [ inputState, setInputState ] : [ InputState, (InputState | InputState => InputState) => InputState ] = useState({ ...defaultInputState, ...state });
    const { inputValue, keyStrokeCount, isValid, isPotentiallyValid } = inputState;

    const cvvRef = useRef()

    useEffect(() => {
        if (!allowNavigation) {
            exportMethods(cvvRef);
        }
    }, []);

    useEffect(() => {
        const validity = validateCVV(inputValue, cardType);
        setInputState(newState => ({ ...newState, ...validity }));
    }, [ inputValue ]);

    useEffect(() => {
        if (typeof onValidityChange === 'function') {
            onValidityChange({ isValid, isPotentiallyValid });
        }
        if (allowNavigation && inputValue && isValid) {
            navigation.next();
        }
    }, [ isValid, isPotentiallyValid ]);

    const setCvvValue : (InputEvent) => void = (event : InputEvent) : void => {
        const { value : rawValue } = event.target;
        const value = removeNonDigits(rawValue);

        setInputState({
            ...inputState,
            inputValue:       value,
            maskedInputValue: value,
            keyStrokeCount:   keyStrokeCount + 1
        });

        onChange({ event, cardCvv: value  });
    };

    const onKeyDownEvent : (InputEvent) => void = (event : InputEvent) : void => {
        if (allowNavigation) {
            navigateOnKeyDown(event, navigation);
        }
    };

    const onFocusEvent : (InputEvent) => void = (event : InputEvent) : void => {
        if (typeof onFocus === 'function') {
            onFocus(event);
        }
        if (!isValid) {
            setInputState(newState => ({ ...newState, isPotentiallyValid: true }));
        }
    };

    const onBlurEvent : (InputEvent) => void = (event : InputEvent) : void => {
        if (typeof onBlur === 'function') {
            onBlur(event);
        }
        if (!isValid) {
            setInputState(newState => ({ ...newState, isPotentiallyValid: false }));
        }
    };

    return (
        <input
            name={ name }
            autocomplete={ autocomplete }
            inputmode='numeric'
            ref={ cvvRef }
            type={ type }
            className='card-field-cvv'
            placeholder={ placeholder }
            value={ inputValue }
            style={ style }
            maxLength={ maxLength }
            onKeyDown={ onKeyDownEvent }
            onInput={ setCvvValue }
            onFocus={ onFocusEvent }
            onBlur={ onBlurEvent }
        />
    );
}
