let path = require('path');

require('module-babel')(__dirname);
require('module-babel')(path.dirname(require.resolve('paypal-checkout')));

module.exports = require('./lib');
