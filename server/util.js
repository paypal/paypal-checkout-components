/* @flow */

import { ENV } from 'paypal-sdk-constants';

import { HTTP_HEADER, HTTP_CONTENT_TYPE, HTTP_STATUS_CODE } from './constants';
import type { ExpressResponse } from './types';

function response(res : ExpressResponse, status : $Values<typeof HTTP_STATUS_CODE>, type : $Values<typeof HTTP_CONTENT_TYPE>, message : string) {
    res.status(status)
        .header(HTTP_HEADER.CONTENT_TYPE, type)
        .send(message);
}

export function serverErrorResponse(res : ExpressResponse, message : string) {
    response(res, HTTP_STATUS_CODE.SERVER_ERROR, HTTP_CONTENT_TYPE.TEXT, message);
}

export function clientErrorResponse(res : ExpressResponse, message : string) {
    response(res, HTTP_STATUS_CODE.CLIENT_ERROR, HTTP_CONTENT_TYPE.TEXT, message);
}

export function htmlResponse(res : ExpressResponse, html : string) {
    response(res, HTTP_STATUS_CODE.SUCCESS, HTTP_CONTENT_TYPE.HTML, html);
}

export function allowFrame(res : ExpressResponse) {
    res.removeHeader(HTTP_HEADER.X_FRAME_OPTIONS);
}

export function isProduction() : boolean {
    return process.env.NODE_ENV === ENV.PRODUCTION;
}
