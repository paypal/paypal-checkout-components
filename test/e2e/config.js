/* @flow */

import { argv } from 'yargs';

jest.setTimeout(3 * 60 * 1000);

export const STAGE = argv.stage || 'rpadmanathan19123715404292.qa.paypal.com';
export const CLIENT_ID = argv['client-id'] || 'ATq4kPMhjTp6qrUQybY0SSz6Es1sO0YDF9f67rt2e-dZx36hHGbV1U9Ek3QRwcHcyyBlHXysRr-uXg18';
export const DOMAIN = 'https://www.mock-spb-merchant.com';

export const HEADLESS = Boolean(!argv['keep-open']);
export const DEVTOOLS = HEADLESS && Boolean(argv['dev-tools']);
