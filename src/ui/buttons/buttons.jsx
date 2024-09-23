/* @flow */
/** @jsx node */

import { node, type ElementNode } from "@krakenjs/jsx-pragmatic/src";
import {
  FUNDING,
  WALLET_INSTRUMENT,
  APM_LIST,
} from "@paypal/sdk-constants/src";
import { noop } from "@krakenjs/belter/src";

import type { Wallet, WalletInstrument } from "../../types";
import {
  CLASS,
  BUTTON_NUMBER,
  BUTTON_LAYOUT,
  BUTTON_FLOW,
  MESSAGE_POSITION,
} from "../../constants";
import {
  determineEligibleFunding,
  isWalletFundingEligible,
} from "../../funding";
import { ValidationError } from "../../lib";

import { normalizeButtonProps, type ButtonPropsInputs } from "./props";
import { Style } from "./style";
import { Button } from "./button";
import { TagLine } from "./tagline";
import { Script } from "./script";
import { PoweredByPayPal } from "./poweredBy";
import { Message } from "./message";
import { calculateShowPoweredBy } from "./util";

type GetWalletInstrumentOptions = {|
  wallet: ?Wallet,
  fundingSource: $Values<typeof FUNDING>,
  hasShippingCallback: boolean,
|};

function getWalletInstrument({
  wallet,
  fundingSource,
  hasShippingCallback,
}: GetWalletInstrumentOptions): ?WalletInstrument {
  if (
    !isWalletFundingEligible({
      wallet,
      hasShippingCallback,
    })
  ) {
    return;
  }

  const walletFunding = wallet && wallet[fundingSource.toString()];
  const instruments = walletFunding && walletFunding.instruments;

  if (!instruments || !instruments.length) {
    return;
  }

  return instruments[0];
}

const FUNDING_TO_INSTRUMENT = {
  [FUNDING.CREDIT]: WALLET_INSTRUMENT.CREDIT,
};

type GetWalletInstrumentsOptions = {|
  wallet: ?Wallet,
  fundingSources: $ReadOnlyArray<$Values<typeof FUNDING>>,
  hasShippingCallback: boolean,
  layout: $Values<typeof BUTTON_LAYOUT>,
|};

function getWalletInstruments({
  wallet,
  layout,
  fundingSources,
  hasShippingCallback,
}: GetWalletInstrumentsOptions): {|
  [$Values<typeof FUNDING>]: WalletInstrument,
|} {
  const instruments = {};
  for (const source of fundingSources) {
    const instrument = getWalletInstrument({
      wallet,
      fundingSource: source,
      hasShippingCallback,
    });

    if (instrument) {
      instruments[source] = instrument;
    }
  }

  for (const source of Object.keys(instruments)) {
    for (const mapSource of Object.keys(FUNDING_TO_INSTRUMENT)) {
      if (
        source !== mapSource &&
        fundingSources.indexOf(mapSource) !== -1 &&
        instruments[source] &&
        instruments[source].type === FUNDING_TO_INSTRUMENT[mapSource]
      ) {
        delete instruments[source];
      }
    }
  }

  if (layout === BUTTON_LAYOUT.HORIZONTAL) {
    let found = false;
    for (const source of fundingSources) {
      if (instruments[source]) {
        if (found) {
          delete instruments[source];
        } else {
          found = true;
        }
      }
    }
  }

  // $FlowFixMe[incompatible-return]
  return instruments;
}

type ButtonsProps = ButtonPropsInputs & {|
  onClick?: Function,
  wallet?: ?Wallet,
|};

export function validateButtonProps(props: ButtonPropsInputs) {
  normalizeButtonProps(props);
}

export function Buttons(props: ButtonsProps): ElementNode {
  const { onClick = noop } = props;
  const {
    applePaySupport,
    buyerCountry,
    commit,
    components,
    content,
    customerId,
    displayOnly,
    enableFunding,
    env,
    experiment,
    flow,
    fundingEligibility,
    fundingSource,
    hasShippingCallback,
    locale,
    message,
    messageMarkup,
    nonce,
    onShippingAddressChange,
    onShippingChange,
    onShippingOptionsChange,
    personalization,
    platform,
    remembered,
    showPayLabel,
    style,
    supportedNativeBrowser,
    supportsPopups,
    userIDToken,
    vault,
    wallet,
  } = normalizeButtonProps(props);
  const { layout, shape, tagline } = style;

  let fundingSources = determineEligibleFunding({
    fundingSource,
    layout,
    remembered,
    platform,
    fundingEligibility,
    enableFunding,
    components,
    onShippingChange,
    onShippingAddressChange,
    onShippingOptionsChange,
    hasShippingCallback,
    flow,
    wallet,
    applePaySupport,
    supportsPopups,
    supportedNativeBrowser,
    experiment,
    displayOnly,
  });
  const multiple = fundingSources.length > 1;

  if (!fundingSources.length) {
    throw new ValidationError(
      `No eligible funding fundingSources found to render buttons:\n\n${JSON.stringify(
        fundingEligibility,
        null,
        4
      )}`
    );
  }

  if (fundingSources.indexOf(FUNDING.CARD) !== -1) {
    fundingSources = [
      ...fundingSources.filter((src) => src !== FUNDING.CARD),
      FUNDING.CARD,
    ];
  }

  const isAPM = fundingSources.some((src) => {
    return APM_LIST.includes(src);
  });

  const instruments = getWalletInstruments({
    wallet,
    fundingSources,
    layout,
    hasShippingCallback,
  });

  const isWallet =
    flow === BUTTON_FLOW.PURCHASE &&
    ((__WEB__ && userIDToken) || Object.keys(instruments).length);

  const index = (i) => {
    return i;
  };

  const showTagline =
    tagline &&
    layout === BUTTON_LAYOUT.HORIZONTAL &&
    !fundingSource &&
    !message;

  const showPoweredBy = calculateShowPoweredBy(layout, fundingSources);

  return (
    <div
      class={[
        CLASS.CONTAINER,
        CLASS.AUTORESIZE_CONTAINER,
        `${CLASS.LAYOUT}-${layout}`,
        `${CLASS.SHAPE}-${shape}`,
        `${CLASS.NUMBER}-${
          multiple ? BUTTON_NUMBER.MULTIPLE : BUTTON_NUMBER.SINGLE
        }`,
        `${CLASS.ENV}-${env}`,
        `${isWallet ? CLASS.WALLET : ""}`,
      ].join(" ")}
    >
      <Style
        nonce={nonce}
        style={style}
        fundingEligibility={fundingEligibility}
      />

      {message && message.position === MESSAGE_POSITION.TOP ? (
        <Message markup={messageMarkup} position={message.position} />
      ) : null}

      {fundingSources.map((source, i) => (
        <Button
          content={content}
          i={index(i)}
          style={style}
          merchantFundingSource={fundingSource}
          fundingSource={source}
          multiple={multiple}
          env={env}
          buyerCountry={buyerCountry}
          locale={locale}
          nonce={nonce}
          fundingEligibility={fundingEligibility}
          wallet={wallet}
          onShippingChange={onShippingChange}
          onShippingAddressChange={onShippingAddressChange}
          onShippingOptionsChange={onShippingOptionsChange}
          onClick={onClick}
          userIDToken={userIDToken}
          customerId={customerId}
          personalization={personalization}
          tagline={tagline}
          commit={commit}
          experiment={experiment}
          flow={flow}
          vault={vault}
          instrument={instruments[source]}
          showPayLabel={showPayLabel}
        />
      ))}

      {showTagline ? (
        <TagLine
          fundingSource={fundingSources[0]}
          style={style}
          locale={locale}
          multiple={multiple}
          nonce={nonce}
          personalization={personalization}
        />
      ) : null}

      {fundingSources.indexOf(FUNDING.CARD) !== -1 ? (
        <div id="card-fields-container" class="card-fields-container" />
      ) : null}

      {isAPM ? (
        <div
          id="payment-fields-container"
          className="payment-fields-container"
        />
      ) : null}

      {showPoweredBy ? <PoweredByPayPal locale={locale} nonce={nonce} /> : null}

      {message && message.position === MESSAGE_POSITION.BOTTOM ? (
        <Message markup={messageMarkup} position={message.position} />
      ) : null}

      <Script nonce={nonce} />
    </div>
  );
}

export { DEFAULT_PROPS } from "./props";
