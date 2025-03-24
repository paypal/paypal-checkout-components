/* @flow */

import { max, perc, roundUp } from "@krakenjs/belter/src";
import {
  FUNDING,
  type FundingEligibilityType,
} from "@paypal/sdk-constants/src";

import {
  BUTTON_SHAPE,
  BUTTON_LAYOUT,
  BUTTON_NUMBER,
  CLASS,
  ATTRIBUTE,
  BUTTON_SIZE,
} from "../../../constants";
import { BUTTON_SIZE_STYLE, BUTTON_RELATIVE_STYLE } from "../config";
import { isBorderRadiusNumber } from "../util";
import type { Experiment } from "../../../types";

const BUTTON_MIN_ASPECT_RATIO = 2.2;
const MIN_SPLIT_BUTTON_WIDTH = 300;

const FIRST_BUTTON_PERC = 50;
const WALLET_BUTTON_PERC = 60;

export function getResponsiveStyleVariables({
  height,
  fundingEligibility,
  experiment = {},
  size,
}: {|
  height?: ?number,
  fundingEligibility: FundingEligibilityType,
  experiment: Experiment,
  size: $Values<typeof BUTTON_SIZE>,
|}): Object {
  const { isPaypalRebrandEnabled, defaultBlueButtonColor } = experiment;
  const shouldApplyRebrandedStyles =
    isPaypalRebrandEnabled && defaultBlueButtonColor !== "gold";

  const style = BUTTON_SIZE_STYLE[size];

  const buttonHeight = height || style.defaultHeight;
  const minDualWidth = Math.max(
    Math.round(
      buttonHeight * BUTTON_MIN_ASPECT_RATIO * (100 / WALLET_BUTTON_PERC)
    ),
    MIN_SPLIT_BUTTON_WIDTH
  );

  const { paylater } = fundingEligibility;

  const shouldResizeLabel =
    paylater?.products?.paylater?.variant === "DE" ||
    paylater?.products?.payIn3?.variant === "IT" ||
    paylater?.products?.payIn3?.variant === "ES";

  const textPercPercentage = shouldResizeLabel ? 32 : 36;
  const labelPercPercentage = shouldResizeLabel ? 32 : 35;

  let smallerLabelHeight = max(
    roundUp(perc(buttonHeight, labelPercPercentage) + 5, 2),
    12
  );
  let labelHeight = max(roundUp(perc(buttonHeight, 35) + 5, 2), 12);

  const pillBorderRadius = Math.ceil(buttonHeight / 2);

  if (shouldApplyRebrandedStyles) {
    labelHeight = roundUp(perc(buttonHeight, 76), 1);
    // smallerLabelHeight gets triggered at widths < 320px
    // We will need to investigate why the labels need to get significantly smaller at this breakpoint
    smallerLabelHeight = labelHeight;
  }

  const styleVariables = {
    style,
    buttonHeight,
    minDualWidth,
    textPercPercentage,
    smallerLabelHeight,
    labelHeight,
    pillBorderRadius,
  };

  return styleVariables;
}

export function buttonResponsiveStyle({
  height,
  fundingEligibility,
  disableMaxWidth,
  disableMaxHeight,
  borderRadius,
  experiment = {},
}: {|
  height?: ?number,
  fundingEligibility: FundingEligibilityType,
  disableMaxWidth?: ?boolean,
  disableMaxHeight?: ?boolean,
  borderRadius?: ?number,
  experiment: Experiment,
|}): string {
  let styles = Object.keys(BUTTON_SIZE_STYLE)
    .map((size) => {
      const {
        style,
        buttonHeight,
        minDualWidth,
        textPercPercentage,
        smallerLabelHeight,
        labelHeight,
        pillBorderRadius,
      } = getResponsiveStyleVariables({
        height,
        fundingEligibility,
        experiment,
        size,
      });

      const textSizeLarge = `${max(perc(buttonHeight, 36), 10)}`;
      const textSizeSmaller = `${max(perc(buttonHeight, 32), 10)}`;

      const marginTop = `${perc(max(perc(buttonHeight, 36), 10), 10)}`;
      const marginTopSmaller = `${perc(max(perc(buttonHeight, 32), 10), 10)}`;

      const spinner = `${perc(buttonHeight, 50)}`;

      console.log(
        `${size}
        labelHeight: ${labelHeight}
        smallerLabelHeight: ${smallerLabelHeight}
        fontSize: ${textSizeLarge}
        smallerFontSize: ${textSizeSmaller}
        marginTop: -${marginTop}
        marginTopSmaller: -${marginTopSmaller}
        spinner: ${spinner}
        `
      );

      return `
            @media only screen and (min-width: ${style.minWidth}px) {

                .${CLASS.CONTAINER} {
                    min-width: ${style.minWidth}px;
                    ${disableMaxWidth ? "" : `max-width: ${style.maxWidth}px;`};
                    ${disableMaxHeight ? "height: 100%;" : ""};
                }

                .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.TEXT}, .${
        CLASS.CONTAINER
      } .${CLASS.BUTTON_ROW} .${CLASS.SPACE} {
                    font-size: ${max(perc(buttonHeight, 36), 10)}px;
                    margin-top: -${perc(max(perc(buttonHeight, 36), 10), 10)}px;
                    line-height: ${labelHeight}px;
                }

                .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.TEXT} * {
                    margin-top: ${perc(max(perc(buttonHeight, 36), 10), 10)}px;
                }

                .${CLASS.BUTTON_ROW} {
                    height: ${disableMaxHeight ? "100%" : `${buttonHeight}px`};
                    vertical-align: top;
                    ${
                      disableMaxHeight
                        ? ""
                        : ` min-height: ${height || style.minHeight}px;`
                    };
                    ${
                      disableMaxHeight
                        ? ""
                        : `max-height: ${height || style.maxHeight}px;`
                    }
                }

                .${CLASS.BUTTON_ROW}.${CLASS.LAYOUT}-${BUTTON_LAYOUT.VERTICAL} {
                    margin-bottom: ${perc(
                      buttonHeight,
                      BUTTON_RELATIVE_STYLE.VERTICAL_MARGIN
                    )}px;
                }

                .${CLASS.BUTTON_ROW}.${CLASS.LAYOUT}-${
        BUTTON_LAYOUT.VERTICAL
      }:last-of-type {
                    margin-bottom: 0;
                }

                .${CLASS.BUTTON} {
                    display: inline-block;
                    text-align: center;
                    height: 100%;
                }
                
                .${CLASS.BUTTON} .${CLASS.SPINNER} {
                    height: ${perc(buttonHeight, 50)}px;
                    width: ${perc(buttonHeight, 50)}px;
                }

                .${CLASS.BUTTON} > .${CLASS.BUTTON_LABEL} {
                    margin: 0px 4vw;
                    height: ${labelHeight}px;
                }

                .${CLASS.BUTTON}[${ATTRIBUTE.FUNDING_SOURCE}=${
        FUNDING.APPLEPAY
      }] .${CLASS.BUTTON_LABEL} {
                    height: ${perc(buttonHeight, 80) + 5}px;
                }

                .${CLASS.BUTTON}[${ATTRIBUTE.FUNDING_SOURCE}=${
        FUNDING.APPLEPAY
      }] .${CLASS.BUTTON_LABEL} .${CLASS.TEXT} {
                    line-height: ${perc(buttonHeight, 80) + 5}px;
                }

                .${CLASS.BUTTON}[${ATTRIBUTE.FUNDING_SOURCE}=${FUNDING.EPS}] .${
        CLASS.BUTTON_LABEL
      },
                .${CLASS.BUTTON}[${ATTRIBUTE.FUNDING_SOURCE}=${
        FUNDING.MYBANK
      }] .${CLASS.BUTTON_LABEL} {
                    height: ${perc(buttonHeight, 50) + 5}px;
                }

                .${CLASS.BUTTON}[${ATTRIBUTE.FUNDING_SOURCE}=${FUNDING.EPS}] .${
        CLASS.BUTTON_LABEL
      } .${CLASS.TEXT},
                .${CLASS.BUTTON}[${ATTRIBUTE.FUNDING_SOURCE}=${FUNDING.EPS}] .${
        CLASS.BUTTON_LABEL
      } .${CLASS.SPACE},
                .${CLASS.BUTTON}[${ATTRIBUTE.FUNDING_SOURCE}=${
        FUNDING.MYBANK
      }] .${CLASS.BUTTON_LABEL} .${CLASS.TEXT},
                .${CLASS.BUTTON}[${ATTRIBUTE.FUNDING_SOURCE}=${
        FUNDING.MYBANK
      }] .${CLASS.BUTTON_LABEL} .${CLASS.SPACE} {
                    line-height: ${perc(buttonHeight, 50) + 5}px;
                }
                
                .${CLASS.BUTTON}.${CLASS.BORDER_RADIUS} {
                  ${
                    borderRadius && isBorderRadiusNumber(borderRadius)
                      ? `border-radius: ${borderRadius}px`
                      : ""
                  }
                }

                .${CLASS.BUTTON}.${CLASS.SHAPE}-${BUTTON_SHAPE.SHARP} {
                  border-radius: 0px;
                }

                .${CLASS.BUTTON}.${CLASS.SHAPE}-${BUTTON_SHAPE.RECT} {
                    border-radius: 4px;
                }

                .${CLASS.BUTTON}.${CLASS.SHAPE}-${BUTTON_SHAPE.PILL} {
                    border-radius: ${pillBorderRadius}px;
                }

                .${CLASS.BUTTON_ROW}.${CLASS.BORDER_RADIUS} .menu-button {
                  ${
                    borderRadius && isBorderRadiusNumber(borderRadius)
                      ? `border-top-right-radius: ${borderRadius}px; border-bottom-right-radius: ${borderRadius}px`
                      : ""
                  }
                }

                .${CLASS.BUTTON_ROW}.${CLASS.SHAPE}-${
        BUTTON_SHAPE.SHARP
      } .menu-button {
                              border-top-right-radius: 0px;
                              border-bottom-right-radius: 0px;
                          }

                .${CLASS.BUTTON_ROW}.${CLASS.SHAPE}-${
        BUTTON_SHAPE.RECT
      } .menu-button {
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                }

                .${CLASS.BUTTON_ROW}.${CLASS.SHAPE}-${
        BUTTON_SHAPE.PILL
      } .menu-button {
                    border-top-right-radius: ${pillBorderRadius}px;
                    border-bottom-right-radius: ${pillBorderRadius}px;
                }
                
                .${CLASS.TAGLINE} .${CLASS.TEXT} {
                    height: ${perc(
                      buttonHeight,
                      BUTTON_RELATIVE_STYLE.TAGLINE
                    )}px;
                    line-height: ${perc(
                      buttonHeight,
                      BUTTON_RELATIVE_STYLE.TAGLINE
                    )}px;
                }

                .${CLASS.CARD} {
                    display: inline-block;
                    height: 100%;
                }

                .${CLASS.BUTTON_ROW}.${CLASS.WALLET}.${CLASS.WALLET_MENU} .${
        CLASS.BUTTON
      } {
                    width: calc(100% - ${buttonHeight + 2}px);
                    border-top-right-radius: 0px;
                    border-bottom-right-radius: 0px;
                }

                .menu-button {
                    height: ${buttonHeight}px;
                    width: ${buttonHeight}px;
                }
            }

            @media only screen and (min-width: ${
              style.minWidth
            }px) and (max-width: 320px) {

                .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.TEXT}, .${
        CLASS.CONTAINER
      } .${CLASS.BUTTON_ROW} .${CLASS.SPACE} {
                    font-size: ${max(
                      perc(buttonHeight, textPercPercentage),
                      10
                    )}px;
                    margin-top: -${perc(
                      max(perc(buttonHeight, textPercPercentage), 10),
                      10
                    )}px;
                    line-height: ${smallerLabelHeight}px;
                }


                .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.TEXT} * {
                    margin-top: ${perc(
                      max(perc(buttonHeight, textPercPercentage), 10),
                      10
                    )}px;
                }

                .${CLASS.BUTTON} > .${
        CLASS.BUTTON_LABEL
      }, .SMALLER_LABEL_HEIGHT {
                    margin: 0px 4vw;
                    height: ${smallerLabelHeight}px;
                }
            }

            @media only screen and (min-width: ${
              style.minWidth
            }px) and (max-width: ${minDualWidth}px) {

                .${CLASS.BUTTON_ROW}.${CLASS.LAYOUT}-${
        BUTTON_LAYOUT.HORIZONTAL
      }.${CLASS.NUMBER}-${BUTTON_NUMBER.MULTIPLE}.${CLASS.NUMBER}-0 {
                    width: 100%;
                    margin-right: 0;
                }

                .${CLASS.BUTTON_ROW}.${CLASS.LAYOUT}-${
        BUTTON_LAYOUT.HORIZONTAL
      }.${CLASS.NUMBER}-${BUTTON_NUMBER.MULTIPLE}.${CLASS.NUMBER}-1 {
                    display: none;
                }

                .${CLASS.CONTAINER}.${CLASS.LAYOUT}-${
        BUTTON_LAYOUT.HORIZONTAL
      }.${CLASS.NUMBER}-${BUTTON_NUMBER.MULTIPLE} .${CLASS.TAGLINE} {
                    display: none;
                }
            }

            @media only screen and (min-width: ${max(
              style.minWidth,
              minDualWidth
            )}px) {

                .${CLASS.BUTTON_ROW}.${CLASS.LAYOUT}-${
        BUTTON_LAYOUT.HORIZONTAL
      }.${CLASS.NUMBER}-${BUTTON_NUMBER.MULTIPLE}.${CLASS.NUMBER}-0 {
                    display: inline-block;
                    width: calc(${FIRST_BUTTON_PERC}% - ${perc(
        buttonHeight,
        7
      )}px);
                    margin-right: ${perc(buttonHeight, 7) * 2}px;
                }

                .${CLASS.BUTTON_ROW}.${CLASS.LAYOUT}-${
        BUTTON_LAYOUT.HORIZONTAL
      }.${CLASS.NUMBER}-${BUTTON_NUMBER.MULTIPLE}.${CLASS.NUMBER}-1 {
                    display: inline-block;
                    width: calc(${100 - FIRST_BUTTON_PERC}% - ${perc(
        buttonHeight,
        7
      )}px);
                }

                .${CLASS.CONTAINER}.${CLASS.WALLET} .${CLASS.BUTTON_ROW}.${
        CLASS.WALLET
      }.${CLASS.LAYOUT}-${BUTTON_LAYOUT.HORIZONTAL}.${CLASS.NUMBER}-${
        BUTTON_NUMBER.MULTIPLE
      } {
                    width: calc(${WALLET_BUTTON_PERC}% - ${perc(
        buttonHeight,
        7
      )}px);
                }

                .${CLASS.CONTAINER}.${CLASS.WALLET} .${CLASS.BUTTON_ROW}:not(.${
        CLASS.WALLET
      }).${CLASS.LAYOUT}-${BUTTON_LAYOUT.HORIZONTAL}.${CLASS.NUMBER}-${
        BUTTON_NUMBER.MULTIPLE
      } {
                    width: calc(${100 - WALLET_BUTTON_PERC}% - ${perc(
        buttonHeight,
        7
      )}px);
                }

                .${CLASS.CONTAINER}.${CLASS.LAYOUT}-${
        BUTTON_LAYOUT.HORIZONTAL
      }.${CLASS.NUMBER}-${BUTTON_NUMBER.MULTIPLE} .${CLASS.TAGLINE} {
                    display: block;
                }
            }

        `;
    })
    .join("\n");

  if (disableMaxHeight) {
    styles += `
  /* Setup media queries for disableMaxHeight mode */
  
  /* TINY button (min-height: 25px, max-height: 30px) */
  @media (min-height: ${minHeight}px) and (max-height: ${maxHeight}px) {

    .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.TEXT},
    // used for adding space between PP monogram and Pay Later text + APM
    .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.SPACE} {
      font-size: ${fontSize}px;
      margin-top: -${marginTop}px; // negative value here
      line-height: ${lineHeight}x;
    }
    .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.TEXT} * {
      margin-top: ${marginTop}px; // positive value here
    }
  
    .${CLASS.BUTTON} .${CLASS.SPINNER} {
      height: ${spinnerSize}px;
      width: ${spinnerSize}px;
    }
    
    .${CLASS.BUTTON} > .${CLASS.BUTTON_LABEL} {
      margin: 0 4vw; // This is the same for all sizes
      height: ${lineHeight}px;
    }
  }
  
  /* SMALL button (min-height: 35px, max-height: 55px) */
  @media (min-height: 35px) and (max-height: 55px) {
    .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.TEXT},
    .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.SPACE} {
      font-size: 13px;
      margin-top: -1px;
      line-height: 18px;
    }
    .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.TEXT} * {
      margin-top: 1px;
    }
    .${CLASS.BUTTON} > .${CLASS.BUTTON_LABEL} {
      margin: 0 4vw;
      height: 18px;
    }
  }
  
  /* MEDIUM button (min-height: 45px, max-height: 55px) */
  @media (min-height: 45px) and (max-height: 55px) {
    .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.TEXT},
    .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.SPACE} {
      font-size: 16px;
      margin-top: -2px;
      line-height: 22px;
    }
    .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.TEXT} * {
      margin-top: 2px;
    }
    .${CLASS.BUTTON} > .${CLASS.BUTTON_LABEL} {
      margin: 0 4vw;
      height: 22px;
    }
  }
  
  /* LARGE button (min-height: 55px, max-height: 75px) */
  @media (min-height: 55px) and (max-height: 75px) {
    .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.TEXT},
    .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.SPACE} {
      font-size: 20px;
      margin-top: -2px;
      line-height: 24px;
    }
    .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.TEXT} * {
      margin-top: 2px;
    }
    .${CLASS.BUTTON} > .${CLASS.BUTTON_LABEL} {
      margin: 0 4vw;
      height: 24px;
    }
  }
  
  /* X-LARGE button (min-height: 75px, max-height: 95px) */
  @media (min-height: 75px) and (max-height: 95px) {
    .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.TEXT},
    .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.SPACE} {
      font-size: 24px;
      margin-top: -2px;
      line-height: 28px;
    }
    .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.TEXT} * {
      margin-top: 2px;
    }
    .${CLASS.BUTTON} > .${CLASS.BUTTON_LABEL} {
      margin: 0 4vw;
      height: 28px;
    }
  }
  
  /* XX-LARGE button (min-height: 95px, max-height: 115px) */
  @media (min-height: 95px) and (max-height: 115px) {
    .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.TEXT},
    .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.SPACE} {
      font-size: 28px;
      margin-top: -2px;
      line-height: 32px;
    }
    .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.TEXT} * {
      margin-top: 2px;
    }
    .${CLASS.BUTTON} > .${CLASS.BUTTON_LABEL} {
      margin: 0 4vw;
      height: 32px;
    }
  }
  
  /* XXX-LARGE button (min-height: 115px) */
  @media (min-height: 115px) {
    .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.TEXT},
    .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.SPACE} {
      font-size: 32px;
      margin-top: -2px;
      line-height: 36px;
    }
    .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.TEXT} * {
      margin-top: 2px;
    }
    .${CLASS.BUTTON} > .${CLASS.BUTTON_LABEL} {
      margin: 0 4vw;
      height: 36px;
    }
  }
      `;
  }
  return styles;
}
