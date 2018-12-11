/* @flow */
/** @jsx node */
/* eslint max-lines: off, react/jsx-max-depth: off */

import { isIos } from 'belter/src';
import type { RenderOptionsType } from 'zoid/src/component/parent';
import { node, dom } from 'jsx-pragmatic/src';
import { LOGO_COLOR, PPLogo, PayPalLogo } from '@paypal/sdk-logos/src';

import type { CheckoutPropsType } from '../props';

import { containerContent } from './containerContent';
import { getContainerStyle, getSandboxStyle } from './containerStyle';

export function containerTemplate({ id, props, CLASS, ANIMATION, CONTEXT, EVENT, on, tag, context, actions, outlet, document } : RenderOptionsType<CheckoutPropsType>) : HTMLElement {

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

    const addLoadingClass = (el) => {
        on(EVENT.CLOSE, () => {
            el.classList.add(`${ tag }-loading`);
        });
    };

    return (
        <div id={ id } class="paypal-checkout-sandbox">
            <style>{ getSandboxStyle({ id, ANIMATION }) }</style>

            <iframe title="PayPal Checkout Overlay" name={ `__paypal_checkout_sandbox_${ id }__` } scrolling="no" class="paypal-checkout-sandbox-iframe">
                <html>
                    <body>
                        <div onRender={ addLoadingClass } id={ id } onClick={ focus } class={ `${ tag }-context-${ context } paypal-checkout-overlay` }>
                            <a href='#' class="paypal-checkout-close" onClick={ close } aria-label="close" role="button" />
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

                            <style>{getContainerStyle({ id, tag, CONTEXT, CLASS, ANIMATION })}</style>
                        </div>
                    </body>
                </html>
            </iframe>
        </div>
    ).render(dom({ doc: document }));
}
