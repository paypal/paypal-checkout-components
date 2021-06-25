/* @flow */

import { FRAME_NAME } from '../constants';

export const CARD_FIELD_TYPE = {
    SINGLE: 'single',
    NUMBER: 'number',
    CVV:    'cvv',
    EXPIRY: 'expiry'
};

export const CARD_FIELD_TYPE_TO_FRAME_NAME : {| [$Values<typeof CARD_FIELD_TYPE>] : $Values<typeof FRAME_NAME> |} = {
    [ CARD_FIELD_TYPE.SINGLE ]: FRAME_NAME.CARD_FIELD,
    [ CARD_FIELD_TYPE.NUMBER ]: FRAME_NAME.CARD_NUMBER_FIELD,
    [ CARD_FIELD_TYPE.CVV ]:    FRAME_NAME.CARD_CVV_FIELD,
    [ CARD_FIELD_TYPE.EXPIRY ]: FRAME_NAME.CARD_EXPIRY_FIELD
};
