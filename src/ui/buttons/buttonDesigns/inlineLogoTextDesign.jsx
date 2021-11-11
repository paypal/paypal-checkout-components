/* @flow */
/** @jsx node */
import { LOGO_CLASS } from '@paypal/sdk-logos/src';
import { type ElementNode } from 'jsx-pragmatic/src';

import { BUTTON_SIZE_STYLE } from '../config';
import { CLASS } from '../../../constants';

const DESIGN_CONFIG = {
    cssUtilClasses: {
        PAYPAL_LABEL_CONTAINER: CLASS.BUTTON_LABEL,
        PAYPAL_LOGO:            LOGO_CLASS.LOGO,
        DOM_READY:              CLASS.DOM_READY
    },
    min:                        BUTTON_SIZE_STYLE.large.minWidth,
    max:                        BUTTON_SIZE_STYLE.huge.maxWidth
};

const getValidDesignProps = function (document, configuration) : ElementNode | null {
    const { PAYPAL_LABEL_CONTAINER } = configuration.cssUtilClasses;

    const designContainer = (document && document.querySelector('.personalized-design-container')) || null;
    if (!designContainer) {
        return null;
    }
     
    const designContainerWidth = designContainer.offsetWidth;
    if (designContainerWidth < configuration.min || designContainerWidth > configuration.max) {
        return null;
    }

    const paypalLabelContainerElement = (designContainer && designContainer.querySelector(`.${ PAYPAL_LABEL_CONTAINER }`)) || null;   

    return paypalLabelContainerElement;
};

const getInlineLabelTextDesign = function (designContainerElement, cssUtilClasses) : void {
    const { DOM_READY, PAYPAL_LOGO } = cssUtilClasses;
    const designCss = `
        .${ DOM_READY } .personalized-design-container img.${ PAYPAL_LOGO }{
            position: fixed;
            left: 0%;
        }

        .personalized-design-container .personalized-label-container {
            position: fixed;
            opacity: 1;
            right:0%;
        }
    `;

    if (designContainerElement) {
        const style = document.createElement('style');
        designContainerElement.appendChild(style);
        style.appendChild(document.createTextNode(designCss));
    }
};


export function getInlineLabelTextScript() : string {
    const buttonDesignScript = `
        const designContainerElement = ${ getValidDesignProps.toString() }( document, ${ JSON.stringify(DESIGN_CONFIG) })
        if (designContainerElement) {
            const applyDesign = ${ getInlineLabelTextDesign.toString() }
            applyDesign(designContainerElement, ${ JSON.stringify(DESIGN_CONFIG.cssUtilClasses) })
        }
    `;
    return buttonDesignScript;
}
