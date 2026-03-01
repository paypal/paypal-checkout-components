/* @flow */

/**
 * Utility functions for SavedPaymentMethods component
 */

export function getSavedPaymentMethodsSize(): {|
  width: string,
  height: string,
|} {
  return {
    width: "400px",
    height: "50px",
  };
}

export function validateSavedPaymentMethodsProps(props: Object): void {
  // Add validation logic here
  if (!props.clientID) {
    throw new Error("clientID is required for SavedPaymentMethods component");
  }
}
