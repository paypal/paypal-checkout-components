/* @flow */
/** @jsx node */

import { node, type ChildType } from '@krakenjs/jsx-pragmatic/src';

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
                            background: rgba(240,240,240,0.5);
                        }

                        body {
                            position: relative;
                            overflow: hidden;
                        }
                    ` }
                />
            </body>
        </html>
    );
}
