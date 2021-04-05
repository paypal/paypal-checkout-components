/* @flow */
/** @jsx jsxDom */
/* eslint max-lines: 0 */

import { base64encode, supportsPopups } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { fundingLogos } from '../../resources';
import { BUTTON_LOGO_COLOR, CHECKOUT_OVERLAY_COLOR } from '../../constants';
import { isIos, noop } from '../../lib';

import { containerContent } from './containerContent';
import { getContainerStyle } from './containerStyle';
import { getSandboxStyle } from './sandboxStyle';

const LOGO_COLOR = {
    [ CHECKOUT_OVERLAY_COLOR.BLACK ]: BUTTON_LOGO_COLOR.WHITE,
    [ CHECKOUT_OVERLAY_COLOR.WHITE ]: BUTTON_LOGO_COLOR.BLACK
};

export {
    getContainerStyle,
    getSandboxStyle
};

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

    const content = containerContent[country][lang];

    function close(event) {
        event.preventDefault();
        event.stopPropagation();
        actions.close();
    }

    function focus(event) {
        event.preventDefault();
        event.stopPropagation();

        if (isIos() && supportsPopups()) {
            // eslint-disable-next-line no-alert
            window.alert('Please switch tabs to reactivate the PayPal window');
        } else {
            ZalgoPromise.try(actions.focus).catch(noop);
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
        <div id={ id } onClick={ focus } class={ `${ tag }-context-${ context } paypal-checkout-overlay ${ tag }-background-color-${ overlayColor } ${ tag }-logo-color-${ logoColor }` }>
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
