/* @flow */
/** @jsx node */
import { LOGO_CLASS } from '@paypal/sdk-logos/src';

import { CLASS } from '../../../constants';
import { BUTTON_SIZE_STYLE } from '../config';

export const DESIGN_SMALL_BUTTON_CONFIG = {
    runOnce:                        false,
    min:                            BUTTON_SIZE_STYLE.tiny.minWidth,
    smallMax:                       BUTTON_SIZE_STYLE.small.maxWidth,
    mediumMax:                      BUTTON_SIZE_STYLE.medium.maxWidth,
    cssClasses: {
        DOM_READY:                  CLASS.DOM_READY,
        ANIMATION_CONTAINER:        'personalized-design-container',
        PAYPAL_LOGO:                LOGO_CLASS.LOGO,
        ANIMATION_LABEL_CONTAINER: 'personalized-label-container',
        PAYPAL_BUTTON_LABEL:        CLASS.BUTTON_LABEL
    }
};
