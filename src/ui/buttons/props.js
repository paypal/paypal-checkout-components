/* eslint-disable eslint-comments/disable-enable-pair  */
/* eslint-disable max-lines */
/* @flow */

import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { values, uniqueID } from "@krakenjs/belter/src";
import {
  type OrderCreateRequest,
  type FundingEligibilityType,
  type OrderGetResponse,
  type OrderCaptureResponse,
  type OrderAuthorizeResponse,
} from "@paypal/sdk-client/src";
import {
  CURRENCY,
  FUNDING,
  PLATFORM,
  INTENT,
  COMMIT,
  VAULT,
  ENV,
  COUNTRY,
  LANG,
  COUNTRY_LANGS,
  type LocaleType,
  CARD,
  COMPONENTS,
  DISPLAY_ONLY_VALUES,
} from "@paypal/sdk-constants/src";
import { type CrossDomainWindowType } from "@krakenjs/cross-domain-utils/src";
import { LOGO_COLOR } from "@paypal/sdk-logos/src";
import { SUPPORTED_FUNDING_SOURCES } from "@paypal/funding-components/src";
import type { ComponentFunctionType } from "@krakenjs/jsx-pragmatic/src";

import type { ContentType, Wallet, Experiment } from "../../types";
import {
  BUTTON_LABEL,
  BUTTON_COLOR,
  BUTTON_LAYOUT,
  BUTTON_SHAPE,
  BUTTON_SIZE,
  BUTTON_FLOW,
  MENU_PLACEMENT,
  MESSAGE_OFFER,
  MESSAGE_COLOR,
  MESSAGE_POSITION,
  MESSAGE_ALIGN,
} from "../../constants";
import { getFundingConfig, isFundingEligible } from "../../funding";

import { BUTTON_SIZE_STYLE } from "./config";
import { isBorderRadiusNumber, calculateMessagePosition } from "./util";

export type CreateOrderData = {||} | {||};

export type CreateOrderActions = {|
  order: {|
    create: (OrderCreateRequest) => ZalgoPromise<string>,
  |},
|};

export type CreateOrder = (
  CreateOrderData,
  CreateOrderActions
) => ZalgoPromise<string> | string;

export type OnApproveData = {|
  orderID: string,
  payerID: string,
  paymentID?: string,
|};

export type OnCompleteData = {||};

export type CreateBillingAgreement = () => ZalgoPromise<string> | string;

export type CreateVaultSetupToken = () => ZalgoPromise<string>;

export type CreateSubscriptionRequest = {||};
export type SubscriptionResponse = {||} | {||};
export type CreateSubscriptionData = {||} | {||};

export type CreateSubscriptionActions = {|
  subscription: {|
    create: (CreateSubscriptionRequest) => ZalgoPromise<string>,
    revise: (CreateSubscriptionRequest) => ZalgoPromise<string>,
  |},
|};

export type CreateSubscription = (
  CreateSubscriptionData,
  CreateSubscriptionActions
) => ZalgoPromise<string> | string;

export type OnApproveActions = {|
  redirect: (string, CrossDomainWindowType) => ZalgoPromise<void>,
  order: {|
    capture: () => ZalgoPromise<OrderCaptureResponse>,
    get: () => ZalgoPromise<OrderGetResponse>,
    authorize: () => ZalgoPromise<OrderAuthorizeResponse>,
  |},
  subscription: {|
    get: () => ZalgoPromise<SubscriptionResponse>,
    activate: () => ZalgoPromise<SubscriptionResponse>,
  |},
|};

export type OnCompleteActions = {|
  redirect: (string, CrossDomainWindowType) => ZalgoPromise<void>,
|};

export type OnApprove = (
  data: OnApproveData,
  actions: OnApproveActions
) => ZalgoPromise<void> | void;
export type OnComplete = (
  data: OnCompleteData,
  actions: OnCompleteActions
) => ZalgoPromise<void> | void;

type OnShippingChangeAddress = {|
  city: string,
  state: string,
  country_code: string,
  postal_code: string,
|};

type OnShippingChangeOption = {|
  id?: string,
  label: string,
  type: string,
  amount: {|
    currency_code: string,
    value: string,
  |},
|};

export type ON_SHIPPING_CHANGE_EVENT = "add" | "replace";

export type ShippingOption = {|
  id?: string,
  label: string,
  selected: boolean,
  type: string,
  amount: {|
    currency_code: string,
    value: string,
  |},
|};

export type Query = {|
  op: ON_SHIPPING_CHANGE_EVENT,
  path: string,
  value: mixed,
|};

export type Breakdown = {|
  item_total?: {|
    currency_code: $Values<typeof CURRENCY>,
    value: string,
  |},
  shipping?: {|
    currency_code: $Values<typeof CURRENCY>,
    value: string,
  |},
  handling?: {|
    currency_code: $Values<typeof CURRENCY>,
    value: string,
  |},
  tax_total?: {|
    currency_code: $Values<typeof CURRENCY>,
    value: string,
  |},
  insurance?: {|
    currency_code: $Values<typeof CURRENCY>,
    value: string,
  |},
  shipping_discount?: {|
    currency_code: $Values<typeof CURRENCY>,
    value: string,
  |},
  discount?: {|
    currency_code: $Values<typeof CURRENCY>,
    value: string,
  |},
|};

export type ShippingAmount = {|
  breakdown?: {|
    item_total?: {|
      currency_code: $Values<typeof CURRENCY>,
      value: string,
    |},
    shipping?: {|
      currency_code: $Values<typeof CURRENCY>,
      value: string,
    |},
    handling?: {|
      currency_code: $Values<typeof CURRENCY>,
      value: string,
    |},
    tax_total?: {|
      currency_code: $Values<typeof CURRENCY>,
      value: string,
    |},
    insurance?: {|
      currency_code: $Values<typeof CURRENCY>,
      value: string,
    |},
    shipping_discount?: {|
      currency_code: $Values<typeof CURRENCY>,
      value: string,
    |},
    discount?: {|
      currency_code: $Values<typeof CURRENCY>,
      value: string,
    |},
  |},
  currency_code: $Values<typeof CURRENCY>,
  value: string,
|};

export type OnShippingChangeData = {|
  orderID: string,
  payerID: string,
  paymentID?: string,
  shipping_address: OnShippingChangeAddress,
  selected_shipping_option: OnShippingChangeOption,
  amount?: ShippingAmount,
|};

export type OnShippingChangeActions = {|
  order: {|
    patch: () => ZalgoPromise<OrderGetResponse>,
  |},
|};

export type OnShippingChange = (
  data: OnShippingChangeData,
  actions: OnShippingChangeActions
) => ZalgoPromise<void> | void;

export type OnShippingAddressChangeData = {|
  orderID: string,
  payerID?: string,
  paymentID?: string,
  amount?: ShippingAmount,
  event?: ON_SHIPPING_CHANGE_EVENT,
  shipping_address: OnShippingChangeAddress,
|};

export type OnShippingAddressChangeActions = {|
  patch: () => ZalgoPromise<OrderGetResponse>,
  query: () => $ReadOnlyArray<Query>,
  updateShippingDiscount: ({|
    discountAmount: string,
  |}) => ZalgoPromise<void> | void,
  updateShippingOptions: ({|
    shippingOptions: $ReadOnlyArray<ShippingOption>,
  |}) => ZalgoPromise<void> | void,
  updateTax: {| taxAmount: string |},
|};

export type OnShippingAddressChange = (
  data: OnShippingAddressChangeData,
  actions: OnShippingAddressChangeActions
) => ZalgoPromise<void> | void;

export type OnShippingOptionsChangeData = {|
  orderID: string,
  payerID: string,
  paymentID?: string,
  selected_shipping_option: OnShippingChangeOption,
|};
export type OnShippingOptionsChangeActions = {|
  patch: () => ZalgoPromise<OrderGetResponse>,
  query: () => string,
  updateShippingDiscount: ({|
    discountAmount: string,
  |}) => ZalgoPromise<void> | void,
  updateShippingOptions: ({|
    shippingOptions: $ReadOnlyArray<ShippingOption>,
  |}) => ZalgoPromise<void> | void,
  updateTax: {| taxAmount: string |},
|};

export type OnShippingOptionsChange = (
  data: OnShippingOptionsChangeData,
  actions: OnShippingOptionsChangeActions
) => ZalgoPromise<void> | void;

export type OnCancelData = {|
  orderID: string,
  paymentID?: string,
|};

export type OnCancelActions = {|
  redirect: (string, CrossDomainWindowType) => ZalgoPromise<void>,
|};

export type OnCancel = (
  OnCancelData,
  OnCancelActions
) => ZalgoPromise<void> | void;

export type OnClickData = {|
  fundingSource: $Values<typeof FUNDING>,
  card?: $Values<typeof CARD>,
|};

export type OnClickActions = {|
  resolve: () => ZalgoPromise<void>,
  reject: () => ZalgoPromise<void>,
|};

export type OnClick = (OnClickData, OnClickActions) => void;

export type ButtonStyle = {|
  label: $Values<typeof BUTTON_LABEL> | void,
  color?: $Values<typeof BUTTON_COLOR>,
  shape: $Values<typeof BUTTON_SHAPE>,
  tagline: boolean,
  layout: $Values<typeof BUTTON_LAYOUT>,
  menuPlacement: $Values<typeof MENU_PLACEMENT>,
  period?: number,
  height?: number,
  disableMaxWidth?: boolean,
  disableMaxHeight?: boolean,
  borderRadius?: number,
|};

export type ButtonStyleInputs = {|
  label?: $Values<typeof BUTTON_LABEL> | void,
  color?: $Values<typeof BUTTON_COLOR> | void,
  shape?: $Values<typeof BUTTON_SHAPE> | void,
  tagline?: boolean | void,
  layout?: $Values<typeof BUTTON_LAYOUT> | void,
  period?: number | void,
  height?: number | void,
  disableMaxWidth?: boolean | void,
  disableMaxHeight?: boolean | void,
  borderRadius?: number | void,
|};

type PersonalizationComponentProps = {|
  logoColor: $Values<typeof LOGO_COLOR>,
  period: ?number,
|};

export type Personalization = {|
  buttonText?: {|
    text: string,
    Component: ?ComponentFunctionType<PersonalizationComponentProps>,
    tracking: {|
      impression: string,
      click: string,
    |},
  |},
  tagline?: {|
    text: string,
    Component: ?ComponentFunctionType<PersonalizationComponentProps>,
    tracking: {|
      impression: string,
      click: string,
    |},
  |},
|};

// https://developer.apple.com/documentation/apple_pay_on_the_web/applepayerror/2970147-applepayerror
export type ApplePayError = {|
  code: string, // https://developer.apple.com/documentation/apple_pay_on_the_web/applepayerrorcode
  contactField: string, // https://developer.apple.com/documentation/apple_pay_on_the_web/applepayerrorcontactfield
  message: string, // custom error message
|};

export type ApplePayLineItem = {|
  type?: string, // 'final' | 'pending'
  label?: string,
  amount?: string,
|};

export type ApplePayShippingMethod = {|
  label: string,
  detail: string,
  amount: string,
  identifier: string,
|};

export type ApplePayShippingContactUpdate = {|
  errors?: $ReadOnlyArray<ApplePayError>,
  newShippingMethods?: $ReadOnlyArray<ApplePayShippingMethod>,
  newTotal: ApplePayLineItem,
  newLineItems?: $ReadOnlyArray<ApplePayLineItem>,
|};

export type ApplePayPaymentMethodUpdate = {|
  newTotal: ApplePayLineItem,
  newLineItems?: $ReadOnlyArray<ApplePayLineItem>,
|};

export type ApplePayShippingMethodUpdate = {|
  newTotal: ApplePayLineItem,
  newLineItems?: $ReadOnlyArray<ApplePayLineItem>,
|};

export type ApplePayPaymentAuthorizationResult = {|
  status: number,
  errors?: $ReadOnlyArray<ApplePayError>,
|};

export type ApplePaySessionConfig = {|
  begin: () => void,
  abort: () => void,
  addEventListener: (string, Function) => void,
  // eslint-disable-next-line flowtype/no-weak-types
  completeMerchantValidation: (validatedSession: any) => void,
  completeShippingMethodSelection: (
    update: ApplePayShippingMethodUpdate | {||}
  ) => void,
  completeShippingContactSelection: (
    update: ApplePayShippingContactUpdate | {||}
  ) => void,
  completePaymentMethodSelection: (
    update: ApplePayPaymentMethodUpdate | {||}
  ) => void,
  completePayment: (result: ApplePayPaymentAuthorizationResult) => void,
|};

export type ApplePaySessionConfigRequest = (
  version: number,
  request: Object
) => ApplePaySessionConfig;

export type ButtonMessage = {|
  amount?: number,
  offer?: string,
  color: $Values<typeof MESSAGE_COLOR>,
  position: $Values<typeof MESSAGE_POSITION>,
  align: $Values<typeof MESSAGE_ALIGN>,
|};

export type ButtonMessageInputs = {|
  amount?: number | string | void,
  offer?: $ReadOnlyArray<$Values<typeof MESSAGE_OFFER>> | void,
  color?: $Values<typeof MESSAGE_COLOR> | void,
  position?: $Values<typeof MESSAGE_POSITION> | void,
  align?: $Values<typeof MESSAGE_ALIGN> | void,
|};

export type RenderButtonProps = {|
  style: ButtonStyle,
  locale: LocaleType,
  buyerCountry: $Values<typeof COUNTRY>,
  commit: boolean,
  fundingSource: ?$Values<typeof FUNDING>,
  env: $Values<typeof ENV>,
  stage?: string,
  stageUrl?: string,
  platform: $Values<typeof PLATFORM>,
  fundingEligibility: FundingEligibilityType,
  wallet: ?Wallet,
  remembered: $ReadOnlyArray<$Values<typeof FUNDING>>,
  clientID: string,
  sessionID: string,
  buttonSessionID: string,
  nonce: string,
  enableFunding?: $ReadOnlyArray<?$Values<typeof FUNDING>>,
  components: $ReadOnlyArray<$Values<typeof COMPONENTS>>,
  onShippingChange: ?OnShippingChange,
  onShippingAddressChange: ?OnShippingAddressChange,
  onShippingOptionsChange: ?OnShippingOptionsChange,
  hasShippingCallback: boolean,
  personalization: ?Personalization,
  clientAccessToken: ?string,
  customerId: ?string,
  content?: ContentType,
  flow: $Values<typeof BUTTON_FLOW>,
  experiment: Experiment,
  vault: boolean,
  userIDToken: ?string,
  applePay: ApplePaySessionConfigRequest,
  applePaySupport: boolean,
  supportsPopups: boolean,
  supportedNativeBrowser: boolean,
  showPayLabel: boolean,
  displayOnly?: $ReadOnlyArray<$Values<typeof DISPLAY_ONLY_VALUES>>,
  message?: ButtonMessage,
  messageMarkup?: string,
|};

export type PrerenderDetails = {|
  win: ?CrossDomainWindowType,
  fundingSource: $Values<typeof FUNDING>,
  card: ?$Values<typeof CARD>,
|};

export type GetPrerenderDetails = () => PrerenderDetails | void;

export type ButtonExtensions = {|
  hasReturned: () => boolean,
  resume: () => void,
|};

export type ButtonProps = {|
  // app switch properties
  appSwitchWhenAvailable: string,
  listenForHashChanges: () => void,
  removeListenerForHashChanges: () => void,
  // Not passed to child iframe
  // change any to HashChangeEvent when we move to typescript
  // eslint-disable-next-line flowtype/no-weak-types
  hashChangeHandler: (event: any) => void,
  listenForVisibilityChange: () => void,
  removeListenerForVisibilityChanges: () => void,
  // Not passed to child iframe
  visibilityChangeHandler: () => void,

  fundingSource?: ?$Values<typeof FUNDING>,
  intent: $Values<typeof INTENT>,
  createOrder: CreateOrder,
  createBillingAgreement: CreateBillingAgreement,
  createSubscription: CreateSubscription,
  currency: string,
  disableFunding?: $ReadOnlyArray<$Values<typeof FUNDING>>,
  oncancel: OnCancel,
  onApprove: OnApprove,
  onComplete: OnComplete,
  onClick: OnClick,
  getPrerenderDetails: GetPrerenderDetails,
  style: ButtonStyle,
  locale: LocaleType,
  commit: boolean,
  env: $Values<typeof ENV>,
  stage?: string,
  stageUrl?: string,
  platform: $Values<typeof PLATFORM>,
  fundingEligibility: FundingEligibilityType,
  remembered: $ReadOnlyArray<$Values<typeof FUNDING>>,
  remember: ($ReadOnlyArray<$Values<typeof FUNDING>>) => void,
  clientID: string,
  sessionID: string,
  buttonLocation: string,
  buttonSessionID: string,
  onShippingChange: ?OnShippingChange,
  onShippingAddressChange: ?OnShippingAddressChange,
  onShippingOptionsChange: ?OnShippingOptionsChange,
  hasShippingCallback: boolean,
  clientAccessToken?: ?string,
  customerId?: ?string,
  nonce: string,
  merchantID?: $ReadOnlyArray<string>,
  merchantRequestedPopupsDisabled: ?boolean,
  userIDToken: ?string,
  flow: $Values<typeof BUTTON_FLOW>,
  experiment: Experiment,
  vault: boolean,
  enableFunding?: $ReadOnlyArray<?$Values<typeof FUNDING>>,
  components: $ReadOnlyArray<$Values<typeof COMPONENTS>>,
  supportsPopups: boolean,
  supportedNativeBrowser: boolean,
  applePaySupport: boolean,
  applePay: ApplePaySessionConfigRequest,
  meta: {||},
  renderedButtons: $ReadOnlyArray<$Values<typeof FUNDING>>,
  createVaultSetupToken: CreateVaultSetupToken,
  displayOnly?: $ReadOnlyArray<$Values<typeof DISPLAY_ONLY_VALUES>>,
  hostedButtonId?: string,
  message?: ButtonMessage,
  messageMarkup?: string,
|};

// eslint-disable-next-line flowtype/require-exact-type
export type ButtonPropsInputs = {
  clientID: string,
  fundingSource?: ?$Values<typeof FUNDING>,
  style?: ButtonStyleInputs | void,
  buyerCountry: $Values<typeof COUNTRY>,
  locale?: $PropertyType<ButtonProps, "locale"> | void,
  commit?: $PropertyType<ButtonProps, "commit"> | void,
  env?: $PropertyType<ButtonProps, "env"> | void,
  meta?: $PropertyType<ButtonProps, "meta"> | void,
  stage?: $PropertyType<ButtonProps, "stage"> | void,
  stageUrl?: $PropertyType<ButtonProps, "stageUrl"> | void,
  platform?: $PropertyType<ButtonProps, "platform"> | void,
  fundingEligibility?: $PropertyType<ButtonProps, "fundingEligibility"> | void,
  remembered?: $PropertyType<ButtonProps, "remembered"> | void,
  remember?: $PropertyType<ButtonProps, "remember"> | void,
  sessionID?: $PropertyType<ButtonProps, "sessionID"> | void,
  buttonSessionID?: $PropertyType<ButtonProps, "buttonSessionID"> | void,
  nonce: string,
  enableFunding?: $ReadOnlyArray<?$Values<typeof FUNDING>>,
  components: $ReadOnlyArray<$Values<typeof COMPONENTS>>,
  onShippingChange: ?Function,
  onShippingAddressChange: ?Function,
  onShippingOptionsChange: ?Function,
  hasShippingCallback?: boolean,
  personalization?: Personalization,
  clientAccessToken?: ?string,
  customerId?: ?string,
  wallet?: ?Wallet,
  csp: {|
    nonce: string,
  |},
  content?: ContentType,
  flow?: $Values<typeof BUTTON_FLOW>,
  experiment: Experiment,
  vault: boolean,
  userIDToken: ?string,
  applePay: ApplePaySessionConfigRequest,
  applePaySupport: boolean,
  supportsPopups: boolean,
  supportedNativeBrowser: boolean,
  showPayLabel: boolean,
  displayOnly: $ReadOnlyArray<$Values<typeof DISPLAY_ONLY_VALUES>>,
  message?: ButtonMessageInputs | void,
  messageMarkup?: string | void,
  renderedButtons: $ReadOnlyArray<$Values<typeof FUNDING>>,
};

export const DEFAULT_STYLE = {
  LAYOUT: BUTTON_LAYOUT.VERTICAL,
  COLOR: BUTTON_COLOR.GOLD,
  SHAPE: BUTTON_SHAPE.RECT,
};

export const DEFAULT_PROPS = {
  LOCALE: {
    country: COUNTRY.US,
    lang: LANG.EN,
  },
  COMMIT: COMMIT.TRUE,
  VAULT: VAULT.FALSE,
  INTENT: INTENT.CAPTURE,
  ENV: ENV.PRODUCTION,
  PLATFORM: PLATFORM.DESKTOP,
};

const getDefaultButtonPropsInput = (): ButtonPropsInputs => {
  return {};
};

export function normalizeButtonStyle(
  props: ?ButtonPropsInputs,
  style: ButtonStyleInputs
): ButtonStyle {
  if (!style) {
    throw new Error(`Expected props.style to be set`);
  }

  props = props || getDefaultButtonPropsInput();
  const { fundingSource } = props;

  const FUNDING_CONFIG = getFundingConfig();
  const fundingConfig =
    FUNDING_CONFIG[fundingSource || FUNDING.PAYPAL] ||
    FUNDING_CONFIG[FUNDING.PAYPAL];

  if (!fundingConfig) {
    throw new Error(
      `Expected ${fundingSource || FUNDING.PAYPAL} to be eligible`
    );
  }

  let {
    color,
    label,
    layout = fundingSource
      ? BUTTON_LAYOUT.HORIZONTAL
      : fundingConfig.layouts[0],
    shape = fundingConfig.shapes[0],
    tagline = layout === BUTTON_LAYOUT.HORIZONTAL && !fundingSource,
    height,
    period,
    menuPlacement = MENU_PLACEMENT.BELOW,
    disableMaxWidth,
    disableMaxHeight,
    borderRadius,
  } = style;

  // $FlowFixMe
  if (tagline === "false") {
    // $FlowFixMe
    tagline = false;
  }

  if (values(BUTTON_LAYOUT).indexOf(layout) === -1) {
    throw new Error(`Invalid layout: ${layout}`);
  }

  if (label && values(BUTTON_LABEL).indexOf(label) === -1) {
    throw new Error(`Invalid label: ${label}`);
  }

  if (color && fundingConfig.colors.indexOf(color) === -1) {
    throw new Error(
      `Unexpected style.color for ${
        fundingSource || FUNDING.PAYPAL
      } button: ${color}, expected ${fundingConfig.colors.join(", ")}`
    );
  }

  if (shape && fundingConfig.shapes.indexOf(shape) === -1) {
    throw new Error(
      `Unexpected style.shape for ${
        fundingSource || FUNDING.PAYPAL
      } button: ${shape}, expected ${fundingConfig.shapes.join(", ")}`
    );
  }

  if (height !== undefined) {
    if (typeof height !== "number") {
      throw new TypeError(
        `Expected style.height to be a number, got: ${height}`
      );
    }

    const [minHeight, maxHeight] = [
      BUTTON_SIZE_STYLE[BUTTON_SIZE.SMALL].minHeight,
      BUTTON_SIZE_STYLE[BUTTON_SIZE.HUGE].maxHeight,
    ];

    if (disableMaxHeight === true) {
      throw new TypeError(
        `Unexpected style.height for style.disableMaxHeight: got: ${height}, expected undefined.`
      );
    }

    if (height < minHeight || height > maxHeight) {
      throw new Error(
        `Expected style.height to be between ${minHeight}px and ${maxHeight}px - got ${height}px`
      );
    }
  }

  if (disableMaxHeight !== undefined) {
    if (typeof disableMaxHeight !== "boolean") {
      throw new TypeError(
        `Expected style.disableMaxHeight to be a boolean, got: ${disableMaxHeight}`
      );
    }

    const disableMaxHeightInvalidFundingSources = [FUNDING.CARD, undefined];
    const disableMaxHeightValidFundingSources = Object.values(FUNDING).filter(
      (fundingSourceId) =>
        !disableMaxHeightInvalidFundingSources.includes(fundingSourceId)
    );

    if (disableMaxHeightInvalidFundingSources.includes(fundingSource)) {
      throw new TypeError(
        `Unexpected fundingSource for style.disableMaxHeight: got: ${
          fundingSource ? fundingSource : "Smart Stack"
        }, expected ${disableMaxHeightValidFundingSources.join(", ")}.`
      );
    }
  }

  if (borderRadius !== undefined) {
    if (!isBorderRadiusNumber(borderRadius)) {
      throw new TypeError(
        `Expected style.borderRadius to be a number, got: ${borderRadius}`
      );
    }

    if (borderRadius < 0) {
      throw new Error(
        `Expected style.borderRadius to be greater than or equal to 0, got: ${borderRadius}`
      );
    }
  }

  if (layout === BUTTON_LAYOUT.VERTICAL) {
    if (tagline) {
      throw new Error(
        `style.tagline is not allowed for ${BUTTON_LAYOUT.VERTICAL} layout`
      );
    }
  }

  return {
    label,
    layout,
    color,
    shape,
    tagline,
    height,
    period,
    menuPlacement,
    disableMaxWidth,
    disableMaxHeight,
    borderRadius,
  };
}

export function normalizeButtonMessage(
  message: ButtonMessageInputs,
  layout: $Values<typeof BUTTON_LAYOUT>,
  fundingSources: $ReadOnlyArray<$Values<typeof FUNDING>>
): ButtonMessage {
  const {
    color = MESSAGE_COLOR.BLACK,
    position,
    align = MESSAGE_ALIGN.CENTER,
  } = message;
  let offer = message.offer;
  let amount = message.amount;

  if (typeof amount !== "undefined") {
    if (typeof amount === "string") {
      amount = Number(amount);
    }
    if (typeof amount !== "number" || isNaN(amount)) {
      throw new TypeError(
        `Expected message.amount to be a number, got: ${amount}`
      );
    }
    if (amount < 0) {
      throw new Error(
        `Expected message.amount to be a positive number, got: ${amount}`
      );
    }
  }

  if (typeof offer !== "undefined") {
    if (typeof offer === "string") {
      offer = offer.split(",");
    }
    if (!Array.isArray(offer)) {
      throw new TypeError(
        `Expected message.offer to be an array of strings, got: ${String(
          offer
        )}`
      );
    }
    const invalidOffers = offer.filter(
      (o) => !values(MESSAGE_OFFER).includes(o)
    );
    if (invalidOffers.length > 0) {
      throw new Error(`Invalid offer(s): ${invalidOffers.join(",")}`);
    }
    offer = offer.join(",");
  }

  if (typeof color !== "undefined" && !values(MESSAGE_COLOR).includes(color)) {
    throw new Error(`Invalid color: ${color}`);
  }

  if (
    typeof position !== "undefined" &&
    !values(MESSAGE_POSITION).includes(position)
  ) {
    throw new Error(`Invalid position: ${position}`);
  }

  if (typeof align !== "undefined" && !values(MESSAGE_ALIGN).includes(align)) {
    throw new Error(`Invalid align: ${align}`);
  }

  return {
    amount,
    offer,
    color,
    position: calculateMessagePosition(fundingSources, layout, position),
    align,
  };
}

const COUNTRIES = values(COUNTRY);
const FUNDING_SOURCES = values(FUNDING);
const ENVS = values(ENV);
const PLATFORMS = values(PLATFORM);

const getDefaultStyle = (): ButtonStyleInputs => {
  // $FlowFixMe
  return {};
};

const getDefaultExperiment = (): Experiment => {
  // $FlowFixMe
  return {};
};

export function normalizeButtonProps(
  props: ?ButtonPropsInputs
): RenderButtonProps {
  if (!props) {
    throw new Error(`Expected props`);
  }

  const defaultHasShippingCallback = Boolean(
    props.onShippingChange ||
      props.onShippingAddressChange ||
      props.onShippingOptionsChange
  );

  let {
    buyerCountry,
    clientID,
    fundingSource,
    style = getDefaultStyle(),
    remembered = [],
    locale = DEFAULT_PROPS.LOCALE,
    env = DEFAULT_PROPS.ENV,
    platform = DEFAULT_PROPS.PLATFORM,
    commit = DEFAULT_PROPS.COMMIT,
    fundingEligibility,
    sessionID = uniqueID(),
    buttonSessionID = uniqueID(),
    enableFunding,
    components = [COMPONENTS.BUTTONS],
    nonce,
    onShippingChange,
    onShippingAddressChange,
    onShippingOptionsChange,
    hasShippingCallback = defaultHasShippingCallback,
    personalization,
    clientAccessToken,
    customerId,
    content,
    wallet,
    flow = BUTTON_FLOW.PURCHASE,
    experiment = getDefaultExperiment(),
    vault,
    userIDToken,
    applePay,
    applePaySupport = false,
    supportsPopups = false,
    supportedNativeBrowser = false,
    showPayLabel = true,
    displayOnly = [],
    message,
    messageMarkup,
    renderedButtons,
  } = props;

  const { country, lang } = locale;

  if (!country || COUNTRIES.indexOf(country) === -1) {
    throw new Error(`Expected valid country, got ${country || "undefined"}`);
  }

  if (!lang || COUNTRY_LANGS[country].indexOf(lang) === -1) {
    throw new Error(`Expected valid lang, got ${lang || "undefined"}`);
  }

  if (remembered.some((source) => FUNDING_SOURCES.indexOf(source) === -1)) {
    throw new Error(
      `Expected valid funding sources, got ${JSON.stringify(remembered)}`
    );
  }

  if (ENVS.indexOf(env) === -1) {
    throw new Error(`Expected valid env, got ${env || "undefined"}`);
  }

  if (!fundingEligibility) {
    throw new Error(`Expected fundingEligibility`);
  }

  if (PLATFORMS.indexOf(platform) === -1) {
    throw new Error(`Expected valid platform, got ${platform || "undefined"}`);
  }

  if (fundingSource) {
    if (SUPPORTED_FUNDING_SOURCES.indexOf(fundingSource) === -1) {
      throw new Error(`Invalid funding source: ${fundingSource}`);
    }

    if (
      !isFundingEligible(fundingSource, {
        platform,
        fundingSource,
        fundingEligibility,
        enableFunding,
        experiment,
        components,
        onShippingChange,
        onShippingAddressChange,
        onShippingOptionsChange,
        hasShippingCallback,
        wallet,
        flow,
        applePaySupport,
        supportsPopups,
        supportedNativeBrowser,
        displayOnly,
      })
    ) {
      throw new Error(`Funding Source not eligible: ${fundingSource}`);
    }
  }

  style = normalizeButtonStyle(props, style);
  const { layout } = style;

  message = message
    ? normalizeButtonMessage(message, layout, renderedButtons)
    : undefined;

  return {
    buyerCountry,
    clientID,
    fundingSource,
    style,
    locale,
    remembered,
    env,
    fundingEligibility,
    platform,
    clientAccessToken,
    buttonSessionID,
    commit,
    sessionID,
    nonce,
    enableFunding,
    components,
    onShippingChange,
    onShippingAddressChange,
    onShippingOptionsChange,
    hasShippingCallback,
    personalization,
    content,
    wallet,
    flow,
    experiment,
    vault,
    userIDToken,
    customerId,
    applePay,
    applePaySupport,
    supportsPopups,
    supportedNativeBrowser,
    showPayLabel,
    displayOnly,
    message,
    messageMarkup,
  };
}
