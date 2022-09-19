/* @flow */

import { COUNTRY } from '@paypal/sdk-constants/src';
import { uniqueID } from '@krakenjs/belter/src';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';

import { getLogger } from '../lib';

import { setupButtonLogger } from './logger';


jest.mock('../lib/logger', () => {
    const original = jest.requireActual('../lib/logger');
    return {
        ...original,
        getLogger:   jest.fn(),
        setupLogger: jest.fn()
    };
});

describe('getButtonProps', () => {


    const buttonLoggerProps = {
        env:                       'test',
        sessionID:                 uniqueID(),
        clientID:                  uniqueID(),
        commit:                    true,
        sdkCorrelationID:          uniqueID(),
        buttonCorrelationID:       uniqueID(),
        partnerAttributionID:      uniqueID(),
        fundingSource:             'applepay',
        buttonSessionID:           uniqueID(),
        merchantDomain:            'mock://www.paypal.com',
        sdkVersion:                '1.2.3',
        stickinessID:              uniqueID(),
        buyerCountry:              COUNTRY.US,
        onShippingChange:          jest.fn(),
        getQueriedEligibleFunding: () => ZalgoPromise.resolve([]),
        style:                     { tagline: true, shape: '', layout: '', label: '', color: '' },
        locale:                    {
            country: 'US',
            lang:    'en'
        },
        merchantID:                [ 'XYZ12345' ]
    };
    global.__SMART_BUTTONS__ = {};
    const infoMock = jest.fn();
    const trackMock = jest.fn();
    beforeAll(() => {
        (getLogger : Function).mockImplementation(() => ({
            addTrackingBuilder: jest.fn(),
            addPayloadBuilder:  jest.fn(),
            info:               infoMock,
            track:              trackMock,
            warn:               jest.fn(),
            error:              jest.fn(),
            flush:              jest.fn()
        }));
    });

    it('should send logs for CPL', async () => {
        jest.spyOn(Date, 'now').mockImplementation(() => 4000);
        jest
            .spyOn(window, 'performance', 'get')
            .mockImplementation(() => ({
                now:    jest.fn(() => 1000),
                timing: {
                    navigationStart: 1000
                },
                getEntriesByName: jest.fn(() => (
                    [
                        { startTime: 2000 }
                    ]
                ))
            }));
        await setupButtonLogger(buttonLoggerProps);
        expect(infoMock).toHaveBeenCalledTimes(12);
        expect(infoMock).toHaveBeenCalledWith('CPL_LATENCY_METRICS_SECOND_RENDER');
        expect(trackMock).toHaveBeenCalledTimes(2);
        expect(trackMock).toHaveBeenCalledWith({
            state_name:        'CPL_LATENCY_METRICS',
            transition_name:   'process_client_metrics',
            page_name:         'main:xo:paypal-components:smart-payment-buttons',
            cpl_comp_metrics:  '{"second-render-response":{"start":0,"tt":3000},"second-render-body":{"start":3000,"tt":1000}}'
        });
    });

    it('should fail to get performance marks', async () => {
        jest
            .spyOn(window, 'performance', 'get')
            .mockImplementation(() => ({}));
        await setupButtonLogger(buttonLoggerProps);
        expect(infoMock).toHaveBeenCalledWith('button_render_CPL_instrumentation_log_error');
    });

    it('should not execute cpl instrumentation', async () => {
        jest
            .spyOn(window, 'performance', 'get')
            .mockImplementation(() => null);
        await setupButtonLogger(buttonLoggerProps);
        expect(infoMock).toHaveBeenCalledWith('button_render_CPL_instrumentation_not_executed');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
