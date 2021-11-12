/* @flow */
/** @jsx node */

import { node, type ElementNode } from 'jsx-pragmatic/src';

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
