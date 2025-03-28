/* @flow */
/* eslint no-template-curly-in-string: off, max-lines: off */

import { BUTTON_SIZE, BUTTON_LAYOUT } from "../../constants";

export const MINIMUM_SIZE: {|
  [$Values<typeof BUTTON_LAYOUT>]: $Values<typeof BUTTON_SIZE>,
|} = {
  [BUTTON_LAYOUT.HORIZONTAL]: BUTTON_SIZE.SMALL,
  [BUTTON_LAYOUT.VERTICAL]: BUTTON_SIZE.MEDIUM,
};

export const MAXIMUM_SIZE: {|
  [$Values<typeof BUTTON_LAYOUT>]: $Values<typeof BUTTON_SIZE>,
|} = {
  [BUTTON_LAYOUT.HORIZONTAL]: BUTTON_SIZE.HUGE,
  [BUTTON_LAYOUT.VERTICAL]: BUTTON_SIZE.HUGE,
};

export const BUTTON_RELATIVE_STYLE = {
  TAGLINE: 50,
  VERTICAL_MARGIN: 30,
};

type ButtonStyleMap = {
  [$Values<typeof BUTTON_SIZE>]: {|
    defaultWidth: number,
    defaultHeight: number,
    minWidth: number,
    maxWidth: number,
    minHeight: number,
    maxHeight: number,
  |},
};

export const BUTTON_SIZE_STYLE: ButtonStyleMap = {
  [BUTTON_SIZE.TINY]: {
    defaultWidth: 75,
    defaultHeight: 25,
    minWidth: 75,
    maxWidth: 150,
    minHeight: 25,
    maxHeight: 30,
  },

  [BUTTON_SIZE.SMALL]: {
    defaultWidth: 150,
    defaultHeight: 25,
    minWidth: 150,
    maxWidth: 200,
    minHeight: 25,
    maxHeight: 55,
  },

  [BUTTON_SIZE.MEDIUM]: {
    defaultWidth: 250,
    defaultHeight: 35,
    minWidth: 200,
    maxWidth: 300,
    minHeight: 35,
    maxHeight: 55,
  },

  [BUTTON_SIZE.LARGE]: {
    defaultWidth: 350,
    defaultHeight: 45,
    minWidth: 300,
    maxWidth: 500,
    minHeight: 30,
    maxHeight: 55,
  },

  [BUTTON_SIZE.HUGE]: {
    defaultWidth: 500,
    defaultHeight: 55,
    minWidth: 500,
    maxWidth: 750,
    minHeight: 40,
    maxHeight: 55,
  },
};

export const BUTTON_DISABLE_MAX_HEIGHT_STYLE: ButtonStyleMap = {
  [BUTTON_SIZE.TINY]: {
    height: 25,
    minHeight: 25,
    maxHeight: 30,
  },

  [BUTTON_SIZE.SMALL]: {
    height: 30,
    minHeight: 30,
    maxHeight: 35,
  },

  [BUTTON_SIZE.MEDIUM]: {
    height: 35,
    minHeight: 35,
    maxHeight: 45,
  },

  [BUTTON_SIZE.LARGE]: {
    height: 45,
    minHeight: 45,
    maxHeight: 55,
  },

  [BUTTON_SIZE.XL]: {
    height: 55,
    minHeight: 55,
    maxHeight: 65,
  },
  // 2XL
  [BUTTON_SIZE.XXL]: {
    height: 65,
    minHeight: 65,
    maxHeight: 75,
  },
  // 3XL
  [BUTTON_SIZE.XXXL]: {
    height: 75,
    minHeight: 75,
    maxHeight: 85,
  },
};
