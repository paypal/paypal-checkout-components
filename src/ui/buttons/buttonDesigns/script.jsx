/* @flow */
/** @jsx node */

import { node, type ElementNode } from '@krakenjs/jsx-pragmatic/src';

import { getComponentScript } from '../script';

type ScriptProps = {|
    nonce : ?string,
    buttonDesignScript : string
|};

export function ButtonDesignExperimentScriptWrapper({ nonce, buttonDesignScript } : ScriptProps) : ElementNode {

    const scripts = `
        const scriptFns = ${ getComponentScript().toString() };
        scriptFns();
        function onDomLoad(){ ${ buttonDesignScript } };
        document.addEventListener('DOMContentLoaded', onDomLoad);
    `;
    return (
        <script nonce={ nonce } innerHTML={  `(function(){ ${ scripts }})()` } />
    );
}

export function getDesignScript(designFn : Function, getValidDesignProps : Function, designConfig : Object) : string {
    const buttonDesignScript = `
        const designProps = ${ getValidDesignProps.toString() }( document, ${ JSON.stringify(designConfig) })
        if (designProps) {
            const applyDesign = ${ designFn.toString() }
            applyDesign(designProps, ${ JSON.stringify(designConfig) })
        }
    `;
    return buttonDesignScript;
}
