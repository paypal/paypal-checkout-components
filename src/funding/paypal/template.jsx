/* @flow */
/** @jsx node */

import { node, Fragment, type ChildType } from 'jsx-pragmatic/src';
import { PPLogo, PayPalLogo, LOGO_CLASS } from '@paypal/sdk-logos/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import type { LogoOptions, LabelOptions, VaultLabelOptions, TagOptions } from '../common';
import { BUTTON_LABEL, BUTTON_LAYOUT, CLASS, ATTRIBUTE } from '../../constants';
import { componentContent } from '../content';
import { Text, Space } from '../../ui';
import { TrackingBeacon } from '../../ui/tracking';

export function Logo({ logoColor } : LogoOptions) : ChildType {
    return (
        <Fragment>
            <PPLogo logoColor={ logoColor } />
            <Space />
            <PayPalLogo logoColor={ logoColor } />
        </Fragment>
    );
}

function getPersonalizationText({ personalization } : LabelOptions) : ?string {
    const personalizationText = personalization && personalization.buttonText && personalization.buttonText.text;

    if (!personalizationText) {
        return;
    }

    if (personalizationText.match(/[{}]/)) {
        return;
    }

    return personalizationText;
}

function getPersonalizationTracker({ personalization } : LabelOptions) : ?string {
    const personalizationTracker = personalization && personalization.buttonText && personalization.buttonText.tracking && personalization.buttonText.tracking.impression;

    if (!personalizationTracker) {
        return;
    }

    return personalizationTracker;
}

function getButtonStyle(opts : LabelOptions) : ?ChildType {
    if (__TEST__) {
        return null;
    }

    const personalizationText = getPersonalizationText(opts);

    const MIN_WIDTH = 300;
    const LABEL_DURATION = 1;
    const PERSONALIZATION_DURATION = 5;
    const DELAY = 0;

    const COMPRESSED = `
        max-width: 0%;
        opacity: 0;
    `;

    const EXPANDED = `
        max-width: 100%;
        opacity: 1;
    `;

    const HIDDEN = `
        position: absolute;
        visibility: hidden;
    `;

    const VISIBLE = `
        position: static;
        visibility: visible;
    `;

    const DOM_READY = '.dom-ready';
    const PAYPAL_BUTTON = `.${ CLASS.BUTTON }[${ ATTRIBUTE.FUNDING_SOURCE }=${ FUNDING.PAYPAL }]`;

    const PAYPAL_LOGO = `${ PAYPAL_BUTTON } .${ LOGO_CLASS.LOGO }.${ LOGO_CLASS.LOGO }-${ FUNDING.PAYPAL }`;
    const BUTTON_TEXT = `${ PAYPAL_BUTTON } .${ CLASS.TEXT }:not(.personalization-text)`;
    const PERSONALIZATION_TEXT = `${ PAYPAL_BUTTON } .personalization-text`;
    
    return (
        <style innerHTML={ `

            ${ BUTTON_TEXT }, ${ PERSONALIZATION_TEXT } {
                ${ HIDDEN }
            }

            ${ DOM_READY } ${ BUTTON_TEXT }:not(.${ CLASS.HIDDEN }) {
                ${ VISIBLE }
                ${ COMPRESSED }
                animation: show-text ${ LABEL_DURATION }s ${ DELAY }s forwards;
            }

            @media only screen and (max-width: ${ MIN_WIDTH }px) {
                ${ DOM_READY } ${ PERSONALIZATION_TEXT } {
                    ${ HIDDEN }
                }
            }

            @media only screen and (min-width: ${ MIN_WIDTH }px) {
                ${ DOM_READY } ${ PAYPAL_LOGO } {
                    animation: ${ personalizationText ? `toggle-paypal-logo ${ PERSONALIZATION_DURATION }s ${ DELAY }s forwards` : `none` };
                }

                ${ DOM_READY } ${ BUTTON_TEXT }:not(.${ CLASS.HIDDEN }) {
                    ${ COMPRESSED }
                    ${ VISIBLE }
                    animation: ${ personalizationText ? `show-text-delayed ${ PERSONALIZATION_DURATION }s ${ DELAY }s forwards` : `show-text ${ LABEL_DURATION }s ${ DELAY }s forwards` };
                }

                ${ DOM_READY } ${ PERSONALIZATION_TEXT } {
                    ${ COMPRESSED }
                    ${ VISIBLE }
                    animation: show-personalization-text ${ PERSONALIZATION_DURATION }s ${ DELAY }s forwards;
                }
            }

            @keyframes show-text {
                0% { ${ COMPRESSED } }
                100% { ${ EXPANDED } }
            }

            @keyframes toggle-paypal-logo {
                0% { ${ EXPANDED } }
                8% { ${ COMPRESSED } }
                85% { ${ COMPRESSED } }
                100% { ${ EXPANDED } }
            }

            @keyframes show-text-delayed {
                0% { ${ COMPRESSED } }
                85% { ${ COMPRESSED } }
                100% { ${ EXPANDED } }
            }

            @keyframes show-personalization-text {
                0% { ${ COMPRESSED } }
                25% { ${ EXPANDED } }
                75% { ${ EXPANDED } }
                100% { ${ COMPRESSED } }
            }
        ` } />
    );
}

function getButtonLabel({ logo, label, locale: { lang }, period, layout, multiple } : LabelOptions) : ChildType {
    if (layout === BUTTON_LAYOUT.HORIZONTAL && multiple) {
        return logo;
    }

    if (__WEB__) {
        return logo;
    }

    const { Checkout, Pay, BuyNow, Installment } = componentContent[lang];

    if (label === BUTTON_LABEL.CHECKOUT) {
        return <Checkout logo={ logo } />;
    }

    if (label === BUTTON_LABEL.PAY) {
        return <Pay logo={ logo } />;
    }

    if (label === BUTTON_LABEL.BUYNOW) {
        return <BuyNow logo={ logo } />;
    }

    if (label === BUTTON_LABEL.INSTALLMENT && Installment) {
        return <Installment logo={ logo } period={ period } />;
    }

    return logo;
}

function getButtonPersonalization(opts : LabelOptions) : ?ChildType {
    if (__WEB__) {
        return;
    }

    const { nonce } = opts;

    const personalizationText = getPersonalizationText(opts);
    const personalizationTracker = getPersonalizationTracker(opts);

    if (!personalizationText) {
        return;
    }

    return (
        <Fragment>
            <Text className="personalization-text" optional={ 2 }>{ personalizationText }</Text>
            {
                personalizationTracker &&
                    <TrackingBeacon url={ personalizationTracker } nonce={ nonce } />
            }
        </Fragment>
        
    );
}


export function Label(opts : LabelOptions) : ChildType {
    return (
        <Fragment>
            { getButtonStyle(opts) }
            { getButtonLabel(opts) }
            { getButtonPersonalization(opts) }
        </Fragment>
    );
}

export function VaultLabel({ logoColor, label } : VaultLabelOptions) : ChildType {
    return (
        <Fragment>
            <PPLogo logoColor={ logoColor } optional /> <Text className={ CLASS.VAULT_LABEL }>{label}</Text>
        </Fragment>
    );
}

export function Tag({ multiple, locale: { lang } } : TagOptions) : ?ChildType {
    if (__WEB__) {
        return null;
    }
    
    const { DualTag, SaferTag } = componentContent[lang];

    return (multiple && DualTag)
        ? <DualTag optional />
        : <SaferTag  optional />;
}
