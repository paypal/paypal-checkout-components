/* @flow */

type LogLatencyInstrumentationPhaseParams = {|
    buttonSessionID : string,
    phase : string
|};

type InstrumentationPayload = {|
    comp? : Object,
    chunk? : Object,
    query? : Object
|};

function getNavigationTimeOrigin() : number {
    if (window.performance) {
        const hrSyncPoint = performance.now();
        const unixSyncPoint = new Date().getTime();
        return window.performance.timeOrigin || window.performance.timing.navigationStart || (unixSyncPoint - hrSyncPoint);
    } else {
        throw new Error('window.performance not supported');
    }
}

function getStartTimeFromMark({ buttonSessionID, phase } : LogLatencyInstrumentationPhaseParams) : number {
    if (window.performance) {
        return performance.getEntriesByName(`${ buttonSessionID }_${ phase }`).pop().startTime;
    } else {
        throw new Error('window.performance not supported');
    }
}

/* To Track time spent in each phase(cdn download, chunks download, etc)
    logLatencyInstrumentationPhase({
        buttonID: buttonId,
        phase: 'html_body'
    })
    logLatencyInstrumentationPhase({
        buttonID: buttonId,
        phase: 'html_body'
    })
*/
export const logLatencyInstrumentationPhase = ({ buttonSessionID, phase } : LogLatencyInstrumentationPhaseParams) => {
    if (window.performance && window.performance.mark) {
        window.performance.mark(`${ buttonSessionID }_${ phase }`);
    }
};

export const prepareInstrumentationPayload = (buttonSessionID : string) : InstrumentationPayload => {
    const timeOrigin = getNavigationTimeOrigin();
    const renderStartTime = getStartTimeFromMark({ buttonSessionID, phase: 'buttons-first-render' });
    const renderEndTime = getStartTimeFromMark({ buttonSessionID, phase: 'buttons-first-render-end' });
    return {
        comp: {
            'first-render': {
                start: timeOrigin + renderStartTime,
                tt:    renderEndTime - renderStartTime
            }
        }
    };
};

