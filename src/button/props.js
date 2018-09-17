/* @flow */

import { BUTTON_LAYOUT, BUTTON_STYLE_OPTIONS, BUTTON_LABEL, BUTTON_COLOR, BUTTON_SIZE, BUTTON_SHAPE } from '../constants';
import { determineEligibleFunding, determineEligibleCards } from '../funding';
import { memoize } from '../lib/util';
import type { LocaleType, FundingSelection, FundingList } from '../types';

import { getButtonConfig, labelToFunding } from './config';

function parseLocale(locale : string) : LocaleType {
    let [ lang, country ] = locale.split('_');
    return { country, lang };
}

export function determineMaxButtons({ label, layout, max } : { layout : string, label : string, max : number }) : number {

    let allowed = (layout === BUTTON_LAYOUT.HORIZONTAL)
        ? getButtonConfig(label, 'allowPrimaryHorizontal')
        : getButtonConfig(label, 'allowPrimaryVertical');

    if (!allowed) {
        return 1;
    }

    let configMax = (layout === BUTTON_LAYOUT.HORIZONTAL)
        ? getButtonConfig(label, 'maxHorizontalButtons')
        : getButtonConfig(label, 'maxVerticalButtons');

    return max
        ? Math.min(configMax, max)
        : configMax;
}

function enableTagline({ tagline, branding, fundingicons, layout }) : boolean {
    return Boolean(tagline && branding && !fundingicons && layout === BUTTON_LAYOUT.HORIZONTAL);
}

type NormalizedProps = {|
    size : $Values<typeof BUTTON_SIZE>,
    label : $Values<typeof BUTTON_LABEL>,
    color : $Values<typeof BUTTON_COLOR>,
    shape : $Values<typeof BUTTON_SHAPE>,
    locale : LocaleType,
    branding : boolean,
    fundingicons : boolean,
    tagline : boolean,
    funding : FundingSelection,
    layout : $Values<typeof BUTTON_LAYOUT>,
    sources : FundingList,
    max : number,
    multiple : boolean,
    env : string,
    height : ?number,
    cards : Array<string>,
    installmentperiod : number,
    isFundingThrottleEnabled : boolean
|};

export let normalizeProps = memoize((props : Object, defs? : { locale? : LocaleType } = {}) : NormalizedProps => {

    let {
        env,
        locale,
        style   = {},
        funding,
        commit,
        isFundingThrottleEnabled
    } = props;

    locale = locale ? parseLocale(locale) : (defs.locale || getButtonConfig('DEFAULT', 'defaultLocale'));

    funding = funding || {};
    funding.allowed = funding.allowed || [];
    funding.disallowed = funding.disallowed || [];
    funding.remembered = funding.remembered || [];

    let label  = style[BUTTON_STYLE_OPTIONS.LABEL] || getButtonConfig('DEFAULT', (style.layout === BUTTON_LAYOUT.VERTICAL) ? 'defaultVerticalLabel' : 'defaultLabel');
    let layout = style[BUTTON_STYLE_OPTIONS.LAYOUT] || getButtonConfig(label, 'defaultLayout');

    let {
        [ BUTTON_STYLE_OPTIONS.SIZE ]:         size         = getButtonConfig(label, (layout === BUTTON_LAYOUT.VERTICAL) ? 'defaultVerticalSize' : 'defaultSize'),
        [ BUTTON_STYLE_OPTIONS.COLOR ]:        color        = getButtonConfig(label, 'defaultColor'),
        [ BUTTON_STYLE_OPTIONS.SHAPE ]:        shape        = getButtonConfig(label, 'defaultShape'),
        [ BUTTON_STYLE_OPTIONS.BRANDING ]:     branding     = getButtonConfig(label, (layout === BUTTON_LAYOUT.VERTICAL) ? 'defaultVerticalBranding' : 'defaultBranding'),
        [ BUTTON_STYLE_OPTIONS.FUNDINGICONS ]: fundingicons = getButtonConfig(label, 'defaultFundingIcons'),
        [ BUTTON_STYLE_OPTIONS.TAGLINE ]:      tagline      = getButtonConfig(label, 'defaultTagline'),
        [ BUTTON_STYLE_OPTIONS.MAXBUTTONS ]:   max,
        [ BUTTON_STYLE_OPTIONS.HEIGHT ]:       height,
        [ BUTTON_STYLE_OPTIONS.INSTALLMENTPERIOD ]:  installmentperiod
    } = style;

    max = determineMaxButtons({ label, layout, max });

    let selected = labelToFunding(label);
    let sources  = determineEligibleFunding({ funding, selected, locale, env, layout, commit }).slice(0, max);
    let multiple = sources.length > 1;

    if (multiple) {
        branding = true;
    }

    tagline = enableTagline({ tagline, branding, fundingicons, layout });

    let cards = determineEligibleCards({ funding, locale });

    return { size, label, locale, color, shape, branding, fundingicons,
        tagline, funding, layout, sources, max, multiple, env, height, cards, installmentperiod, isFundingThrottleEnabled };
});
