/* @flow */

import { noop } from '@krakenjs/belter';

import type { CardNavigation, InputEvent } from '../types';

export const defaultNavigation : CardNavigation = {
    next:     () => noop,
    previous: () => noop
};

// Move cursor within a field
export function moveCursor(element : HTMLInputElement, start : number, end? : number) : void {
    window.requestAnimationFrame(() => {
        element.selectionStart = start;
        element.selectionEnd = end ?? start;
    });
}

// Navigation helper to go to the next field putting the cursor at the start
export function goToNextField(ref : {| current : {| base : HTMLInputElement |} |}) : () => void {
    return () => {
        moveCursor(ref.current.base, 0);
        setTimeout(() => ref.current.base.focus());
    };
}

// Navigation helper to go to the previous field putting the curser at the end
export function goToPreviousField(ref : {| current : {| base : HTMLInputElement |} |}) : () => void {
    return () => {
        const { value } = ref.current.base;

        if (value) {
            const valueLength = value.length;
            moveCursor(ref.current.base, valueLength);
        }
        setTimeout(() => ref.current.base.focus());
    };
}

// Navigate between fields using the arrow keys and/or the backspace
export function navigateOnKeyDown(event : InputEvent, navigation : CardNavigation) : void {
    const { target: { value, selectionStart, selectionEnd }, key } = event;

    if (selectionStart === 0 && (value.length === 0 || value.length !== selectionEnd)  && [ 'Backspace', 'ArrowLeft' ].includes(key)) {
        navigation.previous();
    }

    if (selectionStart === value.length && [ 'ArrowRight' ].includes(key)) {
        navigation.next();
    }
}

// Safari (both iOS and Desktop) has an unconvential behavior,
// where it won't let an iframe that includes an input get
// focus programmatically from outside of the input.
// Big props to the devs at Stripe that figured out
// you run this selection range hack to force the focus back
// onto the input.
function applyFocusWorkaroundForSafari (input : HTMLInputElement) {
    const inputIsEmptyInitially = input.value === '';

    // Safari can't set selection if the input is empty
    if (inputIsEmptyInitially) {
        input.value = ' ';
    }

    const start = input.selectionStart;
    const end = input.selectionEnd;

    input.setSelectionRange(0, 0);
    input.setSelectionRange(start, end);

    if (inputIsEmptyInitially) {
        input.value = '';
    }
}

// With some browsers, when the focus transitions to the iframe,
// the browser will pass the focus on to the first input field.
// This is to handle the case when that doesn't happen.
// In this case the iframe itself will receive focus and this will need to shift the focus to the input field.
export function autoFocusOnFirstInput(input? : HTMLInputElement) {
    if (!input) {
        return;
    }

    let timeoutID = null;

    // Listen for when the iframe gets focus.
    window.addEventListener('focus', () => {
        // If the iframe gets focus, then wait for the next event loop to set the focus on the input field.
        // This allows the below focusin listener to prevent shifting the focus if the input already has the focus.
        timeoutID = setTimeout(() => {
            timeoutID = null;

            applyFocusWorkaroundForSafari(input);

            // for Safari, setting the selection range is enough to give
            // it focus, but Firefox requires an explicit focus call.
            // Also, just calling `focus` on Safari does not work at all
            input.focus();
        });
    });

    // Listen for when the input field gets focus.
    window.addEventListener('focusin', (event) => {
        // If there is a set timeout waiting to happen, then clear the timeout.
        // This will prevent the above from unnecessarily setting the focus.
        if (timeoutID && event.target instanceof HTMLInputElement) {
            clearTimeout(timeoutID);
            timeoutID = null;
        }
    });
}
