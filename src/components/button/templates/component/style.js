/* @flow */

import { BUTTON_LABEL, BUTTON_COLOR, TAGLINE_COLOR, BUTTON_SHAPE, BRANDING,
    LAYOUT } from '../../constants';

export let componentStyle = `

    html, body {
        padding: 0;
        margin: 0;
        width: 100%;
        overflow: hidden;
        text-align: center;
    }

    * {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }


    /* Base Button */

    .paypal-button {
        display: block;
        white-space: nowrap;
        margin: 0;
        background: 0;
        border: 0;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        text-transform: none;
        font-weight: 500;
        -webkit-font-smoothing: antialiased;
        font-smoothing: antialiased;
        z-index: 0;
        font-size: 0;

        width: 100%;

        min-width: 100px;
        min-height: 24px;

        box-sizing: border-box;
    }



    .paypal-button .paypal-button-content {
        display: inline-block;
        padding: 4px 8px 4px;
        border: 1px solid transparent;
        border-radius: 0 3px 3px 0;
        position: relative;
        width: 100%;
        box-sizing: border-box;
        border: none;
        vertical-align: top;
        cursor: pointer;
        outline: none;
    }

    .paypal-button .paypal-button-content:hover {
        box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.2), 0 0 1px 1px rgba(255, 255, 255, 0.2);
    }

    .paypal-button .paypal-button-content:focus {
        box-shadow: -1px -1px 18px 1px rgba(0, 0, 0, 0.25) inset;
    }

    .paypal-button .paypal-button-content:nth-child(2):focus {
        box-shadow: -1px -1px 18px 1px rgba(0, 0, 0, 0.25) inset;
    }

    .paypal-button .paypal-button-content .logo {
        padding: 0;
        display: inline-block;
        background: none;
        border: none;
        width: auto;
    }

    .paypal-button .paypal-button-content .logo.logo-pp {
        margin-right: 2px;
    }

    .paypal-button .paypal-button-content .text {
        display: inline-block;
        white-space: pre;
    }

    .paypal-button.paypal-branding-${ BRANDING.UNBRANDED } .paypal-button-content .text .branding {
        display: none;
    }

    .paypal-button .paypal-button-content .logo, .paypal-button .paypal-button-content .text {
        vertical-align: top;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        text-align: left;
        visibility: hidden;
    }

    .paypal-button .paypal-tagline {
        max-width: 100%;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-weight: normal;
        display: block;
        text-align: center;
        width: auto;
        margin-top: 2px;
        visibility: hidden;
    }

    .paypal-button .paypal-tagline.paypal-tagline-color-${ TAGLINE_COLOR.BLUE } {
        color: #003366;
    }

    .paypal-button .paypal-tagline.paypal-tagline-color-${ TAGLINE_COLOR.BLACK } {
        color: #6C7378;
    }

    /* Small */

    @media only screen and (min-width : 0px) {
        .paypal-button {
            max-width: 200px;
        }

        .paypal-button .paypal-button-content {
            height: 26px;
            border-radius: 13px;
        }

        .paypal-button .paypal-button-content,
        .paypal-button .paypal-tagline {
            font-size: 10px;
        }

        .paypal-button.paypal-branding-${ BRANDING.UNBRANDED } .paypal-button-content {
            font-size: 13px;
        }

        .paypal-button .paypal-button-content .logo.logo-pp {
            height: 18px;
        }

        .paypal-button .paypal-button-content .logo.logo-paypal,
        .paypal-button .paypal-button-content .logo.logo-venmo,
        .paypal-button .paypal-button-content .logo.logo-credit {
            height: 17px;
        }

        .paypal-button.paypal-shape-${ BUTTON_SHAPE.RECT } .paypal-button-content {
            border-radius: 4px;
        }
    }

    @media only screen and (max-width : 147px) {

        .paypal-button .paypal-button-content.paypal-label-credit .logo.logo-paypal {
            display: none;
        }

        .paypal-button.paypal-layout-${ LAYOUT.DUAL } .paypal-button-content:nth-child(2) {
            display: none;
        }

        .paypal-button .paypal-tagline {
            display: none;
        }
    }

    @media only screen and (min-width : 148px) {

        .paypal-button.paypal-layout-${ LAYOUT.DUAL } .paypal-button-content .logo.logo-pp {
            height: 16px;
        }

        .paypal-button.paypal-layout-${ LAYOUT.DUAL } .paypal-button-content .logo.logo-paypal,
        .paypal-button.paypal-layout-${ LAYOUT.DUAL } .paypal-button-content .logo.logo-venmo,
        .paypal-button.paypal-layout-${ LAYOUT.DUAL } .paypal-button-content .logo.logo-credit {
            height: 15px;
        }

        .paypal-button.paypal-layout-${ LAYOUT.DUAL } .paypal-button-content {
            width: 49%;
        }

        .paypal-button.paypal-layout-${ LAYOUT.DUAL } .paypal-button-content:nth-child(1) {
            margin-right: 2%;
        }
    }

    /* Medium */

    @media only screen and (min-width : 200px) {

        .paypal-button {
            max-width: 300px;
        }

        .paypal-button .paypal-button-content {
            height: 32px;
            border-radius: 16px;
        }

        .paypal-button .paypal-button-content,
        .paypal-button .paypal-tagline {
            font-size: 12px;
        }

        .paypal-button.paypal-branding-${ BRANDING.UNBRANDED } .paypal-button-content  {
            font-size: 15px;
        }

        .paypal-button .paypal-button-content .logo.logo-pp {
            height: 23px;
        }

        .paypal-button .paypal-button-content .logo.logo-paypal,
        .paypal-button .paypal-button-content .logo.logo-venmo,
        .paypal-button .paypal-button-content .logo.logo-credit {
            height: 22px;
        }

        .paypal-button.paypal-layout-${ LAYOUT.DUAL } .paypal-button-content .logo.logo-pp {
            height: 21px;
        }

        .paypal-button.paypal-layout-${ LAYOUT.DUAL } .paypal-button-content .logo.logo-paypal,
        .paypal-button.paypal-layout-${ LAYOUT.DUAL } .paypal-button-content .logo.logo-venmo,
        .paypal-button.paypal-layout-${ LAYOUT.DUAL } .paypal-button-content .logo.logo-credit {
            height: 20px;
        }

        .paypal-button.paypal-shape-${ BUTTON_SHAPE.RECT } .paypal-button-content {
            border-radius: 6px;
        }
    }

    /* Large */

    @media only screen and (min-width : 300px) {

        .paypal-button {
            max-width: 500px;
        }

        .paypal-button .paypal-button-content {
            height: 42px;
            border-radius: 21px;
        }

        .paypal-button .paypal-button-content,
        .paypal-button .paypal-tagline {
            font-size: 14px;
        }

        .paypal-button.paypal-branding-${ BRANDING.UNBRANDED } .paypal-button-content  {
            font-size: 18px;
        }

        .paypal-button .paypal-button-content .logo.logo-pp {
            height: 30px;
        }

        .paypal-button .paypal-button-content .logo.logo-paypal,
        .paypal-button .paypal-button-content .logo.logo-venmo,
        .paypal-button .paypal-button-content .logo.logo-credit {
            height: 27px;
        }

        .paypal-button.paypal-layout-${ LAYOUT.DUAL } .paypal-button-content .logo.logo-pp {
            height: 27px;
        }

        .paypal-button.paypal-layout-${ LAYOUT.DUAL } .paypal-button-content .logo.logo-paypal,
        .paypal-button.paypal-layout-${ LAYOUT.DUAL } .paypal-button-content .logo.logo-venmo,
        .paypal-button.paypal-layout-${ LAYOUT.DUAL } .paypal-button-content .logo.logo-credit {
            height: 24px;
        }

        .paypal-button.paypal-shape-${ BUTTON_SHAPE.RECT } .paypal-button-content {
            border-radius: 6px;
        }
    }


    /* Gold */

    .paypal-button .paypal-button-content.paypal-color-${ BUTTON_COLOR.GOLD } {
        background: #ffc439;
        color: #000;
        text-shadow: 0px 1px 0 #ffdc88;
    }

    /* Blue */

    .paypal-button .paypal-button-content.paypal-color-${ BUTTON_COLOR.BLUE } {
        background: #009cde;
        color: #fff;
        text-shadow: 0px -1px 0 #0d86bb;
    }

    /* Silver */

    .paypal-button .paypal-button-content.paypal-color-${ BUTTON_COLOR.SILVER } {
        background: #eee;
        color: #000;
        text-shadow: 0px -1px 0 #ccc;
    }

     /* Black */

    .paypal-button .paypal-button-content.paypal-color-${ BUTTON_COLOR.BLACK } {
        background: #2C2E2F;
        color: #fff;
        text-shadow: 0px 1px 0 #6C7378;
    }




     /* Credit Button */

    .paypal-button .paypal-button-content.paypal-label-${ BUTTON_LABEL.CREDIT }.paypal-color-${ BUTTON_COLOR.CREDITBLUE } {
        background: #003087;
        color: #fff;
        text-shadow: 0px -1px 0 #0d86bb;
    }

    .paypal-button .paypal-button-content.paypal-label-${ BUTTON_LABEL.CREDIT } .text {
        display: none !important;
    }

    .paypal-button.paypal-branding-${ BRANDING.UNBRANDED } .paypal-button-content  {
        min-width: 60%;
        width: auto;
        font-weight: 900;
    }
`;
