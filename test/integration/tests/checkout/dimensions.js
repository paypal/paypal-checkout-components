/* @flow */
/* eslint max-lines: 0 */

import { uniqueID, noop } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import { generateOrderID, runOnClick,
    createTestContainer, destroyTestContainer, onWindowOpen
} from '../common';

describe(`paypal checkout component happy path with dimensions`, () => {

    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
    });

    it('should render checkout, then complete the payment with dimensions', (done) => {
        const APM_DEFAULT_POPUP_SIZE = {
            WIDTH:  1282,
            HEIGHT: 720
        };

        runOnClick(() => {
            let childWindow;
            onWindowOpen().then(win => {
                childWindow = win;
                // $FlowFixMe
                const { outerWidth: width, outerHeight: height } = childWindow;

                if (height !== APM_DEFAULT_POPUP_SIZE.HEIGHT) {
                    done(`height does not match. expected ${ APM_DEFAULT_POPUP_SIZE.HEIGHT }, got ${ height }`);
                }
                if (width !== APM_DEFAULT_POPUP_SIZE.WIDTH) {
                    done(`width does not match. expected ${ APM_DEFAULT_POPUP_SIZE.WIDTH }, got ${ width }`);
                }
                done();
            });

            return window.paypal.Checkout({
                test:            { action: 'init' },
                dimensions:      { width: '1282', height: '720' },
                buttonSessionID: uniqueID(),
                fundingSource:   FUNDING.PAYPAL,
                createOrder:     generateOrderID,
                onApprove:       noop
            }).render('body');
        });
    });
});
