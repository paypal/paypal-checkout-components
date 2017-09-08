/* @flow */

import { BUTTON_LAYOUT } from '../constants';

import { getButtonConfig, labelToFunding } from './config';
import { determineEligibleFunding } from './funding';

function parseLocale(locale : string) : { country : string, lang : string } {
    let [ lang, country ] = locale.split('_');
    return { country, lang };
}

export function determineMaxButtons({ label, layout, max } : { layout : string, label : string, max : number }) : number {

    let allowed = (layout === BUTTON_LAYOUT.HORIZONTAL)
        ? getButtonConfig(label, 'allowHorizontal')
        : getButtonConfig(label, 'allowVertical');

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

export function normalizeProps(props : Object) : Object {

    let {
        locale  = getButtonConfig('DEFAULT', 'defaultLocale'),
        style   = {},
        funding
    } = props;

    locale = parseLocale(locale);

    let label = style.label || getButtonConfig('DEFAULT', 'defaultLabel');

    let {
        size         = getButtonConfig(label, (style.layout === BUTTON_LAYOUT.VERTICAL) ? 'defaultVerticalSize' : 'defaultSize'),
        color        = getButtonConfig(label, 'defaultColor'),
        shape        = getButtonConfig(label, 'defaultShape'),
        branding     = getButtonConfig(label, 'defaultBranding'),
        fundingicons = getButtonConfig(label, 'defaultFundingIcons'),
        tagline      = getButtonConfig(label, 'defaultTagline'),
        layout       = getButtonConfig(label, 'defaultLayout'),
        max
    } = style;

    max = determineMaxButtons({ label, layout, max });

    let selected = labelToFunding(label);
    let sources  = determineEligibleFunding({ funding, selected }).slice(0, max);
    let multiple = sources.length > 1;

    tagline = enableTagline({ tagline, branding, fundingicons, layout });

    return { size, label, locale, color, shape, branding, fundingicons,
        tagline, funding, layout, sources, max, multiple };
}
