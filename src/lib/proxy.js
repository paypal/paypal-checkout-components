/* @flow */

import { on, send } from 'post-robot/src';
import { isWindowClosed, getDomain, isSameDomain, type CrossDomainWindowType } from 'cross-domain-utils/src';

import { config } from '../config';

import { noop } from './util';

export function proxyMethod(name : string, win : ?CrossDomainWindowType, originalMethod : Function) : Function {

    if (win && getDomain() === config.paypalDomain && !isSameDomain(win)) {

        if (win) {
            send(win, `proxy_${ name }`, { originalMethod }).catch(noop);
        }

        return originalMethod;
    }

    let methods = [];

    on(`proxy_${ name }`, { domain: config.paypal_domain_regex }, ({ data }) => {
        methods.push(data.originalMethod);
    });

    return function postMessageProxy() : mixed {

        methods = methods.filter(method => !isWindowClosed(method.source));

        if (methods.length) {
            return methods[methods.length - 1].apply(this, arguments).catch(() => {
                return originalMethod.apply(this, arguments);
            });
        }

        return originalMethod.apply(this, arguments);
    };
}
