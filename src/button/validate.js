/* @flow */

import { BUTTON_LABEL, BUTTON_LAYOUT, BUTTON_SIZE, BUTTON_STYLE_OPTIONS, ALLOWED_INSTALLMENT_COUNTRIES, ALLOWED_INSTALLMENT_PERIOD, LOCALE } from '../constants';

import { BUTTON_CONFIG, BUTTON_STYLE, getButtonConfig } from './config';

export function validateButtonLocale(locale : string) {

    if (!locale) {
        throw new Error(`Expected props.locale to be set`);
    }

    if (!locale.match(/^[a-z]{2}[_][A-Z][A-Z0-9]$/)) {
        throw new Error(`Expected props.locale to be valid, got ${ locale }`);
    }

    const [ lang, country ] = locale.split('_');

    if (!LOCALE[country] || LOCALE[country].indexOf(lang) === -1) {
        throw new Error(`Expected props.locale to be valid`);
    }
}

export function validateRegionSpecificButton(style : Object = {}, locale : string = 'en_US') {

    const country = locale.split('_')[1];

    const isInstallmentAllowedCountry = ALLOWED_INSTALLMENT_COUNTRIES.indexOf(country) !== -1;

    if (!isInstallmentAllowedCountry && style.label === BUTTON_LABEL.INSTALLMENT) {
        throw new Error(`Unexpected label: style.${ style.label } for country: ${ country }`);
    }

    if (!isInstallmentAllowedCountry && style[BUTTON_STYLE_OPTIONS.INSTALLMENTPERIOD]) {
        throw new Error(`style.${ BUTTON_STYLE_OPTIONS.INSTALLMENTPERIOD } is invalid for country: ${ country }`);
    }

    if (isInstallmentAllowedCountry && style[BUTTON_STYLE_OPTIONS.INSTALLMENTPERIOD] && style.label !== BUTTON_LABEL.INSTALLMENT) {
        throw new Error(`style.${ BUTTON_STYLE_OPTIONS.INSTALLMENTPERIOD } is invalid for label: style.${ style.label }`);
    }

    if (isInstallmentAllowedCountry && style.label === BUTTON_LABEL.INSTALLMENT && style[BUTTON_STYLE_OPTIONS.INSTALLMENTPERIOD]
        && typeof style[BUTTON_STYLE_OPTIONS.INSTALLMENTPERIOD] !== 'number') {
        throw new Error(`style.${ BUTTON_STYLE_OPTIONS.INSTALLMENTPERIOD } is expected to be a number`);
    }

    if (isInstallmentAllowedCountry && style.label === BUTTON_LABEL.INSTALLMENT && style[BUTTON_STYLE_OPTIONS.INSTALLMENTPERIOD]
        && ALLOWED_INSTALLMENT_PERIOD[country].indexOf(style[BUTTON_STYLE_OPTIONS.INSTALLMENTPERIOD]) === -1) {
        throw new Error(`style.${ BUTTON_STYLE_OPTIONS.INSTALLMENTPERIOD }: ${ style[BUTTON_STYLE_OPTIONS.INSTALLMENTPERIOD] } is not a valid installment number for ${ style.label }`);
    }

}

export function validateButtonStyle(style : Object = {}, props : Object) {

    if (!style) {
        throw new Error(`Expected props.style to be set`);
    }

    const label = style[BUTTON_STYLE_OPTIONS.LABEL] || getButtonConfig('DEFAULT', (style[BUTTON_STYLE_OPTIONS.LAYOUT] === BUTTON_LAYOUT.VERTICAL) ? 'defaultVerticalLabel' : 'defaultLabel');

    if (!BUTTON_CONFIG[label]) {
        throw new Error(`Invalid button label: ${ label }, expected: ${ Object.keys(BUTTON_CONFIG[label]).join(', ') }`);
    }

    const {
        [ BUTTON_STYLE_OPTIONS.COLOR ]:        color,
        [ BUTTON_STYLE_OPTIONS.SHAPE ]:        shape,
        [ BUTTON_STYLE_OPTIONS.SIZE ]:         size,
        [ BUTTON_STYLE_OPTIONS.BRANDING ]:     branding,
        [ BUTTON_STYLE_OPTIONS.FUNDINGICONS ]: fundingicons,
        [ BUTTON_STYLE_OPTIONS.TAGLINE ]:      tagline,
        [ BUTTON_STYLE_OPTIONS.LAYOUT ]:       layout,
        [ BUTTON_STYLE_OPTIONS.MAXBUTTONS ]:   maxbuttons,
        [ BUTTON_STYLE_OPTIONS.HEIGHT ]:       height
    } = style;

    if (color && getButtonConfig(label, 'colors').indexOf(color) === -1) {
        throw new Error(`Unexpected style.${ BUTTON_STYLE_OPTIONS.COLOR } for ${ label } button: ${ color }, expected ${ getButtonConfig(label, 'colors').join(', ') }`);
    }

    if (shape && getButtonConfig(label, 'shapes').indexOf(shape) === -1) {
        throw new Error(`Unexpected style.${ BUTTON_STYLE_OPTIONS.SHAPE } for ${ label } button: ${ shape }, expected ${ getButtonConfig(label, 'shapes').join(', ') }`);
    }

    if (size && getButtonConfig(label, 'sizes').indexOf(size) === -1) {
        throw new Error(`Unexpected style.${ BUTTON_STYLE_OPTIONS.SIZE } for ${ label } button: ${ size }, expected ${ getButtonConfig(label, 'sizes').join(', ') }`);
    }

    if (branding === false) {
        throw new Error(`style.${ BUTTON_STYLE_OPTIONS.BRANDING }:false is not allowed`);
    }

    if (fundingicons && !getButtonConfig(label, 'allowFundingIcons')) {
        throw new Error(`style.${ BUTTON_STYLE_OPTIONS.FUNDINGICONS }:true is not allowed for ${ label } button`);
    }

    if (layout && getButtonConfig(label, 'layouts').indexOf(layout) === -1) {
        throw new Error(`Unexpected style.${ BUTTON_STYLE_OPTIONS.LAYOUT } for ${ label } button: ${ layout }, expected ${ getButtonConfig(label, 'layouts').join(', ') }`);
    }

    if (maxbuttons !== undefined) {
        if (typeof maxbuttons !== 'number') {
            throw new TypeError(`Expected style.${ BUTTON_STYLE_OPTIONS.MAXBUTTONS } to be a number, got: ${ maxbuttons }`);
        }

        if (maxbuttons < 1) {
            throw new Error(`Expected style.${ BUTTON_STYLE_OPTIONS.MAXBUTTONS } to be a at least 1, got: ${ maxbuttons }`);
        }

        const minButtons = (layout === BUTTON_LAYOUT.VERTICAL)
            ? getButtonConfig(label, 'minVerticalButtons')
            : getButtonConfig(label, 'minHorizontalButtons');

        if (maxbuttons < minButtons) {
            throw new Error(`Expected style.${ BUTTON_STYLE_OPTIONS.MAXBUTTONS } to be no fewer than ${ minButtons }, got ${ maxbuttons }`);
        }
    }

    if (height !== undefined) {
        if (typeof height !== 'number') {
            throw new TypeError(`Expected style.${ BUTTON_STYLE_OPTIONS.HEIGHT } to be a number, got: ${ maxbuttons }`);
        }

        const buttonSize = size || getButtonConfig(label, (style.layout === BUTTON_LAYOUT.VERTICAL) ? 'defaultVerticalSize' : 'defaultSize');

        const { minHeight, maxHeight } = (size === BUTTON_SIZE.RESPONSIVE) ? {
            minHeight: BUTTON_STYLE[BUTTON_SIZE.SMALL].minHeight,
            maxHeight: BUTTON_STYLE[BUTTON_SIZE.HUGE].maxHeight
        } : BUTTON_STYLE[buttonSize];

        if (height < minHeight || height > maxHeight) {
            throw new Error(`Expected style.${ BUTTON_STYLE_OPTIONS.HEIGHT } to be between ${ minHeight }px and ${ maxHeight }px - got ${ height }px`);
        }
    }

    if (!getButtonConfig(label, 'allowPrimary')) {
        throw new Error(`${ label } can not be used as primary button label`);
    }

    if (layout === BUTTON_LAYOUT.VERTICAL) {

        if (size && [ BUTTON_SIZE.MEDIUM, BUTTON_SIZE.LARGE, BUTTON_SIZE.RESPONSIVE ].indexOf(size) === -1) {
            throw new Error(`Button must be at least ${ BUTTON_SIZE.MEDIUM } size for ${ BUTTON_LAYOUT.VERTICAL } layout`);
        }

        if (!getButtonConfig(label, 'allowPrimaryVertical')) {
            throw new Error(`style.${ BUTTON_STYLE_OPTIONS.LABEL } option is not allowed for ${ BUTTON_LAYOUT.VERTICAL } layout - got ${ label }`);
        }

        if (fundingicons) {
            throw new Error(`style.${ BUTTON_STYLE_OPTIONS.FUNDINGICONS } not allowed for ${ BUTTON_LAYOUT.VERTICAL } layout - got ${ fundingicons }`);
        }

        if (tagline) {
            throw new Error(`style.${ BUTTON_STYLE_OPTIONS.TAGLINE } is not allowed for ${ BUTTON_LAYOUT.VERTICAL } layout - got ${ tagline }`);
        }
    }

    validateRegionSpecificButton(style, props.locale);
}

export function validateButtonProps(props : Object) {

    if (!props) {
        throw new Error(`Expected props`);
    }

    const { locale, style } = props;

    validateButtonLocale(locale);
    validateButtonStyle(style, props);
}
