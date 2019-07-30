/* @flow */
/** @jsx node */

import { FUNDING, type LocaleType } from '@paypal/sdk-constants/src';
import { node, Fragment, type ElementNode } from 'jsx-pragmatic/src';

import { CLASS } from '../../constants';
import { getFundingConfig } from '../../funding';
import { type ButtonStyle, type Personalization } from '../props';
import { TrackingBeacon } from '../../ui/tracking';

export function TagLine({ fundingSource, style, locale, multiple, nonce, personalization } :
    {| fundingSource : $Values<typeof FUNDING>, style : ButtonStyle, locale : LocaleType, multiple : boolean, nonce : string, personalization : ?Personalization |}) : ?ElementNode {

    const { label } = style;

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
                tagline
                    ? (
                        <Fragment>
                            <span>{ tagline.text }</span>
                            {
                                tagline.tracking && tagline.tracking.impression &&
                                    <TrackingBeacon url={ tagline.tracking.impression } nonce={ nonce } />
                            }
                        </Fragment>
                    )
                    : (
                        <Tag
                            label={ label }
                            nonce={ nonce }
                            locale={ locale }
                            multiple={ multiple }
                        />
                    )
            }
        </div>
    );
}
