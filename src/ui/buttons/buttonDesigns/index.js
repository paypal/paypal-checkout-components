/* @flow */
import { type Personalization } from '../props';

import { getDivideLogoAnimationScript } from './divideLogoAnimation';
import { getInlineLabelTextScript } from './inlineLogoTextDesign';
import { ButtonDesignComponent } from './buttonDesignComponent';
import { type ButtonDesignOutputParams } from './types';


export function getButtonDesign(p : ?Personalization) : ButtonDesignOutputParams | Object {

    const personalization = {
        buttonAnimation: {
            id:       'run-divide-logo-animation',
            text:     'Safe and easy way to pay',
            tracking: {
                click:      '',
                impression: ''
            }
        }
    };

    // check valid personalization
    if (
        __WEB__
        || !personalization
        || typeof personalization !== 'object'
        || !personalization.buttonAnimation
    )  {
        return {};
    }

    const {
        buttonAnimation: {
            id: designId = '',
            text: designLabelText = 'Safe and easy way to pay'
        } = {}
    } = personalization;

    let buttonDesignScript;

    if (designId === 'run-divide-logo-animation') {
        buttonDesignScript = getDivideLogoAnimationScript();
    }

    if (designId === 'run-add-label-text-next-to-logo-animation') {
        buttonDesignScript = getInlineLabelTextScript();
    }


    if (buttonDesignScript) {
        const designProps = { designLabelText };
        return {
            buttonDesignContainerClass: 'personalized-design-container',
            buttonDesignScript:         buttonDesignScript,
            buttonDesignComponent:      ButtonDesignComponent(designProps)
        }
    }

    return {};
}
