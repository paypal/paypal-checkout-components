/* @flow */
/* @jsx jsxDom */
/* eslint max-lines: 0 */

import { btoa } from 'Base64';

import { componentLogos } from '../../../button/templates/component/logos';
import { BUTTON_LOGO_COLOR } from '../../../button/constants';
import { CHECKOUT_OVERLAY_COLOR } from '../../constants';
import { isIos } from '../../../../lib';

import componentContentJSON from './content.json';
import { getContainerStyle, getSandboxStyle } from './style';

let componentContent = JSON.parse(componentContentJSON);

const LOGO_COLOR = {
    [ CHECKOUT_OVERLAY_COLOR.BLACK ]: BUTTON_LOGO_COLOR.WHITE,
    [ CHECKOUT_OVERLAY_COLOR.WHITE ]: BUTTON_LOGO_COLOR.BLACK
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

// eslint-disable-next-line no-unused-vars
export function containerTemplate({ id, props, CLASS, ANIMATION, CONTEXT, EVENT, on, tag, context, actions, outlet, jsxDom } : ContainerTemplateOptions) : HTMLElement {

    let [ lang, country ] = props.locale.split('_');

    let content = componentContent[country][lang];

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
    let overlayColor = style.overlayColor || CHECKOUT_OVERLAY_COLOR.BLACK;
    let logoColor = LOGO_COLOR[overlayColor];

    let el = (
        <div id={ id } onClick={ focus } class={ `${ tag }-context-${ context } paypal-checkout-overlay ${ tag }-background-color-${ overlayColor } ${ tag }-logo-color-${ logoColor }` }>
            <a href='#' class="paypal-checkout-close" onClick={ close }></a>
            <div class="paypal-checkout-modal">
                <div class="paypal-checkout-logo">
                    <img
                        class="paypal-checkout-logo-pp" alt="pp"
                        src={ `data:image/svg+xml;base64,${ btoa(componentLogos.pp[logoColor]) }` } />
                    <img
                        class="paypal-checkout-logo-paypal" alt="paypal"
                        src={ `data:image/svg+xml;base64,${ btoa(componentLogos.paypal[logoColor]) }` } />
                </div>
                <div class="paypal-checkout-message">
                    {content.windowMessage}
                </div>
                <div class="paypal-checkout-continue">
                    <a onClick={ focus } href='#'>{content.continue}</a>
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

            <iframe name={ `__paypal_checkout_sandbox_${ id }__` } scrolling="no" class="paypal-checkout-sandbox-iframe">
                { container }
            </iframe>
        </div>
    );
}
