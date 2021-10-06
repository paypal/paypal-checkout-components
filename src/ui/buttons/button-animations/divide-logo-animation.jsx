/* @flow */
/** @jsx node */
import { LOGO_CLASS } from '@paypal/sdk-logos/src';

import { node, Fragment, type ElementNode } from 'jsx-pragmatic/src';

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

export const ANIMATION = {
    LABEL_CONTAINER: ('divide-logo-animation-label-container' : 'divide-logo-animation-label-container'),
    CONTAINER:       ('divide-logo-animation' : 'divide-logo-animation')
};

export function LabelForDivideLogoAnimation({ animationLabelText }) : ElementNode {
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

export function createDivideLogoAnimation() : ButtonAnimation {
    const animation = (params) : void => {
        const { ANIMATION_LABEL_CONTAINER, ANIMATION_CONTAINER, DOM_READY, PAYPAL_LOGO, PAYPAL_BUTTON_LABEL } = params.cssClasses;
        const animationContainer = document && document.querySelector(`.${ ANIMATION_CONTAINER }`);
        const paypalLabelContainerElement = animationContainer && animationContainer.querySelector(`.${ PAYPAL_BUTTON_LABEL }`);

        if (!animationContainer) {
            return;
        }

        let marginPaypalLabelContainer = document.defaultView.getComputedStyle(paypalLabelContainerElement).getPropertyValue('margin-left');
        marginPaypalLabelContainer = marginPaypalLabelContainer ? parseInt(marginPaypalLabelContainer.replace('px', ''), 10) : 0;
        
        const logoElement = paypalLabelContainerElement.querySelector(`.${ PAYPAL_LOGO }`);
        const logoElementLeftPosition = logoElement ? logoElement.getBoundingClientRect().left : 0;
        const logoFinalPosition = logoElementLeftPosition - marginPaypalLabelContainer;

        const paypalLabelContainerElementWith  = paypalLabelContainerElement.offsetWidth;
        const textElementWidth = paypalLabelContainerElement.querySelector('span').offsetWidth;
        const initialTextXposition = (paypalLabelContainerElementWith - textElementWidth) / 2;
        const finalTextXPosition = (paypalLabelContainerElementWith - textElementWidth);

        const animations = `
            .${ DOM_READY } .${ ANIMATION_CONTAINER } img.${ PAYPAL_LOGO }{
                animation: 1s divide-logo-animation-left-side 2s forwards;
            }
            
            .${ ANIMATION_CONTAINER } .${ ANIMATION_LABEL_CONTAINER } {
                animation: 1s divide-logo-animation-right-side 2s forwards;
            }

            @keyframes divide-logo-animation-left-side {
                100% {
                    transform: translateX(-${ logoFinalPosition }px);
                }
            }
            
            @keyframes divide-logo-animation-right-side {
                0%{
                    opacity: 0;
                    transform: translate(${ initialTextXposition }px,-22px);
                }
                100% {
                    opacity: 1;
                    transform: translate(${ finalTextXPosition }px,-22px);
                }
            }
        `;
        const style = document.createElement('style');
        paypalLabelContainerElement.appendChild(style);
        style.type = 'text/css';
        style.appendChild(document.createTextNode(animations));
    };
    
    return {
        'params': {
            large:      { min: BUTTON_SIZE_STYLE.large.minWidth, max: BUTTON_SIZE_STYLE.large.maxWidth },
            huge:       { min: BUTTON_SIZE_STYLE.huge.minWidth, max: BUTTON_SIZE_STYLE.huge.maxWidth },
            cssClasses: {
                DOM_READY:                  CLASS.DOM_READY,
                ANIMATION_CONTAINER:         ANIMATION.CONTAINER,
                PAYPAL_LOGO:                LOGO_CLASS.LOGO,
                ANIMATION_LABEL_CONTAINER:        ANIMATION.LABEL_CONTAINER,
                PAYPAL_BUTTON_LABEL:        CLASS.BUTTON_LABEL
            }
        },
        'fn': animation
    };
}

export function setupAnimation (animationLabelText : string) : void {
    let animationScript = '';
    const animationProps = { animationLabelText };
    const animation = createDivideLogoAnimation();
    const { params, fn } = animation;

    if (!params || !fn) {
        animationScript = '';
    } else {
        animationScript = `
            const animation = ${ fn.toString() }
            animation(${ JSON.stringify(params) })
        `;
    }

    return {
        animationContainerClass: ANIMATION.CONTAINER,
        animationScript,
        animationComponent:            (<LabelForDivideLogoAnimation { ...animationProps } />)
    };
}
