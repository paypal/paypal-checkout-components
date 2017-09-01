/* @flow */

import { extendNamespace } from '../lib/namespace';

let _interface = require('./interface'); // eslint-disable-line import/no-commonjs

extendNamespace(_interface, [ 'paypal' ]);
