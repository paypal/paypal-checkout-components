/* @flow */
/* eslint no-template-curly-in-string: off, max-lines: off */

import {
  BUTTON_SIZE,
  BUTTON_DISABLE_MAX_HEIGHT_SIZE,
  BUTTON_LAYOUT,
  BUTTON_REDESIGN_SIZE,
} from "../../constants";

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

// Rebrand label container height as a ratio of button height (0.5 = 50%).
// The PayPal logo's translateY is derived from this value to keep the logo
// visually centered. If this ratio changes, the translateY percentage must
// be recalculated: translateY = LOGO_VISUAL_OFFSET / LABEL_HEIGHT_RATIO.
// Additionally, the Venmo and Card glyph viewBox/height in @paypal/sdk-logos
// must be updated to match the new label container height.
export const REBRAND_LABEL_HEIGHT_RATIO = 0.5;

// Fixed visual offset of the PayPal logo as a fraction of total button height.
// translateY percentage = LOGO_VISUAL_OFFSET / LABEL_HEIGHT_RATIO
// Current: 0.06 / 0.5 = 0.12 (12%)
const LOGO_VISUAL_OFFSET = 0.06;
export const REBRAND_LOGO_TRANSLATE_Y = Math.round(
  (LOGO_VISUAL_OFFSET / REBRAND_LABEL_HEIGHT_RATIO) * 100
);

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

type ButtonDisableMaxHeightStyleMap = {
  [$Values<typeof BUTTON_DISABLE_MAX_HEIGHT_SIZE>]: {|
    defaultHeight: number,
    minHeight: number,
    maxHeight: number,
  |},
};

type ButtonRedesignStyleMap = {
  [$Values<typeof BUTTON_REDESIGN_SIZE>]: {|
    defaultHeight: number,
    minHeight: number,
    maxHeight: number,
    minWidth: number,
    maxWidth: number,
    gap?: number,
    fontSize?: number,
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

export const BUTTON_DISABLE_MAX_HEIGHT_STYLE: ButtonDisableMaxHeightStyleMap = {
  [BUTTON_DISABLE_MAX_HEIGHT_SIZE.TINY]: {
    defaultHeight: 25,
    minHeight: 25,
    maxHeight: 30,
  },

  [BUTTON_DISABLE_MAX_HEIGHT_SIZE.SMALL]: {
    defaultHeight: 30,
    minHeight: 30,
    maxHeight: 35,
  },

  [BUTTON_DISABLE_MAX_HEIGHT_SIZE.MEDIUM_SMALL]: {
    defaultHeight: 35,
    minHeight: 35,
    maxHeight: 40,
  },

  [BUTTON_DISABLE_MAX_HEIGHT_SIZE.MEDIUM_BIG]: {
    defaultHeight: 40,
    minHeight: 40,
    maxHeight: 45,
  },

  [BUTTON_DISABLE_MAX_HEIGHT_SIZE.LARGE_SMALL]: {
    defaultHeight: 45,
    minHeight: 45,
    maxHeight: 50,
  },

  [BUTTON_DISABLE_MAX_HEIGHT_SIZE.LARGE_BIG]: {
    defaultHeight: 50,
    minHeight: 50,
    maxHeight: 55,
  },

  [BUTTON_DISABLE_MAX_HEIGHT_SIZE.XL]: {
    defaultHeight: 55,
    minHeight: 55,
    maxHeight: 65,
  },

  [BUTTON_DISABLE_MAX_HEIGHT_SIZE.XXL]: {
    defaultHeight: 65,
    minHeight: 65,
    maxHeight: 75,
  },

  [BUTTON_DISABLE_MAX_HEIGHT_SIZE.XXXL]: {
    defaultHeight: 75,
    minHeight: 75,
    maxHeight: 200,
  },
};

export const BUTTON_REDESIGN_STYLE: ButtonRedesignStyleMap = {
  [BUTTON_REDESIGN_SIZE.EXTRA_SMALL]: {
    defaultHeight: 20,
    minHeight: 20,
    maxHeight: 30,
    minWidth: 50,
    maxWidth: 75,
    gap: 3,
    fontSize: 10,
  },

  [BUTTON_REDESIGN_SIZE.TINY]: {
    defaultHeight: 25,
    minHeight: 25,
    maxHeight: 30,
    minWidth: 75,
    maxWidth: 200,
    gap: 3,
    fontSize: 10,
  },

  [BUTTON_REDESIGN_SIZE.SMALL]: {
    defaultHeight: 35,
    minHeight: 30,
    maxHeight: 35,
    minWidth: 200,
    maxWidth: 250,
    gap: 3,
    fontSize: 12,
  },

  [BUTTON_REDESIGN_SIZE.MEDIUM_SMALL]: {
    defaultHeight: 35,
    minHeight: 35,
    maxHeight: 40,
    minWidth: 250,
    maxWidth: 300,
    gap: 4,
    fontSize: 14,
  },

  [BUTTON_REDESIGN_SIZE.MEDIUM_BIG]: {
    defaultHeight: 45,
    minHeight: 40,
    maxHeight: 45,
    minWidth: 300,
    maxWidth: 350,
    gap: 4,
    fontSize: 14,
  },

  [BUTTON_REDESIGN_SIZE.LARGE_SMALL]: {
    defaultHeight: 45,
    minHeight: 45,
    maxHeight: 50,
    minWidth: 350,
    maxWidth: 425,
    gap: 5,
    fontSize: 16,
  },

  [BUTTON_REDESIGN_SIZE.LARGE_BIG]: {
    defaultHeight: 45,
    minHeight: 50,
    maxHeight: 55,
    minWidth: 425,
    maxWidth: 500,
    gap: 5,
    fontSize: 18,
  },

  [BUTTON_REDESIGN_SIZE.XL_SMALL]: {
    defaultHeight: 55,
    minHeight: 55,
    maxHeight: 60,
    minWidth: 500,
    maxWidth: 750,
    gap: 6,
    fontSize: 18,
  },
};

export const BUTTON_REDESIGN_DISABLEMAXHEIGHT_STYLE = {
  ...BUTTON_REDESIGN_STYLE,
  [BUTTON_REDESIGN_SIZE.XXL]: {
    ...BUTTON_REDESIGN_STYLE[BUTTON_REDESIGN_SIZE.XXL],
    minHeight: 65,
    maxHeight: 70,
    fontSize: 22,
  },
  XXXL: {
    minHeight: 70,
    maxHeight: 75,
    gap: 10,
    fontSize: 24,
  },
  XXXXL: {
    minHeight: 75,
    maxHeight: 200,
    gap: 10,
    fontSize: 26,
  },
};
