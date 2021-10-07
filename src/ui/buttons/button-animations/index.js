/* @flow */

import { setupDivideLogoAnimation } from './divide-logo-animation';

type ButtonAnimationConfig ={|
    id : string,
    text : string
|};

type ButtonAnimationFlag = {|
    buttonAnimation : ButtonAnimationConfig
|};

export function getButtonAnimation({ buttonAnimation } : ButtonAnimationFlag) : void {
    const animationId = buttonAnimation.id || '';

    if (animationId && animationId === '1') {
        const animationLabelText = buttonAnimation.text || 'Pay now or pay later';
        return setupDivideLogoAnimation(animationLabelText);
    }
    return {};
}
