/* @flow */

import { JcbLogo } from '@paypal/sdk-logos/src';

import type { CardConfig } from '../../common';

export function getJCBConfig() : CardConfig {
    return {
        Logo: JcbLogo
    };
}
