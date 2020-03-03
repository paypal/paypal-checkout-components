/* @flow */
/** @jsx h */

import { h, createContext, type Node } from 'preact';
import { useState, useContext, useEffect } from 'preact/hooks';

import { isServer } from '../../../lib';

const StyleContext = createContext();

type StyleSheetProps = {|
    cspNonce? : string,
    children? : $ReadOnlyArray<Node>
|};

type StyleProps = {|
    css : {|
        _getCss : () => string
    |},
    children? : $ReadOnlyArray<Node>
|};

export const StyleSheet = ({ cspNonce, children = null } : StyleSheetProps) : Node => {
    let [ styles, setStyles ] = useState({});

    const addStyle = (css) => {
        if (isServer()) {
            styles = {
                ...styles,
                [css]: (styles[css] || 0) + 1
            };
        } else {
            setStyles(prevState => {
                return {
                    ...prevState,
                    [css]: (prevState[css] || 0) + 1
                };
            });
        }
    };

    const removeStyle = (css) => {
        if (isServer()) {
            styles = {
                ...styles,
                [css]: (styles[css] || 0) - 1
            };
        } else {
            setStyles(prevState => {
                return {
                    ...prevState,
                    [css]: (prevState[css] || 0) - 1
                };
            });
        }
    };

    const StyleTag = () => {
        const styleString = Object.keys(styles).filter(style => styles[style] > 0).join('\n');
        return (
            <style nonce={ cspNonce }>
                { styleString }
            </style>
        );
    };

    return (
        <StyleContext.Provider value={ { cspNonce, addStyle, removeStyle } }>
            { children }
            <StyleTag />
        </StyleContext.Provider>
    );
};

export const Style = ({ css, children = null } : StyleProps) : Node => {
    const { addStyle, removeStyle } = useContext(StyleContext);
    const cssText = css._getCss();

    if (isServer()) {
        addStyle(cssText);
    } else {
        useEffect(() => {
            addStyle(cssText);
            return () => removeStyle(cssText);
        }, [ cssText ]);
    }

    return children;
};
