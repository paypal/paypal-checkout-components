/* @flow */
/* eslint no-restricted-globals: 0 */

import imagemagick from "imagemagick";
import imgur from "imgur";
import fs from "fs-extra";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

export type PngType = {|
  data: Buffer,
  width: number,
  height: number,
  write: (string) => Promise<void>,
|};

export function writePNG(png: Object, path: string): Promise<void> {
  return new Promise((resolve, reject) => {
    let stream = png.pack();

    stream = stream.pipe(fs.createWriteStream(path));

    stream.on("finish", () => {
      imagemagick.convert(
        ["-density", "144", "-units", "pixelsperinch", path, path],
        (err) => {
          return err
            ? reject(
                new Error(
                  `imagemagick: ${path} - ${
                    err.stack || err.message || err.toString()
                  }`
                )
              )
            : resolve();
        }
      );
    });

    stream.on("error", (err) => {
      return reject(
        new Error(`${path} - ${err.stack || err.message || err.toString()}`)
      );
    });
  });
}

export function readPNG(path: string): Promise<PngType> {
  return new Promise((resolve, reject) => {
    const png = fs.createReadStream(path).pipe(new PNG());

    png.on("parsed", () =>
      resolve({
        data: png.data,
        width: png.width,
        height: png.height,
        write: (outpath) => writePNG(png, outpath),
      })
    );

    png.on("error", (err) => reject(err));
  });
}

export async function diffPNG(one: PngType, two: PngType): Promise<number> {
  return await pixelmatch(one.data, two.data, null, one.width, one.height, {
    threshold: 0,
  });
}

export async function uploadToImgur(path: string): Promise<?string> {
  const result = await imgur.uploadFile(path);
  if (result) {
    return result.data.link;
  }
}
