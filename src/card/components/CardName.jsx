/* @flow */
/** @jsx h */

import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

import { validateCardName, defaultNavigation, defaultInputState, navigateOnKeyDown, exportMethods } from '../lib';
import type { CardNameChangeEvent, CardNavigation, FieldValidity, InputState, InputEvent } from '../types';

type CardNameProps = {|
    name : string,
    type : string,
    state? : InputState,
    placeholder : string,
    style : Object,
    maxLength : string,
    navigation : CardNavigation,
    onChange : (nameEvent : CardNameChangeEvent) => void,
    onFocus : (event : InputEvent) => void,
    onBlur : (event : InputEvent) => void,
    allowNavigation : boolean,
    onValidityChange? : (numberValidity : FieldValidity) => void
|};


export function CardName(
    {
        name = 'name',
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
        onValidityChange
    } : CardNameProps
) : mixed {
    const [ inputState, setInputState ] : [ InputState, (InputState | InputState => InputState) => InputState ] = useState({ ...defaultInputState, ...state });
    const { inputValue, keyStrokeCount, isValid, isPotentiallyValid } = inputState;

    const nameRef = useRef()

    useEffect(() => {
        exportMethods(nameRef);
    }, []);

    useEffect(() => {
        const validity = validateCardName(inputValue);
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

    const setNameValue : (InputEvent) => void = (event : InputEvent) : void => {
        const { value  } = event.target;

        setInputState({
            ...inputState,
            inputValue:       value,
            maskedInputValue: value,
            keyStrokeCount:   keyStrokeCount + 1
        });

        onChange({ event, cardName: value  });
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
            inputmode='text'
            ref={ nameRef }
            type={ type }
            className="card-field-name"
            placeholder={ placeholder }
            value={ inputValue }
            style={ style }
            maxLength={ maxLength }
            onKeyDown={ onKeyDownEvent }
            onInput={ setNameValue }
            onFocus={ onFocusEvent }
            onBlur={ onBlurEvent }
        />
    );
}
