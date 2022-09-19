/* @flow */
/** @jsx h */

import { h, Fragment } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import cardValidator from 'card-validator';

import { getPostRobot } from '../../lib';
import {
    addGapsToCardNumber,
    checkForNonDigits,
    removeNonDigits,
    detectCardType,
    checkCardEligibility,
    moveCursor,
    defaultNavigation,
    defaultInputState,
    navigateOnKeyDown,
    maskValidCard,
    exportMethods
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

import { Icon } from './Icons';

// Helper method to check if navigation to next field should be allowed
function validateNavigation({ allowNavigation,  inputState } : {| allowNavigation : boolean, inputState : InputState |}) : boolean {
    const { inputValue, isValid, maskedInputValue, cursorStart, contentPasted } = inputState;
    return Boolean(allowNavigation && inputValue && isValid && (maskedInputValue.length === cursorStart || contentPasted));
}

function getIconId(type) : string {
    const iconId = `icon-${type}`;
    const element = document.getElementById(iconId);
    if (element) {
        return iconId;
    }
    return 'icon-unknown';
}

type CardNumberProps = {|
    name : string,
    autocomplete? : string,
    type : string,
    state? : InputState,
    placeholder : string,
    style : Object,
    navigation? : CardNavigation,
    allowNavigation? : boolean,
    onChange : (numberEvent : CardNumberChangeEvent) => void,
    onFocus? : (event : InputEvent) => void,
    onBlur? : (event : InputEvent) => void,
    onValidityChange? : (numberValidity : FieldValidity) => void,
    onEligibilityChange? : (isCardEligible : boolean) => void
|};

export function CardNumber(
    {
        name = 'number',
        autocomplete = 'cc-number',
        navigation = defaultNavigation,
        allowNavigation = false,
        state,
        type,
        placeholder,
        style,
        onChange,
        onFocus,
        onBlur,
        onValidityChange,
        onEligibilityChange
    } : CardNumberProps
) : mixed {
    const [ attributes, setAttributes ] : [ Object, (Object) => Object ] = useState({ placeholder });
    const [ cardType, setCardType ] : [ CardType, (CardType) => CardType ] = useState(DEFAULT_CARD_TYPE);
    const [ maxLength, setMaxLength ] : [ number, (number) => number ] = useState(24);
    const [ inputState, setInputState ] : [ InputState, (InputState | InputState => InputState) => InputState ] = useState({ ...defaultInputState, ...state });
    const { inputValue, maskedInputValue, cursorStart, cursorEnd, keyStrokeCount, isValid, isPotentiallyValid, contentPasted } = inputState;

    const numberRef = useRef()

    useEffect(() => {
        if (!allowNavigation) {
            exportMethods(numberRef, setAttributes);
        }
    }, []);

    useEffect(() => {
        const validity = cardValidator.number(inputValue);
        setInputState(newState => ({ ...newState, ...validity }));
    }, [ inputValue, maskedInputValue ]);

    useEffect(() => {
        if (typeof onEligibilityChange === 'function') {
            onEligibilityChange(checkCardEligibility(inputValue, cardType));
        }
        if (cardType && cardType.lengths) {
            // get the maximum card length for the given card type
            const cardMaxLength = cardType.lengths.reduce((previousValue, currentValue) => {
                return Math.max(previousValue, currentValue);
            });
            if (cardMaxLength) {
                // set maxLength to the maximum card length, plus the number of spaces for the gaps
                setMaxLength(cardMaxLength + (cardType.gaps?.length ?? 0));
            }
        }
        // communicate card type change to sibling components
        const postRobot = getPostRobot();
        if (postRobot) {
            const frames = window.parent.frames;
            for (const frame of frames) {
                postRobot.send(frame, 'cardTypeChange', cardType, {
                    domain: window.location.origin,
                    fireAndForget: true
                });
            }
        }
    }, [ cardType ]);

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
        const maskedValue = addGapsToCardNumber(value);

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

        onChange({ event, cardNumber: value, cardMaskedNumber: maskedValue });
    };

    const onFocusEvent : (InputEvent) => void = (event : InputEvent) : void => {
        if (typeof onFocus === 'function') {
            onFocus(event);
        }

        const element = numberRef?.current;
        if (element) {
            element.classList.add('display-icon');
        }

        const maskedValue = addGapsToCardNumber(inputValue);
        const updatedState = { ...inputState, maskedInputValue: maskedValue, displayCardIcon: true };
        if (!isValid) {
            updatedState.isPotentiallyValid = true;
        }

        setInputState((newState) => ({ ...newState, ...updatedState }));
    };

    const onBlurEvent : (InputEvent) => void = (event : InputEvent) : void => {
        const updatedState = { maskedInputValue, isPotentiallyValid, contentPasted: false, displayCardIcon: inputState.inputValue.length > 0 };

        const element = numberRef?.current;
        if (element) {
            if (inputState.inputValue.length > 0) {
                element.classList.add('display-icon');
            } else {
                element.classList.remove('display-icon');
            }
        }

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
        <Fragment>
            <input
                name={ name }
                autocomplete={ autocomplete }
                inputmode='numeric'
                ref={ numberRef }
                type={ type }
                className='card-field-number'
                value={ maskedInputValue }
                style={ style }
                maxLength={ maxLength }
                onInput={ setValueAndCursor }
                onFocus={ onFocusEvent }
                onBlur={ onBlurEvent }
                onKeyDown={ onKeyDownEvent }
                onPaste={ onPasteEvent }
                { ...attributes }
            />
            <Icon iconId={ getIconId(cardType.type) } iconClass="card-icon" />
        </Fragment>
    );
}
