/* @flow */

import { FUNDING, type LocaleType } from '@paypal/sdk-constants/src';

import type { StateGetSet } from '../../lib';
import type { OnShippingChange, OnShippingAddressChange, OnShippingOptionsChange } from '../../ui/buttons/props';

export type PaymentFieldsProps = {|
    nonce : ?string,
    locale : LocaleType,
    storageState : StateGetSet,
    sessionState : StateGetSet,
    fundingSource? : ?$Values<typeof FUNDING>,
    onShippingChange? : OnShippingChange,
    onShippingAddressChange? : OnShippingAddressChange,
    onShippingOptionsChange? : OnShippingOptionsChange
|};
