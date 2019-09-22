/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { getSDKMeta } from '@paypal/sdk-client/src';
import { inlineMemoize, extendUrl, popup, writeElementToWindow } from 'belter/src';
import { node, dom } from 'jsx-pragmatic/src';
import { closeWindow, type CrossDomainWindowType, assertSameDomain } from 'cross-domain-utils/src';

import { getNativeUrl } from '../../config';
import { SpinnerPage } from '../../ui/spinner';

import { type NativeProps } from './props';

type NativeComponent = (NativeProps) => {|
    render : () => CrossDomainWindowType,
    close : () => void
|};

const WINDOW_NAME = '__native_checkout_popup__';

export function getNativeComponent() : NativeComponent {
    return inlineMemoize(getNativeComponent, () => {
        return ({ sessionUID, nonce }) => {
            const url = extendUrl(getNativeUrl(), {
                query: {
                    sessionUID,
                    sdkMeta: getSDKMeta()
                }
            });

            const renderSpinner = (win) => {
                try {
                    win = assertSameDomain(win);
                    const doc = win.document;

                    writeElementToWindow(win, (
                        <SpinnerPage
                            nonce={ nonce }
                        />
                    ).render(dom({ doc })));
                } catch (err) {
                    // pass
                }
            };

            let win;
            
            const render = () => {
                win = popup(url, { name: WINDOW_NAME });
                renderSpinner(win);
                return win;
            };

            const close = () => {
                if (win) {
                    closeWindow(win);
                }
            };

            return { render, close };
        };
    });
}
