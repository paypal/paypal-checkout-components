/* @flow */

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
        white-space: nowrap;
        margin: 0;
        padding: 2px;
        background: 0;
        border: 0;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        text-transform: none;
        font-weight: 500;
        -webkit-font-smoothing: antialiased;
        font-smoothing: antialiased;
        cursor: pointer;
        z-index: 0;

        width: 100%;

        min-width: 80px;
        min-height: 22px;

        box-sizing: border-box;
        outline: none;
    }

    .paypal-button .paypal-button-content {
        padding: 4px 8px 4px;
        border: 1px solid transparent;
        border-radius: 0 3px 3px 0;
        padding-top: 0;
        padding-bottom: 0;
        position: relative;
        display: inline-block;

        width: 100%;
        padding: 2px;

        box-sizing: border-box;
        border: none;
    }

    .paypal-button .paypal-button-content img {
        padding: 0;
        display: inline-block;
        background: none;
        border: none;
        vertical-align: middle;
    }

    .paypal-button .paypal-button-content .text {
        display: inline-block;
        padding: 0 3px;
        vertical-align: middle;
        padding-top: 2px;
    }

    .paypal-button .paypal-button-content::before {
        content: "";
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
    }

    .paypal-button .paypal-button-tag-content {
        max-width: 100%;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-weight: normal;
        color: #003366;
        display: block;
        text-align: center;
        width: auto;
        font-size: 9px;
        margin-top: 1px;
    }


    @media only screen and (max-width : 79px) {
        .paypal-button {
            display: none;
        }
    }

    @media only screen and (max-height : 21px) {
        .paypal-button {
            display: none;
        }
    }


    /* Tiny */

    @media only screen and (min-width : 80px) {
        html, body {
            min-height: 22px;
        }
    }

    @media only screen and (min-width : 80px) and (min-height: 22px) {

        .paypal-button {
            max-width: 100px;
        }

        .paypal-button .paypal-button-content {
            height: 18px;
            max-height: 18px;
            padding: 0 5px;
            border-radius: 9px;
            font-size: 10px;
        }

        .paypal-button .paypal-button-content img {
            height: 16px;
            padding-top: 1px;
        }

        .paypal-button .paypal-button-content .text {

        }

        .paypal-button .paypal-button-content::before {
            padding: 1px;
            top: -1px;
            left: -1px;
            z-index: -1;
            border-radius: 10px;
        }

        .paypal-button.paypal-shape-rect .paypal-button-content::before {
            border-radius: 3px;
        }

        .paypal-button.paypal-shape-rect .paypal-button-content {
            border-radius: 3px;
        }
    }

    /* Small */

    @media only screen and (min-width : 100px) {
        html, body {
            min-height: 22px;
            max-height: 42px;
        }
    }

    @media only screen and (min-width : 100px) and (min-height: 22px) {

        .paypal-button {
            max-width: 180px;
        }

        .paypal-button .paypal-button-content {
            height: 24px;
            max-height: 24px;
            padding: 0 6px;
            border-radius: 12px;
            font-size: 10px;
        }

        .paypal-button .paypal-button-content .text {
            max-width: 60px;
            padding: 0 4px;
            padding-top: 2px;
        }

        .paypal-button .paypal-button-content img {
            height: 20px;
            padding-top: 2px;
        }

        .paypal-button .paypal-button-content::before {
            padding: 1px;
            top: -1px;
            left: -1px;
            border-radius: 14px;
        }

        .paypal-button.paypal-shape-rect .paypal-button-content,
        .paypal-button.paypal-shape-rect .paypal-button-content::before {
            border-radius: 4px;
        }
    }


    /* Medium */

    @media only screen and (min-width : 180px) {
        html, body {
            min-height: 48px;
            max-height: 48px;
        }
    }

    @media only screen and (min-width : 180px) and (min-height: 48px) {

        .paypal-button {
            max-width: 250px;
        }

        .paypal-button .paypal-button-content {
            height: 30px;
            max-height: 30px;
            padding: 0 6px;
            border-radius: 15px;
            font-size: 12px;
        }

        .paypal-button .paypal-button-content img {
            height: 24px;
            padding-top: 3px;
        }

        .paypal-button .paypal-button-content .text {
            max-width: 140px;
            padding: 0 4px;
            padding-top: 5px;
        }

        .paypal-button .paypal-button-content::before {
            padding: 2px;
            top: -2px;
            left: -2px;
            border-radius: 17px;
        }

        .paypal-button .paypal-button-tag-content {
            font-size: 10px;
        }

        .paypal-button.paypal-shape-rect .paypal-button-content,
        .paypal-button.paypal-shape-rect .paypal-button-content::before {
            border-radius: 6px;
        }
    }


    /* Large */

    @media only screen and (min-width : 250px) {
        html, body {
            min-height: 60px;
            max-height: 60px;
        }
    }

    @media only screen and (min-width : 250px) and (min-height: 60px) {

        .paypal-button {
            max-width: 500px;
        }

        .paypal-button .paypal-button-content {
            height: 40px;
            max-height: 40px;
            padding: 0 6px;
            border-radius: 20px;
            font-size: 14px;
        }

        .paypal-button .paypal-button-content img {
            height: 29px;
            padding-top: 6px;
        }

        .paypal-button .paypal-button-content .text {
            max-width: 140px;
            padding: 0 5px;
            padding-top: 8px;
        }

        .paypal-button .paypal-button-content::before {
            padding: 2px;
            top: -2px;
            left: -2px;
            border-radius: 22px;
        }

        .paypal-button.paypal-shape-rect .paypal-button-content,
        .paypal-button.paypal-shape-rect .paypal-button-content::before {
            border-radius: 6px;
        }
    }




    /* Gold */

    .paypal-button.paypal-color-gold .paypal-button-content {
        background: #ffc439;
        color: #000;
        text-shadow: 0px 1px 0 #ffdc88;
    }

    .paypal-button.paypal-color-gold .paypal-button-content::before {
        background: -webkit-gradient(linear, 0 0, 0 100%, from(#ffdc88), to(#d9a630)) 0 100%;
        background: -webkit-linear-gradient(#ffdc88, #d9a630) 0 100%;
        background: -moz-linear-gradient(#ffdc88, #d9a630) 0 100%;
        background: -o-linear-gradient(#ffdc88, #d9a630) 0 100%;
        background: linear-gradient(to bottom, #ffdc88, #d9a630) 0 100%;
    }


    /* Blue */

    .paypal-button.paypal-color-blue .paypal-button-content {
        background: #009cde;
        color: white;
        text-shadow: 0px -1px 0 #0d86bb;
    }
    .paypal-button.paypal-color-blue .paypal-button-content::before {
        background: -webkit-gradient(linear, 0 0, 0 100%, from(#4dbae8), to(#0d86bb)) 0 100%;
        background: -webkit-linear-gradient(#4dbae8, #0d86bb) 0 100%;
        background: -moz-linear-gradient(#4dbae8, #0d86bb) 0 100%;
        background: -o-linear-gradient(#4dbae8, #0d86bb) 0 100%;
        background: linear-gradient(to bottom, #4dbae8, #0d86bb) 0 100%;
    }


    /* Silver */

    .paypal-button.paypal-color-silver .paypal-button-content {
        background: #eee;
        color: #000;
        text-shadow: 0px -1px 0 #ccc;
    }

    .paypal-button.paypal-color-silver .paypal-button-content::before {
        background: -webkit-gradient(linear, 0 0, 0 100%, from(#f5f5f5), to(#cccccc)) 0 100%;
        background: -webkit-linear-gradient(#f5f5f5, #cccccc) 0 100%;
        background: -moz-linear-gradient(#f5f5f5, #cccccc) 0 100%;
        background: -o-linear-gradient(#f5f5f5, #cccccc) 0 100%;
        background: linear-gradient(to bottom, #f5f5f5, #cccccc) 0 100%;
    }


    /* Credit Blue */

    .paypal-button.paypal-style-credit .paypal-button-content {
        background: #003087;
        color: white;
        text-shadow: 0px -1px 0 #0d86bb;
    }

    .paypal-button.paypal-style-credit .paypal-button-content::before {
        background: -webkit-gradient(linear, 0 0, 0 100%, from(#f5f5f5), to(#cccccc)) 0 100% !important;
        background: -webkit-linear-gradient(#f5f5f5, #cccccc) 0 100%;
        background: -moz-linear-gradient(#f5f5f5, #cccccc) 0 100%;
        background: -o-linear-gradient(#f5f5f5, #cccccc) 0 100%;
        background: linear-gradient(to bottom, #f5f5f5, #cccccc) 0 100% !important;
    }





    /* Credit Button */

    @media only screen and (max-width : 147px) {
        .paypal-button.paypal-style-credit {
            display: none;
        }
    }

    .paypal-button.paypal-style-credit {
        min-width: 148px;
        min-height: 42px;
    }

    .paypal-button.paypal-style-credit .paypal-button-content .text {
        display: none !important;
    }


    /* Credit  Small */

    @media only screen and (min-width: 148px) and (min-height: 42px) {

        .paypal-button.paypal-style-credit .paypal-button-content img  {
            height: 16px;
            padding-top: 4px;
        }
    }


    /* Credit Medium */

    @media only screen and (min-width: 180px) and (min-height: 48px) {

        .paypal-button.paypal-style-credit .paypal-button-content img  {
            height: 20px;
            padding-top: 5px;
        }

    }

    /* Credit Large */

    @media only screen and (min-width: 250px) and (min-height: 60px) {

        .paypal-button.paypal-style-credit .paypal-button-content img {
            height: 28px;
            padding-top: 7px;
        }

    }
    
    /* Pay Button */

            @media only screen and (max-width : 147px) {
                .paypal-button.paypal-style-pay {
                    display: none;
                }
            }

            .paypal-button.paypal-style-pay {
                min-width: 148px;
                min-height: 42px;
            }

            /* Pay  Small */

            @media only screen and (min-width: 148px) and (min-height: 42px) {

                .paypal-button.paypal-style-pay .paypal-button-content .text {
                    font-size: 11px;
                    padding-top: 2px;
                }
                .paypal-button.paypal-style-pay .paypal-button-content img  {
                    height: 16px;
                    padding-top: 6px;
                }
            }


            /* Pay Medium */

            @media only screen and (min-width: 180px) and (min-height: 48px) {

                .paypal-button.paypal-style-pay .paypal-button-content .text {
                    font-size: 13px;
                    padding-top: 3px;
                }
                .paypal-button.paypal-style-pay .paypal-button-content img  {
                    height: 20px;
                    padding-top: 7px;
                }

            }

            /* Pay Large */

            @media only screen and (min-width: 250px) and (min-height: 60px) {

                .paypal-button.paypal-style-pay .paypal-button-content .text {
                    font-size: 15px;
                    padding-top: 4px;
                }
                .paypal-button.paypal-style-pay .paypal-button-content img {
                    height: 28px;
                    padding-top: 8px;
                }

            }

`;
