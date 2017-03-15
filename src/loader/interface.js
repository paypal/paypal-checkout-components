/* @flow */

import { integrationResponder } from './load';

export function onLoadCheckoutIntegration(callback : (err : ?Error, result : ?mixed) => void) : void {
    return integrationResponder.listen(callback);
}

module.exports.default = module.exports;
