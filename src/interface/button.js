/* @flow */

import { noop } from 'belter/src';
import type { ZalgoPromise } from 'zalgo-promise/src';

import { Buttons as ButtonsComponent } from '../buttons';
import type { ButtonProps } from '../buttons/props';

import './hacks'; // eslint-disable-line import/no-unassigned-import
import './checkout'; // eslint-disable-line import/no-unassigned-import

import { setup } from './setup';

export { FUNDING } from '../constants';

// $FlowFixMe
export function Buttons(props : ButtonProps = {}) : { render : (string | HTMLElement) => ZalgoPromise<void> } {
    return {
        render: (container) => {
            // $FlowFixMe
            return ButtonsComponent.render(props, container).then(noop);
        }
    };
}

export function setupButtons() {
    if (__TEST__) {
        Buttons.driver = (name, deps) => ButtonsComponent.driver(name, deps);
    }

    setup();
}
