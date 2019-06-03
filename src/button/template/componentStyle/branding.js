/* @flow */

import { BUTTON_BRANDING } from '../../../constants';

import { CLASS } from './class';

export const brandingStyle = `

    .${ CLASS.BUTTON }.${ CLASS.BRANDING }-${ BUTTON_BRANDING.UNBRANDED }  {
        min-width: 60%;
        width: auto;
        font-weight: 900;
    }

    .${ CLASS.BUTTON }.${ CLASS.BRANDING }-${ BUTTON_BRANDING.UNBRANDED } .${ CLASS.LOGO } {
        display: none;
    }
`;
