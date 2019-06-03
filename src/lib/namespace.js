/* @flow */

export function extendNamespace(xports : Object, namespaces : $ReadOnlyArray<string> = [], childnamespaces : $ReadOnlyArray<string> = []) : Object {

    for (const name of namespaces) {
        const namespace = window[name];

        if (!namespace) {
            continue;
        }

        for (const childname of childnamespaces) {
            let childnamespace = xports[childname];

            if (namespace[childname]) {
                childnamespace = { ...namespace[childname], ...childnamespace };
            }

            xports = { ...namespace, ...xports, [ childname ]: childnamespace };
        }
    }

    for (const name of namespaces) {
        window[name] = xports;
    }

    return xports;
}
