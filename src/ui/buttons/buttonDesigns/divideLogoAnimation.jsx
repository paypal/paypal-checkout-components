/* @flow */
/** @jsx node */
import { LOGO_CLASS } from '@paypal/sdk-logos/src';

import { CLASS } from '../../../constants';
import { BUTTON_SIZE_STYLE } from '../config';

type DivideLogoAnimationProps = {|
    paypalLabelContainerElement : ElementNode,
    paypalLogoStartingLeftPosition : string
|};


const DESIGN_CONFIG = {
    min:      BUTTON_SIZE_STYLE.large.minWidth,
    max:      BUTTON_SIZE_STYLE.huge.maxWidth,
    cssUtilClasses: {
        DOM_READY:                  CLASS.DOM_READY,
        PAYPAL_LOGO:                LOGO_CLASS.LOGO,
        PAYPAL_BUTTON_LABEL:        CLASS.BUTTON_LABEL
    }
};

// Returns props necessary to render the animation as long as they are valid
const getValidDesignProps = function(document, configuration) : DivideLogoAnimationProps | null {
    const { PAYPAL_BUTTON_LABEL, PAYPAL_LOGO } = configuration.cssUtilClasses;

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
    const paypalLogoElement = (paypalLabelContainerElement && paypalLabelContainerElement.querySelector(`.${ PAYPAL_LOGO }`)) || null;
    const paypalLogoStartingLeftPosition = paypalLogoElement
        ? `${ (paypalLogoElement.offsetLeft / paypalLabelContainerElement.offsetWidth) * 100 }%`
        : '44.5%';

    return {
        paypalLabelContainerElement,
        paypalLogoStartingLeftPosition
    };
};

function getDivideLogoAnimation(designProps, cssUtilClasses) : void {
    const { DOM_READY, PAYPAL_LOGO } = cssUtilClasses;
    const { paypalLabelContainerElement, paypalLogoStartingLeftPosition } = designProps;
    const designCss = `
        .${ DOM_READY } .personalized-design-container img.${ PAYPAL_LOGO }{
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
    }
}

export function getDivideLogoAnimationScript() : string {
    const buttonDesignScript = `
        const designProps = ${ getValidDesignProps.toString() }( document, ${ JSON.stringify(DESIGN_CONFIG) });
        if (designProps && designProps.paypalLabelContainerElement && designProps.paypalLogoStartingLeftPosition) {
            const applyDesign = ${ getDivideLogoAnimation.toString() }
            applyDesign(designProps, ${ JSON.stringify(DESIGN_CONFIG.cssUtilClasses) })
        }
    `;
    return buttonDesignScript;
}
