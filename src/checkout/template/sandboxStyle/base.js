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
}
