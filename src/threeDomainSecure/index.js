/* @flow */
/* @jsx jsxDom */
/* eslint max-lines: 0 */

import { create } from 'zoid/src';

import { ENV } from '../constants';
import { getBrowserLocale, getCurrentScriptUrl } from '../lib';
import { config } from '../config';

import { containerTemplate } from './template';

export const ThreeDomainSecure = create({
    tag:  'paypal-3ds',
    name: '3ds',

    buildUrl(props) : string {
        const env = props.env || config.env;
        return `${ config.inlinedCardFieldUrls[env] }/init3ds`;
    },

    get domain() : Object {
        return {
            ...config.paypalDomains,
            [ ENV.LOCAL ]: /^http:\/\/localhost.paypal.com:\d+$/
        };
    },

    scrolling: true,

    props: {
        sdkMeta: {
            type:         'string',
            queryParam:   true,
            sendToChild:  false,
            def:         () => {
                return btoa(JSON.stringify({
                    url: getCurrentScriptUrl()
                }));
            }
        },
        locale: {
            type:           'string',
            allowDelegate:  true,
            def:            () => {
                const { lang, country } = getBrowserLocale();
                return `${ lang }_${ country }`;
            }
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
        challengeUrl: {
            type: 'string'
        },
        threeDomainSecureToken: {
            type: 'string'
        },
        method: {
            type: 'string'
        },
        onSuccess: {
            type:       'function',
            required:   false
        },
        onFailure: {
            type:       'function',
            required:   false
        },
        onClose: {
            type:      'function',
            required:  false,
            once:      true,
            promisify: true,
            noop:      true
        },
        onCancel: {
            type:           'function',
            required:       true,
            allowDelegate:  true
        }
    },


    containerTemplate
});
