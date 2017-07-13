/* @flow */
/* @jsx jsxDom */

import { checkoutComponentStyle } from './style';

export function componentTemplate({ jsxDom } : { jsxDom : Function }) : HTMLElement {

    return (
        <div class="preloader spinner">
            <style>
                { checkoutComponentStyle }
            </style>

            <div class="spinWrap">
                <p class="spinnerImage"></p>
                <p class="loader"></p>
            </div>
        </div>
    );
}
