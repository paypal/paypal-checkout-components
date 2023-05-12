/* @flow */
/** @jsx node */
import { node, Fragment, type ChildType } from "@krakenjs/jsx-pragmatic/src";
import {
  VenmoLogoExternalImage,
  VenmoLogoInlineSVG
} from "@paypal/sdk-logos/src";

import {
  type WalletLabelOptions,
  type LabelOptions,
  BasicLabel
} from "../common";
import { Text, Space } from "../../ui/text";

import styles from "./style.scoped.scss";

export function AppLabel(opts: LabelOptions): ChildType {
  const { logoColor } = opts;

  const AppLogo: ChildType = (
    <Fragment>
      {__WEB__ ? (
        <VenmoLogoExternalImage logoColor={logoColor} />
      ) : (
        <VenmoLogoInlineSVG logoColor={logoColor} />
      )}
      <Text className={["app-label"]}>App</Text>
    </Fragment>
  );

  return <BasicLabel {...opts} logo={AppLogo} />;
}

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

  return (
    <div class={styles["wallet-label-venmo"]}>
      <div class={styles["divider"]}>|</div>
      {logo && (
        <div class={styles["logo"]} optional>
          {logo}
          <Space />
        </div>
      )}
      {label && (
        <div class={styles["label"]}>
          <Text className={styles["limit"]}>{label}</Text>
        </div>
      )}
    </div>
  );
}
