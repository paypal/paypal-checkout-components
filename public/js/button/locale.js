
let { config, Promise } = window.paypal;
import { getLocale } from './api';

export function determineLocale() {

    return Promise.try(() => {

        let userLocale = window.xprops.locale;

        if (userLocale) {
            let [ lang, country ] = userLocale.split('_');

            if (!config.locales[country]) {
                throw new Error(`Invalid country: ${country} for locale ${userLocale}`);
            }

            if (config.locales[country].indexOf(lang) === -1) {
                throw new Error(`Invalid language: ${lang} for locale ${userLocale}`);
            }

            return { lang, country };
        }

        return getLocale();
    });
}
