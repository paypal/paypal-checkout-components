/* @flow */
/** @jsx node */

import { node, type ElementNode } from 'jsx-pragmatic/src';

import { getComponentScript } from '../script';

type ScriptProps = {|
    nonce : ?string,
    buttonAnimation : string
|};

export function ButtonAnimationExperimentScriptWrapper({ nonce, buttonAnimation } : ScriptProps) : ElementNode {

    const scripts = `
        const scriptFns = ${ getComponentScript().toString() };
        scriptFns();
        function onDomLoad(){ ${ buttonAnimation } };
        document.addEventListener('DOMContentLoaded', onDomLoad);
    `;
    return (
        <script nonce={ nonce } innerHTML={  `(function(){ ${ scripts }})()` } />
    );
}
