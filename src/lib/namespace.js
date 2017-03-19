/* @flow */

export function extendNamespace(xports : Object, namespaces : Array<string> = [], childnamespaces : Array<string> = []) : Object {

    for (let name of namespaces) {
        let namespace = window[name];

        if (!namespace) {
            continue;
        }

        for (let childname of childnamespaces) {
            let childnamespace = xports[childname];

            if (namespace[childname]) {
                childnamespace = { ...namespace[childname], ...childnamespace };
            }

            xports = { ...namespace, ...xports, [ childname ]: childnamespace };
        }
    }

    for (let name of namespaces) {
        window[name] = xports;
    }

    return xports;
}
