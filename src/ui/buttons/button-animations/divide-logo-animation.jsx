/* @flow */
/** @jsx node */
import { LOGO_CLASS } from '@paypal/sdk-logos/src';
import { node, Fragment, type ChildType } from 'jsx-pragmatic/src';

import { CLASS } from '../../../constants';
import { BUTTON_SIZE_STYLE } from '../config';

import type { ButtonAnimationOutputParams, LabelOptions, ButtonSizes, DivideLogoAnimationProps } from './types';

export const ANIMATION = {
    LABEL_CONTAINER: ('divide-logo-animation-label-container' : 'divide-logo-animation-label-container'),
    CONTAINER:       ('divide-logo-animation' : 'divide-logo-animation')
};

export function LabelForDivideLogoAnimation({ animationLabelText } : LabelOptions) : ChildType {
    // experimentName must match elmo experiment name
    const config = {
        labelText:      animationLabelText,
        labelClass:     ANIMATION.LABEL_CONTAINER,
        experimentName: 'Varied_Button_Design'
    };
   
    return (
        <Fragment>
            <div class={ config.labelClass } data-animation-experiment={ config.experimentName }> <span>{config.labelText}</span></div>
            <style innerHTML={ `
                .${ CLASS.DOM_READY } .${ ANIMATION.CONTAINER } img.${ LOGO_CLASS.LOGO }{
                    position: relative;
                }
                
                .${ ANIMATION.CONTAINER } .${ ANIMATION.LABEL_CONTAINER } {
                    position: absolute;
                    opacity: 0; 
                    color: #142C8E;
                    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                    font-size: 14px;
                }

                .${ ANIMATION.CONTAINER } .${ ANIMATION.LABEL_CONTAINER } span {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                }
            ` } />;
        </Fragment>
    );
}

// Returns label container if the button sizes match
const getAnimationProps = function(document, configuration) : DivideLogoAnimationProps | null {
    const { ANIMATION_CONTAINER, PAYPAL_BUTTON_LABEL, PAYPAL_LOGO } = configuration.cssClasses;
    const { large } = configuration;

    // get the animation main container to force specificity( in css ) and make sure we are running the right animation
    const animationContainer = (document && document.querySelector(`.${ ANIMATION_CONTAINER }`)) || null;
    if (!animationContainer) {
        return null;
    }

    // return null if animation should not be played for the button size
    const animationContainerWidth = animationContainer.offsetWidth;
    if (animationContainerWidth < large.min) {
        return null;
    }

    // get the label container that animation will be applied to
    const paypalLabelContainerElement = animationContainer.querySelector(`.${ PAYPAL_BUTTON_LABEL }`) || null;
    // get starting position for element so it doesn't jump when animation begins
    const paypalLogoElement = (paypalLabelContainerElement && paypalLabelContainerElement.querySelector(`.${ PAYPAL_LOGO }`)) || null;
    const paypalLogoStartingLeftPosition = paypalLogoElement
        ? `${ (paypalLogoElement.offsetLeft / paypalLabelContainerElement.offsetWidth) * 100 }%`
        : '44.5%';

    return {
        paypalLabelContainerElement,
        paypalLogoStartingLeftPosition
    };
};

function animationConfiguration () : ButtonSizes {
    return {
        large:      { min: BUTTON_SIZE_STYLE.large.minWidth },
        huge:       { max: BUTTON_SIZE_STYLE.huge.maxWidth },
        cssClasses: {
            DOM_READY:                  CLASS.DOM_READY,
            ANIMATION_CONTAINER:        ANIMATION.CONTAINER,
            PAYPAL_LOGO:                LOGO_CLASS.LOGO,
            ANIMATION_LABEL_CONTAINER:  ANIMATION.LABEL_CONTAINER,
            PAYPAL_BUTTON_LABEL:        CLASS.BUTTON_LABEL
        }
    };
}

export function createDivideLogoAnimation() : Function {
    return (animationProps, cssClasses) : void => {
        const { ANIMATION_LABEL_CONTAINER, ANIMATION_CONTAINER, DOM_READY, PAYPAL_LOGO } = cssClasses;
        const { paypalLabelContainerElement, paypalLogoStartingLeftPosition } = animationProps;
        const animations = `
            .${ DOM_READY } .${ ANIMATION_CONTAINER } img.${ PAYPAL_LOGO }{
                animation: 3s divide-logo-animation-left-side 2s infinite alternate;
            }
            
            .${ ANIMATION_CONTAINER } .${ ANIMATION_LABEL_CONTAINER } {
                animation: 3s divide-logo-animation-right-side 2s infinite alternate;
            }

            @keyframes divide-logo-animation-left-side {
                0% {
                    position: fixed;
                    left: ${ paypalLogoStartingLeftPosition };
                }
                33% {
                    position: fixed;
                    left: ${ paypalLogoStartingLeftPosition };
                }
                66% {
                    position: fixed;
                    left: 0%;
                }
                100% {
                    position: fixed;
                    left: 0%;
                }
            }
            
            @keyframes divide-logo-animation-right-side {
                0%{
                    opacity: 0;
                    position: fixed;
                    right: 45%;
                }
                33%{
                    opacity: 0;
                    position: fixed;
                    right: 45%;
                }
                66% {
                    opacity: 1;
                    position: fixed;
                    right: 0%;
                }
                100% {
                    opacity: 1;
                    position: fixed;
                    right: 0%;
                }
            }
        `;

        if (paypalLabelContainerElement) {
            const style = document.createElement('style');
            paypalLabelContainerElement.appendChild(style);
            style.appendChild(document.createTextNode(animations));
        }
    };
}

export function setupDivideLogoAnimation (animationLabelText : string) : ButtonAnimationOutputParams {
    const animationData = { animationLabelText };
    const animationFn = createDivideLogoAnimation();
    const animationConfig = animationConfiguration();
    const buttonAnimationScript = `
        const animationProps = ${ getAnimationProps.toString() }( document, ${ JSON.stringify(animationConfig) });
        if (animationProps && animationProps.paypalLabelContainerElement && animationProps.paypalLogoStartingLeftPosition) {
            const animation = ${ animationFn.toString() }
            animation(animationProps, ${ JSON.stringify(animationConfig.cssClasses) })
        }
    `;
    return {
        buttonAnimationContainerClass: ANIMATION.CONTAINER,
        buttonAnimationScript,
        buttonAnimationComponent:      (<LabelForDivideLogoAnimation { ...animationData } />)
    };
}
