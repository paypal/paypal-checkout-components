/* @flow */

import { ENV } from '@paypal/sdk-constants';

export function getEnv() : $Values<typeof ENV> {
    let ppEnv;

    try {
        // $FlowFixMe
        ppEnv = require('environment-paypal');
    } catch (err) {
        // pass
    }

    if ((ppEnv && ppEnv.isProd()) || process.env.NODE_ENV === ENV.PRODUCTION) {
        return ENV.PRODUCTION;
    } else if ((ppEnv && ppEnv.isSandbox()) || process.env.NODE_ENV === ENV.SANDBOX) {
        return ENV.SANDBOX;
    } else if ((ppEnv && ppEnv.isStage()) || process.env.NODE_ENV === ENV.STAGE) {
        return ENV.STAGE;
    } else if ((ppEnv && ppEnv.isTest()) || process.env.NODE_ENV === ENV.TEST) {
        return ENV.TEST;
    } else if ((ppEnv && ppEnv.isDev()) || process.env.NODE_ENV === ENV.LOCAL) {
        return ENV.LOCAL;
    }

    return ENV.PRODUCTION;
}

export function isEnv(...envs : $ReadOnlyArray<string>) : boolean {
    const currentEnv = getEnv();
    return Boolean(envs.find(env => (env === currentEnv)));
}
