/* @flow */

import * as logger from 'beaver-logger/client';

import { config } from '../config';
import { LOG_PREFIX } from './constants';

let $logger = logger.prefix(LOG_PREFIX);

const DEFAULT_COUNTRY = 'US';
const DEFAULT_LANG = 'en';

export function normalizeLocale(locale : string) : { country : string, lang : string } {

    let [ lang, country ] = locale.split('_');

    if (!country) {
        if (config.locales[lang]) {
            country = lang;
            lang = null;
        } else {
            country = DEFAULT_COUNTRY;
        }
    }

    if (!config.locales[country]) {
        $logger.warn(`invalid_user_country`, { country });
        country = DEFAULT_COUNTRY;
    }

    if (!lang) {
        lang = DEFAULT_LANG;
    }

    if (config.locales[country].indexOf(lang) === -1) {
        $logger.warn(`invalid_user_lang`, { lang });

        if (config.locales[country].indexOf(DEFAULT_LANG) !== -1) {
            lang = DEFAULT_LANG;
        } else {
            lang = config.locales[country][0];
        }
    }

    return { country, lang };
}
