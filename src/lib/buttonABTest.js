/* @flow */
import { BUTTON_COLOR } from "../constants";
import type { ButtonStyle } from "../ui/buttons/props";
import type { Experiment } from "../types"; // Adjust the path as needed

import type { StateGetSet } from "./session";

// type ABTestArgs = {|
//   isPaypalRebrandEnabled: ?boolean,
//   isPaypalRebrandABTestEnabled: ?boolean,
//   style: ?ButtonStyle,
//   sessionID: ?string,
//   storageState: StateGetSet,
// |};

// function memoizedABTestResults({
//   isPaypalRebrandEnabled,
//   isPaypalRebrandABTestEnabled,
//   style,
//   sessionID,
//   storageState,
// }: ABTestArgs): ColorABTest {
//   const sessionIdFromStorageState = getSessionIdFromStorageState(storageState);

//   // If we have a cached result and the sessionID matches, return the cached result
//   if (sessionIdFromStorageState && sessionID === sessionIdFromStorageState) {
//     // console.log("memoized - Using cached result for sessionID:", sessionID);
//     const buttonColorABTestFromStorage =
//       getButtonColorABTestFromStorage(storageState);

//     if (buttonColorABTestFromStorage) {
//       // console.log("buttonColorABTestFromStorage", buttonColorABTestFromStorage);
//       return buttonColorABTestFromStorage;
//     }
//     // same session but buttonColorABTest is not in storage
//     // console.log(
//     //   "memoized - no cached results found for colorABTest for sessionID:",
//     //   sessionID
//     // );
//   }

//   // Generate a new result
//   // console.log("memoized - Generating new result for sessionID:", sessionID);

//   // Use variables from the outer scope
//   let shouldApplyRebrandedStyles = Boolean(isPaypalRebrandEnabled);
//   let buttonColorABTest: $Values<typeof BUTTON_COLOR> =
//     shouldApplyRebrandedStyles ? BUTTON_COLOR.REBRAND_BLUE : BUTTON_COLOR.GOLD;

//   // console.log("isPaypalRebrandABTestEnabled", isPaypalRebrandABTestEnabled);
//   if (isPaypalRebrandABTestEnabled) {
//     const propsColor = style?.color ?? BUTTON_COLOR.GOLD;
//     const randomButtonColor = Math.floor(Math.random() * 3); // Ensure buttonColorABTest is always assigned

//     switch (randomButtonColor) {
//       case 0:
//         buttonColorABTest = BUTTON_COLOR.REBRAND_BLUE;
//         break;
//       case 1:
//         buttonColorABTest = BUTTON_COLOR.REBRAND_DARKBLUE;
//         break;
//       default:
//         buttonColorABTest = propsColor;
//     }

//     shouldApplyRebrandedStyles = buttonColorABTest !== propsColor;
//   }

//   // Create the result
//   const cachedResult = {
//     shouldApplyRebrandedStyles,
//     buttonColorABTest,
//   };

//   // Update the cached sessionID
//   storageState.set("colorABTest", cachedResult);
//   // console.log(
//   //   `memoized - Setting cached result for sessionID ${sessionID}:`,
//   //   cachedResult
//   // );
//   return cachedResult;
// }

export type ColorABTest = {|
  shouldApplyRebrandedStyles: boolean,
  buttonColorABTest: $Values<typeof BUTTON_COLOR>,
|};

function getColorABTestFromStorage(storageState): ?ColorABTest {
  const sessionState = storageState.get("colorABTest");

  if (sessionState && sessionState.value) {
    return sessionState.value;
  }
  // If the session ID is not found, return null
  return null;
}

function getSessionIdFromStorageState(storageState): ?string {
  const sessionState = storageState.get("__session__");

  if (sessionState && sessionState.value && sessionState.value.guid) {
    return sessionState.value.guid;
  }
  // If the session ID is not found, return null
  return null;
}
type ColorABTestArgs = {|
  experiment: Experiment,
  style: ?ButtonStyle,
  sessionID: ?string,
  storageState: StateGetSet,
|};

// Update the function signature
export function getColorABTest({
  experiment,
  style,
  sessionID,
  storageState,
}: ColorABTestArgs): ColorABTest {
  if (window.xprops && window.xprops.buttonColorABTest) {
    return window.xprops.buttonColorABTest;
  }
  const { isPaypalRebrandEnabled, isPaypalRebrandABTestEnabled } = experiment;

  const sessionIdFromStorageState = getSessionIdFromStorageState(storageState);

  // If we have a cached result and the sessionID matches, return the cached result
  if (sessionIdFromStorageState && sessionID === sessionIdFromStorageState) {
    // console.log("memoized - Using cached result for sessionID:", sessionID);
    const buttonColorABTestFromStorage =
      getColorABTestFromStorage(storageState);

    if (buttonColorABTestFromStorage) {
      // console.log("buttonColorABTestFromStorage", buttonColorABTestFromStorage);
      return buttonColorABTestFromStorage;
    }
    // same session but buttonColorABTest is not in storage
    // console.log(
    //   "memoized - no cached results found for colorABTest for sessionID:",
    //   sessionID
    // );
  }

  // Generate a new result
  // console.log("memoized - Generating new result for sessionID:", sessionID);

  // Use variables from the outer scope
  let shouldApplyRebrandedStyles = Boolean(isPaypalRebrandEnabled);
  let buttonColorABTest: $Values<typeof BUTTON_COLOR> =
    shouldApplyRebrandedStyles ? BUTTON_COLOR.REBRAND_BLUE : BUTTON_COLOR.GOLD;

  // console.log("isPaypalRebrandABTestEnabled", isPaypalRebrandABTestEnabled);
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
  const cachedResult = {
    shouldApplyRebrandedStyles,
    buttonColorABTest,
  };

  // Update the cached sessionID
  storageState.set("colorABTest", cachedResult);
  // console.log(
  //   `memoized - Setting cached result for sessionID ${sessionID}:`,
  //   cachedResult
  // );
  return cachedResult;
}
