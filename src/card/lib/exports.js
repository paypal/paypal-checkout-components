/* @flow */

import { FRAME_NAME } from '../../constants';

export type ExportsOptions = {|
    name : $Values<typeof FRAME_NAME>,
    isFieldValid : () => boolean,
    // eslint-disable-next-line no-undef
    getFieldValue : <T>() => T,
    setGqlErrors : ({| field : string, errors : [] |}) => void,
    resetGQLErrors : () => void
|};

export type CardExports<V> = {|
    name : $Values<typeof FRAME_NAME>,
    isFieldValid : () => boolean,
    getFieldValue : () => V,
    setGqlErrors : ({| field : string, errors : [] |}) => void,
    resetGQLErrors : () => void
|};

export function setupExports<T>({ name, isFieldValid, getFieldValue, setGqlErrors, resetGQLErrors } : ExportsOptions) {
    const xports : CardExports<T> = {
        name,
        isFieldValid,
        getFieldValue,
        setGqlErrors,
        resetGQLErrors
    };

    window.exports = xports;
}
