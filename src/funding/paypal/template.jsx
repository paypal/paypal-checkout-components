/* @flow */
/** @jsx node */

import { node, Fragment, type ChildType } from 'jsx-pragmatic/src';
import { PPLogo, PayPalLogo } from '@paypal/sdk-logos/src';

import type { LogoOptions, LabelOptions, VaultLabelOptions, TagOptions } from '../common';
import { BUTTON_LABEL, BUTTON_LAYOUT, CLASS } from '../../constants';
import { componentContent } from '../content';
import { Text, Space, LoadingDots } from '../../ui';

export function Logo({ label, logoColor } : LogoOptions) : ChildType {
    if (label === BUTTON_LABEL.PAY) {
        return <PayPalLogo logoColor={ logoColor } />;
    }

    return (
        <Fragment>
            <PPLogo logoColor={ logoColor } />
            <Space />
            <PayPalLogo logoColor={ logoColor } />
        </Fragment>
    );
}

export function Label({ logo, label, locale: { lang }, logoColor, period, layout, multiple, clientAccessToken, personalization } : LabelOptions) : ChildType {
    if (layout === BUTTON_LAYOUT.HORIZONTAL && multiple) {
        return logo;
    }

    if (__WEB__) {
        if (label || clientAccessToken) {
            return logo;
        }

        return logo;
    }

    if (personalization && personalization.buttonText && personalization.buttonText.Component) {
        return <personalization.buttonText.Component logoColor={ logoColor } period={ period } />;
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

export function VaultLabel({ logoColor, label } : VaultLabelOptions) : ChildType {
    return (
        <Fragment>
            <PPLogo logoColor={ logoColor } optional /> <Text className={ CLASS.VAULT_LABEL }>{label}</Text>
        </Fragment>
    );
}

export function Tag({ multiple, locale: { lang } } : TagOptions) : ChildType {
    if (__WEB__) {
        return <LoadingDots />;
    }
    
    const { DualTag, SaferTag } = componentContent[lang];

    return (multiple && DualTag)
        ? <DualTag optional />
        : <SaferTag  optional />;
}
