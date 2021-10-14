/* @flow */
/** @jsx h */

import { h } from 'preact';
import { useState } from 'preact/hooks';

export function useSurvey<T>() : T {
    const [ state, setState ] = useState({
        isEnabled:  false,
        reason:     'prefer_not_to_say'
    });
    const enable = () => setState({ ...state, isEnabled: true });
    const disable = () => setState({ ...state, isEnabled: false });
    const setReason = (reason) => setState({ ...state, reason });
    return { ...state, enable, disable, setReason };
}

const radioSvg = (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.25" y="0.25" width="39.5" height="39.5" rx="19.75" stroke="#888C94" stroke-width="0.5" />
    </svg>
);

const checkedRadioSvg = (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="12" fill="#148572" />
        <rect x="0.25" y="0.25" width="39.5" height="39.5" rx="19.75" stroke="#148572" stroke-width="0.5" />
    </svg>
);

export type SurveyType = {|
    isEnabled : boolean,
    reason : string,
    enable : ()=> void,
    disable : ()=> void,
    setReason : (reason : string) => void
|};

export function Survey ({
    survey,
    onCloseClick
} : {|
    survey : SurveyType,
    onCloseClick : () => void
|}) : mixed {
    const answers = [
        {
            text:   'Having trouble scanning the QR code',
            reason: 'having_trouble_scanning_the_qr_code'
        },
        {
            text:   'Don’t have the Venmo app on my mobile device',
            reason: 'dont_have_the_venmo_app_on_my_mobile_device'
        },
        {
            text:   'I prefer to pay another way',
            reason: 'prefer_to_pay_another_way'
        },
        {
            text:   'I prefer not to say',
            reason: 'prefer_not_to_say'
        }
    ];
    
    const onChange = event => {
        event.target.blur();
        survey.setReason(event.target.value);
    };

    const answersElements = answers.map(answer => (
        <div class="answer">
            <input type="radio" id={ answer.reason } value={ answer.reason } checked={ answer.reason === survey.reason } onChange={ onChange } />
            <label for={ answer.reason }>
                { answer.reason === survey.reason ? checkedRadioSvg : radioSvg }
                { answer.text }
            </label>
        </div>
    ));

    return (
        <div id="survey">
            <h1>We’re sorry to see you leave!</h1>
            <p class="message">Please let us know why. Your feedback is important to us.</p>
            <div class="answers">
                { answersElements }
            </div>
            <button type="button" class="continue-button" onClick={ survey.disable }>Continue payment</button>
            <button type="button" class="leave-button" onClick={ onCloseClick }>Leave</button>
        </div>
    );
}
