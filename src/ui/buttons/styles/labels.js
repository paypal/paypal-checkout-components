/* @flow */

import { CLASS } from "../../../constants";

export const COMPRESSED = `
    max-width: 0%;
    opacity: 0;
    overflow: hidden;
`;

export const EXPANDED = `
    max-width: 100%;
    opacity: 1;
`;

export const HIDDEN = `
    position: absolute;
    visibility: hidden;
`;

export const VISIBLE = `
    position: static;
    visibility: visible;
`;

export const labelStyle = `

    .${CLASS.BUTTON} .${CLASS.TEXT} {
        ${HIDDEN}
    }

    .${CLASS.BUTTON} .${CLASS.TEXT}.${CLASS.IMMEDIATE}:not(.${
  CLASS.PERSONALIZATION_TEXT
}):not(.${CLASS.HIDDEN}) {
        ${VISIBLE}
        ${EXPANDED}
    }

    .${CLASS.BUTTON} .${CLASS.VAULT_LABEL} {
        max-width: 60%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .${CLASS.DOM_READY} .${CLASS.BUTTON} .${CLASS.TEXT}:not(.${
  CLASS.IMMEDIATE
}):not(.${CLASS.PERSONALIZATION_TEXT}):not(.${CLASS.HIDDEN}) {
        ${VISIBLE}
        ${COMPRESSED}
        animation: show-text ${__TEST__ ? "0" : "1"}s 0s forwards;
    }

    @keyframes show-text {
        0% { ${COMPRESSED} }
        100% { ${EXPANDED} }
    }

    .${CLASS.BUTTON_LABEL} {
        font-family: system-ui, -apple-system, Roboto, "Segoe UI", Helvetica-Neue, Helvetica, Arial, sans-serif;
        font-weight: 500;
    }

    .${CLASS.BUTTON_REBRAND} .${CLASS.BUTTON_LABEL} {
        font-family: PayPal Plain, system-ui, -apple-system, Roboto, "Segoe UI", Helvetica-Neue, Helvetica, Arial, sans-serif;
        font-weight: 400;
    }

    .${CLASS.BUTTON_REBRAND}[data-funding-source=paypal] .${CLASS.BUTTON_LABEL},
    .${CLASS.BUTTON_REBRAND}[data-funding-source=credit] .${CLASS.BUTTON_LABEL},
    .${CLASS.BUTTON_REBRAND}[data-funding-source=paylater] .${
  CLASS.BUTTON_LABEL
} {
        font-family: PayPal Pro Book, system-ui, -apple-system, Roboto, "Segoe UI", Helvetica-Neue, Helvetica, Arial, sans-serif;
        font-weight: 500;
    }

    .${CLASS.BUTTON_REBRAND}[data-funding-source=venmo] .${CLASS.BUTTON_LABEL} {
        font-family: Scto Grotesk A, system-ui, -apple-system, Roboto, "Segoe UI", Helvetica-Neue, Helvetica, Arial, sans-serif;
    }

    /* targeting only credit and paylater buttons for the logo swap */
    .${CLASS.BUTTON_REBRAND}[data-funding-source=credit],
    .${CLASS.BUTTON_REBRAND}[data-funding-source=paylater] {
        container-type: size;
    }

    .${CLASS.BUTTON_REBRAND} .${CLASS.LOGO_PP_REBRAND} {
        display: none;
    }

    /* At smaller sizes, swap out the full paypal watermark for the smaller pp monogram. At 150px-200px wide: 25-40px show wordmark, 45px triggers monogram. */
    @container ((max-width: 197px) and (min-height: 43px)) or ((max-width: 147px) and (max-height: 43px)) or ((max-width: 250px) and (min-height: 60px)) {
        .${CLASS.BUTTON_LABEL} > .${CLASS.LOGO_REBRAND} {
            display: none;
        }

        .${CLASS.BUTTON_LABEL} > .${CLASS.LOGO_PP_REBRAND} {
            display: inline-block;
        }
    }
`;
