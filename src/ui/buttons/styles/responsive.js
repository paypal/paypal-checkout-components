/* @flow */

import { max, perc } from "@krakenjs/belter/src";
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
} from "../../../constants";
import {
  BUTTON_SIZE_STYLE,
  BUTTON_RELATIVE_STYLE,
  BUTTON_DISABLE_MAX_HEIGHT_STYLE,
} from "../config";
import { isBorderRadiusNumber } from "../util";

import {
  getResponsiveStyleVariables,
  getDisableMaxHeightResponsiveStyleVariables,
} from "./styleUtils";

const FIRST_BUTTON_PERC = 50;
const WALLET_BUTTON_PERC = 60;

const generateButtonSizeStyles = ({
  height,
  fundingEligibility,
  disableMaxWidth,
  disableMaxHeight,
  borderRadius,
  shouldApplyRebrandedStyles,
}: {|
  height?: ?number,
  fundingEligibility: FundingEligibilityType,
  disableMaxWidth?: ?boolean,
  disableMaxHeight?: ?boolean,
  borderRadius?: ?number,
  shouldApplyRebrandedStyles: boolean,
|}): string => {
  return Object.keys(BUTTON_SIZE_STYLE)
    .map((size) => {
      const {
        style,
        buttonHeight,
        minDualWidth,
        textPercPercentage,
        smallerLabelHeight,
        labelHeight,
        pillBorderRadius,
        gap,
        lineHeight,
      } = getResponsiveStyleVariables({
        height,
        fundingEligibility,
        shouldApplyRebrandedStyles,
        size,
      });

      return `
            @media only screen and (min-width: ${style.minWidth}px) {
                .${CLASS.BUTTON_LABEL} {
                    gap: ${gap}px;
                }
                
                .${CLASS.CONTAINER} {
                    min-width: ${style.minWidth}px;
                    ${disableMaxWidth ? "" : `max-width: ${style.maxWidth}px;`};
                    ${disableMaxHeight ? "height: 100%;" : ""};
                }

                .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.TEXT}, .${
        CLASS.CONTAINER
      } .${CLASS.BUTTON_ROW} .${CLASS.SPACE} {
                    font-size: ${max(perc(buttonHeight, 36), 10)}px;
                     line-height: ${lineHeight}px;
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
                     line-height: ${lineHeight}px;  
                }

                .${CLASS.BUTTON} > .${CLASS.BUTTON_LABEL} {
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
};

const generateDisableMaxHeightStyles = ({
  fundingEligibility,
  shouldApplyRebrandedStyles,
}: {|
  fundingEligibility: FundingEligibilityType,
  shouldApplyRebrandedStyles: boolean,
|}): string => {
  return Object.keys(BUTTON_DISABLE_MAX_HEIGHT_STYLE)
    .map((disableMaxHeightSize) => {
      const {
        disableHeightStyle,
        buttonHeight,
        labelHeight,
        fontSize,
        marginTop,
        spinnerSize,
        pillBorderRadius,
        APMHeight,
        applePayHeight,
        gap,
      } = getDisableMaxHeightResponsiveStyleVariables({
        fundingEligibility,
        shouldApplyRebrandedStyles,
        disableMaxHeightSize,
      });

      const { minHeight, maxHeight } = disableHeightStyle;

      return `
            @media (min-height: ${minHeight}px) and (max-height: ${maxHeight}px) {
              .${CLASS.BUTTON_LABEL} {
                gap: ${gap}px;
              }

              .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.TEXT},
              .${CLASS.CONTAINER} .${CLASS.BUTTON_ROW} .${CLASS.SPACE} {
                font-size: ${fontSize}px;
                // line-height: ${lineHeight}px;
              }
            
              .${CLASS.BUTTON} .${CLASS.SPINNER} {
                height: ${spinnerSize}px;
                width: ${spinnerSize}px;
              }
              
              .${CLASS.BUTTON} > .${CLASS.BUTTON_LABEL} {
                margin: 0 4vw;
                height: ${labelHeight}px;
              }

              .${CLASS.BUTTON}[${ATTRIBUTE.FUNDING_SOURCE}=${FUNDING.APPLEPAY}] 
              .${CLASS.BUTTON_LABEL} {
                height: ${applePayHeight}px;
              }

              .${CLASS.BUTTON}[${ATTRIBUTE.FUNDING_SOURCE}=${FUNDING.APPLEPAY}] 
              .${CLASS.BUTTON_LABEL} .${CLASS.TEXT} {
                line-height: ${applePayHeight}px;
              }

              .${CLASS.BUTTON}[${ATTRIBUTE.FUNDING_SOURCE}=${FUNDING.EPS}] 
              .${CLASS.BUTTON_LABEL},
              .${CLASS.BUTTON}[${ATTRIBUTE.FUNDING_SOURCE}=${FUNDING.MYBANK}] 
              .${CLASS.BUTTON_LABEL} {
                height: ${APMHeight}px;
              }

              .${CLASS.BUTTON}[${ATTRIBUTE.FUNDING_SOURCE}=${FUNDING.EPS}] 
              .${CLASS.BUTTON_LABEL} .${CLASS.TEXT},
              .${CLASS.BUTTON}[${ATTRIBUTE.FUNDING_SOURCE}=${FUNDING.EPS}] 
              .${CLASS.BUTTON_LABEL} .${CLASS.SPACE},
              .${CLASS.BUTTON}[${ATTRIBUTE.FUNDING_SOURCE}=${FUNDING.MYBANK}] 
              .${CLASS.BUTTON_LABEL} .${CLASS.TEXT},
              .${CLASS.BUTTON}[${ATTRIBUTE.FUNDING_SOURCE}=${FUNDING.MYBANK}] 
              .${CLASS.BUTTON_LABEL} .${CLASS.SPACE} {
                line-height: ${APMHeight}px;
              }

              .${CLASS.BUTTON}.${CLASS.SHAPE}-${BUTTON_SHAPE.PILL} {
                border-radius: ${pillBorderRadius}px;
              }

              .${CLASS.BUTTON_ROW}.${CLASS.SHAPE}-${BUTTON_SHAPE.PILL} 
              .menu-button {
                border-top-right-radius: ${pillBorderRadius}px;
                border-bottom-right-radius: ${pillBorderRadius}px;
              }

              .${CLASS.BUTTON_ROW}.${CLASS.WALLET}.${CLASS.WALLET_MENU} 
              .${CLASS.BUTTON} {
                width: calc(100% - ${buttonHeight + 2}px);
                border-top-right-radius: 0px;
                border-bottom-right-radius: 0px;
              }

              .menu-button {
                height: 100%;
                width: auto;
                aspect-ratio: 1;
              }
            }
          `;
    })
    .join("\n");
};

export function buttonResponsiveStyle({
  height,
  fundingEligibility,
  disableMaxWidth,
  disableMaxHeight,
  borderRadius,
  shouldApplyRebrandedStyles,
}: {|
  height?: ?number,
  fundingEligibility: FundingEligibilityType,
  disableMaxWidth?: ?boolean,
  disableMaxHeight?: ?boolean,
  borderRadius?: ?number,
  shouldApplyRebrandedStyles: boolean,
|}): string {
  const buttonSizeStyles = generateButtonSizeStyles({
    height,
    fundingEligibility,
    disableMaxWidth,
    disableMaxHeight,
    borderRadius,
    shouldApplyRebrandedStyles,
  });

  const disableMaxHeightStyles = disableMaxHeight
    ? generateDisableMaxHeightStyles({
        fundingEligibility,
        shouldApplyRebrandedStyles,
      })
    : "";

  return buttonSizeStyles + disableMaxHeightStyles;
}
