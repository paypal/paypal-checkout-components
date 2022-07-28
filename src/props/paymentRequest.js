/* @flow */

import type { ApplePayPaymentContact } from "../payment-flows/types";

type ApplepayConfig = {|
    requiredBillingContactFields: $ReadOnlyArray<string>,
    requiredShippingContactFields: $ReadOnlyArray<string>,
    shippingContact: ApplePayPaymentContact
|}

export type PaymentRequest = {|
    applepay: ApplepayConfig,
|}
