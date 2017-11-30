/* @flow */

import { BUTTON_LAYOUT, BUTTON_SIZE, BUTTON_STYLE_OPTIONS } from '../../constants';
import { BUTTON_CONFIG, getButtonConfig } from '../config';
import { BUTTON_STYLE } from '../style';

import { componentContent } from './content';

export function validateButtonLocale(locale : string) {

    if (!locale) {
        throw new Error(`Expected props.locale to be set`);
    }

    if (!locale.match(/^[a-z]{2}[_][A-Z][A-Z0-9]$/)) {
        throw new Error(`Expected props.locale to be valid, got ${ locale }`);
    }

    let [ lang, country ] = locale.split('_');

    if (!componentContent[country] || !componentContent[country][lang]) {
        throw new Error(`Expected props.locale to be valid`);
    }
}

// eslint-disable-next-line complexity
export function validateButtonStyle(style : Object = {}) {

    if (!style) {
        throw new Error(`Expected props.style to be set`);
    }

    let label = style[BUTTON_STYLE_OPTIONS.LABEL] || getButtonConfig('DEFAULT', (style[BUTTON_STYLE_OPTIONS.LAYOUT] === BUTTON_LAYOUT.VERTICAL) ? 'defaultVerticalLabel' : 'defaultLabel');

    if (!BUTTON_CONFIG[label]) {
        throw new Error(`Invalid button label: ${ label }, expected: ${ Object.keys(BUTTON_CONFIG[label]).join(', ') }`);
    }

    let {
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

        let minButtons = (layout === BUTTON_LAYOUT.VERTICAL)
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

        let buttonSize = size || getButtonConfig(label, (style.layout === BUTTON_LAYOUT.VERTICAL) ? 'defaultVerticalSize' : 'defaultSize');

        let { minHeight, maxHeight } = (size === BUTTON_SIZE.RESPONSIVE) ? {
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

        if (style[BUTTON_STYLE_OPTIONS.LABEL]) {
            throw new Error(`style.${ BUTTON_STYLE_OPTIONS.LABEL } option is not allowed for ${ BUTTON_LAYOUT.VERTICAL } layout - got ${ label }`);
        }

        if (fundingicons) {
            throw new Error(`style.${ BUTTON_STYLE_OPTIONS.FUNDINGICONS } not allowed for ${ BUTTON_LAYOUT.VERTICAL } layout - got ${ fundingicons }`);
        }

        if (tagline) {
            throw new Error(`style.${ BUTTON_STYLE_OPTIONS.TAGLINE } is not allowed for ${ BUTTON_LAYOUT.VERTICAL } layout - got ${ tagline }`);
        }
    }
}

export function validateButtonProps(props : Object) {

    if (!props) {
        throw new Error(`Expected props`);
    }

    let { locale, style } = props;

    validateButtonLocale(locale);
    validateButtonStyle(style);
}
