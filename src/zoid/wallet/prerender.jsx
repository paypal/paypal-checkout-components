/* @flow */
/** @jsx node */

import { node, type ChildType } from '@krakenjs/jsx-pragmatic/src';

type PrerenderedWalletProps = {|
    nonce : ?string
|};

export function WalletPrerender({ nonce } : PrerenderedWalletProps) : ChildType {
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
                        }

                        body::after {
                            content: "";
                            display: block;
                            background-color: #dddfe2;
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            width: 100%;
                            height: 100%;
                            transform: translateX(0);
                            box-shadow: 0px 0px 107px 60px #dddfe2;
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
