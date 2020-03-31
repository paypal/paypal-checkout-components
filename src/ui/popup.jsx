/* @flow */
/** @jsx node */

import { node, dom } from 'jsx-pragmatic/src';
import { popup, writeElementToWindow } from 'belter/src';
import { SpinnerPage } from '@paypal/common-components/src/ui';
import { assertSameDomain, type CrossDomainWindowType } from 'cross-domain-utils/src';

import { getNonce } from '../lib';

export function openPopup({ width, height } : {| width : number, height : number |}) : CrossDomainWindowType {
    const win = assertSameDomain(popup('', { width, height }));

    const doc = win.document;

    const spinner = (
        <SpinnerPage nonce={ getNonce() } />
    ).render(dom({ doc }));

    writeElementToWindow(win, spinner);

    return win;
}
