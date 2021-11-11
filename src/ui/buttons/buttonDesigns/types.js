/* @flow */
import { type ElementNode, type ChildType } from 'jsx-pragmatic/src';

export type ButtonDesignOutputParams ={|
    buttonDesignContainerClass : string,
    buttonDesignScript : string,
    buttonDesignComponent : ChildType

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
    designLabelText : string
|};

export 
