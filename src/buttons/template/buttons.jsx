/* @flow */
/** @jsx node */

import { node, html, type ElementNode } from 'jsx-pragmatic/src';

import { CLASS } from '../../constants';
import { determineEligibleFunding } from '../../funding';
import { normalizeButtonProps, type ButtonPropsInputs } from '../props';

import { getCommonClasses, Style } from './style';
import { Button } from './button';
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

    const buttonsNode = (
        <div class={ `${ CLASS.CONTAINER } ${ getCommonClasses({ style, multiple, env }) }` }>

            <Style
                nonce={ nonce }
                style={ style }
                locale={ locale }
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
