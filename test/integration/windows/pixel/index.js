/* @flow */
const { action } = window.xprops.test;

if (action === "approve") {
  window.xprops.onApprove();
} else {
  window.xprops.onError();
}
