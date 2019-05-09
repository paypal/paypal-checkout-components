/* @flow */
/** @jsx node */

import { node, type ElementNode } from 'jsx-pragmatic/src';

import { CLASS, BUTTON_NUMBER } from '../../constants';
import { determineEligibleFunding, determineVaultedFunding } from '../../funding';
import { normalizeButtonProps, type ButtonPropsInputs } from '../props';

import { Style } from './style';
import { BasicButton, VaultedButton } from './button';
import { TagLine } from './tagline';
import { Script } from './script';

type ButtonsProps = ButtonPropsInputs & {|
    onClick? : Function
|};

export function Buttons(props : ButtonsProps) : ElementNode {
    const { onClick } = props;
    const { style, locale, remembered, env, fundingEligibility, platform, nonce, components } = normalizeButtonProps(props);

    const fundingSources = determineEligibleFunding({ style, remembered, platform, fundingEligibility, components });
    const multiple = fundingSources.length > 1;

    if (!fundingSources.length) {
        throw new Error(`No eligible funding fundingSources found to render buttons:\n\n${ JSON.stringify(fundingEligibility, null, 4) }`);
    }

    const { layout, shape } = style;
    const vaultedFunding = determineVaultedFunding({ fundingEligibility, layout });

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
                fundingSources.map((fundingSource, i) => (
                    <BasicButton
                        i={ i }
                        style={ style }
                        fundingSource={ fundingSource }
                        multiple={ multiple }
                        env={ env }
                        locale={ locale }
                        nonce={ nonce }
                        fundingEligibility={ fundingEligibility }
                        onClick={ onClick }
                    />
                ))
            }

            {
                vaultedFunding.length
                    ? <p class={ `${ CLASS.VAULT_HEADER } ${ CLASS.TEXT }` }>Saved payment methods</p>
                    : null
            }

            {
                vaultedFunding.map(({ fundingSource, paymentMethodID, vendor, label }) => (
                    <VaultedButton
                        style={ style }
                        fundingSource={ fundingSource }
                        multiple={ multiple }
                        env={ env }
                        nonce={ nonce }
                        onClick={ onClick }
                        vendor={ vendor }
                        label={ label }
                        paymentMethodID={ paymentMethodID }
                    />
                ))
            }
            
            <TagLine
                fundingSource={ fundingSources[0] }
                style={ style }
                locale={ locale }
                multiple={ multiple }
                nonce={ nonce }
            />

            <Script
                nonce={ nonce }
            />
        </div>
    );
}

export { DEFAULT_PROPS } from '../props';
