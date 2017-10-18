/* @flow */

import { BUTTON_SIZE } from '../constants';

export const BUTTON_STYLE = {

    [ BUTTON_SIZE.TINY ]: {
        width:           75,
        height:          25,
        responsiveMin:   0,
        minWidth:        75,
        maxWidth:        150,
        fontSize:        10,
        largeFontSize:   13,
        logoSize:        14,
        wordmarkSize:    14,
        rectRadius:      4,
        taglineHeight:   0,
        fundingHeight:   0,
        verticalMargin:  8,
        separatorMargin: 3,
        cardLogoSize:    16,
        cardLogoMargin:  3,

        horizontal: {
            logoSize:        15,
            wordmarkSize:    14,
            separatorMargin: 3
        }
    },

    [ BUTTON_SIZE.SMALL ]: {
        width:           150,
        height:          25,
        responsiveMin:   150,
        minWidth:        150,
        maxWidth:        200,
        fontSize:        10,
        largeFontSize:   13,
        logoSize:        17,
        wordmarkSize:    17,
        rectRadius:      4,
        taglineHeight:   15,
        fundingHeight:   30,
        verticalMargin:  8,
        separatorMargin: 6,
        cardLogoSize:    19,
        cardLogoMargin:  2,

        horizontal: {
            logoSize:        16,
            wordmarkSize:    15,
            separatorMargin: 3
        }
    },

    [ BUTTON_SIZE.MEDIUM ]: {
        width:             250,
        height:            35,
        responsiveMin:     200,
        minWidth:          200,
        maxWidth:          300,
        fontSize:          13,
        largeFontSize:     15,
        logoSize:          22,
        wordmarkSize:      22,
        rectRadius:        6,
        taglineHeight:     15,
        fundingHeight:     40,
        verticalMargin:    9,
        separatorMargin:   7,
        fundingLogoSize:   25,
        fundingLogoMargin: 3,
        cardLogoSize:      30,
        cardLogoMargin:    5,

        horizontal: {
            logoSize:        18,
            wordmarkSize:    19,
            separatorMargin: 4
        }
    },

    [ BUTTON_SIZE.LARGE ]: {
        width:             350,
        height:            40,
        responsiveMin:     300,
        minWidth:          300,
        maxWidth:          500,
        fontSize:          14,
        largeFontSize:     18,
        logoSize:          27,
        wordmarkSize:      27,
        rectRadius:        6,
        taglineHeight:     20,
        fundingHeight:     40,
        verticalMargin:    10,
        separatorMargin:   10,
        cardLogoSize:      35,
        cardLogoMargin:    7,
        fundingLogoSize:   30,
        fundingLogoMargin: 5,

        horizontal: {
            logoSize:        27,
            wordmarkSize:    24,
            separatorMargin: 5
        }
    }
};
