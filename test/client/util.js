
export function triggerKeyPress(el, keyCode) {
    let eventObj = window.document.createEvent('Events');
    eventObj.initEvent('keypress', true, true);
    eventObj.which = keyCode; 
    eventObj.keyCode = keyCode;
    el.dispatchEvent(eventObj);
}