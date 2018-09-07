/* @flow */

import * as button from './interface/button'; // eslint-disable-line import/no-namespace
import * as checkout from './interface/checkout'; // eslint-disable-line import/no-namespace
import * as common from './interface/common'; // eslint-disable-line import/no-namespace

button.setupButtons();
checkout.setupCheckout();

window.paypal = {
    ...button,
    ...checkout,
    ...common
};
