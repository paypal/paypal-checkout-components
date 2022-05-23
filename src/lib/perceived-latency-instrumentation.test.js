/* @flow */

import { prepareLatencyInstrumentationPayload } from './perceived-latency-instrumentation';

describe('customer perceived latency instrumentation utils', () => {
    describe('prepareLatencyInstrumentationPayload', () => {
        it('returns the CPL payload for the log', () => {
            jest.spyOn(Date, 'now').mockImplementation(() => 4000);
            const responseStartTime = 2000;
            const responseEndTime = 3000;
            const preparedPayload = {
                comp: {
                    'second-render-response': {
                        start: responseStartTime,
                        tt:    1000
                    },
                    'second-render-body': {
                        start: responseEndTime,
                        tt:    1000
                    }
                }
            };
            expect(prepareLatencyInstrumentationPayload(responseStartTime, responseEndTime)).toEqual(preparedPayload);

        });
    });
});
