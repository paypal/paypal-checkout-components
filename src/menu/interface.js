/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

import type { ProxyWindow } from '../types';

type SmartMenuProps = {|
    clientID : string
|};

type SmartMenu = {|
    display : ({
        verticalOffset : number,
        choices : $ReadOnlyArray<{|
            id : string,
        label : string,
        popup? : {
            width : number,
            height : number
        }
            |}>,
        onChoose : ({|
            id : string,
            win : ?ProxyWindow
                |}) => void
    }) => ZalgoPromise<void>
|};

export function renderSmartMenu({ clientID } : SmartMenuProps) : SmartMenu {

    const { Menu } = window.paypal;

    if (!Menu) {
        throw new Error(`Menu component not found`);
    }

    const { renderTo, updateProps, show, hide } = window.paypal.Menu({
        clientID,
        onBlur: () => hide()
    });

    hide();

    const renderPromise = renderTo(window.xprops.getParent(), '#smart-menu');

    const display = ({ choices, verticalOffset, onChoose }) => {
        return renderPromise.then(() => {
            return updateProps({
                verticalOffset,
                choices,
                onChoose: ({ id, win }) => {
                    hide();
                    return onChoose({ id, win });
                }
            });
        }).then(() => {
            return show();
        });
    };

    return { display };
}
