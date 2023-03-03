/* @flow */
import { LANG } from '@paypal/sdk-constants/src';

export const isRTLLanguage = (languageCode : $Values<typeof LANG>) : boolean => {
    return languageCode === LANG.HE || languageCode === LANG.AR;
};
