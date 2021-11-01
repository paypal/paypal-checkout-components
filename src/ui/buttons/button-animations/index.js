/* @flow */

import { type Personalization } from '../props';

import { setupDivideLogoAnimation } from './divide-logo-animation';
import { setupLabelTextNextToLogoAnimation } from './label-text-next-to-logo-animation';
import { type ButtonAnimationOutputParams } from './types';


export function getButtonAnimation(personalization : ?Personalization) : ButtonAnimationOutputParams | Object {
    // Only show animations for SSR
    if (__WEB__ || !personalization) {
        return {};
    }

    const {
        buttonAnimation: {
            id: animationId = '',
            text: animationLabelText = 'Safe and easy way to pay'
        } = {}
    } = personalization;

    if (animationId === 'run-divide-logo-animation') {
        return setupDivideLogoAnimation(animationLabelText);
    }

    if (animationId === 'run-add-label-text-next-to-logo-animation') {
        return setupLabelTextNextToLogoAnimation(animationLabelText);
    }

    return {};
}
