/* @flow */

import { HiperLogo } from '@paypal/sdk-logos/src';

import type { CardConfig } from '../../common';
import { enableLogoCDNExperiment } from '../../../lib/getLogoCDNExperiment';

export function getHiperConfig() : CardConfig {
    return {
        Label: () => enableLogoCDNExperiment(HiperLogo)
    };
}
