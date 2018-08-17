/* eslint import/no-commonjs: off, flowtype/require-valid-file-annotation: off, flowtype/require-return-type: off */

let postRobotGlobals = require('post-robot/globals');
let zoidGlobals = require('zoid/globals');

function getNextVersion() {
    let version = require('./package.json').version;
    version = version.split('.');
    version[2] = (parseInt(version[2], 10) + 1).toString();
    version = version.join('.');
    return version;
}

function getNextMajorVersion() {
    return getNextVersion().split('.')[0];
}

function getNextMinorVersion() {
    return getNextVersion();
}

module.exports = Object.assign({}, zoidGlobals, {

    __POST_ROBOT__: Object.assign({}, postRobotGlobals.__POST_ROBOT__, {
        __IE_POPUP_SUPPORT__: false
    }),

    __PAYPAL_CHECKOUT__: {
        __DEFAULT_LOG_LEVEL__:  'warn',
        __MAJOR_VERSION__:      getNextMajorVersion(),
        __MINOR_VERSION__:      getNextMinorVersion(),
        __REMEMBERED_FUNDING__: []
    }
});
