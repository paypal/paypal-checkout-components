/* @flow */
/** @jsx node */
import { LOGO_CLASS } from '@paypal/sdk-logos/src';
import { node, Fragment, type ChildType, type ElementNode } from 'jsx-pragmatic/src';

import { CLASS } from '../../../constants';
import { BUTTON_SIZE_STYLE } from '../config';

import type { ButtonAnimationOutputParams, LabelOptions, ButtonSizes } from './types';

export const ANIMATION = {
    LABEL_CONTAINER: ('divide-logo-animation-label-container' : 'divide-logo-animation-label-container'),
    CONTAINER:       ('divide-logo-animation' : 'divide-logo-animation')
};

export function LabelForDivideLogoAnimation({ animationLabelText } : LabelOptions) : ChildType {
    const config = {
        labelText:  animationLabelText,
        labelClass:  ANIMATION.LABEL_CONTAINER
    };
   
    return (
        <Fragment>
            <div class={ config.labelClass } data-experiment="Varied_Button_Design"> <span>{config.labelText}</span></div>
            <style innerHTML={ `
                .${ CLASS.DOM_READY } .${ ANIMATION.CONTAINER } img.${ LOGO_CLASS.LOGO }{
                    position: relative;
                }
                
                .${ ANIMATION.CONTAINER } .${ ANIMATION.LABEL_CONTAINER } {
                    position: absolute;
                    opacity: 0; 
                    color: #142C8E;
                    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                    font-size: 16px;
                }
            ` } />;
        </Fragment>
    );
}

// Returns label container if the button sizes match
const getValidLabelContainer = function(document, configuration) : ElementNode | null {
    const { ANIMATION_CONTAINER, PAYPAL_BUTTON_LABEL } = configuration.cssClasses;
    const { large, huge } = configuration;
    // get the animation main container to force specificity( in css ) and make sure we are running the right animation
    const animationContainer = (document && document.querySelector(`.${ ANIMATION_CONTAINER }`)) || null;
    // get the label container element having into account the animation container to force specificity in css
    const paypalLabelContainerElement = (animationContainer && animationContainer.querySelector(`.${ PAYPAL_BUTTON_LABEL }`)) || null;

    if (!animationContainer) {
        return null;
    }

    const animationContainerWidth = animationContainer.offsetWidth;
    if (animationContainerWidth < large.min  || animationContainerWidth > huge.max) {
        return null;
    }

    return paypalLabelContainerElement;
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
    return (paypalLabelContainerElement, cssClasses) : void => {
        const { ANIMATION_LABEL_CONTAINER, ANIMATION_CONTAINER, DOM_READY, PAYPAL_LOGO } = cssClasses;
        // The 44.5% is eyeballed, not sure if/underwhat circumstances that could become inaccurate
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
                    left: 44.5%;
                }
                33% {
                    position: fixed;
                    left: 44.5%;
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
    const animationProps = { animationLabelText };
    const animationFn = createDivideLogoAnimation();
    const animationConfig = animationConfiguration();
    const buttonAnimationScript = `
        const labelContainer = ${ getValidLabelContainer.toString() }( document, ${ JSON.stringify(animationConfig) })
        if (labelContainer) {
            const animation = ${ animationFn.toString() }
            animation(labelContainer, ${ JSON.stringify(animationConfig.cssClasses) })
        }
    `;
    return {
        buttonAnimationContainerClass: ANIMATION.CONTAINER,
        buttonAnimationScript,
        buttonAnimationComponent:      (<LabelForDivideLogoAnimation { ...animationProps } />)
    };
}
