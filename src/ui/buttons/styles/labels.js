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

    /* Latin */
    @font-face {
        font-family: "PayPal Pro Book";
        font-weight: 500;
        font-style: normal;
        font-display: swap;
        src: url("https://cdn-35b6cc3b59c94.static.engineering.dev.paypalinc.com/test-fonts/PayPalPro-Book-ui.woff2") format("woff2");
        unicode-range: U+0020-007E, U+00A0-00FF;
    }

    /* Korean */
    @font-face {
        font-family: "PayPal Pro Book";
        font-weight: 500;
        font-style: normal;
        font-display: swap;
        src: url("https://cdn-35b6cc3b59c94.static.engineering.dev.paypalinc.com/test-fonts/PayPalPro-Book-KR-ui.woff2") format("woff2");
        unicode-range:
            U+1100-11FF,     /* Hangul Jamo */
            U+3130-318F,     /* Hangul Compatibility Jamo */
    }

    /* Japanese */
    @font-face {
        font-family: "PayPal Pro Book";
        font-weight: 500;
        font-style: normal;
        font-display: swap;
        src: url("https://cdn-35b6cc3b59c94.static.engineering.dev.paypalinc.com/test-fonts/PayPalPro-Book-JP-ui.woff2") format("woff2");
        unicode-range: 
            "U+3040-309F", # Hiragana 
            "U+30A0-30FF", # Katakana 
            "U+4E00-9FFF", # Kanji
    }

    /* Arabic */
    @font-face {
        font-family: "PayPal Pro Book";
        font-weight: 500;
        font-style: normal;
        font-display: swap;
        src: url("https://cdn-35b6cc3b59c94.static.engineering.dev.paypalinc.com/test-fonts/PayPalPro-Book-AR-ui.woff2") format("woff2");
        unicode-range: U+0600-06FF; 
    }

    /* Cyrillic */
    @font-face {
        font-family: "PayPal Pro Book";
        font-weight: 500;
        font-style: normal;
        font-display: swap;
        src: url("https://cdn-35b6cc3b59c94.static.engineering.dev.paypalinc.com/test-fonts/PayPalPro-Book-CY-ui.woff2") format("woff2");
        unicode-range:
            U+0400-04FF,     /* Cyrillic */
            U+0500-052F;     /* Cyrillic Supplement */

    }

    /* Greek */
    @font-face {
        font-family: "PayPal Pro Book";
        font-weight: 500;
        font-style: normal;
        font-display: swap;
        src: url("https://cdn-35b6cc3b59c94.static.engineering.dev.paypalinc.com/test-fonts/PayPalPro-Book-GR-ui.woff2") format("woff2");
         unicode-range:
            U+0020-007E,     /* ASCII */
            U+0370-03FF;     /* Greek */
    }

    /* Venmo */
    @font-face {
        font-family: "Scto Grotesk A";
        font-weight: 500;
        font-style: normal;
        font-display: swap;
        src: url("https://cdn-93d21c93e98e4.static.engineering.dev.paypalinc.com/test-fonts/Scto-Grotesk-A-Medium-ui.woff2") format("woff2");
        unicode-range: U+0020-007E, U+00A0-00FF;
    }

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
        font-family: "PayPal Pro Book", system-ui, -apple-system, Roboto, "Segoe UI", Helvetica-Neue, Helvetica, Arial, sans-serif;
    }

    .${CLASS.BUTTON_REBRAND}, div[data-funding-source=venmo] .${
  CLASS.BUTTON_LABEL
} {
        font-family: "Scto Grotesk A", system-ui, -apple-system, Roboto, "Segoe UI", Helvetica-Neue, Helvetica, Arial, sans-serif;
    }


`;
