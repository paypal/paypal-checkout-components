/* @flow */
/** @jsx node */
import { LOGO_CLASS } from '@paypal/sdk-logos/src';

import { BUTTON_SIZE_STYLE } from '../config';
import { CLASS } from '../../../constants';

export const DESIGN_CONFIG = {
    runOnce:                        false,
    min:                            BUTTON_SIZE_STYLE.tiny.minWidth,
    smalMax:                        BUTTON_SIZE_STYLE.small.maxWidth,
    max:                            BUTTON_SIZE_STYLE.medium.maxWidth,
    cssClasses: {
        DOM_READY:                  CLASS.DOM_READY,
        ANIMATION_CONTAINER:        'personalized-design-container',
        PAYPAL_LOGO:                LOGO_CLASS.LOGO,
        ANIMATION_LABEL_CONTAINER:  'personalized-label-container',
        PAYPAL_BUTTON_LABEL:        CLASS.BUTTON_LABEL
    }
};
