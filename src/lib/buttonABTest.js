/* @flow */
// $FlowFixMe[incompatible-type] - Suppress all flow errors in this file
/* eslint-disable */
import {
  BUTTON_LABEL,
  BUTTON_COLOR,
  BUTTON_COLOR_REBRAND,
  BUTTON_LAYOUT,
  BUTTON_SHAPE,
  BUTTON_SIZE,
  BUTTON_FLOW,
  MENU_PLACEMENT,
  MESSAGE_OFFER,
  MESSAGE_COLOR,
  MESSAGE_POSITION,
  MESSAGE_ALIGN,
} from "../constants";

function ABTestResults(props) {
  console.log("ABTestResults");
  console.log("props", props);
  const { sessionID, experiment, style } = props;
  const { isPaypalRebrandEnabled, isPaypalRebrandABTestEnabled } = experiment;
  console.log("sessionID", sessionID);

  // Use variables from the outer scope
  let shouldApplyRebrandedStyles = Boolean(isPaypalRebrandEnabled);
  let buttonColorABTest: $Values<typeof BUTTON_COLOR> =
    shouldApplyRebrandedStyles ? BUTTON_COLOR.REBRAND_BLUE : BUTTON_COLOR.GOLD;

  if (isPaypalRebrandABTestEnabled) {
    const propsColor = style?.color ?? BUTTON_COLOR.GOLD;
    const randomButtonColor = Math.floor(Math.random() * 3); // Ensure buttonColorABTest is always assigned

    switch (randomButtonColor) {
      case 0:
        buttonColorABTest = BUTTON_COLOR.REBRAND_BLUE;
        break;
      case 1:
        buttonColorABTest = BUTTON_COLOR.REBRAND_DARKBLUE;
        break;
      default:
        buttonColorABTest = propsColor;
    }

    shouldApplyRebrandedStyles = buttonColorABTest !== propsColor;
  }

  // Create the result
  const result = {
    shouldApplyRebrandedStyles,
    buttonColorABTest,
  };

  return result;
}

// *******************************8

// Global cache variables
let cachedSessionID: ?string = null;
let cachedResult: ?ABTestResult = null;

function memoizedABTestResults(
  isPaypalRebrandEnabled: ?boolean,
  isPaypalRebrandABTestEnabled: ?boolean,
  style: ?ButtonStyleInputs,
  sessionID: ?string
): ABTestResult {
  console.log("sessionID", sessionID);

  // If we have a cached result and the sessionID matches, return the cached result
  if (cachedResult && sessionID === cachedSessionID) {
    console.log("Using cached result for sessionID:", sessionID);
    return cachedResult;
  }

  // Generate a new result
  console.log("Generating new result for sessionID:", sessionID);

  // Use variables from the outer scope
  let shouldApplyRebrandedStyles = Boolean(isPaypalRebrandEnabled);
  let buttonColorABTest: $Values<typeof BUTTON_COLOR> =
    shouldApplyRebrandedStyles ? BUTTON_COLOR.REBRAND_BLUE : BUTTON_COLOR.GOLD;

  console.log("isPaypalRebrandABTestEnabled", isPaypalRebrandABTestEnabled);
  if (isPaypalRebrandABTestEnabled) {
    const propsColor = style?.color ?? BUTTON_COLOR.GOLD;
    const randomButtonColor = Math.floor(Math.random() * 3); // Ensure buttonColorABTest is always assigned

    switch (randomButtonColor) {
      case 0:
        buttonColorABTest = BUTTON_COLOR.REBRAND_BLUE;
        break;
      case 1:
        buttonColorABTest = BUTTON_COLOR.REBRAND_DARKBLUE;
        break;
      default:
        buttonColorABTest = propsColor;
    }

    shouldApplyRebrandedStyles = buttonColorABTest !== propsColor;
  }

  // Create the result
  cachedResult = {
    shouldApplyRebrandedStyles,
    buttonColorABTest,
  };

  // Update the cached sessionID
  cachedSessionID = sessionID;

  return cachedResult;
}

export function getButtonABTestValues(props): string {
  // console.log("getSessionID", props.sessionID);
  if (window.xprops && window.xprops.buttonColorABTest) {
    return window.xprops.buttonColorABTest;
  }
  const { experiment, style, sessionID, colorABTest } = props;
  const { isPaypalRebrandEnabled, isPaypalRebrandABTestEnabled } = experiment;
  console.log("props", props);
  console.log("colorABTest", colorABTest);

  // return ABTestResults(props);
  return memoizedABTestResults({
    isPaypalRebrandEnabled,
    isPaypalRebrandABTestEnabled,
    style,
    sessionID,
  });
}
