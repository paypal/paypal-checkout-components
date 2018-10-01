/* @flow */
/* @jsx jsxDom */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';
import { create } from 'xcomponent/src';
import { type Component } from 'xcomponent/src/component/component';

import { ENV } from '../constants';
import { getButtonSessionID, getBrowserLocale, getSessionID } from '../lib';
import { config } from '../config';

import { containerTemplate } from './template';

type BillingOptions = {
    client : {
        [string] : (string | ZalgoPromise<string>)
    },
    env? : string,
    locale? : string,
    logLevel : string,
    awaitPopupBridge : Function,
    meta : Object,
    commit : boolean,
    token : string
};

export const BillingPage : Component<BillingOptions> = create({
    tag:  'billing-page',
    name: 'billing-page',

    buildUrl(props) : string {
        const env = props.env || config.env;
        return `${ config.inlinedCardFieldUrls[env] }/billing`;
    },

    get domain() : Object {
        return {
            ...config.paypalDomains,
            [ ENV.LOCAL ]: /^http:\/\/localhost.paypal.com:\d+$/
        };
    },

    scrolling: true,

    props: {
        sessionID: {
            type:     'string',
            required: false,
            def() : string {
                return getSessionID();
            },
            queryParam: true
        },


        token: {
            type:       'string',
            required:   true,
            queryParam: true
        },

        buttonSessionID: {
            type:     'string',
            required: false,
            def() : ?string {
                return getButtonSessionID();
            },
            queryParam: true
        },

        commit: {
            type:       'boolean',
            required:   false,
            queryParam: true
        },

        env: {
            type:       'string',
            required:   false,
            queryParam: true,

            def() : string {
                return config.env;
            },

            validate(env) {
                if (!config.paypalUrls[env]) {
                    throw new Error(`Invalid env: ${ env }`);
                }
            }
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
        },

        cardType: {
            type:       'string',
            required:   false
        },
        prefilledZipCode: {
            type:     'string',
            required: false
        },

        onEvent: {
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
        }
    },


    containerTemplate
});
