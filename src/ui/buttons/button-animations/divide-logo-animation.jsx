/* @flow */
/** @jsx node */
import { LOGO_CLASS } from '@paypal/sdk-logos/src';

import { node, type ElementNode } from 'jsx-pragmatic/src';

import { CLASS } from '../../../constants';
import { BUTTON_SIZE_STYLE } from '../config';


type ButtonSizeProperties = {|
    min : number,
    max : number
|};

type ButtonSizes = {|
    large : ButtonSizeProperties,
    huge : ButtonSizeProperties
|};

export type ButtonAnimation = {|
    params : ButtonSizes,
    fn : Function
|};


export type LabelOptions = {|
    enableDivideLogoAnimation : ?boolean
|};

export const DIVIDE_LOGO_ANIMATION = {
    LABEL_TEXT: ('divide-logo-animation-experiment' : 'divide-logo-animation-experiment'),
    LOGO:       ('divide-logo-animation' : 'divide-logo-animation')
};

export function LabelForDivideLogoAnimation() : ElementNode {
    const config = {
        labelText:  'Earn rewards',
        labelClass:  DIVIDE_LOGO_ANIMATION.LABEL_TEXT,
    };
   

    return (
        <div class={ config.labelClass }> <span>{config.labelText}</span></div>
    );
}

export function createDivideLogoAnimation() : ButtonAnimation {
    const animation = (params) : void => {
        const { ANIMATION_LABEL_TEXT, ANIMATION_LOGO, DOM_READY, PAYPAL_LOGO, PAYPAL_BUTTON_LABEL } = params.cssClasses;
        const buttonContainer = document && document.querySelector(`.${ ANIMATION_LOGO }`);
        console.log("animation container? ",buttonContainer)
        const buttonElement = buttonContainer && buttonContainer.querySelector(`.${ PAYPAL_BUTTON_LABEL }`);

        if (buttonContainer && buttonElement) {
            const style = document.createElement('style');
            const logoElement = buttonElement.querySelector('.paypal-logo');
            const buttonLabelText = buttonElement.querySelector('.divide-logo-animation-experiment');
            const containerWidth = buttonElement ? buttonElement.offsetWidth : 0;
            const logoWidth = logoElement && logoElement.offsetWidth;
            const logoWidthSize = logoWidth ? (logoWidth / 2) : 0;
            const logoTranslateSize = (containerWidth / 2) - logoWidthSize;

            const placeholderTextWidth = buttonLabelText ? buttonLabelText.offsetWidth : 0;
            const defaultPlaceholderTranslateSize = placeholderTextWidth && (containerWidth / 2) - placeholderTextWidth;
            const placeholderTranslateSize =  containerWidth - placeholderTextWidth;

            buttonElement.appendChild(style);
            
            const animations = `
                .${ DOM_READY } .${ ANIMATION_LOGO } img.${ PAYPAL_LOGO }{
                    animation: 1s divide-logo-animation-left-side 2s forwards;
                    position: relative;
                }
        
                .${ ANIMATION_LABEL_TEXT } {
                    display: block;
                    position: absolute;
                    opacity: 0; 
                    animation: 1s divide-logo-animation-right-side 2s forwards;
                }
        
                .${ PAYPAL_BUTTON_LABEL } .${ ANIMATION_LABEL_TEXT } span {
                    font-size: 16px;
                    color: #142C8E;
                    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                }
        
                @media only screen and (max-width: 315px){
                    .${ PAYPAL_BUTTON_LABEL } .${ ANIMATION_LABEL_TEXT } span {
                        font-size: 14px;
                        padding-top: 3px;
                    }
                }

                @keyframes divide-logo-animation-left-side {
                    100% {
                        transform: translateX(-${ logoTranslateSize }px);
                    }
                }
                
                @keyframes divide-logo-animation-right-side {
                    0%{
                        opacity: 0;
                        transform: translate(${ defaultPlaceholderTranslateSize }px,-22px);
                    }
                    100% {
                        opacity: 1;
                        transform: translate(${ placeholderTranslateSize }px,-22px);
                    }
                }
            `;
            style.type = 'text/css';
            style.appendChild(document.createTextNode(animations));
        }
    };
    
    return {
        'params': {
            large:      { min: BUTTON_SIZE_STYLE.large.minWidth, max: BUTTON_SIZE_STYLE.large.maxWidth },
            huge:       { min: BUTTON_SIZE_STYLE.huge.minWidth, max: BUTTON_SIZE_STYLE.huge.maxWidth },
            cssClasses: {
                DOM_READY:              CLASS.DOM_READY,
                ANIMATION_LOGO:         DIVIDE_LOGO_ANIMATION.LOGO,
                PAYPAL_LOGO:            LOGO_CLASS.LOGO,
                ANIMATION_LABEL_TEXT: DIVIDE_LOGO_ANIMATION.LABEL_TEXT,
                PAYPAL_BUTTON_LABEL:    CLASS.BUTTON_LABEL
            }
        },
        'fn': animation
    };
}

export function setupAnimation () : void {
    const animationProps = { enableDivideLogoAnimation: true };
    return {
        animationContainerClass: DIVIDE_LOGO_ANIMATION.LOGO,
        animationStyles:                      createDivideLogoAnimation(),
        animationComponent:            (<LabelForDivideLogoAnimation { ...animationProps } />)
    };
}
