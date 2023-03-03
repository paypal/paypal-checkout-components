/* @flow */
/** @jsx node */

import { FUNDING, type LocaleType } from '@paypal/sdk-constants/src';
import { node, Fragment, type ElementNode } from '@krakenjs/jsx-pragmatic/src';

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
        return;
    }

    const tagline = personalization && personalization.tagline;

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
