/* @flow */

import { webpackCompile } from 'webpack-mem-compile';
import webpack from 'webpack';

import { HTTP_HEADER, HTTP_CONTENT_TYPE, HTTP_STATUS_CODE } from '../config';
import type { ExpressRequest, ExpressResponse } from '../types';

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

export function isLocal() : boolean {
    return (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
}

// eslint-disable-next-line no-unused-vars, flowtype/no-weak-types
export function safeJSON(...args : $ReadOnlyArray<any>) : string {
    return JSON.stringify.apply(null, arguments).replace(/</g, '\\u003C').replace(/>/g, '\\u003E');
}

export const defaultLogger = {
    debug: (req : ExpressRequest, ...args : $ReadOnlyArray<mixed>) => console.debug(...args), // eslint-disable-line no-console
    info:  (req : ExpressRequest, ...args : $ReadOnlyArray<mixed>) => console.info(...args),  // eslint-disable-line no-console
    warn:  (req : ExpressRequest, ...args : $ReadOnlyArray<mixed>) => console.warn(...args), // eslint-disable-line no-console
    error: (req : ExpressRequest, ...args : $ReadOnlyArray<mixed>) => console.error(...args) // eslint-disable-line no-console
};

export function babelRegister(dir : string) {
    require('@babel/register')({
        only: [
            (path) => {
                return (path.indexOf(dir) === 0 && path.indexOf('/node_modules/') === -1);
            }
        ]
    });
}

export function babelRequire<T>(path : string) : T {
    babelRegister(path);

    // $FlowFixMe
    return require(path); // eslint-disable-line security/detect-non-literal-require
}

export async function compileWebpack(config : Object, context : string) : Promise<string> {
    config.context = context;
    return await webpackCompile({ webpack, config });
}

export function evalRequireScript<T>(script : string) : T {
    const module = {
        exports: {}
    };
    // eslint-disable-next-line security/detect-eval-with-expression, no-eval
    eval(script);
    // $FlowFixMe
    return module.exports; // eslint-disable-line import/no-commonjs
}

export function getNonce(res : ExpressResponse) : string {
    let nonce = res.locals && res.locals.nonce;

    if (!nonce || typeof nonce !== 'string') {
        nonce = '';
    }

    return nonce;
}
