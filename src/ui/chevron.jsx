/* @flow */
/** @jsx node */

import { node, type ComponentNode } from 'jsx-pragmatic/src';
import { SVGLogo } from '@paypal/sdk-logos/src/lib';

export function Chevron() : ComponentNode<{||}> {
    return (
        <SVGLogo
            name='chevron'
            render={ () => (
                <svg width="256" height="158.18601989746094" viewBox="-1.935 0.221 256 158.186" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="223.878 0.221 126.065 98.034 28.252 0.221 -1.935 30.407 126.065 158.407 254.065 30.407" transform="matrix(1, 0, 0, 1, 0, 0)" style="fill: rgb(134, 132, 132);" />
                </svg>
            ) }
        />
    );
}

