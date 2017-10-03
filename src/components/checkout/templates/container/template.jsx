/* @flow */
/* @jsx jsxDom */
/* eslint max-lines: 0 */

import componentContentJSON from './content.json';
import { getContainerStyle, getSandboxStyle } from './style';

let componentContent = JSON.parse(componentContentJSON);

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
        actions.focus();
    }

    let container = (
        <html>
            <body>
                <div id={ id } onClick={ focus } class={ `${ tag }-context-${ context } paypal-checkout-overlay` }>
                    <a href='#' class="paypal-checkout-close" onClick={ close }></a>
                    <div class="paypal-checkout-modal">
                        <div class="paypal-checkout-logo"></div>
                        <div class="paypal-checkout-message">
                            { content.windowMessage }
                        </div>
                        <div class="paypal-checkout-continue">
                            <a onClick={ focus } href='#'>{ content.continue }</a>
                        </div>
                        <div class="paypal-checkout-loader">
                            <div class="paypal-spinner"></div>
                        </div>
                    </div>

                    <div class="paypal-checkout-iframe-container">
                        { outlet }
                    </div>

                    <style>{ getContainerStyle({ id, tag, CONTEXT, CLASS, ANIMATION }) }</style>
                </div>
            </body>
        </html>
    );

    on(EVENT.CLOSE, () => {
        container.className += ` ${ tag }-loading`;
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
