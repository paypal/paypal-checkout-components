
let { Promise } = window.paypal;

import { $promise } from 'squid-core/dist/promise';
import 'squid-core/dist/util';

$promise.use(Promise);
