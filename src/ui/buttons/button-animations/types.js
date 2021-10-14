/* @flow */
import { type ChildType, type ElementNode } from 'jsx-pragmatic/src';

export type ButtonAnimationOutputParams ={|
    animationContainerClass : string,
    animationScript : string,
    animationComponent : ChildType | null
|};

export type ButtonSizeProperties = {|
    min? : number,
    max? : number
|};

type ButtonAnimationCss ={|
    DOM_READY : string,
    ANIMATION_CONTAINER : string,
    PAYPAL_LOGO : string,
    ANIMATION_LABEL_CONTAINER : string,
    PAYPAL_BUTTON_LABEL : string
|};

export type ButtonSizes = {|
    large : ButtonSizeProperties,
    huge : ButtonSizeProperties,
    cssClasses : ButtonAnimationCss
|};

export type ButtonAnimation = {|
    params : ButtonSizes,
    fn : Function
|};

export type LabelOptions = {|
    animationLabelText : string
|};

export type ButtonAnimationEmptyOutput ={|
    animationContainerClass : null,
    animationScript : null,
    animationComponent : null
|};

export type ResizeButtonAnimationDomElementPositions = {|
    logoTranslateXPosition : number,
    initialTranslateXTextPosition : number,
    textYposition : number,
    finalTranslateXTextPosition : number,
    paypalLabelContainerElement : ElementNode
|};
