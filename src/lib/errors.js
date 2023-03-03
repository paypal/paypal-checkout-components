/* @flow */

import { ERROR_CODE } from '@paypal/sdk-constants/src';

export class ValidationError extends Error {
    code : string;

    constructor(message : string) {
        super(message);
        this.name = 'ValidationError';
        this.code = ERROR_CODE.VALIDATION_ERROR;
    }
}
