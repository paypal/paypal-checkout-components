/* @flow */

export function extendPayPalNamespace(xports : Object) : Object {

    for (let namespace of [ window.paypal, window.PAYPAL ]) {

        if (!namespace) {
            continue;
        }

        let apps = xports.apps;

        if (namespace.apps) {
            apps = { ...namespace.apps, ...apps };
        }

        xports = { ...namespace, ...xports, apps };
    }

    window.paypal = xports;
    window.PAYPAL = xports;
    window.ppxo = xports;

    return xports;
}
