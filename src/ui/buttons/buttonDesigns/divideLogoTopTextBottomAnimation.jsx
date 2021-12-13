/* @flow */
/** @jsx node */
import { LOGO_CLASS } from '@paypal/sdk-logos/src';
import { node, Fragment, type ChildType } from 'jsx-pragmatic/src';

import { CLASS } from '../../../constants';
import { BUTTON_SIZE_STYLE } from '../config';

import type {  ContentOptions } from './types';

type AnimationProps = {|
    paypalButtonContainerElement : Object,
    animationConfig : Object,
    designContainer : Object
|};

export const LOGO_TOP_TEXT_BOTTOM_CONFIG = {
    runOnce:                        false,
    min:                            BUTTON_SIZE_STYLE.small.minWidth,
    smallMax:                       BUTTON_SIZE_STYLE.small.maxWidth,
    max:                            BUTTON_SIZE_STYLE.medium.maxWidth,
    cssClasses: {
        DOM_READY:                  CLASS.DOM_READY,
        ANIMATION_CONTAINER:        'personalized-design-container',
        PAYPAL_LOGO:                LOGO_CLASS.LOGO,
        ANIMATION_LABEL_CONTAINER:  'personalized-label-container',
        PAYPAL_BUTTON:              CLASS.BUTTON
    }
};

export function LogoTopTextBottomComponent({ designLabelText } : ContentOptions) : ChildType {
    const CONTAINER_CLASS = LOGO_TOP_TEXT_BOTTOM_CONFIG.cssClasses.ANIMATION_CONTAINER;
    const LABEL_CLASS = LOGO_TOP_TEXT_BOTTOM_CONFIG.cssClasses.ANIMATION_LABEL_CONTAINER;

    return (
        <Fragment>
            <div class={ LABEL_CLASS } data-design-experiment='104530'> <span>{designLabelText}</span></div>
            <style innerHTML={ `
                .${ CLASS.DOM_READY } .${ CONTAINER_CLASS } img.${ LOGO_CLASS.LOGO }{
                    position: relative;
                }
                
                .${ CONTAINER_CLASS } .${ LABEL_CLASS } {
                    opacity: 0;
                }
            ` } />;
        </Fragment>
    );
}

// Returns label container if the button sizes match
export const getLogoTopTextBottomProps = function(document : Object, configuration : Object) : AnimationProps | null {
    const { ANIMATION_CONTAINER, ANIMATION_LABEL_CONTAINER, PAYPAL_BUTTON, PAYPAL_LOGO } = configuration.cssClasses;
    const { min, smallMax, max } = configuration;
    let animationConfig = null;

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
    const paypalButtonContainerElement = designContainer.querySelector(`.${ PAYPAL_BUTTON }`) || null;
    // get starting position for element so it doesn't jump when animation begins
    const paypalLogoElement = (paypalButtonContainerElement && paypalButtonContainerElement.querySelector(`.${ PAYPAL_LOGO }`)) || null;

    // get correct configuration according to the button size (small or medium)
    if (paypalLogoElement && paypalButtonContainerElement) {
        animationConfig = animationContainerWidth < smallMax ? 
            { paypalLogoTopPosition: 25, labelTextFontSize: 7 } : { paypalLogoTopPosition: 30, labelTextFontSize: 9 };
    } else {
        return null;
    }
   
    return {
        designContainer,
        paypalButtonContainerElement,
        animationConfig
    };
};

export function getLogoTopTextBottomAnimation (designProps : AnimationProps, configuration : Object) : void | null {
    const { ANIMATION_LABEL_CONTAINER, ANIMATION_CONTAINER, DOM_READY, PAYPAL_LOGO } = configuration.cssClasses;
    const { min, max, runOnce } = configuration;
    const { designContainer, paypalButtonContainerElement, animationConfig } = designProps;
    const timesToRunAnimation = runOnce ? '2' : 'infinite';

    const animations = `
        .${ DOM_READY } .${ ANIMATION_CONTAINER } img.${ PAYPAL_LOGO } {
            animation: 3s move-logo-to-top-side 0.5s ${ timesToRunAnimation } alternate;
        }
        .${ ANIMATION_CONTAINER } .${ ANIMATION_LABEL_CONTAINER } span {
            display: flex;
            justify-content: center;
            align-items: end;
        }
        .${ ANIMATION_CONTAINER } .${ ANIMATION_LABEL_CONTAINER } {
            animation: 3s text-animation-bottom-side 0.5s ${ timesToRunAnimation } alternate;
            text-align: center;
            width: 100%;
            color: #142C8E;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            position: absolute;
            top: 25%;
        }
        @keyframes reverse-logo {
            0%,33%{
                top: -${ animationConfig.paypalLogoTopPosition }%;
            }
            66%,100%{
                top: 0%;
            }
        }
        @keyframes move-logo-to-top-side {
            0%,33% {
                top: 0%;
            }
            66%,100% {
                top: -${ animationConfig.paypalLogoTopPosition }%;
            }
        }
        @keyframes text-animation-bottom-side {
            0%,33% {
                font-size: 0px;
                opacity: 0;
            }
            66%,100% {
                font-size: ${ animationConfig.labelTextFontSize }px;                   
                opacity: 1;
            }
        }
    `;

    if (paypalButtonContainerElement) {
        const style = document.createElement('style');
        paypalButtonContainerElement.appendChild(style);
        style.appendChild(document.createTextNode(animations));
        window.addEventListener('resize', () => {
            // Remove animation if size limit broken
            if (
                (designContainer.offsetWidth > max || designContainer.offsetWidth < min)
                && paypalButtonContainerElement.contains(style)
            ) {
                paypalButtonContainerElement.removeChild(style);
            } else {
                // enable animation again if size is between the expected range
                if ((designContainer.offsetWidth < max && designContainer.offsetWidth > min)
                    && !paypalButtonContainerElement.contains(style)) {
                    paypalButtonContainerElement.appendChild(style);
                }
            }
        });
    }
}