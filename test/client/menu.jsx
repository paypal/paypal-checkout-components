/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */
import { wrapPromise, noop } from '@krakenjs/belter/src';

import { setupMenu } from '../../src/menu';

describe('menu cases', () => {
    let windowOpen;
    beforeEach(() => {
        windowOpen = window.open;
    });

    afterEach(() => {
        window.open = windowOpen;
    });


    it('should render a button with menu, click the button, fail to open a popup', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.xprops.verticalOffset = 100;
            window.xprops.onBlur = avoid('onBlur');
            window.xprops.onFocus = expect('onFocus');
            window.xprops.onFocusFail = avoid('onFocusFail');
            window.xprops.onChoose = avoid('onChoose');

            const cspNonce = 'ABCD';
            const pageVisible = true;

            // error out window open
            window.open = noop;

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.choices = [ {
                label: 'First Option',
                popup: {
                    width:  100,
                    height: 100
                },
                onSelect: expect('onSelect')
            } ];

            await setupMenu({ cspNonce, pageVisible });

            const button = window.document.querySelector('.menu-item');
            button.click();
        });
    });

});
