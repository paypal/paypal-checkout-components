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

    const { Tag } = fundingConfig;

    if (!Tag) {
        return;
    }

    return (
        <div class={ CLASS.TAGLINE }>
            <Tag
                label={ label }
                nonce={ nonce }
                locale={ locale }
                multiple={ multiple }
            />
        </div>
    );
}
