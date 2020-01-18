/* @flow */
/** @jsx node */

import { node, dom } from 'jsx-pragmatic/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { getElement, isDevice } from 'belter/src';
import { PLATFORM, FUNDING } from '@paypal/sdk-constants/src';
import { getRememberedFunding } from '@paypal/funding-components/src';
import { getComponents } from '@paypal/sdk-client/src';

import { getFundingEligibility } from '../globals';
import { BUTTON_LAYOUT } from '../constants';
import { determineEligibleFunding } from '../funding';

import { MarksElement } from './template';

const DEFAULT_HEIGHT = 20;

type MarksType = {|
    render : (string | HTMLElement) => ZalgoPromise<void>
|};

export function Marks({ fundingSource } : { fundingSource? : ?$Values<typeof FUNDING> } = {}) : MarksType {

    const height = DEFAULT_HEIGHT;
    const fundingEligibility = getFundingEligibility();
    const platform = isDevice() ? PLATFORM.MOBILE : PLATFORM.DESKTOP;
    const remembered = getRememberedFunding();
    const layout = BUTTON_LAYOUT.VERTICAL;
    const components = getComponents();
    const fundingSources = determineEligibleFunding({ fundingSource, fundingEligibility, components,  platform, remembered, layout });

    const render = (container) => {
        return ZalgoPromise.try(() => {
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
        render
    };
}
