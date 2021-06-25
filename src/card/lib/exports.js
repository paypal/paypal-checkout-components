/* @flow */

import { FRAME_NAME } from '../../constants';

type ExportsOptions = {|
    name : $Values<typeof FRAME_NAME>,
    isFieldValid : () => boolean,
    // eslint-disable-next-line no-undef
    getFieldValue : <T>() => T
|};

export type CardExports<V> = {|
    name : $Values<typeof FRAME_NAME>,
    isFieldValid : () => boolean,
    getFieldValue : () => V
|};

export function setupExports<T>({ name, isFieldValid, getFieldValue } : ExportsOptions) {
    const xports : CardExports<T> = {
        name,
        isFieldValid,
        getFieldValue
    };

    window.exports = xports;
}
