/* eslint no-restricted-globals: 0 */
/* eslint import/no-nodejs-modules: 0 */

export function dotify(obj, prefix = "", newobj = {}) {
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

export function dotifyToString(obj) {
  const dotified = dotify(obj);
  return Object.keys(dotified)
    .map((key) => {
      return `${key}=${dotified[key]}`;
    })
    .join("&");
}
