/* @flow */
/** @jsx node */

import { values, destroyElement } from 'belter/src';
import { node, dom } from 'jsx-pragmatic/src';
import { EVENT, type RenderOptionsType } from 'zoid/src';

import { BUTTON_SIZE } from '../../constants';
import { BUTTON_SIZE_STYLE, MINIMUM_SIZE, MAXIMUM_SIZE } from '../config';
import type { ButtonProps } from '../props';

const CLASS = {
    VISIBLE:         'visible',
    INVISIBLE:       'invisible',
    COMPONENT_FRAME: 'component-frame',
    PRERENDER_FRAME: 'prerender-frame'
};

export function containerTemplate({ uid, props, tag, context, frame, prerenderFrame, doc, container, event } : RenderOptionsType<ButtonProps>) : ?HTMLElement {

    if (!frame || !prerenderFrame) {
        return;
    }

    if (container && container.tagName.toLowerCase() === 'button') {
        throw new Error(`Do not render the PayPal button into a button element`);
    }

    frame.classList.add(CLASS.COMPONENT_FRAME);
    prerenderFrame.classList.add(CLASS.PRERENDER_FRAME);

    frame.classList.add(CLASS.INVISIBLE);
    prerenderFrame.classList.add(CLASS.VISIBLE);

    event.on(EVENT.RENDERED, () => {
        prerenderFrame.classList.remove(CLASS.VISIBLE);
        prerenderFrame.classList.add(CLASS.INVISIBLE);

        frame.classList.remove(CLASS.INVISIBLE);
        frame.classList.add(CLASS.VISIBLE);

        setTimeout(() => {
            destroyElement(prerenderFrame);
        }, 1);
    });

    const { style } = props;
    const { label, layout, height: buttonHeight } = style;

    let minimumSize = MINIMUM_SIZE[layout];
    const maximumSize = MAXIMUM_SIZE[layout];
    
    if (buttonHeight) {
        const possibleSizes = values(BUTTON_SIZE).filter(possibleSize => {
            return BUTTON_SIZE_STYLE[possibleSize] && buttonHeight &&
                BUTTON_SIZE_STYLE[possibleSize].minHeight <= buttonHeight && BUTTON_SIZE_STYLE[possibleSize].maxHeight >= buttonHeight;
        });

        possibleSizes.sort((sizeA : $Values<typeof BUTTON_SIZE>, sizeB : $Values<typeof BUTTON_SIZE>) : number => {
            return BUTTON_SIZE_STYLE[sizeA].defaultWidth - BUTTON_SIZE_STYLE[sizeB].defaultWidth;
        });

        minimumSize = possibleSizes[0];
    }

    return (
        <div id={ uid } class={ `${ tag } ${ tag }-context-${ context } ${ tag }-label-${ label } ${ tag }-layout-${ layout }` }>

            <style>
                {`
                    #${ uid } {
                        position: relative;
                        display: inline-block;
                        width: 100%;
                        min-width: ${ BUTTON_SIZE_STYLE[minimumSize].minWidth }px;
                        max-width: ${ BUTTON_SIZE_STYLE[maximumSize].maxWidth }px;
                        font-size: 0;
                    }

                    #${ uid } > iframe {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                    }

                    #${ uid } > iframe.${ CLASS.COMPONENT_FRAME } {
                        z-index: 100;
                    }

                    #${ uid } > iframe.${ CLASS.PRERENDER_FRAME } {
                        transition: opacity .2s linear;
                        z-index: 200;
                    }

                    #${ uid } > iframe.${ CLASS.VISIBLE } {
                        opacity: 1;
                    }

                    #${ uid } > iframe.${ CLASS.INVISIBLE } {
                        opacity: 0;
                        pointer-events: none;
                    }
                `}
            </style>

            <node el={ frame } />
            <node el={ prerenderFrame } />
        </div>
    ).render(dom({ doc }));
}
