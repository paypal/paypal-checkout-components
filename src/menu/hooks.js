/* @flow */

import { useState, useEffect, useRef } from 'preact/hooks';
import { noop } from '@krakenjs/belter/src';

export function useXProps<T>() : T {
    const [ xprops, setXProps ] = useState(window.xprops);
    useEffect(() => xprops.onProps(newProps => {
        setXProps({ ...newProps });
    }), []);
    return { ...xprops };
}

type UseAutoFocusOptions = {|
    onFocus? : () => void,
    onFocusFail? : () => void
|};

export function useAutoFocus({ onFocus = noop, onFocusFail = noop } : UseAutoFocusOptions = {}) : Object {
    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            ref.current.focus();
            if (document.activeElement === ref.current) {
                onFocus();
            } else {
                onFocusFail();
            }
        }
    });

    return ref;
}
