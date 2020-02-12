/* @flow */
import { WALLET_SIZE } from './constants/wallet';

export const WALLET_SIZE_STYLE = {
    
    [ WALLET_SIZE.SMALL ]: {
        defaultWidth:    300,
        defaultHeight:   40,
        minWidth:        300,
        maxWidth:        400,
        minHeight:       40,
        maxHeight:       50
    },
    
    [ WALLET_SIZE.MEDIUM ]: {
        defaultWidth:    400,
        defaultHeight:   50,
        minWidth:        400,
        maxWidth:        500,
        minHeight:       50,
        maxHeight:       60
    },
    
    [ WALLET_SIZE.LARGE ]: {
        defaultWidth:      500,
        defaultHeight:     60,
        minWidth:          500,
        maxWidth:          600,
        minHeight:         60,
        maxHeight:         70
    }
};
