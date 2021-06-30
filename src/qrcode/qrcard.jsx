/* @flow */
/** @jsx h */

import { h, render, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import {
    getBody
} from '../lib';
import { QRCODE_STATE } from '../constants';

import { type NodeType,
    ErrorMessage,
    QRCodeElement,
    InstructionIcon,
    Logo,
    VenmoMark,
    AuthMark,
    cardStyle,
    debugging_nextStateMap
} from './components';


function useXProps<T>() : T {
    const [ xprops, setXProps ] = useState(window.xprops);
    useEffect(() => xprops.onProps(newProps => {
        setXProps({ ...newProps });
    }), []);

    function setState (newState : $Values<typeof QRCODE_STATE>) {
        setXProps({
            ...xprops,
            state: newState
        });
    }

    return {
        ...xprops,
        setState
    };
}

function QRCard({
    cspNonce,
    svgString,
    debug
} : {|
    cspNonce : ?string,
    svgString : string,
    debug? : boolean
|}) : NodeType {
    const { state, errorText, setState } = useXProps();
    const isError = () => {
        return state === QRCODE_STATE.ERROR;
    };

    return (
        <Fragment>
            <style nonce={ cspNonce }> { cardStyle } </style>
            <div id="view-boxes" className={ state }>
                { isError() ?
                    <ErrorMessage
                        message={ errorText }
                        resetFunc={ () => setState(QRCODE_STATE.DEFAULT) }
                    /> :
                    <div id="front-view" className="card">
                        <QRCodeElement svgString={ svgString } />
                        <Logo />
                        <div id="instructions">
                            <InstructionIcon stylingClass="instruction-icon" />
                            To scan QR code, Open your Venmo App
                        </div>
                    </div>}
                <div className="card" id="back-view" >
                    <span className="mark">
                        <VenmoMark />
                        <AuthMark />
                    </span>
                    
                    <div className="auth-message">
                        Go to your Venmo app and authorize
                    </div>
                    <div className="success-message">
                        Venmo account authorized
                    </div>

                </div>
                { debug && <button
                    type="button"
                    style={ { position: 'absolute', bottom: '8px', padding: '4px', right: '8px' } }
                    onClick={ () => setState(debugging_nextStateMap.get(state)) }
                >Next State</button>}
            </div>
        </Fragment>
    );
}

type RenderQRCodeOptions = {|
    cspNonce? : string,
    svgString : string,
    debug : boolean
|};

export function renderQRCode({
    cspNonce = '',
    svgString,
    debug = false
} : RenderQRCodeOptions) {
    render(
        <QRCard
            cspNonce={ cspNonce }
            svgString={ svgString }
            debug={ debug }
        />,
        getBody()
    );
}
