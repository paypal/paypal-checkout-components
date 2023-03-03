/* @flow */

import type { LocaleType } from '@paypal/sdk-constants/src';

import type { StateGetSet } from '../../lib';

export type PaymentFieldsProps = {|
    nonce : ?string,
    locale : LocaleType,
    storageState : StateGetSet,
    sessionState : StateGetSet
|};
