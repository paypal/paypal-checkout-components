/* @flow */

import { ENV, FUNDING } from "@paypal/sdk-constants/src";
import { LOGO_CLASS } from "@paypal/sdk-logos/src";

import { CLASS, ATTRIBUTE } from "../../../constants";

const MIN_VAULT_BUTTON_WIDTH = 250;

export const buttonStyle = `

    .${CLASS.CONTAINER} {
        display: block;
        white-space: nowrap;
        margin: 0;
        background: 0;
        border: 0;
        font-family: PayPalPlain-Regular, system-ui, -apple-system, Roboto, "Segoe UI", Helvetica-Neue, Helvetica, Arial, sans-serif;
        text-transform: none;
        font-weight: 500;
        font-smoothing: antialiased;
        z-index: 0;
        font-size: 0;
        width: 100%;
        box-sizing: border-box;
    }

    .${CLASS.BUTTON} {
        border: 1px solid transparent;
        border-radius: 0 3px 3px 0;
        width: 100%;
        box-sizing: border-box;
        border: none;
        vertical-align: top;
        cursor: pointer;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .${CLASS.BUTTON} * {
        cursor: pointer;
    }

    .${CLASS.CONTAINER}.${CLASS.ENV}-${ENV.TEST} .${CLASS.TEXT} {
        background: rgba(0, 0, 0, 0.5) !important;
        color: transparent  !important;
        text-shadow: none  !important;
    }

    .${CLASS.CARD} {
        cursor: pointer;
    }

    .${LOGO_CLASS.LOGO} {
        padding: 0;
        display: inline-block;
        background: none;
        border: none;
        width: auto;
    }

    .${CLASS.TEXT}, .${CLASS.SPACE} {
        display: block;
        vertical-align: top;
        min-width: 0;
        flex: 0 0 auto;
        overflow: hidden;
        white-space: pre;
    }

    .${CLASS.BUTTON_LABEL} {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: nowrap;
        min-width: 0px;
    }
                
    .${CLASS.BUTTON_LABEL} img {
        height: 100%;
    }

.${CLASS.BUTTON}.center-line {
  position: relative;
}

.${CLASS.BUTTON}.center-line::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 0.1px;
  background-color: red; /* Use a bright color that will stand out */
  z-index: 9999; /* Make sure it's on top of other elements */
  pointer-events: none; /* So it doesn't interfere with clicks */
}

    .${CLASS.BUTTON} > .${CLASS.BUTTON_LABEL} {
        display: flex;
        // align-items: stretch;
        align-items: center;
        justify-content: center;
        flex-wrap: nowrap;
        width: 100%;
    }


    .${CLASS.BUTTON} > .${CLASS.BUTTON_LABEL} * {
        vertical-align: middle;
        text-align: left;
    }
    
    .${CLASS.BUTTON_LABEL} > .paypal-logo {
        height: 100%;
    }

    .${CLASS.TAGLINE} {
        max-width: 100%;
        font-size: initial;
        font-weight: 400;
        display: block;
        text-align: center;
        width: auto;
    }

    .${CLASS.BUTTON} .${CLASS.SPINNER} {
        position: absolute;
        height: 40px;
        width: 40px;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        box-sizing: border-box;
        border: 3px solid rgba(0, 0, 0, .2);
        border-top-color: rgba(33, 128, 192, 0.8);
        border-radius: 100%;
        animation: ${CLASS.SPINNER}-rotation .7s infinite linear;
    }

    @keyframes ${CLASS.SPINNER}-rotation {
        from {
            transform: translateX(-50%) translateY(-50%) rotate(0deg);
        }
        to {
            transform: translateX(-50%) translateY(-50%) rotate(359deg);
        }
    }

    .${CLASS.BUTTON} .${CLASS.SPINNER} {
        display: none !important;
    }

    .${CLASS.BUTTON}.${CLASS.LOADING} * {
        display: none !important;
    }

    .${CLASS.BUTTON}.${CLASS.LOADING} .${CLASS.SPINNER} {
        display: block !important;
    }

    .${CLASS.CONTAINER} .${CLASS.VAULT_HEADER} {
        margin-top: 10px;
    }

    @media only screen and (max-width: ${MIN_VAULT_BUTTON_WIDTH - 1}px) {
        .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW}.${CLASS.WALLET}.${
  CLASS.WALLET_MENU
} .${CLASS.BUTTON}  {
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            width: 100%;
        }
    }
`;
