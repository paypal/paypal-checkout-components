/* @flow */

import './ready';
import './button';
import './setup';
import './standalone';
import './hijack';
import './hybrid';
import './customclick';
import './error';

beforeEach(() => {
    window.paypal.checkout.reset();
});
