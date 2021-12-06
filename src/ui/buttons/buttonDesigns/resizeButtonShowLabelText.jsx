/* @flow */
/** @jsx node */
import { PPLogo } from '@paypal/sdk-logos/src';
import { node, Fragment, type ChildType } from 'jsx-pragmatic/src';

import { DESIGN_SMALL_BUTTON_CONFIG } from './constants';
import type { ContentOptions } from './types';

type AnimationProps = {|
    paypalLabelContainerElement : Object,
    labelFontSize : number,
    marginLabelContainer : number,
    buttonHeight : number
|};

export function resizeButtonShowLabelTextComponent({ designLabelText, logoColor } : ContentOptions) : ChildType {
    // experimentName must match elmo experiment name
    const ANIMATION_LABEL = DESIGN_SMALL_BUTTON_CONFIG.cssClasses.ANIMATION_LABEL_CONTAINER;
    const ANIMATION_CONTAINER = DESIGN_SMALL_BUTTON_CONFIG.cssClasses.ANIMATION_CONTAINER;
    return (
        <Fragment>
            <PPLogo logoColor={ logoColor } />
            <div class='blue-layer' />
            <div class={ ANIMATION_LABEL } data-design-experiment='104519'>
                <span>{designLabelText}</span>
            </div>
            <style innerHTML={ `
                    .${ ANIMATION_CONTAINER } .blue-layer {
                        position: fixed;
                        opacity: 0;
                    }
                    .${ DESIGN_SMALL_BUTTON_CONFIG.cssClasses.DOM_READY } .${ ANIMATION_CONTAINER } img.${ DESIGN_SMALL_BUTTON_CONFIG.cssClasses.PAYPAL_LOGO }-pp{
                        position: fixed;
                        opacity:0;
                    }
                    .${ ANIMATION_CONTAINER } .${ ANIMATION_LABEL } {
                        opacity: 0; 
                        color: white;
                        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                    }
                ` } />
        </Fragment>
    );
}

// Returns label container if the button sizes match
export const resizeButtonShowLabelTextProps = function(document : Object, configuration : Object) : AnimationProps | null {
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
    
    let buttonHeight = animationContainer.offsetHeight;
    if (animationContainerWidth < smallMax) {
        buttonHeight += 1;
    }

    // get the label container that animation will be applied to
    const paypalLabelContainer = animationContainer.querySelector(`.${ PAYPAL_BUTTON_LABEL }`) || null;
    const labelStylesObject = (paypalLabelContainer && (paypalLabelContainer.currentStyle || window.getComputedStyle(paypalLabelContainer))) || null;
    const marginLabelContainer = (labelStylesObject && labelStylesObject.marginRight) || null;
    return {
        labelFontSize,
        paypalLabelContainerElement: paypalLabelContainer,
        marginLabelContainer,
        buttonHeight
    };
};

export const resizeButtonShowLabelTextAnimation = function (designProps : AnimationProps, configuration : Object) : void | null {
    const { ANIMATION_LABEL_CONTAINER, ANIMATION_CONTAINER, DOM_READY, PAYPAL_LOGO } = configuration.cssClasses;
    const { buttonHeight, paypalLabelContainerElement, labelFontSize, marginLabelContainer } = designProps;
    const blueLayerPosition = Math.round(parseFloat(marginLabelContainer)) + 1;
    const animations = `
        .${ DOM_READY } .${ ANIMATION_CONTAINER } img.${ PAYPAL_LOGO }-paypal{
            animation: 4s move-logo-to-left-side 1s infinite alternate;
            position:fixed;
            transform:translateX(-50%);
        }

        .${ ANIMATION_CONTAINER } .blue-layer {
            width: 1%;
            height: ${ buttonHeight }px;
            background-color: rgb(43,114,235);
            position: fixed;
            transform: translateY(-25%);
            right: -${ blueLayerPosition }px;
            border-radius: 9px 3px 3px 9px;
            animation: 4s resize-blue-layer 1s infinite alternate;
        }

        .${ ANIMATION_CONTAINER } .${ ANIMATION_LABEL_CONTAINER } {
            position: fixed;
            animation: 4s show-text 1s infinite alternate;
            font-size: ${ labelFontSize }px;
            padding-top: 1px;
            right: 0%;
            width: 80%;
            text-align: center;
        }

        .${ DOM_READY } .${ ANIMATION_CONTAINER } img.${ PAYPAL_LOGO }-pp{
            animation: 4s move-small-paypal 1s infinite alternate;
            left:0px;
            opacity:0;
        }

        @keyframes resize-blue-layer {
            0%,33%{
                opacity:0;
                width:1%;
            }
            51%,100%{
                opacity:1;
                width: 90%
            }
        }

        @keyframes move-logo-to-left-side {
            0%,33% {
                transform: translateX(-50%);
                opacity:1;
            }
            50%,100% {
                position:fixed;
                transform: translateX(-100%);
                opacity:0;
            }
        }

        @keyframes show-text {
            0%,38%{
                opacity: 0;
            }
            51%, 100% {
                opacity: 1;                    
            }
        }

        @keyframes move-small-paypal {
            0%,33%{
                opacity:0;
            }
            51%,100% {
                left:0px;
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

