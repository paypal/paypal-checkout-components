/* @flow */
/** @jsx node */

import { values, destroyElement, toCSS } from '@krakenjs/belter/src';
import { node, dom } from '@krakenjs/jsx-pragmatic/src';
import { EVENT, type RenderOptionsType } from '@krakenjs/zoid/src';
import { getVersion } from '@paypal/sdk-client/src';

import { BUTTON_SIZE, ATTRIBUTE, MENU_PLACEMENT } from '../../constants';
import { BUTTON_SIZE_STYLE, MINIMUM_SIZE, MAXIMUM_SIZE } from '../../ui/buttons/config';
import { type ButtonProps } from '../../ui/buttons/props';

const CLASS = {
    VISIBLE:            'visible',
    INVISIBLE:          'invisible',
    COMPONENT_FRAME:    'component-frame',
    PRERENDER_FRAME:    'prerender-frame',
    SMART_MENU:         'smart-menu',
    INSTALLMENTS_MODAL: 'installments-modal'
};

const ID = {
    SMART_MENU:         'smart-menu',
    INSTALLMENTS_MODAL: 'installments-modal'
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
        }, 1000);
    });

    // $FlowFixMe
    const { style, nonce } = props;
    const { label, layout, height: buttonHeight, menuPlacement } = style;

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

    const setupAutoResize = (el) => {
        event.on(EVENT.RESIZE, ({ width: newWidth, height: newHeight }) => {
            if (typeof newWidth === 'number') {
                el.style.width = toCSS(newWidth);
            }

            if (typeof newHeight === 'number') {
                el.style.height = toCSS(newHeight);
            }
        });
    };

    const element = (
        <div
            id={ uid }
            class={ `${ tag } ${ tag }-context-${ context } ${ tag }-label-${ label || 'unknown' } ${ tag }-layout-${ layout }` }
            { ...({ [ATTRIBUTE.VERSION]: `${ getVersion() }` }) }
            onRender={ setupAutoResize } >

            <style nonce={ nonce }>
                {`
                    #${ uid } {
                        position: relative;
                        display: inline-block;
                        width: 100%;
                        min-height: ${ BUTTON_SIZE_STYLE[minimumSize].minHeight }px;
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

                    #${ uid } > .${ CLASS.SMART_MENU } {
                        position: absolute;
                        z-index: 300;
                        ${ menuPlacement === MENU_PLACEMENT.ABOVE ? 'bottom: 100%;' : 'top: 0;' }
                        left: 0;
                        width: 100%;
                    }
                `}
            </style>

            <node el={ frame } />
            <node el={ prerenderFrame } />

            <div id={ ID.SMART_MENU } class={ CLASS.SMART_MENU } />

            <div id={ ID.INSTALLMENTS_MODAL } class={ CLASS.INSTALLMENTS_MODAL } />
        </div>
    ).render(dom({ doc }));

    event.on(EVENT.RENDERED, () => {
        setTimeout(() => {
            element.style.transition = 'all 0.2s ease-in-out';
        }, 1000);
    });

    return element;
}
