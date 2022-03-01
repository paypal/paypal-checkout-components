/* @flow */
/** @jsx node */

import { type RenderOptionsType } from '@krakenjs/zoid/src';
import { node, dom } from '@krakenjs/jsx-pragmatic/src';
import { SpinnerPage } from '@paypal/common-components/src';

import { type QRCodeProps } from './types';

export function prerenderTemplate({ doc, props, close } : (RenderOptionsType<QRCodeProps>)) : ?HTMLElement {
    const style = `
    #close {
        position: absolute;
        right: 16px;
        top: 16px;
        width: 16px;
        height: 16px;
        opacity: 0.6;
        z-index: 100;
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

    const children = [
        <style nonce={ props.cspNonce } innerHTML={ style } />,
        <a href="#" id="close" aria-label="close" role="button" onClick={ close } />
    ];

    return new SpinnerPage({ nonce: props.cspNonce }, children)
        .render(dom({ doc }));
}
