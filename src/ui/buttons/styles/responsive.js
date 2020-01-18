/* @flow */

import { max, perc } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import { BUTTON_SHAPE, BUTTON_LAYOUT, BUTTON_NUMBER, CLASS, ATTRIBUTE } from '../../../constants';
import { BUTTON_SIZE_STYLE, BUTTON_RELATIVE_STYLE } from '../config';

const DUAL_BUTTON_MIN_RATIO = 2.8;

export function buttonResponsiveStyle({ height } : { height? : ?number }) : string {

    return Object.keys(BUTTON_SIZE_STYLE).map(size => {

        const style = BUTTON_SIZE_STYLE[size];
        const buttonHeight = height || style.defaultHeight;
        const minDualWidth = Math.round(buttonHeight * DUAL_BUTTON_MIN_RATIO * 2);

        return `

            @media only screen and (min-width: ${ style.minWidth }px) {

                .${ CLASS.CONTAINER } {
                    min-width: ${ style.minWidth }px;
                    max-width: ${ style.maxWidth }px;
                    font-size: ${ max(perc(buttonHeight, 32), 10) }px;
                }

                .${ CLASS.BUTTON } {
                    height: ${ buttonHeight }px;
                    min-height: ${ height || style.minHeight }px;
                    max-height: ${ height || style.maxHeight }px;
                }
                
                .${ CLASS.BUTTON } .${ CLASS.SPINNER } {
                    height: ${ perc(buttonHeight, 50) }px;
                    width: ${ perc(buttonHeight, 50) }px;
                }

                .${ CLASS.BUTTON } > .${ CLASS.BUTTON_LABEL } {
                    height: ${ perc(buttonHeight, 35) + 5 }px;
                    max-height: ${ perc(buttonHeight, 60) }px;
                    min-height: ${ perc(buttonHeight, 40) }px;
                }

                .${ CLASS.BUTTON }[${ ATTRIBUTE.FUNDING_SOURCE }=${ FUNDING.EPS }] .${ CLASS.BUTTON_LABEL },
                .${ CLASS.BUTTON }[${ ATTRIBUTE.FUNDING_SOURCE }=${ FUNDING.MYBANK }] .${ CLASS.BUTTON_LABEL } {
                    height: ${ perc(buttonHeight, 50) + 5 }px;
                    max-height: ${ perc(buttonHeight, 70) }px;
                    min-height: ${ perc(buttonHeight, 40) }px;
                }

                .${ CLASS.BUTTON }.${ CLASS.SHAPE }-${ BUTTON_SHAPE.RECT } {
                    border-radius: 4px;
                }

                .${ CLASS.BUTTON }.${ CLASS.SHAPE }-${ BUTTON_SHAPE.PILL } {
                    border-radius: ${ Math.ceil(buttonHeight / 2) }px;
                }

                .${ CLASS.BUTTON }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.VERTICAL } {
                    margin-bottom: ${ perc(buttonHeight, BUTTON_RELATIVE_STYLE.VERTICAL_MARGIN) }px;
                }

                .${ CLASS.BUTTON }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.VERTICAL }:last-of-type {
                    margin-bottom: 0;
                }
                
                .${ CLASS.TAGLINE } .${ CLASS.TEXT } {
                    height: ${ perc(buttonHeight, BUTTON_RELATIVE_STYLE.TAGLINE) }px;
                    line-height: ${ perc(buttonHeight, BUTTON_RELATIVE_STYLE.TAGLINE) }px;
                }

                .${ CLASS.CARD } {
                    display: inline-block;
                    height: 100%;
                }

                .${ CLASS.MENU_TOGGLE } {
                    position: absolute;
                    height: 100%;
                    right: 0;
                    top: 0;
                    width: ${ buttonHeight }px;
                    border-left: 1px solid rgba(100, 100, 100, 0.1);
                }

                .${ CLASS.MENU_TOGGLE }:hover {
                    background: rgba(100, 100, 100, 0.1);
                }

                .${ CLASS.MENU_TOGGLE } img {
                    width: 30%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translateX(-50%) translateY(-50%);
                }
            }

            @media only screen and (min-width: ${ style.minWidth }px) and (max-width: ${ minDualWidth }px) {

                .${ CLASS.BUTTON }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.HORIZONTAL }.${ CLASS.NUMBER }-${ BUTTON_NUMBER.MULTIPLE }.${ CLASS.NUMBER }-0 {
                    width: 100%;
                    margin-right: 0;
                }

                .${ CLASS.BUTTON }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.HORIZONTAL }.${ CLASS.NUMBER }-${ BUTTON_NUMBER.MULTIPLE }.${ CLASS.NUMBER }-1 {
                    display: none;
                }

                .${ CLASS.CONTAINER }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.HORIZONTAL }.${ CLASS.NUMBER }-${ BUTTON_NUMBER.MULTIPLE } .${ CLASS.TAGLINE } {
                    display: none;
                }
            }

            @media only screen and (min-width: ${ max(style.minWidth, minDualWidth) }px) {

                .${ CLASS.BUTTON }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.HORIZONTAL }.${ CLASS.NUMBER }-${ BUTTON_NUMBER.MULTIPLE }.${ CLASS.NUMBER }-0 {
                    display: inline-block;
                    width: calc(50% - 2px);
                    margin-right: 4px;
                }

                .${ CLASS.BUTTON }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.HORIZONTAL }.${ CLASS.NUMBER }-${ BUTTON_NUMBER.MULTIPLE }.${ CLASS.NUMBER }-1 {
                    display: inline-block;
                    width: calc(50% - 2px);
                }

                .${ CLASS.CONTAINER }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.HORIZONTAL }.${ CLASS.NUMBER }-${ BUTTON_NUMBER.MULTIPLE } .${ CLASS.TAGLINE } {
                    display: block;
                }
            }
        `;

    }).join('\n');
}
