/* @flow */
/* eslint max-lines: 0 */

import { wrapPromise, uniqueID, parseQuery } from 'belter/src';
import { isWindow, isPopup, isWindowClosed, type CrossDomainWindowType } from 'cross-domain-utils/src';

import { runOnClick } from '../common';

describe(`paypal button native path`, () => {

    it('should render a native popup', () => {
        return wrapPromise(() => {
            const sessionUID = uniqueID();
            const { render, close } = window.paypal.Native({ sessionUID });

            const win = runOnClick(() => {
                return render();
            });

            if (!isWindow(win)) {
                throw new Error(`Expected paypal.Native().render() to return a window`);
            }

            if (!isPopup(win)) {
                throw new Error(`Expected window to be a popup: ${ typeof win.opener }`);
            }

            close();

            if (!isWindowClosed(win)) {
                throw new Error(`Expected window to be closed`);
            }
        });
    });

    it('should render a native popup with correct url', () => {
        return wrapPromise(({ expect }) => {
            const sessionUID = uniqueID();
            const { render, close } = window.paypal.Native({ sessionUID });

            const windowOpen = window.open;
            window.open = expect('windowOpen', function wrapWindowOpen(url, name) : CrossDomainWindowType {
                if (!name) {
                    throw new Error(`Expected name to be passed on window open`);
                }

                if (!url) {
                    throw new Error(`Expected url to be passed on window open`);
                }

                const query = parseQuery(url.split('?')[1]);

                if (!query.sdkMeta) {
                    throw new Error(`Expected sdkMeta to be present in url`);
                }

                if (query.sessionUID !== sessionUID) {
                    throw new Error(`Expected session uid in url to match props`);
                }

                return windowOpen.apply(this, arguments);
            });

            runOnClick(() => {
                return render();
            });

            close();

            window.open = windowOpen;
        });
    });
});
