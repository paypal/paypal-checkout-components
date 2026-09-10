/* @flow */

export type QRCodeProps = {|
  qrPath: string,
  cspNonce: ?string,
  experiment: ?{ [key: string]: boolean },
|};
