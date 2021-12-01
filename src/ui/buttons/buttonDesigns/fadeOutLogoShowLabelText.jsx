/* @flow */
/** @jsx node */
import { LOGO_CLASS } from '@paypal/sdk-logos/src';
import { node, Fragment, type ChildType } from 'jsx-pragmatic/src';

import { CLASS } from '../../../constants';
import { BUTTON_SIZE_STYLE } from '../config';

import type {  ContentOptions } from './types';

type AnimationProps = {|
    paypalLabelContainerElement : Object,
    paypalLogoStartingLeftPosition : string
|};


export const FADEOUT_LOGO_SHOW_LABEL_TEXT_CONFIG = {
    tiny:       { min: BUTTON_SIZE_STYLE.tiny.minWidth },
    medium:     { max: BUTTON_SIZE_STYLE.medium.maxWidth },
    cssClasses: {
        DOM_READY:                  CLASS.DOM_READY,
        ANIMATION_CONTAINER:        'personalized-design-container',
        PAYPAL_LOGO:                LOGO_CLASS.LOGO,
        ANIMATION_LABEL_CONTAINER:  'personalized-label-container',
        PAYPAL_BUTTON_LABEL:        CLASS.BUTTON_LABEL
    }
};

export function FadeoutLogoShowLabelTextComponent({ designLabelText } : ContentOptions) : ChildType {
    const CONTAINER_CLASS = FADEOUT_LOGO_SHOW_LABEL_TEXT_CONFIG.cssClasses.ANIMATION_CONTAINER;
    const LABEL_CLASS = FADEOUT_LOGO_SHOW_LABEL_TEXT_CONFIG.cssClasses.ANIMATION_LABEL_CONTAINER;
   
    return (
        <Fragment>
            <div class={ LABEL_CLASS } data-design-experiment='104530'> <span>{designLabelText}</span></div>
            <style innerHTML={ `
                .${ CLASS.DOM_READY } .${ CONTAINER_CLASS } img.${ LOGO_CLASS.LOGO }{
                    position: relative;
                }
                
                .${ CONTAINER_CLASS } .${ LABEL_CLASS } {
                    position: fixed;
                    opacity: 0; 
                    color: #142C8E;
                    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                    font-size: 10px;
                }
            ` } />;
        </Fragment>
    );
}

// Returns label container if the button sizes match
export const getFadeoutLogoShowLabelTextProps = function(document : Object, configuration : Object) : AnimationProps | null {
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
    const paypalLogoStartingLeftPosition = paypalLogoElement
        ? `${ (paypalLogoElement.offsetLeft / paypalLabelContainerElement.offsetWidth) * 100 }`
        : '44.5';

    return {
        paypalLabelContainerElement,
        paypalLogoStartingLeftPosition
    };
};

export function getFadeoutLogoShowLabelTextAnimation (designProps : AnimationProps, configuration : Object) : void | null {
    const { ANIMATION_LABEL_CONTAINER, ANIMATION_CONTAINER, DOM_READY, PAYPAL_LOGO } = configuration.cssClasses;
    const { paypalLabelContainerElement, paypalLogoStartingLeftPosition } = designProps;
    const animations = `
        .${ DOM_READY } .${ ANIMATION_CONTAINER } img.${ PAYPAL_LOGO }{
            animation: 4s move-logo-to-left-side 1s infinite alternate;
            position:fixed;
            left: ${ paypalLogoStartingLeftPosition }%;
        }
        
        .${ ANIMATION_CONTAINER } .${ ANIMATION_LABEL_CONTAINER } {
            animation: 4s divide-logo-animation-right-side 1s infinite alternate;
            text-align: center;
            width: 100%;
        }

        @keyframes move-logo-to-left-side {
            0%,33%,66% {
                left: ${ paypalLogoStartingLeftPosition }%;
                opacity: 1;
            }
            90%,100% {
                left: 0%;
                opacity:0;
            }
        }
        
        @keyframes divide-logo-animation-right-side {
            0%,33%,66%{
                opacity: 0;
            }
            90%, 100% {
                opacity: 1;                    
            }
        }
    `;

    if (paypalLabelContainerElement) {
        const style = document.createElement('style');
        paypalLabelContainerElement.appendChild(style);
        style.appendChild(document.createTextNode(animations));
    }
}
