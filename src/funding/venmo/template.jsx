/* @flow */
/** @jsx node */
import { node, Style, type ChildType } from "@krakenjs/jsx-pragmatic/src";
import { getCSPNonce } from "@paypal/sdk-client/src";
import {
  VenmoLogoExternalImage,
  VenmoLogoInlineSVG,
} from "@paypal/sdk-logos/src";

import {
  type WalletLabelOptions,
  type LabelOptions,
  BasicLabel,
} from "../common";
import { Text } from "../../ui/text";

import css from "./style.scoped.scss";

export function Label(opts: LabelOptions): ChildType {
  return <BasicLabel {...opts} />;
}

export function WalletLabel({ ...props }: WalletLabelOptions): ChildType {
  const { instrument, logoColor } = props;
  let label;
  const logo = __WEB__ ? (
    <VenmoLogoExternalImage logoColor={logoColor} />
  ) : (
    <VenmoLogoInlineSVG logoColor={logoColor} />
  );

  if (instrument && instrument.label) {
    label = instrument.label;
  }

  const cspNonce = __WEB__ ? getCSPNonce() : undefined;

  return (
    <Style nonce={cspNonce} css={css}>
      <div class="wallet-label-venmo">
        {logo && (
          <div class="logo" optional>
            {logo}
          </div>
        )}
        {label && (
          <div class="label">
            <Text className={["limit"]}>{label}</Text>
          </div>
        )}
      </div>
    </Style>
  );
}
