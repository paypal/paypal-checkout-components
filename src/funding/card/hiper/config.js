/* @flow */

import { HiperLogo } from '@paypal/sdk-logos/src';

import type { CardConfig } from '../../common';

export function getHiperConfig() : CardConfig {
    return {
        Label: HiperLogo
    };
}
