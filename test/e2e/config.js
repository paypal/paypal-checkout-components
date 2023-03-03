/* @flow */
/* eslint no-process-env: off */

jest.setTimeout(10 * 60 * 1000);

export const STAGE : string = process.env.STAGE || 'msmaster.qa.paypal.com';
export const CLIENT_ID : string = process.env.CLIENT_ID || 'ATq4kPMhjTp6qrUQybY0SSz6Es1sO0YDF9f67rt2e-dZx36hHGbV1U9Ek3QRwcHcyyBlHXysRr-uXg18';
export const DOMAIN : string = process.env.SPB_DOMAIN || 'https://www.mock-spb-merchant.com';

export const HEADLESS : boolean = Boolean(process.env.HEADLESS !== '0' && process.env.HEADLESS !== 'false');
export const DEVTOOLS : boolean = Boolean(HEADLESS && (process.env.DEV_TOOLS === '1' || process.env.DEV_TOOLS === 'true'));
export const RETRIES : number = process.env.RETRIES ? parseInt(process.env.RETRIES, 10) : 5;
export const LOG : boolean = Boolean(process.env.LOG === '1' || process.env.LOG === 'true');
export const TIMEOUT : number = process.env.TIMEOUT ? parseInt(process.env.TIMEOUT, 10) : 60;
