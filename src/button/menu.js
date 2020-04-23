/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

import type { MenuChoices } from '../types';
import type { Payment } from '../payment-flows';
import { renderSmartMenu } from '../menu/interface';

import type { ButtonProps, Components } from './props';
import { enableLoadingSpinner, disableLoadingSpinner } from './dom';

type ButtonDropdownProps = {|
    payment : Payment,
    props : ButtonProps,
    components : Components,
    choices : MenuChoices
|};

let smartMenu;

export function prerenderMenu({ props, components } : {| props : ButtonProps, components : Components |}) {
    const { clientID } = props;
    const { Menu } = components;

    if (!clientID) {
        return;
    }
    
    smartMenu = smartMenu || renderSmartMenu({ clientID, Menu });
}

export function renderMenu({ props, payment, components, choices } : ButtonDropdownProps) : ZalgoPromise<void> {
    const { clientID } = props;
    const { button } = payment;
    const { Menu } = components;

    if (!clientID) {
        throw new Error(`Can not render menu without client id`);
    }

    smartMenu = smartMenu || renderSmartMenu({ clientID, Menu });

    const verticalOffset = button.getBoundingClientRect().bottom;
    const loadingTimeout = setTimeout(() => enableLoadingSpinner(button), 50);

    return smartMenu.display({
        clientID,
        choices,
        verticalOffset
    }).then(() => {
        disableLoadingSpinner(button);
    }).finally(() => {
        clearTimeout(loadingTimeout);
    });
}

export function clearSmartMenu() {
    smartMenu = null;
}
