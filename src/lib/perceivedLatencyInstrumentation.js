/* @flow */
import { getLogger } from '@paypal/sdk-client/src';
import { FPTI_KEY } from '@paypal/sdk-constants/src';

/* To Track time spent in each phase(cdn download, chunks download, etc)
    logLatencyInstrumentationPhase('first_interactable_render')
    logLatencyInstrumentationPhase('html_body', 'comp', true);
    logLatencyInstrumentationPhase('html_body', 'comp');
*/
const latencyInstrumentationPhases = {};
export const logLatencyInstrumentationPhase = (buttonID : string, phase : string, category : string, isStart : ?boolean) => {
    try {
        // to remove Query from phase
        phase = phase.replace(/Query/g, '');
        if (!latencyInstrumentationPhases[buttonID]) {
            latencyInstrumentationPhases[buttonID] = {
                query: {},
                chunk: {},
                comp:  {}
            };
        }
        const epochNow = Date.now();
        if (category && latencyInstrumentationPhases[buttonID][category] && phase) {
            if (isStart && !latencyInstrumentationPhases[buttonID][category][phase]) {
                latencyInstrumentationPhases[buttonID][category][phase] = {
                    start: epochNow
                };
            } else if (latencyInstrumentationPhases[buttonID][category][phase]) {
                if (
                    latencyInstrumentationPhases[buttonID][category][phase].start &&
                    !latencyInstrumentationPhases[buttonID][category][phase].tt
                ) {
                    latencyInstrumentationPhases[buttonID][category][phase].tt =
                        epochNow - latencyInstrumentationPhases[buttonID][category][phase].start;
                }
            } else {
                getLogger().info('CPL_LOG_PHASE_UNHANDLED_CONDITION').track({
                    phase,
                    category,
                    isStart
                }).flush();
            }
        } else if (phase && !latencyInstrumentationPhases[buttonID][category][phase]) {
            if (performance && performance.timing) {
                latencyInstrumentationPhases[buttonID][category][phase] = epochNow - performance.timing.fetchStart;
            }
        }
    } catch (err) {
        getLogger().info('CPL_LOG_PHASE_ERROR').track({
            phase,
            category,
            isStart,
            err:      err.message || 'CPL_LOG_PHASE_ERROR',
            details:  err.details,
            stack:    JSON.stringify(err.stack || err)
        }).flush();
    }
};

const _store = {
    triggerInitialInstrumentationEvent: true,
    hasContingencies:                   false
};

const triggerLatencyMetricsInstrumentationFPTI = (buttonId : string) => {
    // CPL stands for Consumer Perceived Latency
    const cplLatencyMetrics = {
        [FPTI_KEY.STATE]:                 'CPL_LATENCY_METRICS',
        [FPTI_KEY.TRANSITION]:            'process_client_metrics',
        [FPTI_KEY.CONTEXT_ID]:            buttonId,
        [FPTI_KEY.PAGE]:                  'main:xo:paypal-components:smart-payment-buttons',
        [FPTI_KEY.CPL_COMP_METRICS]:      JSON.stringify(latencyInstrumentationPhases?.[buttonId]?.comp || {}),
        [FPTI_KEY.CPL_QUERY_METRICS]:     JSON.stringify(latencyInstrumentationPhases?.[buttonId]?.query || {}),
        [FPTI_KEY.CPL_CHUNK_METRICS]:     JSON.stringify(latencyInstrumentationPhases?.[buttonId]?.chunk || {})
    };

    getLogger().info('CPL_LATENCY_METRICS_FIRST_RENDER').track(cplLatencyMetrics).flush();
};

export const updateTriggerInitialLatencyInstrumentationEvent = (state : boolean) => {
    getLogger().info(`CPL_UPDATE_TRIGGER_INITIAL_CPL_EVENT_TO_${ state.toString() }`).flush();
    _store.triggerInitialInstrumentationEvent = state;
};

export const shouldtriggerInitialInstrumentationEvent = () : boolean => {
    return _store.triggerInitialInstrumentationEvent;
};

export const triggerInitialLatencyInstrumentationEvent = (buttonId : string) => {
    if (shouldtriggerInitialInstrumentationEvent()) {
        // Set the flag to false so that CPL call is not triggered again
        updateTriggerInitialLatencyInstrumentationEvent(false);
        // Trigger FPTI event to capture the time spent on different phases.
        triggerLatencyMetricsInstrumentationFPTI(buttonId);
    }
};
