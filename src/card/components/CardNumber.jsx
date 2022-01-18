/* @flow */
/** @jsx h */

import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';


import {
    maskCard,
    checkForNonDigits,
    removeNonDigits,
    detectCardType,
    checkCardNumber,
    moveCursor,
    defaultNavigation,
    defaultInputState,
    navigateOnKeyDown,
    maskValidCard
} from '../lib';
import type {
    CardNumberChangeEvent,
    FieldValidity,
    CardNavigation,
    InputState,
    CardType,
    InputEvent
} from '../types';
import {  DEFAULT_CARD_TYPE } from '../constants';

// Helper method to check if navigation to next field should be allowed
function validateNavigation({ allowNavigation,  inputState } : {| allowNavigation : boolean, inputState : InputState |}) : boolean {
    const { inputValue, isValid, maskedInputValue, cursorStart, contentPasted } = inputState;
    return Boolean(allowNavigation && inputValue && isValid && (maskedInputValue.length === cursorStart || contentPasted));
}

type CardNumberProps = {|
    name : string,
    autocomplete? : string,
    ref : () => void,
    type : string,
    state? : InputState,
    className : string,
    placeholder : string,
    style : Object,
    maxLength : string,
    navigation? : CardNavigation,
    allowNavigation? : boolean,
    onChange : (numberEvent : CardNumberChangeEvent) => void,
    onFocus? : (event : InputEvent) => void,
    onBlur? : (event : InputEvent) => void,
    onValidityChange? : (numberValidity : FieldValidity) => void
|};

export function CardNumber(
    {
        name = 'number',
        autocomplete = 'cc-number',
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
        onValidityChange
    } : CardNumberProps
) : mixed {
    const [ cardType, setCardType ] : [ CardType, (CardType) => CardType ] = useState(DEFAULT_CARD_TYPE);
    const [ inputState, setInputState ] : [ InputState, (InputState | InputState => InputState) => InputState ] = useState({ ...defaultInputState, ...state });

    const { inputValue, maskedInputValue, cursorStart, cursorEnd, keyStrokeCount, isValid, isPotentiallyValid, contentPasted } = inputState;

    useEffect(() => {
        const validity = checkCardNumber(inputValue, cardType);
        setInputState(newState => ({ ...newState, ...validity }));
    }, [ inputValue, maskedInputValue ]);


    useEffect(() => {
        if (typeof onValidityChange === 'function') {
            onValidityChange({ isValid, isPotentiallyValid });
        }

        if (validateNavigation({ allowNavigation, inputState })) {
            navigation.next();
        }

    }, [ isValid, isPotentiallyValid ]);


    const setValueAndCursor : (InputEvent) => void = (event : InputEvent) : void => {
        const { value: rawValue, selectionStart, selectionEnd } = event.target;
        const value = removeNonDigits(rawValue);
        const detectedCardType = detectCardType(value);
        const maskedValue = maskCard(value);

        let startCursorPosition = selectionStart;
        let endCursorPosition = selectionEnd;
        
        if (checkForNonDigits(rawValue)) {
            startCursorPosition = cursorStart;
            endCursorPosition = cursorEnd;
        }
        
        if (contentPasted) {
            startCursorPosition = maskedValue.length;
            endCursorPosition  = maskedValue.length;
        } else if (maskedValue.length > maskedInputValue.length && maskedValue[selectionStart - 1] === ' ') {
            startCursorPosition += 1;
            endCursorPosition += 1;
        }

        moveCursor(event.target, startCursorPosition, endCursorPosition);

        setCardType(detectedCardType);
        setInputState({
            ...inputState,
            inputValue:       value,
            maskedInputValue: maskedValue,
            cursorStart:      startCursorPosition,
            cursorEnd:        endCursorPosition,
            contentPasted:    false,
            keyStrokeCount:   keyStrokeCount + 1
        });

        onChange({ event, cardNumber: value, cardMaskedNumber: maskedValue, cardType: detectedCardType });
    };

    const onFocusEvent : (InputEvent) => void = (event : InputEvent) : void => {
        if (typeof onFocus === 'function') {
            onFocus(event);
        }

        const maskedValue = maskCard(inputValue);
        const updatedState = { ...inputState, maskedInputValue: maskedValue };
        if (!isValid) {
            updatedState.isPotentiallyValid = true;
        }

        setInputState((newState) => ({ ...newState, ...updatedState }));
    };

    const onBlurEvent : (InputEvent) => void = (event : InputEvent) : void => {
        const updatedState = { maskedInputValue, isPotentiallyValid, contentPasted: false };

        if (isValid) {
            updatedState.maskedInputValue = maskValidCard(maskedInputValue);
        } else {
            updatedState.isPotentiallyValid = false;
        }

        if (typeof onBlur === 'function') {
            onBlur(event);
        }

        setInputState((newState) => ({ ...newState, ...updatedState }));
        

    };

    const onKeyDownEvent : (InputEvent) => void = (event : InputEvent) : void => {
        if (allowNavigation) {
            navigateOnKeyDown(event, navigation);
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
            onInput={ setValueAndCursor }
            onFocus={ onFocusEvent }
            onBlur={ onBlurEvent }
            onKeyDown={ onKeyDownEvent }
            onPaste={ onPasteEvent }
        />
    );
}
