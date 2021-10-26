/* @flow */
/** @jsx h */

import { preact } from 'jsx-pragmatic';
import { h } from 'preact';
import { VenmoLogo, LOGO_COLOR } from '@paypal/sdk-logos/src';

import { VENMO_BLUE, QRCODE_STATE } from '../constants';

export function ErrorMessage({
    message,
    resetFunc
} : {|
    message? : string,
    resetFunc : () => void
|}) : mixed {
    return (
        <div id="error-view">
            <div className="error-message">{message || 'An issue has occurred' }</div>
            <button className="reset-button" type="button" onClick={ resetFunc }>Try scanning again</button>
        </div>
    );
}

export function QRCodeElement({ svgString } : {| svgString : string |}) : mixed {
    const src = `data:image/svg+xml;base64,${ btoa(svgString) }`;
    return (<img id="qr-code" src={ src } alt="QR Code" />);
}

export function Logo() : mixed {
    return VenmoLogo({ logoColor: LOGO_COLOR.DEFAULT }).render(preact({ Preact: { h } }));
}

export function InstructionIcon({ stylingClass = 'instruction-icon' } : {|stylingClass? : string |}) : mixed {
    return (
        <svg className={ stylingClass } width="68" height="47" viewBox="0 0 68 47" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="11.5" y="6.90039" width="20.7" height="29.9" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M30.82 2.2998H12.88C10.8475 2.2998 9.19995 3.98283 9.19995 6.05894V42.2407C9.19995 44.3168 10.8475 45.9998 12.88 45.9998H30.82C32.8524 45.9998 34.5 44.3168 34.5 42.2407V6.05894C34.5 3.98283 32.8524 2.2998 30.82 2.2998ZM21.8499 42.6635C20.8337 42.6635 20.0099 41.822 20.0099 40.784C20.0099 39.7459 20.8337 38.9044 21.8499 38.9044C22.8661 38.9044 23.6899 39.7459 23.6899 40.784C23.6899 41.822 22.8661 42.6635 21.8499 42.6635ZM11.9599 36.414H31.7399V7.32767H11.9599V36.414Z" fill="#888C94" />
            <path d="M25.7367 12.4121C26.107 13.0217 26.274 13.6495 26.274 14.4425C26.274 16.9719 24.1071 20.2578 22.3483 22.5651H18.3314L16.7205 12.966L20.2378 12.6333L21.0894 19.4636C21.8853 18.1716 22.8674 16.1412 22.8674 14.757C22.8674 13.9992 22.7371 13.4832 22.5335 13.0582L25.7367 12.4121Z" fill="#008CFF" />
            <circle cx="14.5" cy="33.5" r="1.25" fill="white" stroke="#0074DE" stroke-width="0.5" />
            <circle cx="18.5" cy="33.5" r="1.25" fill="white" stroke="#0074DE" stroke-width="0.5" />
            <rect x="21" y="32" width="9" height="3" rx="1.5" fill="#0074DE" />
            <circle cx="49" cy="26" r="18" fill="white" stroke="#2F3033" stroke-width="2" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M56.7188 16.5H51.9688C50.985 16.5 50.1875 17.2975 50.1875 18.2812V23.0312C50.1875 24.015 50.985 24.8125 51.9688 24.8125H56.7188C57.7025 24.8125 58.5 24.015 58.5 23.0312V18.2812C58.5 17.2975 57.7025 16.5 56.7188 16.5ZM51.375 18.2812C51.375 17.9533 51.6408 17.6875 51.9688 17.6875H56.7188C57.0467 17.6875 57.3125 17.9533 57.3125 18.2812V23.0312C57.3125 23.3592 57.0467 23.625 56.7188 23.625H51.9688C51.6408 23.625 51.375 23.3592 51.375 23.0312V18.2812ZM41.875 19.5083C41.875 19.1585 42.1585 18.875 42.5083 18.875H44.8042C45.154 18.875 45.4375 19.1585 45.4375 19.5083V21.8042C45.4375 22.154 45.154 22.4375 44.8042 22.4375H42.5083C42.1585 22.4375 41.875 22.154 41.875 21.8042V19.5083ZM52.5625 19.5083C52.5625 19.1585 52.846 18.875 53.1958 18.875H55.4917C55.8415 18.875 56.125 19.1585 56.125 19.5083V21.8042C56.125 22.154 55.8415 22.4375 55.4917 22.4375H53.1958C52.846 22.4375 52.5625 22.154 52.5625 21.8042V19.5083ZM50.8208 27.1875C50.471 27.1875 50.1875 27.471 50.1875 27.8208V28.9292C50.1875 29.279 50.471 29.5625 50.8208 29.5625H51.9292C52.279 29.5625 52.5625 29.279 52.5625 28.9292V27.8208C52.5625 27.471 52.279 27.1875 51.9292 27.1875H50.8208ZM50.1875 33.7583C50.1875 33.4085 50.471 33.125 50.8208 33.125H51.9292C52.279 33.125 52.5625 33.4085 52.5625 33.7583V34.8667C52.5625 35.2165 52.279 35.5 51.9292 35.5H50.8208C50.471 35.5 50.1875 35.2165 50.1875 34.8667V33.7583ZM56.7583 27.1875C56.4085 27.1875 56.125 27.471 56.125 27.8208V28.9292C56.125 29.279 56.4085 29.5625 56.7583 29.5625H57.8667C58.2165 29.5625 58.5 29.279 58.5 28.9292V27.8208C58.5 27.471 58.2165 27.1875 57.8667 27.1875H56.7583ZM56.125 33.7583C56.125 33.4085 56.4085 33.125 56.7583 33.125H57.8667C58.2165 33.125 58.5 33.4085 58.5 33.7583V34.8667C58.5 35.2165 58.2165 35.5 57.8667 35.5H56.7583C56.4085 35.5 56.125 35.2165 56.125 34.8667V33.7583ZM53.7895 30.1562C53.4398 30.1562 53.1562 30.4398 53.1562 30.7895V31.898C53.1562 32.2477 53.4398 32.5312 53.7895 32.5312H54.898C55.2477 32.5312 55.5312 32.2477 55.5312 31.898V30.7895C55.5312 30.4398 55.2477 30.1562 54.898 30.1562H53.7895ZM41.875 30.1958C41.875 29.846 42.1585 29.5625 42.5083 29.5625H44.8042C45.154 29.5625 45.4375 29.846 45.4375 30.1958V32.4917C45.4375 32.8415 45.154 33.125 44.8042 33.125H42.5083C42.1585 33.125 41.875 32.8415 41.875 32.4917V30.1958ZM41.2812 27.1875H46.0312C47.015 27.1875 47.8125 27.985 47.8125 28.9688V33.7188C47.8125 34.7025 47.015 35.5 46.0312 35.5H41.2812C40.2975 35.5 39.5 34.7025 39.5 33.7188V28.9688C39.5 27.985 40.2975 27.1875 41.2812 27.1875ZM41.2812 28.375C40.9533 28.375 40.6875 28.6408 40.6875 28.9688V33.7188C40.6875 34.0467 40.9533 34.3125 41.2812 34.3125H46.0312C46.3592 34.3125 46.625 34.0467 46.625 33.7188V28.9688C46.625 28.6408 46.3592 28.375 46.0312 28.375H41.2812ZM41.2812 16.5H46.0312C47.015 16.5 47.8125 17.2975 47.8125 18.2812V23.0312C47.8125 24.015 47.015 24.8125 46.0312 24.8125H41.2812C40.2975 24.8125 39.5 24.015 39.5 23.0312V18.2812C39.5 17.2975 40.2975 16.5 41.2812 16.5ZM41.2812 17.6875C40.9533 17.6875 40.6875 17.9533 40.6875 18.2812V23.0312C40.6875 23.3592 40.9533 23.625 41.2812 23.625H46.0312C46.3592 23.625 46.625 23.3592 46.625 23.0312V18.2812C46.625 17.9533 46.3592 17.6875 46.0312 17.6875H41.2812Z" fill="#008CFF" />
            <path d="M36 13.0004L15 33" stroke="#2F3033" />
            <path d="M43.4999 43.4991L14.4999 32.9995" stroke="#2F3033" />
        </svg>
    );
}

export function VenmoMark() : mixed {
    // <img src="https://www.paypalobjects.com/paypal-ui/logos/svg/venmo-mark-monotone.svg" alt="Venmo Mark" />
    return (
        <svg id="venmo-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path d="M42.3 2L28.5 4.8c.8 1.9 1.4 4.1 1.4 7.4 0 6-4.2 14.8-7.7 20.4L18.5 3 3.3 4.5l7 41.5h17.4c7.7-10 17-24.3 17-35.2 0-3.4-.8-6.1-2.4-8.8z" fill="#fff" />
        </svg>
    );
}

export function AuthMark() : mixed {
    return  (
        <svg id="success-mark" width="59" height="59" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="57" height="57" rx="28.5" fill="#148572" stroke="#888C94" />
            <g clip-path="url(#clip0)">
                <path d="M24.0068 40.8397C22.921 39.7538 22.921 37.9933 24.0068 36.9075L39.2933 21.621C40.3791 20.5352 42.1396 20.5352 43.2255 21.621C44.3113 22.7069 44.3113 24.4674 43.2255 25.5532L27.939 40.8397C26.8532 41.9255 25.0927 41.9255 24.0068 40.8397Z" fill="white" />
                <path d="M27.9763 40.8397C26.8905 41.9255 25.13 41.9255 24.0441 40.8397L17.1628 33.9583C16.0769 32.8725 16.0769 31.112 17.1628 30.0261C18.2486 28.9403 20.0091 28.9403 21.095 30.0261L27.9763 36.9075C29.0622 37.9933 29.0622 39.7538 27.9763 40.8397Z" fill="white" />
            </g>
            <defs>
                <clipPath id="clip0">
                    <rect width="27.8049" height="27.8049" fill="white" transform="translate(16.2927 16.293)" />
                </clipPath>
            </defs>
        </svg>
    );
}

export const cardStyle : string = `
    * {
        box-sizing: border-box;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        text-transform: none;        
    }
    html, body {
        display: flex;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        align-items: center;
        justify-content: center;
    }
    body {
        flex-direction: column;
    }
    #error-view {
        width: 100%;
        height: 100%;
        padding: 1.5em;
        justify-content: center;
    }
    #error-view .error-message,
    #error-view .reset-button {
        color: #FFFFFF;
        text-align: center;        
        line-height: 16px;
    }
    #error-view .error-message {
        margin-bottom: 2em;
        word-break: break-word;
    }
    #error-view .reset-button {
        cursor: pointer;
        border: 0; 
        border-radius: 24px;
        padding: 12px;
        background: ${ VENMO_BLUE };
        line-height: 24px;
        font-weight: 700;
        width: 300px;
    }
    .card, 
    #error-view {
        display: inline-flex;
        align-items: center;
        flex-direction: column;
    }
    .card {
        border-radius: 8px;
        min-width: 280px;
        min-height: 320px;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        transition: transform 1s;
        transform-style: preserve-3d;
    }
    .card * {
        box-sizing: content-box;
    }
    #view-boxes {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
    }
    #view-boxes.${ QRCODE_STATE.SCANNED } #front-view,
    #view-boxes.${ QRCODE_STATE.AUTHORIZED } #front-view {
        transform: rotateY(180deg);
        position: absolute;
    }
    #view-boxes #back-view {width: 320px;}
    #view-boxes.${ QRCODE_STATE.SCANNED } #back-view,
    #view-boxes.${ QRCODE_STATE.AUTHORIZED } #back-view {
        transform: rotateY(0deg);
        position: relative;
    }
    #view-boxes #back-view #success-mark,
    #view-boxes #back-view .success-message {
        opacity: 0;
    }
    #view-boxes.${ QRCODE_STATE.AUTHORIZED } #back-view #success-mark,
    #view-boxes.${ QRCODE_STATE.AUTHORIZED } #back-view .success-message {
        opacity: 1;
    }
    #view-boxes.${ QRCODE_STATE.AUTHORIZED } #back-view #success-mark {
        transform: rotate(720deg);
    }
    #view-boxes.${ QRCODE_STATE.AUTHORIZED } #back-view .auth-message {
        opacity: 0;
    }
    #front-view {
        background-color: white;
        border: 1px solid #888C94;
        z-index: 2;
        transform: rotateY(0deg);
        justify-content: flex-end;
        width: 462px;
    }
    #front-view > svg,
    #front-view > img {
        padding: 16px 16px 0px;
    }
    #front-view > img + img { 
        padding-top: 12px;
        padding-bottom: 32px; 
    }
    #qr-code {
        min-width: 160px;
        min-height: 160px;
        width: calc(100% - 32px);
        max-width: 250px;
    }
    #instructions {
        background-color: #FFFF;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        box-sizing: border-box;
        margin-top: 16px;
        display: flex;
        align-items: center;
        font-size: 14px;
        line-height: 16px;
        max-width: 250px;
        width: 100%;
    }
    .instruction-icon {
        min-width: 68px;
        min-height: 46px;
        margin-right: 16px;
    }
    #fee-disclaimer{
        margin: 0;
        padding-top: 32px;
        padding-left: 16px;
        padding-right: 16px;
        font-size: 20px;
        color: #2F3033;
    }
    #back-view {
        position: absolute;
        transform: rotateY(-180deg);
        background-color: ${ VENMO_BLUE };
        justify-content: center;
        font-size: 18px;
        line-height: 16px;
        text-align: center;
        color: #FFFFFF;
    }    
    #back-view .auth-message,
    #back-view .success-message {
        position: absolute;
        bottom: -30px;
        white-space: nowrap;
        transition: opacity 500ms;
    }
    #back-view .mark {
        position: relative ;
    }
    #venmo-mark{
        width: 50%;
    }
    #success-mark {
        position: absolute;
        left: 50%;
        bottom: -10%;
        transition: transform 500ms, opacity 500ms;
        transition-delay: 350ms;
    }
    #close {
        position: absolute;
        right: 16px;
        top: 16px;
        width: 16px;
        height: 16px;
        opacity: 0.6;
        z-index: 10;
    }
    #close:hover {
        opacity: 1;
    }
    #close:before, #close:after {
        position: absolute;
        left: 8px;
        content: ' ';
        height: 20px;
        width: 2px;
        background-color: #FFF;
    }
    #close:before {
        transform: rotate(45deg);
    }
    #close:after {
        transform: rotate(-45deg);
    }
    #survey {
        background: #FFFFFF;
        height: 542px;
        width: 500px;
        border-radius: 8px;
    }
    #survey h1 {
        width: 423px;
        font-weight: 500;
        font-size: 24px;
        line-height: 32px;
        text-align: center;
        margin: auto;
        margin-top: 30px;
    }
    #survey button {
        display: block;
        margin: auto;
        border: none;
        font-family: sans-serif;
        cursor: pointer;
        font-weight: bold;
    }
    #survey button.continue-button {
        margin-top: 40px;
        min-height: 48px;
        width:  335px;
        background: #0074DE;
        height: 24px;
        font-size: 18px;
        line-height: 24px;
        text-align: center;
        color: #FFFFFF;
        border-radius: 24px;
        display: block;
    }
    #survey button.leave-button {
        margin-top: 10px;
        height: 48px;
        width:  335px;
        color: #0074DE;
        background: none;
        font-size: 18px;
        line-height: 24px;
        text-align: center;
        display: block;
    }
    #survey .message {
        width: 333px;
        font-family: sans-serif;
        font-size: 16px;
        line-height: 20px;
        text-align: center;
        margin: auto;
        margin-top: 8px;
    }
    
    #survey .answers {
        width: 400px;
        font-size: 16px;
        line-height: 20px;
        margin: auto;
        cursor: pointer;
    }
    #survey .answers .answer {
        margin-top: 28px;
        display: flex;
        align-items: center;
    }
    #survey label {
        font-family: sans-serif;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
    }
    #survey .answers svg{
        margin-right: 8px;
        min-width: 40px;
    }
    #survey .answers input{
        display: none;
    }
    #survey .answers input:focus::after {
        content: "";
        min-width: 44px;
        height: 44px;
        position: absolute;
        top: -2px;
        left: -2px;
        border: solid 1px black;
        border-radius: 50%;
    }
    .escape-path {    
        background-color: white;
        color: #2F3033;
        width: 100%;
        text-align: center;
        padding: 1rem;
        margin: 0;
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
    }
    .escape-path__link {
        font-weight: 600;
        color: #008CFF;
    }
    .escape-path__link:hover {
        cursor: pointer;
    }
    `;

export const debugging_nextStateMap : Map<string, string> = new Map([
    [ QRCODE_STATE.DEFAULT, QRCODE_STATE.SCANNED ],
    [ QRCODE_STATE.ERROR, QRCODE_STATE.DEFAULT ],
    [ QRCODE_STATE.AUTHORIZED, QRCODE_STATE.ERROR ],
    [ QRCODE_STATE.SCANNED, QRCODE_STATE.AUTHORIZED ]
]);
