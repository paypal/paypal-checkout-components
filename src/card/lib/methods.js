/* @flow */

import { isValidAttribute } from './card-utils';

export function exportMethods(ref : Object, setAttributes : Function) : void {
    window.xprops.export({
        setAttribute: (name, value) => {
            if (isValidAttribute(name)) {
                setAttributes((currentAttributes) => {
                    return {
                        ...currentAttributes,
                        [name]: value
                    }
                });
            }
        },
        removeAttribute: (name) => {
            if (isValidAttribute(name)) {
                setAttributes((currentAttributes) => {
                    return {
                        ...currentAttributes,
                        [name]: ''
                    }
                });
            }
        },
        addClass: (name) => {
            ref?.current?.classList.add(name);
        },
        removeClass: (name) => {
            ref?.current?.classList.remove(name);
        }
    });
};
