/* @flow */
/** @jsx node */
import { LOGO_CLASS } from '@paypal/sdk-logos/src';
import { node, Fragment, type ChildType } from 'jsx-pragmatic/src';

import { BUTTON_SIZE_STYLE } from '../config';
import { CLASS } from '../../../constants';

import  type { ButtonAnimationOutputParams, LabelOptions, labelNextToLogoAnimation } from './types';

export const ANIMATION = {
    ELEMENT:         ('label-next-to-logo-animation-element' : 'label-next-to-logo-animation-element'),
    CONTAINER:       ('label-next-to-logo-animation' : 'label-next-to-logo-animation')
};

function LabelForDivideLogoAnimation({ animationLabelText } : LabelOptions) : ChildType {
    return (
        <Fragment>
            <span class={ ANIMATION.ELEMENT }>{animationLabelText}</span>
            <style innerHTML={ `
                .${ CLASS.DOM_READY } .${ ANIMATION.CONTAINER } img.${ LOGO_CLASS.LOGO }{
                    position: relative;
                }
                
                .${ ANIMATION.CONTAINER } .${ ANIMATION.ELEMENT } {
                    display: block;
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

const findAnimationPositions = function (document, configuration) : labelNextToLogoAnimation | null {
    const { ANIMATION_CONTAINER, PAYPAL_LABEL_CONTAINER, PAYPAL_LOGO } = configuration.cssStyles;
    const { large, huge } = configuration;

    // get the animation main container to force specificity( in css ) and make sure we are running the right animation
    const animationContainer = (document && document.querySelector(`.${ ANIMATION_CONTAINER }`)) || null;
    // get the label container element having into account the animation container to force specificity in css
    const paypalLabelContainerElement = (animationContainer && animationContainer.querySelector(`.${ PAYPAL_LABEL_CONTAINER }`)) || null;

    if (!animationContainer) {
        return null;
    }
   
    const animationContainerWidth = animationContainer.offsetWidth;
    // only support large and extra large button sizes
    if (animationContainerWidth < large.min || animationContainerWidth > huge.max) {
        return null;
    }

    // find label text element
    const textElement = (paypalLabelContainerElement && paypalLabelContainerElement.querySelector('span')) || 0;
    
    // validate label text size to avoid showing a very large text in a small space
    if (animationContainerWidth < (large.min + 10)) {
        const MAX_LENGTH_TEXT = 17;
        // eslint-disable-next-line unicorn/prefer-text-content
        const labelText =  textElement.innerText || textElement.textContent;
        if (!labelText) {
            return null;
        }
        
        if (labelText.length && labelText.length > MAX_LENGTH_TEXT) {
            return null;
        }
    }
    // find label text dom element to help to calculate initial and final translate position
    const textElementWidth = (textElement && textElement.offsetWidth) || 0;
    // get the logo image element from dom to get the left position
    const logoElement = (paypalLabelContainerElement && paypalLabelContainerElement.querySelector(`.${ PAYPAL_LOGO }`)) || null;
    // get the left position of the logo element to later calculate the translate position
    const logoElementLeftPosition = (logoElement && logoElement.getBoundingClientRect().left) || 0;
    if (logoElementLeftPosition) {
        return null;
    }
    // get margin of paypal label container as an integer to later calculate logo translate position
    let marginPaypalLabelContainer = document.defaultView.getComputedStyle(paypalLabelContainerElement).getPropertyValue('margin-left');
    marginPaypalLabelContainer = marginPaypalLabelContainer ? parseInt(marginPaypalLabelContainer.replace('px', ''), 10) : 0;
    // calculate translate position based on the logo left position and margin of paypal label container
    const logoTranslateXPosition = logoElementLeftPosition - marginPaypalLabelContainer;
    // get paypal label container's width to calculate initial and final translate positions
    const paypalLabelContainerElementWith  = (paypalLabelContainerElement &&  paypalLabelContainerElement.offsetWidth) || 0;
    // calculate final translate in x axis to move text element to that position
    const finalTranslateXTextPosition = (paypalLabelContainerElementWith - textElementWidth);
    if (!finalTranslateXTextPosition) {
        return null;
    }
    // text position in y axis to center the text in y axis
    const textYposition = 22;
    return {
        logoTranslateXPosition,
        textYposition,
        paypalLabelContainerElement,
        finalTranslateXTextPosition
    };
};

const createAnimation = function (params, cssClasses) : void {
    const { logoTranslateXPosition, finalTranslateXTextPosition, textYposition, paypalLabelContainerElement } = params;
    const { ANIMATION_CONTAINER, DOM_READY, PAYPAL_LOGO, ANIMATION_ELEMENT } = cssClasses;
    const animations = `
        .${ DOM_READY } .${ ANIMATION_CONTAINER } img.${ PAYPAL_LOGO }{
            transform: translateX(-${ logoTranslateXPosition }px);
        }

        .${ ANIMATION_CONTAINER } .${ ANIMATION_ELEMENT } {
            opacity: 1;
            transform: translate(${ finalTranslateXTextPosition }px,-${ textYposition }px);
        }
    `;

    const style = document.createElement('style');
    paypalLabelContainerElement.appendChild(style);
    style.type = 'text/css';
    style.appendChild(document.createTextNode(animations));
};


export function setupLabelTextNextToLogoAnimation (animationLabelText : string) : ButtonAnimationOutputParams {
    let animationScript = '';
    const animationProps = { animationLabelText };
    const animationConfig = {
        cssStyles: {
            ANIMATION_CONTAINER:    ANIMATION.CONTAINER,
            ANIMATION_ELEMENT:      ANIMATION.ELEMENT,
            PAYPAL_LABEL_CONTAINER: CLASS.BUTTON_LABEL,
            PAYPAL_LOGO:            LOGO_CLASS.LOGO,
            DOM_READY:              CLASS.DOM_READY
        },
        large:      { min: BUTTON_SIZE_STYLE.large.minWidth, max: BUTTON_SIZE_STYLE.large.maxWidth  },
        huge:       { max: BUTTON_SIZE_STYLE.huge.maxWidth }
    };

    animationScript = `
        const elementPositionsForAnimation = ${ findAnimationPositions.toString() }( document, ${ JSON.stringify(animationConfig) })
        if(elementPositionsForAnimation){
            const animation = ${ createAnimation.toString() }
            animation(elementPositionsForAnimation, ${ JSON.stringify(animationConfig.cssStyles) })
        }
    `;

    return {
        animationContainerClass: ANIMATION.CONTAINER,
        animationScript,
        animationComponent:      (<LabelForDivideLogoAnimation { ...animationProps } />)
    };
}
