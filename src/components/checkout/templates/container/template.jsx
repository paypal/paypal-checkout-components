/* @flow */
/* @jsx jsxDom */

import componentContentJSON from './content.json';
let componentContent = JSON.parse(componentContentJSON);

type ContainerTemplateOptions = {
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
    props : Object,
    jsxDom : Function
};

export function containerTemplate({ id, props, CLASS, ANIMATION, CONTEXT, EVENT, on, tag, context, actions, outlet, jsxDom } : ContainerTemplateOptions) : HTMLElement {

    let [ lang, country ] = props.locale.split('_');

    let content = componentContent[country][lang];

    let sandboxStyle = `
        #${ id }.paypal-checkout-sandbox {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2147483647;

            -webkit-animation-duration: 1s;
            animation-duration: 1s;

            animation-fill-mode:forwards;
            animation-iteration-count: 1;

            -webkit-animation-fill-mode:forwards;
            -webkit-animation-iteration-count: 1;
        }

        #${ id }.paypal-checkout-sandbox .paypal-checkout-sandbox-iframe {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        @-webkit-keyframes ${ ANIMATION.SHOW_CONTAINER } {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }

        @keyframes ${ ANIMATION.SHOW_CONTAINER } {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }

        @-webkit-keyframes ${ ANIMATION.HIDE_CONTAINER } {
            from {
                opacity: 1;
            }

            50% {
                opacity: 1;
            }

            to {
                opacity: 0;
            }
        }

        @keyframes ${ ANIMATION.HIDE_CONTAINER } {
            from {
                opacity: 1;
            }

            50% {
                opacity: 1;
            }

            to {
                opacity: 0;
            }
        }
    `;

    let containerStyle = `
        #${ id } {
            position: absolute;
            z-index: 2147483647;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            background-color: black;
            background-color: rgba(0, 0, 0, 0.8);

            background: -webkit-radial-gradient(50% 50%, ellipse closest-corner, rgba(0,0,0,0.6) 1%, rgba(0,0,0,0.8) 100%);
            background: -moz-radial-gradient(50% 50%, ellipse closest-corner, rgba(0,0,0,0.6) 1%, rgba(0,0,0,0.8) 100%);
            background: -ms-radial-gradient(50% 50%, ellipse closest-corner, rgba(0,0,0,0.6) 1%, rgba(0,0,0,0.8) 100%);
            background: radial-gradient(50% 50%, ellipse closest-corner, rgba(0,0,0,0.6) 1%, rgba(0,0,0,0.8) 100%);

            -webkit-transform: translate3d(0, 0, 0);
            -moz-transform: translate3d(0, 0, 0);
            -ms-transform: translate3d(0, 0, 0);
            -o-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }

        #${ id }.${ tag }-context-${ CONTEXT.POPUP } {
            cursor: pointer;
        }

        #${ id }.${ tag }-context-${ CONTEXT.POPUP } {
            cursor: pointer;
        }

        #${ id } .paypal-checkout-modal {
            font-family: "HelveticaNeue", "HelveticaNeue-Light", "Helvetica Neue Light", helvetica, arial, sans-serif;
            font-size: 14px;
            text-align: center;
            color: #fff;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            -ms-box-sizing: border-box;
            box-sizing: border-box;
            width: 350px;
            top: 50%;
            left: 50%;
            position: absolute;
            margin-left: -165px;
            margin-top: -80px;
            cursor: pointer;
            text-align: center;
        }

        #${ id }.${ tag }-loading .paypal-checkout-message, #${ id }.${ tag }-loading .paypal-checkout-continue {
            display: none;
        }

        .paypal-checkout-loader {
            display: none;
        }

        #${ id }.${ tag }-loading .paypal-checkout-loader {
            display: block;
        }

        #${ id } .paypal-checkout-modal .paypal-checkout-logo {
            background: url("https://www.paypalobjects.com/images/checkout/incontext/incontext_mask_sprite.png") no-repeat -18px -16px;
            width: 132px;
            height: 36px;
            cursor: pointer;
            margin-bottom: 30px;
            display: inline-block;
        }

        @media only screen and (-webkit-min-device-pixel-ratio: 2), not all, not all, only screen and (min-resolution: 2dppx), only screen and (min-resolution: 192dpi) {
            #${ id } .paypal-checkout-modal .paypal-checkout-logo {
                background-image: url("https://www.paypalobjects.com/images/checkout/incontext/incontext_mask_sprite_2x.png");
                background-size: 200px 200px;
            }
        }

        #${ id } .paypal-checkout-modal .paypal-checkout-message {
            font-size: 15px;
            line-height: 1.5;
            padding: 10px 0;
        }

        #${ id }.${ tag }-context-${ CONTEXT.IFRAME } .paypal-checkout-message, #${ id }.${ tag }-context-${ CONTEXT.IFRAME } .paypal-checkout-continue {
            display: none;
        }

        #${ id } .paypal-checkout-modal .paypal-checkout-continue {
            font-size: 15px;
            line-height: 1.35;
            padding: 10px 0;
            text-decoration: underline;
            font-weight: bold;
        }

        #${ id } .paypal-checkout-close {
            position: absolute;
            right: 16px;
            top: 16px;
            width: 16px;
            height: 16px;
            opacity: 0.6;
        }

        #${ id }.${ tag }-loading .paypal-checkout-close {
            display: none;
        }

        #${ id } .paypal-checkout-close:hover {
            opacity: 1;
        }

        #${ id } .paypal-checkout-close:before, .paypal-checkout-close:after {
            position: absolute;
            left: 8px;
            content: ' ';
            height: 16px;
            width: 2px;
            background-color: white;
        }

        #${ id } .paypal-checkout-close:before {
            transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            -o-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
        }

        #${ id } .paypal-checkout-close:after {
            transform: rotate(-45deg);
            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            -o-transform: rotate(-45deg);
            -ms-transform: rotate(-45deg);
        }

        #${ id } a {
            color: white;
        }

        #${ id } .paypal-checkout-iframe-container {
            display: none;
        }

        #${ id }.${ tag }-context-${ CONTEXT.IFRAME } .paypal-checkout-iframe-container,
        #${ id }.${ tag }-context-${ CONTEXT.IFRAME } .paypal-checkout-iframe-container > .${ CLASS.OUTLET },
        #${ id }.${ tag }-context-${ CONTEXT.IFRAME } .paypal-checkout-iframe-container > .${ CLASS.OUTLET } > iframe {
            max-height: 95vh;
            max-width: 95vw;
        }

        #${ id }.${ tag }-context-${ CONTEXT.IFRAME } .paypal-checkout-iframe-container {

            display: block;

            position: absolute;

            top: 50%;
            left: 50%;

            min-width: 450px;

            transform: translate(-50%, -50%);
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);

            transform: translate3d(-50%, -50%, 0);
            -webkit-transform: translate3d(-50%, -50%, 0);
            -moz-transform: translate3d(-50%, -50%, 0);
            -o-transform: translate3d(-50%, -50%, 0);
            -ms-transform: translate3d(-50%, -50%, 0);

            border-radius: 10px;
            overflow: hidden;
        }

        #${ id }.${ tag }-context-${ CONTEXT.IFRAME } .${ CLASS.OUTLET } {

            -webkit-transition: all 0.3s ease;
            -moz-transition: all 0.3s ease;
            -ms-transition: all 0.3s ease;
            -o-transition: all 0.3 ease;
            transition: all 0.3s ease;

            -webkit-animation-duration: 0.3s;
            animation-duration: 0.3s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;

            min-width: 450px;

            width: 450px;
            height: 535px;

            background-color: white;

            overflow: auto;
            -webkit-overflow-scrolling: touch;
        }

        @media screen and (max-width: 450px) {

            #${ id }.${ tag }-context-${ CONTEXT.IFRAME } .${ CLASS.OUTLET } {
                min-width: calc(100% - 20px);
                min-width: -webkit-calc(100% - 20px);
                min-width: -moz-calc(100% - 20px);
                min-width: -o-calc(100% - 20px);
                min-width: -ms-calc(100% - 20px);
            }

            #${ id }.${ tag }-context-${ CONTEXT.IFRAME } .${ CLASS.OUTLET } {
                min-width: 100%;
            }
        }

        @media screen and (min-width: 490px) {

            #${ id }.${ tag }-context-${ CONTEXT.IFRAME } .${ CLASS.OUTLET } {
                max-width: 450px;
            }
        }

        #${ id }.${ tag }-context-${ CONTEXT.IFRAME } .${ CLASS.OUTLET } iframe {
            width: 100%;
            height: 100%;
        }

        @-webkit-keyframes ${ ANIMATION.SHOW_COMPONENT } {
            from {
                opacity: 0;
                transform: scale3d(.3, .3, .3);
                -webkit-transform: scale3d(.3, .3, .3);
            }

            to {
                opacity: 1;
                transform: scale3d(1, 1, 1);
                -webkit-transform: scale3d(1, 1, 1);
            }
        }

        @keyframes ${ ANIMATION.SHOW_COMPONENT } {
            from {
                opacity: 0;
                transform: scale3d(.3, .3, .3);
                -webkit-transform: scale3d(.3, .3, .3);
            }

            to {
                opacity: 1;
                transform: scale3d(1, 1, 1);
                -webkit-transform: scale3d(1, 1, 1);
            }
        }

        @-webkit-keyframes ${ ANIMATION.HIDE_COMPONENT } {
            from {
                transform: scale3d(1, 1, 1);
                -webkit-transform: scale3d(1, 1, 1);
            }

            to {
                opacity: 0;
                transform: scale3d(.3, .3, .3);
                -webkit-transform: scale3d(.3, .3, .3);
            }
        }

        @keyframes ${ ANIMATION.HIDE_COMPONENT } {
            from {
                transform: scale3d(1, 1, 1);
                -webkit-transform: scale3d(1, 1, 1);
            }

            to {
                opacity: 0;
                transform: scale3d(.3, .3, .3);
                -webkit-transform: scale3d(.3, .3, .3);
            }
        }

        .paypal-spinner {
            height: 30px;
            width: 30px;
            display: inline-block;
            box-sizing: content-box;
            opacity: 1;
            filter: alpha(opacity=100);
            -webkit-animation: rotation .7s infinite linear;
            -moz-animation: rotation .7s infinite linear;
            -o-animation: rotation .7s infinite linear;
            animation: rotation .7s infinite linear;
            border-left: 8px solid rgba(0, 0, 0, .2);
            border-right: 8px solid rgba(0, 0, 0, .2);
            border-bottom: 8px solid rgba(0, 0, 0, .2);
            border-top: 8px solid #fff;
            border-radius: 100%
        }

        @-webkit-keyframes rotation {
            from {
                -webkit-transform: rotate(0deg)
            }
            to {
                -webkit-transform: rotate(359deg)
            }
        }
        @-moz-keyframes rotation {
            from {
                -moz-transform: rotate(0deg)
            }
            to {
                -moz-transform: rotate(359deg)
            }
        }
        @-o-keyframes rotation {
            from {
                -o-transform: rotate(0deg)
            }
            to {
                -o-transform: rotate(359deg)
            }
        }
        @keyframes rotation {
            from {
                transform: rotate(0deg)
            }
            to {
                transform: rotate(359deg)
            }
        }
    `;

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

            <style>{ containerStyle }</style>
        </div>
    );

    on(EVENT.CLOSE, () => {
        container.className += ` ${ tag }-loading`;
    });

    return (
        <div id={ id } class="paypal-checkout-sandbox">
            <style>{ sandboxStyle }</style>

            <iframe name={ `__paypal_checkout_sandbox_${ id }__` } scrolling="no" class="paypal-checkout-sandbox-iframe">
                { container }
            </iframe>
        </div>
    );
}
