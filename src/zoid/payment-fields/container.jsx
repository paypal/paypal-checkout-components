/* @flow */
/** @jsx node */

import { destroyElement, toCSS, type EventEmitterType } from '@krakenjs/belter/src';
import { node, type ChildType } from '@krakenjs/jsx-pragmatic/src';
import { EVENT } from '@krakenjs/zoid/src';

const CLASS = {
    VISIBLE:         'visible',
    INVISIBLE:       'invisible',
    COMPONENT_FRAME: 'component-frame',
    PRERENDER_FRAME: 'prerender-frame'
};

type PaymentFieldsContainerOptions = {|
    uid : string,
    frame : ?HTMLIFrameElement,
    prerenderFrame : ?HTMLIFrameElement,
    event : EventEmitterType,
    nonce? : ?string
|};

export function PaymentFieldsContainer({ uid, frame, prerenderFrame, event, nonce } : PaymentFieldsContainerOptions) : ?ChildType {

    if (!frame || !prerenderFrame) {
        throw new Error(`Expected frame and prerenderframe`);
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
        <div id={ uid } onRender={ setupAutoResize }>
            <style nonce={ nonce }>
                {`
                    #${ uid } {
                        position: relative;
                        display: inline-block;
                        width: 100%;
                        min-width: 250px;
                        max-width: 100%;
                        font-size: 0;
                        height: 150px;
                        min-height: 150px;
                        transition: all 0.5s ease-in-out;
                    }

                    @media only screen and (min-width: 0px) {
                        #${ uid } {
                            min-height: 150px;
                        }
                    }

                    @media only screen and (min-width: 600px) {
                        #${ uid } {
                            min-height: 150px;
                        }
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
    );

    return element;
}
