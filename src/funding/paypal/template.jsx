/* @flow */
/** @jsx node */

import { node, Style, type ChildType } from 'jsx-pragmatic/src';
import { PPLogo, PayPalLogo, CreditLogo, CreditMark, PayPalMark, GlyphCard, GlyphBank } from '@paypal/sdk-logos/src';
import { FUNDING, WALLET_INSTRUMENT } from '@paypal/sdk-constants/src';

import {
    type LogoOptions,
    type LabelOptions,
    type WalletLabelOptions,
    type TagOptions,
    BasicLabel
} from '../common';
import { ATTRIBUTE } from '../../constants';
import { componentContent } from '../content';
import { Text, Space, PlaceHolder } from '../../ui/text';

import css from './style.scoped.scss';

export function Logo({ logoColor } : LogoOptions) : ChildType {
    return (
        <PayPalLogo logoColor={ logoColor } />
    );
}

export function Label(opts : LabelOptions) : ChildType {
    return (
        <BasicLabel { ...opts } />
    );
}

export function WalletLabelOld(opts : WalletLabelOptions) : ?ChildType {
    const { logoColor, instrument, locale, content, commit } = opts;

    if (__WEB__) {
        return;
    }

    if (!instrument) {
        throw new Error(`Expected instrument`);
    }

    let logo;

    if (instrument.logoUrl) {
        logo = <img class='card-art' src={ instrument.logoUrl } />;
    } else if (instrument.type === WALLET_INSTRUMENT.CARD) {
        logo = <GlyphCard logoColor={ logoColor } />;
    } else if (instrument.type === WALLET_INSTRUMENT.BANK) {
        logo = <GlyphBank logoColor={ logoColor } />;
    } else if (instrument.type === WALLET_INSTRUMENT.CREDIT) {
        logo = <CreditLogo locale={ locale } logoColor={ logoColor } />;
    }

    return (
        <Style css={ css }>
            <div class='wallet-label'>
                <div class='paypal-mark'>
                    <PPLogo logoColor={ logoColor } />
                </div>
                {
                    (instrument.oneClick && commit && content) &&
                        <div class='pay-label'>
                            <Space />
                            <Text>{ content.payNow }</Text>
                        </div>
                }
                <div class='paypal-wordmark'>
                    <Space />
                    <PayPalLogo logoColor={ logoColor } />
                </div>
                <div class='divider'>|</div>
                {
                    logo &&
                        <div class='logo' optional>
                            { logo }
                            <Space />
                        </div>
                }
                <div class='label'>
                    <Text className={ [ 'limit' ] }>
                        { instrument.label }
                    </Text>
                </div>
            </div>
        </Style>
    );
}

export function WalletLabel(opts : WalletLabelOptions) : ?ChildType {
    const { logoColor, instrument, content, commit, vault, textColor, fundingSource } = opts;

    if (instrument && !instrument.type) {
        return WalletLabelOld(opts);
    }

    let logo;
    let label;
    let branded;

    if (instrument && typeof instrument.branded === 'boolean') {
        branded = instrument.branded;
    } else if (fundingSource === FUNDING.PAYPAL || fundingSource === FUNDING.CREDIT) {
        branded = true;
    } else if (fundingSource === FUNDING.CARD) {
        branded = false;
    } else {
        branded = true;
    }

    if (instrument) {
        if (instrument.type === WALLET_INSTRUMENT.CARD && instrument.label) {
            logo = instrument.logoUrl
                ? <img class='card-art' src={ instrument.logoUrl } />
                : <GlyphCard logoColor={ logoColor } />;

            label = instrument.label.replace('••••', '••');

        } else if (instrument.type === WALLET_INSTRUMENT.BANK && instrument.label) {
            logo = instrument.logoUrl
                ? <img class='card-art' src={ instrument.logoUrl } />
                : <GlyphBank logoColor={ logoColor } />;

            label = instrument.label.replace('••••', '••');

        } else if (instrument.type === WALLET_INSTRUMENT.CREDIT) {
            logo = <CreditMark />;

            label = content && content.credit;

        } else if (instrument.type === WALLET_INSTRUMENT.BALANCE) {
            logo = <PayPalMark />;

            label = content && content.balance;

        } else if (instrument.label) {
            label = instrument.label;
        }
    }

    const payNow = Boolean((instrument && instrument.oneClick) && commit && !vault);

    const attrs = {};
    if (payNow) {
        attrs[ATTRIBUTE.PAY_NOW] = true;
    }

    return (
        <Style css={ css }>
            <div class='wallet-label-new' { ...attrs }>
                {
                    branded
                        ? (
                            <div class='paypal-mark'>
                                <PPLogo logoColor={ logoColor } />
                                <Space />
                            </div>
                        )
                        : null
                }

                <div class='pay-label' optional={ 2 }>
                    <Space />
                    {
                        (instrument && content)
                            ? <Text>{ payNow ? content.payNow : content.payWith }</Text>
                            : <Text><PlaceHolder chars={ 7 } color={ textColor } /></Text>
                    }
                    <Space />
                </div>
                <div class='logo' optional={ 1 }>
                    {
                        (instrument && logo)
                            ? logo
                            : <Text><PlaceHolder chars={ 4 } color={ textColor } /></Text>
                    }
                </div>
                <div class='label'>
                    <Space />
                    {
                        (instrument && label)
                            ? <Text>{ label }</Text>
                            : <Text><PlaceHolder chars={ 6 } color={ textColor } /></Text>
                    }
                </div>
            </div>
        </Style>
    );
}

export function Tag({ multiple, locale: { lang } } : TagOptions) : ?ChildType {
    if (__WEB__) {
        return null;
    }

    const { DualTag, SaferTag } = componentContent[lang];

    return (multiple && DualTag)
        ? <DualTag optional />
        : <SaferTag optional />;
}
