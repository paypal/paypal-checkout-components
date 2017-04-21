
require('module-babel')(__dirname);
require('module-babel')(require('path').dirname(require.resolve('paypal-checkout')));

module.exports = require('./lib');
