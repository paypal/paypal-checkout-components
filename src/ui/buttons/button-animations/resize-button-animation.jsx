/* @flow */
/** @jsx node */
import { LOGO_CLASS } from '@paypal/sdk-logos/src';
import { node, Fragment, type ChildType } from 'jsx-pragmatic/src';

import { BUTTON_SIZE_STYLE } from '../config';
import { CLASS } from '../../../constants';

import { type LabelOptions, type ButtonAnimationOutputParams, type ButtonSizeProperties } from './types';

type ButtonAnimationCss ={|
    ANIMATION_CONTAINER : string,
    BUTTON_LABEL : string,
    LOGO_CLASS_LOGO : string
|};

type ButtonSizes = {|
    large : ButtonSizeProperties,
    huge : ButtonSizeProperties,
    cssClasses : ButtonAnimationCss
|};

export type ButtonAnimation = {|
    params : ButtonSizes,
    fn : Function
|};

export const ANIMATION = {
    CONTAINER:       ('resize-button-animation' : 'resize-button-animation'),
    LABEL_CONTAINER: ('label-text-resize-button-animation' : 'label-text-resize-button-animation')
};

function LabelForAnimation({ animationLabelText } : LabelOptions) : ChildType {
    const config = {
        labelText:  animationLabelText,
        labelClass:  ANIMATION.CONTAINER
    };

    return (
        <Fragment>
            <div class={ `${ config.labelClass }-left` } />
            <div class={ `${ config.labelClass }-text` }>{config.labelText}</div>
            <div class={ `${ config.labelClass }-right` } />
        </Fragment>
    );
}

function getAnimationParameters() : ButtonSizes {
    return {
        large:      {
            min: BUTTON_SIZE_STYLE.large.minWidth,
            max: BUTTON_SIZE_STYLE.large.maxWidth
        },
        huge:       {
            min: BUTTON_SIZE_STYLE.huge.minWidth,
            max: BUTTON_SIZE_STYLE.huge.maxWidth
        },
        cssClasses: {
            ANIMATION_CONTAINER:       ANIMATION.CONTAINER,
            BUTTON_LABEL:              CLASS.BUTTON_LABEL,
            LOGO_CLASS_LOGO:                 LOGO_CLASS.LOGO
        }
    };
}

const getAnimationPositions = function (document, config) : void {
    const { large, huge, cssClasses  } = config;
    const { ANIMATION_CONTAINER, BUTTON_LABEL, LOGO_CLASS_LOGO } = cssClasses;

    const animationContainerElement = document && document.querySelector(`.${ ANIMATION_CONTAINER }`);

    if (!animationContainerElement) {
        return null;
    }
    
    const buttonWidth = animationContainerElement.offsetWidth;

    if (buttonWidth < large.min || buttonWidth > huge.max) {
        let animationElement = animationContainerElement.querySelector(`.${ ANIMATION_CONTAINER }-left`);
        if (animationElement) {
            animationElement.remove();
        }
        animationElement = animationContainerElement.querySelector(`.${ ANIMATION_CONTAINER }-right`);
        if (animationElement) {
            animationElement.remove();
        }
        animationElement = animationContainerElement.querySelector(`.${ ANIMATION_CONTAINER }-text`);
        if (animationElement) {
            animationElement.remove();
        }
        return null;
    }

    const paypalLabelContainer = animationContainerElement && animationContainerElement.querySelector(`.${ BUTTON_LABEL }`);
    const logoElement = paypalLabelContainer.querySelector(`.${ LOGO_CLASS_LOGO }`);
    const leftElement = animationContainerElement.querySelector(`.${ ANIMATION_CONTAINER }-left`);
    const leftStartPositionX =  leftElement ? parseInt(leftElement.getBoundingClientRect().left, 10) : 0;
    const rightElement = paypalLabelContainer.querySelector(`.${ ANIMATION_CONTAINER }-right`);
    const rightStartPositionX = rightElement ? parseInt(rightElement.getBoundingClientRect().left, 10) : 0;
    const mainContainerWidth = animationContainerElement.offsetWidth;
    const logoContainerWidthSize = ((mainContainerWidth * 35) / 100);
    const logoSizeRemaining = (logoContainerWidthSize - logoElement.offsetWidth) / 2;
    const logoTranslateXSize = (buttonWidth / 2) - logoSizeRemaining;
    const paypalLabelContainerTopPosition = (paypalLabelContainer && paypalLabelContainer.getBoundingClientRect().top) || 0;
    const transLateYposition = paypalLabelContainerTopPosition ? Math.round(paypalLabelContainerTopPosition) : 0;
    const buttonHeight = 55;

    return {
        buttonHeight,
        buttonWidth,
        rightStartPositionX,
        transLateYposition,
        leftStartPositionX,
        logoContainerWidthSize,
        logoTranslateXSize,
        leftSiseWidth: mainContainerWidth,
        paypalLabelContainer
    };
    
};

const createAnimation = function (params, cssClasses) : void {
    const { buttonHeight, buttonWidth, leftStartPositionX, rightStartPositionX, transLateYposition, logoContainerWidthSize, logoTranslateXSize, leftSiseWidth, paypalLabelContainer } = params;
    const { ANIMATION_CONTAINER, BUTTON_LABEL, LOGO_CLASS_LOGO } = cssClasses;
    
    const keyFrameAnimations = `
        .${ ANIMATION_CONTAINER } .${ ANIMATION_CONTAINER }-right,
        .${ ANIMATION_CONTAINER } .${ ANIMATION_CONTAINER }-left,
        .${ ANIMATION_CONTAINER } .${ ANIMATION_CONTAINER }-text,
        .${ ANIMATION_CONTAINER } .${ BUTTON_LABEL }  img.${ LOGO_CLASS_LOGO } {
            position: absolute;
        }

        .${ ANIMATION_CONTAINER } .${ ANIMATION_CONTAINER }-right {
            height: ${ buttonHeight }px;
            width: ${ buttonWidth }px;
            background: rgb(27,49,138);
            transform: translate(-${ rightStartPositionX }px, -${ transLateYposition  }px);
            z-index: 8;
            border-radius: 8px 0 0px 8px;
        }

        .${ ANIMATION_CONTAINER } .${ ANIMATION_CONTAINER }-left {
            height: ${ buttonHeight }px;
            background: rgb(255, 196, 57);
            width: ${ buttonWidth }px;
            transform: translate(-${ leftStartPositionX }px, -${ transLateYposition }px);
            z-index: 9;
            animation: 1s left-animate 1s ease-in-out forwards;
            border-radius: 3px;
        }

        .${ ANIMATION_CONTAINER } .${ ANIMATION_CONTAINER }-text {
            opacity:0;
            color:  rgb(255, 196, 57);
            z-index: 9;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-size: 16px;
            animation: 1s text-animate 1s ease-in-out forwards;
            right: 0;
            left: ${ logoContainerWidthSize }px;
            text-align: center;
        }

        .${ ANIMATION_CONTAINER } .${ BUTTON_LABEL } img.${ LOGO_CLASS_LOGO } {
            transform: translateX(-50%);
            z-index: 10;
            animation: 1s  move-logo-to-left-side 1s ease-in-out forwards;
        }

        @keyframes move-logo-to-left-side{
            100%{
                transform: translateX(-${ logoTranslateXSize }px);
            }
        }

        @keyframes left-animate{
            0%{
                background: rgb(255, 196, 57);
                width: ${ leftSiseWidth }px;
                border-radius: 3px;
            }

            10%{
                background: rgb(255, 196, 57);
                width: ${ leftSiseWidth }px;
                border-radius: 0 15px 15px 0;
            }
            
            100%{
                background-color:rgb(255, 196, 57);
                width: ${ logoContainerWidthSize }px;
                border-radius: 0 15px 15px 0;
            }
        }

        @keyframes text-animate{
            0%{
                color: rgb(255, 196, 57);
                opacity: 0;
            }
            50%{
                color: rgb(255, 196, 57);
                opacity: 0;
            }
            80%{
                color:rgb(27,49,138);
                opacity: 0;
            }
            100%{
                opacity: 1;
                color: white;
            }
        }
    `;
    const style = document.createElement('style');
    paypalLabelContainer.appendChild(style);
    style.type = 'text/css';
    style.appendChild(document.createTextNode(keyFrameAnimations));
};


export function setupResizeButtonAnimation (animationLabelText : string) : ButtonAnimationOutputParams {
    let animationScript = '';
    const animationProps = { animationLabelText };
    const configParameters = getAnimationParameters();
  
    animationScript = `
        const positionsForAnimation = ${ getAnimationPositions.toString() }(document,${ JSON.stringify(configParameters) });
        if (positionsForAnimation) {
            const animationFn =${ createAnimation.toString() }
            animationFn(positionsForAnimation, ${ JSON.stringify(configParameters.cssClasses) });
        }
    `;

    return {
        animationContainerClass: ANIMATION.CONTAINER,
        animationScript,
        animationComponent:      (<LabelForAnimation { ...animationProps } />)
    };
}
