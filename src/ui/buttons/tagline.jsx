/* @flow */
/** @jsx node */

import { FUNDING, FPTI_KEY, type LocaleType } from '@paypal/sdk-constants/src';
import { node, Fragment, type ElementNode } from 'jsx-pragmatic/src';
import { getLogger } from '@paypal/sdk-client/src';

import { CLASS } from '../../constants';
import { getFundingConfig } from '../../funding';
import { TrackingBeacon } from '../tracking';

import { type ButtonStyle, type Personalization } from './props';

export function TagLine({ fundingSource, locale, multiple, nonce, personalization } :
    {| fundingSource : $Values<typeof FUNDING>, style : ButtonStyle, locale : LocaleType, multiple : boolean, nonce : string, personalization : ?Personalization |}) : ?ElementNode {

    const fundingConfig = getFundingConfig()[fundingSource];

    if (!fundingConfig) {
        throw new Error(`Can not get config for ${ fundingSource }`);
    }

    const { Tag } = fundingConfig;

    if (!Tag) {
        getLogger().track({
            [FPTI_KEY.STATE]:      'SMART_BUTTON',
            [FPTI_KEY.TRANSITION]: 'PROCESS_BUTTON_LOAD',
            tagline_shown:         false,
            tagline_message:       'NA'
        });
        return;
    }

    const tagline = personalization && personalization.tagline;

    if (tagline) {
        getLogger().track({
            [FPTI_KEY.STATE]:      'SMART_BUTTON',
            [FPTI_KEY.TRANSITION]: 'PROCESS_BUTTON_LOAD',
            tagline_shown:         true,
            tagline_message:       tagline.text
        });
    } else {
        getLogger().track({
            [FPTI_KEY.STATE]:      'SMART_BUTTON',
            [FPTI_KEY.TRANSITION]: 'PROCESS_BUTTON_LOAD',
            tagline_shown:         true,
            tagline_message:       `default-${ multiple ? 'dual' : 'safer' }-tagline`
        });
    }

    return (
        <div class={ CLASS.TAGLINE }>
            {
                (tagline)
                    ? (
                        <Fragment>
                            <span>
                                {
                                    tagline.Component
                                        ? <tagline.Component />
                                        : tagline.text
                                }
                            </span>
                            {
                                tagline.tracking && tagline.tracking.impression &&
                                    <TrackingBeacon url={ tagline.tracking.impression } nonce={ nonce } />
                            }
                        </Fragment>
                    )
                    : (
                        <Tag
                            locale={ locale }
                            multiple={ multiple }
                        />
                    )
            }
        </div>
    );
}
