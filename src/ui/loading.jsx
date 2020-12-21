/* @flow */
/** @jsx node */

import { node, Fragment, type ChildType } from 'jsx-pragmatic/src';

export function LoadingDots({ color = 'rgba(0, 0, 0, 0.5)', delay = 0.2 } : {| color : string, delay : number |}) : ChildType {
    return (
        <Fragment>
            <style innerHTML={ `
                .loading-dots {
                    color: ${ color };
                    font-size: inherit;
                    display: inline-block;
                }

                .loading-dot {
                    opacity: 0;
                    display: inline-block;
                    animation-name: loading-dot;
                    animation-duration: 1s;
                    animation-fill-mode: forwards;
                    animation-iteration-count: infinite;
                    margin-right: 2px;
                }

                .loading-dot-0 {
                    animation-delay: ${ delay.toFixed(1) }s;
                }

                .loading-dot-1 {
                    animation-delay: ${ (delay * 2).toFixed(1) }s;
                }

                .loading-dot-2 {
                    animation-delay: ${ (delay * 3).toFixed(1) }s;
                }

                @keyframes loading-dot {
                    0% {
                        opacity: 0;
                    }
                    20% {
                        opacity: 1;
                    }
                    30% {
                        opacity: 1;
                    }
                    40% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 0;
                    }
                }
            ` } />

            <div class='loading-dots'>
                {
                    [ 0, 1, 2 ].map(i =>
                        <div class={ `loading-dot loading-dot-${ i }` }>•</div>)
                }
            </div>
        </Fragment>
    );
}
