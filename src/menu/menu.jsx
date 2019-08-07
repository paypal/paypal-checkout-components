/* @flow */
/** @jsx h */

import { h, render } from 'preact';

import { getBody } from '../lib';

export function setupMenu() {
    render((
        <div>
            Hello World
        </div>
    ), getBody());
}
