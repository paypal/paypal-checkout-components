/* @flow */
/* eslint no-sync: off */

import isObject from 'is-object';

import type { ExpressResponse } from '../types';

function normalizeAssets(assets : Object) : $ReadOnlyArray<string> {
    if (isObject(assets)) {
        // $FlowFixMe
        return Object.values(assets);
    }

    return Array.isArray(assets) ? assets : [ assets ];
}

export function getWebpackDevScript(res : ExpressResponse) : ?string {
    const { webpackStats, fs } = res.locals;

    if (!webpackStats || !fs) {
        return;
    }

    // $FlowFixMe
    const webpackStatsJson = webpackStats.toJson();
    
    const assetsByChunkName = webpackStatsJson.assetsByChunkName;
    const outputPath = webpackStatsJson.outputPath;

    const script = normalizeAssets(assetsByChunkName.main)
        .filter((path) => path.endsWith('.js'))
        // $FlowFixMe
        .map((path) => fs.readFileSync(`${ outputPath }/${ path }`))
        .join('\n');

    return script;
}
