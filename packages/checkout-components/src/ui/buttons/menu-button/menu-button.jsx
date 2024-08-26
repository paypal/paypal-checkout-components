/* @flow */
/** @jsx node */

import { node, type ChildType, Style } from "@krakenjs/jsx-pragmatic/src";

import { ATTRIBUTE, TEXT_COLOR } from "../../../constants";
import { Chevron } from "../../chevron";
import type { ContentType } from "../../../types";

import css from "./menu-button.scoped.scss";

export function MenuButton({
  textColor = TEXT_COLOR.BLACK,
  content,
}: {|
  textColor?: $Values<typeof TEXT_COLOR>,
  content: ?ContentType,
|} = {}): ChildType {
  const labelText = content?.moreOptions;
  return (
    <Style css={css}>
      <div
        {...{
          [ATTRIBUTE.MENU]: true,
        }}
        tabindex="0"
        class="menu-button"
        role="button"
        aria-label={labelText}
        aria-haspopup="menu"
      >
        <Chevron color={textColor} />
      </div>
    </Style>
  );
}
