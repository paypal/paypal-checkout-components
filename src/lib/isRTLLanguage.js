/* @flow */
import { LANG } from '@paypal/sdk-constants/src';

export const isRTLLanguage = (languageCode : string) : boolean => {
    const lang = languageCode.toLowerCase();
    return lang === LANG.HE || lang === LANG.AR;
};
