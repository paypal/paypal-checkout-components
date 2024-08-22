/* @flow */
/** @jsx node */

import type { FundingEligibilityType } from "@paypal/sdk-client/src";
import {
  COUNTRY,
  FUNDING,
  ENV,
  type LocaleType,
} from "@paypal/sdk-constants/src";
import { node, type ElementNode } from "@krakenjs/jsx-pragmatic/src";
import { LOGO_COLOR, LOGO_CLASS } from "@paypal/sdk-logos/src";
import {
  noop,
  preventClickFocus,
  isBrowser,
  isElement,
} from "@krakenjs/belter/src";

import type {
  ContentType,
  Wallet,
  Experiment,
  WalletInstrument,
} from "../../types";
import {
  ATTRIBUTE,
  CLASS,
  BUTTON_COLOR,
  BUTTON_NUMBER,
  TEXT_COLOR,
  BUTTON_FLOW,
} from "../../constants";
import { getFundingConfig } from "../../funding";

import type {
  ButtonStyle,
  Personalization,
  OnShippingChange,
  OnShippingAddressChange,
  OnShippingOptionsChange,
} from "./props";
import { Spinner } from "./spinner";
import { MenuButton } from "./menu-button";
import { isBorderRadiusNumber, checkLabelEligibility } from "./util";

type IndividualButtonProps = {|
  style: ButtonStyle,
  fundingSource: $Values<typeof FUNDING>,
  multiple: boolean,
  buyerCountry: $Values<typeof COUNTRY>,
  locale: LocaleType,
  onClick?: Function,
  env: $Values<typeof ENV>,
  wallet?: ?Wallet,
  fundingEligibility: FundingEligibilityType,
  onShippingChange: ?OnShippingChange,
  onShippingAddressChange: ?OnShippingAddressChange,
  onShippingOptionsChange: ?OnShippingOptionsChange,
  i: number,
  nonce: string,
  userIDToken: ?string,
  customerId: ?string,
  personalization: ?Personalization,
  content: ?ContentType,
  tagline: ?boolean,
  commit: boolean,
  experiment: Experiment,
  flow: $Values<typeof BUTTON_FLOW>,
  vault: boolean,
  merchantFundingSource: ?$Values<typeof FUNDING>,
  instrument: ?WalletInstrument,
  showPayLabel: boolean,
|};

export function Button({
  buyerCountry,
  commit,
  content,
  customerId,
  env,
  experiment,
  flow,
  fundingEligibility,
  fundingSource,
  i,
  instrument,
  locale,
  multiple,
  nonce,
  onClick = noop,
  personalization,
  showPayLabel,
  style,
  tagline,
  userIDToken,
  vault,
}: IndividualButtonProps): ElementNode {
  const { layout, shape, borderRadius } = style;

  const fundingConfig = getFundingConfig()[fundingSource];

  if (!fundingConfig) {
    throw new Error(`Can not find funding config for ${fundingSource}`);
  }

  const colors = fundingConfig.colors;
  const secondaryColors = fundingConfig.secondaryColors || {};

  let { color, period, label } = style;

  // if no color option is passed in via style props
  if (color === "" || typeof color === "undefined") {
    // if a single button is rendered, we set color to first option in the fundingSource config
    color = colors[0];

    // if multiple buttons are being rendered (smart stack), we set default color as gold > first
    if (multiple) {
      color = "gold";
    }
  }

  // validate the first button rendered has a valid color
  // this check is needed to validate the first button in a smart stack gets the correct color
  if (i === 0 && !colors.includes(color)) {
    color = colors[0];
  }

  // The secondary colors are used to render the smart stack (multiple buttons)
  // they keep track of the mapping of the color style prop to the
  if (multiple && i > 0) {
    if (
      secondaryColors[color] &&
      colors.indexOf(secondaryColors[color] !== -1)
    ) {
      color = secondaryColors[color];
    } else if (colors.indexOf(secondaryColors[BUTTON_COLOR.DEFAULT]) !== -1) {
      color = secondaryColors[BUTTON_COLOR.DEFAULT];
    } else {
      color = colors[0];
    }
  }

  const { logoColors, textColors } = fundingConfig;

  const logoColor =
    logoColors[color] || logoColors[LOGO_COLOR.DEFAULT] || LOGO_COLOR.DEFAULT;
  const textColor =
    textColors[color] || textColors[TEXT_COLOR.DEFAULT] || TEXT_COLOR.DEFAULT;

  const { Label, WalletLabel, Logo, showWalletMenu } = fundingConfig;

  const clickHandler = (event, opts) => {
    event.preventDefault();
    event.stopPropagation();
    onClick(event, { fundingSource, ...opts });
  };

  const keypressHandler = (event: KeyboardEvent, opts) => {
    if (event.keyCode === 13 || event.keyCode === 32) {
      clickHandler(event, opts);
    }
  };

  const onButtonRender = (el) => {
    if (isBrowser() && isElement(el)) {
      preventClickFocus(el);
    }
  };

  const eligibleLabel = checkLabelEligibility(label, buyerCountry);

  function getAriaLabel(): string {
    let labelText =
      typeof fundingConfig.labelText === "function"
        ? fundingConfig.labelText({
            buyerCountry,
            content,
            fundingEligibility,
            label: eligibleLabel,
            period,
          })
        : fundingConfig.labelText || fundingSource;

    if (!showPayLabel && instrument?.vendor && instrument.label) {
      labelText = instrument.secondaryInstruments
        ? `${instrument.secondaryInstruments[0].type} & ${instrument.vendor} ${instrument.label}`
        : `${instrument.vendor} ${instrument.label}`;
    }

    return labelText;
  }

  const labelText = getAriaLabel();

  const logoNode = (
    <Logo
      label={eligibleLabel}
      locale={locale}
      logoColor={logoColor}
      fundingEligibility={fundingEligibility}
      onClick={clickHandler}
      onKeyPress={keypressHandler}
      nonce={nonce}
      experiment={experiment}
      env={env}
    />
  );

  let labelNode = (
    <Label
      i={i}
      logo={logoNode}
      label={eligibleLabel}
      nonce={nonce}
      locale={locale}
      logoColor={logoColor}
      period={period}
      layout={layout}
      multiple={multiple}
      fundingEligibility={fundingEligibility}
      onClick={clickHandler}
      onKeyPress={keypressHandler}
      personalization={personalization}
      tagline={tagline}
      content={content}
      experiment={experiment}
    />
  );

  let isWallet = false;

  if (
    WalletLabel &&
    (!showPayLabel ||
      flow === BUTTON_FLOW.PURCHASE ||
      flow === BUTTON_FLOW.VAULT_WITHOUT_PURCHASE) &&
    (instrument ||
      (__WEB__ &&
        (userIDToken || customerId) &&
        (fundingSource === FUNDING.PAYPAL || fundingSource === FUNDING.VENMO)))
  ) {
    labelNode = (
      <WalletLabel
        nonce={nonce}
        logoColor={logoColor}
        instrument={instrument}
        locale={locale}
        content={content}
        commit={commit}
        experiment={experiment}
        vault={vault}
        textColor={textColor}
        fundingSource={fundingSource}
        showPayLabel={showPayLabel}
      />
    );

    isWallet = true;
  }

  const shouldShowWalletMenu =
    isWallet && instrument && showWalletMenu({ instrument, userIDToken });
  const borderRadiusClass = isBorderRadiusNumber(borderRadius)
    ? CLASS.BORDER_RADIUS
    : `${CLASS.SHAPE}-${shape}`;

  return (
    <div
      class={[
        CLASS.BUTTON_ROW,
        `${CLASS.NUMBER}-${i}`,
        `${CLASS.LAYOUT}-${layout}`,
        `${CLASS.NUMBER}-${
          multiple ? BUTTON_NUMBER.MULTIPLE : BUTTON_NUMBER.SINGLE
        }`,
        `${CLASS.ENV}-${env}`,
        `${CLASS.COLOR}-${color}`,
        `${CLASS.TEXT_COLOR}-${textColor}`,
        `${LOGO_CLASS.LOGO_COLOR}-${logoColor}`,
        `${isWallet ? CLASS.WALLET : ""}`,
        `${shouldShowWalletMenu ? CLASS.WALLET_MENU : ""}`,
        `${borderRadiusClass}`,
      ].join(" ")}
    >
      <div
        role="link"
        {...{
          [ATTRIBUTE.BUTTON]: true,
          [ATTRIBUTE.FUNDING_SOURCE]: fundingSource,
          [ATTRIBUTE.PAYMENT_METHOD_ID]: instrument ? instrument.tokenID : null,
          [ATTRIBUTE.INSTRUMENT_ID]: instrument
            ? instrument.instrumentID
            : null,
          [ATTRIBUTE.INSTRUMENT_TYPE]: instrument ? instrument.type : null,
          [ATTRIBUTE.SECONDARY_INSTRUMENT_TYPE]:
            instrument?.secondaryInstruments
              ? instrument.secondaryInstruments[0].type
              : null,
        }}
        class={[
          CLASS.BUTTON,
          `${CLASS.NUMBER}-${i}`,
          `${CLASS.LAYOUT}-${layout}`,
          `${CLASS.NUMBER}-${
            multiple ? BUTTON_NUMBER.MULTIPLE : BUTTON_NUMBER.SINGLE
          }`,
          `${CLASS.ENV}-${env}`,
          `${CLASS.COLOR}-${color}`,
          `${CLASS.TEXT_COLOR}-${textColor}`,
          `${LOGO_CLASS.LOGO_COLOR}-${logoColor}`,
          `${isWallet ? CLASS.WALLET : ""}`,
          `${borderRadiusClass}`,
        ].join(" ")}
        onClick={clickHandler}
        onRender={onButtonRender}
        onKeyPress={keypressHandler}
        tabindex="0"
        aria-label={labelText}
      >
        <div class={CLASS.BUTTON_LABEL}>{labelNode}</div>

        <Spinner />
      </div>

      {shouldShowWalletMenu ? (
        <MenuButton textColor={textColor} content={content} />
      ) : null}
    </div>
  );
}
