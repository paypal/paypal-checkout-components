/* @flow */

import { type Personalization } from '../props';

import { setupDivideLogoAnimation } from './divide-logo-animation';
import { setupLabelNextToLogoAnimation } from './labelNextToLogoAnimation';
import type { ButtonAnimationOutputParams, ButtonAnimationEmptyOutput } from './types';


export function getButtonAnimation(personalization : ?Personalization) : ButtonAnimationOutputParams | ButtonAnimationEmptyOutput {
    const buttonAnimation = (personalization && personalization.buttonAnimation) || null;
    const animationId = (buttonAnimation && buttonAnimation.id) || '';
    let configuration = {
        animationContainerClass: null,
        animationScript:         null,
        animationComponent:      null
    };

    if (animationId && animationId === '1') {
        const animationLabelText = (buttonAnimation && buttonAnimation.text) || 'Pay now or pay later';
        configuration =  setupDivideLogoAnimation(animationLabelText);
    }
    
    if (animationId && animationId === '3') {
        const animationLabelText = (buttonAnimation && buttonAnimation.text) || 'The secure, easy way to pay';
        configuration =  setupLabelNextToLogoAnimation(animationLabelText);
    }

    return configuration;
}
