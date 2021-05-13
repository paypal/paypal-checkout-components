/* @flow */
/** @jsx h */

import { h, render, Fragment } from 'preact';
import { useState } from 'preact/hooks';

import { getBody } from '../lib';

import { type NodeType, InstructionIcon, Logo, VenmoMark, AuthMark, cardStyle, DemoWrapper, DemoControls } from './components';

type QRCardProps = {|
    cspNonce : ?string,
    svgString : string,
    demo : boolean
|};

function ErrorMessage({
    message,
    resetFunc
} : {|
    message? : string,
    resetFunc : () => void
|}) : NodeType {
    return (
        <div id="error-view">
            <div className="error-message">{message || 'An issue has occurred' }</div>
            <button className="reset-button" type="button" onClick={ resetFunc }>Try scanning again</button>
        </div>
    );
}

function QRCodeElement({ svgString } : {| svgString : string |}) : NodeType {
    
    const src = `data:image/svg+xml;base64,${ btoa(svgString) }`;
    return (<img id="qr-code" src={ src } alt="QR Code" />);
}

function QRCard({
    cspNonce,
    svgString,
    demo
} : QRCardProps) : NodeType {
    const [ processState, setProcessState ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState(null);

    const isError = () => processState === 'error';
    const setState_error = () => setProcessState('error');
    const setState_scanned = () => setProcessState('scanned');
    const setState_authorized = () => setProcessState('authorized');
    const setState_default = () => setProcessState(null);

    return (
        <Fragment>
            <style nonce={ cspNonce }> { cardStyle } </style>
            <div id="view-boxes" className={ processState }>
                { isError() ?
                    <ErrorMessage message={ errorMessage } resetFunc={ () => setState_default() } /> :
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
            </div>

            { demo ?
                <DemoControls
                    cspNonce={ cspNonce }
                    processState={ processState }
                    isError={ isError }
                    setState_error={ setState_error }
                    setState_scanned={ setState_scanned }
                    setState_authorized={ setState_authorized }
                    setState_default={ setState_default }
                    setErrorMessage={ setErrorMessage }
                /> : null}
        </Fragment>
    );
}

type RenderQRCodeOptions = {|
    cspNonce? : string,
    svgString : string,
    demo? : boolean
|};

export function renderQRCode({ cspNonce = '', svgString, demo = false } : RenderQRCodeOptions) {
    const PropedCard = <QRCard cspNonce={ cspNonce } svgString={ svgString } demo={ demo } />;
    render(
        demo ?
            DemoWrapper(PropedCard, cspNonce) :
            PropedCard,
        getBody()
    );
}
