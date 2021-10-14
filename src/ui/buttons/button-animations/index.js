/* @flow */

import { type Personalization } from '../props';

import { setupDivideLogoAnimation } from './divide-logo-animation';
import  { type ButtonAnimationOutputParams, type ButtonAnimationEmptyOutput } from './types';


export function getButtonAnimation(personalization : ?Personalization) : ButtonAnimationOutputParams | ButtonAnimationEmptyOutput {
    const buttonAnimation = (personalization && personalization.buttonAnimation) || null;
    const animationId = (buttonAnimation && buttonAnimation.id) || '';

    if (animationId && animationId === 'run-divide-logo-animation') {
        const animationLabelText = (buttonAnimation && buttonAnimation.text) || 'Pay now or pay later';
        const configuration =  setupDivideLogoAnimation(animationLabelText);
        return configuration;
    }
    return {
        animationContainerClass: null,
        animationScript:         null,
        animationComponent:      null
    };
}
