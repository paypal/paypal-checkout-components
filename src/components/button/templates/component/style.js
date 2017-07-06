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
        position: relative;
        width: 100%;
        box-sizing: border-box;
        border: none;
    }

    .paypal-button:hover .paypal-button-content {
        box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.2), 0 0 1px 1px rgba(255, 255, 255, 0.2);
    }

    .paypal-button:focus .paypal-button-content {
        box-shadow: 0 0 9px 0 #aaa;
        -webkit-box-shadow: 0 0 9px 0 #aaa;
        -moz-box-shadow: 0 0 9px 0 #aaa;
        -ms-box-shadow: 0 0 9px 0 #aaa;
        -o-box-shadow: 0 0 9px 0 #aaa;
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
        /* display: none; */
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
        
        display: block;
        text-align: center;
        width: auto;
        font-size: 9px;
        margin-top: 2px;
        visibility: hidden;
    }
    
    .paypal-button .paypal-button-tag-content.paypal-tagline-color-blue {
        color: #003366;
    }
    
    .paypal-button .paypal-button-tag-content.paypal-tagline-color-black {
        color: #000;
    }


    @media only screen and (max-width : 147px) {
        .paypal-button {
            display: none;
        }
    }

    @media only screen and (max-height : 41px) {
        .paypal-button {
            display: none;
        }
    }

    /* Small */

    @media only screen and (min-width : 147px) {
        body {
            height: 42px;
        }

        body.fundingicons {
            height: 65px;
        }
    }

    @media only screen and (min-width : 147px) and (min-height: 41px) {

        .paypal-button {
            display: block;
            max-width: 200px;
        }

        .paypal-button .paypal-button-content {
            height: 24px;
            max-height: 24px;
            border-radius: 12px;
            font-size: 10px;
        }

        .paypal-button .paypal-button-content .logo.logo-pp {
            height: 18px;
        }

        .paypal-button .paypal-button-content .logo.logo-paypal {
            height: 17px;
        }
        
        .paypal-button.paypal-dual-true .paypal-button-content .logo.logo-paypal,
        .paypal-button.paypal-dual-true .paypal-button-content .logo.logo-venmo{
            height: 13px;
        }

        .paypal-button .paypal-button-content .logo.logo-credit {
            height: 16px;
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

    @media only screen and (min-width : 200px) {
        body {
            height: 48px;
        }
        body.fundingicons {
            height: 75px;
        }
    }

    @media only screen and (min-width : 200px) and (min-height: 48px) {

        .paypal-button {
            max-width: 300px;
        }

        .paypal-button .paypal-button-content {
            height: 30px;
            max-height: 30px;
            border-radius: 15px;
            font-size: 12px;
        }

        .paypal-button .paypal-button-content .logo.logo-pp {
            height: 25px;
        }

        .paypal-button .paypal-button-content .logo.logo-paypal {
            height: 24px;
        }
        
        .paypal-button.paypal-dual-true .paypal-button-content .logo.logo-paypal,
        .paypal-button.paypal-dual-true .paypal-button-content .logo.logo-venmo {
            height: 19px;
        }
        
        .paypal-button .paypal-button-content .logo.logo-credit {
            height: 23px;
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

    @media only screen and (min-width : 300px) {
        body {
            height: 60px;

        }
        body.fundingicons {
            height: 85px;
        }
    }

    @media only screen and (min-width : 300px) and (min-height: 60px) {

        .paypal-button {
            max-width: 500px;
        }

        .paypal-button .paypal-button-content {
            height: 40px;
            max-height: 40px;
            border-radius: 20px;
            font-size: 14px;
        }

        .paypal-button .paypal-button-content .logo.logo-pp {
            height: 30px;
        }

        .paypal-button .paypal-button-content .logo.logo-paypal {
            height: 27px;
        }
        
        .paypal-button.paypal-dual-true .paypal-button-content .logo.logo-paypal,
        .paypal-button.paypal-dual-true .paypal-button-content .logo.logo-venmo {
            height: 22px;
        }
        
        .paypal-button .paypal-button-content .logo.logo-credit {
            height: 25px;
        }

        .paypal-button .paypal-button-content::before {
            padding: 2px;
            top: -2px;
            left: -2px;
            border-radius: 22px;
        }

        .paypal-button .paypal-button-tag-content {
            font-size: 11px;
        }

        .paypal-button.paypal-shape-rect .paypal-button-content,
        .paypal-button.paypal-shape-rect .paypal-button-content::before {
            border-radius: 6px;
        }
    }




    /* Gold */

    .paypal-button .paypal-button-content.paypal-color-gold {
        background: #ffc439;
        color: #000;
        text-shadow: 0px 1px 0 #ffdc88;
    }

    .paypal-button .paypal-button-content.paypal-color-gold::before {
        background: -webkit-gradient(linear, 0 0, 0 100%, from(#ffdc88), to(#d9a630)) 0 100%;
        background: -webkit-linear-gradient(#ffdc88, #d9a630) 0 100%;
        background: -moz-linear-gradient(#ffdc88, #d9a630) 0 100%;
        background: -o-linear-gradient(#ffdc88, #d9a630) 0 100%;
        background: linear-gradient(to bottom, #ffdc88, #d9a630) 0 100%;
    }


    /* Blue */

    .paypal-button .paypal-button-content.paypal-color-blue {
        background: #009cde;
        color: #fff;
        text-shadow: 0px -1px 0 #0d86bb;
    }
    .paypal-button .paypal-button-content.paypal-color-blue::before {
        background: -webkit-gradient(linear, 0 0, 0 100%, from(#4dbae8), to(#0d86bb)) 0 100%;
        background: -webkit-linear-gradient(#4dbae8, #0d86bb) 0 100%;
        background: -moz-linear-gradient(#4dbae8, #0d86bb) 0 100%;
        background: -o-linear-gradient(#4dbae8, #0d86bb) 0 100%;
        background: linear-gradient(to bottom, #4dbae8, #0d86bb) 0 100%;
    }


    /* Silver */

    .paypal-button .paypal-button-content.paypal-color-silver {
        background: #eee;
        color: #000;
        text-shadow: 0px -1px 0 #ccc;
    }

    .paypal-button .paypal-button-content.paypal-color-silver::before {
        background: -webkit-gradient(linear, 0 0, 0 100%, from(#f5f5f5), to(#cccccc)) 0 100%;
        background: -webkit-linear-gradient(#f5f5f5, #cccccc) 0 100%;
        background: -moz-linear-gradient(#f5f5f5, #cccccc) 0 100%;
        background: -o-linear-gradient(#f5f5f5, #cccccc) 0 100%;
        background: linear-gradient(to bottom, #f5f5f5, #cccccc) 0 100%;
    }
    
     /* Black */

    .paypal-button .paypal-button-content.paypal-color-black {
        background: #2C2E2F;
        color: #fff;
        text-shadow: 0px 1px 0 #6C7378;
    }

    .paypal-button .paypal-button-content.paypal-color-black::before {
        background: -webkit-gradient(linear, 0 0, 0 100%, from(#f5f5f5), to(#cccccc)) 0 100%;
        background: -webkit-linear-gradient(#f5f5f5, #cccccc) 0 100%;
        background: -moz-linear-gradient(#f5f5f5, #cccccc) 0 100%;
        background: -o-linear-gradient(#f5f5f5, #cccccc) 0 100%;
        background: linear-gradient(to bottom, #f5f5f5, #cccccc) 0 100%;
    }
    
    


     /* Credit Button */

    .paypal-button.paypal-style-credit .paypal-button-content.paypal-color-creditblue {
        background: #003087;
        color: #fff;
        text-shadow: 0px -1px 0 #0d86bb;
    }

    .paypal-button.paypal-style-credit .paypal-button-content.paypal-color-creditblue::before {
        background: -webkit-gradient(linear, 0 0, 0 100%, from(#f5f5f5), to(#cccccc)) 0 100% !important;
        background: -webkit-linear-gradient(#f5f5f5, #cccccc) 0 100%;
        background: -moz-linear-gradient(#f5f5f5, #cccccc) 0 100%;
        background: -o-linear-gradient(#f5f5f5, #cccccc) 0 100%;
        background: linear-gradient(to bottom, #f5f5f5, #cccccc) 0 100% !important;
    }
    
   

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


    /* Pay Button */

    @media only screen and (max-width : 147px) {
        .paypal-button.paypal-style-pay {
            display: none;
        }
    }


    /*Unbranded Button; eg: buynow */


    @media only screen and (min-height: 22px) and (min-width: 100px) {
        .paypal-button.paypal-branding-false .paypal-button-content {
            font-size: 13px;
        }
    }


    @media only screen and (min-width : 200px) and (min-height: 48px) {
        .paypal-button.paypal-branding-false .paypal-button-content  {
            font-size: 15px;
        }
    }

    @media only screen and (min-width : 250px) and (min-height: 60px) {
        .paypal-button.paypal-branding-false .paypal-button-content {
            font-size: 20px;
        }
    }

    .paypal-button.paypal-branding-false .paypal-button-content  {
        width: 60%;
        margin: auto;
        font-weight: 900;
    }

    /*Add on branding */

    .paypal-button.paypal-branding-true .paypal-button-content  {
        width: 100%;

        margin: auto;
    }

    /*Dual button */
    
    .paypal-button.paypal-dual-true .paypal-button-content {
        width: 47%;
        display: inline-block;
        margin-right: 2px;
    }
    
 

`;
