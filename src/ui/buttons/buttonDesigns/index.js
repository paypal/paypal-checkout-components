/* @flow */
import { type ChildType } from 'jsx-pragmatic/src';

import { type Personalization } from '../props';

import { getDesignScript } from './script';
import { type ButtonDesignOutputParams } from './types';
import { ControlDesignComponent } from './control';
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
import {
    getSwitchLogoAndShowLabelAnimation,
    getSwitchLogoAndShowLabelProps,
    SWITCH_LOGO_AND_SHOW_LABEL_CONFIG,
    SwitchLogoAndShowLabelTextComponent
} from './switch-logo-and-show-label-text';

const DESIGN_MAP : Object = {
    'run-divide-logo-animation': {
        designFn:              getDivideLogoAnimation,
        getValidDesignProps:   getDivideLogoProps,
        designConfig:          DIVIDE_LOGO_CONFIG,
        ButtonDesignComponent: DivideLogoTextComponent
    },
    'run-add-label-text-next-to-logo-design': {
        designFn:              getInlineLabelTextDesign,
        getValidDesignProps:   getValidInlineLogoTextProps,
        designConfig:          INLINE_LOGO_TEXT_CONFIG,
        ButtonDesignComponent: InlineLogoTextComponent
    },
    'run-switch-logo-show-label-text-design': {
        designFn:              getSwitchLogoAndShowLabelAnimation,
        getValidDesignProps:   getSwitchLogoAndShowLabelProps,
        designConfig:          SWITCH_LOGO_AND_SHOW_LABEL_CONFIG,
        ButtonDesignComponent: SwitchLogoAndShowLabelTextComponent
    },
    'run-switch-logo-show-label-text-once-design': {
        designFn:              getSwitchLogoAndShowLabelAnimation,
        getValidDesignProps:   getSwitchLogoAndShowLabelProps,
        designConfig:          { ...SWITCH_LOGO_AND_SHOW_LABEL_CONFIG, runOnce: true },
        ButtonDesignComponent: SwitchLogoAndShowLabelTextComponent
    }
};

const CONTROL_MAP : Object = {
    'large-button-design-control': '104519',
    'small-button-design-control': '104530'
};

export function getButtonDesign(personalization : ?Personalization, logoColor? : string) : ButtonDesignOutputParams | Object {
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

    // Return fragment with data-design-experiment tag for logging
    if (CONTROL_MAP[designId]) {
        const buttonDesignComponent : ChildType = ControlDesignComponent(CONTROL_MAP[designId]);

        return {
            buttonDesignContainerClass: '',
            buttonDesignScript:         '',
            buttonDesignComponent
        };
    }
    
    if (!DESIGN_MAP[designId]) {
        return {};
    }

    const {
        designFn,
        getValidDesignProps,
        designConfig,
        ButtonDesignComponent
    } = DESIGN_MAP[designId];

    const designContent = { designLabelText, logoColor };
    const buttonDesignScript : string = getDesignScript(designFn, getValidDesignProps, designConfig);
    const buttonDesignComponent : ChildType = ButtonDesignComponent(designContent);

    return {
        buttonDesignContainerClass: 'personalized-design-container',
        buttonDesignScript,
        buttonDesignComponent
    };
}
