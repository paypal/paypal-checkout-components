/* @flow */
const namespace = document.currentScript?.getAttribute("data-pp-namespace");

// function createMockFn(callback = () => {}) {
//   function mockFn(...args) {
//     mockFn.calls.push(args);
//     callback(...args)
//   }
// }

window.namespace = namespace;
window[namespace].MessagesModal = (config) => {
  window[namespace].MessagesModal.mock = {};
  window[namespace].MessagesModal.mock.calls =
    (window[namespace].MessagesModal.mock.calls ?? 0) + 1;
  window[namespace].MessagesModal.mock.calledWith = config;
  return {
    show: (config2) => {
      window[namespace].MessagesModal.mock.show = { calledWith: config2 };
    },
  };
};
