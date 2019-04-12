/* @flow */
/* eslint no-process-env: off */

import { argv } from 'yargs';

jest.setTimeout(3 * 60 * 1000);

export const STAGE = process.env.STAGE || 'msmaster.qa.paypal.com';
export const CLIENT_ID = process.env.CLIENT_ID || 'ATq4kPMhjTp6qrUQybY0SSz6Es1sO0YDF9f67rt2e-dZx36hHGbV1U9Ek3QRwcHcyyBlHXysRr-uXg18';
export const DOMAIN = process.env.SPB_DOMAIN || 'https://www.mock-spb-merchant.com';

export const HEADLESS = process.env.KEEP_OPEN || Boolean(!argv['keep-open']);
export const DEVTOOLS = HEADLESS && process.env.DEV_TOOLS;
