/* @flow */
import { type ChildType, type ElementNode } from 'jsx-pragmatic/src';

export type ButtonAnimationOutputParams ={|
    buttonAnimationContainerClass : string,
    buttonAnimationScript : string,
    buttonAnimationComponent : ChildType | null
|};

export type ButtonSizeProperties = {|
    min? : number,
    max? : number
|};

type ButtonAnimationCss = {|
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

export type DivideLogoAnimationProps = {|
    paypalLabelContainerElement : ElementNode,
    paypalLogoStartingLeftPosition : string
|};
