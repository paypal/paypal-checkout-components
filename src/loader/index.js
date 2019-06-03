/* @flow */

import { extendNamespace } from '../lib/namespace';

const _interface = require('./interface'); // eslint-disable-line import/no-commonjs

extendNamespace(_interface, [ 'paypal' ]);
