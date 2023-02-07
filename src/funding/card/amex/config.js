/* @flow */

import { AmexLogo } from '@paypal/sdk-logos/src';

import type { CardConfig } from '../../common';
import { enableLogoCDNExperiment } from '../../../lib/getLogoCDNExperiment';

export function getAmexConfig() : CardConfig {
    return {
        Label: () => enableLogoCDNExperiment(AmexLogo)
    };
}

