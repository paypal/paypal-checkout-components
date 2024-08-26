/* @flow */
/* eslint no-restricted-globals: 0 */
/* eslint import/no-nodejs-modules: 0 */

import os from "os";
import { createHash } from "crypto";

import fs from "fs-extra";

export async function createTempFile(
  filename: string,
  text: string = ""
): Promise<string> {
  const path = `${os.tmpdir()}/${filename}`;
  await fs.writeFile(path, text);
  return path;
}

export function dotify(
  obj: Object,
  prefix: string = "",
  newobj: Object = {}
): { [string]: string } {
  prefix = prefix ? `${prefix}.` : prefix;
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    } else if (
      obj[key] === undefined ||
      obj[key] === null ||
      typeof obj[key] === "function"
    ) {
      continue;
    } else if (
      obj[key] &&
      Array.isArray(obj[key]) &&
      obj[key].length &&
      obj[key].every((val) => typeof val !== "object")
    ) {
      newobj[`${prefix}${key}`] = obj[key].join(",");
    } else if (obj[key] && typeof obj[key] === "object") {
      newobj = dotify(obj[key], `${prefix}${key}`, newobj);
    } else {
      newobj[`${prefix}${key}`] = obj[key].toString();
    }
  }
  return newobj;
}

export function dotifyToString(obj: Object): string {
  const dotified = dotify(obj);
  return Object.keys(dotified)
    .map((key) => {
      return `${key}=${dotified[key]}`;
    })
    .join("&");
}

export function sha256(str: string): string {
  return createHash("sha256")
    .update(str)
    .digest("base64")
    .replace(/[^a-zA-Z0-9_-]/g, "");
}
