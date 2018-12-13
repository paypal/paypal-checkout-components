/* @flow */
/** @jsx node */

import { values } from 'belter/src';
import { node, dom } from 'jsx-pragmatic/src';
import type { RenderOptionsType } from 'zoid/src/component/parent';

import { BUTTON_SIZE, BUTTON_LAYOUT } from '../../constants';
import { BUTTON_SIZE_STYLE, MINIMUM_SIZE, MAXIMUM_SIZE } from '../config';
import type { ButtonProps } from '../props';

export function containerTemplate({ id, props, CLASS, tag, context, outlet, document } : RenderOptionsType<ButtonProps>) : HTMLElement {

    const { style } = props;
    const { label, layout, height: buttonHeight } = style;

    let minimumSize = MINIMUM_SIZE[layout];
    let maximumSize = MAXIMUM_SIZE[layout];
    
    if (buttonHeight) {
        const possibleSizes = values(BUTTON_SIZE).filter(possibleSize => {
            return BUTTON_SIZE_STYLE[possibleSize] && buttonHeight &&
                BUTTON_SIZE_STYLE[possibleSize].minHeight <= buttonHeight && BUTTON_SIZE_STYLE[possibleSize].maxHeight >= buttonHeight;
        });

        possibleSizes.sort((sizeA : $Values<typeof BUTTON_SIZE>, sizeB : $Values<typeof BUTTON_SIZE>) : number => {
            return BUTTON_SIZE_STYLE[sizeA].defaultWidth - BUTTON_SIZE_STYLE[sizeB].defaultWidth;
        });

        minimumSize = possibleSizes[0];
        maximumSize = possibleSizes[possibleSizes.length - 1];
    }

    return (
        <div id={ id } class={ `${ tag } ${ tag }-context-${ context } ${ tag }-label-${ label } ${ tag }-layout-${ layout }` }>

            <style>
                {`
                    #${ id } {
                        font-size: 0;
                        width: 100%;
                    }

                    #${ id }.${ tag }-size-${ BUTTON_SIZE.RESPONSIVE } {
                        text-align: center;
                    }

                    #${ id } > .${ CLASS.OUTLET } {
                        display: inline-block;
                        min-width: ${ BUTTON_SIZE_STYLE[minimumSize].minWidth }px;
                        max-width: ${ BUTTON_SIZE_STYLE[maximumSize].maxWidth }px;
                        position: relative;
                    }

                    #${ id }.${ tag }-layout-${ BUTTON_LAYOUT.VERTICAL } > .${ CLASS.OUTLET } {
                        min-width: ${ BUTTON_SIZE_STYLE[minimumSize].minWidth }px;
                    }

                    #${ id } > .${ CLASS.OUTLET } {
                        width: 100%;
                    }

                     #${ id }.${ tag }-size-${ BUTTON_SIZE.RESPONSIVE } > .${ CLASS.OUTLET } {
                        width: 100%;
                    }

                    #${ id } > .${ CLASS.OUTLET } > iframe {
                        min-width: 100%;
                        max-width: 100%;
                        width: ${ BUTTON_SIZE_STYLE[minimumSize].minWidth }px;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                    }

                    #${ id } > .${ CLASS.OUTLET } > iframe.${ CLASS.COMPONENT_FRAME } {
                        z-index: 100;
                    }

                    #${ id } > .${ CLASS.OUTLET } > iframe.${ CLASS.PRERENDER_FRAME } {
                        transition: opacity .2s linear;
                        z-index: 200;
                    }

                    #${ id } > .${ CLASS.OUTLET } > iframe.${ CLASS.VISIBLE } {
                        opacity: 1;
                    }

                    #${ id } > .${ CLASS.OUTLET } > iframe.${ CLASS.INVISIBLE } {
                        opacity: 0;
                        pointer-events: none;
                    }
                `}
            </style>

            <node el={ outlet } />
        </div>
    ).render(dom({ doc: document }));
}
