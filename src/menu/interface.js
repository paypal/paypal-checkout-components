/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { memoize } from 'belter/src';

import type { MenuFlowType, MenuFlowProps } from '../types';

type SmartMenuProps = {|
    clientID : string,
    Menu : MenuFlowType
|};

type SmartMenu = {|
    display : (MenuFlowProps) => ZalgoPromise<void>
|};

export function renderSmartMenu({ clientID, Menu } : SmartMenuProps) : SmartMenu {
    const { renderTo, updateProps, show, hide } = Menu({ clientID });

    const render = memoize(() => {
        return renderTo(window.xprops.getParent(), '#smart-menu');
    });

    const display = ({ choices, verticalOffset }) => {
        return render().then(() => {
            return updateProps({
                clientID,
                verticalOffset,
                choices
            });
        }).then(() => {
            return show();
        });
    };

    hide();
    render();

    return { display };
}
