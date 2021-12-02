/* @flow */
/** @jsx node */
import { LOGO_CLASS } from '@paypal/sdk-logos/src';

type AnimationProps = {|
    paypalLabelContainerElement : Object,
    paypalLogoStartingLeftPosition : string,
|};

// Returns label container if the button sizes match
export const getHoverSlideLogoProps = function(document, configuration) : AnimationProps | null {
    const { ANIMATION_CONTAINER, ANIMATION_LABEL_CONTAINER, PAYPAL_BUTTON_LABEL, PAYPAL_LOGO } = configuration.cssClasses;
    const { min, max } = configuration;
    // get the animation main container to force specificity( in css ) and make sure we are running the right animation
    const animationContainer = (document && document.querySelector(`.${ ANIMATION_CONTAINER }`)) || null;
    if (!animationContainer) {
        return null;
    }

    // return null if animation should not be played for the button size
    const animationContainerWidth = animationContainer.offsetWidth;
    if (animationContainerWidth < min || animationContainerWidth > max) {
        // remove label element from dom
        animationContainer.querySelector(`.${ ANIMATION_LABEL_CONTAINER }`).remove();
        return null;
    }

    // get the label container that animation will be applied to
    const paypalLabelContainerElement = animationContainer.querySelector(`.${ PAYPAL_BUTTON_LABEL }`) || null;
    // get starting position for element so it doesn't jump when animation begins
    const paypalLogoElement = (paypalLabelContainerElement && paypalLabelContainerElement.querySelector(`.${ PAYPAL_LOGO }`)) || null;

    let paypalLogoStartingLeftPosition = 0;
    if (paypalLogoElement && paypalLabelContainerElement) {
        paypalLogoStartingLeftPosition = `${ (paypalLogoElement.offsetLeft / paypalLabelContainerElement.offsetWidth) * 100 }`;
    } else {
        return null;
    }

    // active reverse logo animation on mouser out
    animationContainer.addEventListener('mouseleave', () => {
        paypalLogoElement.style.animationName = 'reverse-logo';
        paypalLogoElement.style.animationDuration = '1s';
        paypalLogoElement.style.animationPlayState = 'running';
    }, false);

    // active animation from center to left on mouse enter
    animationContainer.addEventListener('mouseenter', () => {
        paypalLogoElement.style.animationName = 'move-logo-to-left-side';
        paypalLogoElement.style.animationPlayState = 'running';
    }, false);
    

    return {
        paypalLabelContainerElement,
        paypalLogoStartingLeftPosition
    };
};

export const getHoverSlideLogoAnimation = function (animationProps, configuration) : void | null {
    const { ANIMATION_LABEL_CONTAINER, ANIMATION_CONTAINER, DOM_READY } = configuration.cssClasses;
    const { paypalLabelContainerElement } = animationProps;
    const animations = `
        .${ DOM_READY } .${ ANIMATION_CONTAINER }:hover img.${ LOGO_CLASS.LOGO } {
            animation-name: move-logo-to-left-side;
            animation-duration: 1s;
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
            animation: show-text 1s ease-in forwards;
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

