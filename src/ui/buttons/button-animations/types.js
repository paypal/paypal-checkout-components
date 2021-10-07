/* @flow */
import { type ChildType } from 'jsx-pragmatic/src';

export type ButtonAnimationOutputParams ={|
    animationContainerClass : string,
    animationScript : string,
    animationComponent : ChildType
|};

type ButtonSizeProperties = {|
    min : number,
    max : number
|};

type ButtonAnimationCss ={|
    DOM_READY : string,
    ANIMATION_CONTAINER : string,
    PAYPAL_LOGO : string,
    ANIMATION_LABEL_CONTAINER : string,
    PAYPAL_BUTTON_LABEL : string
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

export type LabelOptions = {|
    animationLabelText : string
|};

export type ButtonAnimationEmptyOutput ={|
    animationContainerClass : null,
    animationScript : null,
    animationComponent : null
|};
