/* @flow */

import { prefix } from 'beaver-logger/client';

import { config } from '../config';
import { COUNTRY, LANG } from '../constants';
import type { LocaleType } from '../types';

import { LOG_PREFIX } from './constants';

let { warn } = prefix(LOG_PREFIX);

const DEFAULT_COUNTRY = COUNTRY.US;
const DEFAULT_LANG = LANG.EN;

export function normalizeLocale(locale : string) : LocaleType {

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
        warn(`invalid_user_country`, { country });
        country = DEFAULT_COUNTRY;
    }

    if (!lang) {
        lang = DEFAULT_LANG;
    }

    if (config.locales[country].indexOf(lang) === -1) {
        warn(`invalid_user_lang`, { lang });

        if (config.locales[country].indexOf(DEFAULT_LANG) !== -1) {
            lang = DEFAULT_LANG;
        } else {
            lang = config.locales[country][0];
        }
    }

    return { country, lang };
}
