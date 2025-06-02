/* @flow */
/** @jsx node */

import { node, type ChildType } from "@krakenjs/jsx-pragmatic/src";
import { type LocaleType } from "@paypal/sdk-constants/src";
import { LOGO_COLOR, LOGO_CLASS } from "@paypal/sdk-logos/src";

import { CLASS, BUTTON_COLOR_REBRAND } from "../../constants";
import { Text } from "../text";

import { buttonContent } from "./content";

const POWERED_BY_PAYPAL_STYLE = `
    .${CLASS.POWERED_BY} {
        text-align: center;
        margin: 10px auto;
        height: 14px;
        font-family: system-ui, -apple-system, Roboto, "Segoe UI", Helvetica-Neue, Helvetica, Arial, sans-serif;
        font-size: 11px;
        font-weight: 400;
        font-style: italic;
        font-stretch: normal;
        color: #7b8388;
        position: relative;
        margin-right: 3px;
        bottom: 3px;
    }

    .${CLASS.POWERED_BY} > .${CLASS.TEXT},
    .${CLASS.POWERED_BY} > .${LOGO_CLASS.LOGO} {
        display: inline-block;
        vertical-align: middle;
        height: 16px;
        line-height: 16px;
        font-size: 11px;
    }
`;

type PoweredByPayPalProps = {|
  locale: LocaleType,
  nonce: string,
  buttonColor?: string,
  shouldApplyRebrandedStyles?: boolean,
|};

function getPoweredByConfig(): {|
  logoColors: { [string]: $Values<typeof LOGO_COLOR> },
  textColors: { [string]: string },
|} {
  return {
    logoColors: {
      [BUTTON_COLOR_REBRAND.REBRAND_BLUE]: LOGO_COLOR.BLACK,
      [BUTTON_COLOR_REBRAND.REBRAND_BLACK]: LOGO_COLOR.BLACK,
      [BUTTON_COLOR_REBRAND.REBRAND_WHITE]: LOGO_COLOR.WHITE,
    },

    textColors: {
      [BUTTON_COLOR_REBRAND.REBRAND_BLUE]: "#000000",
      [BUTTON_COLOR_REBRAND.REBRAND_BLACK]: "#000000",
      [BUTTON_COLOR_REBRAND.REBRAND_WHITE]: "#FFFFFF",
    },
  };
}

export function PoweredByPayPal({
  locale: { lang },
  nonce,
  buttonColor = BUTTON_COLOR_REBRAND.REBRAND_BLUE,
  shouldApplyRebrandedStyles = false,
}: PoweredByPayPalProps): ChildType {
  const { PoweredBy } = buttonContent[lang];
  const config = getPoweredByConfig();

  // get appropriate logo and text color based on button color
  const rebrandLogoColor = config.logoColors[buttonColor] || LOGO_COLOR.BLACK;
  const textColor = config.textColors[buttonColor] || "#000000";

  const POWERED_BY_PAYPAL_REBRAND_STYLE = `
    .${CLASS.POWERED_BY} {
        text-align: center;
        margin: 10px auto;
        height: 14px;
        font-family: PayPal Plain, system-ui, -apple-system, Roboto, "Segoe UI", Helvetica-Neue, Helvetica, Arial, sans-serif;
        font-size: 10px;
        font-weight: 400;
        color: ${textColor};
        font-stretch: normal;
        position: relative;
        margin-right: 2px;
        bottom: 1px;
    }

    .${CLASS.POWERED_BY} > .${CLASS.TEXT},
    .${CLASS.POWERED_BY} > .${LOGO_CLASS.LOGO} {
        display: inline-block;
        vertical-align: middle;
        height: 16px;
        line-height: 16px;
        font-size: 10px;
    }
  `;

  const POWERED_BY_STYLE = shouldApplyRebrandedStyles
    ? POWERED_BY_PAYPAL_REBRAND_STYLE
    : POWERED_BY_PAYPAL_STYLE;

  const logoColor = shouldApplyRebrandedStyles
    ? rebrandLogoColor
    : LOGO_COLOR.BLUE;

  return (
    <div class={CLASS.POWERED_BY}>
      <style nonce={nonce} innerHTML={POWERED_BY_STYLE} />
      {__WEB__ ? (
        <Text />
      ) : (
        <PoweredBy
          logoColor={logoColor}
          shouldApplyRebrandedStyles={shouldApplyRebrandedStyles}
        />
      )}
    </div>
  );
}
