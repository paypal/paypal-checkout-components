/* @flow */
/** @jsx node */
import { LOGO_CLASS } from '@paypal/sdk-logos/src';
import { node, Fragment, type ChildType } from 'jsx-pragmatic/src';

import { CLASS } from '../../../constants';
import { BUTTON_SIZE_STYLE } from '../config';

import type {  ContentOptions } from './types';

type AnimationProps = {|
    paypalLabelContainerElement : Object,
    paypalLogoStartingLeftPosition : string,
    designContainer : Object,
    labelTextFontSize : number
|};

export const ALTERNATE_SLIDE_LOGO_CONFIG = {
    runOnce:                        false,
    min:                            BUTTON_SIZE_STYLE.tiny.minWidth,
    smalMax:                        BUTTON_SIZE_STYLE.small.maxWidth,
    max:                            BUTTON_SIZE_STYLE.medium.maxWidth,
    cssClasses: {
        DOM_READY:                  CLASS.DOM_READY,
        ANIMATION_CONTAINER:        'personalized-design-container',
        PAYPAL_LOGO:                LOGO_CLASS.LOGO,
        ANIMATION_LABEL_CONTAINER:  'personalized-label-container',
        PAYPAL_BUTTON_LABEL:        CLASS.BUTTON_LABEL
    }
};

export function AlternateSlideLogoComponent({ designLabelText } : ContentOptions) : ChildType {
    const CONTAINER_CLASS = ALTERNATE_SLIDE_LOGO_CONFIG.cssClasses.ANIMATION_CONTAINER;
    const LABEL_CLASS = ALTERNATE_SLIDE_LOGO_CONFIG.cssClasses.ANIMATION_LABEL_CONTAINER;
   
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
                    
                }
            ` } />;
        </Fragment>
    );
}

// Returns label container if the button sizes match
export const getAlternateSlideLogoProps = function(document : Object, configuration : Object) : AnimationProps | null {
    let paypalLogoStartingLeftPosition = null;
    const { ANIMATION_CONTAINER, ANIMATION_LABEL_CONTAINER, PAYPAL_BUTTON_LABEL, PAYPAL_LOGO } = configuration.cssClasses;
    const { min, max, smalMax, runOnce } = configuration;
    // get the animation main container to force specificity( in css ) and make sure we are running the right animation
    const designContainer = (document && document.querySelector(`.${ ANIMATION_CONTAINER }`)) || null;
    if (!designContainer) {
        return null;
    }

    // return null if animation should not be played for the button size
    const animationContainerWidth = designContainer.offsetWidth;
    if (animationContainerWidth < min || animationContainerWidth > max) {
        // remove label element from dom
        designContainer.querySelector(`.${ ANIMATION_LABEL_CONTAINER }`).remove();
        return null;
    }

    // get the label container that animation will be applied to
    const paypalLabelContainerElement = designContainer.querySelector(`.${ PAYPAL_BUTTON_LABEL }`) || null;
    // get starting position for element so it doesn't jump when animation begins
    const paypalLogoElement = (paypalLabelContainerElement && paypalLabelContainerElement.querySelector(`.${ PAYPAL_LOGO }`)) || null;
    
    if (paypalLogoElement && paypalLabelContainerElement) {
        paypalLogoStartingLeftPosition = `${ (paypalLogoElement.offsetLeft / paypalLabelContainerElement.offsetWidth) * 100 }`;
    } else {
        return null;
    }
    // increase font-size for medium button sizes
    const labelTextFontSize = animationContainerWidth >= smalMax ? 11  : 8;

    if (runOnce) {
        // enable reverse logo animation on mouser out
        designContainer.addEventListener('mouseleave', () => {
            paypalLogoElement.style.animationName = 'reverse-logo';
            paypalLogoElement.style.animationDuration = '1s';
            paypalLogoElement.style.animationPlayState = 'running';
        }, false);
    
        // enable animation from center to left on mouse enter
        designContainer.addEventListener('mouseenter', () => {
            paypalLogoElement.style.animationName = 'move-logo-to-left-side';
            paypalLogoElement.style.animationPlayState = 'running';
        }, false);
    }
   
    return {
        designContainer,
        paypalLabelContainerElement,
        paypalLogoStartingLeftPosition,
        labelTextFontSize
    };
};

export function getAlternateSlideLogoAnimation (designProps : AnimationProps, configuration : Object) : void | null {
    const { ANIMATION_LABEL_CONTAINER, ANIMATION_CONTAINER, DOM_READY, PAYPAL_LOGO } = configuration.cssClasses;
    const { max, min, runOnce } = configuration;
    const { designContainer, paypalLabelContainerElement, paypalLogoStartingLeftPosition, labelTextFontSize } = designProps;

    const playOnHover = runOnce ? ':hover' : '';
    const animationPropertiesOnHover = `
        animation-fill-mode: forwards;
    `;
    const keyFramesOnHover = `
        0%,33%{
            opacity: 0;
        }
    `;
    const keyframesWithoutHover = `
        0%,33%,66%{
            opacity: 0;
        }
    `;
    const animationPropertiesWithoutHover = `
        animation-iteration-count: infinite;
        animation-direction: alternate;
    `;
    
    const animationProperties =  playOnHover ? animationPropertiesOnHover : animationPropertiesWithoutHover;
    const animationKeyFrames = playOnHover ? keyFramesOnHover : keyframesWithoutHover;

    const animations = `
        .${ DOM_READY } .${ ANIMATION_CONTAINER } img.${ PAYPAL_LOGO } {
            position:fixed;
            left: ${ paypalLogoStartingLeftPosition }%;
        }
       
        .${ DOM_READY } .${ ANIMATION_CONTAINER }${ playOnHover } img.${ PAYPAL_LOGO } {
            animation-name: move-logo-to-left-side;
            animation-duration: 2s;
            ${ animationProperties }
        }
        
        .${ ANIMATION_CONTAINER }${ playOnHover } .${ ANIMATION_LABEL_CONTAINER } {
            animation-name: divide-logo-animation-right-side;
            animation-duration: 2s;
            ${ animationProperties }
            text-align: center;
            width: 100%;
            color: #142C8E;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            padding-top: 1px;
            font-size: ${ labelTextFontSize }px;
        }

        @keyframes reverse-logo {
            0%{
                opacity:   0;
                left: 0px;
            }
            100%{
               opacity: 1;
               left: ${ paypalLogoStartingLeftPosition }%;
            }
        }

        @keyframes move-logo-to-left-side {
            0%,33% {
                left: ${ paypalLogoStartingLeftPosition }%;
            }
            90%,100% {
                left: 0%;
                opacity:0;
            }
        }
        
        @keyframes divide-logo-animation-right-side {
            ${ animationKeyFrames }
            90%, 100% {
                opacity: 1;                    
            }
        }
    `;

    if (paypalLabelContainerElement) {
        const style = document.createElement('style');
        paypalLabelContainerElement.appendChild(style);
        style.appendChild(document.createTextNode(animations));
        window.addEventListener('resize', () => {
            // Remove animation if size limit broken
            if (
                (designContainer.offsetWidth > max || designContainer.offsetWidth < min)
                && paypalLabelContainerElement.contains(style)
            ) {
                paypalLabelContainerElement.removeChild(style);
            } else {
                // enable animation again if size is between the expected range
                if ((designContainer.offsetWidth < max && designContainer.offsetWidth > min)
                    && !paypalLabelContainerElement.contains(style)) {
                    paypalLabelContainerElement.appendChild(style);
                }
            }
        });
    }
}
