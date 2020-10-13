/* @flow */
/** @jsx h */

import type { CrossDomainWindowType } from 'cross-domain-utils/src';
import { h, Fragment, Node } from 'preact';

import { openPopup } from '../ui';

import { useAutoFocus } from './hooks';

type MenuProps = {|
    cspNonce : string,
    verticalOffset : number,
    choices : $ReadOnlyArray<{|
        label : string,
        popup? : {|
            width : number,
            height : number
        |},
        onSelect : ({| win? : ?CrossDomainWindowType |}) => void
    |}>,
    onBlur : () => void,
    onFocus : () => void,
    onFocusFail : () => void
|};

export function Menu({ choices, onBlur, cspNonce, verticalOffset, onFocus, onFocusFail } : MenuProps) : typeof Node {

    const autoFocus = useAutoFocus({ onFocus, onFocusFail });

    const selectChoice = (choice) => {
        let win;

        if (choice.popup) {
            win = openPopup({
                width:  choice.popup.width,
                height: choice.popup.height
            });
        }

        return choice.onSelect({ win });
    };

    return (
        <Fragment>
            <style nonce={ cspNonce }>
                {`
                    .menu {
                        width: 100%;
                        z-index: 5000;
                        background: white;
                        border-radius: 0 0 3px 3px;
                        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                        letter-spacing: 0.5px;
                        box-shadow: 0px 0px 3px 1px rgba(222,222,222,1);
                        outline-style: none;
                        user-select: none;
                        text-align: center;
                        margin-top: ${ verticalOffset }px;
                        overflow: hidden;
                    }
                    
                    .menu-item {
                        border-top: 2px solid rgba(230, 230, 230, 0.5);;
                        color: #0070ba;
                        cursor: pointer;
                    }
                    
                    .menu-item:first-child {
                        border-top: none;
                    }
                    
                    .menu-item:hover {
                        background: #fcfcfc;
                        text-decoration: underline;
                    }

                    @media screen and (min-width: 0px) {
                        .menu-item {
                            font-size: 11px;
                            line-height: 14px;
                            padding: 8px;
                        }
                    }

                    @media screen and (min-width: 300px) {
                        .menu-item {
                            font-size: 14px;
                            line-height: 18px;
                            padding: 14px;
                        }
                    }

                    @media screen and (min-width: 500px) {
                        .menu-item {
                            font-size: 18px;
                            line-height: 21px;
                            padding: 17px;
                        }
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
