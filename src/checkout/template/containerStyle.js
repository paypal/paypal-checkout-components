/* @flow */

export function getSandboxStyle({ id, ANIMATION } : { id : string, ANIMATION : Object }) : string {
    return `
        #${ id }.paypal-checkout-sandbox {
            display: block;
            position: fixed;
            top: 0;
            left: 0;

            width: 100%;
            height: 100%;
            width: 100vw;
            height: 100vh;
            max-width: 100%;
            max-height: 100%;
            min-width: 100%;
            min-height: 100%;

            z-index: 2147483647;

            animation-duration: 1s;

            animation-fill-mode:forwards;
            animation-iteration-count: 1;
        }

        #${ id }.paypal-checkout-sandbox .paypal-checkout-sandbox-iframe {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        @keyframes ${ ANIMATION.SHOW_CONTAINER } {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
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
}

export function getContainerStyle({ id, tag, CONTEXT, CLASS, ANIMATION } : { id : string, tag : string, CONTEXT : Object, CLASS : Object, ANIMATION : Object }) : string {
    return `
        #${ id } {
            position: absolute;
            z-index: 2147483647;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            transform: translate3d(0, 0, 0);

            background-color: black;
            background-color: rgba(0, 0, 0, 0.8);
            background: radial-gradient(50% 50%, ellipse closest-corner, rgba(0,0,0,0.6) 1%, rgba(0,0,0,0.8) 100%);

            color: #fff;
        }

        #${ id } a {
            color: #fff;
        }

        #${ id } .paypal-checkout-close:before,
        #${ id } .paypal-checkout-close:after {
            background-color: #fff;
        }

        #${ id }.${ tag }-context-${ CONTEXT.POPUP } {
            cursor: pointer;
        }

        #${ id } a {
            text-decoration: none;
        }

        #${ id } .paypal-checkout-modal {
            font-family: "HelveticaNeue", "HelveticaNeue-Light", "Helvetica Neue Light", helvetica, arial, sans-serif;
            font-size: 14px;
            text-align: center;

            box-sizing: border-box;
            max-width: 350px;
            top: 50%;
            left: 50%;
            position: absolute;
            transform: translateX(-50%) translateY(-50%);
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
            cursor: pointer;
            margin-bottom: 30px;
            display: inline-block;
        }

        #${ id } .paypal-checkout-modal .paypal-checkout-logo img {
            height: 36px;
        }

        #${ id } .paypal-checkout-modal .paypal-checkout-logo img.paypal-checkout-logo-pp {
            margin-right: 10px;
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
            font-weight: bold;
        }

        #${ id } .paypal-checkout-modal .paypal-checkout-continue a {
            border-bottom: 1px solid white;
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
        }

        #${ id } .paypal-checkout-close:before {
            transform: rotate(45deg);
        }

        #${ id } .paypal-checkout-close:after {
            transform: rotate(-45deg);
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
            transform: translate3d(-50%, -50%, 0);

            border-radius: 10px;
            overflow: hidden;
        }

        #${ id }.${ tag }-context-${ CONTEXT.IFRAME } .${ CLASS.OUTLET } {

            position: relative;

            transition: all 0.3s ease;
            animation-duration: 0.3s;
            animation-fill-mode: both;

            min-width: 450px;
            max-width: 450px;
            width: 450px;
            height: 535px;

            background-color: white;

            overflow: auto;
        }

        #${ id }.${ tag }-context-${ CONTEXT.IFRAME } .${ CLASS.OUTLET } > iframe {
            position: absolute;
            top: 0;
            left: 0;
            transition: opacity .4s ease-in-out;
        }

        #${ id }.${ tag }-context-${ CONTEXT.IFRAME } .${ CLASS.OUTLET } > iframe.${ CLASS.COMPONENT_FRAME } {
            z-index: 100;
        }

        #${ id }.${ tag }-context-${ CONTEXT.IFRAME } .${ CLASS.OUTLET } > iframe.${ CLASS.PRERENDER_FRAME } {
            z-index: 200;
        }

        #${ id }.${ tag }-context-${ CONTEXT.IFRAME } .${ CLASS.OUTLET } > iframe.${ CLASS.VISIBLE } {
            opacity: 1;
            z-index: 200;
        }

        #${ id }.${ tag }-context-${ CONTEXT.IFRAME } .${ CLASS.OUTLET } > iframe.${ CLASS.INVISIBLE } {
            opacity: 0;
            z-index: 100;
        }

        @media screen and (max-width: 470px) {

            #${ id }.${ tag }-context-${ CONTEXT.IFRAME } .paypal-checkout-iframe-container,
            #${ id }.${ tag }-context-${ CONTEXT.IFRAME } .${ CLASS.OUTLET } {
                min-width: 100%;
                min-width: calc(100% - 20px);

                max-width: 100%;
                max-width: calc(100% - 20px);
            }
        }

        #${ id }.${ tag }-context-${ CONTEXT.IFRAME } .${ CLASS.OUTLET } iframe {
            width: 1px;
            min-width: 100%;
            height: 100%;
        }

        @keyframes ${ ANIMATION.SHOW_COMPONENT } {
            from {
                opacity: 0;
                transform: scale3d(.3, .3, .3);
            }

            to {
                opacity: 1;
                transform: scale3d(1, 1, 1);
            }
        }

        @keyframes ${ ANIMATION.HIDE_COMPONENT } {
            from {
                transform: scale3d(1, 1, 1);
            }

            to {
                opacity: 0;
                transform: scale3d(.3, .3, .3);
            }
        }

        .paypal-spinner {
            height: 30px;
            width: 30px;
            display: inline-block;
            box-sizing: content-box;
            opacity: 1;
            filter: alpha(opacity=100);
            animation: rotation .7s infinite linear;
            border-left: 8px solid rgba(0, 0, 0, .2);
            border-right: 8px solid rgba(0, 0, 0, .2);
            border-bottom: 8px solid rgba(0, 0, 0, .2);
            border-top: 8px solid #fff;
            border-radius: 100%
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
}
