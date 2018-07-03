/* @flow */
/* @jsx jsxDom */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';
import { create } from 'xcomponent/src';
import { type Component } from 'xcomponent/src/component/component';
import { getBrowserLocale } from '../lib';

import { containerTemplate, componentTemplate } from './template';
import { ENV } from '../constants';

import { config } from '../config';

type BillingOptions = {
    client : {
        [string] : (string | ZalgoPromise<string>)
    },
    env? : string,
    locale? : string,
    logLevel : string,
    awaitPopupBridge : Function,
    meta : Object
};

export const BillingPage : Component<BillingOptions> = create({
    tag:  'billing-page',
    name: 'billing-page',

    buildUrl(props) : string {
        let env = props.env || config.env;
        return `${ config.inlinedCardFieldUrls[env] }/billing`;
    },

    get domain() : Object {
        return {
            ...config.paypalDomains,
            [ ENV.LOCAL ]: /^http:\/\/localhost.paypal.com:\d+$/
        };
    },

    get bridgeUrl() : Object {
        return config.metaFrameUrls;
    },

    get bridgeDomain() : Object {
        return config.paypalDomains;
    },

    props: {
        prefilledZipCode: {
            type:     'string',
            required: false
        },
    
        locale: {
            type:          'string',
            required:      false,
            queryParam:    'locale.x',
            allowDelegate: true,

            def() : string {
                let { lang, country } = getBrowserLocale();
                return `${ lang }_${ country }`;
            }
        }
    },

    on: {
        type:       'function',
        required:   false,
        sameDomain: true
    },

    dispatch: {
        type:       'object',
        required:   false,
        sameDomain: true
    },

    onCancel: {
        type:     'function',
        required: false,
        once:     true,
        noop:     true
    },

    containerTemplate
});
