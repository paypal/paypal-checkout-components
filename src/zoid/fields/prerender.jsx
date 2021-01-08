/* @flow */
/** @jsx node */

import { node, type ChildType } from 'jsx-pragmatic/src';

import { NoncedStyleElement } from '../../constants';

type PrerenderedFieldsProps = {|
    nonce : ?string
|};

export function FieldsPrerender({ nonce } : PrerenderedFieldsProps) : ChildType {
    return (
        <html>
            <body>
                <NoncedStyleElement
                    nonce={ nonce }
                    css={ `
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
                        }

                        body::after {
                            content: "";
                            display: block;
                            background-color: #efefef;
                            border-radius: 8px;
                            overflow: hidden;
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            width: 100%;
                            height: 100%;
                            transform: translateX(0);
                            box-shadow: 0px 0px 107px 60px #efefef;
                            animation: 1.5s loading-placeholder ease-in-out infinite;
                        }

                        @keyframes loading-placeholder {
                            0% {
                                transform: translateX(-150%);
                            }
                            100% {
                                transform: translateX(150%);
                            }
                        }
                    ` }
                />
            </body>
        </html>
    );
}
