/* @flow */
/** @jsx node */

import { node, type ChildType } from "@krakenjs/jsx-pragmatic/src";
import { type LocaleType } from "@paypal/sdk-constants/src";
import { LOGO_COLOR, LOGO_CLASS } from "@paypal/sdk-logos/src";

import { CLASS } from "../../constants";
import { Text } from "../text";

import { buttonContent } from "./content";

const POWERED_BY_PAYPAL_STYLE = `
    .${CLASS.POWERED_BY} {
        text-align: center;
        margin: 10px auto;
        height: 16px;
        font-family: PayPal Plain, system-ui, -apple-system, Roboto, "Segoe UI", Helvetica-Neue, Helvetica, Arial, sans-serif;
        font-size: 10px;
        font-weight: 400;
        font-stretch: normal;
        color: #000000;
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

type PoweredByPayPalProps = {|
  locale: LocaleType,
  nonce: string,
|};

export function PoweredByPayPal({
  locale: { lang },
  nonce,
}: PoweredByPayPalProps): ChildType {
  const { PoweredBy } = buttonContent[lang];

  return (
    <div class={CLASS.POWERED_BY}>
      <style nonce={nonce} innerHTML={POWERED_BY_PAYPAL_STYLE} />
      {__WEB__ ? <Text /> : <PoweredBy logoColor={LOGO_COLOR.BLACK} />}
    </div>
  );
}
