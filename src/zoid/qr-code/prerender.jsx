/* @flow */
/** @jsx node */

import { type RenderOptionsType } from 'zoid/src';
import { node, dom } from 'jsx-pragmatic/src';
import { SpinnerPage } from '@paypal/common-components/src';

import { type QRCodeProps } from './types';

export function prerenderTemplate({ doc, props, close } : (RenderOptionsType<QRCodeProps>)) : ?HTMLElement {
    const style = `
    #close {
        position: absolute;
        right: 16px;
        top: 16px;
        width: 16px;
        height: 0;
        opacity: 0.6;
        z-index: 10;
        padding: 0;
        border: none;
        cursor: pointer;
    }
    #close:hover {
        opacity: 1;
    }
    #close:before, #close:after {
        position: absolute;
        left: 8px;
        content: ' ';
        height: 20px;
        width: 2px;
        background-color: #FFF;
    }
    #close:before {
        transform: rotate(45deg);
    }
    #close:after {
        transform: rotate(-45deg);
    }  
    `;
    return (
        // $FlowFixMe - Types on the SpinnerPage are not using children as part of props
        <SpinnerPage nonce={ props.cspNonce }>
            <style innerHTML={ style } />
            <button id="close" aria-label="close" role="button" type="button" onClick={ close } />
        </SpinnerPage>
        
    ).render(dom({ doc }));
}
