/* @flow */
/** @jsx node */
import { LOGO_CLASS } from '@paypal/sdk-logos/src';
import { node, Fragment, type ChildType } from '@krakenjs/jsx-pragmatic/src';

import { BUTTON_SIZE_STYLE } from '../config';
import { CLASS } from '../../../constants';

import { type ContentOptions } from './types';

type InlineLogoTextProps = {|
    paypalLabelContainerElement : Object,
    designContainer : Object
|};

export const INLINE_LOGO_TEXT_CONFIG = {
    cssUtilClasses: {
        PAYPAL_LABEL_CONTAINER: CLASS.BUTTON_LABEL,
        PAYPAL_LOGO:            LOGO_CLASS.LOGO,
        DOM_READY:              CLASS.DOM_READY
    },
    min:                        BUTTON_SIZE_STYLE.large.minWidth,
    max:                        BUTTON_SIZE_STYLE.huge.maxWidth
};

export const getValidInlineLogoTextProps = function (document : Object, configuration : Object) : InlineLogoTextProps | null {
    const { PAYPAL_LABEL_CONTAINER } = configuration.cssUtilClasses;


    const designContainer = (document && document.querySelector('.personalized-design-container')) || null;
    if (!designContainer) {
        return null;
    }
     
    // Return null if design does not apply to button size
    const designContainerWidth = designContainer.offsetWidth;
    if (designContainerWidth < configuration.min || designContainerWidth > configuration.max) {
        return null;
    }

    // Return null if label element is not valid
    const paypalLabelContainerElement = (designContainer && designContainer.querySelector(`.${ PAYPAL_LABEL_CONTAINER }`)) || null;
    if (!paypalLabelContainerElement) {
        return null;
    }

    return {
        paypalLabelContainerElement,
        designContainer
    };
};

export const getInlineLabelTextDesign = function (designProps : InlineLogoTextProps, configuration : Object) : void {
    const {
        min,
        max,
        cssUtilClasses: {
            DOM_READY,
            PAYPAL_LOGO
        }
    } = configuration;

    const {
        paypalLabelContainerElement,
        designContainer
    } = designProps;

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
};

export function InlineLogoTextComponent({ designLabelText } : ContentOptions) : ChildType {
    return (
        <Fragment>
            <div class={ 'personalized-label-container' } data-design-experiment="104519"> <span>{designLabelText}</span></div>
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
