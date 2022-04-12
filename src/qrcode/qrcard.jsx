/* @flow */
/** @jsx h */

import { h, render, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { FUNDING, FPTI_KEY } from '@paypal/sdk-constants/src';

import { getBody } from '../lib';
import { QRCODE_STATE, FPTI_CUSTOM_KEY, FPTI_TRANSITION, FPTI_STATE, FPTI_CONTEXT_TYPE } from '../constants';
import { openPopup } from '../ui';
import { CHECKOUT_POPUP_DIMENSIONS } from '../payment-flows/checkout';

import {
    ErrorMessage,
    QRCodeElement,
    InstructionIcon,
    Logo,
    VenmoMark,
    AuthMark,
    cardStyle,
    debugging_nextStateMap
} from './components';
import { setupNativeQRLogger } from './lib/logger';
import { Survey, useSurvey } from './survey';

let logger;

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
    svgString
} : {|
    svgString : string
|}) : mixed {

    const { state, errorText, setState, close, onCancel: cancel } = useXProps();
    const survey = useSurvey();
    const isError = () => {
        return state === QRCODE_STATE.ERROR;
    };

    const handleClick = (selectedFundingSource : $Values<typeof FUNDING>) => {
        window.xprops.hide();
        const win = openPopup({ width: CHECKOUT_POPUP_DIMENSIONS.WIDTH, height: CHECKOUT_POPUP_DIMENSIONS.HEIGHT, closeOnUnload: 0 });
        window.xprops.onEscapePath(win, selectedFundingSource).then(() => {
            close();
        });
    };

    const onCloseClick = () => {
        if (state !== QRCODE_STATE.DEFAULT) {
            cancel();
        } else if (survey.isEnabled) {
            logger.info(`VenmoDesktopPay_qrcode_survey`).track({
                [FPTI_KEY.STATE]:                               FPTI_STATE.BUTTON,
                [FPTI_KEY.CONTEXT_TYPE]:                        FPTI_CONTEXT_TYPE.ORDER_ID,
                [FPTI_KEY.CONTEXT_ID]:                          window.xprops.orderID,
                [FPTI_KEY.TRANSITION]:                          `${ FPTI_TRANSITION.QR_SURVEY }`,
                [FPTI_CUSTOM_KEY.DESKTOP_EXIT_SURVEY_REASON]:   survey.reason
            }).flush();
            cancel();
        }

        /**
         * Survey will be reused in the future.  Supressing the enablement on the close button.
         *
         *  } else {
         *       survey.enable();
         *  }
         */

        return cancel();
    };

    const errorMessage = (
        <ErrorMessage
            message={ errorText }
            resetFunc={ () => setState(QRCODE_STATE.DEFAULT) }
        />
    );

    const frontView = (
        <div id="front-view" className="card">
            <p id="fee-disclaimer">
                No fees no matter how you pay
            </p>
            <div id="instructions">
                <InstructionIcon stylingClass="instruction-icon" />
                <span>
                    To pay, scan the QR code with your Venmo app
                </span>
            </div>
            <QRCodeElement svgString={ svgString } />
            <Logo />
        </div>
    );
    
    const surveyElement = (
        <Survey survey={ survey } onCloseClick={ onCloseClick } />
    );

    const displaySurvey = survey.isEnabled && state === QRCODE_STATE.DEFAULT;
    const displayEscapePath = !survey.isEnabled && state === QRCODE_STATE.DEFAULT;

    const content = displaySurvey ? surveyElement : frontView;
    const escapePathFooter = displayEscapePath && (
        <p className="escape-path">Don&apos;t have the app? Pay with <span className="escape-path__link" onClick={ () => handleClick(FUNDING.PAYPAL) }>PayPal</span> or <span className="escape-path__link" onClick={ () => handleClick(FUNDING.CARD) }>Credit/Debit card</span></p>
    );

    return (
        <Fragment>
            <style nonce={ window.xprops.cspNonce }> { cardStyle } </style>
            <a href="#" id="close" aria-label="close" role="button" onClick={ onCloseClick } />
            <div id="view-boxes" className={ state }>
                { isError() ? errorMessage : content }
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
                { window.xprops.debug &&
                    <button
                        type="button"
                        style={ { position: 'absolute', bottom: '8px', padding: '4px', right: '8px' } }
                        onClick={ () => setState(debugging_nextStateMap.get(state)) }
                    >
                        Next State
                    </button>}
            </div>
            { escapePathFooter }
        </Fragment>
    );
}

type RenderQRCodeOptions = {|
    svgString : string
|};

export function renderQRCode({
    svgString
} : RenderQRCodeOptions) {
    logger = setupNativeQRLogger();
    render(
        <QRCard
            svgString={ svgString }
        />,
        getBody()
    );
}
