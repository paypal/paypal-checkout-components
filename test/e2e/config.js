/* @flow */
/* eslint no-process-env: off */

jest.setTimeout(3 * 60 * 1000);

export const STAGE = process.env.STAGE || 'msmaster.qa.paypal.com';
export const CLIENT_ID = process.env.CLIENT_ID || 'ATq4kPMhjTp6qrUQybY0SSz6Es1sO0YDF9f67rt2e-dZx36hHGbV1U9Ek3QRwcHcyyBlHXysRr-uXg18';
export const DOMAIN = process.env.SPB_DOMAIN || 'https://www.mock-spb-merchant.com';

export const HEADLESS = Boolean(process.env.HEADLESS !== '0' && process.env.HEADLESS !== 'false');
export const DEVTOOLS = Boolean(HEADLESS && (process.env.DEV_TOOLS === '1' || process.env.DEV_TOOLS === 'true'));
export const RETRIES = process.env.RETRIES ? parseInt(process.env.RETRIES, 10) : 5;
export const LOG = Boolean(process.env.LOG === '1' || process.env.LOG === 'true');
