/* @flow */
/** @jsx h */

import { h, Fragment, type Node } from 'preact';

/*
window.xprops = {
    choices: [
        {
            id:    'CHANGE_ACCOUNT',
            label: 'Use a Different Account'
        },
        {
            id:    'SELECT_FUNDING_SHIPPING',
            label: 'Select Funding or Shipping'
        },
        {
            id:    'DELETE_ACCOUNT',
            label: 'Forget This Saved Account'
        }
    ],
    onProps: () => {
        // pass
    },
    onChoose: ({ id }) => {
        console.warn('choose', id);
    },
    onBlur: () => {
        console.warn('blur');
    }
};
*/

type MenuProps = {|
    cspNonce : string,
    choices : $ReadOnlyArray<{|
        id : string,
        label : string
    |}>,
    onChoose : ({ id : string }) => void,
    onBlur : () => void
|};

export function Menu({ choices, onChoose, onBlur, cspNonce } : MenuProps) : Node {
    return (
        <Fragment>
            <style nonce={ cspNonce }>
                {`
                    .menu {
                        width: 100%;
                        z-index: 5000;
                        background: rgba(255, 255, 255, 0.97);
                        border-radius: 3px;
                        font-family: Helvetica, sans-serif;
                        font-size: 14px;
                        letter-spacing: 0.5px;
                        box-shadow: 0px 0px 3px 1px rgba(222,222,222,1);
                        outline-style: none;
                        user-select: none;
                    }
                    
                    .menu-item {
                        border-top: 2px solid rgba(230, 230, 230, 0.5);;
                        padding: 14px 18px;
                        color: #0070ba;
                        cursor: pointer;
                    }
                    
                    .menu-item:first-child {
                        border-top: none;
                    }
                    
                    .menu-item:hover {
                        background: #fcfcfc;
                    }
                `}
            </style>

            <div class='menu' tabIndex='0' onBlur={ () => onBlur() }>
                {
                    choices.map(({ id, label }) =>
                        <div class='menu-item' onClick={ () => onChoose({ id }) }>{ label }</div>)
                }
            </div>
        </Fragment>
    );
}
