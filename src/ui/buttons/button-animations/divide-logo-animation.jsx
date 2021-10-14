/* @flow */
/** @jsx node */
import { LOGO_CLASS } from '@paypal/sdk-logos/src';
import { node, Fragment, type ChildType } from 'jsx-pragmatic/src';

import { CLASS } from '../../../constants';
import { BUTTON_SIZE_STYLE } from '../config';

import  type { ButtonAnimationOutputParams, LabelOptions, ResizeButtonAnimationDomElementPositions, ButtonSizes } from './types';

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
            <div class={ config.labelClass }> <span class="test">{config.labelText}</span></div>
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

const getPositionsOfElementsForAnimation = function(document, configuration) : ResizeButtonAnimationDomElementPositions | null {
    const { ANIMATION_CONTAINER, PAYPAL_LOGO, PAYPAL_BUTTON_LABEL } = configuration.cssClasses;
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

    // get margin of paypal label container as an integer to later calculate logo translate position
    let marginPaypalLabelContainer = document.defaultView.getComputedStyle(paypalLabelContainerElement).getPropertyValue('margin-left');
    marginPaypalLabelContainer = marginPaypalLabelContainer ? parseInt(marginPaypalLabelContainer.replace('px', ''), 10) : 0;
    // get the logo image element from dom to get the left position
    const logoElement = (paypalLabelContainerElement && paypalLabelContainerElement.querySelector(`.${ PAYPAL_LOGO }`)) || null;
    // get the left position of the logo element to later calculate the translate position
    const logoElementLeftPosition = (logoElement && logoElement.getBoundingClientRect().left) || 0;
    // calculate translate position based on the logo left position and margin of paypal label container
    const logoTranslateXPosition = logoElementLeftPosition - marginPaypalLabelContainer;
    // get paypal label container's width to calculate initial and final translate positions
    const paypalLabelContainerElementWith  = (paypalLabelContainerElement &&  paypalLabelContainerElement.offsetWidth) || 0;
    // find label text element
    const textElement = (paypalLabelContainerElement && paypalLabelContainerElement.querySelector('span')) || 0;
    // find label text dom element to help to calculate initial and final translate position
    const textElementWidth = (textElement && textElement.offsetWidth) || 0;
    // calculate initial translate position to start the animation with the text in that position
    const initialTranslateXTextPosition = (paypalLabelContainerElementWith - textElementWidth) / 2;
    // calculate final translate in x axis to move text element to that position
    const finalTranslateXTextPosition = (paypalLabelContainerElementWith - textElementWidth);
    // text position in y axis to center the text in y axis
    const textYposition = 22;
    return {
        logoTranslateXPosition,
        initialTranslateXTextPosition,
        textYposition,
        finalTranslateXTextPosition,
        paypalLabelContainerElement
    };
};

function animationConfiguration () : ButtonSizes {
    return {
        large:      { min: BUTTON_SIZE_STYLE.large.minWidth },
        huge:       { max: BUTTON_SIZE_STYLE.huge.maxWidth },
        cssClasses: {
            DOM_READY:                  CLASS.DOM_READY,
            ANIMATION_CONTAINER:         ANIMATION.CONTAINER,
            PAYPAL_LOGO:                LOGO_CLASS.LOGO,
            ANIMATION_LABEL_CONTAINER:        ANIMATION.LABEL_CONTAINER,
            PAYPAL_BUTTON_LABEL:        CLASS.BUTTON_LABEL
        }
    };
}

export function createDivideLogoAnimation() : Function {
    return (params, cssClasses) : void => {
        const { logoTranslateXPosition, initialTranslateXTextPosition, textYposition, finalTranslateXTextPosition, paypalLabelContainerElement } = params;
        const { ANIMATION_LABEL_CONTAINER, ANIMATION_CONTAINER, DOM_READY, PAYPAL_LOGO } = cssClasses;
        const animations = `
            .${ DOM_READY } .${ ANIMATION_CONTAINER } img.${ PAYPAL_LOGO }{
                animation: 1s divide-logo-animation-left-side 2s forwards;
            }
            
            .${ ANIMATION_CONTAINER } .${ ANIMATION_LABEL_CONTAINER } {
                animation: 1s divide-logo-animation-right-side 2s forwards;
            }

            @keyframes divide-logo-animation-left-side {
                100% {
                    transform: translateX(-${ logoTranslateXPosition }px);
                }
            }
            
            @keyframes divide-logo-animation-right-side {
                0%{
                    opacity: 0;
                    transform: translate(${ initialTranslateXTextPosition }px,-${ textYposition }px);
                }
                100% {
                    opacity: 1;
                    transform: translate(${ finalTranslateXTextPosition }px,-${ textYposition }px);
                }
            }
        `;

        if (paypalLabelContainerElement) {
            const style = document.createElement('style');
            paypalLabelContainerElement.appendChild(style);
            style.type = 'text/css';
            style.appendChild(document.createTextNode(animations));
        }
    };
}

export function setupDivideLogoAnimation (animationLabelText : string) : ButtonAnimationOutputParams {
    let animationScript = '';
    const animationProps = { animationLabelText };
    const animationFn = createDivideLogoAnimation();
    const animationConfig = animationConfiguration();
    animationScript = `
        const elementPositionsForAnimation = ${ getPositionsOfElementsForAnimation.toString() }( document, ${ JSON.stringify(animationConfig) })
        if (elementPositionsForAnimation) {
            const animation = ${ animationFn.toString() }
            animation(elementPositionsForAnimation, ${ JSON.stringify(animationConfig.cssClasses) })
        }
    `;
    return {
        animationContainerClass: ANIMATION.CONTAINER,
        animationScript,
        animationComponent:      (<LabelForDivideLogoAnimation { ...animationProps } />)
    };
}
