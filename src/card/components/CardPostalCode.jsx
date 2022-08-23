/* @flow */
/** @jsx h */

import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

import { validatePostalCode, defaultNavigation, defaultInputState, navigateOnKeyDown, exportMethods } from '../lib';
import type { CardPostalCodeChangeEvent, CardNavigation, FieldValidity, InputState, InputEvent } from '../types';

type CardPostalCodeProps = {|
    name : string,
    type : string,
    state? : InputState,
    placeholder : string,
    style : Object,
    maxLength : number,
    navigation : CardNavigation,
    onChange : (expiryEvent : CardPostalCodeChangeEvent) => void,
    onFocus? : (event : InputEvent) => void,
    onBlur? : (event : InputEvent) => void,
    allowNavigation : boolean,
    onValidityChange? : (numberValidity : FieldValidity) => void,
    minLength: number
|};

export function CardPostalCode(
    {
        name = 'postal',
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
        minLength
    } : CardPostalCodeProps
) : mixed {
    const [ inputState, setInputState ] : [ InputState, (InputState | InputState => InputState) => InputState ] = useState({ ...defaultInputState, ...state });
    const { inputValue, keyStrokeCount, isValid, isPotentiallyValid } = inputState;

    const postalCodeRef = useRef();

    useEffect(() => {
        exportMethods(postalCodeRef);
    }, []);

    useEffect(() => {
        const validity = validatePostalCode(inputValue, minLength);
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

    const setPostalCodeValue : (InputEvent) => void = (event : InputEvent) : void => {
        const { value } = event.target;

        setInputState({
            ...inputState,
            inputValue:       value,
            keyStrokeCount:   keyStrokeCount + 1
        });

        onChange({ event, cardPostalCode: value });

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
            setInputState((newState) => ({ ...newState, isPotentiallyValid: true }));
        }
    };

    const onBlurEvent : (InputEvent) => void = (event : InputEvent) : void => {
        if (typeof onBlur === 'function') {
            onBlur(event);
        }
        if (!isValid) {
            setInputState((newState) => ({ ...newState, isPotentiallyValid: false, contentPasted: false }));
        }
    };

    return (
        <input
            name={ name }
            inputmode='numeric'
            ref={ postalCodeRef }
            type={ type }
            className='card-field-postal-code'
            placeholder={ placeholder }
            value={ inputValue }
            style={ style }
            maxLength={ maxLength }
            onKeyDown={ onKeyDownEvent }
            onInput={ setPostalCodeValue }
            onFocus={ onFocusEvent }
            onBlur={ onBlurEvent }
            minLength={ minLength }
        />
    )
}
