/* @flow */
/** @jsx node */

import { node, type ChildType } from 'jsx-pragmatic/src';

type PrerenderedPaymentFieldsProps = {|
    nonce : ?string
|};

export function PaymentFieldsPrerender({ nonce } : PrerenderedPaymentFieldsProps) : ChildType {
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
                            background: transparent;
                        }

                        body {
                            background: transparent;
                            position: relative;
                            overflow: hidden;
                        }

                        body::after {
                            content: "";
                            display: block;
                            background-color: transparent;
                            overflow: hidden;
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            width: 100%;
                            height: 100%;
                            transform: translateX(0);
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
