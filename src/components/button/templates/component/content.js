/* @flow */

import componentContentJSON from './content.json';

export let componentContent = typeof componentContentJSON === 'string'
    ? JSON.parse(componentContentJSON)
    : componentContentJSON;
