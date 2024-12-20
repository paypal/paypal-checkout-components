/* @flow */

import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { DISPLAY_ONLY_VALUES } from "@paypal/sdk-constants/src";

import type { AppSwitchResumeParams } from "../../lib";
import type {
  OnApprove,
  OnCancel,
  OnClick,
  OnComplete,
} from "../../ui/buttons/props";

export type PixelComponentProps = {|
  onCancel: OnCancel,
  onApprove: OnApprove,
  onComplete: OnComplete,
  onError: (mixed) => ZalgoPromise<void>,
  onClick: OnClick,
  resumeFlowParams: AppSwitchResumeParams,
  displayOnly?: $ReadOnlyArray<$Values<typeof DISPLAY_ONLY_VALUES>>,
|};
