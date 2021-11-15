/* @flow */
import { type ChildType } from 'jsx-pragmatic/src';

import { type Personalization } from '../props';

import { getDesignScript } from './script';
import { type ButtonDesignOutputParams } from './types';
import {
    getDivideLogoAnimation,
    getDivideLogoProps,
    DIVIDE_LOGO_CONFIG,
    DivideLogoTextComponent
} from './divideLogoAnimation';
import {
    getInlineLabelTextDesign,
    getValidInlineLogoTextProps,
    INLINE_LOGO_TEXT_CONFIG,
    InlineLogoTextComponent
} from './inlineLogoTextDesign';

const DESIGN_MAP : Object = {
    'run-divide-logo-animation': {
        designFn:              getDivideLogoAnimation,
        getValidDesignProps:   getDivideLogoProps,
        designConfig:          DIVIDE_LOGO_CONFIG,
        ButtonDesignComponent: DivideLogoTextComponent
    },
    'run-add-label-text-next-to-logo-animation': {
        designFn:              getInlineLabelTextDesign,
        getValidDesignProps:   getValidInlineLogoTextProps,
        designConfig:          INLINE_LOGO_TEXT_CONFIG,
        ButtonDesignComponent: InlineLogoTextComponent
    }
};

export function getButtonDesign(personalization : ?Personalization) : ButtonDesignOutputParams | Object {

    // check valid personalization
    if (
        __WEB__
        || !personalization
        || typeof personalization !== 'object'
        || !personalization.buttonDesign
    )  {
        return {};
    }
    
    const {
        buttonDesign: {
            id: designId = '',
            text: designLabelText = 'Safe and easy way to pay'
        } = {}
    } = personalization;

    if (!DESIGN_MAP[designId]) {
        return {};
    }

    const {
        designFn,
        getValidDesignProps,
        designConfig,
        ButtonDesignComponent
    } = DESIGN_MAP[designId];

    const designContent = { designLabelText };
    const buttonDesignScript : string = getDesignScript(designFn, getValidDesignProps, designConfig);
    const buttonDesignComponent : ChildType = ButtonDesignComponent(designContent);
    return {
        buttonDesignContainerClass: 'personalized-design-container',
        buttonDesignScript,
        buttonDesignComponent
    };
}
