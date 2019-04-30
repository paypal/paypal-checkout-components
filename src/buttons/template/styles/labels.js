/* @flow */

import { BUTTON_LABEL, CLASS } from '../../../constants';

export const labelStyle = `

    .${ CLASS.BUTTON }.${ CLASS.LABEL }-${ BUTTON_LABEL.CARD } {
        border-radius: 0 !important;
    }

    .${ CLASS.BUTTON }.${ CLASS.LABEL }-${ BUTTON_LABEL.CREDIT } .${ CLASS.TEXT } {
        display: none !important;
    }

    .${ CLASS.BUTTON } .${ CLASS.VAULT_LABEL } {
        max-width: 60%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
`;
