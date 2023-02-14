/* @flow */

import { JcbLogo } from '@paypal/sdk-logos/src';

import type { CardConfig } from '../../common';
import { enableLogoCDNExperiment } from '../../../lib/getLogoCDNExperiment';

export function getJCBConfig() : CardConfig {
    return {
        Label: () => enableLogoCDNExperiment(JcbLogo)
    };
}
