/* @flow */
/** @jsx node */

const { action } = window.xprops.test;

if (action === "checkout") {
  window.xprops.createOrder().then((orderID) => {
    return window.xprops.onApprove({ orderID });
  });
}
