/* @flow */

import { values } from 'belter/src';
import { ENV, COUNTRY, COUNTRY_LANGS, type LocaleType } from 'paypal-braintree-web-client/src';

import { PLATFORM, FUNDING, BUTTON_LABEL, BUTTON_COLOR, BUTTON_LAYOUT, BUTTON_SHAPE, BUTTON_SIZE } from '../constants';
import { FUNDING_CONFIG } from '../funding';
import type { FundingEligibilityType } from '../types';

import { BUTTON_SIZE_STYLE } from './config';

export type ButtonStyle = {|
    label : $Values<typeof BUTTON_LABEL>,
    color : $Values<typeof BUTTON_COLOR>,
    shape : $Values<typeof BUTTON_SHAPE>,
    tagline : boolean,
    layout : $Values<typeof BUTTON_LAYOUT>,
    period? : number,
    height? : number
|};

export type ButtonStyleInputs = {
    label? : $PropertyType<ButtonStyle, 'label'> | void,
    color? : $PropertyType<ButtonStyle, 'color'> | void,
    shape? : $PropertyType<ButtonStyle, 'shape'> | void,
    tagline? : $PropertyType<ButtonStyle, 'tagline'> | void,
    layout? : $PropertyType<ButtonStyle, 'layout'> | void,
    period? : $PropertyType<ButtonStyle, 'period'> | void,
    height? : $PropertyType<ButtonStyle, 'height'> | void
};

export type ButtonProps = {
    style : ButtonStyle,
    locale : LocaleType,
    commit : boolean,
    env : $Values<typeof ENV>,
    stage? : string,
    stageUrl? : string,
    platform : $Values<typeof PLATFORM>,
    fundingEligibility : FundingEligibilityType,
    remembered : Array<$Values<typeof FUNDING>>,
    sessionID : string,
    buttonSessionID : string,
    version : string
};

export type ButtonPropsInputs = {|
    style? : ButtonStyleInputs | void,
    locale? : $PropertyType<ButtonProps, 'locale'> | void,
    commit? : $PropertyType<ButtonProps, 'commit'> | void,
    env? : $PropertyType<ButtonProps, 'env'> | void,
    logLevel? : $PropertyType<ButtonProps, 'logLevel'> | void,
    meta? : $PropertyType<ButtonProps, 'meta'> | void,
    stage? : $PropertyType<ButtonProps, 'stage'> | void,
    stageUrl? : $PropertyType<ButtonProps, 'stageUrl'> | void,
    platform? : $PropertyType<ButtonProps, 'platform'> | void,
    fundingEligibility? : $PropertyType<ButtonProps, 'fundingEligibility'> | void,
    remembered? : $PropertyType<ButtonProps, 'remembered'> | void,
    sessionID ? : $PropertyType<ButtonProps, 'sessionID'> | void,
    buttonSessionID ? : $PropertyType<ButtonProps, 'buttonSessionID'> | void,
    version? : $PropertyType<ButtonProps, 'version'> | void
|};

export const DEFAULT_STYLE = {
    LABEL:  BUTTON_LABEL.PAYPAL,
    LAYOUT: BUTTON_LAYOUT.VERTICAL,
    COLOR:  BUTTON_COLOR.GOLD,
    SHAPE:  BUTTON_SHAPE.RECT
};

export const DEFAULT_PROPS = {
    COMMIT:  true,
    VERSION: __PAYPAL_CHECKOUT__.__MINOR_VERSION__,
    ENV:     __ENV__
};

export function normalizeButtonStyle(style : ButtonStyleInputs, { locale } : { locale : LocaleType }) : ButtonStyle {

    if (!style) {
        throw new Error(`Expected props.style to be set`);
    }

    let { country } = locale;

    let {
        label = DEFAULT_STYLE.LABEL,
        layout = DEFAULT_STYLE.LAYOUT,
        color = DEFAULT_STYLE.COLOR,
        shape = DEFAULT_STYLE.SHAPE,
        tagline = (layout === BUTTON_LAYOUT.HORIZONTAL),
        height,
        period
    } = style;

    let funding = Object.keys(FUNDING_CONFIG)
        .find(name => FUNDING_CONFIG[name].labels[label]);

    if (!funding) {
        throw new Error(`Invalid button label: ${ label }`);
    }

    let fundingConfig = FUNDING_CONFIG[funding];
    let labelConfig = fundingConfig.labels[label];

    if (!labelConfig.allowPrimary) {
        throw new Error(`Label ${ label } can not be used as primary button label`);
    }

    if (color && labelConfig.colors.indexOf(color) === -1) {
        throw new Error(`Unexpected style.color for ${ label } button: ${ color }, expected ${ labelConfig.colors.join(', ') }`);
    }

    if (shape && labelConfig.shapes.indexOf(shape) === -1) {
        throw new Error(`Unexpected style.shape for ${ label } button: ${ shape }, expected ${ labelConfig.shapes.join(', ') }`);
    }

    if (layout && labelConfig.layouts.indexOf(layout) === -1) {
        throw new Error(`Unexpected style.layout for ${ label } button: ${ layout }, expected ${ labelConfig.layouts.join(', ') }`);
    }

    if (labelConfig.allowedCountries && labelConfig.allowedCountries.indexOf(country) === -1) {
        throw new Error(`Label ${ label } invalid for country ${ country }`);
    }

    if (period && labelConfig.allowedPeriods && labelConfig.allowedPeriods[country].indexOf(period) === -1) {
        throw new Error(`Period ${ period } invalid for country ${ country }`);
    }

    if (height !== undefined) {
        if (typeof height !== 'number') {
            throw new TypeError(`Expected style.height to be a number, got: ${ height }`);
        }
        
        let [ minHeight, maxHeight ] = [ BUTTON_SIZE_STYLE[BUTTON_SIZE.SMALL].minHeight, BUTTON_SIZE_STYLE[BUTTON_SIZE.HUGE].maxHeight ];

        if (height < minHeight || height > maxHeight) {
            throw new Error(`Expected style.height to be between ${ minHeight }px and ${ maxHeight }px - got ${ height }px`);
        }
    }

    if (layout === BUTTON_LAYOUT.VERTICAL) {
        if (tagline) {
            throw new Error(`style.tagline is not allowed for ${ BUTTON_LAYOUT.VERTICAL } layout`);
        }
    }

    return { label, layout, color, shape, tagline, height, period };
}

const COUNTRIES = values(COUNTRY);
const FUNDING_SOURCES = values(FUNDING);
const ENVS = values(ENV);
const PLATFORMS = values(PLATFORM);

export function normalizeButtonProps(props : ?ButtonPropsInputs) : ButtonProps {

    if (!props) {
        throw new Error(`Expected props`);
    }

    let {
        style = {},
        locale,
        remembered = [],
        env = DEFAULT_PROPS.ENV,
        fundingEligibility,
        platform,
        buttonSessionID,
        version = DEFAULT_PROPS.VERSION,
        sessionID,
        commit = DEFAULT_PROPS.COMMIT
    } = props;

    if (!locale) {
        throw new Error(`Expected locale`);
    }

    let { country, lang } = locale;

    if (!country || COUNTRIES.indexOf(country) === -1) {
        throw new Error(`Expected valid country, got ${ country || 'undefined' }`);
    }

    if (!lang || COUNTRY_LANGS[country].indexOf(lang) === -1) {
        throw new Error(`Expected valid lang, got ${ lang || 'undefined' }`);
    }

    if (remembered && remembered.find(source => FUNDING_SOURCES.indexOf(source) === -1)) {
        throw new Error(`Expected valid funding sources, got ${ JSON.stringify(remembered) }`);
    }

    if (!env || ENVS.indexOf(env) === -1) {
        throw new Error(`Expected valid env, got ${ env || 'undefined' }`);
    }

    if (!fundingEligibility) {
        throw new Error(`Expected fundingEligibility`);
    }

    if (!platform || PLATFORMS.indexOf(platform) === -1) {
        throw new Error(`Expected valid platform, got ${ platform || 'undefined' }`);
    }

    if (!sessionID) {
        throw new Error(`Expected sessionID`);
    }

    if (!buttonSessionID) {
        throw new Error(`Expected buttonSessionID`);
    }

    style = normalizeButtonStyle(style, { locale });

    return { style, locale, remembered, env, fundingEligibility, platform, buttonSessionID, commit, version, sessionID };
}
