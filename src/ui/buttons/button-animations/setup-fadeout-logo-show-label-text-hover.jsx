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
    const { ANIMATION_LABEL_CONTAINER, ANIMATION_CONTAINER, PAYPAL_LOGO } = cssClasses;
    const { paypalLabelContainerElement } = animationProps;
    const animations = `
    .${ ANIMATION_CONTAINER } img.paypal-logo {
        position: fixed;
        transform: translateX(-17px);
        opacity:1;
    }

    .${ ANIMATION_CONTAINER } .${ ANIMATION_LABEL_CONTAINER }  {
        position: fixed;
        transform: translateX(17px);
        opacity:0;
    }

    .${ ANIMATION_CONTAINER }:hover img.paypal-logo {
        animation: move-logo-to-left-side 1s ease-in forwards;
    }

    .${ ANIMATION_CONTAINER }:hover .${ ANIMATION_LABEL_CONTAINER }  {
        animation: show-text 1s ease-in forwards;
    }

     @keyframes move-logo-to-left-side {
        0%,10%{
         opacity:1;
        }

        40%{
         opacity:0;   
         transform: translateX(-34px);
        }
        
        80%,100%{
          opacity:0;
          transform: translateX(-34px);
        }
    }

     @keyframes show-text {
        0%,10%{
         
         opacity:0;
        }

        40%{
       
         opacity:1;   
        }
        
        80%,100%{
        
          opacity:1;
        }
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
