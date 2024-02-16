/* @flow */
/** @jsx node */

import { node, type ChildType } from "@krakenjs/jsx-pragmatic/src";

import { CLASS } from "../../constants";

const INITIAL_RESERVED_HEIGHT = "36px";

type MessageProps = {|
  markup: ?string,
  position: string,
|};

export function Message({ markup, position }: MessageProps): ChildType {
  const reservationDiv = `<div class="${CLASS.BUTTON_MESSAGE_RESERVE}" style="height:${INITIAL_RESERVED_HEIGHT}" ></div>`;

  return (
    <div
      class={[CLASS.BUTTON_MESSAGE, `${CLASS.BUTTON_MESSAGE}-${position}`].join(
        " "
      )}
      innerHTML={typeof markup === "string" ? markup : reservationDiv}
    />
  );
}
