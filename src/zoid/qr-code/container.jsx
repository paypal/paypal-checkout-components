/* @flow */
/** @jsx node */

import { destroyElement, type EventEmitterType } from '@krakenjs/belter/src';
import { EVENT, type RenderOptionsType } from '@krakenjs/zoid/src';
import { node, dom, type ChildType } from '@krakenjs/jsx-pragmatic/src';

import { type QRCodeProps } from './types';

const CLASS = {
    VISIBLE:         'visible',
    INVISIBLE:       'invisible',
    COMPONENT_FRAME: 'component-frame',
    PRERENDER_FRAME: 'prerender-frame'
};

export function QRCodeContainer({
    uid,
    frame,
    prerenderFrame,
    event,
    cspNonce
} : {|
    uid : string,
    frame : ?HTMLIFrameElement,
    prerenderFrame : ?HTMLIFrameElement,
    event : EventEmitterType,
    cspNonce? : ?string
|}) : ?ChildType {
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
        }, 1);
    });

    return (
        <div id={ uid }>
            <style
                nonce={ cspNonce }
                innerHTML={ `
            * {
                box-sizing: border-box;
            }

            #${ uid } {
                display: flex;
                position: fixed;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                z-index: 20000;
                align-items: center;
                justify-content: center;
                background-color: rgba(0, 0, 0, 0.4); 
            }
            #${ uid } iframe {
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                transition: opacity .2s ease-in-out;
            }
            #${ uid } > iframe.${ CLASS.VISIBLE } {
                opacity: 1;
            }
            #${ uid } > iframe.${ CLASS.INVISIBLE } {
                opacity: 0;
                pointer-events: none;
            }
            #qrModal {
                background: #2F3033;
                box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.4);
                border-radius: 16px;                        
                width: 720px;
                height: 612px;  
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                position: relative;
            }     
            ` } />
            <div id="qrModal">
                <node el={ frame } />
                <node el={ prerenderFrame } />
            </div>
                        
        </div>
    );
}

export function containerTemplate({ frame, prerenderFrame, props, doc, uid, event } : (RenderOptionsType<QRCodeProps>)) : ?HTMLElement {
    if (!frame || !prerenderFrame) {
        return;
    }

    const { cspNonce } = props;

    return (
        <QRCodeContainer
            uid={ uid }
            cspNonce={ cspNonce }
            event={ event }
            frame={ frame }
            prerenderFrame={ prerenderFrame }
        />
        
    ).render(dom({ doc }));
}
