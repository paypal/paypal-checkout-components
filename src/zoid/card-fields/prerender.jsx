/* @flow */
/** @jsx node */

import { node, type ChildType } from '@krakenjs/jsx-pragmatic/src';

type PrerenderedCardProps = {|
    nonce : ?string,
    height : ?number
|};

const DEFAULT_HEIGHT = 30;

export function CardPrerender({ nonce, height } : PrerenderedCardProps) : ChildType {
    return (
        <html>
            <body>
                <style
                    nonce={ nonce }
                    innerHTML={ `
                        html, body {
                            padding: 0;
                            margin: 0;
                            width: 100%;
                            height: 100%;
                        }

                        body {
                            background: #e9ebee;
                            position: relative;
                            overflow: hidden;
                            height: ${ height ?? DEFAULT_HEIGHT };
                        }

                        body::after {
                            content: "";
                            display: block;
                            background-color: #fff;
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            width: 100%;
                            height: ${ height ?? DEFAULT_HEIGHT };
                            transform: translateX(0);
                            box-shadow: 0px 0px 107px 60px #dddfe2;
                            animation: 1.5s loading-placeholder ease-in-out infinite;
                        }

                        @keyframes loading-placeholder {
                            0% {
                                opacity: 0.1;
                            }
                            50% {
                                opacity: 1;
                            }
                            100% {
                                opacity: 0.1;
                            }
                        }
                    ` }
                />
            </body>
        </html>
    );
}
