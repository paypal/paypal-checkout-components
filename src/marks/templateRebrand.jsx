/* @flow */
/** @jsx node */

import { FUNDING, ENV } from "@paypal/sdk-constants/src";
import {
  node,
  type ChildNodeType,
  type ElementNode,
} from "@krakenjs/jsx-pragmatic/src";
import { getLocale, type FundingEligibilityType } from "@paypal/sdk-client/src";
import { toPx } from "@krakenjs/belter/src";

import type { Experiment } from "../types";
import { getFundingConfig } from "../funding";
import { CLASS, MARK_VARIATIONS } from "../constants";
import { PayPalMonogramMark } from "../funding/paypal/monogramMark";

type MarkOptions = {|
  fundingSource: $Values<typeof FUNDING>,
  markVariation?: ?$Values<typeof MARK_VARIATIONS>,
  fundingEligibility: FundingEligibilityType,
  experiment: Experiment,
  env: $Values<typeof ENV>,
|};

function Mark({
  fundingSource,
  markVariation,
  fundingEligibility,
  experiment,
  env,
}: MarkOptions): ChildNodeType {
  const fundingConfig = getFundingConfig()[fundingSource];

  if (!fundingConfig) {
    throw new Error(`Can not find funding config for ${fundingSource}`);
  }

  const { Logo } = fundingConfig;
  const MarkLogo = fundingConfig.Mark;
  const marksDefined = typeof MarkLogo !== "undefined";

  let backgroundClasses = "paypal-mark-rebrand";

  const hasBlueBackground =
    fundingSource === FUNDING.PAYPAL ||
    fundingSource === FUNDING.PAYLATER ||
    fundingSource === FUNDING.CREDIT;

  backgroundClasses += hasBlueBackground
    ? " paypal-mark-rebrand-blue"
    : " paypal-mark-rebrand-white";

  const shouldUseOwnBorderAndPadding = fundingSource === FUNDING.APPLEPAY;
  if (shouldUseOwnBorderAndPadding) {
    backgroundClasses += " paypal-mark-rebrand-own-border-and-padding";
  }

  // Helper function to render wordmark (Logo)
  const renderWordmark = () => (
    <div class={backgroundClasses}>
      {marksDefined && MarkLogo ? (
        <MarkLogo shouldApplyRebrandedStyles={true} />
      ) : (
        <Logo
          fundingEligibility={fundingEligibility}
          locale={getLocale()}
          experiment={experiment}
          env={env}
          shouldApplyRebrandedStyles={true}
        />
      )}
    </div>
  );

  // Helper function to render PayPal monogram
  const renderPayPalMonogram = () => (
    <div class="paypal-mark-rebrand paypal-mark-rebrand-white">
      <PayPalMonogramMark />
    </div>
  );

  // Handle PayPal variations - only check for monogram, everything else defaults to wordmark
  if (
    fundingSource === FUNDING.PAYPAL &&
    markVariation === MARK_VARIATIONS.MONOGRAM
  ) {
    return renderPayPalMonogram();
  }

  // Default logic for all other cases (handles undefined, null, "wordmark", invalid values)
  return renderWordmark();
}

type MarksElementOptions = {|
  fundingEligibility: FundingEligibilityType,
  fundingSources: $ReadOnlyArray<$Values<typeof FUNDING>>,
  markVariation?: ?$Values<typeof MARK_VARIATIONS>,
  height: number,
  experiment: Experiment,
  env: $Values<typeof ENV>,
|};

export function MarksElementRebrand({
  fundingEligibility,
  fundingSources,
  markVariation,
  experiment,
  env,
}: MarksElementOptions): ElementNode {
  // Rebrand dimensions: 32px height, 48px width
  const rebrandHeight = 32;
  const rebrandWidth = 48;

  return (
    <div>
      <style>
        {`
                    .${CLASS.TEXT} {
                        font-family: PayPal Pro Book, system-ui, -apple-system, Roboto, "Segoe UI", Helvetica-Neue, Helvetica, Arial, sans-serif;
                        font-size: 12px;
                        vertical-align: middle;
                    }

                    .paypal-marks-rebrand {
                      display: flex;
                    }

                    .paypal-mark-rebrand {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 3px;
                        margin: ${toPx(rebrandHeight / 5)};
                        position: relative;
                        width: ${toPx(rebrandWidth)};
                        height: ${toPx(rebrandHeight)};
                        padding: 3px;
                        box-sizing: border-box;
                        overflow: hidden;
                    }

                    .paypal-mark-rebrand:last-child {
                        margin-right: none;
                    }

                    .paypal-mark-rebrand-white {
                        background: #fff;
                        border: 1px solid #E6E6E6;
                    }

                    .paypal-mark-rebrand-blue {
                        background: #60CDFF;
                        border: 1px solid #60CDFF;
                    }

                    .paypal-mark-rebrand-own-border-and-padding {
                        border: none;
                        padding: 0px;
                    }

                    .paypal-mark-rebrand img {
                        max-width: 100%;
                        max-height: 100%;
                        width: auto;
                        height: auto;
                        object-fit: contain;
                        display: block;
                    }

                    .paypal-button-card {
                        display: inline-block;
                        margin-right: ${toPx(rebrandHeight / 4)};
                    }

                    .paypal-button-card:last-child {
                        margin-right: 0px;
                    }

                    .paypal-mark-rebrand .paypal-logo {
                        margin-right: ${toPx(rebrandHeight / 5)};
                    }

                    .paypal-mark-rebrand .paypal-logo:last-child {
                        margin-right: 0px;
                    }
                `}
      </style>
      <div class="paypal-marks-rebrand">
        {fundingSources.map((fundingSource) => (
          <Mark
            fundingEligibility={fundingEligibility}
            fundingSource={fundingSource}
            markVariation={markVariation}
            experiment={experiment}
            env={env}
          />
        ))}
      </div>
    </div>
  );
}
