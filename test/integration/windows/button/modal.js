/* @flow */
const namespace = document.currentScript.getAttribute("data-pp-namespace");

window.namespace = namespace;
window[namespace].MessagesModal = (...args) => {
  window[namespace].MessagesModal.mock.calls =
    (window[namespace].MessagesModal ?? 0) + 1;
  window[namespace].MessagesModal.mock.calledWith = { args };
  return {
    show: (...args2) => {
      window[namespace].MessagesModal.mock.show = { calledWith: args2 };
    },
  };
};
