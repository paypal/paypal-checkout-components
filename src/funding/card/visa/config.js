/* @flow */

import { VisaLogo } from '@paypal/sdk-logos/src';

import type { CardConfig } from '../../common';

export function getVisaConfig() : CardConfig {
    return {
        Logo: VisaLogo
    };
}
