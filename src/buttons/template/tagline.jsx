/* @flow */
/** @jsx node */

import { FUNDING, type LocaleType } from '@paypal/sdk-constants/src';
import { node, type ElementNode } from 'jsx-pragmatic/src';

import { CLASS } from '../../constants';
import { getFundingConfig } from '../../funding';
import { type ButtonStyle } from '../props';

export function TagLine({ fundingSource, style, locale, multiple, nonce } :
    {| fundingSource : $Values<typeof FUNDING>, style : ButtonStyle, locale : LocaleType, multiple : boolean, nonce : string |}) : ?ElementNode {

    const { label } = style;

    const fundingConfig = getFundingConfig()[fundingSource];

    if (!fundingConfig) {
        throw new Error(`Can not get config for ${ fundingSource }`);
    }

    const labelConfig = fundingConfig.labels[label];

    if (!labelConfig) {
        throw new Error(`Can not find label config for ${ label }`);
    }

    const { Tag } = labelConfig;

    if (!Tag) {
        return;
    }

    return (
        <div class={ CLASS.TAGLINE }>
            <Tag
                nonce={ nonce }
                locale={ locale }
                multiple={ multiple }
            />
        </div>
    );
}
