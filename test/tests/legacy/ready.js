
import { delay } from './common';

let paypalCheckoutReadyCalled = false;

window.paypalCheckoutReady = () => {
    paypalCheckoutReadyCalled = true;
};

describe('paypal legacy checkout ready', () => {

    it('should invoke window.paypalCheckoutReady on first page load', (done) => {

        setTimeout(() => {
            if (paypalCheckoutReadyCalled) {
                return done();
            }

            return done(new Error('Expected window.paypalCheckoutReady to have been called on first page load'));
        }, 200);
    });

    it('should invoke window.paypalCheckoutReady when it is set and the page is ready', () => {

        let count = 0;

        function ready() {
            count += 1;
        }

        window.paypalCheckoutReady = ready;

        return delay(20).then(() => {
            if (count !== 1) {
                throw new Error(`Expected ready to only be called once, actually called ${count} times`);
            }
        });
    });

    it('should not invoke window.paypalCheckoutReady multiple times', () => {

        let count = 0;

        function ready() {
            count += 1;
        }

        window.paypalCheckoutReady = ready;
        window.paypalCheckoutReady = ready;
        window.paypalCheckoutReady = ready;
        window.paypalCheckoutReady = ready;

        return delay(20).then(() => {
            if (count !== 1) {
                throw new Error(`Expected ready to only be called once, actually called ${count} times`);
            }
        });
    });

    it('should not invoke window.paypalCheckoutReady multiple times, even if called by setter', () => {

        let count = 0;

        function ready() {
            count += 1;
        }

        window.paypalCheckoutReady = ready;

        window.paypalCheckoutReady();

        return delay(20).then(() => {
            if (count !== 1) {
                throw new Error(`Expected ready to only be called once, actually called ${count} times`);
            }
        });
    });
});
