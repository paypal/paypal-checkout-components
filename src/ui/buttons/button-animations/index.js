/* @flow */

import { type Personalization } from '../props';

import { setupDivideLogoAnimation } from './divide-logo-animation';
import {  setupResizeButtonAnimation } from './resize-button-animation';
import  { type ButtonAnimationOutputParams, type ButtonAnimationEmptyOutput } from './types';

export function getButtonAnimation(personalization : ?Personalization) : ButtonAnimationOutputParams | ButtonAnimationEmptyOutput {
    const buttonAnimation = (personalization && personalization.buttonAnimation) || null;
    const animationId = (buttonAnimation && buttonAnimation.id) || '';
    const animationLabelText = (buttonAnimation && buttonAnimation.text) || 'Pay now or pay later';
    let configuration = {
        animationContainerClass: null,
        animationScript:         null,
        animationComponent:      null
    };

    if (animationId && animationId === 'run-divide-logo-animation') {
        configuration =  setupDivideLogoAnimation(animationLabelText);
    }
   
    if (animationId && animationId === 'run-resize-button-animation') {
        configuration =  setupResizeButtonAnimation(animationLabelText);
    }

    return configuration;
}
