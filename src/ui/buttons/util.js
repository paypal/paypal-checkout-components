/* @flow */

export function hasBorderRadius(borderRadius?: number): boolean {
  return typeof borderRadius === "number";
}
