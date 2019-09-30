/* @flow */

import { useState, useEffect, useRef } from 'preact/hooks';

export function useXProps<T>() : T {
    const [ xprops, setXProps ] = useState(window.xprops);
    useEffect(() => xprops.onProps(newProps => {
        setXProps({ ...newProps });
    }), []);
    return { ...xprops };
}

export function useAutoFocus() : Object {
    const ref = useRef();

    useEffect(() => {
        ref.current.focus();
    });

    return ref;
}
