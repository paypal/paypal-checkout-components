/* @flow */
/** @jsx node */

import type { FundingEligibilityType } from '@paypal/sdk-client/src';
import { FUNDING, ENV, type LocaleType } from '@paypal/sdk-constants/src';
import { node, type ElementNode } from '@krakenjs/jsx-pragmatic/src';
import { LOGO_COLOR, LOGO_CLASS } from '@paypal/sdk-logos/src';
import { noop, preventClickFocus, isBrowser, isElement } from '@krakenjs/belter/src';

import type { ContentType, Wallet, Experiment, WalletInstrument } from '../../types';
import { ATTRIBUTE, CLASS, BUTTON_COLOR, BUTTON_NUMBER, EXPERIENCE, TEXT_COLOR, BUTTON_FLOW } from '../../constants';
import { getFundingConfig } from '../../funding';
import { DesignExperimentLabel } from '../../funding/paypal/template';

import { getButtonDesign } from './buttonDesigns';
import type { ButtonStyle, Personalization, OnShippingChange, OnShippingAddressChange, OnShippingOptionsChange } from './props';
import { Spinner } from './spinner';
import { MenuButton } from './menu-button';

type IndividualButtonProps = {|
    style : ButtonStyle,
    fundingSource : $Values<typeof FUNDING>,
    multiple : boolean,
    locale : LocaleType,
    onClick? : Function,
    env : $Values<typeof ENV>,
    wallet? : ?Wallet,
    fundingEligibility : FundingEligibilityType,
    onShippingChange : ?OnShippingChange,
    onShippingAddressChange : ?OnShippingAddressChange,
    onShippingOptionsChange : ?OnShippingOptionsChange,
    i : number,
    nonce : string,
    userIDToken : ?string,
    personalization : ?Personalization,
    content : ?ContentType,
    tagline : ?boolean,
    commit : boolean,
    experiment : Experiment,
    flow : $Values<typeof BUTTON_FLOW>,
    vault : boolean,
    merchantFundingSource : ?$Values<typeof FUNDING>,
    instrument : ?WalletInstrument,
    experience? : string,
    showPayLabel : boolean
|};

export function Button({ fundingSource, style, multiple, locale, env, fundingEligibility, i, nonce, flow, vault,
    userIDToken, personalization, onClick = noop, content, tagline, commit, experiment, instrument, experience, showPayLabel } : IndividualButtonProps) : ElementNode {
    
    const { custom, layout, shape } = style;
    const inlineExperience = experience === EXPERIENCE.INLINE && custom && custom.label;
    const fundingConfig = getFundingConfig()[fundingSource];

    if (!fundingConfig) {
        throw new Error(`Can not find funding config for ${ fundingSource }`);
    }

    const colors = fundingConfig.colors;
    const secondaryColors = fundingConfig.secondaryColors || {};

    let {
        color = colors[0],
        period,
        label
    } = style;

    if (multiple && i > 0) {
        if (secondaryColors[color] && colors.indexOf(secondaryColors[color] !== -1)) {
            color = secondaryColors[color];
        } else if (colors.indexOf(secondaryColors[BUTTON_COLOR.DEFAULT]) !== -1) {
            color = secondaryColors[BUTTON_COLOR.DEFAULT];
        } else {
            color = colors[0];
        }
    }

    const { logoColors, textColors } = fundingConfig;

    const logoColor = logoColors[color] || logoColors[LOGO_COLOR.DEFAULT] || LOGO_COLOR.DEFAULT;
    const textColor = textColors[color] || textColors[TEXT_COLOR.DEFAULT] || TEXT_COLOR.DEFAULT;

    const { Label, WalletLabel, Logo, showWalletMenu } = fundingConfig;

    const clickHandler = (event, opts) => {
        event.preventDefault();
        event.stopPropagation();
        onClick(event, { fundingSource, ...opts });
    };

    const keypressHandler = (event : KeyboardEvent, opts) => {
        if (event.keyCode === 13 || event.keyCode === 32) {
            clickHandler(event, opts);
        }
    };

    const onButtonRender = el => {
        if (isBrowser() && isElement(el)) {
            preventClickFocus(el);
        }
    };
    
    const labelText = typeof fundingConfig.labelText === 'function' ?  fundingConfig.labelText({ content, fundingEligibility }) : (fundingConfig.labelText || fundingSource);

    const logoNode = (
        <Logo
            label={ label }
            locale={ locale }
            logoColor={ logoColor }
            fundingEligibility={ fundingEligibility }
            onClick={ clickHandler }
            onKeyPress={ keypressHandler }
            nonce={ nonce }
            experiment={ experiment }
            env={ env }
        />
    );

    let labelNode = (
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
            personalization={ personalization }
            tagline={ tagline }
            content={ content }
            custom={ inlineExperience ? custom : undefined }
            experiment={ experiment }
        />
    );

    // Only apply animation to the paypal button
    const buttonDesign = fundingSource === FUNDING.PAYPAL
        ? getButtonDesign(personalization)
        : {};

    const {
        buttonDesignContainerClass = '',
        buttonDesignComponent = null
    } = buttonDesign;

    if (buttonDesignComponent) {
        labelNode = (
            <DesignExperimentLabel
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
                personalization={ personalization }
                tagline={ tagline }
                content={ content }
                buttonDesignComponent={ buttonDesignComponent }
            />
        );
    }

    let isWallet = false;

    if (
        WalletLabel &&
        (!showPayLabel || flow === BUTTON_FLOW.PURCHASE) &&
        (instrument || (__WEB__ && userIDToken && (fundingSource === FUNDING.PAYPAL || fundingSource === FUNDING.VENMO)))
    ) {
        labelNode = (
            <WalletLabel
                nonce={ nonce }
                logoColor={ logoColor }
                instrument={ instrument }
                locale={ locale }
                content={ content }
                commit={ commit }
                experiment={ experiment }
                vault={ vault }
                textColor={ textColor }
                fundingSource={ fundingSource }
                showPayLabel={ showPayLabel }
            />
        );

        isWallet = true;
    }

    const shouldShowWalletMenu = isWallet && instrument && showWalletMenu({ instrument, userIDToken });

    return (
        <div
            class={ [
                CLASS.BUTTON_ROW,
                inlineExperience && fundingSource === FUNDING.CARD ? CLASS.CUSTOM : '',
                `${ CLASS.NUMBER }-${ i }`,
                `${ CLASS.LAYOUT }-${ layout }`,
                `${ CLASS.SHAPE }-${ shape }`,
                `${ CLASS.NUMBER }-${ multiple ? BUTTON_NUMBER.MULTIPLE : BUTTON_NUMBER.SINGLE }`,
                `${ CLASS.ENV }-${ env }`,
                `${ CLASS.COLOR }-${ color }`,
                `${ CLASS.TEXT_COLOR }-${ textColor }`,
                `${ LOGO_CLASS.LOGO_COLOR }-${ logoColor }`,
                `${ isWallet ? CLASS.WALLET : '' }`,
                `${ shouldShowWalletMenu ? CLASS.WALLET_MENU : '' }`,
                `${ buttonDesignContainerClass }`
            ].join(' ') }
        >
            <div
                role='link'
                { ...{
                    [ ATTRIBUTE.BUTTON ]:                    true,
                    [ ATTRIBUTE.FUNDING_SOURCE ]:            fundingSource,
                    [ ATTRIBUTE.PAYMENT_METHOD_ID ]:         instrument ? instrument.tokenID : null,
                    [ ATTRIBUTE.INSTRUMENT_ID ]:             instrument ? instrument.instrumentID : null,
                    [ ATTRIBUTE.INSTRUMENT_TYPE ]:           instrument ? instrument.type : null,
                    [ ATTRIBUTE.SECONDARY_INSTRUMENT_TYPE ]: instrument?.secondaryInstruments ? instrument.secondaryInstruments[0].type : null
                } }
                class={ [
                    CLASS.BUTTON,
                    inlineExperience && fundingSource === FUNDING.CARD ? CLASS.CUSTOM : '',
                    `${ CLASS.NUMBER }-${ i }`,
                    `${ CLASS.LAYOUT }-${ layout }`,
                    `${ CLASS.SHAPE }-${ shape }`,
                    `${ CLASS.NUMBER }-${ multiple ? BUTTON_NUMBER.MULTIPLE : BUTTON_NUMBER.SINGLE }`,
                    `${ CLASS.ENV }-${ env }`,
                    `${ CLASS.COLOR }-${ color }`,
                    `${ CLASS.TEXT_COLOR }-${ textColor }`,
                    `${ LOGO_CLASS.LOGO_COLOR }-${ logoColor }`,
                    `${ isWallet ? CLASS.WALLET : '' }`
                ].join(' ') }
                onClick={ clickHandler }
                onRender={ onButtonRender }
                onKeyPress={ keypressHandler }
                tabindex='0'
                aria-label={ labelText }>

                <div class={ CLASS.BUTTON_LABEL }>
                    { labelNode }
                </div>

                <Spinner />
            </div>

            { shouldShowWalletMenu ? <MenuButton textColor={ textColor } /> : null }
        </div>
    );
}
