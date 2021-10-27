/* @flow */

import { type Personalization } from '../props';

import { setupDivideLogoAnimation } from './divide-logo-animation';
import { type ButtonAnimationOutputParams } from './types';


export function getButtonAnimation(personalization : ?Personalization) : ButtonAnimationOutputParams | Object {
    if (__WEB__ || !personalization ) {
        return {};
    }

    const {
        buttonAnimation: {
            id: animationId = '',
            text: animationLabelText = 'Safe and easy way to pay'
        } = {}
    } = personalization;

    if (animationId === 'control') {
        return {};
    }

    if (animationId === 'run-divide-logo-animation') {
        return setupDivideLogoAnimation(animationLabelText);
    }

    return {};
}
