/* @flow */

export type LazyProtectedExport<T> = {|
  __get__: () => ?T,
|};
