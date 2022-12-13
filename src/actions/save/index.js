/* @flow */

type SaveActionHandlers = {|
  // eslint-disable-next-line no-restricted-globals, promise/no-native
  onCreateVaultToken: () => Promise<string>,
  onApprove: ({| token: string |}) => void,
|};

export type SaveAction = (SaveActionHandlers) => ({|
  type: "save",
  ...SaveActionHandlers,
|});

export const createSaveAction: SaveAction = (handlers: SaveActionHandlers) => ({
  type: "save",
  ...handlers,
});
