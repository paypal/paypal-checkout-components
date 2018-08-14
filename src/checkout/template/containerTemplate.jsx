/* @flow */
/* @jsx jsxDom */
/* eslint max-lines: 0 */

import { isIos } from 'belter/src';

import { LOGO_COLOR } from '../../constants';
import { PPLogo, PayPalLogo } from '../../funding/paypal/logo';

import { containerContent } from './containerContent';
import { getContainerStyle, getSandboxStyle } from './containerStyle';

export type ContainerTemplateOptions = {
    id : string,
    props : Object,
    CLASS : Object,
    ANIMATION : Object,
    CONTEXT : Object,
    EVENT : Object,
    dimensions : {
        width : number,
        height : number
    },
    actions : Object,
    tag : string,
    context : string,
    outlet : HTMLElement,
    on : Function,
    jsxDom : Function
};

// eslint-disable-next-line no-unused-vars
export function containerTemplate({ id, props, CLASS, ANIMATION, CONTEXT, EVENT, on, tag, context, actions, outlet, jsxDom } : ContainerTemplateOptions) : HTMLElement {

    let { lang, country } = props.locale;

    function close(event) {
        event.preventDefault();
        event.stopPropagation();
        actions.close();
    }

    function focus(event) {
        event.preventDefault();
        event.stopPropagation();

        if (isIos()) {
            // eslint-disable-next-line no-alert
            window.alert('Please switch tabs to reactivate the PayPal window');
        } else {
            actions.focus();
        }
    }

    let style = props.style || {};

    let content = containerContent[country][lang];

    let el = (
        <div id={ id } onClick={ focus } class={ `${ tag }-context-${ context } paypal-checkout-overlay` }>
            <a href='#' class="paypal-checkout-close" onClick={ close } aria-label="close" role="button"></a>
            <div class="paypal-checkout-modal">
                <div class="paypal-checkout-logo">
                    <span innerHTML={ <PPLogo logoColor={ LOGO_COLOR.WHITE } /> } />
                    <span innerHTML={ <PayPalLogo logoColor={ LOGO_COLOR.WHITE } /> } />
                </div>
                <div class="paypal-checkout-message">
                    {content.windowMessage}
                </div>
                <div class="paypal-checkout-continue">
                    <a onClick={ focus } href='#'>{content.continueMessage}</a>
                </div>
                <div class="paypal-checkout-loader">
                    <div class="paypal-spinner"></div>
                </div>
            </div>

            <div class="paypal-checkout-iframe-container">
                {outlet}
            </div>

            <style>{getContainerStyle({ id, tag, CONTEXT, CLASS, ANIMATION })}</style>
        </div>
    );

    let container = (
        <html>
            <body>
                { el }
            </body>
        </html>
    );

    on(EVENT.CLOSE, () => {
        el.className += ` ${ tag }-loading`;
    });

    return (
        <div id={ id } class="paypal-checkout-sandbox">
            <style>{ getSandboxStyle({ id, ANIMATION }) }</style>

            <iframe title="PayPal Checkout Overlay" name={ `__paypal_checkout_sandbox_${ id }__` } scrolling="no" class="paypal-checkout-sandbox-iframe">
                { container }
            </iframe>
        </div>
    );
}
