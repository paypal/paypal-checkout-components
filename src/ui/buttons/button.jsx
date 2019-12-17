/* @flow */
/** @jsx node */

import { FUNDING, ENV, type LocaleType, CARD } from '@paypal/sdk-constants/src';
import { node, type ElementNode } from 'jsx-pragmatic/src';
import { LOGO_COLOR, LOGO_CLASS } from '@paypal/sdk-logos/src';
import { noop } from 'belter/src';

import { ATTRIBUTE, CLASS, BUTTON_COLOR, BUTTON_NUMBER } from '../../constants';
import { getFundingConfig } from '../../funding';
import { type ButtonStyle, type Personalization } from '../../zoid/buttons/props';
import type { FundingEligibilityType } from '../../types';

import { Spinner } from './spinner';
import { MenuButton } from './menu';

const ENABLE_VAULT_DROPDOWN = true;

type BasicButtonProps = {|
    style : ButtonStyle,
    fundingSource : $Values<typeof FUNDING>,
    multiple : boolean,
    locale : LocaleType,
    onClick? : Function,
    env : $Values<typeof ENV>,
    fundingEligibility : FundingEligibilityType,
    i : number,
    nonce : string,
    clientAccessToken : ?string,
    personalization : Personalization,
    content? : { [string] : string },
    tagline : ?boolean
|};

export function BasicButton({ fundingSource, style, multiple, locale, env, fundingEligibility, i, nonce, clientAccessToken, personalization, onClick = noop, content, tagline } : BasicButtonProps) : ElementNode {

    let { color, period, label } = style;

    const fundingConfig = getFundingConfig()[fundingSource];

    if (!fundingConfig) {
        throw new Error(`Can not find funding config for ${ fundingSource }`);
    }

    const colors = fundingConfig.colors;
    const secondaryColors = fundingConfig.secondaryColors || {};

    if (multiple && i > 0) {
        color = secondaryColors[color] || secondaryColors[BUTTON_COLOR.DEFAULT] || colors[0];
    }

    const logoColors = fundingConfig.logoColors || {};
    const logoColor = logoColors[color] || logoColors[LOGO_COLOR.DEFAULT] || LOGO_COLOR.DEFAULT;

    const { Label, Logo, handleClick } = fundingConfig;

    const clickHandler = (event, opts) => {
        event.preventDefault();
        event.stopPropagation();
        event.target.blur();
        onClick(event, { fundingSource, ...opts });
    };

    const keyboardAccessibilityHandler = (event, opts) => {
        if (event.keyCode === 13 || event.keyCode === 32) {
            clickHandler(event, opts);
        }
    };

    const { layout, shape } = style;

    const logo = (
        <Logo
            label={ label }
            locale={ locale }
            logoColor={ logoColor }
            fundingEligibility={ fundingEligibility }
            onClick={ clickHandler }
            onKeyPress={ keyboardAccessibilityHandler }
            nonce={ nonce }
            content={ content }
        />
    );

    return (
        <div
            role='button'
            { ...{
                [ ATTRIBUTE.BUTTON ]:         true,
                [ ATTRIBUTE.FUNDING_SOURCE ]: fundingSource
            } }
            class={ [
                CLASS.BUTTON,
                `${ CLASS.NUMBER }-${ i }`,
                `${ CLASS.LAYOUT }-${ layout }`,
                `${ CLASS.SHAPE }-${ shape }`,
                `${ CLASS.NUMBER }-${ multiple ? BUTTON_NUMBER.MULTIPLE : BUTTON_NUMBER.SINGLE }`,
                `${ CLASS.ENV }-${ env }`,
                `${ CLASS.COLOR }-${ color }`,
                `${ LOGO_CLASS.LOGO_COLOR }-${ logoColor }`
            ].join(' ') }
            onClick={ handleClick ? null : clickHandler }
            onKeyPress={ handleClick ? null : keyboardAccessibilityHandler }
            tabindex={ handleClick ? '-1' : '0' }>

            <div class={ CLASS.BUTTON_LABEL }>
                <Label
                    logo={ logo }
                    label={ label }
                    nonce={ nonce }
                    locale={ locale }
                    logoColor={ logoColor }
                    period={ period }
                    layout={ layout }
                    multiple={ multiple }
                    fundingEligibility={ fundingEligibility }
                    onClick={ clickHandler }
                    onKeyPress={ keyboardAccessibilityHandler }
                    clientAccessToken={ clientAccessToken }
                    personalization={ personalization }
                    tagline={ tagline }
                />
            </div>

            <Spinner />
        </div>
    );
}

type VaultedButtonProps = {|
    style : ButtonStyle,
    fundingSource : $Values<typeof FUNDING>,
    multiple : boolean,
    locale : LocaleType,
    onClick? : Function,
    env : $Values<typeof ENV>,
    fundingEligibility : FundingEligibilityType,
    i : number,
    nonce : string,
    vendor : $Values<typeof CARD>,
    label : string,
    paymentMethodID : string
|};

export function VaultedButton({ fundingSource, paymentMethodID, style, multiple, env, nonce, vendor, label, onClick = noop } : VaultedButtonProps) : ElementNode {

    const clickHandler = (event, opts) => {
        event.preventDefault();
        event.stopPropagation();
        event.target.blur();
        onClick(event, { fundingSource, ...opts });
    };

    const keyboardAccessibilityHandler = (event, opts) => {
        if (event.keyCode === 13 || event.keyCode === 32) {
            clickHandler(event, opts);
        }
    };

    let { layout, shape, color } = style;

    const fundingConfig = getFundingConfig()[fundingSource];

    if (!fundingConfig) {
        throw new Error(`Can not find funding config for ${ fundingSource }`);
    }

    const { VaultLabel, colors, logoColors = {}, secondaryVaultColors = {} } = fundingConfig;

    if (!VaultLabel) {
        throw new Error(`Could not find vault label for ${ fundingSource }`);
    }

    color = secondaryVaultColors[color] || secondaryVaultColors[BUTTON_COLOR.DEFAULT] || colors[0];
    const logoColor = logoColors[color] || logoColors[LOGO_COLOR.DEFAULT] || LOGO_COLOR.DEFAULT;

    return (
        <div
            role='button'
            { ...{
                [ ATTRIBUTE.BUTTON ]:            true,
                [ ATTRIBUTE.FUNDING_SOURCE ]:    fundingSource,
                [ ATTRIBUTE.PAYMENT_METHOD_ID ]: paymentMethodID
            } }
            class={ [
                CLASS.BUTTON,
                CLASS.VAULT,
                `${ CLASS.LAYOUT }-${ layout }`,
                `${ CLASS.SHAPE }-${ shape }`,
                `${ CLASS.NUMBER }-${ multiple ? BUTTON_NUMBER.MULTIPLE : BUTTON_NUMBER.SINGLE }`,
                `${ CLASS.ENV }-${ env }`,
                `${ CLASS.COLOR }-${ color }`
            ].join(' ') }
            tabIndex='0'
            onClick={ clickHandler }
            onKeyPress={ keyboardAccessibilityHandler } >

            <div class={ CLASS.BUTTON_LABEL }>
                <VaultLabel
                    nonce={ nonce }
                    logoColor={ logoColor }
                    vendor={ vendor }
                    label={ label }
                />
            </div>

            <Spinner />
            { ENABLE_VAULT_DROPDOWN ? <MenuButton /> : null }
        </div>
    );
}
