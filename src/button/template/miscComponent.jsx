/* @flow */
/** @jsx jsxToHTML */

import { jsxToHTML, type JsxHTMLNode, JsxHTMLNodeContainer } from '../../lib/jsx';

import { CLASS } from './componentStyle';

export function LoadingDots(delay : number) : JsxHTMLNode {
    return (
        <div>
            <style innerHTML={ `
                .loading-dots {
                    color: rgba(0, 0, 0, 0.5);
                    font-size: inherit;
                    font-family: Arial, Helvetica, sans-serif;
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
        </div>
    );
}

export function Beacon(impression : string) : JsxHTMLNode {
    return (
        <div class='tracking-beacon'>
            <style innerHTML={ `
            .tracking-beacon {
                visibility: hidden;
                position: absolute;
                height: 1px;
                width: 1px;
            }
        ` } />
            <img class='tracking-beacon' src={ impression } />
        </div>
    );
}

export function Tagline(tagColor : string, impression : ?string, text : string | JsxHTMLNode) : JsxHTMLNode {
    const nodes = [];
    nodes[0] = (<style innerHTML={ `
            .tracking-beacon {
                visibility: hidden;
                position: absolute;
                height: 1px;
                width: 1px;
            }
        ` } />);
    nodes[1] = (
        <div class={ `${ CLASS.TAGLINE } ${ CLASS.TAGLINE_COLOR }-${ tagColor }` }>
            { text }
            {
                impression  && <img class='tracking-beacon' src={ impression } />
            }
        </div>);
    return new JsxHTMLNodeContainer(nodes);
}
