/* @flow */
/** @jsx h */

import { h, Fragment, type Node } from 'preact';

import type { CheckoutSession } from '../types';

import { Style } from './style';
import { Wallet } from './wallet';

type PageProps = {|
    cspNonce : string,
    checkoutSession : CheckoutSession
|};

export function Page({ cspNonce, checkoutSession } : PageProps) : Node {
    return (
        <Fragment>
            <Style cspNonce={ cspNonce }>
                {`
                    html, body {
                        padding: 0;
                        margin: 0;
                        width: 100%;
                        overflow: hidden;
                    }

                    body {
                        font-family: Helvetica Neue,HelveticaNeue,HelveticaNeue-Light,Helvetica Neue Light,helvetica,arial,sans-serif;
                        vertical-align: top;
                        border-collapse: collapse;
                    }

                    * {
                        user-select: none;
                        cursor: default;
                        box-sizing: border-box;
                    }
                `}
            </Style>
            <Wallet
                cspNonce={ cspNonce }
                checkoutSession={ checkoutSession }
            />
        </Fragment>
    );
}
