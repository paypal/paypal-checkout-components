/* @flow */
/** @jsx node */

import { FUNDING, ENV, type LocaleType, CARD } from '@paypal/sdk-constants/src';
import { node, type ElementNode } from 'jsx-pragmatic/src';
import { LOGO_COLOR, LOGO_CLASS } from '@paypal/sdk-logos/src';
import { noop } from 'belter/src';

import { BUTTON_LABEL, ATTRIBUTE, CLASS, BUTTON_COLOR, BUTTON_NUMBER } from '../../constants';
import { getFundingConfig } from '../../funding';
import { type ButtonStyle } from '../props';
import type { FundingEligibilityType } from '../../types';

import { Spinner } from './spinner';

type BasicButtonProps = {|
    style : ButtonStyle,
    fundingSource : $Values<typeof FUNDING>,
    multiple : boolean,
    locale : LocaleType,
    onClick? : Function,
    env : $Values<typeof ENV>,
    fundingEligibility : FundingEligibilityType,
    i : number,
    nonce : string
|};

function determineLabel({ fundingSource, style } :
    {| fundingSource : $Values<typeof FUNDING>, style : ButtonStyle |}) : $Values<typeof BUTTON_LABEL> {

    const fundingConfig = getFundingConfig()[fundingSource];

    if (!fundingConfig) {
        throw new Error(`Can not find config for ${ fundingSource }`);
    }

    const labelsConfig = fundingConfig.labels;
    const { label } = style;

    if (labelsConfig[label]) {
        return label;
    }

    if (fundingConfig.defaultLabel) {
        return fundingConfig.defaultLabel;
    }

    throw new Error(`Could not determine label for ${ fundingSource }`);
}

export function BasicButton({ fundingSource, style, multiple, locale, env, fundingEligibility, i, nonce, onClick = noop } : BasicButtonProps) : ElementNode {

    let { color, period } = style;

    const buttonLabel = determineLabel({ fundingSource, style });
    
    const fundingConfig = getFundingConfig()[fundingSource];

    if (!fundingConfig) {
        throw new Error(`Can not find funding config for ${ fundingSource }`);
    }

    const labelConfig = fundingConfig.labels[buttonLabel];

    if (!labelConfig) {
        throw new Error(`Can not find label config for ${ buttonLabel }`);
    }

    const colors = labelConfig.colors;
    const secondaryColors = labelConfig.secondaryColors || {};

    if (multiple && i > 0) {
        color = secondaryColors[color] || secondaryColors[BUTTON_COLOR.DEFAULT] || colors[0];
    }

    const logoColors = labelConfig.logoColors || {};
    const logoColor = logoColors[color] || logoColors[LOGO_COLOR.DEFAULT] || LOGO_COLOR.DEFAULT;

    const { Label, handleClick } = labelConfig;

    const clickHandler = (event, opts) => {
        event.preventDefault();
        event.stopPropagation();
        onClick({ fundingSource, ...opts });
    };

    const { layout, shape } = style;

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
                `${ CLASS.LABEL }-${ buttonLabel }`,
                `${ CLASS.COLOR }-${ color }`,
                `${ LOGO_CLASS.LOGO_COLOR }-${ logoColor }`
            ].join(' ') }
            aria-label={ fundingSource }
            onClick={ handleClick ? null : clickHandler }
            tabindex={ handleClick ? '-1' : '0' }>

            <Label
                nonce={ nonce }
                locale={ locale }
                logoColor={ logoColor }
                period={ period }
                multiple={ multiple }
                fundingEligibility={ fundingEligibility }
                onClick={ clickHandler }
            />

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
        onClick({ fundingSource, ...opts });
    };

    let { layout, shape, color } = style;

    const fundingConfig = getFundingConfig()[fundingSource];

    if (!fundingConfig) {
        throw new Error(`Can not find funding config for ${ fundingSource }`);
    }

    const labelConfig = fundingConfig.labels[fundingConfig.defaultLabel];

    if (!labelConfig) {
        throw new Error(`Can not find default label config for ${ fundingSource }`);
    }

    const { VaultLabel, colors, logoColors = {}, secondaryVaultColors = {} } = labelConfig;

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
                `${ CLASS.LAYOUT }-${ layout }`,
                `${ CLASS.SHAPE }-${ shape }`,
                `${ CLASS.NUMBER }-${ multiple ? BUTTON_NUMBER.MULTIPLE : BUTTON_NUMBER.SINGLE }`,
                `${ CLASS.ENV }-${ env }`,
                `${ CLASS.COLOR }-${ color }`
            ].join(' ') }
            aria-label={ fundingSource }
            onClick={ clickHandler } >

            <VaultLabel
                nonce={ nonce }
                logoColor={ logoColor }
                vendor={ vendor }
                label={ label }
            />

            <Spinner />
        </div>
    );
}
