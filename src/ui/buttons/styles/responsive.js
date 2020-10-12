/* @flow */

import { max, perc, roundUp } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import { BUTTON_SHAPE, BUTTON_LAYOUT, BUTTON_NUMBER, CLASS, ATTRIBUTE } from '../../../constants';
import { BUTTON_SIZE_STYLE, BUTTON_RELATIVE_STYLE } from '../config';

const BUTTON_MIN_ASPECT_RATIO = 2.2;
const MIN_SPLIT_BUTTON_WIDTH = 300;

const FIRST_BUTTON_PERC = 50;
const WALLET_BUTTON_PERC = 60;

export function buttonResponsiveStyle({ height } : {| height? : ?number |}) : string {

    return Object.keys(BUTTON_SIZE_STYLE).map(size => {

        const style = BUTTON_SIZE_STYLE[size];
        const buttonHeight = height || style.defaultHeight;
        const minDualWidth = Math.max(Math.round(buttonHeight * BUTTON_MIN_ASPECT_RATIO * (100 / WALLET_BUTTON_PERC)), MIN_SPLIT_BUTTON_WIDTH);

        const labelHeight = max(roundUp(perc(buttonHeight, 35) + 5, 2), 12);

        return `

            @media only screen and (min-width: ${ style.minWidth }px) {

                .${ CLASS.CONTAINER } {
                    min-width: ${ style.minWidth }px;
                    max-width: ${ style.maxWidth }px;
                }

                .${ CLASS.CONTAINER } .${ CLASS.TEXT }, .${ CLASS.CONTAINER } .${ CLASS.SPACE } {
                    font-size: ${ max(perc(buttonHeight, 36), 10) }px;
                    line-height: ${ labelHeight }px;
                }

                .${ CLASS.BUTTON_ROW } {
                    height: ${ buttonHeight }px;
                    vertical-align: top;
                    min-height: ${ height || style.minHeight }px;
                    max-height: ${ height || style.maxHeight }px;
                }

                .${ CLASS.BUTTON_ROW }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.VERTICAL } {
                    margin-bottom: ${ perc(buttonHeight, BUTTON_RELATIVE_STYLE.VERTICAL_MARGIN) }px;
                }

                .${ CLASS.BUTTON_ROW }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.VERTICAL }:last-of-type {
                    margin-bottom: 0;
                }

                .${ CLASS.BUTTON } {
                    display: inline-block;
                    text-align: center;
                    height: 100%;
                }
                
                .${ CLASS.BUTTON } .${ CLASS.SPINNER } {
                    height: ${ perc(buttonHeight, 50) }px;
                    width: ${ perc(buttonHeight, 50) }px;
                }

                .${ CLASS.BUTTON } > .${ CLASS.BUTTON_LABEL } {
                    margin: 0px 4vw;
                    height: ${ labelHeight }px;
                }

                .${ CLASS.BUTTON }[${ ATTRIBUTE.FUNDING_SOURCE }=${ FUNDING.EPS }] .${ CLASS.BUTTON_LABEL },
                .${ CLASS.BUTTON }[${ ATTRIBUTE.FUNDING_SOURCE }=${ FUNDING.MYBANK }] .${ CLASS.BUTTON_LABEL } {
                    height: ${ perc(buttonHeight, 50) + 5 }px;
                }

                .${ CLASS.BUTTON }.${ CLASS.SHAPE }-${ BUTTON_SHAPE.RECT } {
                    border-radius: 4px;
                }

                .${ CLASS.BUTTON }.${ CLASS.SHAPE }-${ BUTTON_SHAPE.PILL } {
                    border-radius: ${ Math.ceil(buttonHeight / 2) }px;
                }

                .${ CLASS.BUTTON_ROW }.${ CLASS.SHAPE }-${ BUTTON_SHAPE.RECT } .menu-button {
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                }

                .${ CLASS.BUTTON_ROW }.${ CLASS.SHAPE }-${ BUTTON_SHAPE.PILL } .menu-button {
                    border-top-right-radius: ${ Math.ceil(buttonHeight / 2) }px;
                    border-bottom-right-radius: ${ Math.ceil(buttonHeight / 2) }px;
                }
                
                .${ CLASS.TAGLINE } .${ CLASS.TEXT } {
                    height: ${ perc(buttonHeight, BUTTON_RELATIVE_STYLE.TAGLINE) }px;
                    line-height: ${ perc(buttonHeight, BUTTON_RELATIVE_STYLE.TAGLINE) }px;
                }

                .${ CLASS.CARD } {
                    display: inline-block;
                    height: 100%;
                }

                .${ CLASS.BUTTON_ROW }.${ CLASS.WALLET } .${ CLASS.BUTTON } {
                    width: calc(100% - ${ buttonHeight + 2 }px);
                    border-top-right-radius: 0px;
                    border-bottom-right-radius: 0px;
                }

                .menu-button {
                    height: ${ buttonHeight }px;
                    width: ${ buttonHeight }px;
                }
            }

            @media only screen and (min-width: ${ style.minWidth }px) and (max-width: ${ minDualWidth }px) {

                .${ CLASS.BUTTON_ROW }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.HORIZONTAL }.${ CLASS.NUMBER }-${ BUTTON_NUMBER.MULTIPLE }.${ CLASS.NUMBER }-0 {
                    width: 100%;
                    margin-right: 0;
                }

                .${ CLASS.BUTTON_ROW }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.HORIZONTAL }.${ CLASS.NUMBER }-${ BUTTON_NUMBER.MULTIPLE }.${ CLASS.NUMBER }-1 {
                    display: none;
                }

                .${ CLASS.CONTAINER }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.HORIZONTAL }.${ CLASS.NUMBER }-${ BUTTON_NUMBER.MULTIPLE } .${ CLASS.TAGLINE } {
                    display: none;
                }
            }

            @media only screen and (min-width: ${ max(style.minWidth, minDualWidth) }px) {

                .${ CLASS.BUTTON_ROW }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.HORIZONTAL }.${ CLASS.NUMBER }-${ BUTTON_NUMBER.MULTIPLE }.${ CLASS.NUMBER }-0 {
                    display: inline-block;
                    width: calc(${ FIRST_BUTTON_PERC }% - ${ perc(buttonHeight, 7) }px);
                    margin-right: ${ perc(buttonHeight, 7) * 2 }px;
                }

                .${ CLASS.BUTTON_ROW }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.HORIZONTAL }.${ CLASS.NUMBER }-${ BUTTON_NUMBER.MULTIPLE }.${ CLASS.NUMBER }-1 {
                    display: inline-block;
                    width: calc(${ 100 - FIRST_BUTTON_PERC }% - ${ perc(buttonHeight, 7) }px);
                }

                .${ CLASS.CONTAINER }.${ CLASS.WALLET } .${ CLASS.BUTTON_ROW }.${ CLASS.WALLET }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.HORIZONTAL }.${ CLASS.NUMBER }-${ BUTTON_NUMBER.MULTIPLE } {
                    width: calc(${ WALLET_BUTTON_PERC }% - ${ perc(buttonHeight, 7) }px);
                }

                .${ CLASS.CONTAINER }.${ CLASS.WALLET } .${ CLASS.BUTTON_ROW }:not(.${ CLASS.WALLET }).${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.HORIZONTAL }.${ CLASS.NUMBER }-${ BUTTON_NUMBER.MULTIPLE } {
                    width: calc(${ 100 - WALLET_BUTTON_PERC }% - ${ perc(buttonHeight, 7) }px);
                }

                .${ CLASS.CONTAINER }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.HORIZONTAL }.${ CLASS.NUMBER }-${ BUTTON_NUMBER.MULTIPLE } .${ CLASS.TAGLINE } {
                    display: block;
                }
            }
        `;

    }).join('\n');
}
