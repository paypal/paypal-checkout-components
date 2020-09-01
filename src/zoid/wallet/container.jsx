/* @flow */
/** @jsx node */

import { destroyElement, toCSS } from 'belter/src';
import { node, type ChildType } from 'jsx-pragmatic/src';
import { EVENT, type RenderOptionsType } from 'zoid/src';

import { type ButtonProps } from '../../ui/buttons/props';

const CLASS = {
    VISIBLE:         'visible',
    INVISIBLE:       'invisible',
    COMPONENT_FRAME: 'component-frame',
    PRERENDER_FRAME: 'prerender-frame'
};

export function WalletContainer({ uid, frame, prerenderFrame, event, props } : RenderOptionsType<ButtonProps>) : ?ChildType {
    
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
    const defaultVerticalOffSet = '70';
    
    const element = (
        <div id={ uid } onRender={ setupAutoResize }>
            <style nonce={ props.nonce }>
                {`
                    #${ uid } {
                        position: relative;
                        display: inline-block;
                        width: 100%;
                        min-width: 500px;
                        max-width: 100%;
                        font-size: 0;
                        min-height: 50px;
                        background-color: white;
                        transition: all 0.2s ease-in-out;
                        margin-top: ${ props.verticalOffset || defaultVerticalOffSet }px;
                    }

                    @media only screen and (min-width: 0px) {
                        #${ uid } {
                            min-height: 50px;
                        }
                    }

                    @media only screen and (min-width: 600px) {
                        #${ uid } {
                            min-height: 350px;
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
