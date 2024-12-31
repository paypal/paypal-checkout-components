/* @flow */
/* eslint-disable no-restricted-globals, promise/no-native */
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { type ZoidComponent } from "@krakenjs/zoid/src";

export type MerchantPayloadData = {|
  amount: string,
  currency: string,
  nonce: string,
  threeDSRequested?: boolean,
  transactionContext?: Object,
  idToken?: string,
|};

// eslint-disable-next-line no-undef
export type Request = <TRequestData, TResponse>({|
  method?: string,
  url: string,
  // eslint-disable-next-line no-undef
  data: TRequestData,
  accessToken: ?string,
  // eslint-disable-next-line no-undef
|}) => Promise<TResponse>;

export type requestData = {|
  intent: "THREE_DS_VERIFICATION",
  payment_source: {|
    card: {|
      single_use_token: string,
      verification_method: string,
    |},
  |},
  amount: {|
    currency_code: string,
    value: string,
  |},
  transaction_context?: {|
    soft_descriptor?: string,
  |},
|};

export type responseBody = {|
  payment_id: string,
  status: string,
  intent: string,
  payment_source: {|
    card: {|
      last_digits: string,
      type: string,
      name: string,
      expiry: string,
    |},
  |},
  amount: {|
    currency_code: string,
    value: string,
  |},
  transaction_context: {|
    soft_descriptor: string,
  |},
  links: $ReadOnlyArray<{|
    href: string,
    rel: string,
    method: string,
  |}>,
|};

export type SdkConfig = {|
  authenticationToken: ?string,
  paypalApiDomain: string,
  clientID: string,
  merchantID?: $ReadOnlyArray<string>,
|};

export type ThreeDSResponse = {|
  liabilityShift: string,
  authenticationState: string,
  nonce?: string,
|};

export type HeliosResponse = {|
  liability_shift?: string,
  reference_id?: string,
  success: boolean,
|};

export type TDSResult = {||};

export type TDSProps = {|
  xcomponent?: string,
  payerActionUrl: string,
  onSuccess: (data: HeliosResponse) => Promise<void>,
  onError: () => void,
  onCancel: (mixed) => ZalgoPromise<void>,
  sdkMeta?: string,
  content?: void | {|
    windowMessage?: string,
    continueMessage?: string,
    cancelMessage?: string,
    interrogativeMessage?: string,
  |},
  nonce?: string,
|};

export type UrlProps = {|
  payerActionUrl: string,
|};

export type TDSComponent = ZoidComponent<TDSProps>;

export type Update3DSTokenResponse = {|
  updateTokenizedCreditCardWithExternalThreeDSecure: {|
    paymentMethod: {|
      id: string,
    |},
  |},
|};

type ErrorLocation = {|
  line: number,
  column: number,
|};
export type GQLError = {|
  message: string,
  locations: $ReadOnlyArray<ErrorLocation>,
|};
export type GqlResponse = {|
  data?: Update3DSTokenResponse,
  errors?: $ReadOnlyArray<GQLError>,
|};
/* eslint-enable no-restricted-globals, promise/no-native */
