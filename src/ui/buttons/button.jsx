/* @flow */
/** @jsx node */

import type { FundingEligibilityType, VaultedInstrument } from '@paypal/sdk-client/src';
import { FUNDING, ENV, type LocaleType, CARD } from '@paypal/sdk-constants/src';
import { node, type ElementNode } from 'jsx-pragmatic/src';
import { LOGO_COLOR, LOGO_CLASS } from '@paypal/sdk-logos/src';
import { noop } from 'belter/src';

import { ATTRIBUTE, CLASS, BUTTON_COLOR, BUTTON_NUMBER, TEXT_COLOR } from '../../constants';
import { getFundingConfig, isVaultedFundingEligible } from '../../funding';

import type { ButtonStyle, Personalization, OnShippingChange } from './props';
import { Spinner } from './spinner';
import { MenuButton } from './menu';

type BasicButtonProps = {|
    style : ButtonStyle,
    fundingSource : $Values<typeof FUNDING>,
    multiple : boolean,
    locale : LocaleType,
    onClick? : Function,
    env : $Values<typeof ENV>,
    fundingEligibility : FundingEligibilityType,
    onShippingChange : OnShippingChange,
    i : number,
    nonce : string,
    clientAccessToken : ?string,
    personalization : Personalization,
    content? : { [string] : string },
    tagline : ?boolean
|};

function getVaultedInstrument({ fundingEligibility, fundingSource, onShippingChange }) : ?{ vaultedInstrument : VaultedInstrument, vendor? : $Values<typeof CARD> } {
    if (!isVaultedFundingEligible({ onShippingChange })) {
        return;
    }

    const fundingSourceEligibility = fundingEligibility[fundingSource];

    if (!fundingSourceEligibility) {
        return;
    }

    if (fundingSourceEligibility.vaultedInstruments && fundingSourceEligibility.vaultedInstruments.length) {
        return { vaultedInstrument: fundingSourceEligibility.vaultedInstruments[0] };
    }

    if (fundingSourceEligibility.vendors) {
        for (const vendor of Object.keys(fundingSourceEligibility.vendors)) {
            const vendorEligibility = fundingSourceEligibility.vendors[vendor];

            if (!vendorEligibility) {
                continue;
            }

            if (vendorEligibility.vaultedInstruments && vendorEligibility.vaultedInstruments.length) {
                return { vendor, vaultedInstrument: vendorEligibility.vaultedInstruments[0] };
            }
        }
    }
}

export function Button({ fundingSource, style, multiple, locale, env, fundingEligibility, i, nonce, clientAccessToken, personalization, onShippingChange, onClick = noop, content, tagline } : BasicButtonProps) : ElementNode {

    const fundingConfig = getFundingConfig()[fundingSource];

    if (!fundingConfig) {
        throw new Error(`Can not find funding config for ${ fundingSource }`);
    }

    const colors = fundingConfig.colors;
    const secondaryColors = fundingConfig.secondaryColors || {};
    const { vaultedInstrument, vendor } = getVaultedInstrument({ fundingEligibility, fundingSource, onShippingChange }) || {};

    let {
        color = colors[0],
        period,
        label
    } = style;

    if (multiple && i > 0) {
        color = secondaryColors[color] || secondaryColors[BUTTON_COLOR.DEFAULT] || colors[0];
    }

    const { logoColors, textColors } = fundingConfig;

    const logoColor = logoColors[color] || logoColors[LOGO_COLOR.DEFAULT] || LOGO_COLOR.DEFAULT;
    const textColor = textColors[color] || textColors[TEXT_COLOR.DEFAULT] || TEXT_COLOR.DEFAULT;

    const { Label, VaultLabel, Logo } = fundingConfig;

    const clickHandler = (event, opts) => {
        event.preventDefault();
        event.stopPropagation();
        event.target.blur();
        onClick(event, { fundingSource, ...opts });
    };

    const keypressHandler = (event, opts) => {
        if (event.keyCode === 13 || event.keyCode === 32) {
            clickHandler(event, opts);
        }
    };

    const { layout, shape } = style;

    const logoNode = (
        <Logo
            label={ label }
            locale={ locale }
            logoColor={ logoColor }
            fundingEligibility={ fundingEligibility }
            onClick={ clickHandler }
            onKeyPress={ keypressHandler }
            nonce={ nonce }
        />
    );

    const labelNode = (vaultedInstrument && VaultLabel)
        ? (
            <VaultLabel
                nonce={ nonce }
                logoColor={ logoColor }
                label={ vaultedInstrument.label.description }
                vendor={ vendor }
            />
        ) : (
            <Label
                i={ i }
                logo={ logoNode }
                label={ label }
                nonce={ nonce }
                locale={ locale }
                logoColor={ logoColor }
                period={ period }
                layout={ layout }
                multiple={ multiple }
                fundingEligibility={ fundingEligibility }
                onClick={ clickHandler }
                onKeyPress={ keypressHandler }
                clientAccessToken={ clientAccessToken }
                personalization={ personalization }
                tagline={ tagline }
                content={ content }
            />
        );

    return (
        <div
            role='button'
            { ...{
                [ ATTRIBUTE.BUTTON ]:            true,
                [ ATTRIBUTE.FUNDING_SOURCE ]:    fundingSource,
                [ ATTRIBUTE.PAYMENT_METHOD_ID ]: vaultedInstrument ? vaultedInstrument.id : null
            } }
            class={ [
                CLASS.BUTTON,
                `${ CLASS.NUMBER }-${ i }`,
                `${ CLASS.LAYOUT }-${ layout }`,
                `${ CLASS.SHAPE }-${ shape }`,
                `${ CLASS.NUMBER }-${ multiple ? BUTTON_NUMBER.MULTIPLE : BUTTON_NUMBER.SINGLE }`,
                `${ CLASS.ENV }-${ env }`,
                `${ CLASS.COLOR }-${ color }`,
                `${ CLASS.TEXT_COLOR }-${ textColor }`,
                `${ LOGO_CLASS.LOGO_COLOR }-${ logoColor }`
            ].join(' ') }
            onClick={ clickHandler }
            onKeyPress={ keypressHandler }
            tabindex='0'>

            <div class={ CLASS.BUTTON_LABEL }>
                { labelNode }
            </div>

            <Spinner />
            { vaultedInstrument ? <MenuButton color={ textColor } /> : null }
        </div>
    );
}
