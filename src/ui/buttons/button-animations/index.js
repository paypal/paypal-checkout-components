/* @flow */

import { setupAnimation } from "./divide-logo-animation"

type ButtonAnimationFlagConfig ={|
    id : string
|};

type ButtonAnimationFlag = {|
    buttonAnimation : ButtonAnimationFlagConfig
|};

export function getButtonAnimation({ buttonAnimation } : ButtonAnimationFlag) : void {
    const animationId = buttonAnimation.id || null;
    if (animationId) {
        return setupAnimation();
    }
    return {};
}
