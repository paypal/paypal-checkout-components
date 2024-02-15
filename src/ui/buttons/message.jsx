/* @flow */
/** @jsx node */

import { node, type ChildType } from "@krakenjs/jsx-pragmatic/src";

import { CLASS } from "../../constants";

const INITIAL_RESERVED_HEIGHT = "36px";

type MessageProps = {|
  messageMarkup: ?string,
  calculatedMsgPosition: string,
|};

export function Message({
  messageMarkup,
  calculatedMessagePosition,
}: MessageProps): ChildType {
  const reservationDiv = `<div class="${CLASS.BUTTON_MESSAGE_RESERVE}" style="height:${INITIAL_RESERVED_HEIGHT}" ><p>test</p></div>`;

  return (
    <div
      class={[
        CLASS.BUTTON_MESSAGE,
        `${CLASS.BUTTON_MESSAGE}-${calculatedMessagePosition}`,
      ].join(" ")}
      innerHTML={
        typeof messageMarkup === "string" ? messageMarkup : reservationDiv
      }
    />
  );
}
