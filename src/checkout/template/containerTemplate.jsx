/* @flow */
/** @jsx node */
/* eslint max-lines: off, react/jsx-max-depth: off */

import { isIos, animate, noop } from 'belter/src';
import type { RenderOptionsType } from 'zoid/src/parent';
import { node, dom } from 'jsx-pragmatic/src';
import { LOGO_COLOR, PPLogo, PayPalLogo } from '@paypal/sdk-logos/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import type { CheckoutPropsType } from '../props';

import { containerContent } from './containerContent';
import { getContainerStyle, getSandboxStyle } from './containerStyle';

export function containerTemplate({ uid, tag, props, context, close, focus, outlet, doc } : RenderOptionsType<CheckoutPropsType>) : HTMLElement {

    const { locale } = props;
    const { lang } = locale;

    function closeCheckout(event) {
        event.preventDefault();
        event.stopPropagation();
        close();
    }

    function focusCheckout(event) {
        event.preventDefault();
        event.stopPropagation();

        if (isIos()) {
            // eslint-disable-next-line no-alert
            window.alert('Please switch tabs to reactivate the PayPal window');
        } else {
            focus();
        }
    }

    const { style = {} } = props;

    const content = containerContent[lang];

    const setupContainerAnimations = (el) => {
        props.addOnDisplay(() => {
            return ZalgoPromise.all([
                animate(el, 'show-container', noop),
                animate(outlet, 'show-component', noop)
            ]).then(noop);
        });

        props.addOnClose(() => {
            return ZalgoPromise.all([
                animate(el, 'hide-container', noop),
                animate(outlet, 'hide-component', noop)
            ]).then(noop);
        });
    };

    return (
        <div id={ uid } onRender={ setupContainerAnimations } class="paypal-checkout-sandbox">
            <style>{ getSandboxStyle({ uid }) }</style>

            <iframe title="PayPal Checkout Overlay" name={ `__paypal_checkout_sandbox_${ uid }__` } scrolling="no" class="paypal-checkout-sandbox-iframe">
                <html>
                    <body>
                        <div id={ uid } onClick={ focusCheckout } class={ `${ tag }-context-${ context } paypal-checkout-overlay` }>
                            <a href='#' class="paypal-checkout-close" onClick={ closeCheckout } aria-label="close" role="button" />
                            <div class="paypal-checkout-modal">
                                <div class="paypal-checkout-logo">
                                    <PPLogo logoColor={ LOGO_COLOR.WHITE } />
                                    <PayPalLogo logoColor={ LOGO_COLOR.WHITE } />
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
                                <node el={ outlet } />
                            </div>

                            <style>{ getContainerStyle({ uid, tag }) }</style>
                        </div>
                    </body>
                </html>
            </iframe>
        </div>
    ).render(dom({ doc }));
}
