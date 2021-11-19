/* @flow */
/** @jsx node */

import { node, type ElementNode } from 'jsx-pragmatic/src';
import { FUNDING, WALLET_INSTRUMENT } from '@paypal/sdk-constants/src';
import { noop } from 'belter/src';

import type { Wallet, WalletInstrument } from '../../types';
import { CLASS, BUTTON_NUMBER, BUTTON_LAYOUT, BUTTON_FLOW } from '../../constants';
import { determineEligibleFunding, isWalletFundingEligible } from '../../funding';
import { ValidationError } from '../../lib';

import { getButtonDesign } from './buttonDesigns';
import { ButtonDesignExperimentScriptWrapper } from './buttonDesigns/script';
import { normalizeButtonProps, type ButtonPropsInputs, type OnShippingChange } from './props';
import { Style } from './style';
import { Button } from './button';
import { TagLine } from './tagline';
import { Script } from './script';
import { PoweredByPayPal } from './poweredBy';

type GetWalletInstrumentOptions = {|
    wallet : ?Wallet,
    fundingSource : $Values<typeof FUNDING>,
    onShippingChange : ?OnShippingChange
|};

function getWalletInstrument({ wallet, fundingSource, onShippingChange } : GetWalletInstrumentOptions) : ?WalletInstrument {
    if (!isWalletFundingEligible({ wallet, onShippingChange })) {
        return;
    }

    const walletFunding = wallet && wallet[fundingSource.toString()];
    const instruments = walletFunding && walletFunding.instruments;

    if (!instruments || !instruments.length) {
        return;
    }

    return instruments[0];
}

const FUNDING_TO_INSTRUMENT = {
    [ FUNDING.CREDIT ]: WALLET_INSTRUMENT.CREDIT
};

type GetWalletInstrumentsOptions = {|
    wallet : ?Wallet,
    fundingSources : $ReadOnlyArray<$Values<typeof FUNDING>>,
    onShippingChange : ?OnShippingChange,
    layout : $Values<typeof BUTTON_LAYOUT>
|};

function getWalletInstruments({ wallet, layout, fundingSources, onShippingChange } : GetWalletInstrumentsOptions) : {| [$Values<typeof FUNDING>] : WalletInstrument |} {

    const instruments = {};
    for (const source of fundingSources) {
        const instrument = getWalletInstrument({ wallet, fundingSource: source, onShippingChange });

        if (instrument) {
            instruments[source] = instrument;
        }
    }

    for (const source of Object.keys(instruments)) {
        for (const mapSource of Object.keys(FUNDING_TO_INSTRUMENT)) {
            if (source !== mapSource && fundingSources.indexOf(mapSource) !== -1 && instruments[source] && instruments[source].type === FUNDING_TO_INSTRUMENT[mapSource]) {
                delete instruments[source];
            }
        }
    }

    if (layout === BUTTON_LAYOUT.HORIZONTAL) {
        let found = false;
        for (const source of fundingSources) {
            if (instruments[source]) {
                if (found) {
                    delete instruments[source];
                } else {
                    found = true;
                }
            }
        }
    }

    // $FlowFixMe[incompatible-return]
    return instruments;
}

type ButtonsProps = ButtonPropsInputs & {|
    onClick? : Function,
    wallet? : ?Wallet
|};

export function validateButtonProps(props : ButtonPropsInputs) {
    normalizeButtonProps(props);
}

export function Buttons(props : ButtonsProps) : ElementNode {
    const { onClick = noop } = props;
    const { wallet, fundingSource, style, locale, remembered, env, fundingEligibility, platform, commit, vault,
        nonce, components, onShippingChange, personalization, userIDToken, content, flow, experiment, applePaySupport, supportsPopups, supportedNativeBrowser } = normalizeButtonProps(props);
    const { layout, shape, tagline } = style;

    let fundingSources = determineEligibleFunding({ fundingSource, layout, remembered, platform, fundingEligibility, components, onShippingChange, flow, wallet, applePaySupport, supportsPopups, supportedNativeBrowser, experiment });
    const multiple = fundingSources.length > 1;

    if (!fundingSources.length) {
        throw new ValidationError(`No eligible funding fundingSources found to render buttons:\n\n${ JSON.stringify(fundingEligibility, null, 4) }`);
    }

    if (fundingSources.indexOf(FUNDING.CARD) !== -1) {
        fundingSources = [ ...fundingSources.filter(src => src !== FUNDING.CARD),  FUNDING.CARD ];
    }

    const instruments = getWalletInstruments({ wallet, fundingSources, layout, onShippingChange });

    const isWallet = (
        flow === BUTTON_FLOW.PURCHASE &&
        ((__WEB__ && userIDToken) || Object.keys(instruments).length)
    );

    const { buttonDesignScript = '' } = getButtonDesign(personalization);

    return (
        <div class={ [
            CLASS.CONTAINER,
            `${ CLASS.LAYOUT }-${ layout }`,
            `${ CLASS.SHAPE }-${ shape }`,
            `${ CLASS.NUMBER }-${ multiple ? BUTTON_NUMBER.MULTIPLE : BUTTON_NUMBER.SINGLE }`,
            `${ CLASS.ENV }-${ env }`,
            `${ isWallet ? CLASS.WALLET : '' }`
        ].join(' ') }>

            <Style
                nonce={ nonce }
                style={ style }
                fundingEligibility={ fundingEligibility }
            />

            {
                fundingSources.map((source, i) => (
                    <Button
                        content={ content }
                        i={ i }
                        style={ style }
                        merchantFundingSource={ fundingSource }
                        fundingSource={ source }
                        multiple={ multiple }
                        env={ env }
                        locale={ locale }
                        nonce={ nonce }
                        fundingEligibility={ fundingEligibility }
                        wallet={ wallet }
                        onShippingChange={ onShippingChange }
                        onClick={ onClick }
                        userIDToken={ userIDToken }
                        personalization={ personalization }
                        tagline={ tagline }
                        commit={ commit }
                        experiment={ experiment }
                        flow={ flow }
                        vault={ vault }
                        instrument={ instruments[source] }
                    />
                ))
            }

            {
                (tagline && layout === BUTTON_LAYOUT.HORIZONTAL && !fundingSource)
                    ? <TagLine
                            fundingSource={ fundingSources[0] }
                            style={ style }
                            locale={ locale }
                            multiple={ multiple }
                            nonce={ nonce }
                            personalization={ personalization }
                    /> : null
            }

            {
                (fundingSources.indexOf(FUNDING.CARD) !== -1)
                    ? <div id="card-fields-container" class="card-fields-container" />
                    : null
            }

            {
                (layout === BUTTON_LAYOUT.VERTICAL && fundingSources.indexOf(FUNDING.CARD) !== -1)
                    ? <PoweredByPayPal
                            locale={ locale }
                            nonce={ nonce }
                    /> : null
            }

            {
                buttonDesignScript
                    ? <ButtonDesignExperimentScriptWrapper
                            nonce={ nonce }
                            buttonDesignScript={ buttonDesignScript }
                    />
                    : <Script
                            nonce={ nonce }
                    />
            }
        </div>
    );
}

export { DEFAULT_PROPS } from './props';
