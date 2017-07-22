
import { on, send } from 'post-robot/src';
import { isWindowClosed } from 'cross-domain-utils/src';

import { config } from '../config';
import { noop, isPayPalDomain } from './util';

export function proxyMethod(name : string, win : any, originalMethod : Function) : Function {

    if (isPayPalDomain()) {

        if (win) {
            send(win, `proxy_${name}`, { originalMethod }).catch(noop);
        }

        return originalMethod;

    } else {

        let methods = [];

        on(`proxy_${name}`, { domain: config.paypal_domain_regex }, ({ data }) => {
            methods.push(data.originalMethod);
        });

        return function() : mixed {

            methods = methods.filter(method => !isWindowClosed(method.source));

            if (methods.length) {
                return methods[0].apply(this, arguments);
            }

            return originalMethod.apply(this, arguments);
        };
    }
}
