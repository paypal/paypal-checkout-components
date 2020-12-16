/* @flow */

import { dirname } from 'path';

import { webpackCompile } from 'webpack-mem-compile';
import webpack from 'webpack';
import { regexTokenize } from 'belter';
import type { ChildType, NullableChildType } from 'jsx-pragmatic/src';

import { HTTP_HEADER, HTTP_CONTENT_TYPE, HTTP_STATUS_CODE, HTTP_CONTENT_DISPOSITION } from '../config';
import type { ExpressRequest, ExpressResponse, LoggerType, LoggerPayload } from '../types';

function response(res : ExpressResponse, status : $Values<typeof HTTP_STATUS_CODE>, type : $Values<typeof HTTP_CONTENT_TYPE>, message : string) {
    res.status(status)
        .header(HTTP_HEADER.CONTENT_TYPE, type)
        .header(HTTP_HEADER.CONTENT_DISPOSITION, HTTP_CONTENT_DISPOSITION.INLINE)
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

export function javascriptResponse(res : ExpressResponse, javascript : string) {
    response(res, HTTP_STATUS_CODE.SUCCESS, HTTP_CONTENT_TYPE.JAVASCRIPT, javascript);
}

export function emptyResponse(res : ExpressResponse) {
    response(res, HTTP_STATUS_CODE.SUCCESS, HTTP_CONTENT_TYPE.TEXT, '');
}

export function allowFrame(res : ExpressResponse) {
    res.removeHeader(HTTP_HEADER.X_FRAME_OPTIONS);
}

export function isLocal() : boolean {
    return (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
}

export function isTest() : boolean {
    return process.env.NODE_ENV === 'test';
}

export function isLocalOrTest() : boolean {
    return isLocal() || isTest();
}

// eslint-disable-next-line no-unused-vars, flowtype/no-weak-types
export function safeJSON(...args : $ReadOnlyArray<any>) : string {
    return JSON.stringify.apply(null, arguments).replace(/</g, '\\u003C').replace(/>/g, '\\u003E');
}

export const defaultLogger : LoggerType = {
    debug: (req : ExpressRequest, ...args : $ReadOnlyArray<mixed>) => console.debug(...args), // eslint-disable-line no-console
    info:  (req : ExpressRequest, ...args : $ReadOnlyArray<mixed>) => console.info(...args),  // eslint-disable-line no-console
    warn:  (req : ExpressRequest, ...args : $ReadOnlyArray<mixed>) => console.warn(...args), // eslint-disable-line no-console
    error: (req : ExpressRequest, ...args : $ReadOnlyArray<mixed>) => console.error(...args) // eslint-disable-line no-console
};

const registerDirs = [];

export function babelRegister(dir : string) {
    if (registerDirs.indexOf(dir) === -1) {
        registerDirs.push(dir);
    }

    require('@babel/register')({
        only: [
            (path) => {
                for (const registerDir of registerDirs) {
                    if (path.indexOf(registerDir) === 0 && path.slice(registerDir.length).indexOf('/node_modules/') === -1) {
                        return true;
                    }
                }
                return false;
            }
        ]
    });
}

export function resolveScript(path : string) : ?string {
    try {
        return require.resolve(path);
    } catch (err) {
        // pass
    }
}

export function dynamicRequire<T>(path : string) : T {
    // $FlowFixMe
    return require(path); // eslint-disable-line security/detect-non-literal-require
}

export function babelRequire<T>(path : string) : T {
    babelRegister(dirname(path));
    return dynamicRequire(path);
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

export type LoggerBufferType = {|
    debug : (event : string, payload : LoggerPayload) => void,
    info : (event : string, payload : LoggerPayload) => void,
    warn : (event : string, payload : LoggerPayload) => void,
    error : (event : string, payload : LoggerPayload) => void,
    flush : (req : ExpressRequest) => void
|};


export function getLogBuffer(logger : LoggerType) : LoggerBufferType {
    const buffer = [];

    const push = (level, event, payload) => {
        buffer.push({ level, event, payload });
    };

    const debug = (event, payload) => push('debug', event, payload);
    const info = (event, payload) => push('info', event, payload);
    const warn = (event, payload) => push('warn', event, payload);
    const error = (event, payload) => push('error', event, payload);

    const flush = (req) => {
        while (buffer.length) {
            const { level, event, payload } = buffer.shift();
            logger[level](req, event, payload);
        }
    };

    return {
        debug, info, warn, error, flush
    };
}

export function placeholderToJSX(text : string, placeholders : { [string] : (?string) => NullableChildType }) : ChildType {
    return regexTokenize(text, /(\{[a-z]+\})|([^{}]+)/g)
        .map(token => {
            const match = token.match(/^{([a-z]+)}$/);
            if (match) {
                return placeholders[match[1]]();
            } else if (placeholders.text) {
                return placeholders.text(token);
            } else {
                return token;
            }
        }).filter(Boolean);
}

export function isDefined(item : mixed) : boolean {
    return (item !== null && typeof item !== 'undefined');
}

export function isEmpty(obj : Object) : boolean {
    const keys = Object.keys(obj);

    if (keys.length === 0) {
        return true;
    }

    for (const key of keys) {
        if (isDefined(obj[key])) {
            return false;
        }
    }

    return true;
}

export function getCookieString(req : ExpressRequest) : string {
    if (!req.cookies) {
        return '';
    }

    return Object.keys(req.cookies).map(key => {
        const value = req.cookies[key];
        return `${ key }=${ value };`;
    }).join('');
}

export function makeError(code : string, message : string, originalError? : Error) : Error {
    if (originalError && originalError.stack) {
        message = `${ message }\n\n${ originalError.stack }`;
    }
    const err = new Error(message);
    // $FlowFixMe
    err.code = code;
    return err;
}

export function isError(error? : Error, ...codes : $ReadOnlyArray<string>) : boolean {
    // $FlowFixMe
    const errorCode = error && error.code;
    return Boolean(errorCode && codes.some(code => (errorCode === code)));
}

export function copy<T>(obj : T) : T {
    const stringified = JSON.stringify(obj);

    if (typeof stringified === 'undefined') {
        // $FlowFixMe
        return;
    }
    
    return JSON.parse(stringified);
}

export async function promiseTimeout<T>(promise : Promise<T>, time : number) : Promise<T> {
    return await new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error(`Timed out after ${ time }ms`));
        }, time);

        const res = (val) => {
            clearTimeout(timer);
            resolve(val);
        };

        const rej = (err) => {
            clearTimeout(timer);
            reject(err);
        };

        promise.then(res, rej);
    });
}

export function getCSPNonce(res : ExpressResponse) : string {
    let nonce = res.locals && res.locals.nonce;

    if (!nonce || typeof nonce !== 'string') {
        nonce = '';
    }

    return nonce;
}
