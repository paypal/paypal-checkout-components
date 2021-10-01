/* @flow */

import type { CrossDomainWindowType } from 'cross-domain-utils/src';
import type { ZalgoPromise } from 'zalgo-promise/src';
import { COUNTRY, CURRENCY, FUNDING, CARD, WALLET_INSTRUMENT } from '@paypal/sdk-constants/src';

import type { ButtonProps, Components, ServiceData, Config } from '../button/props';
import type { ProxyWindow, MenuChoices } from '../types';
import { BUYER_INTENT } from '../constants';

// export something to force webpack to see this as an ES module
export const TYPES = true;

export type PaymentFlowInstance = {|
    click? : () => ZalgoPromise<boolean> | ZalgoPromise<void> | boolean | void,
    start : () => ZalgoPromise<void>,
    close : () => ZalgoPromise<void>
|};

export type Payment = {|
    button : HTMLElement,
    menuToggle? : ?HTMLElement,
    win? : ?(ProxyWindow | CrossDomainWindowType),
    fundingSource : $Values<typeof FUNDING>,
    instrumentType? : ?$Values<typeof WALLET_INSTRUMENT>,
    card : ?$Values<typeof CARD>,
    paymentMethodID? : ?string,
    instrumentID? : ?string,
    isClick? : boolean,
    buyerAccessToken? : ?string,
    venmoPayloadID? : string,
    buyerIntent : $Values<typeof BUYER_INTENT>,
    createAccessToken? : () => ZalgoPromise<?string>,
    isNativeFallback? : boolean
|};

export type SetupOptions = {|
    props : ButtonProps,
    serviceData : ServiceData,
    config : Config,
    components : Components
|};

export type IsEligibleOptions = {|
    props : ButtonProps,
    serviceData : ServiceData,
    config : Config
|};

export type IsPaymentEligibleOptions = {|
    props : ButtonProps,
    serviceData : ServiceData,
    payment : Payment,
    config : Config
|};

export type IsInstallmentsEligibleOptions = {|
    props : ButtonProps,
    serviceData : ServiceData
|};


export type RestartPayment = ({| payment : Payment |}) => ZalgoPromise<void>;

export type InitOptions = {|
    props : ButtonProps,
    serviceData : ServiceData,
    payment : Payment,
    components : Components,
    config : Config,
    restart : RestartPayment
|};

export type MenuOptions = {|
    props : ButtonProps,
    payment : Payment,
    serviceData : ServiceData,
    components : Components,
    config : Config,
    restart : RestartPayment
|};

export type UpdateClientConfigOptions = {|
    orderID : string,
    payment : Payment,
    userExperienceFlow? : string,
    buttonSessionID? : ?string
|};

export type PaymentFlow = {|
    name : string,
    setup : (SetupOptions) => ZalgoPromise<void> | void,
    isEligible : (IsEligibleOptions) => boolean,
    isPaymentEligible : (IsPaymentEligibleOptions) => boolean,
    init : <T>(InitOptions, overrides? : T) => PaymentFlowInstance, // eslint-disable-line no-undef
    setupMenu? : (MenuOptions) => MenuChoices,
    updateFlowClientConfig? : (UpdateClientConfigOptions) => ZalgoPromise<void>,
    spinner? : boolean,
    inline? : boolean,
    popup? : boolean
|};

export type FundingOptionType = 'BANK_ACCOUNT' | 'CREDIT_CARD' | 'CRYPTOCURRENCY' | 'DEBIT_CARD' | 'INCENTIVE' | 'PAYPAL_BALANCE' | 'PAYPAL_CREDIT' | 'PRIVATE_LABEL_CREDIT_CARD' | 'REWARDS';

export type FundingInstrument = {|
    type : FundingOptionType
|};

export type FundingOption = {|
    fundingInstrument : FundingInstrument
|};

export type Shipping_Address = {|
    city : string,
    state : string,
    country_code : $Values<typeof COUNTRY>,
    postal_code : string
|};

export type ShippingAddress = {|
    firstName : string,
    lastName : string,
    line1 : string,
    line2 : string,
    city : string,
    state : string,
    postalCode : string,
    country : string
|};

export type ShippingMethod = {|
    amount : {|
        currencyCode : $Values<typeof CURRENCY>,
        currencyValue : string
    |},
    label : string,
    selected : boolean,
    type : 'SHIPPING' | 'PICKUP'
|};

export type ApplePayMerchantCapabilities =
    'supports3DS' | 'supportsEMV' | 'supportsCredit' | 'supportsDebit';

export type ApplePaySupportedNetworks =
    'discover' | 'visa' | 'masterCard' | 'amex' | 'jcb' | 'chinaUnionPay' | 'cartesBancaires' | 'maestro' | 'eftpos' | 'electron' | 'vPay';

export type ApplePayLineItemType = 'final' | 'pending';
export type ApplePayLineItem = {|
    type? : ApplePayLineItemType,
    label : string,
    amount : string
|};

export type ApplePayContactField = 'email' | 'name' | 'phone' | 'postalAddress' | 'phoneticName';
export type ApplePayErrorContactField = 'postalAddress' | 'locality' | 'subLocality' | 'postalCode' | 'administrativeArea' | 'subAdministrativeArea' | 'country' | 'countryCode';

export type ApplePayPaymentContact = {|
    phoneNumber? : string,
    emailAddress? : string,
    givenName? : string,
    familyName? : string,
    phoneticGivenName? : string,
    phoneticFamilyName? : string,
    addressLines? : $ReadOnlyArray<string>,
    subLocality? : string,
    locality? : string,
    postalCode? : string,
    subAdministrativeArea? : string,
    administrativeArea? : string,
    country? : string,
    countryCode? : string
|};

export const ApplePayShippingType = {
    shipping:       ('shipping' : 'shipping'),
    delivery:       ('delivery' : 'delivery'),
    storePickup:    ('storePickup' : 'storePickup'),
    servicePickup:  ('servicePickup' : 'servicePickup')
};

export type ApplePayShippingMethod = {|
    label : string,
    detail : string,
    amount : string,
    identifier : string
|};

export type ApplePayPaymentMethodType = 'debit' | 'credit' | 'prepaid' | 'store';

export type ApplePayPaymentPassActivationState = 'activated' | 'requiresActivation' | 'activating' | 'suspended' | 'deactivated';

export type ApplePayPaymentPass = {|
    primaryAccountIdentifier : string,
    primaryAccountNumberSuffix : string,
    deviceAccountIdentifier? : string,
    deviceAccountNumberSuffic? : string,
    activationState : ApplePayPaymentPassActivationState
|};

export type ApplePayPaymentMethod = {|
    displayName? : string,
    network? : string,
    type? : ApplePayPaymentMethodType,
    paymentPass? : ApplePayPaymentPass,
    billingContact? : ApplePayPaymentContact
|};

export type ApplePayPaymentToken = {|
    paymentMethod : ApplePayPaymentMethod,
    transactionIdentifier? : string,
    paymentData? : Object
|};

export type ApplePayPayment = {|
    token : ApplePayPaymentToken,
    billingContact? : ApplePayPaymentContact,
    shippingContact? : ApplePayPaymentContact
|};

export type ApplePayPaymentRequest = {|
    merchantCapabilities : $ReadOnlyArray<ApplePayMerchantCapabilities>,
    supportedNetworks : $ReadOnlyArray<ApplePaySupportedNetworks>,
    countryCode : $Values<typeof COUNTRY>,
    requiredBillingContactFields? : $ReadOnlyArray<ApplePayContactField>,
    billingContact? : ApplePayPaymentContact,
    requiredShippingContactFields? : $ReadOnlyArray<ApplePayContactField>,
    shippingContact? : ApplePayPaymentContact,
    applicationData? : string,
    supportedCountries? : $ReadOnlyArray<typeof COUNTRY>,
    total : ApplePayLineItem,
    lineItems? : $ReadOnlyArray<ApplePayLineItem>,
    currencyCode : $Values<typeof CURRENCY>,
    shippingType? : $Values<typeof ApplePayShippingType>,
    shippingMethods? : $ReadOnlyArray<ApplePayShippingMethod>
|};

type ApplePayErrorCode = 'shippingContactInvalid' | 'billingContactInvalid' | 'addressUnserviceable' | 'unknown';

export type ApplePayError = {|
    code : ApplePayErrorCode,
    contactField : ApplePayErrorContactField,
    message : string
|};

export type ApplePayShippingContactUpdate = {|
    errors? : $ReadOnlyArray<ApplePayError>,
    newShippingMethods? : $ReadOnlyArray<ApplePayShippingMethod>,
    newTotal : ApplePayLineItem,
    newLineItems? : $ReadOnlyArray<ApplePayLineItem>
|};

export type ApplePayPaymentMethodUpdate = {|
    newTotal : ApplePayLineItem,
    newLineItems? : $ReadOnlyArray<ApplePayLineItem>
|};

export type ApplePayShippingMethodUpdate = {|
    newTotal : ApplePayLineItem,
    newLineItems? : $ReadOnlyArray<ApplePayLineItem>
|};

type ApplePayPaymentAuthorizationResult = {|
    status : number,
    errors? : $ReadOnlyArray<ApplePayError>
|};

type ApplePaySessionConfig = {|
    begin : () => void,
    addEventListener : (string, Function) => void,
    // eslint-disable-next-line flowtype/no-weak-types
    completeMerchantValidation : (validatedSession : any) => void,
    completeShippingMethodSelection : (update : ApplePayShippingMethodUpdate | {||}) => void,
    completeShippingContactSelection : (update : ApplePayShippingContactUpdate | {||}) => void,
    completePaymentMethodSelection : (update : ApplePayPaymentMethodUpdate | {||}) => void,
    completePayment : (result : ApplePayPaymentAuthorizationResult) => void
|};

export type XApplePaySessionConfigRequest = (version : number, request : Object) => ZalgoPromise<ApplePaySessionConfig>;

