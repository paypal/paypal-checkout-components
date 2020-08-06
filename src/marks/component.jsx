/* @flow */
/** @jsx node */

import { node, dom } from 'jsx-pragmatic/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { getElement, isDevice, memoize } from 'belter/src';
import { PLATFORM, FUNDING } from '@paypal/sdk-constants/src';
import { getRememberedFunding } from '@paypal/funding-components/src';
import { getComponents, getFundingEligibility } from '@paypal/sdk-client/src';

import type { OnShippingChange } from '../ui/buttons/props';
import { BUTTON_LAYOUT, BUTTON_FLOW } from '../constants';
import { determineEligibleFunding, isFundingEligible } from '../funding';

import { MarksElement } from './template';

const DEFAULT_HEIGHT = 20;

type MarksType = {|
    isEligible : () => boolean,
    render : (string | HTMLElement) => ZalgoPromise<void>
|};

export const getMarksComponent = memoize(() => {
    function Marks({ fundingSource, onShippingChange } : {| fundingSource? : ?$Values<typeof FUNDING>, onShippingChange? : OnShippingChange |} = {}) : MarksType {

        const height = DEFAULT_HEIGHT;
        const fundingEligibility = getFundingEligibility();
        const platform = isDevice() ? PLATFORM.MOBILE : PLATFORM.DESKTOP;
        const remembered = getRememberedFunding();
        const layout = BUTTON_LAYOUT.VERTICAL;
        const components = getComponents();
        const flow = BUTTON_FLOW.PURCHASE;
        const fundingSources = determineEligibleFunding({ fundingSource, fundingEligibility, components, platform, remembered, layout, flow });

        const isEligible = () => {
            if (!fundingSource) {
                return true;
            }

            return isFundingEligible(fundingSource, { layout, platform, fundingSource, fundingEligibility, components, onShippingChange, flow });
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
