
import { $promise } from 'squid-core/dist/promise';
import 'squid-core/dist/util';

export function usePayPalPromise() {
    $promise.use(window.paypal.Promise);
}
