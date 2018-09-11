/* @flow */

import { DOMAINS } from 'paypal-braintree-web-client/src';
import { on, send } from 'post-robot/src';
import { isWindowClosed, getDomain, isSameDomain, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { noop } from 'belter/src';

export function proxyMethod(name : string, win : ?CrossDomainWindowType, originalMethod : Function) : Function {

    if (win && getDomain() === DOMAINS.PAYPAL && !isSameDomain(win)) {

        if (win) {
            send(win, `proxy_${ name }`, { originalMethod }).catch(noop);
        }

        return originalMethod;
    }

    let methods = [];

    on(`proxy_${ name }`, { domain: DOMAINS.PAYPAL }, ({ data }) => {
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
