/* @flow */

import { AmexLogo } from '@paypal/sdk-logos/src';

import type { CardConfig } from '../../common';

export function getAmexConfig() : CardConfig {
    return {
        Label: AmexLogo
    };
}

