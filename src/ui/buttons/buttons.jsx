/* @flow */
/** @jsx node */

import { node, type ElementNode } from 'jsx-pragmatic/src';
import { FUNDING } from '@paypal/sdk-constants/src';
import { noop } from 'belter/src';

import type { Wallet } from '../../types';
import { CLASS, BUTTON_NUMBER, BUTTON_LAYOUT } from '../../constants';
import { determineEligibleFunding } from '../../funding';

import { normalizeButtonProps, type ButtonPropsInputs } from './props';
import { Style } from './style';
import { Button } from './button';
import { TagLine } from './tagline';
import { Script } from './script';
import { PoweredByPayPal } from './poweredBy';

type ButtonsProps = ButtonPropsInputs & {|
    onClick? : Function,
    wallet? : ?Wallet
|};

export function validateButtonProps(props : ButtonsProps) {
    normalizeButtonProps(props);
}

export function Buttons(props : ButtonsProps) : ElementNode {
    const { onClick = noop } = props;
    const { wallet, fundingSource, style, locale, remembered, env, fundingEligibility, platform, commit,
        nonce, components, onShippingChange, personalization, clientAccessToken, content, flow, experiment, enablePWB } = normalizeButtonProps(props);
    const { layout, shape, tagline } = style;

    const fundingSources = determineEligibleFunding({ fundingSource, layout, remembered, platform, fundingEligibility, components, onShippingChange, flow });
    const multiple = fundingSources.length > 1;

    if (!fundingSources.length) {
        throw new Error(`No eligible funding fundingSources found to render buttons:\n\n${ JSON.stringify(fundingEligibility, null, 4) }`);
    }

    return (
        <div class={ [
            CLASS.CONTAINER,
            `${ CLASS.LAYOUT }-${ layout }`,
            `${ CLASS.SHAPE }-${ shape }`,
            `${ CLASS.NUMBER }-${ multiple ? BUTTON_NUMBER.MULTIPLE : BUTTON_NUMBER.SINGLE }`,
            `${ CLASS.ENV }-${ env }`
        ].join(' ') }>

            <Style
                nonce={ nonce }
                style={ style }
                locale={ locale }
            />

            {
                fundingSources.map((source, i) => (
                    <Button
                        content={ content }
                        i={ i }
                        style={ style }
                        fundingSource={ source }
                        multiple={ multiple }
                        env={ env }
                        locale={ locale }
                        nonce={ nonce }
                        fundingEligibility={ fundingEligibility }
                        wallet={ wallet }
                        onShippingChange={ onShippingChange }
                        onClick={ onClick }
                        clientAccessToken={ clientAccessToken }
                        personalization={ personalization }
                        tagline={ tagline }
                        commit={ commit }
                        experiment={ experiment }
                        enablePWB = { enablePWB }
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
                (layout === BUTTON_LAYOUT.VERTICAL && fundingSources.indexOf(FUNDING.CARD) !== -1)
                    ? <PoweredByPayPal
                        locale={ locale }
                    /> : null
            }

            <Script
                nonce={ nonce }
            />
        </div>
    );
}

export { DEFAULT_PROPS } from './props';
