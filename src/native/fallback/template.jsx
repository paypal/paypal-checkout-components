/* @flow */
/** @jsx node */

import { FUNDING } from '@paypal/sdk-constants/src';
import { Spinner, VenmoSpinner } from '@paypal/common-components/src/ui';
import { node, type ComponentNode } from 'jsx-pragmatic/src';

type NativeFallbackProps = {|
    fundingSource : $Values<typeof FUNDING>,
    cspNonce : string
|};

export function NativeFallback({ fundingSource, cspNonce } : NativeFallbackProps) : ComponentNode<{||}> {
    return (fundingSource === FUNDING.VENMO)
        ? <VenmoSpinner nonce={ cspNonce } />
        : <Spinner nonce={ cspNonce } />;
}
