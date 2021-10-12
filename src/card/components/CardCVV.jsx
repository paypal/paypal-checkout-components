/* @flow */
/** @jsx h */

import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { checkCVV, removeNonDigits, defaultNavigation, defaultInputState, navigateOnKeyDown } from '../lib';
import type { CardType, CardCvvChangeEvent, CardNavigation, FieldValidity, InputState, InputEvent } from '../types';

type CardCvvProps = {|
    name : string,
    ref : () => void,
    type : string,
    state? : InputState,
    className : string,
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
        navigation = defaultNavigation,
        allowNavigation = false,
        state,
        ref,
        type,
        className,
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
    const { inputValue, keyStrokeCount, isValid, isPossibleValid } = inputState;

    useEffect(() => {
        const validity = checkCVV(inputValue, cardType);
        setInputState(newState => ({ ...newState, ...validity }));
    }, [ inputValue ]);

    useEffect(() => {
        if (typeof onValidityChange === 'function') {
            onValidityChange({ isValid, isPossibleValid });
        }
        if (allowNavigation && inputValue && isValid) {
            navigation.next();
        }
    }, [ isValid, isPossibleValid ]);

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
            setInputState({ ...inputState, isPossibleValid: true });
        }
    };

    const onBlurEvent : (InputEvent) => void = (event : InputEvent) : void => {
        if (typeof onBlur === 'function') {
            onBlur(event);
        }
        if (!isValid) {
            setInputState({ ...inputState, isPossibleValid: false });
        }
    };

    return (
        <input
            name={ name }
            ref={ ref }
            type={ type }
            className={ className }
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
