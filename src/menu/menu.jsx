/* @flow */
/** @jsx h */

import type { CrossDomainWindowType } from 'cross-domain-utils/src';
import { h, Fragment, type Node } from 'preact';

import { openPopup } from '../ui';

import { useAutoFocus } from './hooks';

type MenuProps = {|
    cspNonce : string,
    verticalOffset : number,
    choices : $ReadOnlyArray<{|
        id : string,
        label : string,
        popup? : {|
            width : number,
            height : number
        |}
    |}>,
    onChoose : ({| id : string, win? : ?CrossDomainWindowType |}) => void,
    onBlur : () => void
|};

export function Menu({ choices, onChoose, onBlur, cspNonce, verticalOffset } : MenuProps) : Node {

    const autoFocus = useAutoFocus();

    const selectChoice = (choice) => {
        let win;

        if (choice.popup) {
            win = openPopup({
                width:  choice.popup.width,
                height: choice.popup.height
            });
        }

        return onChoose({ id: choice.id, win });
    };

    return (
        <Fragment>
            <style nonce={ cspNonce }>
                {`
                    .menu {
                        width: 100%;
                        z-index: 5000;
                        background: white;
                        border-radius: 3px;
                        font-family: Helvetica, sans-serif;
                        font-size: 14px;
                        letter-spacing: 0.5px;
                        box-shadow: 0px 0px 3px 1px rgba(222,222,222,1);
                        outline-style: none;
                        user-select: none;
                        text-align: center;
                        margin-top: ${ verticalOffset }px;
                    }
                    
                    .menu-item {
                        border-top: 2px solid rgba(230, 230, 230, 0.5);;
                        padding: 14px 18px;
                        color: #0070ba;
                        cursor: pointer;
                        line-height: 18px;
                    }
                    
                    .menu-item:first-child {
                        border-top: none;
                    }
                    
                    .menu-item:hover {
                        background: #fcfcfc;
                        text-decoration: underline;
                    }
                `}
            </style>

            <div class='menu' tabIndex='0' onBlur={ onBlur } ref={ autoFocus }>
                {
                    choices.map(choice => {
                        return (
                            <div class='menu-item' onClick={ () => selectChoice(choice) }>
                                { choice.label }
                            </div>
                        );
                    })
                }
            </div>
        </Fragment>
    );
}
