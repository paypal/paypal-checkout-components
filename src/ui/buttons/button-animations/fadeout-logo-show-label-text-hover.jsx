/* @flow */
/** @jsx node */
import { node, Fragment } from 'jsx-pragmatic/src';
import { LOGO_CLASS } from '@paypal/sdk-logos/src';

import { animationConfig, AnimationComponent, getAnimationProps } from './fadeout-logo-show-label-text';
import type { ButtonAnimationOutputParams } from './types';

export const ANIMATION_CLASSES = {
    LABEL_CONTAINER: ('hover-slide-logo-animation-container' : 'hover-slide-logo-animation-container'),
    CONTAINER:       ('hover-slide-logo-animation' : 'hover-slide-logo-animation')
};

const createAnimation = function (animationProps, cssClasses) : void | null {
    const { ANIMATION_LABEL_CONTAINER, ANIMATION_CONTAINER, DOM_READY } = cssClasses;
    const { paypalLabelContainerElement } = animationProps;
    const animations = `
        .${ DOM_READY } .${ ANIMATION_CONTAINER } img.${ LOGO_CLASS.LOGO } {
            animation-name: reverse-logo;
            animation-duration: 2s;
            animation-play-state: revert;
        }
        
        .${ DOM_READY } .${ ANIMATION_CONTAINER }:hover img.${ LOGO_CLASS.LOGO } {
            animation-name: move-logo-to-left-side;
            animation-duration: 2s;
            animation-fill-mode: forwards;
            animation-play-state: running;
        }

        .${ ANIMATION_CONTAINER } .${ ANIMATION_LABEL_CONTAINER }  {
            position: fixed;
            width:  100%;
            text-align: center;
            opacity: 0;
            top: 0
        }

        .${ ANIMATION_CONTAINER }:hover .${ ANIMATION_LABEL_CONTAINER }  {
            animation: show-text 3s ease-in forwards;
        }
        
        @keyframes reverse-logo {
            from {
              opacity:   0;
              transform: translateX(-50%);
            }
            to{
               opacity: 1;
               background-color:initial;
               transform: translateX(0%)
            }
        }
        
         @keyframes move-logo-to-left-side {
            38%,100%{
              opacity:0;
              transform: translateX(-50%);
            }
        }
        
         @keyframes show-text {
            0%,10%{
                opacity: 0;
            }
            
            40%,80%,100%{
              opacity: 1;
            }
    `;

    if (paypalLabelContainerElement) {
        const style = document.createElement('style');
        paypalLabelContainerElement.appendChild(style);
        style.appendChild(document.createTextNode(animations));
    }
};

export function setupFadeOutLogoAndShowLabelOnHoverAnimation(animationLabelText : string) : ButtonAnimationOutputParams {
    const animationProps = { animationLabelText, cssClasses: ANIMATION_CLASSES  };
    const animationConfiguraton = animationConfig(ANIMATION_CLASSES);
    const buttonAnimationScript = `
        const animationProps = ${ getAnimationProps.toString() }( document, ${ JSON.stringify(animationConfiguraton) });
        if (animationProps && animationProps.paypalLabelContainerElement && animationProps.paypalLogoStartingLeftPosition) {
            const animation = ${ createAnimation.toString() }
            animation(animationProps, ${ JSON.stringify(animationConfiguraton.cssClasses) })
        }
    `;
    return {
        buttonAnimationContainerClass: ANIMATION_CLASSES.CONTAINER,
        buttonAnimationScript,
        buttonAnimationComponent:      (<AnimationComponent { ...animationProps } />)
    };
}
