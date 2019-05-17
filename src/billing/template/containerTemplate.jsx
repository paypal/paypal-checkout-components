/* @flow */
/** @jsx jsxDom */
/* eslint max-lines: 0 */

import { base64encode } from 'belter/src';

import { fundingLogos } from '../../resources';
import { BUTTON_LOGO_COLOR, CHECKOUT_OVERLAY_COLOR } from '../../constants';
import { isIos } from '../../lib';
import { containerContent } from '../../checkout/template/containerContent';
import { getSandboxStyle, getContainerStyle } from '../../checkout/template';

const LOGO_COLOR = {
    [ CHECKOUT_OVERLAY_COLOR.BLACK ]: BUTTON_LOGO_COLOR.WHITE,
    [ CHECKOUT_OVERLAY_COLOR.WHITE ]: BUTTON_LOGO_COLOR.BLACK
};

// eslint-disable-next-line flowtype/require-exact-type
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

export function containerTemplate({ id, props, CLASS, ANIMATION, CONTEXT, EVENT, on, tag, context, actions, outlet, jsxDom } : ContainerTemplateOptions) : HTMLElement {

    const [ lang, country ] = props.locale.split('_');

    const containerStyle = `
        ${ getContainerStyle({ id, tag, CONTEXT, CLASS, ANIMATION }) }
        @media screen and (max-width: 470px) {
            #${ id } .paypal-checkout-close {
                position: absolute;
                right: 20px;
                width: 40px;
                height: 40px;
                opacity: 0.6;
                top: 20px;
                opacity: 0.6;
                z-index: 2;
            }

            #${ id } .paypal-checkout-close:before, .paypal-checkout-close:after {
                position: absolute;
                left: 20px;
                content: ' ';
                height: 40px;
                width: 1px;
                background-color: #111 !important;
            }
            #${ id }.${ tag }-context-${ CONTEXT.IFRAME } .paypal-checkout-iframe-container,
            #${ id }.${ tag }-context-${ CONTEXT.IFRAME } .${ CLASS.OUTLET } {
                height: 100%;
                min-height: 100%;
                max-height: 100%;
                min-width: 100%;
                max-width: 100%;
                border-radius: 0px;
            }
            #${ id } .${ CLASS.OUTLET } {
                height: 100%;
            }
        }
    `;

    const content = containerContent[country][lang];

    function close(event) {
        event.preventDefault();
        event.stopPropagation();
        if (props.onCancel) {
            props.onCancel();
        }
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

    const style = props.style || {};
    const overlayColor = style.overlayColor || CHECKOUT_OVERLAY_COLOR.BLACK;
    const logoColor = LOGO_COLOR[overlayColor];

    const ppLogo = (typeof fundingLogos.pp === 'function')
        ? fundingLogos.pp({ logoColor })
        : fundingLogos.pp[logoColor];

    const paypalLogo = (typeof fundingLogos.paypal === 'function')
        ? fundingLogos.paypal({ logoColor })
        : fundingLogos.paypal[logoColor];

    const el = (
        <div id={ id } onClick={ focus } class={ `${ tag }-context-${ context } paypal-checkout-overlay ${ tag }-background-color-${ overlayColor } ${ tag }-logo-color-${ logoColor }` } role="dialog" aria-modal="true" aria-label="PayPal Checkout Overlay">
            <a href='#' class="paypal-checkout-close" onClick={ close } aria-label="close" role="button" />
            <div class="paypal-checkout-modal">
                <div class="paypal-checkout-logo">
                    <img
                        class="paypal-checkout-logo-pp" alt="pp"
                        src={ `data:image/svg+xml;base64,${ base64encode(ppLogo.toString()) }` } />
                    <img
                        class="paypal-checkout-logo-paypal" alt="paypal"
                        src={ `data:image/svg+xml;base64,${ base64encode(paypalLogo.toString()) }` } />
                </div>
                <div class="paypal-checkout-message">
                    {content.windowMessage}
                </div>
                <div class="paypal-checkout-continue">
                    <a onClick={ focus } href='#'>{content.continue}</a>
                </div>
                <div class="paypal-checkout-loader">
                    <div class="paypal-spinner" />
                </div>
            </div>

            <div class="paypal-checkout-iframe-container">
                {outlet}
            </div>

            <style>{ containerStyle }</style>
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

