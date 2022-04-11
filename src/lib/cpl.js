/* @flow */
import { getLogger } from '@paypal/sdk-client/src';
import { FPTI_KEY } from '@paypal/sdk-constants/src';

import { FPTI_CPL_KEY } from '../constants';

/* To Track time spent in each phase(cdn download, chunks download, etc)
    logCPLPhase('first_interactable_render')
    logCPLPhase('html_body', 'comp', true);
    logCPLPhase('html_body', 'comp');
*/
const cplPhases = {};
export const logCPLPhase = (buttonID : string, phase : string, category : string, isStart : ?boolean) => {
    try {
        // to remove Query from phase
        phase = phase.replace(/Query/g, '');
        if (!cplPhases[buttonID]) {
            cplPhases[buttonID] = {
                query: {},
                chunk: {},
                comp:  {}
            };
        }
        const epochNow = Date.now();
        if (category && cplPhases[buttonID][category] && phase) {
            if (isStart && !cplPhases[buttonID][category][phase]) {
                cplPhases[buttonID][category][phase] = {
                    start: epochNow
                };
            } else if (cplPhases[buttonID][category][phase]) {
                if (
                    cplPhases[buttonID][category][phase].start &&
                    !cplPhases[buttonID][category][phase].tt
                ) {
                    cplPhases[buttonID][category][phase].tt =
                        epochNow - cplPhases[buttonID][category][phase].start;
                }
            } else {
                getLogger().info('CPL_LOG_PHASE_UNHANDLED_CONDITION').track({
                    phase,
                    category,
                    isStart
                }).flush();
            }
        } else if (phase && !cplPhases[buttonID][category][phase]) {
            if (performance && performance.timing) {
                cplPhases[buttonID][category][phase] = epochNow - performance.timing.fetchStart;
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
    triggerInitialCPLEvent: true,
    hasContingencies:       false
};

const triggerCPLLatencyMetricsFPTI = (buttonId : string) => {
    const cplLatencyMetrics = {
        [FPTI_KEY.STATE]:                 'CPL_LATENCY_METRICS',
        [FPTI_KEY.TRANSITION]:            'process_client_metrics',
        [FPTI_KEY.CONTEXT_ID]:            buttonId,
        [FPTI_CPL_KEY.PAGE_NAME]:         `main:xo:paypal-components:smart-payment-buttons`,
        [FPTI_CPL_KEY.CPL_COMP_METRICS]:  JSON.stringify(cplPhases?.[buttonId]?.comp || {}),
        [FPTI_CPL_KEY.CPL_QUERY_METRICS]: JSON.stringify(cplPhases?.[buttonId]?.query || {}),
        [FPTI_CPL_KEY.CPL_CHUNK_METRICS]: JSON.stringify(cplPhases?.[buttonId]?.chunk || {})
    };

    getLogger().info('CPL_LATENCY_METRICS_FIRST_RENDER').track(cplLatencyMetrics).flush();
};

export const updateTriggerInitialCPLEvent = (state : boolean) => {
    getLogger().info(`CPL_UPDATE_TRIGGER_INITIAL_CPL_EVENT_TO_${ state.toString() }`).flush();
    _store.triggerInitialCPLEvent = state;
};

export const shouldTriggerInitialCPLEvent = () : boolean => {
    return _store.triggerInitialCPLEvent;
};

export const triggerInitialCPLEvent = (buttonId : string) => {
    if (shouldTriggerInitialCPLEvent()) {
        // Set the flag to false so that CPL call is not triggered again
        updateTriggerInitialCPLEvent(false);
        // Trigger FPTI event to capture the time spent on different phases.
        triggerCPLLatencyMetricsFPTI(buttonId);
    }
};
