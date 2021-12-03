/* @flow */
import { type ChildType } from 'jsx-pragmatic/src';
import { LOGO_COLOR } from '@paypal/sdk-logos/src';

export type ButtonDesignOutputParams ={|
    buttonDesignContainerClass : string,
    buttonDesignScript : string,
    buttonDesignComponent : ChildType

|};

export type ContentOptions = {|
    designLabelText : string,
    logoColor? : $Values<typeof LOGO_COLOR>
|};
