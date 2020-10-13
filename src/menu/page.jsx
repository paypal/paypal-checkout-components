/* @flow */
/** @jsx h */

import { h, render, Fragment, Node } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { noop } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { getBody } from '../lib';

import { Menu } from './menu';
import { useXProps } from './hooks';

const FADE_TIME = 150;

type PageProps = {|
    cspNonce : string
|};

function Page({ cspNonce } : PageProps) : typeof Node {
    const { choices, onChoose, verticalOffset, hide, onBlur = noop, onFocus = noop, onFocusFail = noop } = useXProps();
    const [ opaque, setOpaque ] = useState(false);
    const [ visible, setVisible ] = useState(false);

    useEffect(() => {
        const hasChoices = Boolean(choices && choices.length);
        setOpaque(hasChoices);
        setVisible(hasChoices);
    }, [ choices ]);

    const onChooseHandler = ({ id, win }) => {
        setVisible(false);
        return onChoose({ id, win });
    };

    const onBlurHandler = () => {
        setOpaque(false);
        return ZalgoPromise.delay(FADE_TIME).then(() => {
            setVisible(false);
            return ZalgoPromise.all([ onBlur(), hide() ]);
        });
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
                        opacity: ${ opaque ? '1' : '0' };
                        transition: opacity ${ (FADE_TIME / 1000).toFixed(2) }s ease-in-out;
                        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                    }

                    body {
                        padding: 5px 20px;
                        display: inline-block;
                        width: 100%;
                    }
                `}
            </style>

            {
                (choices && visible)
                    ? <Menu
                        choices={ choices }
                        onChoose={ onChooseHandler }
                        onBlur={ onBlurHandler }
                        onFocus={ onFocus }
                        onFocusFail={ onFocusFail }
                        cspNonce={ cspNonce }
                        verticalOffset={ verticalOffset } />
                    : null
            }
        </Fragment>
    );
}

type SetupOptions = {|
    cspNonce : string
|};

export function setupMenu({ cspNonce } : SetupOptions) {
    render(<Page cspNonce={ cspNonce } />, getBody());
}
 
