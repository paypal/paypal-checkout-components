/* @flow */
/* eslint max-lines: 0 */
import { type ThreeDsURLParams } from "./types";

export const getThreeDSParams = (link: string): ThreeDsURLParams => {
  try {
    // eslint-disable-next-line compat/compat
    const { searchParams } = new URL(link);
    return {
      vaultToken: searchParams.get("token") || null,
      action: searchParams.get("action") || null,
    };
  } catch {
    // eslint-disable-next-line no-console
    console.error("Invalid URL provided");
    return { vaultToken: null, action: null };
  }
};

export const TARGET_ELEMENT = {
  BODY: "body",
};

export const USER_TYPE = { FASTLANE: "FASTLANE" };
