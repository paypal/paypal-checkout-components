/* @flow */
/* @jsx jsxDom */

import { checkoutComponentStyle } from './style';

export function componentTemplate({ jsxDom } : { jsxDom : Function }) : HTMLElement {

    return (
        <html>
            <head>
                <title>PayPal</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body>
                <div class="preloader spinner">
                    <style>
                        { checkoutComponentStyle }
                    </style>

                    <div class="spinWrap">
                        <p class="spinnerImage"></p>
                        <p class="loader"></p>
                    </div>
                </div>
            </body>
        </html>
    );
}
