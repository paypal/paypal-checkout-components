/* @flow */
/** @jsx h */

import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import {
    formatDate,
    checkExpiry,
    removeNonDigits,
    removeDateMask,
    defaultNavigation,
    defaultInputState,
    navigateOnKeyDown,
    moveCursor
} from '../lib';
import type { CardExpiryChangeEvent, CardNavigation, FieldValidity, InputState, InputEvent } from '../types';

type CardExpiryProps = {|
    name : string,
    autocomplete? : string,
    ref : () => void,
    type : string,
    state? : InputState,
    className : string,
    placeholder : string,
    style : Object,
    maxLength : string,
    navigation : CardNavigation,
    allowNavigation : boolean,
    onChange : (expiryEvent : CardExpiryChangeEvent) => void,
    onFocus? : (event : InputEvent) => void,
    onBlur? : (event : InputEvent) => void,
    onValidityChange? : (numberValidity : FieldValidity) => void
|};


export function CardExpiry(
    {
        name = 'expiry',
        autocomplete = 'cc-exp',
        navigation = defaultNavigation,
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
        allowNavigation = false
    } : CardExpiryProps
) : mixed {
    const [ inputState, setInputState ] : [ InputState, (InputState | InputState => InputState) => InputState ] = useState({ ...defaultInputState, ...state });
    const { inputValue, maskedInputValue, keyStrokeCount, isValid, isPotentiallyValid, contentPasted } = inputState;


    useEffect(() => {
        const validity = checkExpiry(maskedInputValue);
        setInputState(newState => ({ ...newState, ...validity }));
    }, [ inputValue, maskedInputValue ]);

    useEffect(() => {
        if (typeof onValidityChange === 'function') {
            onValidityChange({ isValid, isPotentiallyValid });
        }

        if (allowNavigation && maskedInputValue && isValid) {
            navigation.next();
        }
    }, [ isValid, isPotentiallyValid ]);

    const setDateMask : (InputEvent) => void = (event : InputEvent) : void => {
        const { value : rawValue, selectionStart, selectionEnd } = event.target;
        const value = removeNonDigits(rawValue);
        const mask = formatDate(value, rawValue);

        let startCursorPosition = selectionStart;
        let endCursorPosition = selectionEnd;

        if (mask.trim().slice(-1) === '/' || contentPasted) {
            startCursorPosition = mask.length;
            endCursorPosition = mask.length;
        }

        moveCursor(event.target, startCursorPosition, endCursorPosition);

        setInputState({
            ...inputState,
            inputValue:       rawValue,
            maskedInputValue: mask,
            contentPasted:    false,
            keyStrokeCount:   keyStrokeCount + 1
        });

        onChange({ event, date: value, maskedDate: mask });

    };

    const onKeyDownEvent : (InputEvent) => void = (event : InputEvent) : void => {
        const { target: { value }, key } = event;

        const last = value.trim().slice(-1);
        if (last === '/' && key === 'Backspace') {
            const month = removeDateMask(value);
            setInputState({ ...inputState, inputValue: value, maskedInputValue: month });
        }

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

    const onPasteEvent : (InputEvent) => void = () : void => {
        setInputState((newState) => ({ ...newState,  contentPasted: true }));
    };

    return (
        <input
            name={ name }
            autocomplete={ autocomplete }
            inputmode='numeric'
            ref={ ref }
            type={ type }
            className={ className }
            placeholder={ placeholder }
            value={ maskedInputValue }
            style={ style }
            maxLength={ maxLength }
            onKeyDown={ onKeyDownEvent }
            onInput={ setDateMask }
            onFocus={ onFocusEvent }
            onBlur={ onBlurEvent }
            onPaste={ onPasteEvent }
        />
    );
}
