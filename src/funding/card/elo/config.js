/* @flow */

import { EloLogo } from '@paypal/sdk-logos/src';

import type { CardConfig } from '../../common';

export function getEloConfig() : CardConfig {
    return {
        Label: EloLogo
    };
}
