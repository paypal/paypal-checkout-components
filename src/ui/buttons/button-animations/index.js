/* @flow */

import { setupAnimation } from "./divide-logo-animation"

type ButtonAnimationConfig ={|
    id : string,
    labelText : string
|};

type ButtonAnimationFlag = {|
    buttonAnimation : ButtonAnimationConfig
|};

export function getButtonAnimation({ buttonAnimation } : ButtonAnimationFlag) : void {
    const animationId = buttonAnimation.id || null;

    if (animationId && animationId === '1') {
        const animationLabelText = buttonAnimation.labelText || 'Pay now or pay later';
        return setupAnimation(animationLabelText);
    }
    return {};
}
