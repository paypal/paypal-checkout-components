/* @flow */

export const BUTTON_LABEL = {
  PAYPAL: ("paypal": "paypal"),
  CHECKOUT: ("checkout": "checkout"),
  BUYNOW: ("buynow": "buynow"),
  PAY: ("pay": "pay"),
  INSTALLMENT: ("installment": "installment"),
  SUBSCRIBE: ("subscribe": "subscribe"),
  DONATE: ("donate": "donate"),
};

export const BUTTON_COLOR_REBRAND = {
  REBRAND_BLUE: ("rebrand_blue": "rebrand_blue"),
  REBRAND_DARKBLUE: ("rebrand_darkblue": "rebrand_darkblue"),
  REBRAND_BLACK: ("rebrand_black": "rebrand_black"),
  REBRAND_WHITE: ("rebrand_white": "rebrand_white"),
};

export const BUTTON_COLOR = {
  DEFAULT: ("default": "default"),
  GOLD: ("gold": "gold"),
  BLUE: ("blue": "blue"),
  SILVER: ("silver": "silver"),
  DARKBLUE: ("darkblue": "darkblue"),
  BLACK: ("black": "black"),
  WHITE: ("white": "white"),
  TRANSPARENT: ("transparent": "transparent"),
  ...BUTTON_COLOR_REBRAND,
};

export const TEXT_COLOR = {
  BLACK: ("black": "black"),
  WHITE: ("white": "white"),
  DEFAULT: ("default": "default"),
};

export const BUTTON_SIZE = {
  TINY: ("tiny": "tiny"),
  SMALL: ("small": "small"),
  MEDIUM: ("medium": "medium"),
  LARGE: ("large": "large"),
  HUGE: ("huge": "huge"),
  RESPONSIVE: ("responsive": "responsive"),
};

export const BUTTON_REDESIGN_SIZE = {
  EXTRA_SMALL: ("extraSmall": "extraSmall"),
  TINY: ("tiny": "tiny"),
  SMALL: ("small": "small"),
  MEDIUM_SMALL: ("mediumSmall": "mediumSmall"),
  MEDIUM_BIG: ("mediumBig": "mediumBig"),
  LARGE_SMALL: ("largeSmall": "largeSmall"),
  LARGE_BIG: ("largeBig": "largeBig"),
  XL_SMALL: ("xlSmall": "xlSmall"),
  XL_BIG: ("xlBig": "xlBig"),
  XXL: ("xxl": "xxl"),
};

export const BUTTON_DISABLE_MAX_HEIGHT_SIZE = {
  TINY: ("tiny": "tiny"),
  SMALL: ("small": "small"),
  MEDIUM_SMALL: ("mediumSmall": "mediumSmall"),
  MEDIUM_BIG: ("mediumBig": "mediumBig"),
  LARGE_SMALL: ("largeSmall": "largeSmall"),
  LARGE_BIG: ("largeBig": "largeBig"),
  XL: ("xl": "xl"),
  XXL: ("xxl": "xxl"),
  XXXL: ("xxxl": "xxxl"),
};

export const BUTTON_SHAPE = {
  PILL: ("pill": "pill"),
  RECT: ("rect": "rect"),
  SHARP: ("sharp": "sharp"),
};

export const BUTTON_LAYOUT = {
  HORIZONTAL: ("horizontal": "horizontal"),
  VERTICAL: ("vertical": "vertical"),
};

export const BUTTON_NUMBER = {
  SINGLE: ("single": "single"),
  MULTIPLE: ("multiple": "multiple"),
};

export const BUTTON_FLOW = {
  PURCHASE: ("purchase": "purchase"),
  BILLING_SETUP: ("billing_setup": "billing_setup"),
  SUBSCRIPTION_SETUP: ("subscription_setup": "subscription_setup"),
  FULL_STACK_SUBSCRIPTION_SETUP:
    ("full_stack_subscription_setup": "full_stack_subscription_setup"),
  VAULT_WITHOUT_PURCHASE: ("vault_without_purchase": "vault_without_purchase"),
};

export const MENU_PLACEMENT = {
  ABOVE: ("above": "above"),
  BELOW: ("below": "below"),
};

export const MESSAGE_OFFER = {
  PAY_LATER_LONG_TERM: ("pay_later_long_term": "pay_later_long_term"),
  PAY_LATER_SHORT_TERM: ("pay_later_short_term": "pay_later_short_term"),
};

export const MESSAGE_COLOR = {
  BLACK: ("black": "black"),
  WHITE: ("white": "white"),
};

export const MESSAGE_POSITION = {
  TOP: ("top": "top"),
  BOTTOM: ("bottom": "bottom"),
};

export const MESSAGE_ALIGN = {
  CENTER: ("center": "center"),
  LEFT: ("left": "left"),
  RIGHT: ("right": "right"),
};
