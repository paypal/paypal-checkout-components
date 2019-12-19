/* @flow */

import { FUNDING } from '@paypal/sdk-constants/src';

import { CLASS, ATTRIBUTE } from '../../../constants';

export const labelStyle = `

    .${ CLASS.BUTTON }[${ ATTRIBUTE.FUNDING_SOURCE }=${ FUNDING.CARD }]:not(.${ CLASS.VAULT }) {
        border-radius: 0 !important;
    }

    .${ CLASS.BUTTON } .${ CLASS.VAULT_LABEL } {
        max-width: 60%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
`;
