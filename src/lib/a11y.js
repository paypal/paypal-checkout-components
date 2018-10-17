/* @flow */

import { getElements } from './dom';

export function getFocusableElements(context : HTMLElement) : Array<HTMLElement> {
    return getElements(context.querySelectorAll('button, iframe, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
}

/**
 * Removes tabIndex from all tab-able elements in the `context`.
 * Used to control interactable areas for those using keyboards
 * to navigate.
 */

export function restrictFocus(context : ?HTMLElement) : { release : Function } {
    let tabIndexes = [];

    if (!context) {
        throw new Error('Can not restrict focus on null element');
    }

    const focusableElements = getFocusableElements(context);

    if (document.activeElement) {
        document.activeElement.blur();
    }

    focusableElements.forEach((element, i) => {
        tabIndexes[i] = element.hasAttribute('tabIndex') ? element.tabIndex : null;
        element.tabIndex = -1;
    });

    return {
        release() {
            focusableElements.forEach((element, i) => {
                if (tabIndexes[i] !== null) {
                    element.tabIndex = tabIndexes[i];
                } else {
                    element.removeAttribute('tabIndex');
                }
            });
        }
    };
}
