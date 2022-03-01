/* @flow */
/** @jsx node */

import { FUNDING, ENV } from '@paypal/sdk-constants/src';
import { node, type ChildNodeType, type ElementNode } from '@krakenjs/jsx-pragmatic/src';
import { getLocale, type FundingEligibilityType } from '@paypal/sdk-client/src';
import { toPx } from '@krakenjs/belter/src';

import type { Experiment } from '../types';
import { getFundingConfig } from '../funding';
import { CLASS } from '../constants';

type MarkOptions = {|
    fundingSource : $Values<typeof FUNDING>,
    fundingEligibility : FundingEligibilityType,
    experiment : Experiment,
    env : $Values<typeof ENV>
|};

function Mark({ fundingSource, fundingEligibility, experiment, env } : MarkOptions) : ChildNodeType {
    const fundingConfig = getFundingConfig()[fundingSource];

    if (!fundingConfig) {
        throw new Error(`Can not find funding config for ${ fundingSource }`);
    }

    const { Logo } = fundingConfig;
    const MarkLogo = fundingConfig.Mark;
    const marksDefined = typeof MarkLogo !== 'undefined';

    return (
        <div class='paypal-mark'>
            { marksDefined && MarkLogo
                ? <MarkLogo
                        fundingEligibility={ fundingEligibility }
                        locale={ getLocale() }
                        experiment={ experiment }
                        env={ env }
                />
                : <Logo
                        fundingEligibility={ fundingEligibility }
                        locale={ getLocale() }
                        experiment={ experiment }
                        env={ env }
                /> }

        </div>
    );
}

type MarksElementOptions = {|
    fundingEligibility : FundingEligibilityType,
    fundingSources : $ReadOnlyArray<$Values<typeof FUNDING>>,
    height : number,
    experiment : Experiment,
    env : $Values<typeof ENV>
|};

export function MarksElement({ fundingEligibility, fundingSources, height, experiment, env } : MarksElementOptions) : ElementNode {
    return (
        <div class='paypal-marks'>
            <style>
                {`
                    .${ CLASS.TEXT } {
                        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                        font-size: 12px;
                        vertical-align: middle;
                    }

                    .paypal-mark {
                        display: inline-block;
                        line-height: 0;
                        padding: ${ toPx(height / 4) } ${ toPx(height / 3) };
                        background: #fff;
                        border-radius: 3px;
                        margin: ${ toPx(height / 5) };
                        white-space: nowrap;
                        position: relative;
                        background: #fff;
                        border: 1px solid #dcdcdc;
                    }

                    .paypal-mark:last-child {
                        margin-right: none;
                    }

                    .paypal-mark img {
                        height: ${ toPx(height) };
                        display: inline-block;
                        vertical-align: middle;
                    }

                    .paypal-button-card {
                        display: inline-block;
                        margin-right: ${ toPx(height / 4) };
                    }

                    .paypal-button-card:last-child {
                        margin-right: 0px;
                    }
                `}
            </style>
            {
                fundingSources.map(fundingSource => (
                    <Mark
                        fundingEligibility={ fundingEligibility }
                        fundingSource={ fundingSource }
                        experiment={ experiment }
                        env={ env }
                    />
                ))
            }
        </div>
    );
}
