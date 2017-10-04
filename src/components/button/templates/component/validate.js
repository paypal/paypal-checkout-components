/* @flow */

import { BUTTON_LAYOUT, BUTTON_SIZE, BUTTON_STYLE_OPTIONS } from '../../constants';
import { BUTTON_CONFIG, getButtonConfig } from '../config';

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
        throw new Error(`Invalid button label: ${ label }`);
    }

    let {
        [ BUTTON_STYLE_OPTIONS.COLOR ]:        color,
        [ BUTTON_STYLE_OPTIONS.SHAPE ]:        shape,
        [ BUTTON_STYLE_OPTIONS.SIZE ]:         size,
        [ BUTTON_STYLE_OPTIONS.BRANDING ]:     branding,
        [ BUTTON_STYLE_OPTIONS.FUNDINGICONS ]: fundingicons,
        [ BUTTON_STYLE_OPTIONS.TAGLINE ]:      tagline,
        [ BUTTON_STYLE_OPTIONS.LAYOUT ]:       layout,
        [ BUTTON_STYLE_OPTIONS.MAXBUTTONS ]:   max
    } = style;

    if (color && getButtonConfig(label, 'colors').indexOf(color) === -1) {
        throw new Error(`Unexpected color for ${ label } button: ${ color }`);
    }

    if (shape && getButtonConfig(label, 'shapes').indexOf(shape) === -1) {
        throw new Error(`Unexpected shape for ${ label } button: ${ shape }`);
    }

    if (size && getButtonConfig(label, 'sizes').indexOf(size) === -1) {
        throw new Error(`Unexpected size for ${ label } button: ${ size }`);
    }

    if (branding === false) {
        throw new Error(`Unexpected branding=false for ${ label } button`);
    }

    if (fundingicons && !getButtonConfig(label, 'allowFundingIcons')) {
        throw new Error(`Unexpected fundingicons=true for ${ label } button`);
    }

    if (tagline === true) {
        throw new Error(`Unexpected tagline=true for ${ label } button`);
    }

    if (layout && getButtonConfig(label, 'layouts').indexOf(layout) === -1) {
        throw new Error(`Unexpected layout for ${ label } button: ${ layout }`);
    }

    if (typeof max !== 'undefined') {
        if (typeof max !== 'number') {
            throw new TypeError(`Expected max to be a number, got ${ max }`);
        }

        if (max < 1) {
            throw new Error(`Expected max to be a at least 1, got ${ max }`);
        }

        let minButtons = (layout === BUTTON_LAYOUT.VERTICAL)
            ? getButtonConfig(label, 'minVerticalButtons')
            : getButtonConfig(label, 'minHorizontalButtons');

        if (max < minButtons) {
            throw new Error(`Expected max to be no fewer than ${ minButtons }, got ${ max }`);
        }

        let maxButtons = (layout === BUTTON_LAYOUT.VERTICAL)
            ? getButtonConfig(label, 'maxVerticalButtons')
            : getButtonConfig(label, 'maxHorizontalButtons');

        if (max > maxButtons) {
            throw new Error(`Expected max to be no greater than ${ maxButtons }, got ${ max }`);
        }
    }

    if (!getButtonConfig(label, 'allowPrimary')) {
        throw new Error(`${ label } can not be used as primary button label`);
    }

    if (layout === BUTTON_LAYOUT.VERTICAL) {
        if (!getButtonConfig(label, 'allowPrimaryVertical')) {
            throw new Error(`${ label } can not be used as primary vertical button label`);
        }

        if (fundingicons === true) {
            throw new Error(`No fundingicons allowed for ${ BUTTON_LAYOUT.VERTICAL } layout`);
        }

        if (size && [ BUTTON_SIZE.MEDIUM, BUTTON_SIZE.LARGE, BUTTON_SIZE.RESPONSIVE ].indexOf(size) === -1) {
            throw new Error(`Button must be at least ${ BUTTON_SIZE.MEDIUM } size for ${ BUTTON_LAYOUT.VERTICAL } layout`);
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
