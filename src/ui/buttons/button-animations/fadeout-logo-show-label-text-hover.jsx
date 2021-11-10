/* @flow */
/** @jsx node */
import { node, Fragment } from 'jsx-pragmatic/src';
import { LOGO_CLASS } from '@paypal/sdk-logos/src';

import { animationConfig, AnimationComponent } from './fadeout-logo-show-label-text';
import type { ButtonAnimationOutputParams } from './types';

export const ANIMATION_CLASSES = {
    LABEL_CONTAINER: ('hover-slide-logo-animation-container' : 'hover-slide-logo-animation-container'),
    CONTAINER:       ('hover-slide-logo-animation' : 'hover-slide-logo-animation')
};

// Returns label container if the button sizes match
export const getAnimationProps = function(document, configuration) : DivideLogoAnimationProps | null {
    const { ANIMATION_CONTAINER, ANIMATION_LABEL_CONTAINER, PAYPAL_BUTTON_LABEL, PAYPAL_LOGO } = configuration.cssClasses;
    const { tiny, medium } = configuration;
    // get the animation main container to force specificity( in css ) and make sure we are running the right animation
    const animationContainer = (document && document.querySelector(`.${ ANIMATION_CONTAINER }`)) || null;
    if (!animationContainer) {
        return null;
    }

    // return null if animation should not be played for the button size
    const animationContainerWidth = animationContainer.offsetWidth;
    if (animationContainerWidth < tiny.min || animationContainerWidth > medium.max) {
        // remove label element from dom
        animationContainer.querySelector(`.${ ANIMATION_LABEL_CONTAINER }`).remove();
        return null;
    }

    // get the label container that animation will be applied to
    const paypalLabelContainerElement = animationContainer.querySelector(`.${ PAYPAL_BUTTON_LABEL }`) || null;
    // get starting position for element so it doesn't jump when animation begins
    const paypalLogoElement = (paypalLabelContainerElement && paypalLabelContainerElement.querySelector(`.${ PAYPAL_LOGO }`)) || null;
    // active reverse logo animation on mouser out
    animationContainer.addEventListener('mouseleave', () => {
        paypalLogoElement.style.animationName = 'reverse-logo';
        paypalLogoElement.style.animationDuration = '2s';
        paypalLogoElement.style.animationPlayState = 'running';
    }, false);
    // active animation from center to left on mouse enter
    animationContainer.addEventListener('mouseenter', () => {
        paypalLogoElement.style.animationName = 'move-logo-to-left-side';
        paypalLogoElement.style.animationPlayState = 'running';
    }, false);

    const paypalLogoStartingLeftPosition = paypalLogoElement
        ? `${ (paypalLogoElement.offsetLeft / paypalLabelContainerElement.offsetWidth) * 100 }`
        : '44.5';

    return {
        paypalLabelContainerElement,
        paypalLogoStartingLeftPosition
    };
};

const createAnimation = function (animationProps, cssClasses) : void | null {
    const { ANIMATION_LABEL_CONTAINER, ANIMATION_CONTAINER, DOM_READY } = cssClasses;
    const { paypalLabelContainerElement } = animationProps;
    const animations = `
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
            0%{
                opacity:   0;
                transform: translateX(-50%);
            }
            100%{
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
