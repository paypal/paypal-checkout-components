/* @flow */
/** @jsx node */
import { LOGO_CLASS, PPLogo } from '@paypal/sdk-logos/src';
import { node, type ChildType } from 'jsx-pragmatic/src';

import { CLASS } from '../../../constants';
import { BUTTON_SIZE_STYLE } from '../config';

import type { ContentOptions } from './types';

export const SWITCH_LOGO_AND_SHOW_LABEL_CONFIG = {
    min:                            BUTTON_SIZE_STYLE.tiny.minWidth,
    smallMax:                       BUTTON_SIZE_STYLE.small.maxWidth,
    mediumMax:                      BUTTON_SIZE_STYLE.medium.maxWidth,
    cssClasses: {
        DOM_READY:                  CLASS.DOM_READY,
        ANIMATION_CONTAINER:        'personalized-design-container',
        PAYPAL_LOGO:                LOGO_CLASS.LOGO,
        ANIMATION_LABEL_CONTAINER: 'personalized-label-container',
        PAYPAL_BUTTON_LABEL:        CLASS.BUTTON_LABEL
    }
};

type AnimationProps = {|
    paypalLabelContainerElement : Object,
    labelFontSize : number
|};

export function SwitchLogoAndShowLabelTextComponent({ designLabelText, logoColor } : ContentOptions) : ChildType {
    // experimentName must match elmo experiment name
    const ANIMATION_CONTAINER = SWITCH_LOGO_AND_SHOW_LABEL_CONFIG.cssClasses.ANIMATION_CONTAINER;
    const ANIMATION_LABEL = SWITCH_LOGO_AND_SHOW_LABEL_CONFIG.cssClasses.ANIMATION_LABEL_CONTAINER;
    return (
        <div class={ ANIMATION_LABEL } data-design-experiment='104519'>
            <PPLogo logoColor={ logoColor } />
            <span>{designLabelText}</span>
            <style innerHTML={ `
                .${ CLASS.DOM_READY } .${ ANIMATION_CONTAINER } img.${ LOGO_CLASS.LOGO }-pp{
                    position: relative;
                    opacity:0;
                }
                .${ ANIMATION_CONTAINER } .${ ANIMATION_LABEL } {
                    opacity: 0; 
                    color: #142C8E;
                    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                }
            ` } />
        </div>
    );
}

// Returns label container if the button sizes match
export const getSwitchLogoAndShowLabelProps = function(document : Object, configuration : Object) : AnimationProps | null {
    let labelFontSize = 8;
    const { ANIMATION_CONTAINER, ANIMATION_LABEL_CONTAINER, PAYPAL_BUTTON_LABEL } = configuration.cssClasses;
    const { min, smallMax, mediumMax } = configuration;
    // get the animation main container to force specificity( in css ) and make sure we are running the right animation
    const animationContainer = (document && document.querySelector(`.${ ANIMATION_CONTAINER }`)) || null;
    if (!animationContainer) {
        return null;
    }

    // return null if animation should not be played for the button size
    const animationContainerWidth = animationContainer.offsetWidth;
    
    if (animationContainerWidth < min || animationContainerWidth >= mediumMax) {
        // remove label element from dom
        animationContainer.querySelector(`.${ ANIMATION_LABEL_CONTAINER }`).remove();
        return null;
    }

    if (animationContainerWidth >= smallMax) {
        labelFontSize = 11;
    }

    // get the label container that animation will be applied to
    const paypalLabelContainerElement = animationContainer.querySelector(`.${ PAYPAL_BUTTON_LABEL }`) || null;
    return {
        labelFontSize,
        paypalLabelContainerElement
    };
};

export const getSwitchLogoAndShowLabelAnimation = function (designProps : AnimationProps , configuration : Object) : void | null {
    const { ANIMATION_LABEL_CONTAINER, ANIMATION_CONTAINER, DOM_READY, PAYPAL_LOGO } = configuration.cssClasses;
    const { paypalLabelContainerElement, labelFontSize } = designProps ;
    const animations = `
        .${ DOM_READY } .${ ANIMATION_CONTAINER } img.${ PAYPAL_LOGO }-paypal{
            animation: 4s move-logo-to-left-side 0.5s infinite alternate;
            position:fixed;
            transform:translateX(-50%);
        }

        .${ ANIMATION_CONTAINER } .${ ANIMATION_LABEL_CONTAINER } {
            position: fixed;
            animation: 4s divide-logo-animation-right-side 0.5s infinite alternate;
            text-align: center;
            width: 100%;
            font-size: ${ labelFontSize }px;
            padding-top: 1px;
        }

        .${ DOM_READY } .${ ANIMATION_CONTAINER } img.${ LOGO_CLASS.LOGO }-pp{
            animation: 4s move-small-paypal 0.5s infinite alternate;
            padding-right: 6px;
        }

        @keyframes move-logo-to-left-side {
            0%,33% {
                transform: translateX(-50%);
                opacity:1;
            }
            50%,100% {
                position:fixed;
                transform: translateX(-94%);
                opacity:0;
            }
        }
        
        @keyframes move-small-paypal {
            0%,33%{
                opacity:0;
            }
            51%,100% {
                opacity:1;
            }
        }
        
        @keyframes divide-logo-animation-right-side {
            0%,33%{
                opacity: 0;
            }
            51%, 100% {
                opacity: 1;                    
            }
        }
    `;

    if (paypalLabelContainerElement) {
        const style = document.createElement('style');
        paypalLabelContainerElement.appendChild(style);
        style.appendChild(document.createTextNode(animations));
    }
};