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
    const animationLabelText = buttonAnimation.labelText || '';

    if (animationId && animationId === '1') {
        return setupAnimation(animationLabelText);
    }
    return {};
}
