/* @flow */
/** @jsx node */

import { node, Fragment, type ChildType } from 'jsx-pragmatic/src';
import { PPLogo, PayPalLogo, LOGO_CLASS } from '@paypal/sdk-logos/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import type { LogoOptions, LabelOptions, VaultLabelOptions, TagOptions } from '../common';
import { BUTTON_LABEL, BUTTON_LAYOUT, CLASS, ATTRIBUTE } from '../../constants';
import { componentContent } from '../content';
import { Text, Space } from '../../ui';

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

function getButtonStyle(opts : LabelOptions) : ?ChildType {
    if (__TEST__) {
        return null;
    }

    const personalizationText = getPersonalizationText(opts);

    const MIN_WIDTH = 300;
    const LABEL_DURATION = 1;
    const PERSONALIZATION_DURATION = 5;
    const DELAY = 0.3;

    const HIDE = `
        max-width: 0%;
        opacity: 0;
    `;

    const SHOW = `
        max-width: 100%;
        opacity: 1;
    `;

    return (
        <style innerHTML={ `
            .${ CLASS.BUTTON }[${ ATTRIBUTE.FUNDING_SOURCE }=${ FUNDING.PAYPAL }] .${ CLASS.TEXT }:not(.${ CLASS.SPACE }):not(.personalizationText) {
                animation: show-text ${ LABEL_DURATION }s ${ DELAY }s forwards;
            }

            .${ CLASS.BUTTON }[${ ATTRIBUTE.FUNDING_SOURCE }=${ FUNDING.PAYPAL }] .${ CLASS.TEXT }:not(.${ CLASS.SPACE }) {
                white-space: pre;
                ${ HIDE }
            }

            @media only screen and (max-width: ${ MIN_WIDTH }px) {
                .${ CLASS.BUTTON }[${ ATTRIBUTE.FUNDING_SOURCE }=${ FUNDING.PAYPAL }] .personalizationText {
                    display: none;
                }
            }

            @media only screen and (min-width: ${ MIN_WIDTH }px) {
                .${ CLASS.BUTTON }[${ ATTRIBUTE.FUNDING_SOURCE }=${ FUNDING.PAYPAL }] .${ CLASS.TEXT }:not(.${ CLASS.SPACE }):not(.personalizationText) {
                    animation: ${ personalizationText ? `show-text-delayed ${ PERSONALIZATION_DURATION }s ${ DELAY }s forwards` : `show-text ${ LABEL_DURATION }s ${ DELAY }s forwards` };
                }

                .${ CLASS.BUTTON }[${ ATTRIBUTE.FUNDING_SOURCE }=${ FUNDING.PAYPAL }] .${ LOGO_CLASS.LOGO }.${ LOGO_CLASS.LOGO }-${ FUNDING.PAYPAL } {
                    animation: ${ personalizationText ? `toggle-paypal-logo ${ PERSONALIZATION_DURATION }s ${ DELAY }s forwards` : `none` };
                }

                .${ CLASS.BUTTON }[${ ATTRIBUTE.FUNDING_SOURCE }=${ FUNDING.PAYPAL }] .personalizationText {
                    animation: show-personalization-text ${ PERSONALIZATION_DURATION }s ${ DELAY }s forwards;
                }
            }

            @keyframes show-text {
                0% { ${ HIDE } }
                100% { ${ SHOW } }
            }

            @keyframes toggle-paypal-logo {
                0% { ${ SHOW } }
                8% { ${ HIDE } }
                85% { ${ HIDE } }
                100% { ${ SHOW } }
            }

            @keyframes show-text-delayed {
                0% { ${ HIDE } }
                85% { ${ HIDE } }
                100% { ${ SHOW } }
            }

            @keyframes show-personalization-text {
                0% { ${ HIDE } }
                25% { ${ SHOW } }
                75% { ${ SHOW } }
                100% { ${ HIDE } }
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

    const personalizationText = getPersonalizationText(opts);

    if (!personalizationText) {
        return;
    }

    return (
        <Text className="personalizationText" optional={ 2 }>{ personalizationText }</Text>
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
