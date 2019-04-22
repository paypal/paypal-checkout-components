/* @flow */

import { MastercardLogo } from '@paypal/sdk-logos/src';

import type { CardConfig } from '../../common';

export function getMastercardConfig() : CardConfig {
    return {
        Label: MastercardLogo
    };
}
