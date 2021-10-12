/* @flow */

import { types } from 'credit-card-type';

import { FRAME_NAME } from '../constants';

import type { FieldStyle, CardType, CardPlaceholder } from './types';

export const CARD_FIELD_TYPE = {
    SINGLE: 'single',
    NUMBER: 'number',
    CVV:    'cvv',
    EXPIRY: 'expiry'
};

export const CARD_ERRORS = {
    INVALID_NUMBER:       ('INVALID_NUMBER' : 'INVALID_NUMBER'),
    INVALID_EXPIRY:       ('INVALID_EXPIRY' : 'INVALID_EXPIRY'),
    INVALID_CVV:          ('INVALID_CVV' : 'INVALID_CVV')
};

export const CARD_FIELD_TYPE_TO_FRAME_NAME : {| [$Values<typeof CARD_FIELD_TYPE>] : $Values<typeof FRAME_NAME> |} = {
    [ CARD_FIELD_TYPE.SINGLE ]: FRAME_NAME.CARD_FIELD,
    [ CARD_FIELD_TYPE.NUMBER ]: FRAME_NAME.CARD_NUMBER_FIELD,
    [ CARD_FIELD_TYPE.CVV ]:    FRAME_NAME.CARD_CVV_FIELD,
    [ CARD_FIELD_TYPE.EXPIRY ]: FRAME_NAME.CARD_EXPIRY_FIELD
};

export const FIELD_STYLE : FieldStyle = {
    height:                  'height',
    width:                   'width',
    color:                   'color',
    border:                  'border',
    borderTop:               'border-top',
    borderLeft:              'border-left',
    borderBottom:            'border-bottom',
    borderRight:             'border-right',
    display:                 'display',
    backgroundColor:         'background-color',
    background:              'background',
    appearance:              'appearance',
    boxShadow:               'box-shadow',
    direction:               'direction',
    font:                    'font',
    fontFamily:              'font-family',
    fontSizeAdjust:          'font-size-adjust',
    fontSize:                'font-size',
    fontStretch:             'font-stretch',
    fontStyle:               'font-style',
    fontVariantAlternates:   'font-variant-alternates',
    fontVariantCaps:         'font-variant-caps',
    fontVariantEastAsian:    'font-variant-east-asian',
    fontVariantLigatures:    'font-variant-ligatures',
    fontVariantNumeric:      'font-variant-numeric',
    fontVariant:             'font-variant',
    fontWeight:              'font-weight',
    letterSpacing:           'letter-spacing',
    lineHeight:              'line-height',
    opacity:                 'opacity',
    outline:                 'outline',
    margin:                  'margin',
    marginTop:               'margin-top',
    marginRight:             'margin-right',
    marginBottom:            'margin-bottom',
    marginLeft:              'margin-left',
    padding:                 'padding',
    paddingTop:              'padding-top',
    paddingRight:            'padding-right',
    paddingBottom:           'padding-bottom',
    paddingLeft:             'padding-left',
    textAlign:               'text-align',
    textShadow:              'text-shadow',
    transition:              'transition'
};

// $FlowFixMe
export const VALIDATOR_TO_TYPE_MAP = {
    [types.AMERICAN_EXPRESS]: 'AMEX',
    [types.DINERS_CLUB]:      'DINERS',
    [types.DISCOVER]:         'DISCOVER',
    [types.ELO]:              'ELO',
    [types.HIPER]:            'HIPER',
    [types.HIPERCARD]:        'HIPERCARD',
    [types.JCB]:              'JCB',
    [types.MASTERCARD]:       'MASTER_CARD',
    [types.MAESTRO]:          'MAESTRO',
    [types.UNIONPAY]:         'CHINA_UNION_PAY',
    [types.VISA]:             'VISA',
    'cb-nationale':           'CB_NATIONALE',
    'cetelem':                'CETELEM',
    'cofidis':                'COFIDIS',
    'cofinoga':               'COFINOGA'
};

export const DEFAULT_CARD_TYPE : CardType = {
    gaps:     [ 4, 8, 12 ],
    lengths:  [ 16 ],
    patterns: [],
    type:     'Unknow',
    niceType: 'Unknow',
    code:     {
        name: 'CVV',
        size: 3
    }
};

export const DEFAULT_INPUT_STYLE : FieldStyle = {
    border:     'none',
    background: 'transparent',
    height:     '100%',
    fontFamily: 'monospace',
    fontSize:   '50vh',
    display:    'inline-block'
};

export const DEFAULT_STYLE = {
    'input':        DEFAULT_INPUT_STYLE,
    'input.number': {
        width:       '60vw',
        marginRight: '2vw'
    },
    'input.cvv': {
        width:       '16vw',
        marginRight: '2vw'
    },
    'input.expiry': {
        width: '20vw'
    }
};
export const DEFAULT_PLACEHOLDERS : CardPlaceholder = {
    number: 'Card number',
    expiry: 'MM/YY',
    cvv:    'CVV'
};
