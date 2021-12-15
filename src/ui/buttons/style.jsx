/* @flow */
/** @jsx node */

import { node, type ElementNode } from 'jsx-pragmatic/src';
import { type Personalization } from '@paypal/personalization/src';
import { type FundingEligibilityType } from '@paypal/sdk-constants/src';

import { type ButtonStyle } from './props';
import { componentStyle } from './styles';

type StyleProps = {|
    style : ButtonStyle,
    nonce : string,
    fundingEligibility : FundingEligibilityType,
    personalizations? : ?$ReadOnlyArray<Personalization>
|};

export function Style({ style, nonce, fundingEligibility, personalizations = [] } : StyleProps) : ElementNode {

    const { height } = style;
    const css = componentStyle({ height, fundingEligibility });

    const personalizationStyles = personalizations?.reduce(
        (prev, curr) => prev + (curr?.treatment?.css || '')
        , ''
    );

    return (
        <style nonce={ nonce } innerHTML={ `${ css }${ personalizationStyles || '' }` } />
    );
}
