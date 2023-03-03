/* @flow */
/** @jsx node */

import { node, dom } from '@krakenjs/jsx-pragmatic/src';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { getElement, isDevice, memoize, isApplePaySupported, supportsPopups as userAgentSupportsPopups } from '@krakenjs/belter/src';
import { PLATFORM, FUNDING } from '@paypal/sdk-constants/src';
import { getRememberedFunding } from '@paypal/funding-components/src';
import { getComponents, getFundingEligibility, getEnv } from '@paypal/sdk-client/src';

import type { OnShippingChange, OnShippingAddressChange, OnShippingOptionsChange } from '../ui/buttons/props';
import { BUTTON_LAYOUT, BUTTON_FLOW } from '../constants';
import { determineEligibleFunding, isFundingEligible } from '../funding';
import { isSupportedNativeBrowser, getVenmoExperiment } from '../zoid/buttons/util';

import { MarksElement } from './template';

const DEFAULT_HEIGHT = 20;

type MarksInstance = {|
    isEligible : () => boolean,
    render : (string | HTMLElement) => ZalgoPromise<void>
|};

type MarksProps = {|
    fundingSource? : ?$Values<typeof FUNDING>,
    onShippingChange? : OnShippingChange,
    onShippingAddressChange? : OnShippingAddressChange,
    onShippingOptionsChange? : OnShippingOptionsChange
|};

export type MarksComponent = (MarksProps) => MarksInstance;

export const getMarksComponent : () => MarksComponent = memoize(() => {
    function Marks({ fundingSource, onShippingChange, onShippingAddressChange, onShippingOptionsChange } : MarksProps = {}) : MarksInstance {

        const height = DEFAULT_HEIGHT;
        const fundingEligibility = getFundingEligibility();
        const platform = isDevice() ? PLATFORM.MOBILE : PLATFORM.DESKTOP;
        const remembered = getRememberedFunding();
        const layout = BUTTON_LAYOUT.VERTICAL;
        const components = getComponents();
        const flow = BUTTON_FLOW.PURCHASE;
        const applePaySupport = fundingEligibility?.applepay?.eligible ? isApplePaySupported() : false;
        const supportsPopups = userAgentSupportsPopups();
        const supportedNativeBrowser = isSupportedNativeBrowser();
        const experiment = getVenmoExperiment();
        const fundingSources = determineEligibleFunding({ fundingSource, fundingEligibility, components, platform, remembered, layout, flow, applePaySupport, supportsPopups, supportedNativeBrowser, experiment });
        const env = getEnv();

        const isEligible = () => {
            if (!fundingSource) {
                return true;
            }

            return isFundingEligible(fundingSource, { layout, platform, fundingSource, fundingEligibility, components, onShippingChange, onShippingAddressChange, onShippingOptionsChange, flow, applePaySupport, supportsPopups, supportedNativeBrowser, experiment });
        };

        const render = (container) => {
            return ZalgoPromise.try(() => {
                if (!isEligible()) {
                    throw new Error(`${ fundingSource || 'marks' } not eligible`);
                }

                getElement(container).appendChild(
                    (
                        <div>
                            <MarksElement
                                fundingEligibility={ fundingEligibility }
                                fundingSources={ fundingSources }
                                height={ height }
                                experiment={ experiment }
                                env={ env }
                            />
                        </div>
                    ).render(dom({ doc: document }))
                );
            });
        };

        return {
            render,
            isEligible
        };
    }

    return Marks;
});
