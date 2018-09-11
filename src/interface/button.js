/* @flow */

import { noop } from 'belter/src';
import type { ZalgoPromise } from 'zalgo-promise/src';

import { Button as ButtonComponent } from '../button';
import type { ButtonProps } from '../button/props';

import './hacks'; // eslint-disable-line import/no-unassigned-import
import './checkout'; // eslint-disable-line import/no-unassigned-import

import { setup } from './setup';

export { FUNDING } from '../constants';

// $FlowFixMe
export function Button(props : ButtonProps = {}) : { render : (string | HTMLElement) => ZalgoPromise<void> } {
    return {
        render: (container) => {
            // $FlowFixMe
            return ButtonComponent.render(props, container).then(noop);
        }
    };
}

export function setupButtons() {
    if (__TEST__) {
        Button.driver = (name, deps) => ButtonComponent.driver(name, deps);
    }

    setup();
}
