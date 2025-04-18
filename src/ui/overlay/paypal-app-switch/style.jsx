/* @flow */

export function getSandboxStyle({ uid }: {| uid: string |}): string {
  return `
        #${uid}.paypal-checkout-sandbox {
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

            animation-duration: 0.3s;
            animation-iteration-count: 1;
            animation-fill-mode: forwards !important;
            opacity: 0;
        }

        #${uid}.paypal-checkout-sandbox .paypal-checkout-sandbox-iframe {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        @keyframes show-container {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }

        @keyframes hide-container {
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

export function getContainerStyle({ uid }: {| uid: string |}): string {
  return `
        #${uid} {
            position: absolute;
            z-index: 2147483647;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            transform: translate3d(0, 0, 0);

            background: radial-gradient(84.48% 50% at 50% 50%, #000 0%, rgba(0, 0, 0, 0.75) 100%);

            color: #fff;
        }

        #${uid} a {
            color: #fff;
        }

        #${uid} .paypal-checkout-close:before,
        #${uid} .paypal-checkout-close:after {
            background-color: #fff;
        }

        #${uid} a {
            text-decoration: none;
        }

        #${uid} .paypal-checkout-modal {
            font-family: PayPalPlain-Regular, system-ui, -apple-system, Roboto, "Segoe UI", Helvetica-Neue, Helvetica, Arial, sans-serif;
            font-size: 14px;
            text-align: center;

            box-sizing: border-box;
            width: 100%;
            max-width: 350px;
            top: 50%;
            left: 50%;
            position: absolute;
            transform: translateX(-50%) translateY(-50%);
            text-align: center;
        }

        #${uid}.paypal-overlay-loading .paypal-checkout-message, #${uid}.paypal-overlay-loading .paypal-checkout-continue {
            display: none;
        }

        #${uid} .paypal-checkout-modal .paypal-checkout-logo {
            cursor: pointer;
            margin-bottom: 8px;
            display: inline-block;
        }

        #${uid} .paypal-checkout-modal .paypal-checkout-logo img {
            height: 44px;
        }

        #${uid} .paypal-checkout-modal .paypal-checkout-message {
            font-size: 14px;
            line-height: 18px;
            padding: 8px 16px;
        }

        #${uid} .paypal-checkout-modal .paypal-checkout-continue {
            font-size: 14px;
            line-height: 18px;
            padding: 8px 0;
            font-weight: bold;
        }

        #${uid} .paypal-checkout-modal .paypal-checkout-continue a {
            border-bottom: 1px solid white;
        }

        #${uid} .paypal-checkout-close {
            position: absolute;
            right: 16px;
            top: 16px;
            width: 24px;
            height: 24px;
        }

        #${uid}.paypal-overlay-loading .paypal-checkout-close {
            display: none;
        }

        #${uid} .paypal-checkout-close:before, .paypal-checkout-close:after {
            position: absolute;
            left: 11px;
            content: ' ';
            height: 24px;
            width: 2px;
        }

        #${uid} .paypal-checkout-close:before {
            transform: rotate(45deg);
        }

        #${uid} .paypal-checkout-close:after {
            transform: rotate(-45deg);
        }
    `;
}
