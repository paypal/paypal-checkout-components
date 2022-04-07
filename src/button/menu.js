/* @flow */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';

import type { MenuChoices, MenuFlowType, MenuComponentInstance } from '../types';
import type { Payment } from '../payment-flows';

import type { ButtonProps, Components } from './props';
import { enableLoadingSpinner, disableLoadingSpinner } from './dom';

type SmartMenuProps = {|
    containerUID : string,
    clientID : string,
    Menu : MenuFlowType,
    onFocus? : () => void,
    onFocusFail? : () => void
|};

let menu;

export function renderButtonSmartMenu({ containerUID, clientID, Menu } : SmartMenuProps) : MenuComponentInstance {
    if (menu) {
        return menu;
    }

    const newMenu = Menu({ clientID });

    newMenu.hide();
    newMenu.renderTo(window.xprops.getParent(), `#${ containerUID } #smart-menu`);

    menu = newMenu;

    return menu;
}

export function prerenderButtonSmartMenu({ props, components } : {| props : ButtonProps, components : Components |}) {
    const { clientID, uid: containerUID } = props;
    const { Menu } = components;

    if (!clientID) {
        return;
    }
    
    renderButtonSmartMenu({ containerUID, clientID, Menu });
}

export function clearButtonSmartMenu() {
    menu = null;
}

type ButtonMenuProps = {|
    payment : Payment,
    props : ButtonProps,
    components : Components,
    choices : MenuChoices
|};

export function showButtonSmartMenu({ props, payment, components, choices } : ButtonMenuProps) : ZalgoPromise<void> {
    const { clientID, uid: containerUID } = props;
    const { button, menuToggle } = payment;
    const { Menu } = components;

    if (!clientID) {
        throw new Error(`Can not render menu without client id`);
    }

    const smartMenu = menu || renderButtonSmartMenu({ containerUID, clientID, Menu });
    menu = smartMenu;
    
    const getVerticalOffset = () => button.getBoundingClientRect().bottom;
    const loadingTimeout = setTimeout(() => enableLoadingSpinner(button), 50);

    const updateProps = () => {
        return smartMenu.updateProps({
            clientID,
            choices,
            verticalOffset: getVerticalOffset(),
            // eslint-disable-next-line no-use-before-define
            onFocusFail,
            // eslint-disable-next-line no-use-before-define
            onBlur
        });
    };

    window.addEventListener('resize', updateProps);

    const onBlur = () => {
        smartMenu.hide();
        window.removeEventListener('resize', updateProps);
    };

    const onFocusFail = () => {
        if (menuToggle) {
            const blur = () => {
                menuToggle.removeEventListener('blur', blur);
                onBlur();
            };
    
            menuToggle.addEventListener('blur', blur);
        }
    };

    return updateProps().then(() => {
        return smartMenu.show();
    }).then(() => {
        disableLoadingSpinner(button);
    }).finally(() => {
        clearTimeout(loadingTimeout);
    });
}

