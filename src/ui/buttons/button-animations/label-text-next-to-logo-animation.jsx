/* @flow */
/** @jsx node */
import { LOGO_CLASS } from '@paypal/sdk-logos/src';
import { node, Fragment, type ChildType, type ElementNode } from 'jsx-pragmatic/src';

import { BUTTON_SIZE_STYLE } from '../config';
import { CLASS } from '../../../constants';

import  type { ButtonAnimationOutputParams, LabelOptions } from './types';

export const ANIMATION = {
    ELEMENT:         ('label-next-to-logo-animation-element' : 'label-next-to-logo-animation-element'),
    CONTAINER:       ('label-next-to-logo-animation' : 'label-next-to-logo-animation')
};

function ComponentForAnimation({ animationLabelText } : LabelOptions) : ChildType {
    return (
        <Fragment>
            <span data-animation-experiment="Varied_Button_Design" class={ ANIMATION.ELEMENT }>{animationLabelText}</span>
            <style innerHTML={ `
                .${ CLASS.DOM_READY } .${ ANIMATION.CONTAINER } img.${ LOGO_CLASS.LOGO }{
                    position: relative;
                }
                
                .${ ANIMATION.CONTAINER } .${ ANIMATION.ELEMENT } {
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

const getValidLabelContainer = function (document, configuration) : ElementNode | null {
    const { ANIMATION_CONTAINER, PAYPAL_LABEL_CONTAINER } = configuration.cssStyles;
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
    return paypalLabelContainerElement;
};

const createAnimation = function (animationContainerElement, cssClasses) : void {
    const { ANIMATION_CONTAINER, DOM_READY, PAYPAL_LOGO, ANIMATION_ELEMENT } = cssClasses;
    const animations = `
        .${ DOM_READY } .${ ANIMATION_CONTAINER } img.${ PAYPAL_LOGO }{
            position: fixed;
            left: 0%;
        }

        .${ ANIMATION_CONTAINER } .${ ANIMATION_ELEMENT } {
            position: fixed;
            opacity: 1;
            right:0%;
        }
    `;

    const style = document.createElement('style');
    animationContainerElement.appendChild(style);
    style.appendChild(document.createTextNode(animations));
};


export function setupLabelTextNextToLogoAnimation (animationLabelText : string) : ButtonAnimationOutputParams {
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
    const buttonAnimationScript = `
        const animationContainerElement = ${ getValidLabelContainer.toString() }( document, ${ JSON.stringify(animationConfig) })
        if (animationContainerElement) {
            const animation = ${ createAnimation.toString() }
            animation(animationContainerElement, ${ JSON.stringify(animationConfig.cssStyles) })
        }
    `;
    return {
        buttonAnimationContainerClass:        ANIMATION.CONTAINER,
        buttonAnimationScript,
        buttonAnimationComponent:             (<ComponentForAnimation { ...animationProps } />)
    };
}
