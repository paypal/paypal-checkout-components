/* @flow */

import { type Personalization } from '../props';

import { setupDivideLogoAnimation } from './divide-logo-animation';
import { setupLabelTextNextToLogoAnimation } from './label-text-next-to-logo-animation';
import type { ButtonAnimationOutputParams, ButtonAnimationEmptyOutput } from './types';


export function getButtonAnimation(personalization : ?Personalization) : ButtonAnimationOutputParams | ButtonAnimationEmptyOutput {
    const buttonAnimation = (personalization && personalization.buttonAnimation) || null;
    const animationId = (buttonAnimation && buttonAnimation.id) || '';
    let animationLabelText = (buttonAnimation && buttonAnimation.text) || 'Pay now or pay later';
    let configuration = {
        animationContainerClass: null,
        animationScript:         null,
        animationComponent:      null
    };

    if (animationId && animationId === 'run-divide-logo-animation') {
        configuration =  setupDivideLogoAnimation(animationLabelText);
    }
    
    if (animationId && animationId === 'run-add-label-text-next-to-logo-animation') {
        animationLabelText = animationLabelText || 'The secure, easy way to pay';
        configuration =  setupLabelTextNextToLogoAnimation(animationLabelText);
    }

    return configuration;
}
