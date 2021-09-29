/* @flow */
import { LOGO_CLASS } from '@paypal/sdk-logos/src';

import { CLASS, DIVIDE_LOGO_ANIMATION } from '../../../constants';
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


export const createAddDivideLogoAnimation = () : ButtonAnimation => {
    const animation = () : void => {
        const buttonContainer = document && document.querySelector('.paypal-logo-divide-logo-animation');
        const buttonElement = buttonContainer && buttonContainer.querySelector('.paypal-button-label-container');

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
                @keyframes divide-logo-animation-experiment-left-side {
                    100% {
                        transform: translateX(-${ logoTranslateSize }px);
                    }
                }
                
                @keyframes divide-logo-animation-experiment-right-side {
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
            large: { min: BUTTON_SIZE_STYLE.large.minWidth, max: BUTTON_SIZE_STYLE.large.maxWidth },
            huge:  { min: BUTTON_SIZE_STYLE.huge.minWidth, max: BUTTON_SIZE_STYLE.huge.maxWidth }
        },
        'fn': animation
    };
};

export const getDivideLogoAnimationLabelAndStyles = (enableDivideLogoAnimation) => {
    if (!enableDivideLogoAnimation) {
        return;
    }

    const styles = `
        .${ CLASS.DOM_READY } .${ DIVIDE_LOGO_ANIMATION.LOGO } img.${ LOGO_CLASS.LOGO }{
            animation: 1s divide-logo-animation-experiment-left-side 2s forwards;
            position: relative;
        }

        .${ DIVIDE_LOGO_ANIMATION.LABEL_TEXT } {
            display: block;
            position: absolute;
            opacity: 0; 
            animation: 1s divide-logo-animation-experiment-right-side 2s forwards;
        }

        .${ CLASS.BUTTON_LABEL } .${ DIVIDE_LOGO_ANIMATION.LABEL_TEXT } span {
            font-size: 16px;
            color: #142C8E;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        }

        @media only screen and (max-width: 315px){
            .${ CLASS.BUTTON_LABEL } .${ DIVIDE_LOGO_ANIMATION.LABEL_TEXT } span {
                font-size: 14px;
                padding-top: 3px;
            }
        }
    `;

    return {
        labelText:  'Earn rewards',
        labelClass:  DIVIDE_LOGO_ANIMATION.LABEL_TEXT,
        styles
    };
};


