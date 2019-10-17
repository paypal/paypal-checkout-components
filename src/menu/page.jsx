/* @flow */
/** @jsx h */

import { h, render, Fragment, type Node } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { noop } from 'belter/src';

import { getBody } from '../lib';

import { Menu } from './menu';
import { useXProps } from './hooks';

type PageProps = {|
    cspNonce : string
|};

function Page({ cspNonce } : PageProps) : Node {
    const { choices, onChoose, verticalOffset, hide, onBlur = noop } = useXProps();
    const [ visible, setVisible ] = useState(false);

    useEffect(() => {
        setVisible(Boolean(choices && choices.length));
    }, [ choices ]);

    if (!choices || !visible) {
        return null;
    }

    const onChooseHandler = ({ id, win }) => {
        setVisible(false);
        return onChoose({ id, win });
    };

    const onBlurHandler = () => {
        setVisible(false);
        onBlur();
        return hide();
    };

    return (
        <Fragment>
            <style nonce={ cspNonce }>
                {`
                    * {
                        box-sizing: border-box;
                    }

                    html, body {
                        margin: 0;
                        padding: 0;
                    }

                    body {
                        padding: 5px 20px;
                        display: inline-block;
                        width: 100%;
                    }
                `}
            </style>

            <Menu
                choices={ choices } onChoose={ onChooseHandler } onBlur={ onBlurHandler }
                cspNonce={ cspNonce } verticalOffset={ verticalOffset } />
        </Fragment>
    );
}

type SetupOptions = {|
    cspNonce : string
|};

export function setupMenu({ cspNonce } : SetupOptions) {
    render(<Page cspNonce={ cspNonce } />, getBody());
}
 
