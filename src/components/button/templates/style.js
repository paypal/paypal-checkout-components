/* @flow */

import { BUTTON_SIZE } from '../constants';

export const BUTTON_RELATIVE_STYLE = {
    FUNDINGICONS:    100,
    TAGLINE:         50,
    VERTICAL_MARGIN: 30
};

export const BUTTON_STYLE = {

    [ BUTTON_SIZE.TINY ]: {
        defaultWidth:    75,
        defaultHeight:   25,
        minWidth:        75,
        maxWidth:        150,
        minHeight:       25,
        maxHeight:       30,
        allowFunding:    true,
        allowTagline:    false
    },

    [ BUTTON_SIZE.SMALL ]: {
        defaultWidth:    150,
        defaultHeight:   25,
        minWidth:        150,
        maxWidth:        200,
        minHeight:       25,
        maxHeight:       55,
        allowFunding:    true,
        allowTagline:    true
    },

    [ BUTTON_SIZE.MEDIUM ]: {
        defaultWidth:      250,
        defaultHeight:     35,
        minWidth:          200,
        maxWidth:          300,
        minHeight:         35,
        maxHeight:         55,
        allowFunding:      true,
        allowTagline:      true
    },

    [ BUTTON_SIZE.LARGE ]: {
        defaultWidth:      350,
        defaultHeight:     45,
        minWidth:          300,
        maxWidth:          500,
        minHeight:         30,
        maxHeight:         55,
        allowFunding:      true,
        allowTagline:      true
    },

    [ BUTTON_SIZE.HUGE ]: {
        defaultWidth:  500,
        defaultHeight: 55,
        minWidth:      500,
        maxWidth:      750,
        minHeight:     40,
        maxHeight:     55,
        allowFunding:  true,
        allowTagline:  true
    }
};
