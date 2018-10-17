/* @flow */
/** @jsx jsxDom */
/* eslint max-lines: off, react/jsx-max-depth: off */

import { isIos } from 'belter/src';
import type { RenderOptionsType } from 'zoid/src/component/parent';

import { LOGO_COLOR } from '../../constants';
import { PPLogo, PayPalLogo } from '../../funding/paypal/logo';
import type { CheckoutPropsType } from '../props';

import { containerContent } from './containerContent';
import { getContainerStyle, getSandboxStyle } from './containerStyle';

export function containerTemplate({ id, props, CLASS, ANIMATION, CONTEXT, EVENT, on, tag, context, actions, outlet, jsxDom } : RenderOptionsType<CheckoutPropsType>) : HTMLElement {

    const { locale } = props;
    const { lang } = locale;

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

    const { style = {} } = props;

    const content = containerContent[lang];

    const el = (
        <div id={ id } onClick={ focus } class={ `${ tag }-context-${ context } paypal-checkout-overlay` }>
            <a href='#' class="paypal-checkout-close" onClick={ close } aria-label="close" role="button" />
            <div class="paypal-checkout-modal">
                <div class="paypal-checkout-logo">
                    <span innerHTML={ (<PPLogo logoColor={ LOGO_COLOR.WHITE } />).toString() } />
                    <span innerHTML={ (<PayPalLogo logoColor={ LOGO_COLOR.WHITE } />).toString() } />
                </div>
                <div class="paypal-checkout-message">
                    {content.windowMessage}
                </div>
                <div class="paypal-checkout-continue">
                    <a onClick={ focus } href='#'>{content.continueMessage}</a>
                </div>
                <div class="paypal-checkout-loader">
                    <div class="paypal-spinner" />
                </div>
            </div>

            <div class="paypal-checkout-iframe-container">
                {outlet}
            </div>

            <style>{getContainerStyle({ id, tag, CONTEXT, CLASS, ANIMATION })}</style>
        </div>
    );

    const container = (
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
