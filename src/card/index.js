/* @flow */
/* @jsx jsxDom */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';
import { create, PopupOpenError  } from 'xcomponent/src';
import { type Component } from 'xcomponent/src/component/component';
import { warn } from 'beaver-logger/client';
import type { CrossDomainWindowType } from 'cross-domain-utils/src';

import { onAuthorizeListener } from '../experiments';
import { mergePaymentDetails } from '../api/hacks';
import { request, redirect as redir, patchMethod,
    setLogLevel, memoize, isPayPalDomain
} from '../lib';

type CardOptions = {
    client : {
        [string] : (string | ZalgoPromise<string>)
    },
    env? : string,
    locale? : string,
    logLevel : string,
    awaitPopupBridge : Function,
    onAuthorize : ({ returnUrl : string }, { redirect : (?CrossDomainWindowType, ?string) => ZalgoPromise<void> }) => ?ZalgoPromise<void>,
    onCancel? : ({ cancelUrl : string }, { redirect : (?CrossDomainWindowType, ?string) => ZalgoPromise<void> }) => ?ZalgoPromise<void>,
    meta : Object
};

export const Card : Component<CardOptions> = create({
    tag:  'zombo',
    name: 'ppcard',

    dimensions: {
        height: '300px',
        width:  '250px'
    },

    buildUrl() : string {
        return 'http://localhost.paypal.com:8000/webapps/hermes/zombo';
    },

    contexts: {
        iframe: true,
        popup:  false
    },

    onAuthorize: {
        type:     'function',
        required: true,
        once:     true
    },

    onAuth: {
        type:       'function',
        required:   false,
        sameDomain: true
    },

    on: {
        type:       'function',
        required:   false,
        sameDomain: true
    },

    onCancel: {
        type:     'function',
        required: false,
        once:     true,
        noop:     true
    }
});
