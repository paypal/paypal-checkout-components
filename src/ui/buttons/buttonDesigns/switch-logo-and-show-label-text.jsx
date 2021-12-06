/* @flow */
/** @jsx node */
import { LOGO_CLASS, PPLogo } from '@paypal/sdk-logos/src';
import { node, type ChildType } from 'jsx-pragmatic/src';

import { CLASS } from '../../../constants';
import { BUTTON_SIZE_STYLE } from '../config';

import type { ContentOptions } from './types';

export const SWITCH_LOGO_AND_SHOW_LABEL_CONFIG = {
    runOnce:                        false,
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
    const { ANIMATION_CONTAINER, ANIMATION_LABEL_CONTAINER, PAYPAL_BUTTON_LABEL } = configuration.cssClasses;
    const { min, smallMax, mediumMax } = configuration;
    // get the animation main container to force specificity( in css ) and make sure we are running the right animation
    const designContainer = (document && document.querySelector(`.${ ANIMATION_CONTAINER }`)) || null;
    if (!designContainer) {
        return null;
    }

    // return null if animation should not be played for the button size
    const designContainerWidth = designContainer.offsetWidth;
    
    if (designContainerWidth < min || designContainerWidth >= mediumMax) {
        // remove label element from dom
        designContainer.querySelector(`.${ ANIMATION_LABEL_CONTAINER }`).remove();
        return null;
    }
    const labelFontSize = designContainerWidth >= smallMax ? 11 : 8;

    // get the label container that animation will be applied to
    const paypalLabelContainerElement = designContainer.querySelector(`.${ PAYPAL_BUTTON_LABEL }`) || null;
    return {
        designContainer,
        labelFontSize,
        paypalLabelContainerElement
    };
};

export const getSwitchLogoAndShowLabelAnimation = function (designProps : AnimationProps, configuration : Object) : void | null {
    const { runOnce, mediumMax, min } = configuration;
    const { ANIMATION_LABEL_CONTAINER, ANIMATION_CONTAINER, DOM_READY, PAYPAL_LOGO } = configuration.cssClasses;
    const { designContainer, paypalLabelContainerElement, labelFontSize } = designProps;
    const timesToRunAnimation = runOnce ? '2' : 'infinite';

    const animations = `
        .${ DOM_READY } .${ ANIMATION_CONTAINER } img.${ PAYPAL_LOGO }-paypal{
            animation: 4s move-logo-to-left-side 0.5s ${ timesToRunAnimation } alternate;
            position:fixed;
            transform:translateX(-50%);
        }

        .${ ANIMATION_CONTAINER } .${ ANIMATION_LABEL_CONTAINER } {
            position: fixed;
            animation: 4s divide-logo-animation-right-side 0.5s ${ timesToRunAnimation } alternate;
            text-align: center;
            width: 100%;
            font-size: ${ labelFontSize }px;
        }

        .${ ANIMATION_CONTAINER } .${ ANIMATION_LABEL_CONTAINER } span {
            padding-top: 1px;
        }

        .${ DOM_READY } .${ ANIMATION_CONTAINER } img.${ LOGO_CLASS.LOGO }-pp{
            animation: 4s move-small-paypal 0.5s ${ timesToRunAnimation } alternate;
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
        window.addEventListener('resize', () => {
            // Remove animation if size limit broken
            if (
                (designContainer.offsetWidth > mediumMax || designContainer.offsetWidth < min)
                && paypalLabelContainerElement.contains(style)
            ) {
                paypalLabelContainerElement.removeChild(style);
            } else {
                // enable animation again if size is between the expected range
                if ((designContainer.offsetWidth < mediumMax && designContainer.offsetWidth > min)
                    && !paypalLabelContainerElement.contains(style)) {
                    paypalLabelContainerElement.appendChild(style);
                }
            }
        });
    }
};
