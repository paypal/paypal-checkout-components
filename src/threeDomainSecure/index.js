/* @flow */
/** @jsx jsxDom */
/* eslint max-lines: 0 */

import { create } from 'zoid/src';
import { base64encode } from 'belter/src';

import { getBrowserLocale, getCurrentScriptUrl } from '../lib';
import { config } from '../config';
import { containerTemplate } from '../billing/template';

export const ThreeDomainSecure = create({
    tag:  'paypal-3ds',
    name: '3ds',

    buildUrl(props) : string {
        const env = props.env || config.env;
        return `${ config.inlinedCardFieldUrls[env] }/init3ds`;
    },

    get domain() : Object {
        return {
            ...config.paypalDomains
        };
    },

    scrolling: true,

    props: {
        sdkMeta: {
            type:         'string',
            queryParam:   true,
            sendToChild:  false,
            def:         () => {
                return base64encode(JSON.stringify({
                    url: getCurrentScriptUrl()
                }));
            }
        },
        locale: {
            type:           'string',
            required:       false,
            queryParam:     'locale.x',
            allowDelegate:  true,

            def() : string {
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
        onError: {
            type:       'function',
            required:   false
        },
        onCancel: {
            type:           'function',
            required:       true,
            allowDelegate:  true
        }
    },


    containerTemplate
});
