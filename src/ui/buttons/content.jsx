/* @flow */
/** @jsx node */
/** @jsxFrag Fragment */

import { node, Fragment, type ChildType } from "@krakenjs/jsx-pragmatic/src";
import { LANG } from "@paypal/sdk-constants/src";
import {
  PayPalRebrandLogo,
  PayPalLogo,
  LOGO_COLOR,
} from "@paypal/sdk-logos/src";

import { Text } from "../text";

type ButtonContentMap = {
  [$Values<typeof LANG>]: {|
    PoweredBy: ({|
      logoColor: $Values<typeof LOGO_COLOR>,
      shouldApplyRebrandedStyles?: boolean,
    |}) => ChildType,
  |},
};

export const buttonContent: ButtonContentMap = {
  ar: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>مدعوم من </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  bg: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>С подкрепата на </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
  cs: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Využívá službu </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  da: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Leveret af </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  de: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Abgewickelt durch </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  el: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Με την υποστήριξη του </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  en: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>Powered by </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
  es: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Desarrollado por </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  et: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Powered by </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  fi: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Palvelun tarjoaa </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  fr: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Optimisé par </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  he: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <PayPalRebrandLogo logoColor={logoColor} /> מופעל על-ידי
      </Fragment>
    ),
  },
  hu: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Üzemeltető: </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  id: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Ditunjang teknologi </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  it: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Con tecnologia </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  ja: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Powered by </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  ko: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>제공: </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  lt: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Sukurta </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  lv: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Darbojas ar </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  ms: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Dikuasakan oleh </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  nl: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Mogelijk gemaakt door </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  no: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Leveres av </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  pl: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Powered by </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  pt: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Powered by </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  ro: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Cu tehnologia </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  ru: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Обработано </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  si: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>බලගන්වන්නේ </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
        <Text> විසිනි</Text>
      </Fragment>
    ),
  },
  sk: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Používa technológiu </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  sl: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Powered by </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  sq: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Mundësuar nga </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  sv: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Tillhandahålls av </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  th: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>ให้บริการโดย </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  tl: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Pinapagana ng </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  tr: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Çalıştıran </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  vi: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>Được hỗ trợ bởi </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  zh: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>技术支持提供方： </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
  zh_Hant: {
    PoweredBy: ({ logoColor }) => (
      <Fragment>
        <Text>技術支持： </Text>
        <PayPalRebrandLogo logoColor={logoColor} />
      </Fragment>
    ),
  },
};
