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
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>مدعوم من </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
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
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>Využívá službu </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
  da: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>Leveret af </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
  de: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>Abgewickelt durch </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
  el: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>Με την υποστήριξη του </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
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
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>Desarrollado por </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
  et: {
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
  fi: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>Palvelun tarjoaa </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
  fr: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>Optimisé par </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
  he: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}{" "}
        מופעל על-ידי
      </Fragment>
    ),
  },
  hu: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>Üzemeltető: </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
  id: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>Ditunjang teknologi </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
  it: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>Con tecnologia </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
  ja: {
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
  ko: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>제공: </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
  lt: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>Sukurta </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
  lv: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>Darbojas ar </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
  ms: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>Dikuasakan oleh </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
  nl: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>Mogelijk gemaakt door </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
  no: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>Leveres av </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
  pl: {
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
  pt: {
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
  ro: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>Cu tehnologia </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
  ru: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>Обработано </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
  si: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>බලගන්වන්නේ </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
        <Text> විසිනි</Text>
      </Fragment>
    ),
  },
  sk: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>Používa technológiu </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
  sl: {
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
  sq: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>Mundësuar nga </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
  sv: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>Tillhandahålls av </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
  th: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>ให้บริการโดย </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
  tl: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>Pinapagana ng </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
  tr: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>Çalıştıran </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
  vi: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>Được hỗ trợ bởi </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
  zh: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>技术支持提供方： </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
  zh_Hant: {
    PoweredBy: ({ logoColor, shouldApplyRebrandedStyles = false }) => (
      <Fragment>
        <Text>技術支持： </Text>
        {shouldApplyRebrandedStyles ? (
          <PayPalRebrandLogo logoColor={logoColor} />
        ) : (
          <PayPalLogo logoColor={logoColor} />
        )}
      </Fragment>
    ),
  },
};
