/* @flow */
/** @jsx node */

import { FUNDING, type LocaleType } from '@paypal/sdk-constants/src';
import { node, html, type ElementNode } from 'jsx-pragmatic/src';

import { CLASS } from '../../constants';
import { getFundingConfig, determineEligibleFunding } from '../../funding';
import { normalizeButtonProps, type ButtonPropsInputs } from '../props';

import { getCommonClasses, Style } from './style';
import { Button } from './button';
import { TagLine } from './tagline';
import { Script } from './script';

type ButtonsProps = ButtonPropsInputs & {|
    onClick? : Function
|};

function getCardNumber(locale : LocaleType) : number {
    const cardConfig = getFundingConfig()[FUNDING.CARD];
    const vendors = cardConfig && cardConfig.vendors;
    let maxCards = 4;

    if (cardConfig && cardConfig.maxCards && cardConfig.maxCards[locale.country]) {
        maxCards = cardConfig.maxCards[locale.country];
    }

    if (vendors) {
        const numCards = Object.keys(vendors).length;
        return Math.min(numCards, maxCards);
    } else {
        return maxCards;
    }
}

export function Buttons(props : ButtonsProps) : ElementNode {
    const { onClick } = props;
    const { style, locale, remembered, env, fundingEligibility, platform, nonce, components } = normalizeButtonProps(props);

    const fundingSources = determineEligibleFunding({ style, remembered, platform, fundingEligibility, components });
    const multiple = fundingSources.length > 1;

    if (!fundingSources.length) {
        throw new Error(`No eligible funding fundingSources found to render buttons:\n\n${ JSON.stringify(fundingEligibility, null, 4) }`);
    }

    const buttonsNode = (
        <div class={ `${ CLASS.CONTAINER } ${ getCommonClasses({ style, multiple, env }) }` }>

            <Style
                nonce={ nonce }
                style={ style }
                cardNumber={ getCardNumber(locale) }
            />

            {
                fundingSources.map((fundingSource, i) => (
                    <Button
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

    // $FlowFixMe
    buttonsNode.toString = () => buttonsNode.render(html());

    const render = buttonsNode.render;
    // $FlowFixMe
    buttonsNode.render = (renderer) => {
        if (renderer.length === 3 && typeof window === 'undefined') {
            return render.call(buttonsNode, html());
        }
        return render.call(buttonsNode, renderer);
    };

    return buttonsNode;
}

export { DEFAULT_PROPS } from '../props';
