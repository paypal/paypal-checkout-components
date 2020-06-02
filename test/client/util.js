/* @flow */

export function triggerKeyPress(el : Element, keyCode : number) {
    const eventObj = window.document.createEvent('Events');
    eventObj.initEvent('keypress', true, true);
    eventObj.which = keyCode;
    eventObj.keyCode = keyCode;
    eventObj.key = keyCode;
    el.dispatchEvent(eventObj);
}
