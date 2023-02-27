/* @flow */

import { DiscoverLogo } from '@paypal/sdk-logos/src';

import type { CardConfig } from '../../common';

export function getDiscoverConfig() : CardConfig {
    return {
        Label: DiscoverLogo
    };
}
