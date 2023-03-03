/* @flow */
/** @jsx node */
import { LOGO_CLASS } from '@paypal/sdk-logos/src';
import { node, Fragment, type ChildType } from '@krakenjs/jsx-pragmatic/src';

import { CLASS } from '../../../constants';
import { BUTTON_SIZE_STYLE } from '../config';

import { type ContentOptions } from './types';

type DivideLogoAnimationProps = {|
    paypalLabelContainerElement : Object,
    paypalLogoStartingLeftPosition : string,
    designContainer : Object
|};


export const DIVIDE_LOGO_CONFIG = {
    min:                            BUTTON_SIZE_STYLE.large.minWidth,
    max:                            BUTTON_SIZE_STYLE.huge.maxWidth,
    cssUtilClasses: {
        DOM_READY:                  CLASS.DOM_READY,
        PAYPAL_LOGO:                LOGO_CLASS.LOGO,
        PAYPAL_BUTTON_LABEL:        CLASS.BUTTON_LABEL,
        PAYPAL_LOGO_PP:             CLASS.LOGO_PP
    }
};

// Returns props necessary to render the animation as long as they are valid
export const getDivideLogoProps = function (document : Object, configuration : Object) : DivideLogoAnimationProps | null {
    const { PAYPAL_BUTTON_LABEL, PAYPAL_LOGO, PAYPAL_LOGO_PP } = configuration.cssUtilClasses;

    const designContainer = (document && document.querySelector('.personalized-design-container')) || null;
    if (!designContainer) {
        return null;
    }

    // return null if animation should not be played for the button size
    const designContainerWidth = designContainer.offsetWidth;
    if (designContainerWidth < configuration.min || designContainerWidth > configuration.max) {
        return null;
    }

    // get the label container that animation will be applied to
    const paypalLabelContainerElement = designContainer.querySelector(`.${ PAYPAL_BUTTON_LABEL }`) || null;
    if (!paypalLabelContainerElement) {
        return null;
    }

    // get starting position for element so it doesn't flicker when animation begins
    const paypalLogoElement = (paypalLabelContainerElement && paypalLabelContainerElement.querySelector(`.${ PAYPAL_LOGO }.${ PAYPAL_LOGO_PP }`)) || null;
    if (!paypalLogoElement) {
        return null;
    }
    const paypalLogoStartingLeftPosition = `${ (paypalLogoElement.offsetLeft / paypalLabelContainerElement.offsetWidth) * 100 }%`;

    return {
        paypalLabelContainerElement,
        paypalLogoStartingLeftPosition,
        designContainer
    };
};

export function getDivideLogoAnimation(designProps : DivideLogoAnimationProps, configuration : Object) : void {
    const {
        min,
        max,
        cssUtilClasses: {
            DOM_READY,
            PAYPAL_LOGO,
            PAYPAL_LOGO_PP
        }
    } = configuration;

    const {
        paypalLabelContainerElement,
        paypalLogoStartingLeftPosition,
        designContainer
    } = designProps;

    const designCss = `
        .${ DOM_READY } .personalized-design-container img.${ PAYPAL_LOGO }.${ PAYPAL_LOGO_PP }{
            animation: 3s divide-logo-animation-left-side 2s infinite alternate;
        }
        
        .personalized-design-container .personalized-label-container {
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
        style.appendChild(document.createTextNode(designCss));

        
        window.addEventListener('resize', () => {
            // Remove animation if size limit broken
            if (
                (designContainer.offsetWidth > max || designContainer.offsetWidth < min)
                && paypalLabelContainerElement.contains(style)
            ) {
                paypalLabelContainerElement.removeChild(style);
            } else if (
                (designContainer.offsetWidth <= max || designContainer.offsetWidth >= min)
                && !paypalLabelContainerElement.contains(style)
            ) {
                paypalLabelContainerElement.appendChild(style);
            }
        });
    }
}

export function DivideLogoTextComponent({ designLabelText } : ContentOptions) : ChildType {
    return (
        <Fragment>
            <div class={ 'personalized-label-container' } data-design-experiment='104519'> <span>{designLabelText}</span></div>
            <style innerHTML={ `
              .${ CLASS.DOM_READY } .personalized-design-container img.${ LOGO_CLASS.LOGO }{
                  position: relative;
              }
              
              .personalized-design-container .personalized-label-container {
                  position: absolute;
                  opacity: 0; 
                  color: #142C8E;
                  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                  font-size: 14px;
              }

              .personalized-design-container .personalized-label-container span {
                  display: flex;
                  flex-direction: column;
                  justify-content: space-around;
              }
          ` } />;
        </Fragment>
    );
}
