/* @flow */
/** @jsx node */

import { node, type ChildType } from "@krakenjs/jsx-pragmatic/src";

const MESSAGE_SPACE_HEIGHT = "36px";

export function Message(messageMarkup?: string): ChildType {
  return (
    <div
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={messageMarkup ?? ""}
      style={
        !(typeof messageMarkup === "string")
          ? `height: ${MESSAGE_SPACE_HEIGHT}`
          : ""
      }
    />
  );
}
