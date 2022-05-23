/* @flow */

type InstrumentationPayload = {|
    comp? : mixed,
    chunk? : mixed,
    query? : mixed
|};
/**
 * Prepare instrumentation Payload to be sent to logger
 * @param responseStartTime
 * @param responseEndTime
 */
export function prepareLatencyInstrumentationPayload (responseStartTime : number, responseEndTime : number) : InstrumentationPayload {
    const epochNow = Date.now();
    return {
        comp: {
            'second-render-response': {
                start: responseStartTime,
                tt:    responseEndTime - responseStartTime
            },
            'second-render-body': {
                start: responseEndTime,
                tt:    epochNow - responseEndTime
            }
        }
    };
}
