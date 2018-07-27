/* @flow */

import { BUTTON_LAYOUT, BUTTON_STYLE_OPTIONS, BUTTON_LABEL, BUTTON_COLOR, BUTTON_SIZE, BUTTON_SHAPE, PLATFORM } from '../constants';
import { determineEligibleFunding, determineEligibleCards } from '../funding';
import { memoize } from '../lib/util';
import type { LocaleType, FundingSelection, FundingList } from '../types';

import { getButtonConfig, labelToFunding } from './config';

function parseLocale(locale : string) : LocaleType {
    let [ lang, country ] = locale.split('_');
    return { country, lang };
}

function enableTagline({ tagline, fundingicons, layout }) : boolean {
    return Boolean(tagline && !fundingicons && layout === BUTTON_LAYOUT.HORIZONTAL);
}

type NormalizedProps = {|
    size : $Values<typeof BUTTON_SIZE>,
    label : $Values<typeof BUTTON_LABEL>,
    color : $Values<typeof BUTTON_COLOR>,
    shape : $Values<typeof BUTTON_SHAPE>,
    locale : LocaleType,
    fundingicons : boolean,
    tagline : boolean,
    funding : FundingSelection,
    layout : $Values<typeof BUTTON_LAYOUT>,
    sources : FundingList,
    multiple : boolean,
    env : string,
    height : ?number,
    cards : Array<string>,
    installmentperiod : number,
    platform : $Values<typeof PLATFORM>
|};

export let normalizeProps = memoize((props : Object, defs? : { locale? : LocaleType } = {}) : NormalizedProps => {

    let {
        env,
        locale,
        style   = {},
        funding,
        commit,
        platform
    } = props;

    platform = platform || PLATFORM.DESKTOP;

    locale = locale ? parseLocale(locale) : (defs.locale || getButtonConfig('DEFAULT', 'defaultLocale'));

    funding = funding || {};
    funding.allowed = funding.allowed || [];
    funding.disallowed = funding.disallowed || [];
    funding.remembered = funding.remembered || [];

    let label  = style[BUTTON_STYLE_OPTIONS.LABEL] || getButtonConfig('DEFAULT', (style.layout === BUTTON_LAYOUT.VERTICAL) ? 'defaultVerticalLabel' : 'defaultLabel');
    let layout = style[BUTTON_STYLE_OPTIONS.LAYOUT] || getButtonConfig(label, 'defaultLayout');
    let size   = BUTTON_SIZE.RESPONSIVE;

    let {
        [ BUTTON_STYLE_OPTIONS.COLOR ]:        color        = getButtonConfig(label, 'defaultColor'),
        [ BUTTON_STYLE_OPTIONS.SHAPE ]:        shape        = getButtonConfig(label, 'defaultShape'),
        [ BUTTON_STYLE_OPTIONS.FUNDINGICONS ]: fundingicons = getButtonConfig(label, 'defaultFundingIcons'),
        [ BUTTON_STYLE_OPTIONS.TAGLINE ]:      tagline      = getButtonConfig(label, 'defaultTagline'),
        [ BUTTON_STYLE_OPTIONS.HEIGHT ]:       height,
        [ BUTTON_STYLE_OPTIONS.INSTALLMENTPERIOD ]:  installmentperiod
    } = style;

    let selected = labelToFunding(label);
    let sources  = determineEligibleFunding({ funding, selected, locale, env, layout, commit, platform });
    let multiple = sources.length > 1;

    tagline = enableTagline({ tagline, fundingicons, layout });

    let cards = determineEligibleCards({ funding, locale });

    return { size, label, locale, color, shape, fundingicons, platform,
        tagline, funding, layout, sources, multiple, env, height, cards, installmentperiod };
});
