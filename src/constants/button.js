/* @flow */

import type { Enum } from '../types';

type BUTTON_STYLE_OPTIONS_ENUM =
    Enum<'label' | 'size' | 'shape' | 'color' | 'layout' |
    'fundingicons' | 'maxbuttons' | 'branding' | 'tagline' | 'height' | 'installmentperiod'>;

export const BUTTON_STYLE_OPTIONS : BUTTON_STYLE_OPTIONS_ENUM = {
    LABEL:              'label',
    SIZE:               'size',
    SHAPE:              'shape',
    COLOR:              'color',
    LAYOUT:             'layout',
    MAXBUTTONS:         'maxbuttons',
    FUNDINGICONS:       'fundingicons',
    BRANDING:           'branding',
    TAGLINE:            'tagline',
    HEIGHT:             'height',
    INSTALLMENTPERIOD:  'installmentperiod'
};

type BUTTON_LABEL_ENUM =
    Enum<'paypal' | 'checkout' | 'pay' | 'credit' |
    'card' | 'buynow' | 'installment' | 'venmo' | 'itau' | 'ideal' | 'elv' | 'bancontact' | 'giropay' | 'sofort' | 'eps' | 'mybank' | 'p24' | 'blik' | 'maxima' | 'boleto' | 'oxxo' | 'mercadopago'>;

export const BUTTON_LABEL : BUTTON_LABEL_ENUM = {
    PAYPAL:       'paypal',
    CHECKOUT:     'checkout',
    PAY:          'pay',
    CREDIT:       'credit',
    CARD:         'card',
    BUYNOW:       'buynow',
    INSTALLMENT:  'installment',
    VENMO:        'venmo',
    ITAU:         'itau',
    IDEAL:        'ideal',
    ELV:          'elv',
    BANCONTACT:   'bancontact',
    GIROPAY:      'giropay',
    SOFORT:       'sofort',
    EPS:          'eps',
    MYBANK:       'mybank',
    P24:          'p24',
    BLIK:         'blik',
    MAXIMA:       'maxima',
    BOLETO:       'boleto',
    OXXO:         'oxxo',
    MERCADOPAGO:  'mercadopago'
};

type BUTTON_COLOR_ENUM =
    Enum<'gold' | 'blue' | 'silver' | 'black' | 'darkblue' | 'transparent' | 'white'>;

export const BUTTON_COLOR : BUTTON_COLOR_ENUM = {
    GOLD:        'gold',
    BLUE:        'blue',
    SILVER:      'silver',
    BLACK:       'black',
    DARKBLUE:    'darkblue',
    WHITE:       'white',
    TRANSPARENT: 'transparent'
};

type BUTTON_LOGO_COLOR_ENUM =
    Enum<'blue' | 'white' | 'black' | 'any'>;

export const BUTTON_LOGO_COLOR : BUTTON_LOGO_COLOR_ENUM = {
    BLUE:  'blue',
    WHITE: 'white',
    BLACK: 'black',
    ANY:   'any'
};

type BUTTON_SIZE_ENUM =
    Enum<'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'responsive'>;

export const BUTTON_SIZE : BUTTON_SIZE_ENUM = {
    TINY:       'tiny',
    SMALL:      'small',
    MEDIUM:     'medium',
    LARGE:      'large',
    HUGE:       'huge',
    RESPONSIVE: 'responsive'
};

type BUTTON_TAGLINE_COLOR_ENUM =
    Enum<'black' | 'blue'>;

export const BUTTON_TAGLINE_COLOR : BUTTON_TAGLINE_COLOR_ENUM = {
    BLACK: 'black',
    BLUE:  'blue'
};

type BUTTON_SHAPE_ENUM =
    Enum<'pill' | 'rect'>;

export const BUTTON_SHAPE : BUTTON_SHAPE_ENUM = {
    PILL: 'pill',
    RECT: 'rect'
};

type BUTTON_BRANDING_ENUM =
    Enum<'branded' | 'unbranded'>;

export const BUTTON_BRANDING : BUTTON_BRANDING_ENUM = {
    BRANDED:   'branded',
    UNBRANDED: 'unbranded'
};

type BUTTON_LAYOUT_ENUM =
    Enum<'horizontal' | 'vertical'>;

export const BUTTON_LAYOUT : BUTTON_LAYOUT_ENUM = {
    HORIZONTAL: 'horizontal',
    VERTICAL:   'vertical'
};

type BUTTON_NUMBER_ENUM =
    Enum<'single' | 'multiple'>;

export const BUTTON_NUMBER : BUTTON_NUMBER_ENUM = {
    SINGLE:   'single',
    MULTIPLE: 'multiple'
};

type BUTTON_LOGO_ENUM =
    Enum<'pp' | 'paypal' | 'venmo' | 'itau' | 'credit' | 'ideal' | 'elv' | 'bancontact' | 'giropay' | 'sofort' | 'eps' | 'mybank' | 'p24' | 'blik' | 'maxima' | 'boleto' | 'oxxo' | 'mercadopago'>;

export const BUTTON_LOGO : BUTTON_LOGO_ENUM = {
    PP:           'pp',
    PAYPAL:       'paypal',
    VENMO:        'venmo',
    ITAU:         'itau',
    CREDIT:       'credit',
    IDEAL:        'ideal',
    ELV:          'elv',
    BANCONTACT:   'bancontact',
    GIROPAY:      'giropay',
    SOFORT:       'sofort',
    EPS:          'eps',
    MYBANK:       'mybank',
    P24:          'p24',
    BLIK:         'blik',
    MAXIMA:       'maxima',
    BOLETO:       'boleto',
    OXXO:         'oxxo',
    MERCADOPAGO:  'mercadopago'
};
