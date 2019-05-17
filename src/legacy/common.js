/* @flow */

import { prefix } from 'beaver-logger/client';

import { COUNTRY, LANG, LOCALE } from '../constants';
import type { LocaleType } from '../types';

import { LOG_PREFIX } from './constants';

const { warn } = prefix(LOG_PREFIX);

const DEFAULT_COUNTRY = COUNTRY.US;
const DEFAULT_LANG = LANG.EN;

export function normalizeLocale(locale : string) : LocaleType {

    let [ lang, country ] = locale.split('_');

    if (!country) {
        if (LOCALE[lang]) {
            country = lang;
            lang = null;
        } else {
            country = DEFAULT_COUNTRY;
        }
    }

    if (!LOCALE[country]) {
        warn(`invalid_user_country`, { country });
        country = DEFAULT_COUNTRY;
    }

    if (!lang) {
        lang = DEFAULT_LANG;
    }

    if (LOCALE[country].indexOf(lang) === -1) {
        warn(`invalid_user_lang`, { lang });

        if (LOCALE[country].indexOf(DEFAULT_LANG) !== -1) {
            lang = DEFAULT_LANG;
        } else {
            lang = LOCALE[country][0];
        }
    }

    return { country, lang };
}
